import { IMemoryCard } from "./memoryCard";
import { memoryCardGroups } from "./memoryCard";

export const cardsContainers =
  document.querySelectorAll<HTMLDivElement>(".card");
export const themeSelector = document.getElementById(
  "gameTheme"
) as HTMLSelectElement;
export const playbutton = document.querySelector<HTMLButtonElement>(".btn");
export const popup = document.querySelector<HTMLDivElement>(".popup");
export let selectedTheme = "series";
export let currentCardDeck: IMemoryCard[] = [];
export let memoryCardsSpots: IMemoryCard[] = [];

export function chooseTheme(this: HTMLSelectElement): void {
  console.log("i got called");
  let index = this.selectedIndex;
  selectedTheme = this.options[index].value;

  getThemeCards();
}

export function getThemeCards(): void {
  memoryCardGroups.forEach((memoryCardGroup) => {
    if (memoryCardGroup.group === selectedTheme) {
      currentCardDeck = memoryCardGroup.memoryCards;
    }
  });
}

function shuffleCards(): void {
  while (memoryCardsSpots.length < 30) {
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
  cardsContainers.forEach((cardsContainer) => {
    let imageElement = cardsContainer?.lastElementChild
      ?.firstElementChild as HTMLImageElement;

    imageElement.setAttribute("src", memoryCardsSpots[index].image);
    imageElement.setAttribute("alt", memoryCardsSpots[index].cardId);
    imageElement?.setAttribute("name", memoryCardsSpots[index].cardId);

    cardsContainer.setAttribute("data-name", memoryCardsSpots[index].cardId)

    index++;
  });
}

export function startGame() {
  getThemeCards();
  shuffleCards();
  setupBoard();

  if (popup) {
    popup.style.display = "none";
  }
}
