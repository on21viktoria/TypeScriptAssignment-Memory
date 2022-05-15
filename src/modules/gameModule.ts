import { Bot } from "./botModule";
import { IPlayer, Player } from "./playerModule";
import * as domUtils from "./../domUtils";
import * as styling from "./stylingModule";
import { bot, player } from "./gameSetupModule";
import { toEditorSettings } from "typescript";

let currentPlayer: Player;
let selectedCards: HTMLDivElement[] = [];

export function startGame() {
  domUtils.cardsContainers.forEach((cardsContainer) => {
    cardsContainer.addEventListener("click", flipCard);
  });

  currentPlayer = player;
}

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
      styling.setCard(selectedcard);
      styling.setPlayerColorForCard(selectedcard, currentPlayer);
      selectedcard.removeEventListener("click", flipCard);
      bot.removeSelectedCardsFromStore(selectedcard.id);
    });
    setScore();
    selectedCards = [];
    if (currentPlayer === bot && !checkBoard()) {
      domUtils.playerTurn.classList.add("botTurn");
      domUtils.playerTurn.classList.remove("playerTurn");
      domUtils.playerTurn.innerHTML = "Bot's turn";
      setTimeout(() => {
        botTurn();
      }, 2000);
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
  if (domUtils.popup) {
    domUtils.popup.style.display = "block";
  }
}

function showWinner(winner?: IPlayer) {
  if (domUtils.popup) {
    domUtils.popup.style.display = "block";
  }
  const settings = document.querySelector(".settings") as HTMLHeadingElement;
  if (winner === bot) {
    settings.innerHTML = "Bot wins!";
  } else if (winner === player) {
    settings.innerHTML = "You win!";
  } else {
    settings.innerHTML = "Draw";
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
    currentPlayer = bot;
    styling.changeMessageBoxToBot();
    botTurn();
  } else if (currentPlayer === bot) {
    currentPlayer = player;
    styling.changeMessageBoxToPlayer();
  }
}

function botTurn() {
  bot.clear();
  bot.checkForMatchInStore(domUtils.cardsContainers);
  checkforMatch(bot.selectCards());
}
