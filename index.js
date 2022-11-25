import { cardsArray} from '/cards.js'
import RandomOrg from 'random-org'

var random = new RandomOrg({ apiKey: '768b9559-2a20-4ad3-bc7e-4252491547cf' });
random.generateIntegers({ min: 0, max: 52, n: 1 })
  .then(function(result) {
    console.log(result.random.data); // [55, 3]
  });



let message
let player = {
    name: "",
    chips: 0
}
const messageEl = document.getElementById("message-el")
const sumEl = document.getElementById("sum-el")
const cardsEl = document.getElementById("cards-el")
const cardBlock = document.getElementById("cardblock")
const newGameButton = document.getElementById("newgamebutton")
const newCardButton = document.getElementById("cardbutton")
const resetButton = document.getElementById("resetbtn")
const playerEl = document.getElementById("player-el")
const submitBtn = document.getElementById("submit-btn")
let valueArray = []
let cardsOnTable = []

submitBtn.addEventListener('click', submitForm)
newGameButton.addEventListener('click', startGame)
newCardButton.addEventListener('click', newCard)
resetButton.addEventListener('click', resetGame)

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
    //add cards to screen
    renderCards()
    //push messages to screen
    message = cashOut(sum)
    renderCardValues()
    /* cardsEl.textContent = "Cards: " + valueArray[0] + " and " + valueArray[1] */
    sumEl.textContent = "Sum: " + sum
    player.chips = player.chips - 100
    playerEl.textContent = player.name + " - $" + player.chips
}

//when drawing a new card
function newCard() {
    cardsOnTable.push(cardsArray.splice(0, 1))
    renderCards()
    valueArray.push(checkCardValue(cardsOnTable.at(-1)))
    let sum = valueArray.reduce((partialSum, a) => partialSum + a, 0);   
    message = cashOut(sum)
    renderCardValues()
    sumEl.textContent = "Sum: " + sum
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
    if (valueArray.length >= 2) {
        if (cardName.startsWith("king") || cardName.startsWith("queen") || cardName.startsWith("jack")) {
            return 10
        }
        else if (cardName.startsWith("ace")) {
            return 1
        }
        else {
            return Number(cardName.split('-')[0])
        }
    }
    else {
        if (cardName.startsWith("king") || cardName.startsWith("queen") || cardName.startsWith("jack")) {
            return 10
        }
        else if (cardName.startsWith("ace")) {
            return 11
        }
        else {
            return Number(cardName.split('-')[0])
        }
    }
}

//calculate message to be shown
function cashOut(sum) {
    if (sum <= 20) {
        message = "Still smaller than 21... <br /> How about another card...?"
    }
    else if (sum === 21) {
        message = "Blackjack!! <br /> Congratulations! You won $400!!"
        newGameButton.disabled = false
        newCardButton.disabled = true
        cardBlock.classList.add("blackjack")
        messageEl.classList.add("blackjack")
        resetButton.classList.add("resetBlackJack")
        player.chips += 400
        playerEl.textContent = player.name + " - $" + player.chips
    }
    else {
        message = "BUSTED!! <br /> Play another round!"
        newGameButton.disabled = false
        newCardButton.disabled = true
        cardBlock.classList.add("busted")
        messageEl.classList.add("busted")
    }
    messageEl.innerHTML = message
}

//renders cardfaces
function renderCards() {
    cardBlock.innerHTML = ""
    for (let i = 0; i < cardsOnTable.length; i++){
        cardBlock.innerHTML += "<img class=\"cardimage\" src=\"images/cards/" + cardsOnTable[i] + "\"/>"
    }
}

function renderCardValues() {
    let string = "Card values: "
    for (let i = 0; i < valueArray.length; i++) {
        string += valueArray[i] + ", "
    }
    string = string.replace(/,\s*$/, "")
    cardsEl.textContent = string
}

/* function openPopup() {
    let blur = document.getElementById("blur")
    blur.classList.toggle('active')
} */

function submitForm() {
    let blur = document.getElementById("blur")
    let modal = document.getElementById("player-info")
    player.name = document.getElementById("fullname").value
    player.chips = document.getElementById('bet').value
    blur.classList.remove('active')
    modal.classList.add('nothing')

    playerEl.textContent = player.name + " - $" + player.chips
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
 }