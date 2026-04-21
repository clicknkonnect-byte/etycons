# Etycons - E-Commerce & Digital Operations Agency Website

## Overview
Etycons is a conversion-focused services website for a UK-based e-commerce and digital operations agency. The site helps sellers scale on eBay, TikTok Shop, Amazon, and Shopify across UK, USA, Europe, and Australia markets.

## Tech Stack
- Frontend: React + TypeScript + Tailwind CSS + Vite
- Backend: Express.js
- Database: PostgreSQL (Drizzle ORM)
- Routing: wouter
- Forms: react-hook-form + zod
- Data fetching: @tanstack/react-query
- SEO: react-helmet-async
- Animations: framer-motion

## Project Architecture
```
client/src/
  App.tsx                    - Main app with routing, providers
  components/
    navigation.tsx           - Sticky header with nav links, WhatsApp CTA, theme toggle
    footer.tsx               - Site footer with links, social, contact info
    seo.tsx                  - Per-page SEO meta tags
    theme-provider.tsx       - Dark/light mode provider
    theme-toggle.tsx         - Theme toggle button
    ui/                      - Shadcn UI components
  pages/
    home.tsx                 - Landing page with hero, services, stats, markets, CTA
    services.tsx             - Services overview page (7 services)
    service-detail.tsx       - Reusable service detail page component
    services/
      ebay.tsx               - eBay Account Management detail page
      tiktok.tsx             - TikTok Shop UK Management detail page
      amazon.tsx             - Amazon Seller Support detail page
      shopify.tsx            - Shopify Store Setup detail page
      product-research.tsx   - Product Research detail page
      compliance.tsx         - Compliance & Account Health detail page
      3pl.tsx                - UK 3PL & Fulfilment Services (custom standalone page with 9 service cards, process steps, platforms, carriers, markets, FAQ)
      sourcing-freight.tsx   - Product Sourcing & Freight page (Pakistan/China sourcing, freight options, quote form, FAQ)
    about.tsx                - Company story, values, timeline
    how-it-works.tsx         - 4-step process + FAQ
    contact.tsx              - Contact form + info cards + WhatsApp CTA

server/
  db.ts                      - Database connection (pg pool)
  storage.ts                 - Storage interface + DatabaseStorage
  routes.ts                  - API routes (POST /api/contact, chatbot)
  replit_integrations/
    chat/
      routes.ts              - Chatbot API endpoint (POST /api/chatbot) with Etycons system prompt
      storage.ts             - Chat storage interface (conversations, messages CRUD)

shared/
  schema.ts                  - Drizzle schemas (contactSubmissions, conversations, messages)
  models/
    chat.ts                  - Chat-related Drizzle schemas and types
```

## Core Services
1. eBay Account Management
2. TikTok Shop UK Management
3. Amazon Seller Support
4. Shopify Store Setup
5. Product Research
6. Compliance & Account Health
7. UK 3PL Consulting
8. Product Sourcing & Freight (Pakistan & China)

## API Endpoints
- `POST /api/contact` - Submit contact form (name, email, phone, company, service, message)
- `POST /api/chatbot` - AI chatbot endpoint (SSE streaming, Etycons system prompt, conversation persistence)

## Running
- `npm run dev` starts Express + Vite on port 5000
- `npx drizzle-kit push` to push schema changes

## Recent Changes
- Initial build: All 5 pages, navigation, footer, contact form with DB persistence
- Dark mode support with ThemeProvider
- Per-page SEO with react-helmet-async
- Generated hero images for Home, Services, About pages
- Added Calendly integration (https://calendly.com/imaliakbar512/30min) across all CTA buttons for free consultation booking
- Admin dashboard at /admin with password-protected access to view customer enquiries
- AI-powered chatbot widget (floating button, SSE streaming, Etycons service knowledge, Calendly booking guidance) using Replit AI Integrations (OpenAI)
- Product Sourcing & Freight page at /services/sourcing-freight with quote request form, 7 service cards, 6-step process, shipping destinations, FAQ, and service disclaimer
