# Get Joke 
This project is a simple web application that allows users to search for jokes, display them as cards with random images, and save their favorites to a MySQL database. It's built using HTML, CSS, JavaScript, and PHP, with Bootstrap for styling.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Laragon](https://laragon.org/download/) (Full version)
- Web browser (e.g., Chrome, Firefox)

## Installation

1. Install Laragon by following the installation wizard.
2. Start Laragon and click the "Start All" button to start Apache and MySQL services.
3. In Laragon, right-click in the main window and select "Create new > Blank Project".
4. Name your project "joke-generator" and click "OK".
5. Navigate to the project folder: `C:\\laragon\\www\\joke-generator` (default Laragon path).
6. Create the following files in this folder:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `save_favorite.php`
7. Copy the provided code into each respective file.

## Database Setup

1. In Laragon, click the "Database" button to open MySQL.
2. Right-click on the left sidebar and choose "Create new > Database".
3. Name the database `joke_db` and click "OK".
4. With the `joke_db` database selected, click on the "Query" tab and paste the following SQL:

   ```sql
   CREATE TABLE favorites (
       id INT AUTO_INCREMENT PRIMARY KEY,
       joke_id VARCHAR(255) NOT NULL,
       joke_text TEXT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. Click the "Run" button to create the table.

## Configuration

Update the database connection details in `save_favorite.php`:

```php
$host = 'localhost';
$dbname = 'joke_db';
$username = 'root';
$password = '';  // Your MySQL password 
```

## Usage

1. Ensure Laragon is running with Apache and MySQL services started.
2. In Laragon, click the "Web" button (or visit http://localhost).
3. Click on the "get-joke" project link.
4. Use the search bar to find jokes or click "Get Joke" without a search term for random jokes.
5. Click the heart icon on a joke card to save it as a favorite.

## Troubleshooting

- If you make changes to the PHP file, you might need to restart the Apache server in Laragon (click "Stop" then "Start All").
- If you encounter database connection issues, double-check the connection details in `save_favorite.php`.
- Ensure that the `get-joke` database and `favorites` table are created correctly.
- Check Laragon's error logs if you experience any issues with the server or PHP execution.
