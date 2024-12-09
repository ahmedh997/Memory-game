const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'icecream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'icecream',
        img: 'images/ice-cream.png'
    },
];

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
let cardsChosen = [];
let cardsChosenId = [];
const cardsWon = [];



// Load sound effects
const flipSound = new Audio('sounds/preview.mp3'); 
const matchSound = new Audio('sounds/mixkit-correct-positive-notification-957.wav'); 
const wrongSound = new Audio('sounds/mixkit-wrong-answer-bass-buzzer-948.wav'); 
const winSound = new Audio('sounds/mixkit-video-game-win-2016.wav'); 




// Function to create the game board
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('width', 100);
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gridDisplay.appendChild(card);
    }
}
createBoard();

function checkMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        alert('You clicked the same card!');
    } else if (cardsChosen[0] === cardsChosen[1]) {
        // Match found
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
        matchSound.play(); // Play match sound
    } else {
        // No match
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
        wrongSound.play(); // Play wrong match sound
    }

    resultDisplay.textContent = cardsWon.length;
    cardsChosen = [];
    cardsChosenId = [];

    // Check for game completion
    if (cardsWon.length === cardArray.length / 2) {
        resultDisplay.innerHTML = 'Congrats! You found them all!';
        winSound.play(); // Play win sound
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id');

    // Prevent the same card from being clicked twice
    if (!cardsChosenId.includes(cardId)) {
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        flipSound.play(); // Play flip sound

        if (cardsChosen.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}
