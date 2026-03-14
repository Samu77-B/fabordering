# Fix 500 Error: Database & Stripe Setup

The 500 error means the API is reachable but **database credentials** or **Stripe key** are missing or wrong.

## On Hostinger (after Git deploy)

1. **Create `api/config.local.php`** in File Manager (same folder as config.php).

2. **Copy from `api/config.local.example.php`** and fill in your real values:
   - `$DB_HOST` – usually `localhost`
   - `$DB_NAME` – from Hostinger → Databases → MySQL
   - `$DB_USER` – your MySQL username
   - `$DB_PASS` – your MySQL password
   - `$ADMIN_TOKEN` – match the value in config.js
   - `STRIPE_SECRET_KEY` – from Stripe Dashboard → API keys

3. **Create database tables** (if not done yet):
   - Run `https://teasandcs.com/ndo-fabhair/api/setup_database.php` once in your browser, or
   - Use phpMyAdmin to import/run the schema from `api/setup_database.php`

`config.local.php` is not in Git, so it will not be overwritten on deploy.
