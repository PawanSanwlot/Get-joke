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

    // Decode the incoming JSON data
    $data = json_decode(file_get_contents('php://input'), true);
    $jokeId = $data['id'] ?? null; // Extract 'id' from JSON
    $jokeText = $data['joke_text'] ?? ''; // Extract 'joke_text' from JSON

    if ($jokeId && $jokeText) {
        // Insert data into the 'favorites' table
        $stmt = $pdo->prepare("INSERT INTO favorites (joke_id, joke_text) VALUES (?, ?)");
        $stmt->execute([$jokeId, $jokeText]);
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid joke data.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>