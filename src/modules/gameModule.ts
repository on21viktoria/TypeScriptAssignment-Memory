import { IMemoryCard } from "./memoryCard";
import { memoryCardGroups } from "./memoryCard";

const cardsContainers = document.querySelectorAll<HTMLDivElement>(".card");


export function gameSetup() {
    //chooseTheme()
}


export function chooseTheme(chosenTheme: HTMLSelectElement) : void {
    let index = chosenTheme.selectedIndex;
    let selectedTheme = chosenTheme.options[index].value;
    console.log(selectedTheme);
}

export function chooseDifficulty() : void {
    
}

export function assignRandomSpotsForCards(): void {
    /* let memoryCardsSpots: IMemoryCard[] = [];
  
    while (memoryCardsSpots.length < 30) {
      let generatedCard = cards[Math.floor(Math.random() * cards.length)];
  
      if (generatedCard.count < 2) {
        memoryCardsSpots.push(generatedCard);
        generatedCard.count++;
      }
    }
    for (let i = 0; i < cardsContainers.length; i++) {
      cardsContainers[i].lastElementChild?.firstElementChild?.setAttribute(
        "src",
        memoryCardsSpots[i].image
      );
      cardsContainers[i].lastElementChild?.firstElementChild?.setAttribute(
        "alt",
        memoryCardsSpots[i].cardId
      );
      cardsContainers[i].lastElementChild?.firstElementChild?.setAttribute(
        "name",
        memoryCardsSpots[i].cardId
      );
    } */
  }