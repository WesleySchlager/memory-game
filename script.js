/* Wesley Schlager */
/* Memory Game */
/* script.js */

// Select all cards and the restart button
const cards = document.querySelectorAll('.card'); // nodeList of all cards
const restartButton = document.querySelector('.restart'); // restart button
 
// Game state variables
let hasFlippedCard = false;
let lockBoard = false;
let firstCard = null;
let secondCard = null;

// Function to flip 2 cards
function flipCard() {
    if (lockBoard || this === firstCard) return; // return(do nothing) if board is locked or clicking same card

    this.classList.add('flip'); //add flip style class for flip effect

    if (!hasFlippedCard) { //if no card has been flipped yet
        hasFlippedCard = true; // next click will skip this if 
        firstCard = this; // firstCard stores the current card
        return; 
    }

    // Second card clicked
    secondCard = this; // Store second card click
    checkForMatch(); //Check if firstCard and secondCard data-name match
}

// Function to check if two cards match
function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name; // true if match based on html data-name
    isMatch ? disableCards() : unflipCards(); // Ternary, if isMatch is true, call disableCards, if false, call unFlipCards
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard); // remove event listener first card
    secondCard.removeEventListener('click', flipCard); // remove event listener second card
    resetGameState(); //Reset game state after match firstCard,SecondCard = Null / hasFlippedCard = False
}

// Unflip unmatched cards
function unflipCards() {
    lockBoard = true; // Disable clicking more cards
    setTimeout(() => { //executes code with 1 second delay
        firstCard.classList.remove('flip'); //remove flip style from first flipped card
        secondCard.classList.remove('flip'); //remove flip style from second flipped card
        resetGameState(); // Reset state variables
    }, 1000); // 1000 milisecond (1 second)
}

// Reset state variables
function resetGameState() {
    [hasFlippedCard, lockBoard] = [false, false]; // no flipped cards, lockboard not locked
    [firstCard, secondCard] = [null, null]; // reset previous cards
}

// Shuffle cards
function shuffle() {
    cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * cards.length); // uses arcane magic to generate random number
        card.style.order = randomPos; //assign random number to card grid position
    });
}

// Restart the game
function restartGame() {
    const transitions = document.querySelectorAll('.transitions'); // select all with class transitions
    transitions.forEach(transition => { // for each 
        transition.classList.remove('transitions'); // Remove transitions class (made the card positions visible when restarting)
    });
    cards.forEach(card => { // For each card
        card.classList.remove('flip'); // Remove flip style class
        card.addEventListener('click', flipCard); // add flipCard on click event listener
    });
    shuffle(); //Shuffle all cards
    resetGameState(); // Reset state variables

    setTimeout(() => {
        transitions.forEach(transition => { // for each  
        transition.classList.add('transitions'); // re add transition class
    });
},100) //100ms delay;
} // End restartGame

// Initialize the game
(function initGame() {
    shuffle(); // Shuffle Cards
    cards.forEach(card => card.addEventListener('click', flipCard)); // Add flipcard click event lisener to all cards
    restartButton.addEventListener('click', restartGame); // Add restartGame to restartButton on click event
})(); // (); Automatically executes the function
