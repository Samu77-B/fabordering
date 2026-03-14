<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// TODO: Fill these with your Hostinger DB credentials
$DB_HOST = 'localhost';            // Usually 'localhost' on Hostinger
$DB_NAME = 'your_database_name';   // Your database name from Hostinger
$DB_USER = 'your_database_user';   // Your MySQL username from Hostinger
$DB_PASS = 'your_database_password'; // Your MySQL password from Hostinger

// Must match CONFIG.ADMIN_TOKEN in config.js
$ADMIN_TOKEN = 'your-secure-admin-token-here';

// Stripe Secret Key - Get from environment variable for security
// Set this in your server's environment variables or .htaccess SetEnv
// Example in .htaccess: SetEnv STRIPE_SECRET_KEY "sk_live_..."
define('STRIPE_SECRET_KEY', getenv('STRIPE_SECRET_KEY') ?: '');

try {
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'DB connection failed',
        'details' => $e->getMessage(),
        'code' => $e->getCode()
    ]);
    exit;
}

function require_admin() {
    global $ADMIN_TOKEN;
    $headers = function_exists('getallheaders') ? getallheaders() : [];
    $auth = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    if (!preg_match('/Bearer\s+(.*)/i', $auth, $m) || $m[1] !== $ADMIN_TOKEN) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
}
?>


