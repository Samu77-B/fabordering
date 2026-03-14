# Stripe Secret Key Setup Guide

## Important Security Change

The Stripe secret key has been moved from hardcoded value to environment variable for security.

## Setup Instructions

### Option 1: Using .htaccess (Apache)

Add this line to your `.htaccess` file in the root directory:

```apache
SetEnv STRIPE_SECRET_KEY "sk_live_your_actual_key_here"
```

**Important:** 
- Replace `sk_live_your_actual_key_here` with your actual Stripe secret key
- Do NOT commit this to version control
- Keep your .htaccess file secure

### Option 2: Using PHP Environment Variables

In your `api/config.php`, you can temporarily set it (for testing only):

```php
putenv('STRIPE_SECRET_KEY=sk_live_your_actual_key_here');
```

**Note:** This is less secure than using server environment variables.

### Option 3: Hostinger Control Panel

1. Log into your Hostinger control panel
2. Navigate to your domain's settings
3. Find "Environment Variables" or "PHP Settings"
4. Add a new environment variable:
   - Name: `STRIPE_SECRET_KEY`
   - Value: `sk_live_your_actual_key_here`

### Option 4: Using .env File (if supported)

Create a `.env` file in your root directory:

```
STRIPE_SECRET_KEY=sk_live_your_actual_key_here
```

**Important:** Add `.env` to your `.gitignore` file!

## Verification

After setting the environment variable, test the payment endpoint to ensure it works correctly.

## Security Notes

- Never commit your Stripe secret key to version control
- Use environment variables or secure configuration files
- Rotate your keys if they are ever exposed
- Use different keys for development and production
