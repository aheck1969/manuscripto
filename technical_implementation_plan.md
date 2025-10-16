Geplant ist eine moderne, browser-basierter App für Schriftsteller, Autoren und Verfasser von Texten.
Die App soll modular, erweiterbar, mit modernem UI & Drag’n’Drop, Multi-Auth und SaaS-fähig sein.

Applied rules: devrules: Tech-Stack, Laravel-Best-Practices, Vue/Nuxt+TS, Tailwind+shadcn, SOLID, modular, DRY, Git-Conventions, Security, Testing.

# 1. Zielarchitektur (High Level)
 
- Frontend (SPA/SSR): Nuxt 3 (Vue 3 + TypeScript), Pinia, VueUse, Tailwind CSS, shadcn-vue (Radix-Port), Headless UI, Iconify.
- Backend (API): Laravel 11 (PHP 8.3), MariaDB, Redis, Meilisearch, S3-Storage, Queues, WebSockets.
- Realtime & Kollaboration: Yjs (CRDT) + y-websocket (Node) für gleichzeitiges Schreiben, Laravel Echo für Presence/Notifications.
- Dateiverarbeitung: Uppy (tus) Uploads, Image Thumbs (Intervention/Image), PDF.js Preview, (optional) FFmpeg Worker für AV-Transcodes.
- Auth: Laravel Breeze + Sanctum (SPA), Socialite (Google, Apple, Facebook), TOTP 2FA, optional WebAuthn.
- Payments/SaaS: Stripe + Laravel Cashier (Subscriptions, Trials, Coupons, EU-VAT).
- Infra: Docker Compose (dev), prod auf Hetzner/Scaleway (EU), S3-kompatibler Storage (Wasabi/Backblaze), Cloudflare (DNS/WAF/CDN).
- Observability: Sentry (FE/BE), Laravel Telescope (admin-only), OpenTelemetry (optional), Plausible (DSGVO).
- CI/CD: GitHub Actions (lint/test/build/deploy), DB-Migrations, Versioning (semver), Feature Flags.

# 2. Kernmodule (Domain/Features)

## 2.1. Workspace & Projekte

- Projekte (Bücher/Serien), Bände, Manuskripte, Versionierung, Kollaboration (Roles/Permissions).

## 2.2. Manuskript-Editor

- Rich-Text via Tiptap (ProseMirror), CRDT-Sync mit Yjs, Seiten/Abschnitte/Scenes, Notizen randspaltig, Inline-Kommentare, Change-History.

## 2.3. Plotting & Struktur

- Boards (Kanban) für Akte/Arcs/Scenes (Drag’n’Drop via SortableJS/vue-draggable-next).
- Timeline (Zoom, Cards, Marker) – z. B. vis-timeline oder eigene Canvas/HTML-Version.
- Graph/Beziehungen (Charaktere-Orte-Plots) via Vue Flow.

## 2.4. Wissensdatenbank / Research
	
- Einträge (Quellen, Zitate, Webseiten-Snap, PDFs), Tags/Relations, Web-Clips, Volltextsuche (Meilisearch).
- PDF-Viewer (PDF.js), Annotationen (Seite+Koordinaten).

## 2.5. Charaktere/Orte/Objekte

- Steckbriefe + benutzerdefinierte Felder (Schemas), Referenzen in Szenen, Bilder/Medien anheften.

## 2.6. Ziele, Metriken, Sessions

- Wortziel/Tag, Fokus-Timer, Schreibstatistiken, Kalender-Heatmap.

## 2.7. Import/Export

- Import: Scrivener (.scrivx XML), Plottr (JSON).
- Export: Markdown, DOCX (PHPWord), HTML/PDF (Headless Chromium), ePub (php-epub oder Node-Service).
- (Optional) Pandoc in separatem Container für „alles-zu-alles“.

## 2.8. Team & Freigaben

- Rollen (owner, editor, commenter, viewer), Link-Shares (read-only, zeitlich begrenzt).

## 2.9. Marketplace/Plugins (später)

- Interne Module als Laravel-Packages, Frontend-Plugins via Nuxt Modules.

# 3. Datenmodell (vereinfachter Entwurf)

## Relational (MariaDB):

- users, teams, team_user, subscriptions
- projects, project_user (role), volumes, manuscripts
- scenes (belongsTo manuscript), scene_blocks (Text-Schnipsel), comments, highlights
- entities (character | location | object …) + entity_fields (custom schema)
- research_items, sources, citations (pivot scene/entity/research)
- boards, lanes, cards (für Kanban), timeline_items
- attachments (polymorph), audit_logs, notifications

## Suche (Meilisearch):

- Indexe für scenes, entities, research_items (title, tags, content excerpt).

## Objekt-/Blob-Storage (S3):

- /projects/{id}/attachments/{uuid} (original), /thumbs/… (Derivate).
- Presigned Uploads direkt aus dem Browser.

## Kollab-Daten (CRDT):

- yjs updates per docId in Redis (ephemeral) + periodische Snapshots in S3/DB (Versionspunkte).

# 4. Auth & Sicherheit
	
- Sanctum für SPA-Auth; Socialite: Google/Apple/Facebook. Apple-Sign-in: Services-ID + Private Key, Verified Domain.
- 2FA (TOTP via Laravel Fortify/Breeze-Erweiterung), Rate Limiting, CSRF, CSP (nonce-basiert), XSS-Härtung (Vue auto-escapes, zusätzlich DOMPurify für importierte HTML).
- Per-Tenant Isolation auf Datenebene (team_id scoping + Policies).
- Rechte via Laravel Policies + Gate, Row-Level Checks in Repositories.

# 5. Frontend (Nuxt 3 + TS)

- UI-Kit: Tailwind + shadcn-vue (Buttons, Dialogs, Dropdowns, Command Palette, Sidebar, Tabs, Toasts).
- Layout: App-Shell à la chat.openai.com (Left Sidebar: Projekte/Navigation; Main: Editor/Board; Right Drawer: Research/Notizen).
- Drag’n’Drop: vue-draggable-next (SortableJS) für Listen/Boards.
- Rich Editor: Tiptap Extensions: Comments, Track Changes (Marks), Inline-Refs, Slash-Commands, Code/Callouts.
- Command-Palette: (z. B. cmdk-vue Port), Shortcuts (cmd/ctrl-K, cmd/ctrl-S, etc.).
- State: Pinia Stores pro Modul (editor, board, research, auth).
- Data-Fetching: useFetch/useAsyncData, ETag/If-None-Match, optimistic UI.
- A11Y & i18n: @nuxtjs/i18n (de/it/en), ARIA-Patterns, Focus-Traps.
- Performance: Route-based Code-Splitting, component lazy, image lazy, WebP.

# 6. Backend (Laravel 11)

- Architektur: Modular (Domains als Namespaces oder nwidart/laravel-modules). Repositories + Services; FormRequests für Validation; API Resources.
- API: REST (JSON:API-like) + WebSockets (Echo). Optional: kleine GraphQL-Schicht fürs Frontend-Aggregieren.
- Queues/Jobs: lange Läufe (Import/Export, Thumbs, NLP) asynchron über Redis Queue.
- Search: Meilisearch Scout Driver.
- File Handling: S3 Flysystem, Image Derivatives (queued), Virus-Scan (ClamAV Container optional).
- Events/Listeners: Domain Events (SceneCreated, CommentAdded, FileUploaded) für Audit & Notifications.
- Testing: Pest/PHPUnit, Feature + API Tests; Seeders + Factories.

# 7. Realtime Kollaboration

- Yjs im Editor:

    + Node y-websocket Server (separater Container).
    + Persistenz: Redis (ephemeral), regelmäßige Snapshots (S3/DB) via Worker.
    + Laravel bekommt Post-commit Hooks (z. B. Export/Version Tagging).

- Presence/Chat/Comments

    + Laravel WebSockets (beyondcode/laravel-websockets) oder Pusher. Echo im FE.

# 8. Import/Export Pipeline
	
- Scrivener .scrivx (XML): PHP Parser → Normalisierung (Projects/Manuscript/Scenes), Assets ins S3.
- Plottr JSON: Decoder → Scenes/Timeline/Characters Mapping.
- Export:

    + Markdown/HTML/PDF: Nuxt SSR → Headless Chromium (node) für pixel-perfekte PDFs.
    + DOCX: PHPWord Templates.
    + ePub: php-epub oder Node-Service (Pandoc).

- Jobs & Fortschritt: Queue + Progress Events (WebSocket), Download per presigned URL.

# 9. Payments & Pläne (SaaS)

- Stripe + Cashier: Plans (Free/Pro/Team), Seats, Trials, Coupons, EU VAT (OSS), Rechnungen (Stripe Tax).
- Feature Flags: pro Plan (z. B. Realtime, Teaming, Marketplace).

# 10. Dev-Workflow & Qualität

- Monorepo:
    
    + /apps/api (Laravel), /apps/web (Nuxt), /services/realtime (y-ws), /services/convert (optional Pandoc/Chromium).

- CI/CD (GitHub Actions): lint (ESLint/Prettier, PHP CS Fixer), test, build, docker, deploy; db migrate.
- Konfig: .env (API_KEYs, Stripe, S3, Meili, Redis).
- Git Regeln: Commit-Prefixes laut devrules. Releases via semver, CHANGELOG.

# 11. Datenschutz & Recht (EU/DSGVO)
	
- Datenstandort EU, AVV mit Hosting/S3/Stripe.
- Privacy by Design: Verschlüsselung at-rest (S3 SSE), in-transit (TLS), optionale FE-E2EE pro Dokument (Yjs + Crypto-Key).
- Rechte der Nutzer: Export/Deletion auf Knopfdruck, Audit-Trail.
- Consent & Cookies: Nur notwendige Cookies default, Analytics via Plausible ohne Cookies.

# 12. Deploy-Blueprint

- Docker Compose (dev): api, web, redis, mariadb, meilisearch, s3-mock (minio), mailhog, websockets, y-ws, chromium-convert.
- Prod (IONOS Cloud):

    + api (Laravel + Octane/RoadRunner), web (Nuxt Nitro), ws (websockets), yws (y-websocket), convert (node headless), Redis (managed), MariaDB (managed), S3 (Wasabi).
    + Rolling Deploy, Zero-Downtime Migrations, Backups (DB nightly, S3 lifecycle).

# 13. UI-Flows (MVP)

- Onboarding: Sign-up → Team → Erstes Projekt → Template wählen (Roman/Serie/Sachbuch) → Start in Editor.
- Editor-Ansicht: Mittel-Pane (Tiptap), Links (Navigator/Scenes/Boards), Rechts (Research/Notizen/Properties).
- Boards: Drag’n’Drop Scenes zwischen Akten, Inline-Edit.
- Timeline: Items zoomen/verschieben, Snap-to-date, Links zu Scenes.
- Research: Clip/Upload, Tags, Volltext, Verknüpfen per Drag auf Szene.

# 14. Roadmap (Phasen)

- P0 – Foundations (4–6 Wochen): Repo/CI, Auth (Breeze+Socialite+Sanctum), Teams, Projekte, S3 Uploads, Tiptap Editor (lokal), Boards (DnD), Meilisearch, Stripe Skeleton.
- P1 – Kollaboration: Yjs + y-ws, Comments/Presence, Version Snapshots, Notifications.
- P2 – Research & PDF: Research DB, PDF.js Annot, Quell-Zitate.
- P3 – Import/Export: Scrivener/Plottr Import, PDF/DOCX/ePub Export.
- P4 – Marketplace/Plugins & Public Launch (Beta → Paid).

# 15. Paketliste (konkret)

- Backend (Composer): laravel/framework, laravel/sanctum, laravel/socialite, laravel/scout, meilisearch/meilisearch-php, intervention/image, laravel/cashier, league/flysystem-aws-s3-v3, beyondcode/laravel-websockets, spatie/laravel-activitylog, spatie/laravel-permission (oder Policies only), pestphp/pest, phpoffice/phpword.
- Frontend (npm): nuxt@latest, vue@3, typescript, pinia, @vueuse/core, tailwindcss, @shadcn/ui (vue-port), sortablejs + vue-draggable-next, @tiptap/vue-3 + Extensions, cmdk-vue (oder Alternative), @headlessui/vue, pdfjs-dist, uppy, yjs, y-websocket, @nuxtjs/i18n.
- Services: meilisearch, redis, minio (dev), y-websocket (node), optional chromium/pandoc containers.

# 16. Security & Hardening Checkliste (Auszug)

- HTTPS überall, HSTS, CSP (nonce), SameSite=strict Cookies, Secure/HttpOnly.
- Input-Validation via FormRequests, Output-Escaping, Upload-MIME-Checks, File Size/Type Limits.
- Rate Limits (auth, api), Brute-Force Schutz, 2FA.
- Tenant-Scope in allen Queries, Policies auf Model-Ebene + Tests.
- Geheimnisse im Secret Manager, rotierende Keys.
- Backups + Restore-Proben, Logging (PII-arm), DPA/AV-Verträge.

# 17. Nächster Schritt (konkret umsetzbar in Cursor)

## Step 1: Repos & Boilerplate anlegen

1. Monorepo initialisieren (/apps/api, /apps/web, /services/realtime).
2. Laravel 11 + Breeze + Sanctum + Socialite + Scout + Cashier installieren.
3. Nuxt 3 Bootstrap (TS strict), Tailwind, shadcn-vue konfigurieren, Basis-Layout (App-Shell).
4. Docker Compose mit MariaDB, Redis, Meili, Minio, Mailhog, y-websocket.
5. Minimaler End-to-End Flow: Sign-up → Projekt anlegen → Szene erstellen → Bearbeiten im (lokalen) Tiptap → Drag’n’Drop in Board → Upload einer Datei → Suche findet Scene.
