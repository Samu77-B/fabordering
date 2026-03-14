<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$result = [
    'config_local_exists' => file_exists(__DIR__ . '/config.local.php'),
    'db_connection' => null,
    'error' => null,
    'tables' => []
];

$DB_HOST = 'localhost';
$DB_NAME = 'your_database_name';
$DB_USER = 'your_database_user';
$DB_PASS = 'your_database_password';

if (file_exists(__DIR__ . '/config.local.php')) {
    require_once __DIR__ . '/config.local.php';
}

try {
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    $result['db_connection'] = 'success';
    $result['tables'] = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
} catch (Exception $e) {
    $result['db_connection'] = 'failed';
    $result['error'] = $e->getMessage();
}

echo json_encode($result, JSON_PRETTY_PRINT);
