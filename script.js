const jokeForm = document.getElementById('jokeForm');
const jokeContainer = document.getElementById('jokeContainer');

// Handle form submission
jokeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById('searchTerm').value.trim();

    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
    }

    await fetchJokes(searchTerm);
});

// Fetch jokes from the API
async function fetchJokes(searchTerm) {
    const url = `https://icanhazdadjoke.com/search?term=${encodeURIComponent(searchTerm)}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            displayJokes(data.results);
        } else {
            jokeContainer.innerHTML = '<p class="text-center">No jokes found. Try a different search term.</p>';
        }
    } catch (error) {
        console.error('Error fetching jokes:', error);
        handleApiError(error, jokeContainer);
    }
}

function displayJokes(jokes) {
    const jokeContainer = document.getElementById('jokeContainer');
    jokeContainer.innerHTML = '';

    if (jokes.length === 0) {
        jokeContainer.innerHTML = '<p class="text-center">No jokes found. Try a different search term.</p>';
        return;
    }

    jokes.forEach((joke) => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';

        // Construct the image URL or use a fallback
        const imageUrl = joke.id
            ? `https://picsum.photos/seed/${joke.id}/400/200`
            : 'https://via.placeholder.com/400x200?text=No+Image';

        col.innerHTML = `
            <div class="card joke-card">
                <img src="${imageUrl}" class="card-img-top joke-image" alt="Random joke image">
                <div class="card-body">
                    <p class="card-text">${joke.joke}</p>
                    <button class="btn btn-outline-primary favorite-btn" data-joke-id="${joke.id}">❤</button>
                </div>
            </div>
        `;
        jokeContainer.appendChild(col);
    });

    attachFavoriteButtonListeners();
}

function attachFavoriteButtonListeners() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach((button) => {
        button.addEventListener('click', async (event) => {
            const jokeId = event.target.getAttribute('data-joke-id');
            const jokeText = event.target.closest('.card-body').querySelector('.card-text').innerText;

            if (jokeId && jokeText) {
                // Create a joke object to save as a favorite
                const joke = {
                    id: jokeId,
                    joke_text: jokeText,
                };

                // Call the favoriteJoke() function to save the joke
                await favoriteJoke(joke);
            }
        });
    });
}

async function favoriteJoke(joke) {
    try {
        const response = await fetch('save_favorite.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(joke),
        });

        const result = await response.json();
        if (result.success) {
            alert('Joke added to favorites!');
        } else {
            throw new Error(result.error || 'Unknown error occurred while saving favorite.');
        }
    } catch (error) {
        console.error('Error saving favorite:', error);
        alert('Failed to save joke to favorites.');
    }
}



async function favoriteJoke(joke) {
    console.log('Data being sent to save_favorite.php:', joke); // Debugging line

    try {
        const response = await fetch('save_favorite.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: joke.id,
                joke_text: joke.joke_text // Ensure this matches the key in PHP
            }),
        });

        const result = await response.json();
        if (result.success) {
            alert('Joke added to favorites!');
        } else {
            throw new Error(result.error || 'Unknown error occurred while saving favorite.');
        }
    } catch (error) {
        console.error('Error saving favorite:', error);
        alert('Failed to save joke to favorites.');
    }
}



// Handle API errors
function handleApiError(error, element) {
    element.innerHTML = `
        <div class="text-center">
            <p class="text-danger">Error: ${error.message || 'An error occurred.'}</p>
        </div>
    `;
}
