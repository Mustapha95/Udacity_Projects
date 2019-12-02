/*
 * Create a list that holds all of your cards
 */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let deck = document.querySelector('.deck');
let cards = Array.from(document.querySelectorAll('.card'));
let chosenCards = [];
let restartBtn = document.querySelector('.restart');
let allStars = document.querySelectorAll('.fa-star');
let moves = 0;
let matches = 0;
let flag = true;



function cards_html() {
    let cardsHTML = [];
    shuffle(cards);
    for (let card of cards) {
        cardsHTML += card.outerHTML;
    }
    deck.innerHTML = cardsHTML;
}

cards_html();

deck.addEventListener('click', function (event) {
    let card = event.target;

    if (card.className == 'deck') return;

    else if (card.classList.contains('card') && !(card.classList.contains('open')) && flag == true) {

        card.classList.add('flip', 'open', 'show');

        chosenCards.push(card);

        if (chosenCards.length == 2) {
            flag = false;
            matching(chosenCards);
            stars();
            console.log(matches);
            if (matches == 7) {
                console.log('inside if');
                endGame();
            }
            moves += 1;
            show_moves();
        }

    }
});


restartBtn.addEventListener('click', restart);


function matching(arr) {
    let [card1, card2] = arr;

    if (card1.firstElementChild.className == card2.firstElementChild.className) {
        setTimeout(function () {
            card1.classList.add('match');
            card2.classList.add('match');
            matches += 1;
            flag = true;
        }, 700);

    }
    else {
        setTimeout(function () {

            card1.classList.add('wrong-match');
            card2.classList.add('wrong-match');
            setTimeout(function () {
                card1.classList.remove('open', 'show', 'wrong-match');
                card2.classList.remove('open', 'show', 'wrong-match');
                setTimeout(function () {
                    card1.classList.remove('flip');
                    card2.classList.remove('flip');
                }, 300);
            }, 700);

            flag = true;

        }, 700);

    }
    chosenCards = [];
}

function restart() {

    for (let card of cards) {
        card.classList.remove('open', 'show', 'match', 'wrong-match', 'flip');
    }
    chosenCards = [];
    matches = 0;
    moves = 0;
    allStars[1].style.color = 'black';
    allStars[2].style.color = 'black';
    show_moves();
    cards_html();
}

function stars() {
    if (moves >= 16 && moves <= 22)
        allStars[2].style.color = 'lightgray';
    else if (moves > 22)
        allStars[1].style.color = 'lightgray';
}

function show_moves() {
    let movesElement = document.querySelector('.moves');
    movesElement.textContent = moves;
}

function endGame() {
    //in the future add the stars and moves and edit the animation
    console.log('inside endgame');
    let winModal = document.querySelector('.modal');
    setTimeout(function () {
        winModal.classList.remove('hide');
    }, 700);

    let playAgainBtn = document.querySelector(".play-again");

    playAgainBtn.addEventListener('click', function () {
        restart();
        winModal.classList.add('hide');
    });
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
