// État du jeu
let deck = [];
let currentCard = null;
let slots = [[], [], [], []]; // chaque emplacement contient une liste de cartes

// Génération d'un deck simple (valeurs et couleurs)
const valeurs = ["As", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Valet", "Dame", "Roi"];
const couleurs = ["♥️", "♦️", "♣️", "♠️"];

function initDeck() {
    const newDeck = [];
    for (let couleur of couleurs) {
        for (let valeur of valeurs) {
            newDeck.push({ valeur, couleur });
        }
    }
    // Mélanger
    for (let i = newDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    return newDeck;
}

function updateUI() {
    // Mise à jour du compteur de pioche
    document.getElementById("piocheCount").innerText = `Cartes restantes : ${deck.length}`;
    
    // Zone carte courante
    const zoneCourante = document.getElementById("carteCourante");
    if (currentCard) {
        zoneCourante.innerHTML = `
            <div class="card" id="currentCard">
                <div class="card-value">${currentCard.valeur}</div>
                <div class="card-suit">${currentCard.couleur}</div>
            </div>
        `;
        // Ajouter l'écouteur pour déplacer la carte courante
        document.getElementById("currentCard").addEventListener("click", () => {
            // On ne fait rien ici, le choix de l'emplacement se fait par clic sur slot
            alert("Clique maintenant sur un emplacement pour y poser la carte");
        });
    } else {
        zoneCourante.innerHTML = '<div class="card-placeholder">Aucune carte piochée</div>';
    }
    
    // Mise à jour des emplacements
    const slotsDivs = document.querySelectorAll(".slot");
    slotsDivs.forEach((slotDiv, index) => {
        // Vider le slot mais garder le texte "Emplacement X"
        const slotTitle = slotDiv.innerText.split(" ")[0] + " " + slotDiv.innerText.split(" ")[1];
        slotDiv.innerHTML = `<strong>${slotTitle}</strong>`;
        
        // Ajouter les cartes de cet emplacement
        slots[index].forEach((card, cardIndex) => {
            const cardDiv = document.createElement("div");
            cardDiv.className = "card";
            cardDiv.innerHTML = `<div class="card-value">${card.valeur}</div><div class="card-suit">${card.couleur}</div>`;
            // On pourrait permettre de recliquer sur une carte posée, mais pour le prototype simple on ne fait rien
            slotDiv.appendChild(cardDiv);
        });
    });
}

function piocher() {
    if (deck.length === 0) {
        alert("Plus de cartes dans la pioche !");
        return;
    }
    currentCard = deck.pop();
    updateUI();
}

function placerCarteDansSlot(slotIndex) {
    if (!currentCard) {
        alert("Aucune carte à placer. Pioche d'abord !");
        return;
    }
    if (slotIndex >= 0 && slotIndex < slots.length) {
        slots[slotIndex].push(currentCard);
        currentCard = null;
        updateUI();
    }
}

// Événements
document.getElementById("piocheBtn").addEventListener("click", piocher);

// Ajouter les écouteurs sur les emplacements
const slotsDivs = document.querySelectorAll(".slot");
slotsDivs.forEach((slotDiv, idx) => {
    slotDiv.addEventListener("click", () => {
        placerCarteDansSlot(idx);
    });
});

// Initialisation
deck = initDeck();
updateUI();