# 🚀 Nuxt Server Start Guide

## ✅ **Was funktioniert jetzt:**

- **Frontend (Nuxt)**: http://localhost:3000 ✅
- **Backend (MAMP)**: http://localhost:8888/manuscripto/apps/api/public/ ✅
- **API**: http://localhost:8888/manuscripto/apps/api/public/api/ ✅

## 🔧 **Lokaler Start - Schritt für Schritt:**

### **1. MAMP PRO starten:**
- MAMP PRO öffnen
- Server starten (Port 8888)
- Document Root: `/Users/admin/Sites/localhost-mamp_install/manuscripto/apps/api/public`

### **2. Frontend (Nuxt) starten:**
```bash
cd apps/web
npm run dev
```

### **3. Browser öffnen:**
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8888/manuscripto/apps/api/public/
- **API Test**: http://localhost:8888/manuscripto/apps/api/public/api/

## 🐛 **Was war das Problem?**

1. **Zu viele Dependencies** - Tailwind CSS und i18n haben Konflikte verursacht
2. **Komplexe Config** - Zu viele Module gleichzeitig
3. **Layout-Probleme** - i18n wurde verwendet, aber nicht installiert

## 🔧 **Lösung:**

1. **Minimale Config** - Nur essentielle Packages
2. **Schrittweise Erweiterung** - Ein Modul nach dem anderen
3. **Einfache Layouts** - Ohne externe Dependencies

## 📋 **Nächste Schritte:**

1. **Tailwind CSS hinzufügen** (wenn gewünscht)
2. **i18n wieder einbauen** (schrittweise)
3. **Authentication integrieren**
4. **Weitere Features**

## 🚨 **Wichtige Hinweise:**

- **Immer zuerst minimale Version testen**
- **Ein Modul nach dem anderen hinzufügen**
- **Cache löschen bei Problemen**: `rm -rf node_modules package-lock.json .nuxt`
- **Dependencies prüfen**: `npm list --depth=0`

## 🎯 **Aktueller Status:**

- ✅ **Grundfunktionalität**: Läuft
- ✅ **Routing**: Funktioniert
- ✅ **Layouts**: Funktioniert
- ⏳ **Styling**: Basic HTML (Tailwind später)
- ⏳ **i18n**: Später hinzufügen
- ⏳ **Auth**: Später integrieren
