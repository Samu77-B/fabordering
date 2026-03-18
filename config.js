// Configuration for Hostinger deployment
// Production: https://teasandcs.com/ndo-fabhair/
// Override with config.local.js for Stripe keys and admin token (not in Git)
// Use window.CONFIG to avoid "already declared" when fallback runs
window.CONFIG = {
    // Backend API URL - Hostinger (PHP API + MySQL)
    API_BASE_URL: 'https://fabordering-production.up.railway.app/api',
    
    // Stripe Configuration
    // Get your keys from: https://dashboard.stripe.com/apikeys
    STRIPE_PUBLISHABLE_KEY: 'pk_live_51S2tRVQktyhqMRw4r7SkPtdmDUB3Mw4IzdZ8maYJBZXlf29UilrMP02CfH9k2C4pcJaA13KHysKfPUbac2qyrQg500RS2wGYUU',
    
    // Admin Configuration
    // Create a secure token for admin access
    ADMIN_TOKEN: ' ',
    
    // Environment
    ENVIRONMENT: 'production'
};
 