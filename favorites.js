document.addEventListener('DOMContentLoaded', fetchFavorites);

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
        document.getElementById('favoritesContainer').innerHTML = `<p class="text-center text-danger">Error fetching favorites: ${error.message}</p>`;
    }
}

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
}

function createFavoriteCard(favorite) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
        <div class="card favorite-joke">
            <div class="card-body">
                <p class="card-text">${favorite.joke_text}</p>
                <p class="favorite-date">Saved on: ${new Date(favorite.created_at).toLocaleString()}</p>
            </div>
        </div>
    `;
    return col;
}