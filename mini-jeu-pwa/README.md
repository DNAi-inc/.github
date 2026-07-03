# 🎮 Color Rush - Mini Jeu PWA

Un jeu de réflexes addictif créé avec Cursor ! Testez votre vitesse en appuyant sur la bonne couleur le plus rapidement possible.

## 🚀 Comment tester sur votre téléphone

### Méthode 1 : Serveur local (Recommandé)

1. **Démarrer un serveur local** depuis Cursor :

```bash
cd mini-jeu-pwa
python3 -m http.server 8000
```

Ou avec Node.js :

```bash
npx serve
```

2. **Trouver votre adresse IP locale** :

```bash
# Sur macOS/Linux
ifconfig | grep "inet "

# Sur Windows
ipconfig
```

3. **Ouvrir sur votre téléphone** :
   - Assurez-vous que votre téléphone et votre ordinateur sont sur le même réseau WiFi
   - Ouvrez le navigateur de votre téléphone (Safari, Chrome, etc.)
   - Tapez : `http://[VOTRE_IP]:8000`
   - Exemple : `http://192.168.1.100:8000`

### Méthode 2 : Déploiement en ligne

Déployez gratuitement sur :

**Netlify Drop** (le plus simple) :
- Glissez-déposez le dossier `mini-jeu-pwa` sur [drop.netlify.com](https://app.netlify.com/drop)
- Vous obtenez un URL public immédiatement

**Vercel** :
```bash
npx vercel mini-jeu-pwa
```

**GitHub Pages** :
- Pousser le code sur GitHub
- Activer GitHub Pages dans les paramètres du repo

## 📱 Installer comme une app

Une fois ouvert dans votre navigateur mobile :

### Sur iOS (Safari) :
1. Appuyez sur le bouton "Partager" 
2. Sélectionnez "Sur l'écran d'accueil"
3. Confirmez

### Sur Android (Chrome) :
1. Appuyez sur le menu (⋮)
2. Sélectionnez "Ajouter à l'écran d'accueil"
3. Ou attendez le prompt automatique d'installation

## 🎯 Comment jouer

1. **Objectif** : Appuyez sur la couleur affichée en haut le plus vite possible
2. **Durée** : 30 secondes par partie
3. **Score** : 10 points par bonne réponse × combo
4. **Combo** : Enchaînez les bonnes réponses pour multiplier vos points !

## ✨ Fonctionnalités

- ✅ Interface tactile optimisée pour mobile
- ✅ PWA installable (fonctionne hors ligne)
- ✅ Système de combo pour plus de points
- ✅ Sauvegarde du meilleur score
- ✅ Statistiques détaillées à la fin
- ✅ Retour haptique (vibrations)
- ✅ Animations fluides
- ✅ Mode sombre
- ✅ Responsive design

## 🛠️ Technologies utilisées

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript Vanilla (ES6+)
- PWA (Progressive Web App)
- Service Worker (cache hors ligne)
- Web App Manifest
- Local Storage

## 📊 Structure du projet

```
mini-jeu-pwa/
├── index.html          # Page principale
├── styles.css          # Styles et animations
├── game.js             # Logique du jeu
├── manifest.json       # Configuration PWA
├── service-worker.js   # Cache hors ligne
└── README.md          # Documentation
```

## 🎨 Personnalisation

Vous pouvez facilement modifier :

- **Durée du jeu** : Changez `GAME_DURATION` dans `game.js`
- **Couleurs** : Modifiez le tableau `COLORS` dans `game.js`
- **Styles** : Personnalisez les variables CSS dans `:root` de `styles.css`
- **Points** : Ajustez le calcul dans la fonction `handleColorClick`

## 🐛 Dépannage

**Le jeu ne se charge pas ?**
- Vérifiez que tous les fichiers sont dans le même dossier
- Assurez-vous d'utiliser un serveur HTTP (pas file://)

**Impossible de se connecter depuis le téléphone ?**
- Vérifiez que vous êtes sur le même réseau WiFi
- Désactivez temporairement le pare-feu
- Utilisez l'adresse IP correcte (pas localhost)

**L'installation PWA ne fonctionne pas ?**
- Le site doit être servi en HTTPS (ou localhost)
- Certains navigateurs nécessitent plusieurs visites avant de proposer l'installation

## 📝 Améliorations futures

- [ ] Différents modes de jeu (rapide, zen, survie)
- [ ] Classement en ligne
- [ ] Sons et musique
- [ ] Plus de couleurs avec niveaux de difficulté
- [ ] Mode multijoueur local
- [ ] Succès et badges

## 📄 Licence

MIT - Créé avec ❤️ et Cursor
