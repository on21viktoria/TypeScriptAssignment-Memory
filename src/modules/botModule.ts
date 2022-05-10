import { cardsContainers } from "./gameModule";
import { MemoryCard } from "./memoryCard";
import { Player } from "./playerModule";

export enum Difficulty {
  easy,
  medium,
  hard,
}

export interface Store {
  card: HTMLDivElement;
  timesFlipped: number;
}

export interface Bot extends Player {
  difficulty: Difficulty;
  store: Store[];
}

export class Bot extends Player implements Bot {
  choice: HTMLDivElement[] = [];
  nonSetCards: HTMLDivElement[] = [];
  difficulty: Difficulty;
  pairs: Store[] = [];

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

  getFlips() : number {
    return this.flips;
  }
  storeCard(memoryCard: HTMLDivElement): void {
    let timesFlipped = 1;

    if (this.store.length === 0) {
      this.store.push({
        card: memoryCard,
        timesFlipped: timesFlipped,
      });
    } else {
      let currentCard = this.store.find((s) => s.card.id === memoryCard.id);
      if (currentCard) {
        currentCard.timesFlipped += 1;
      } else {
        this.store.push({
          card: memoryCard,
          timesFlipped: timesFlipped,
        });
      }
    }
  }

  removeSelectedCardsFromStore(selectedCardId: string) {
    let currentStore = this.store.filter(
      (storeElement) => storeElement.card.id != selectedCardId
    );
    this.store = currentStore;
  }

  checkForMatchInStore(cardsContainers: NodeListOf<HTMLDivElement>) {
    if (this.findNextPairInStore()) {
      this.choice.push(this.pairs[0].card);
      if (this.pairs[1].timesFlipped >= 2) {
        this.choice.push(this.pairs[1].card);
      } else {
        this.getNonSetCards(cardsContainers);
      }
    }
    else {
      this.getNonSetCards(cardsContainers);
    }
  }

  getNonSetCards(cardsContainers: NodeListOf<HTMLDivElement>) {
    cardsContainers.forEach((cardsContainer) => {
      console.log("CurrentCard has class: " + !cardsContainer.classList.contains("set"))
      if (
        (!cardsContainer.classList.contains("set"))
      ) {
        this.nonSetCards.push(cardsContainer);
      }
    });
    this.getRandomCardNotFlipped(this.nonSetCards);
  }

  checkForStoreMatch(firstCardSelected: HTMLDivElement) {
    this.store.forEach((storeElement) => {
      if (storeElement.card.id !== firstCardSelected.id) {
        if (
          storeElement.card.getAttribute("data-name") ===
          firstCardSelected.getAttribute("data-name")
        ) {
          if (storeElement.timesFlipped >= 2) {
            let card = document.getElementById(
              storeElement.card.id
            ) as HTMLDivElement;
            this.choice.push(card);
            this.selectCards();
          }
        }
      }
    });
    this.getRandomCardNotFlipped(this.nonSetCards);
  }

  getRandomCardNotFlipped(memoryCards: HTMLDivElement[]) {
    let firstCardSelected: HTMLDivElement;
    let secondCardSelected: HTMLDivElement;

    let filteredCards = [];
    filteredCards = memoryCards.filter((memoryCard) => {
      return !this.store.find((storedCard) => {
        return storedCard.card.id === memoryCard.id;
      });
    });

    if (!this.choice[0]) {
      firstCardSelected =
        filteredCards[Math.floor(Math.random() * filteredCards.length)];
      this.choice.push(firstCardSelected);
      this.checkForStoreMatch(firstCardSelected);
    } else {
      secondCardSelected =
        filteredCards[Math.floor(Math.random() * filteredCards.length)];
      this.choice.push(secondCardSelected);
    }
  }

  selectCards(): HTMLDivElement[] {
    this.choice.forEach((element) => {
      this.storeCard(element);
      element.classList.add("selected");
      this.setFlipCards()
    });
    return this.choice;
  }

  clear() {
    this.pairs = [];
    this.choice = [];
    this.nonSetCards = [];
  }

  findNextPairInStore(): boolean {
    for (let i = 0; i < this.store.length; i++) {
      for (let j = 0; j < this.store.length; j++) {
        if (this.store[i].card.id !== this.store[j].card.id) {
          if (
            this.store[i].card.getAttribute("data-name") ===
            this.store[j].card.getAttribute("data-name")
          ) {
            this.pairs.push(this.store[i], this.store[j]);
            console.log(this.pairs);
            return true;
          }
        }
      }
    }
    return false;
  }

  setFlipCards() {
    this.setFlips(this.getFlips() +1);
  
    let flipElement: HTMLHeadingElement;
      flipElement = document.querySelector(
        ".flips-number-bot"
      ) as HTMLHeadingElement;
      flipElement.innerHTML = this.getFlips().toString();
  }
}
