const jokeForm = document.getElementById('jokeForm');
const jokeContainer = document.getElementById('jokeContainer');

jokeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById('searchTerm').value;
    await fetchJoke(searchTerm);
});

async function fetchJoke(searchTerm) {
    const url = searchTerm
        ? `https://icanhazdadjoke.com/search?term=${encodeURIComponent(searchTerm)}`
        : 'https://icanhazdadjoke.com/';

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            displayJokes(data.results);
        } else if (data.joke) {
            displayJokes([data]);
        } else {
            jokeContainer.innerHTML = '<p class="text-center">No jokes found. Try a different search term.</p>';
        }
    } catch (error) {
        console.error('Error fetching joke:', error);
        jokeContainer.innerHTML = '<p class="text-center">Error fetching joke. Please try again.</p>';
    }
}

function displayJokes(jokes) {
    jokeContainer.innerHTML = '';
    jokes.forEach(joke => {
        const jokeCard = createJokeCard(joke);
        jokeContainer.appendChild(jokeCard);
    });
}

function createJokeCard(joke) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
        <div class="card joke-card">
            <img src="https://picsum.photos/seed/${joke.id}/400/200" class="card-img-top joke-image" alt="Random image">
            <div class="card-body">
                <p class="card-text">${joke.joke}</p>
                <button class="btn btn-outline-primary favorite-btn" data-joke-id="${joke.id}">❤</button>
            </div>
        </div>
    `;

    const favoriteBtn = col.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', () => favoriteJoke(joke));

    return col;
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
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
            alert('Joke added to favorites!');
        } else {
            throw new Error(result.error || 'Unknown error occurred');
        }
    } catch (error) {
        console.error('Error saving favorite:', error);
        alert(`Error adding joke to favorites: ${error.message}`);
    }
}

// Fetch an initial joke when the page loads
fetchJoke();