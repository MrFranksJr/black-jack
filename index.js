let hasBlackJack = false
let isAlive = true
let message
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let cardBlock = document.getElementById("cardblock")
let newGameButton = document.getElementById("newgamebutton")
let newCardButton = document.getElementById("cardbutton")
let resetButton = document.getElementById("resetbtn")
let cardsArray = []
let valueArray = []
let cardsOnTable = []

//when pressing start
function startGame() {
    //setup game
    resetWhenStart()
    //shuffle all cards
    shuffle(cardsArray)
    //pick first cards from the stack, remove from big stack
    cardsOnTable = cardsArray.splice(0, 2)
    //check values of each card
    for (let i = 0; i < cardsOnTable.length; i++) {
        valueArray.push(checkCardValue(cardsOnTable[i]))
    }
    //make sum
    let sum = valueArray.reduce((partialSum, a) => partialSum + a, 0);
    console.log(valueArray)
    //add cards to screen
    cardBlock.innerHTML = "<img class=\"cardimage\" src=\"images/cards/" + cardsOnTable[0] + "\"/>" + "<img class=\"cardimage\" src=\"images/cards/" + cardsOnTable[1] + "\"/>"
    //push messages to screen
    message = cashOut(sum)
    cardsEl.innerText = "Cards: " + valueArray[0] + " and " + valueArray[1]
    sumEl.innerText = "Sum: " + sum
}

//when drawing a new card
function newCard() {
    cardsOnTable.push(cardsArray.splice(0, 1))
    cardBlock.innerHTML = cardBlock.innerHTML + "<img class=\"cardimage another-card\" src=\"images/cards/" + cardsOnTable.at(-1) + "\"/>"
    valueArray.push(checkCardValue(cardsOnTable.at(-1)))
    let sum = valueArray.reduce((partialSum, a) => partialSum + a, 0);   
    console.log(valueArray) 
    message = cashOut(sum)
    cardsEl.innerText = cardsEl.innerText + " and " + valueArray.at(-1)
    sumEl.innerText = "Sum: " + sum
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
    let cardName = card.toString()
    let value
    console.log(valueArray.length)
    if (valueArray.length >= 2) {
        if (cardName.startsWith("king") || cardName.startsWith("queen") || cardName.startsWith("jack")) {
            value = Number("10")
        }
        else if (cardName.startsWith("ace")) {
            value = Number("1")
        }
        else {
            value = Number(cardName.split('-')[0])
        }
    }
    else {
        if (cardName.startsWith("king") || cardName.startsWith("queen") || cardName.startsWith("jack")) {
            value = Number("10")
        }
        else if (cardName.startsWith("ace")) {
            value = Number("11")
        }
        else {
            value = Number(cardName.split('-')[0])
        }
    }
return value
}

//calculate message to be shown
function cashOut(sum) {
    if (sum <= 20) {
        message = "Still smaller than 21... <br /> How about another card...?"
    }
    else if (sum === 21) {
        hasBlackJack = true
        message = "Blackjack!! <br /> Congratulations!"
        newGameButton.disabled = false
        newCardButton.disabled = true
        cardBlock.classList.add("blackjack")
        messageEl.classList.add("blackjack")
        resetButton.classList.add("resetBlackJack")
    }
    else {
        isAlive = false
        message = "BUSTED!! <br /> Play another round!"
        newGameButton.disabled = false
        newCardButton.disabled = true
        cardBlock.classList.add("busted")
        messageEl.classList.add("busted")
    }
    messageEl.innerHTML = message
}

//resetting the game.. simple reload
function resetGame() {
    document.location.reload(true)
}

//reset when starting
function resetWhenStart() {
    newGameButton.disabled = true
    newCardButton.disabled = false
    //reset things
    cardBlock.classList.remove("busted")
    cardBlock.classList.remove("blackjack")
    messageEl.classList.remove("busted")
    messageEl.classList.remove("blackjack")
    //build cardsArray
    valueArray = []
    cardsOnTable = []
    cardsArray = [
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
 }