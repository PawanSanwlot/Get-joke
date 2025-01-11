<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// Database connection details
$host = 'localhost';
$dbname = 'joke_generator';
$username = 'root';
$password = '1234';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch favorites from the database
    $stmt = $pdo->query("SELECT * FROM favorites ORDER BY created_at DESC");
    $favorites = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($favorites);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}