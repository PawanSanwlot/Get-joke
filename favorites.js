document.addEventListener('DOMContentLoaded', fetchFavorites);

// Fetch all favorites
async function fetchFavorites() {
    try {
        const response = await fetch('get_favorites.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const favorites = await response.json();
        if (favorites.error) {
            throw new Error(favorites.error);
        }
        displayFavorites(favorites);
    } catch (error) {
        console.error('Error fetching favorites:', error);
        document.getElementById('favoritesContainer').innerHTML = `
            <p class="text-center text-danger">Error fetching favorites: ${error.message}</p>`;
    }
}

// Display the list of favorites
function displayFavorites(favorites) {
    const favoritesContainer = document.getElementById('favoritesContainer');
    favoritesContainer.innerHTML = '';

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p class="text-center">No favorite jokes saved yet.</p>';
        return;
    }

    favorites.forEach(favorite => {
        const favoriteCard = createFavoriteCard(favorite);
        favoritesContainer.appendChild(favoriteCard);
    });

    // Attach event listener to the delete-all button
    const deleteAllButton = document.getElementById('deleteAll');
    if (deleteAllButton) {
        deleteAllButton.removeEventListener('click', deleteAllFavorites);
        deleteAllButton.addEventListener('click', deleteAllFavorites);
    }
}

// Create a card for a single favorite joke
function createFavoriteCard(favorite) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
        <div class="card favorite-joke">
            <div class="card-body">
                <p class="card-text">${favorite.joke_text}</p>
                <p class="favorite-date">Saved on: ${new Date(favorite.created_at).toLocaleString()}</p>
                <button class="btn btn-danger btn-sm mt-2" onclick="deleteFavorite(${favorite.id})">Delete</button>
            </div>
        </div>
    `;
    return col;
}

// Delete a single favorite
async function deleteFavorite(id) {
    try {
        const response = await fetch('delete_favorite.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        const result = await response.json();
        if (result.success) {
            alert(result.message || 'Joke removed from favorites!');
            fetchFavorites(); // Refresh the favorites list
        } else {
            alert(result.error || 'Failed to remove joke. Please try again.');
        }
    } catch (error) {
        console.error('Error deleting favorite:', error);
        alert('An error occurred while deleting the joke.');
    }
}

// Delete all favorites
async function deleteAllFavorites() {
    try {
        const response = await fetch('delete_all_favorites.php', {
            method: 'POST',
        });

        const result = await response.json();
        if (result.success) {
            alert(result.message || 'All favorite jokes cleared!');
            fetchFavorites(); // Refresh the favorites list
        } else {
            alert(result.error || 'Failed to clear favorites. Please try again.');
        }
    } catch (error) {
        console.error('Error deleting all favorites:', error);
        alert('An error occurred while clearing favorites.');
    }
}
