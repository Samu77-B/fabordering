# Railway + Vercel Deployment (Alternative to Hostinger API)

Use this when Hostinger returns 403 on the API. Deploy the **Node backend** to Railway and the **frontend** to Vercel.

---

## 1. Create Railway project (backend)

1. Go to **[railway.app](https://railway.app)** → Sign in with GitHub
2. **New Project** → **Deploy from GitHub repo**
3. Select **Samu77-B/fabordering**
4. Railway detects Node.js. Set:
   - **Root Directory:** `.` (or leave empty)
   - **Build Command:** `npm install`
   - **Start Command:** `node stripe-backend.js`
5. **Settings** → **Variables** → Add:
   ```
   STRIPE_SECRET_KEY=sk_live_your_key
   NODE_ENV=production
   ```
6. **Settings** → **Networking** → **Generate Domain**
7. Copy the URL (e.g. `https://fabordering-production.up.railway.app`)

---

## 2. Create Vercel project (frontend)

1. Go to **[vercel.com](https://vercel.com)** → Sign in with GitHub
2. **Add New** → **Project** → Import **Samu77-B/fabordering**
3. **Configure:**
   - Framework Preset: **Other**
   - Root Directory: `.`
   - Build Command: leave empty (static site)
   - Output Directory: `.`
4. **Environment Variables** → Add:
   ```
   VITE_API_URL=https://your-railway-url.up.railway.app
   ```
   (Or we'll use a different method – see step 4)
5. **Deploy**

---

## 3. Update config for Railway

After Railway is live, update `config.js` (or use env) so the frontend points to Railway:

```javascript
API_BASE_URL: 'https://your-railway-app.up.railway.app',
```

The Node backend at Railway provides:
- `GET /products` – products
- `GET /orders` – orders  
- `GET /discounts` – discounts
- `POST /create-payment-intent` – Stripe payment
- `POST /orders` – create order

**Note:** The Node backend uses JSON files (`data/products.json`, etc.), not MySQL. For MySQL data, you’d need to migrate or keep Hostinger for the database and only use Railway for payment/create-payment-intent.

---

## 4. CORS on Railway

The `stripe-backend.js` CORS already allows `*` for some cases. Add your Vercel domain to `allowedOrigins` in `stripe-backend.js`:

```javascript
'https://your-app.vercel.app',
'https://teasandcs.com',
```

---

## 5. Quick flow

1. **Railway** – backend (Stripe, products, orders)
2. **Vercel** – frontend (PWA)
3. **config.js** – `API_BASE_URL` = Railway URL

---

## 6. Hybrid option (payment only on Railway)

If you want to keep Hostinger for products/orders (MySQL) but move only payment to Railway:

1. Deploy `stripe-backend.js` to Railway
2. In the frontend, call Railway for `create-payment-intent` and Hostinger for products/orders
3. This requires code changes to use two API bases (one for payment, one for products)

For a simpler setup, use Railway for the full backend and JSON storage.
