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
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'] ?? null;

        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM favorites WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() > 0) {
                echo json_encode(['success' => true, 'message' => 'Joke deleted successfully.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Joke not found or already deleted.']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Missing joke ID.']);
            http_response_code(400); // Bad Request
        }
    } else {
        echo json_encode(['error' => 'Invalid request method.']);
        http_response_code(405); // Method Not Allowed
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    http_response_code(500); // Internal Server Error
}
?>