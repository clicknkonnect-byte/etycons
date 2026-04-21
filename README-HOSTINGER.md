# Etycons — Hostinger Node.js Deployment Guide

## What's Inside

```
etycons-production/
├── dist/                  ← Built application (server + frontend)
│   ├── index.cjs          ← Compiled Node.js server
│   └── public/            ← Built React frontend (HTML, CSS, JS, images)
├── shared/                ← Database schema (needed for migrations)
├── drizzle.config.ts      ← Drizzle ORM config (for DB setup)
├── package.json           ← Dependencies & start script
├── .env.example           ← Environment variable template
└── README-HOSTINGER.md    ← This file
```

---

## Step 1 — Set Up PostgreSQL Database on Hostinger

1. Log in to **Hostinger hPanel**
2. Go to **Databases → PostgreSQL**
3. Create a new database, note:
   - Database name
   - Username
   - Password
   - Host (usually `localhost` on Hostinger)

---

## Step 2 — Create a Node.js App on Hostinger

1. In hPanel, go to **Websites → Node.js**
2. Click **Create application**
3. Set:
   - **Node.js version:** 20.x or 22.x
   - **Application root:** the folder where you'll upload files (e.g. `/etycons`)
   - **Application startup file:** `dist/index.cjs`
4. Note the domain or subdomain assigned to this app

---

## Step 3 — Upload Files via File Manager or FTP

Upload the **entire contents** of `etycons-production/` into your application root folder on Hostinger.

Required files/folders:
- `dist/` (entire folder)
- `shared/` (entire folder)
- `drizzle.config.ts`
- `package.json`
- `.env` (you'll create this from `.env.example`)

---

## Step 4 — Set Environment Variables

You have two options:

### Option A — Create a `.env` file (recommended)
Copy `.env.example` to `.env` and fill in all values:

```
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/YOUR_DB_NAME
SESSION_SECRET=some_long_random_secret_string_here
ADMIN_PASSWORD=YourChosenAdminPassword
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_gmail_app_password
OPENAI_API_KEY=sk-your_openai_api_key
NODE_ENV=production
PORT=5000
```

### Option B — Set via Hostinger hPanel
In the Node.js app settings, find **Environment Variables** and add each key/value there.

---

## Step 5 — Install Dependencies

In the Hostinger **SSH terminal** or through hPanel **Terminal**:

```bash
cd /path/to/your/app
npm install --omit=dev
```

---

## Step 6 — Set Up the Database Tables

Run this once to create all the database tables:

```bash
npx drizzle-kit push
```

> Make sure your `DATABASE_URL` is set before running this.

---

## Step 7 — Start the Application

Hostinger will start your app automatically using the startup file `dist/index.cjs`.

Or start manually:
```bash
npm start
```

This runs: `NODE_ENV=production node dist/index.cjs`

---

## Step 8 — Point Your Domain

1. In Hostinger hPanel, go to **Domains → DNS Zone**
2. Point your domain's **A record** to your Hostinger server IP
3. If using a subdomain, add a **CNAME** or **A record** for it
4. SSL is usually handled automatically by Hostinger

---

## Gmail SMTP (for contact form emails)

The contact form sends emails via Gmail SMTP. To set this up:

1. Go to your Google account → **Security → 2-Step Verification** (enable it)
2. Then go to **App Passwords** → generate a password for "Mail"
3. Use that 16-character app password as `SMTP_PASS`
4. Use your Gmail address as `SMTP_USER`

---

## Admin Dashboard

Access your admin dashboard at: `https://yourdomain.com/admin`
Password: whatever you set as `ADMIN_PASSWORD`

---

## AI Chatbot

The chatbot uses OpenAI's API. Get your API key from:
https://platform.openai.com/api-keys

Set it as `OPENAI_API_KEY` in your `.env` file.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| App won't start | Check `dist/index.cjs` exists and `NODE_ENV=production` is set |
| Database errors | Confirm `DATABASE_URL` is correct and run `npx drizzle-kit push` |
| Emails not sending | Check Gmail app password and that 2FA is enabled |
| 404 on page refresh | The server handles this — make sure app is running |
| Chatbot not working | Check `OPENAI_API_KEY` is valid |
