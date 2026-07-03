// Configuration du jeu
const GAME_DURATION = 30; // secondes
const COLORS = [
    { name: 'ROUGE', color: '#ef4444', id: 'red' },
    { name: 'BLEU', color: '#3b82f6', id: 'blue' },
    { name: 'VERT', color: '#10b981', id: 'green' },
    { name: 'JAUNE', color: '#f59e0b', id: 'yellow' }
];

// État du jeu
let gameState = {
    score: 0,
    timeLeft: GAME_DURATION,
    targetColor: null,
    combo: 1,
    maxCombo: 1,
    correctAnswers: 0,
    totalClicks: 0,
    timer: null,
    bestScore: 0
};

// Éléments DOM
const screens = {
    home: document.getElementById('homeScreen'),
    game: document.getElementById('gameScreen'),
    end: document.getElementById('endScreen')
};

const elements = {
    startBtn: document.getElementById('startBtn'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    homeBtn: document.getElementById('homeBtn'),
    score: document.getElementById('score'),
    timer: document.getElementById('timer'),
    targetColor: document.getElementById('targetColor'),
    targetName: document.getElementById('targetName'),
    colorGrid: document.getElementById('colorGrid'),
    comboDisplay: document.getElementById('comboDisplay'),
    comboValue: document.getElementById('comboValue'),
    bestScore: document.getElementById('bestScore'),
    finalScore: document.getElementById('finalScore'),
    correctAnswers: document.getElementById('correctAnswers'),
    accuracy: document.getElementById('accuracy'),
    maxCombo: document.getElementById('maxCombo'),
    newRecordBadge: document.getElementById('newRecordBadge')
};

// Gestion PWA
let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const installBtn = document.getElementById('installBtn');
const dismissBtn = document.getElementById('dismissBtn');

// Initialisation
function init() {
    loadBestScore();
    setupEventListeners();
    createColorButtons();
    setupPWA();
}

// Charger le meilleur score
function loadBestScore() {
    const saved = localStorage.getItem('colorRushBestScore');
    gameState.bestScore = saved ? parseInt(saved) : 0;
    elements.bestScore.textContent = gameState.bestScore;
}

// Sauvegarder le meilleur score
function saveBestScore() {
    if (gameState.score > gameState.bestScore) {
        gameState.bestScore = gameState.score;
        localStorage.setItem('colorRushBestScore', gameState.bestScore);
        elements.newRecordBadge.classList.remove('hidden');
        return true;
    }
    return false;
}

// Configuration des événements
function setupEventListeners() {
    elements.startBtn.addEventListener('click', startGame);
    elements.playAgainBtn.addEventListener('click', startGame);
    elements.homeBtn.addEventListener('click', () => showScreen('home'));
}

// Créer les boutons de couleur
function createColorButtons() {
    elements.colorGrid.innerHTML = '';
    COLORS.forEach(colorObj => {
        const btn = document.createElement('button');
        btn.className = 'color-btn';
        btn.style.backgroundColor = colorObj.color;
        btn.dataset.colorId = colorObj.id;
        btn.addEventListener('click', () => handleColorClick(colorObj.id));
        elements.colorGrid.appendChild(btn);
    });
}

// Afficher un écran
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Démarrer le jeu
function startGame() {
    // Réinitialiser l'état
    gameState.score = 0;
    gameState.timeLeft = GAME_DURATION;
    gameState.combo = 1;
    gameState.maxCombo = 1;
    gameState.correctAnswers = 0;
    gameState.totalClicks = 0;
    
    updateUI();
    showScreen('game');
    newRound();
    startTimer();
}

// Nouvelle manche
function newRound() {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    gameState.targetColor = randomColor;
    
    elements.targetColor.style.backgroundColor = randomColor.color;
    elements.targetName.textContent = randomColor.name;
    elements.targetName.style.color = randomColor.color;
}

// Démarrer le timer
function startTimer() {
    clearInterval(gameState.timer);
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        elements.timer.textContent = gameState.timeLeft;
        
        // Animation de warning quand il reste peu de temps
        if (gameState.timeLeft <= 10) {
            elements.timer.style.color = '#ef4444';
        }
        
        if (gameState.timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Gérer le clic sur une couleur
function handleColorClick(colorId) {
    gameState.totalClicks++;
    
    const clickedBtn = document.querySelector(`[data-color-id="${colorId}"]`);
    
    if (colorId === gameState.targetColor.id) {
        // Bonne réponse
        gameState.correctAnswers++;
        const points = 10 * gameState.combo;
        gameState.score += points;
        gameState.combo++;
        
        if (gameState.combo > gameState.maxCombo) {
            gameState.maxCombo = gameState.combo;
        }
        
        // Animations
        clickedBtn.classList.add('correct');
        setTimeout(() => clickedBtn.classList.remove('correct'), 500);
        
        // Afficher le combo si > 1
        if (gameState.combo > 1) {
            elements.comboValue.textContent = gameState.combo;
            elements.comboDisplay.classList.add('show');
        }
        
        // Vibration haptique (si disponible)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        updateUI();
        newRound();
    } else {
        // Mauvaise réponse
        gameState.combo = 1;
        elements.comboDisplay.classList.remove('show');
        
        clickedBtn.classList.add('wrong');
        setTimeout(() => clickedBtn.classList.remove('wrong'), 500);
        
        // Vibration d'erreur
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }
}

// Mettre à jour l'interface
function updateUI() {
    elements.score.textContent = gameState.score;
    elements.timer.textContent = gameState.timeLeft;
}

// Terminer le jeu
function endGame() {
    clearInterval(gameState.timer);
    
    // Calculer les statistiques
    const accuracy = gameState.totalClicks > 0 
        ? Math.round((gameState.correctAnswers / gameState.totalClicks) * 100)
        : 0;
    
    // Afficher les résultats
    elements.finalScore.textContent = gameState.score;
    elements.correctAnswers.textContent = gameState.correctAnswers;
    elements.accuracy.textContent = accuracy + '%';
    elements.maxCombo.textContent = gameState.maxCombo;
    
    // Vérifier nouveau record
    const isNewRecord = saveBestScore();
    if (!isNewRecord) {
        elements.newRecordBadge.classList.add('hidden');
    }
    
    elements.bestScore.textContent = gameState.bestScore;
    
    showScreen('end');
}

// Configuration PWA
function setupPWA() {
    // Écouter l'événement beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Afficher le prompt après 5 secondes
        setTimeout(() => {
            installPrompt.classList.remove('hidden');
        }, 5000);
    });
    
    // Bouton d'installation
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            installPrompt.classList.add('hidden');
        }
        
        deferredPrompt = null;
    });
    
    // Bouton de rejet
    dismissBtn.addEventListener('click', () => {
        installPrompt.classList.add('hidden');
    });
    
    // Cacher le prompt si l'app est déjà installée
    window.addEventListener('appinstalled', () => {
        installPrompt.classList.add('hidden');
    });
}

// Enregistrer le service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('Service Worker enregistré'))
            .catch(err => console.log('Erreur Service Worker:', err));
    });
}

// Lancer l'initialisation
init();
