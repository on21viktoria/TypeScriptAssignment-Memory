//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE!
import { Bot, Difficulty } from "./modules/botModule";
import { Player } from "./modules/playerModule";
import {
  playbutton,
  themeSelector,
  chooseTheme,
  startGame,
} from "./modules/gameSetupModule";

const cardsContainers = document.querySelectorAll<HTMLDivElement>(".card");
let selectedCards: HTMLDivElement[] = [];
const bot = new Bot(Difficulty.medium);
const player = new Player("player");
let currentPlayer: Player;
let scoreElement = document.querySelector(
  ".score-number-player"
) as HTMLHeadingElement;
const playerTurn = document.querySelector(".turn") as HTMLDivElement;

themeSelector.addEventListener("change", chooseTheme);
playbutton?.addEventListener("click", startGame);
cardsContainers.forEach((cardsContainer) => {
  cardsContainer.addEventListener("click", flipCard);
});

currentPlayer = player;

function flipCard(this: HTMLDivElement) {
  setFlips();
  this.removeEventListener("click", flipCard);
  this.classList.add("selected");
  bot.storeCard(this);

  selectedCards.push(this);

  if (selectedCards.length === 2) {
    checkforMatch(selectedCards);
  }
}

function checkforMatch(selectedcards: HTMLDivElement[]) {
  if (
    selectedcards[0].getAttribute("data-name") ===
    selectedcards[1].getAttribute("data-name")
  ) {
    selectedcards.forEach((selectedcard) => {
      selectedcard.classList.add("set");
      selectedcard.classList.remove("selected");
      setPlayerColor(selectedcard);
      selectedcard.removeEventListener("click", flipCard);
      bot.removeSelectedCardsFromStore(selectedcard.id);
    });
    setScore();
    selectedCards = [];
    if (currentPlayer === bot) {
      playerTurn.classList.add("botTurn");
      playerTurn.classList.remove("playerTurn");
      playerTurn.innerHTML = "Bot's turn";
      bot.clear();
      bot.checkForMatchInStore(cardsContainers);
      checkforMatch(bot.selectCards());
      bot.clear();
    }
  } else {
    setTimeout(() => {
      selectedcards.forEach((selectedcard) => {
        selectedcard.classList.remove("selected");
        selectedcard.addEventListener("click", flipCard);
      });
      selectedCards = [];
      changePlayer();
    }, 2000);

    setTimeout(() => {},2000)
  }
}
function checkWin() {
  let cards = [...cardsContainers]
  let noCards = []
  noCards = cards.filter((card) => {
    return !card.classList.contains("set")
  })

  if(noCards.length === 0){
    checkWinner()
  }
}

function checkWinner() {
  if(bot.getScore() > player.getScore()){
    console.log("Bot wins");
  }
  if(bot.getScore() < player.getScore()){
    console.log("You win");
  }
  if(bot.getScore() === player.getScore()){
    console.log("Draw");
  }
  

}

function setScore() {
  if (currentPlayer === player) {
    player.setScore(player.getScore() + 1);
    scoreElement = document.querySelector(
      ".score-number-player"
    ) as HTMLHeadingElement;
  }
  if (currentPlayer === bot) {
    bot.setScore(bot.getScore() + 1);
    scoreElement = document.querySelector(
      ".score-number-bot"
    ) as HTMLHeadingElement;
  }
  scoreElement.innerHTML = currentPlayer.getScore().toString();
  checkWin();
}

function setFlips() {
  currentPlayer.setFlips(currentPlayer.getFlips() + 1);

  let flipElement: HTMLHeadingElement;
  if (currentPlayer === player) {
    flipElement = document.querySelector(
      ".flips-number-player"
    ) as HTMLHeadingElement;
    flipElement.innerHTML = currentPlayer.getFlips().toString();
  }
  if (currentPlayer === bot) {
    flipElement = document.querySelector(
      ".flips-number-bot"
    ) as HTMLHeadingElement;
    flipElement.innerHTML = currentPlayer.getFlips().toString();
  }
}

function setPlayerColor(selectedCard: HTMLDivElement) {
  if (currentPlayer === player) {
    selectedCard.classList.add("set-player");
  }
  if (currentPlayer === bot) {
    selectedCard.classList.add("set-bot");
  }
}

function changePlayer() {
  if (!currentPlayer) {
    currentPlayer = player;
  } else if (currentPlayer === player) {
    currentPlayer = bot;
    playerTurn.classList.add("botTurn");
    playerTurn.classList.remove("playerTurn");
    playerTurn.innerHTML = "Bot's turn";
    bot.checkForMatchInStore(cardsContainers);
    checkforMatch(bot.selectCards());
    bot.clear();
  } else if (currentPlayer === bot) {
    currentPlayer = player;
    playerTurn.classList.add("playerTurn");
    playerTurn.classList.remove("botTurn");
    playerTurn.innerHTML = "Your turn";
  }
}
