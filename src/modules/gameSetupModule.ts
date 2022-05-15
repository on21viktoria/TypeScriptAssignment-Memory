import { IMemoryCard } from "./memoryCard";
import { memoryCardGroups } from "./memoryCard";
import { startGame } from "./gameModule";
import * as domUtils from "./../domUtils";
import { Bot } from "./botModule";
import { Player } from "./playerModule";

export let selectedTheme: string = "series";
export let selectedDifficulty: string = "medium";
export let currentCardDeck: IMemoryCard[] = [];
export let memoryCardsSpots: IMemoryCard[] = [];
export let bot: Bot;
export let player: Player;

export function chooseTheme(this: HTMLSelectElement) {
  let index = this.selectedIndex;
  selectedTheme = this.options[index].value;
}

export function chooseDifficulty(this: HTMLSelectElement) {
  let index = this.selectedIndex;
  selectedDifficulty = this.options[index].value;
}

export function getThemeCards() {
  memoryCardGroups.forEach((memoryCardGroup) => {
    if (memoryCardGroup.group === selectedTheme) {
      currentCardDeck = memoryCardGroup.memoryCards;
    }
  });
}

function shuffleCards() {
  let cardCount = 30;
  while (memoryCardsSpots.length < cardCount) {
    let currentCard =
      currentCardDeck[Math.floor(Math.random() * currentCardDeck.length)];

    if (currentCard.count < 2) {
      memoryCardsSpots.push(currentCard);
      currentCard.count++;
    }
  }
}

function setupBoard() {
  let index = 0;
  domUtils.cardsContainers.forEach((cardsContainer) => {
    let imageElement = cardsContainer?.lastElementChild
      ?.firstElementChild as HTMLImageElement;

    imageElement.setAttribute("src", memoryCardsSpots[index].image);
    imageElement.setAttribute("alt", memoryCardsSpots[index].cardId);
    imageElement.setAttribute("name", memoryCardsSpots[index].cardId);

    cardsContainer.setAttribute("data-name", memoryCardsSpots[index].cardId);

    index++;
  });
}

function createPlayers() {
  bot = new Bot("bot", selectedDifficulty);
  player = new Player("player");
  bot.setdifficultyValues();
}

export function startGameSetup() {
  getThemeCards();
  shuffleCards();
  setupBoard();
  createPlayers();

  if (domUtils.popup) {
    domUtils.popup.style.display = "none";
  }
  startGame();
}
