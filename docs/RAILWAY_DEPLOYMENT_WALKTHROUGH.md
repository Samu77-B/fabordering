# Railway Deployment Walkthrough

Step-by-step guide to move your backend from Hostinger (MySQL) to Railway (Node + JSON).

---

## Step 1: Deploy to Railway

1. Go to **[railway.app](https://railway.app)** and sign in with GitHub.
2. Click **New Project** → **Deploy from GitHub repo**.
3. Select **Samu77-B/fabordering** (or your repo name).
4. Railway will detect Node.js. If it asks for settings:
   - **Root Directory:** leave empty (or `.`)
   - **Build Command:** `npm install`
   - **Start Command:** `node stripe-backend.js`
5. Click **Deploy** and wait for the build to finish.

---

## Step 2: Add Environment Variables

1. In your Railway project, click the backend service.
2. Go to **Variables** (or **Settings** → **Variables**).
3. Add these variables:

   | Variable | Value | Notes |
   |----------|-------|-------|
   | `STRIPE_SECRET_KEY` | `sk_live_xxxxx` | From [Stripe Dashboard](https://dashboard.stripe.com/apikeys) |
   | `NODE_ENV` | `production` | Required for production |

4. Save. Railway will redeploy automatically.

---

## Step 3: Generate a Public URL

1. In your Railway project, go to **Settings** → **Networking**.
2. Click **Generate Domain**.
3. Copy the URL (e.g. `https://fabordering-production.up.railway.app`).

---

## Step 4: Update config.js

1. Open `config.js` in your project.
2. Set `API_BASE_URL` to your Railway URL + `/api`:

   ```javascript
   API_BASE_URL: 'https://YOUR-RAILWAY-URL.up.railway.app/api',
   ```

   Example:
   ```javascript
   API_BASE_URL: 'https://fabordering-production.up.railway.app/api',
   ```

3. **Do NOT** put your Stripe publishable key or admin token in the repo. Use one of:
   - **Local dev:** Create `config.local.js` (gitignored) with real values.
   - **Production:** Upload `config.local.js` via Hostinger File Manager after each deploy.

---

## Step 5: Add Stripe Key & Admin Token (Vercel)

With **Vercel** (frontend) + **Railway** (backend), you have two options:

**Option A – Put keys in config.js and push (simplest)**  
- **Stripe publishable key** (`pk_live_xxx`) is meant to be public – it’s safe in the frontend.
- **Admin token** – if your admin dashboard is part of the frontend, the token will be in the built JS. That’s a common trade-off for simple admin; the backend still validates it.
- Edit `config.js` with your real values, commit, and push. Vercel will redeploy with the updated config.

**Option B – Vercel Environment Variables (more secure for admin token)**  
1. In Vercel → Project → **Settings** → **Environment Variables**, add:
   - `VITE_STRIPE_PUBLISHABLE_KEY` = `pk_live_xxxxx`
   - `VITE_ADMIN_TOKEN` = `your-secure-admin-token`
2. Add a build step that injects these into `config.js` (e.g. a small script that runs before deploy and writes the values into the file). This needs a custom build setup.

For most setups, **Option A** is fine: put the Stripe publishable key in `config.js` (it’s public by design). Use a strong, random admin token and rotate it if needed.

---

## Step 6: Push and Deploy Frontend

1. Commit and push your changes:
   ```powershell
   git add config.js stripe-backend.js
   git commit -m "Point API to Railway, add PHP-compatible routes"
   git push origin master
   ```

2. **Vercel** will redeploy the frontend automatically when you push.

---

## Step 7: Test

1. Open your Vercel URL (e.g. **https://your-app.vercel.app**) or custom domain.
2. Check that products and categories load.
3. Add an item to the cart and run through a test payment (use Stripe test mode first if needed).
4. Confirm the order appears in your admin/orders view.

---

## Step 8: Add FABHAIR Discount (Optional)

To support the FABHAIR discount code:

1. Edit `data/discounts.json` in your project.
2. Add:
   ```json
   [
     {
       "id": 1,
       "code": "FABHAIR",
       "name": "Fab Hair Discount",
       "type": "percentage",
       "value": 20,
       "maxUses": null,
       "usedCount": 0,
       "minOrderAmount": 0
     }
   ]
   ```
3. Commit and push. Railway will use the updated file on the next deploy.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Products/categories not loading | Check browser console. Ensure `API_BASE_URL` ends with `/api` and Railway is running. |
| CORS errors | Add your domain to `ALLOWED_ORIGINS` in Railway Variables, e.g. `https://teasandcs.com,https://www.teasandcs.com`. |
| Payment fails | Verify `STRIPE_SECRET_KEY` in Railway and `STRIPE_PUBLISHABLE_KEY` in config. |
| 403 on API | Railway does not use ModSecurity; 403s from Hostinger are usually firewall-related. |

---

## Summary

| Component | Where it runs |
|-----------|----------------|
| **Backend (Node)** | Railway – products, categories, orders, Stripe |
| **Frontend (PWA)** | Vercel |
| **Data** | JSON files in repo (`data/products.json`, `data/categories.json`) |
| **Secrets** | Railway Variables (Stripe secret key) + config.js (publishable key, admin token) |
