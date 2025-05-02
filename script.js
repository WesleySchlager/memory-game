/* Wesley Schlager */
/* Memory Game */
/* script.js */


const cards = document.querySelectorAll('.card'); 
const restartButton = document.querySelector('.restart'); 


let hasFlippedCard = false;
let lockBoard = false;
let firstCard = null;
let secondCard = null;


function flipCard() {
    if (lockBoard || this === firstCard) return; 

    this.classList.add('flip'); 

    if (!hasFlippedCard) { 
        hasFlippedCard = true; 
        firstCard = this; 
        return; 
    }

   
    secondCard = this; 
    checkForMatch(); 
}


function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name; 
    isMatch ? disableCards() : unflipCards(); 
}


function disableCards() {
    firstCard.removeEventListener('click', flipCard); 
    secondCard.removeEventListener('click', flipCard); 
    resetGameState(); 
}


function unflipCards() {
    lockBoard = true; 
    setTimeout(() => { 
        firstCard.classList.remove('flip'); 
        secondCard.classList.remove('flip'); 
        resetGameState(); 
    }, 1000); 
}


function resetGameState() {
    [hasFlippedCard, lockBoard] = [false, false]; 
    [firstCard, secondCard] = [null, null]; 
}


function shuffle() {
    cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * cards.length); 
        card.style.order = randomPos; 
    });
}


function restartGame() {
    const transitions = document.querySelectorAll('.transitions'); 
    transitions.forEach(transition => {
        transition.classList.remove('transitions'); 
    });
    cards.forEach(card => { 
        card.classList.remove('flip'); 
        card.addEventListener('click', flipCard); 
    });
    shuffle(); 
    resetGameState(); 

    setTimeout(() => {
        transitions.forEach(transition => { 
        transition.classList.add('transitions'); 
    });
},100) 
} 


(function initGame() {
    shuffle(); 
    cards.forEach(card => card.addEventListener('click', flipCard)); 
    restartButton.addEventListener('click', restartGame); 
})(); 
