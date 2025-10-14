const express = require('express');
const { WebSocketServer } = require('ws');
const { RedisAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// WebSocket server for Yjs
const wss = new WebSocketServer({ 
  server,
  path: '/y-websocket'
});

// Redis client for persistence
const redisClient = createClient({
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT || 6379
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

redisClient.connect().then(() => {
  console.log('Connected to Redis');
}).catch(console.error);

// Store for active documents
const documents = new Map();

// Handle WebSocket connections
wss.on('connection', (ws, req) => {
  console.log('New WebSocket connection');
  
  // Extract document ID from URL
  const url = new URL(req.url, `http://${req.headers.host}`);
  const documentId = url.searchParams.get('documentId') || 'default';
  
  // Initialize document if not exists
  if (!documents.has(documentId)) {
    documents.set(documentId, {
      connections: new Set(),
      updates: []
    });
  }
  
  const doc = documents.get(documentId);
  doc.connections.add(ws);
  
  // Send existing updates to new connection
  doc.updates.forEach(update => {
    if (ws.readyState === ws.OPEN) {
      ws.send(update);
    }
  });
  
  // Handle incoming messages
  ws.on('message', (data) => {
    try {
      // Broadcast update to all other connections
      doc.connections.forEach(connection => {
        if (connection !== ws && connection.readyState === connection.OPEN) {
          connection.send(data);
        }
      });
      
      // Store update for new connections
      doc.updates.push(data);
      
      // Persist to Redis (optional)
      redisClient.lPush(`document:${documentId}`, data);
      
      // Keep only last 100 updates in memory
      if (doc.updates.length > 100) {
        doc.updates = doc.updates.slice(-100);
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });
  
  // Handle connection close
  ws.on('close', () => {
    console.log('WebSocket connection closed');
    doc.connections.delete(ws);
    
    // Clean up document if no connections
    if (doc.connections.size === 0) {
      documents.delete(documentId);
    }
  });
  
  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    doc.connections.delete(ws);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    documents: documents.size,
    timestamp: new Date().toISOString()
  });
});

// Get document info
app.get('/document/:id', (req, res) => {
  const documentId = req.params.id;
  const doc = documents.get(documentId);
  
  if (!doc) {
    return res.status(404).json({ error: 'Document not found' });
  }
  
  res.json({
    documentId,
    connections: doc.connections.size,
    updates: doc.updates.length
  });
});

// Start server
const PORT = process.env.PORT || 1234;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Yjs WebSocket server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    redisClient.disconnect();
    process.exit(0);
  });
});
