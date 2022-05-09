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

  constructor() {
    super("bot");
    this.store = [];
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

  /*flipCardBot(cardsContainers: NodeListOf<HTMLDivElement>): HTMLDivElement[] {
    this.selectCardsToFlip(cardsContainers);

    this.choice.forEach((c) => {
      setTimeout(() => {
        c.classList.add("selected");
      }, 1500);

      console.log(c.classList);
    });

    return this.choice;
  }*/

  checkForMatchInStore(cardsContainers: NodeListOf<HTMLDivElement>) {
    console.log("checkForMatchInStore")
    let checkInStore = false;
    this.store.forEach((storeElement) => {
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
        }
      }
    });
    console.log("checkForMatchInStore",this.choice.length)
    if (!checkInStore) {
      this.getNonSetCards(cardsContainers);
    }
  }

  getNonSetCards(cardsContainers: NodeListOf<HTMLDivElement>) {
    console.log("getNonSetCards")
    cardsContainers.forEach((cardsContainer) => {
      if (
        !cardsContainer.classList.contains("set") ||
        !cardsContainer.classList.contains("selected")
      ) {
        this.nonSetCards.push(cardsContainer);
      }
    });
    this.getRandomCard(this.nonSetCards);
  }

  checkForStoreMatch(firstCardSelected: HTMLDivElement) {
    console.log("checkForStoreMatch");
    this.store.forEach((storeElement) => {
      if (storeElement.cardId !== firstCardSelected.id) {
        if (
          storeElement.cardInformation.cardName ===
          firstCardSelected.getAttribute("data-name")
        ) {
          let card = document.getElementById(
            storeElement.cardId
          ) as HTMLDivElement;
          this.choice.push(card);
          this.selectCards();
          console.log("checkForStoreMatch", this.choice.length)
        }
      }
    });
    this.getRandomCard(this.nonSetCards);
    console.log("checkForStoreMatch2", this.choice.length)
  }

  getRandomCard(memoryCards: HTMLDivElement[]) {
    console.log("getRandomCard");
    let firstCardSelected: HTMLDivElement;
    let secondCardSelected: HTMLDivElement
    if (!this.choice[0]) {
      firstCardSelected =
        memoryCards[Math.floor(Math.random() * memoryCards.length)];
        console.log(firstCardSelected)
      this.choice.push(firstCardSelected);
      console.log("getRandomCard if " ,this.choice.length);
      this.checkForStoreMatch(firstCardSelected);
    }
    else {
      secondCardSelected = memoryCards[Math.floor(Math.random() * memoryCards.length)];
      this.choice.push(secondCardSelected);
      console.log("getRandomCard else " ,this.choice.length);
    }
    console.log("getRandomCard end" ,this.choice.length);
  }

  selectCards(): HTMLDivElement[] {
    console.log(this.selectCards)
    console.log("selectCards", this.choice.length);
    for(let i = 0; i < this.choice.length; i++){
      console.log("Card " + i + ": " + this.choice[i].getAttribute("data-name"))
    }
    this.choice.forEach((c) => {
      setTimeout(() => {
        c.classList.add("selected");
      }, 1500);
    });
    return this.choice;
  }

  clear() {
    this.choice = [];
  }
}

/* findPair(): boolean {
    console.log(this.store.length);
    for (let i = 0; i < this.store.length; i++) {
      console.log("i: ",
        this.store[
          i
        ].memoryCard.lastElementChild?.firstElementChild?.getAttribute("name")
      );
      for (let j = 0; j < this.store.length; j++) {
        console.log("j: ",
          this.store[
            j
          ].memoryCard.lastElementChild?.firstElementChild?.getAttribute("name")
        );
        if (
          i != j &&
          this.store[
            i
          ].memoryCard.lastElementChild?.firstElementChild?.getAttribute(
            "name"
          ) ===
            this.store[
              j
            ].memoryCard.lastElementChild?.firstElementChild?.getAttribute(
              "name"
            )
        ) {
          return true;
        }
      }
    }
    return false;
  } */
