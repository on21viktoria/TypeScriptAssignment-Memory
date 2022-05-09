import { cardsContainers } from "./gameModule";
import { MemoryCard } from "./memoryCard";
import { Player } from "./playerModule";

export enum Difficulty {
  easy,
  medium,
  hard,
}

export interface Store {
  cardId: string;
  cardInformation: {
    cardName: string | null;
    timesFlipped: number;
  };
}

export interface Bot extends Player {
  difficulty: Difficulty;
  store: Store[];
}

export class Bot extends Player implements Bot {
  choice: HTMLDivElement[] = [];
  nonSetCards: HTMLDivElement[] = [];
  difficulty: Difficulty;

  constructor(difficulty: Difficulty) {
    super("bot");
    this.store = [];
    this.difficulty = difficulty;
  }

  getChoice(): HTMLDivElement[] {
    return this.choice;
  }

  setChoice(choice: HTMLDivElement[]) {
    this.choice = choice;
  }

  storeCard(memoryCard: HTMLDivElement): void {
    let memoryCardId: string = memoryCard.id;
    let memoryCardName: string | null = memoryCard.getAttribute("data-name");
    let timesFlipped = 1;

    if (this.store.length === 0) {
      this.store.push({
        cardId: memoryCardId,
        cardInformation: {
          cardName: memoryCardName,
          timesFlipped: timesFlipped,
        },
      });
    } else {
      let currentCard = this.store.find((s) => s.cardId === memoryCardId);
      if (currentCard) {
        currentCard.cardInformation.timesFlipped += 1;
      } else {
        this.store.push({
          cardId: memoryCardId,
          cardInformation: {
            cardName: memoryCardName,
            timesFlipped: timesFlipped,
          },
        });
      }
    }
  }

  removeSelectedCardsFromStore(selectedCardId: string) {
    let currentStore = this.store.filter(
      (storeElement) => storeElement.cardId != selectedCardId
    );
    this.store = currentStore;
  }

  checkForMatchInStore(cardsContainers: NodeListOf<HTMLDivElement>) {
    console.log("checkForMatchInStore");
    let checkInStore = false;
    this.store.forEach((storeElement) => {
      console.log(storeElement);
      if (this.store[0].cardId !== storeElement.cardId) {
        if (
          this.store[0].cardInformation.cardName ===
          storeElement.cardInformation.cardName
        ) {
          let card = document.getElementById(
            storeElement.cardId
          ) as HTMLDivElement;
          this.choice.push(card);
          checkInStore = true;
          console.log(checkInStore);
        }
      }
    });
    console.log("checkForMatchInStore", this.choice.length);
    if (!checkInStore) {
      this.getNonSetCards(cardsContainers);
    }
  }

  getNonSetCards(cardsContainers: NodeListOf<HTMLDivElement>) {
    console.log("getNonSetCards");
    cardsContainers.forEach((cardsContainer) => {
      if (
        !cardsContainer.classList.contains("set") ||
        !cardsContainer.classList.contains("selected")
      ) {
        this.nonSetCards.push(cardsContainer);
      }
    });
    this.getRandomCardNotFlipped(this.nonSetCards);
  }

  checkForStoreMatch(firstCardSelected: HTMLDivElement) {
    console.log("checkForStoreMatch");
    this.store.forEach((storeElement) => {
      if (storeElement.cardId !== firstCardSelected.id) {
        if (
          storeElement.cardInformation.cardName ===
          firstCardSelected.getAttribute("data-name")
        ) {
          if (storeElement.cardInformation.timesFlipped > 2) {
            let card = document.getElementById(
              storeElement.cardId
            ) as HTMLDivElement;
            this.choice.push(card);
            this.selectCards();
            console.log("checkForStoreMatch", this.choice.length);
          }
        }
      }
    });
    this.getRandomCardNotFlipped(this.nonSetCards);
    console.log("checkForStoreMatch2", this.choice.length);
  }

  getRandomCardNotFlipped(memoryCards: HTMLDivElement[]) {
    console.log("getRandomCard");
    let firstCardSelected: HTMLDivElement;
    let secondCardSelected: HTMLDivElement;

    let filteredCards = [];
    filteredCards = memoryCards.filter((memoryCard) => {
      return !this.store.find((storedCard) => {
        return storedCard.cardId === memoryCard.id;
      });
    });

    if (!this.choice[0]) {
      firstCardSelected =
        filteredCards[Math.floor(Math.random() * filteredCards.length)];
      console.log(firstCardSelected);
      this.choice.push(firstCardSelected);
      console.log("getRandomCard if ", this.choice.length);
      this.checkForStoreMatch(firstCardSelected);
    } else {
      secondCardSelected =
        filteredCards[Math.floor(Math.random() * filteredCards.length)];
      this.choice.push(secondCardSelected);
      console.log("getRandomCard else ", this.choice.length);
    }
    console.log("getRandomCard end", this.choice.length);
  }

  selectCards(): HTMLDivElement[] {
    console.log(this.choice);
    console.log(this.selectCards);
    console.log("selectCards", this.choice.length);
    for (let i = 0; i < this.choice.length; i++) {
      console.log(
        "Card " + i + ": " + this.choice[i].getAttribute("data-name")
      );
    }

    this.choice.forEach((element) => {
      this.storeCard(element);
      console.log("CurrentElement: ", element);
      element.classList.add("selected");
    });
    return this.choice;
  }

  clear() {
    this.choice = [];
  }
}
