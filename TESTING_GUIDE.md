# 🧪 Testing Guide: User-System lokal testen

## ✅ Was bereits fertig ist:

- ✅ Laravel Backend mit Authentication API
- ✅ Nuxt Frontend mit Login/Register Seiten
- ✅ Datenbank-Migrationen
- ✅ i18n (Mehrsprachigkeit)
- ✅ `.env` Dateien erstellt und konfiguriert

## 📋 Was du jetzt tun musst:

### **Schritt 1: Datenbank erstellen**

Da du MAMP verwendest, hast du bereits MariaDB/MySQL am Laufen. Du musst nur eine Datenbank erstellen:

**Option A: Mit phpMyAdmin (einfach)**
1. Öffne phpMyAdmin in deinem Browser (normalerweise `http://localhost:8888/phpMyAdmin/`)
2. Klicke auf "Datenbanken" (Databases)
3. Erstelle eine neue Datenbank mit dem Namen: `manuscripto`
4. Wähle Zeichensatz: `utf8mb4_unicode_ci`

**Option B: Mit Terminal**
```bash
# MySQL/MariaDB Client öffnen
mysql -u root -p

# Datenbank erstellen
CREATE DATABASE manuscripto CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Beenden
exit;
```

### **Schritt 2: Laravel `.env` anpassen**

Öffne die Datei `apps/api/.env` und passe die Datenbank-Verbindung an deine MAMP-Konfiguration an:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306          # Oder dein MAMP MySQL Port (z.B. 8889)
DB_DATABASE=manuscripto
DB_USERNAME=root      # Dein MySQL Username
DB_PASSWORD=root      # Dein MySQL Passwort (oder leer)
```

**WICHTIG:** Finde deinen MAMP MySQL Port heraus:
- Öffne MAMP
- Klicke auf "Preferences" → "Ports"
- Notiere den "MySQL Port" (Standard: 3306 oder 8889)

### **Schritt 3: Migrationen ausführen**

Führe die Datenbank-Migrationen aus:

```bash
cd apps/api
php artisan migrate
```

Du solltest sehen:
```
✓ 2025_10_14_061636_create_personal_access_tokens_table
✓ 2025_10_14_061750_add_additional_fields_to_users_table
```

### **Schritt 4: Laravel Server starten**

```bash
# Im apps/api Verzeichnis
php artisan serve

# Server läuft auf: http://localhost:8000
```

**Teste die API:**
```bash
curl http://localhost:8000/api/auth/login
# Sollte eine Fehler-Response geben (weil keine Daten gesendet wurden)
```

### **Schritt 5: Nuxt Dev Server starten**

Öffne ein **neues Terminal-Fenster**:

```bash
cd apps/web
npm install  # Falls noch nicht gemacht
npm run dev

# Server läuft auf: http://localhost:3000
```

### **Schritt 6: User-System testen**

#### **Test 1: Registration**
1. Öffne im Browser: `http://localhost:3000`
2. Klicke oben rechts auf "Register"
3. Fülle das Formular aus:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "password123"
   - Confirm Password: "password123"
4. Klicke auf "Register"
5. Du solltest automatisch eingeloggt werden und zum Dashboard weitergeleitet werden

#### **Test 2: Login**
1. Klicke oben rechts auf das Logout-Symbol (🚪)
2. Klicke auf "Login"
3. Gib deine Credentials ein:
   - Email: "test@example.com"
   - Password: "password123"
4. Klicke auf "Login"
5. Du solltest eingeloggt werden

#### **Test 3: Mehrsprachigkeit**
1. Wechsle oben rechts die Sprache (EN → DE)
2. Alle Texte sollten sich ändern
3. Logout und erneutes Login sollten in der gewählten Sprache sein

## 🐛 Troubleshooting

### Problem: "SQLSTATE[HY000] [2002] Connection refused"
**Lösung:** MySQL läuft nicht oder falscher Port
- Starte MAMP MySQL
- Prüfe den Port in der `.env` Datei

### Problem: "Base table or view not found"
**Lösung:** Migrationen noch nicht ausgeführt
```bash
cd apps/api
php artisan migrate
```

### Problem: "CORS error" im Browser
**Lösung:** Laravel Server läuft nicht
```bash
cd apps/api
php artisan serve
```

### Problem: "API not found" oder 404
**Lösung:** Falsche API_BASE_URL in Nuxt
- Prüfe `apps/web/.env`:
```env
API_BASE_URL=http://localhost:8000/api
```

### Problem: "Token mismatch" oder "Unauthenticated"
**Lösung:** Cookies oder Sanctum-Konfiguration
1. Lösche Browser-Cookies für localhost
2. Prüfe `apps/api/.env`:
```env
SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost:3001,127.0.0.1:3000
```

## ✅ Erfolgreiche Installation erkennen

Du weißt, dass alles funktioniert, wenn:

1. ✅ Du dich registrieren kannst
2. ✅ Du eingeloggt wirst und dein Name oben rechts angezeigt wird
3. ✅ Du dich ausloggen kannst
4. ✅ Du dich wieder einloggen kannst
5. ✅ Die Sprache wechseln funktioniert

## 📊 Datenbank prüfen

Du kannst in phpMyAdmin oder mit SQL prüfen, ob der User angelegt wurde:

```sql
USE manuscripto;
SELECT * FROM users;
```

Du solltest deinen Test-User sehen mit allen Feldern (`first_name`, `last_name`, `preferred_language`, etc.).

## 🎉 Nächste Schritte

Wenn alles funktioniert, können wir weitermachen mit:
- Project Management (CRUD für Projekte)
- Rich-Text Editor (Tiptap)
- File Upload System
- Drag & Drop Boards

Viel Erfolg beim Testen! 🚀
