const formes = ['&diams;', '&hearts;', '&spades;', '&clubs;'];
const nb = ['A', '5', '10', '8', '6', '7', '4', '2', '3', '9', 'D', 'R', 'V'];

/*Espace GENERATIONS DES CARTES RANDOM*/
function RandomCartes() {
    const RandomFormes = formes[Math.floor(Math.random() * formes.length)];
    const RandomNb = nb[Math.floor(Math.random() * nb.length)];

    return `${RandomNb} ${RandomFormes}`;
}

function creationCartes(cartesValue) {
    const card = document.createElement('div');
    card.className = 'card';

    // Déterminez la forme de la carte et ajoutez une classe correspondante
    if (cartesValue.includes('&hearts;') || cartesValue.includes('&diams;')) {
        card.classList.add('heart', 'diamond');
    } else {
        card.classList.add('spade', 'club');
    }

    card.innerHTML = cartesValue;
    return card;
}


const btn = document.getElementById('btn');
const triFormesBtn = document.getElementById('triFormesBtn');
const triNbBtn = document.getElementById('triNbBtn');
const deck = document.getElementById('deck');


/*Espace AFFICHAGE DES CARTES AVEC LEURS VALEURS ET FORMES*/
btn.addEventListener('click', () => {
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }

    const carteMax = 10;
    let index = 0;

    const cartesSuivantes = () => {
        if (index < carteMax) {
            const valeurs = RandomCartes();
            const element = creationCartes(valeurs);
            deck.appendChild(element);

            setTimeout(() => {
                element.classList.add('card-animation');
            }, 100);

            index++;
            if (index < carteMax) {
                setTimeout(cartesSuivantes, 300);
            }
        }
    };

    cartesSuivantes();
});

/*Espace TRI PAR FORME DE LA CARTE*/
triFormesBtn.addEventListener('click', () => {
    const cards = Array.from(deck.children);

    cards.sort((a, b) => {
        const shapeA = a.textContent.split(' ')[1];
        const shapeB = b.textContent.split(' ')[1];
        return shapeA.localeCompare(shapeB);
    });

    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }

    for (const card of cards) {
        deck.appendChild(card);
    }
});

/*Espace TRI PAR VALEURS DE LA CARTE*/
triNbBtn.addEventListener('click', () => {
    const cards = Array.from(deck.children);

    cards.sort((a, b) => {
        const valueA = a.textContent.split(' ')[0];
        const valueB = b.textContent.split(' ')[0];
        return compareNombres(valueA, valueB);
    });

    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }

    for (const card of cards) {
        deck.appendChild(card);
    }
});

function compareNombres(valueA, valueB) {
    const ordre = ['A', '5', '10', '8', '6', '7', '4', '2', '3', '9', 'D', 'R', 'V'];
    return ordre.indexOf(valueA) - ordre.indexOf(valueB);
}
