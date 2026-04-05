// === État du jeu ===
let deck = [];
let carteCourante = null; // stocke la carte piochée (objet)

// Initialisation : créer 15 cartes numérotées
function initDeck() {
    deck = [];
    for (let i = 1; i <= 15; i++) {
        deck.push({ id: i, nom: `Carte ${i}` });
    }
    melanger(deck);
    mettreAJourPioche();
}

// Mélange aléatoire
function melanger(tableau) {
    for (let i = tableau.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tableau[i], tableau[j]] = [tableau[j], tableau[i]];
    }
}

// Met à jour l'affichage du nombre de cartes
function mettreAJourPioche() {
    const nbSpan = document.getElementById("nbCartes");
    if (nbSpan) nbSpan.innerText = deck.length;
}

// Affiche la carte courante dans la zone du milieu
function afficherCarteCourante() {
    const zoneCourante = document.getElementById("courante");
    if (!carteCourante) {
        zoneCourante.innerHTML = "⬅️ Pioche une carte";
        zoneCourante.style.background = "#fdf5e6";
        return;
    }
    zoneCourante.innerHTML = carteCourante.nom;
    zoneCourante.style.background = "#ffe5b4";
}

// Piocher
function piocher() {
    if (deck.length === 0) {
        alert("Plus de cartes !");
        return;
    }
    // On prend la première carte du deck
    carteCourante = deck.shift();
    mettreAJourPioche();
    afficherCarteCourante();
}

// Déposer la carte courante dans une zone
function deposerDansZone(zoneId) {
    if (!carteCourante) {
        alert("Pioche d'abord une carte !");
        return false;
    }
    
    // === ICI tu pourras plus tard ajouter des règles ===
    // Pour l'instant : on accepte toujours le dépôt
    console.log(`Carte ${carteCourante.nom} déposée dans zone ${zoneId}`);
    
    // On supprime la carte courante (elle n'est plus en main)
    carteCourante = null;
    afficherCarteCourante();
    return true;
}

// --- Gestion des événements ---

// 1) Pioche au clic
document.getElementById("pioche").addEventListener("click", piocher);

// 2) Drag & Drop (glisser depuis la carte courante)
const carteCouranteElement = document.getElementById("courante");

// Rendre la carte courante "draggable"
carteCouranteElement.setAttribute("draggable", "true");

carteCouranteElement.addEventListener("dragstart", (e) => {
    if (!carteCourante) {
        e.preventDefault();
        return false;
    }
    e.dataTransfer.setData("text/plain", "carte");
    e.dataTransfer.effectAllowed = "move";
});

// 3) Zones : accepter le drop
const zones = document.querySelectorAll(".zone");

zones.forEach(zone => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault(); // Nécessaire pour autoriser le drop
        e.dataTransfer.dropEffect = "move";
        zone.classList.add("drag-over");
    });
    
    zone.addEventListener("dragleave", () => {
        zone.classList.remove("drag-over");
    });
    
    zone.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.classList.remove("drag-over");
        const zoneId = zone.getAttribute("data-zone");
        deposerDansZone(zoneId);
    });
});

// Option : cliquer sur une zone (si tu préfères cliquer plutôt que glisser)
zones.forEach(zone => {
    zone.addEventListener("click", () => {
        const zoneId = zone.getAttribute("data-zone");
        deposerDansZone(zoneId);
    });
});

// Démarrer le jeu
initDeck();