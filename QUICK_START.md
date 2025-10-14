# 🚀 Quick Start - Manuscripto User-System testen

## Schritt-für-Schritt Anleitung (5 Minuten)

### 1️⃣ Datenbank erstellen
```bash
# Option 1: phpMyAdmin (http://localhost:8888/phpMyAdmin/)
# Erstelle Datenbank: "manuscripto"

# Option 2: Terminal
mysql -u root -p
CREATE DATABASE manuscripto CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;
```

### 2️⃣ Laravel `.env` anpassen
```bash
# Öffne: apps/api/.env
# Ändere diese Zeilen (passe Port an dein MAMP an):

DB_PORT=3306        # Oder 8889 für MAMP
DB_DATABASE=manuscripto
DB_USERNAME=root
DB_PASSWORD=root    # Oder leer
```

### 3️⃣ Migrationen ausführen
```bash
cd apps/api
php artisan migrate
```

### 4️⃣ Server starten

**Terminal 1 - Laravel:**
```bash
cd apps/api
php artisan serve
# → http://localhost:8000
```

**Terminal 2 - Nuxt:**
```bash
cd apps/web
npm install  # Nur beim ersten Mal
npm run dev
# → http://localhost:3000
```

### 5️⃣ Im Browser testen
1. Öffne: `http://localhost:3000`
2. Klicke auf "Register" (oben rechts)
3. Erstelle einen Account
4. Fertig! 🎉

## ✅ Checkliste

- [ ] MySQL/MariaDB läuft (MAMP gestartet)
- [ ] Datenbank `manuscripto` existiert
- [ ] `apps/api/.env` ist korrekt konfiguriert
- [ ] Migrationen wurden ausgeführt
- [ ] Laravel Server läuft auf Port 8000
- [ ] Nuxt Server läuft auf Port 3000
- [ ] Registration funktioniert
- [ ] Login/Logout funktioniert

## 🆘 Probleme?

Siehe `TESTING_GUIDE.md` für detaillierte Troubleshooting-Hilfe.

## 📝 Test-Credentials (nach Registration)

```
Email: test@example.com
Password: password123
```
