# Security Configuration Guide

⚠️ **IMPORTANT**: This repository uses placeholder credentials for security. You must configure your actual credentials locally and on your server.

## Files That Require Configuration

### 1. Frontend Configuration (`config.js`)

**Location**: `config.js` (root directory)

**What to configure**:
```javascript
const CONFIG = {
    API_BASE_URL: 'https://your-domain.com/api',  // Your Hostinger domain
    STRIPE_PUBLISHABLE_KEY: 'pk_live_...',        // From Stripe Dashboard
    ADMIN_TOKEN: 'your-secure-token',             // Generate a secure random string
    ENVIRONMENT: 'production'
};
```

**How to get Stripe keys**:
1. Go to https://dashboard.stripe.com/apikeys
2. Copy your **Publishable key** (starts with `pk_live_` for production)
3. Paste it into `config.js`

### 2. Backend Configuration (`api/config.php`)

**Location**: `api/config.php`

**What to configure**:
```php
$DB_HOST = 'localhost';                    // Usually 'localhost' on Hostinger
$DB_NAME = 'your_database_name';           // From Hostinger MySQL Databases
$DB_USER = 'your_database_user';           // From Hostinger MySQL Databases
$DB_PASS = 'your_database_password';       // From Hostinger MySQL Databases
$ADMIN_TOKEN = 'your-secure-admin-token';  // Same as in config.js
```

**How to get database credentials from Hostinger**:
1. Login to Hostinger control panel
2. Go to **Databases** → **MySQL Databases**
3. Find your database name, username
4. Copy the credentials to `api/config.php`

### 3. Admin Token

The `ADMIN_TOKEN` must be **identical** in both files:
- `config.js` → `ADMIN_TOKEN`
- `api/config.php` → `$ADMIN_TOKEN`

**Generate a secure token**:
```bash
# Option 1: Use OpenSSL
openssl rand -hex 32

# Option 2: Use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 3: Online generator
# Visit: https://www.uuidgenerator.net/
```

## Security Best Practices

### ✅ DO:
- Keep your actual credentials in a **local copy** of these files
- Use **.gitignore** to prevent committing sensitive data
- Use **different admin tokens** for development and production
- Rotate your tokens periodically
- Use **environment variables** for sensitive data (advanced)

### ❌ DON'T:
- Commit real credentials to GitHub
- Share your admin token publicly
- Use the same token across multiple projects
- Use simple/guessable tokens like "admin123"

## Deployment Checklist

Before deploying to production:

- [ ] Replace all placeholders in `config.js`
- [ ] Replace all placeholders in `api/config.php`
- [ ] Verify ADMIN_TOKEN matches in both files
- [ ] Test Stripe integration with test keys first
- [ ] Switch to live Stripe keys when ready to go live
- [ ] Verify database connection works
- [ ] Keep a secure backup of your credentials (not in git!)

## Restoring Your Local Configuration

If you need to restore your actual credentials locally:

1. **DO NOT edit the files directly if they're tracked by git**
2. Instead, create a separate `config.local.js` and `api/config.local.php`
3. Add these to `.gitignore`:
   ```
   config.local.js
   api/config.local.php
   ```
4. Update your code to load local config if it exists

## Questions?

Refer to the following guides for more details:
- `STRIPE_SETUP.md` - Stripe integration
- `HOSTINGER_DEPLOYMENT_GUIDE.md` - Hostinger deployment
- `ADMIN_SETUP.md` - Admin panel configuration

---

🔒 **Remember**: Your credentials are like keys to your house. Keep them safe and never share them publicly!

