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

function setScore() {
  player.setScore(player.getScore() + 1);

  let scoreElement: HTMLHeadingElement;
  scoreElement = document.querySelector(
    ".score-number-player"
  ) as HTMLHeadingElement;

  scoreElement.innerHTML = currentPlayer.getScore().toString();
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
    bot.checkForMatchInStore(cardsContainers);
    checkforMatch(bot.selectCards());
    bot.clear();
  } else if (currentPlayer === bot) {
    currentPlayer = player;
  }
}
