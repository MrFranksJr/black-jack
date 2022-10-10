let hasBlackJack = false
let isAlive = true
let message
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let cardBlock = document.getElementById("cardblock")
let totals = 0
let newGameButton = document.getElementById("newgamebutton")
let newCardButton = document.getElementById("cardbutton")
newCardButton.disabled = true
const cardsArray = [
    "queen-spades.png",
    "king-spades.png",
    "queen-hearts.png",
    "queen-diamonds.png",
    "queen-clubs.png",
    "king-hearts.png",
    "king-diamonds.png",
    "king-clubs.png",
    "jack-spades.png",
    "jack-hearts.png",
    "jack-diamonds.png",
    "jack-clubs.png",
    "ace-spades.png",
    "ace-hearts.png",
    "ace-diamonds.png",
    "ace-clubs.png",
    "10-spades.png",
    "10-hearts.png",
    "10-diamonds.png",
    "10-clubs.png",
    "9-spades.png",
    "9-hearts.png",
    "9-diamonds.png",
    "9-clubs.png",
    "8-spades.png",
    "8-hearts.png",
    "8-diamonds.png",
    "8-clubs.png",
    "7-spades.png",
    "7-hearts.png",
    "7-diamonds.png",
    "7-clubs.png",
    "6-spades.png",
    "6-hearts.png",
    "6-diamonds.png",
    "6-clubs.png",
    "5-spades.png",
    "5-hearts.png",
    "5-diamonds.png",
    "5-clubs.png",
    "4-spades.png",
    "4-hearts.png",
    "4-diamonds.png",
    "4-clubs.png",
    "3-spades.png",
    "3-hearts.png",
    "3-diamonds.png",
    "3-clubs.png",
    "2-spades.png",
    "2-hearts.png",
    "2-diamonds.png",
    "2-clubs.png",
]
let cardIndex = 0

//when pressing start
function startGame() {
    //reset things
    cardBlock.classList.remove("busted")
    cardBlock.classList.remove("blackjack")
    messageEl.classList.remove("busted")
    messageEl.classList.remove("blackjack")
    //shuffle all cards
    shuffle(cardsArray)
    //pick first cards from the stack
    let firstCard = cardsArray[0]
    let secondCard = cardsArray[1]
    //check values of the cards
    let firstCardValue = checkCardValue(firstCard)
    let secondCardValue = checkCardValue(secondCard)
    //make sum
    let sum = calcFunction(firstCardValue, secondCardValue)
    //set arrayIndex
    cardIndex = 2

    cardBlock.innerHTML = "<img class=\"cardimage\" src=\"images/cards/" + firstCard + "\"/>" + "<img class=\"cardimage\" src=\"images/cards/" + secondCard + "\"/>"

    message = cashOut(sum)

    // CASH OUT!
    messageEl.innerText = message
    cardsEl.innerText = "Cards: " + firstCardValue + " and " + secondCardValue
    sumEl.innerText = "Sum: " + sum
    newGameButton.disabled = true
    newCardButton.disabled = false
    totals = sum
}

//when drawing a new card
function newCard() {
    let newCard = cardsArray[cardIndex]
    cardBlock.innerHTML = cardBlock.innerHTML + "<img class=\"cardimage another-card\" src=\"images/cards/" + newCard + "\"/>"
    let newCardValue = checkCardValue(newCard)
    let sum = calcFunction(totals, newCardValue)
    
    message = cashOut(sum)

    // CASH OUT!
    messageEl.innerText = message
    cardsEl.innerText = cardsEl.innerText + " and " + newCardValue
    sumEl.innerText = "Sum: " + sum
    totals = sum
    cardIndex += 1
}

//shuffle the deck
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

//retrieve the value of the card, based off the face/filename
function checkCardValue(card) {
    let value
    if (card.startsWith("king") || card.startsWith("queen") || card.startsWith("jack")) {
        value = Number("10")
    }
    else if (card.startsWith("ace")) {
        //check if this is the second round, if so, ace is only 1
        if (cardIndex < 2) {
            value = Number("11")
        }
        else {
            value = Number("1")
        }  
    }
    else {
        value = value = Number(card.split('-')[0])
    }
    return value
}

//calculate the sum of the cards
function calcFunction(firstCard, secondCard) {
    if (cardIndex < 2) {
        let sum = firstCard + secondCard
        return sum
    }
    else {
        if (secondCard === 11) {
            let sum = firstCard + 1
            return sum
        }
        else {
            let sum = firstCard + secondCard
            return sum
        }
    }
}

//calculate message to be shown
function cashOut(sum) {
    if (sum <= 20) {
        message = "Still smaller than 21... How about another card?"
    }
    else if (sum === 21) {
        hasBlackJack = true
        message = "Blackjack!!"
        cardBlock.classList.add("blackjack")
        messageEl.classList.add("blackjack")
    }
    else {
        isAlive = false
        message = "BUSTED!!"
        newGameButton.disabled = false
        newCardButton.disabled = true
        cardBlock.classList.add("busted")
        messageEl.classList.add("busted")
    }

    return message
}

//resetting the game.. simple reload
function resetGame() {
    document.location.reload(true)
 }