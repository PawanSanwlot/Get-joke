<?php
header('Content-Type: application/json');

// Database connection details
$host = 'localhost';
$dbname = 'joke_generator';
$username = 'root';
$password = '1234';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get the joke data from the request
    $joke = json_decode(file_get_contents('php://input'), true);

    // Validate joke data
    if (!isset($joke['id']) || !isset($joke['joke'])) {
        throw new Exception('Invalid joke data');
    }

    // Insert the joke into the database
    $stmt = $pdo->prepare("INSERT INTO favorites (joke_id, joke_text) VALUES (:joke_id, :joke_text)");
    $stmt->execute([
        ':joke_id' => $joke['id'],
        ':joke_text' => $joke['joke']
    ]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}