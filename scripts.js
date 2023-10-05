// Déclaration des variables pour les noms des joueurs, scores, le joueur actuel et les éléments DOM
let playerNames, scores, roundScore, activePlayer, gamePlaying;
const playerNamesValue = [document.getElementById('name-1'), document.getElementById('name-2')];
const globalScore = [document.getElementById('score-1'), document.getElementById('score-2')];
const currentScore = [document.getElementById('current-1'), document.getElementById('current-2')];
const dice = document.querySelector('.dice-img');

// Fonction pour demander les noms des joueurs
function getPlayerNames() {
  playerNames = [];
  playerNames[0] = prompt("Nom du Joueur 1 :") || "Joueur 1";
  playerNames[1] = prompt("Nom du Joueur 2 :") || "Joueur 2";

  // Mettre à jour les noms des joueurs
  playerNamesValue[0].textContent = playerNames[0];
  playerNamesValue[1].textContent = playerNames[1];
}

// Fonction pour initialiser le jeu
function init() {
  getPlayerNames(); // Demander les noms des joueurs

  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // Masquer le dé au début du jeu
  dice.style.display = 'none';

  // Initialiser les scores à 0 dans l'interface graphique
  globalScore[0].textContent = '0';
  globalScore[1].textContent = '0';
  currentScore[0].textContent = '0';
  currentScore[1].textContent = '0';

  // Supprimer les classes "winner" et "active" des éléments HTML des joueurs
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-2-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-2-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.add('active');
}

// Fonction pour passer au joueur suivant
function nextPlayer() {
  // Réinitialiser le score ROUND du joueur actif
  roundScore = 0;

  // Mettre à jour l'interface graphique
  currentScore[activePlayer].textContent = '0';

  // Changer de joueur actif
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // Mettre en évidence le joueur actif dans l'interface graphique
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.player-2-panel').classList.toggle('active');

  // Cacher le dé
  dice.style.display = 'none';
}

// Déclaration d'une variable pour indiquer si le jeu est en attente
let gameWaiting = false;

// Fonction pour gérer le lancer de dés
function rollDice() {
  if (gamePlaying && !gameWaiting) {
    // Désactiver les boutons pendant 501ms
    disableButtons();
    
    // Générer un nombre aléatoire entre 1 et 6
    const diceScore = Math.floor(Math.random() * 6) + 1;

    // Afficher le résultat du lancer de dés dans l'interface graphique
    dice.style.display = 'block';
    dice.src = `img/dice-${diceScore}.png`;

    // Mettre à jour le score ROUND si le résultat du dé n'est pas 1
    if (diceScore !== 1) {
      // Ajouter le score au score ROUND du joueur actif
      roundScore += diceScore;
      currentScore[activePlayer].textContent = roundScore;
    } else {
      // Afficher le dé pendant 500ms avant de passer au joueur suivant
      setTimeout(() => {
        nextPlayer();
      }, 500);
    }
    // Réactiver les boutons après 501ms
    setTimeout(enableButtons, 501);
  }
}


// Fonction pour gérer le bouton "Hold"
// Fonction pour gérer le bouton "Hold"
function hold() {
  if (gamePlaying && !gameWaiting) {
    // Désactiver les boutons pendant 501ms
    disableButtons();
    
    // Ajouter le score ROUND au score GLOBAL du joueur actif
    scores[activePlayer] += roundScore;
    
    // Mettre à jour l'interface graphique
    globalScore[activePlayer].textContent = scores[activePlayer];
    
    // Vérifier si le joueur a gagné
    if (scores[activePlayer] >= 100) {
      playerNamesValue[activePlayer].textContent += " l'emporte !";
      dice.style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      // Passer au joueur suivant
      nextPlayer();
    }
    // Réactiver les boutons après 501ms
    setTimeout(enableButtons, 501);
  }
}

// Fonction pour désactiver les boutons
function disableButtons() {
  document.querySelector('.btn-roll').setAttribute('disabled', 'true');
  document.querySelector('.btn-hold').setAttribute('disabled', 'true');
}

// Fonction pour réactiver les boutons
function enableButtons() {
  document.querySelector('.btn-roll').removeAttribute('disabled');
  document.querySelector('.btn-hold').removeAttribute('disabled');
}
// Événement pour lancer le dé
document.querySelector('.btn-roll').addEventListener('click', rollDice);

// Événement pour le bouton "Hold"
document.querySelector('.btn-hold').addEventListener('click', hold);

// Événement pour recommencer le jeu
document.querySelector('.btn-new').addEventListener('click', init);
