# Deploy from Git to Hostinger (teasandcs.com/ndo-fabhair)

This guide sets up deployment so that when you **push to GitHub**, your live site at **https://teasandcs.com/ndo-fabhair/** can be updated from the same repo. Hostinger uses MySQL on the server; the PHP API in `api/` and the frontend files are what get deployed from Git.

---

## 1. One-time setup in Hostinger (Git connection)

1. Log in to **Hostinger hPanel**: [https://hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Open your domain **teasandcs.com** → click **Manage**
3. In the left sidebar, go to **Git** (under “Advanced” or “Website”)
4. Click **Create a New Repository** and set:
   - **Repository address:**  
     `https://github.com/Samu77-B/teas-cs-pwa.git`
   - **Branch:**  
     `master`
   - **Install path (deploy path):**  
     `ndo-fabhair`  
     *(So the repo contents deploy into `public_html/ndo-fabhair/` and the site stays at https://teasandcs.com/ndo-fabhair/)*  
     If Hostinger asks for a path relative to `public_html`, use `ndo-fabhair`. If it uses a full path, use `public_html/ndo-fabhair`.
5. Save/create the repository.

Reference: [Hostinger – How to deploy a Git repository](https://support.hostinger.com/en/articles/1583302-how-to-deploy-a-git-repository-in-hostinger)

---

## 2. Deploy (update the site from Git)

After each time you want the live site to match GitHub:

- In Hostinger → **Git** for teasandcs.com, click **Deploy** (or “Pull” if that’s what’s shown).

This pulls the latest commit from the `master` branch into the folder that serves **https://teasandcs.com/ndo-fabhair/**.

---

## 3. Auto-deploy on every push (optional)

To deploy automatically whenever you push to GitHub:

1. In Hostinger → **Git** for your site, turn on **Auto-Deployment** and copy the **Webhook URL** Hostinger gives you.
2. On GitHub: repo **Samu77-B/teas-cs-pwa** → **Settings** → **Webhooks** → **Add webhook**.
3. Set:
   - **Payload URL:** the Hostinger webhook URL
   - **Content type:** `application/json`
   - **Events:** “Just the push event”
4. Save the webhook.

After that, each **git push** to `master` can trigger a deploy on Hostinger (depending on your Hostinger plan).

---

## 4. What gets deployed

From the repo, Hostinger deploys into **ndo-fabhair** (e.g. `public_html/ndo-fabhair/`):

- **Frontend:** `index.html`, `admin.html`, `manifest.json`, `sw.js`, `config.js`, `footer-component.html`, `Brand/`, `images/`, etc.
- **PHP API (MySQL):** `api/` (e.g. `api/config.php`, `api/products.php`, `api/orders.php`, `api/categories.php`, `api/create-payment-intent.php`, etc.)

So the **database** stays on Hostinger MySQL; only code and static assets are updated from Git.

---

## 5. Config and secrets (not in Git)

- **`config.js`** in the repo is set for production to use:
  - `API_BASE_URL: 'https://teasandcs.com/ndo-fabhair/api'`
- **Secrets** (Stripe keys, admin token, DB password) should **not** be in the repo. Use either:
  - **Option A:** Keep a local `config.local.js` (and optionally `api/config.local.php`) with real values and upload them once via File Manager/FTP after each deploy, **or**
  - **Option B:** Set environment variables in Hostinger (if your plan supports it) and have the app read from them.

So: **Git push** updates code and the production API URL; **secrets** are configured only on the server.

---

## 6. Quick workflow

1. Edit code locally.
2. Commit and push:
   ```bash
   git add -A
   git commit -m "Your message"
   git push origin master
   ```
3. In Hostinger → **Git** → **Deploy** (or rely on auto-deploy if configured).
4. Test: **https://teasandcs.com/ndo-fabhair/**

---

## 7. Troubleshooting

- **404 or wrong path:** Check that the Git install path is exactly `ndo-fabhair` (or `public_html/ndo-fabhair`) so the site is served at `/ndo-fabhair/`.
- **API or DB errors:** Ensure `api/config.php` on the server has the correct MySQL credentials and that the database and tables exist (e.g. run `api/setup_database.php` once if needed).
- **Old version after deploy:** Hard refresh (Ctrl+F5) or clear browser cache; confirm in Hostinger File Manager that files in `ndo-fabhair` have the latest dates.
