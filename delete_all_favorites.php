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

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $stmt = $pdo->prepare("DELETE FROM favorites");
        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'All favorites have been deleted.']);
    } else {
        echo json_encode(['error' => 'Invalid request method.']);
        http_response_code(405); // Method Not Allowed
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    http_response_code(500); // Internal Server Error
}
?>