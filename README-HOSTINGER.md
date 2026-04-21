# Etycons — Hostinger Deployment Guide

## What's in this ZIP

```
dist/              ← Pre-built app (NO build step needed on Hostinger)
  index.cjs        ← Compiled server
  public/          ← Compiled frontend (HTML, CSS, JS, images)
shared/            ← Database schema (for DB migration only)
index.js           ← App entry point (Hostinger points to this)
package.json       ← Dependencies
drizzle.config.ts  ← DB config (for migration only)
.env.example       ← Copy this to .env and fill in your values
```

---

## Step 1 — Upload Files to Hostinger

1. In **hPanel → File Manager**, go to your Node.js app root folder
2. Upload `etycons-hostinger.zip` and extract it
3. Make sure `index.js` is at the root level

---

## Step 2 — Hostinger Node.js App Settings

In **hPanel → Websites → Node.js → your app → Settings**:

| Setting                  | Value          |
|--------------------------|----------------|
| Node.js version          | 22.x           |
| Application mode         | Production     |
| **Entry file**           | **index.js**   |
| Package manager          | npm            |
| Build command (if shown) | *(leave blank)*|

---

## Step 3 — Create Your .env File

In File Manager, create a file called `.env` (copy from `.env.example`):

```
DATABASE_URL=postgresql://USERNAME:PASSWORD@HOST:PORT/DBNAME
SESSION_SECRET=any-long-random-string-at-least-32-characters
ADMIN_PASSWORD=YourChosenPassword
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-char-app-password
OPENAI_API_KEY=sk-your-openai-key
NODE_ENV=production
PORT=3000
```

> **SMTP_PASS** must be a Gmail App Password (not your login password).
> Get one at: myaccount.google.com → Security → App passwords

OR set these as Environment Variables directly in the Hostinger Node.js panel — either works.

---

## Step 4 — Install Dependencies

In Hostinger SSH terminal:

```bash
npm install --omit=dev
```

---

## Step 5 — Run Database Migration (first time only)

```bash
npx drizzle-kit push
```

This creates all the required tables in your PostgreSQL database. Run once on first setup.

---

## Step 6 — Start the App

Click **Restart** in the Node.js panel. Your site is live!

---

## Admin Dashboard

URL: `https://yourdomain.com/admin`
Password: whatever you set as `ADMIN_PASSWORD`

---

## Troubleshooting

| Problem | Solution |
|---|---|
| App won't start | Check `NODE_ENV=production` and `DATABASE_URL` are set |
| Database error | Run `npx drizzle-kit push` and check DATABASE_URL format |
| Emails not sending | SMTP_PASS must be a Gmail App Password, not your login password |
| Chatbot not working | Check OPENAI_API_KEY is valid — rest of site works without it |
| Port issues | Try PORT=3000 or PORT=8080 if default doesn't work |
