import { Bot } from "./botModule";
import { IPlayer, Player } from "./playerModule";
import * as domUtils from "./../domUtils";
import * as styling from "./stylingModule";
import * as gameSetupModule from "./gameSetupModule";

let currentPlayer: Player;
let selectedCards: HTMLDivElement[] = [];
const bot = gameSetupModule.bot;
const player = gameSetupModule.player;

export function startGame() {
  domUtils.cardsContainers.forEach((cardsContainer) => {
    cardsContainer.addEventListener("click", flipCard);
  });
  currentPlayer = player;
}

//entnommen aus folgendem Tutorial: https://www.youtube.com/watch?v=ZniVgo8U7ek&t=1334s
function flipCard(this: HTMLDivElement) {
  setFlips();
  this.removeEventListener("click", flipCard);
  this.classList.add("selected");
  bot.storeCard(this);

  selectedCards.push(this);

  if (selectedCards.length === 2) {
    removeEventListenerForAll();
    checkforMatch(selectedCards);
  }
}

//entnommen und abgewandelt aus folgendem Tutorial: https://www.youtube.com/watch?v=ZniVgo8U7ek&t=1334s
function checkforMatch(selectedcards: HTMLDivElement[]) {
  if (
    selectedcards[0].getAttribute("data-name") ===
    selectedcards[1].getAttribute("data-name")
  ) {
    selectedcards.forEach((selectedcard) => {
      styling.setCard(selectedcard);
      styling.setPlayerColorForCard(selectedcard, currentPlayer);
      selectedcard.removeEventListener("click", flipCard);
      bot.removeSelectedCardsFromStore(selectedcard.id);
    });
    setScore();
    selectedCards = [];
    checkNextPlayer();
  } else {
    setTimeout(() => {
      selectedcards.forEach((selectedcard) => {
        selectedcard.classList.remove("selected");
        selectedcard.addEventListener("click", flipCard);
      });
      selectedCards = [];
      changePlayer();
    }, 2000);
  }
}

function checkNextPlayer() {
  if (currentPlayer === bot && !checkBoard()) {
    styling.changeMessageBoxToBot();
    setTimeout(() => {
      botTurn();
    }, 2000);
  }
  else {
    addEventListenerToNonSetCards();
  }
}
function checkBoard(): boolean {
  let cards = [...domUtils.cardsContainers];
  let noCards = [];
  noCards = cards.filter((card) => {
    return !card.classList.contains("set");
  });

  if (noCards.length === 0) {
    checkWinner();
    return true;
  }
  return false;
}

function checkWinner() {
  if (bot.getScore() > player.getScore()) {
    showWinner(bot);
  }
  if (bot.getScore() < player.getScore()) {
    showWinner(player);
  }
  if (bot.getScore() === player.getScore()) {
    showWinner();
  }
}

function showWinner(winner?: IPlayer) {
  if (domUtils.winnerPopup) {
    domUtils.winnerPopup.style.display = "block";
  }
  if (winner === bot) {
    domUtils.winnerText.innerHTML = "Bot wins!";
  } else if (winner === player) {
    domUtils.winnerText.innerHTML = "You win!";
  } else {
    domUtils.winnerText.innerHTML = "Draw";
  }
  domUtils.button.innerHTML = "Replay";
}

function setScore() {
  let score = 0;
  let scoreElement: HTMLHeadingElement = domUtils.playerScore;
  if (currentPlayer === player) {
    player.setScore(player.getScore() + 1);
    score = player.getScore();
    scoreElement = domUtils.playerScore;
  }
  if (currentPlayer === bot) {
    bot.setScore(bot.getScore() + 1);
    score = bot.getScore();
    scoreElement = domUtils.botScore;
  }
  styling.setScore(score, scoreElement);
  checkBoard();
}

function setFlips() {
  currentPlayer.setFlips(currentPlayer.getFlips() + 1);
  if (currentPlayer === player) {
    styling.setFlips(player.getFlips(), domUtils.playerFlip);
  }
  if (currentPlayer === bot) {
    styling.setFlips(bot.getFlips(), domUtils.botFlip);
  }
}

function changePlayer() {
  if (!currentPlayer) {
    currentPlayer = player;
  } else if (currentPlayer === player) {
    removeEventListenerForAll();
    currentPlayer = bot;
    styling.changeMessageBoxToBot();
    botTurn();
  } else if (currentPlayer === bot) {
    currentPlayer = player;
    addEventListenerToNonSetCards();
    styling.changeMessageBoxToPlayer();
  }
}

function removeEventListenerForAll() {
  domUtils.cardsContainers.forEach((cardsContainer) => {
    cardsContainer.removeEventListener("click", flipCard);
  });
}

function addEventListenerToNonSetCards() {
  let cards = bot.getNonSetCards(domUtils.cardsContainers);
  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}

function botTurn() {
  bot.clear();
  bot.checkForMatchInStore(domUtils.cardsContainers);
  checkforMatch(bot.selectCards());
}
