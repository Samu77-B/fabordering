# Security notes — Teas & C's PWA

This document summarises how the app handles security today and what to watch for. Changes are designed **not** to break Stripe, CDNs, or inline scripts (so we do **not** enable a strict Content-Security-Policy on static pages).

## What is in good shape

- **Stripe**: Card data goes to Stripe; your server only uses the **secret key** on Railway (`STRIPE_SECRET_KEY`), never in the browser.
- **CORS**: The API only allows configured origins (see `ALLOWED_ORIGINS` / defaults in `stripe-backend.js`).
- **Admin / barista APIs**: Mutations require `Authorization: Bearer` matching `ADMIN_TOKEN` (Railway env + `config.js` on trusted devices).
- **HTTP headers (Railway)**: `helmet` adds safe defaults **without** CSP (so the PWA keeps working). `trust proxy` is set for correct rate-limit behaviour behind Railway.
- **Rate limits**: New order and payment-intent endpoints are limited per IP to reduce abuse (see `stripe-backend.js`). Stripe **webhooks** are not rate-limited.
- **XSS (defence in depth)**: Product names, basket lines, order notes, and barista order text are escaped before `innerHTML` where we touched the code.
- **Hostinger**: `.htaccess` sets `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.

## Known limitations (by design or trade-off)

1. **`ADMIN_TOKEN` in `config.js`**  
   Anyone who can open the browser devtools on a machine that loads `admin.html` / `orders-display.html` can see the token. Mitigations:
   - Use a **long random** token and **rotate** it if leaked (Railway + all `config.js` copies).
   - Do **not** link these pages from public menus; share URLs only with staff.
   - Optional hardening: move barista/admin to HTTP-auth or a small login that exchanges a short-lived session (larger change).

2. **`STRIPE_PUBLISHABLE_KEY` in `config.js`**  
   Publishable keys are **meant** to be public. Restrict abuse with Stripe Dashboard (Radar, limits) and the backend rate limits.

3. **No strict CSP on `index.html`**  
   The app uses inline scripts and third-party scripts (Stripe, fonts, optional QR / EmailJS). A strict CSP would require refactoring.

4. **Orders / catalog on disk (Railway)**  
   JSON files are not encrypted at rest. Protect Railway access and repo secrets.

## Environment variables (Railway)

| Variable | Purpose |
|----------|---------|
| `STRIPE_SECRET_KEY` | Server-side Stripe API |
| `STRIPE_WEBHOOK_SECRET` | Verify webhook signatures |
| `ADMIN_TOKEN` | Bearer token for admin API (should match staff `config.js`) |
| `ALLOWED_ORIGINS` | Optional comma-separated list to tighten CORS |

## If something breaks after a deploy

- **429 Too Many Requests**: Legitimate busy period exceeded rate limits; increase `max` in `orderCreateLimiter` / `paymentIntentLimiter` in `stripe-backend.js` slightly.
- **Stripe / payment UI issues**: Do not enable Helmet’s default `contentSecurityPolicy` without testing.
