const API_URL = 'https://v2.jokeapi.dev/joke/Any?type=single%2Ctwopart&lang=fr&safe-mode';

const jokeOutput = document.getElementById('jokeOutput');
const newJokeBtn = document.getElementById('newJokeBtn');
const copyBtn = document.getElementById('copyBtn');
const statusMessage = document.getElementById('statusMessage');

let currentJoke = '';

function setLoading(isLoading) {
  newJokeBtn.disabled = isLoading;
  newJokeBtn.textContent = isLoading ? 'Chargement…' : 'Nouvelle blague';
}

function renderJoke(joke) {
  jokeOutput.replaceChildren();

  if (joke.type === 'twopart') {
    const setup = document.createElement('p');
    setup.className = 'joke-text';
    setup.textContent = joke.setup;

    const delivery = document.createElement('p');
    delivery.className = 'joke-text';
    delivery.textContent = joke.delivery;

    jokeOutput.append(setup, delivery);
    currentJoke = `${joke.setup}\n${joke.delivery}`;
  } else {
    const jokeText = document.createElement('p');
    jokeText.className = 'joke-text';
    jokeText.textContent = joke.joke;
    jokeOutput.append(jokeText);
    currentJoke = joke.joke;
  }

  copyBtn.disabled = false;
}

async function fetchJoke() {
  setLoading(true);
  copyBtn.disabled = true;
  statusMessage.textContent = '';
  jokeOutput.innerHTML = '<p class="placeholder">Recherche d’une blague…</p>';

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.error || (!data.joke && (!data.setup || !data.delivery))) {
      throw new Error('Réponse invalide de l’API');
    }

    renderJoke(data);
  } catch (error) {
    currentJoke = '';
    jokeOutput.innerHTML = '<p class="placeholder">Impossible de charger une blague pour le moment.</p>';
    statusMessage.textContent = 'Vérifie ta connexion puis réessaie.';
    console.error('Joke API error:', error);
  } finally {
    setLoading(false);
  }
}

async function copyJoke() {
  if (!currentJoke) return;

  try {
    await navigator.clipboard.writeText(currentJoke);
    statusMessage.textContent = 'Blague copiée !';
  } catch (error) {
    statusMessage.textContent = 'La copie automatique n’est pas disponible dans ce navigateur.';
    console.error('Clipboard error:', error);
  }
}

newJokeBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyJoke);

fetchJoke();
