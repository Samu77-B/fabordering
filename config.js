// Configuration for Hostinger deployment
// Production: https://teasandcs.com/ndo-fabhair/
// Override with config.local.js for Stripe keys and admin token (not in Git)
const CONFIG = {
    // Backend API URL - Hostinger (PHP API + MySQL)
    API_BASE_URL: 'https://teasandcs.com/ndo-fabhair/api',
    
    // Stripe Configuration
    // Get your keys from: https://dashboard.stripe.com/apikeys
    STRIPE_PUBLISHABLE_KEY: 'pk_live_your_stripe_publishable_key_here',
    
    // Admin Configuration
    // Create a secure token for admin access
    ADMIN_TOKEN: 'your-secure-admin-token-here',
    
    // Environment
    ENVIRONMENT: 'production'
};
 