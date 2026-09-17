# BRNS Simulator

Bourse des Ressources Naturelles du Sénégal 🇸🇳

## Générateur de blagues

La version actuelle du projet contient un générateur de blagues aléatoires utilisant l'API externe [JokeAPI](https://jokeapi.dev/).

### Fonctionnalités

- chargement automatique d'une blague au démarrage ;
- bouton **Nouvelle blague** ;
- prise en charge des blagues en une partie et en deux parties ;
- mode sans contenu sensible (`safe-mode`) ;
- bouton pour copier la blague ;
- gestion des erreurs réseau ;
- interface responsive pour mobile et ordinateur.

### Lancer le projet

1. Clone le dépôt :

   ```bash
   git clone https://github.com/amdiaymamarket/brns-Simulator.git
   ```

2. Ouvre `index.html` dans un navigateur moderne.
3. Autorise les requêtes réseau si le navigateur le demande.

Aucune dépendance ni clé API n'est nécessaire. L'application utilise `fetch` et l'API publique JokeAPI directement depuis le navigateur.

### Fichiers principaux

```text
brns-Simulator/
├── index.html
├── style.css
├── script.js
├── README.md
├── LICENSE
└── .gitignore
```

## Licence

Ce projet est distribué sous licence MIT.
