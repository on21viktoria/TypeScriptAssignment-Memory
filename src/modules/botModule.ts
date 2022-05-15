import { Player, IPlayer } from "./playerModule";
import * as styling from "./stylingModule";
import { botFlip } from "../domUtils";

export interface IStore {
  card: HTMLDivElement;
  timesFlipped: number;
}

export interface IBot extends IPlayer {
  store: IStore[];
  difficulty: string;
}

export class Bot extends Player implements IBot {
  store: IStore[];
  pairs: IStore[] = [];
  maxPair: IStore[] = [];
  difficulty: string;
  difficultyValue: number = 4;
  choice: HTMLDivElement[] = [];
  nonSetCards: HTMLDivElement[] = [];

  constructor(name: string, difficulty: string) {
    super(name);
    this.store = [];
    this.difficulty = difficulty;
  }

  setdifficultyValues() {
    if (this.difficulty === "easy") {
      this.difficultyValue = 6;
    }
    if (this.difficulty === "medium") {
      this.difficultyValue = 4;
    }
    if (this.difficulty === "difficult") {
      this.difficultyValue = 2;
    }
  }

  getChoice(): HTMLDivElement[] {
    return this.choice;
  }

  setChoice(choice: HTMLDivElement[]) {
    this.choice = choice;
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
    this.findAllPairsInStore();
    if (this.maxPair.length !== 0) {
      this.choice.push(this.maxPair[0].card);
      if (this.maxPair[1].timesFlipped >= this.difficultyValue) {
        this.choice.push(this.maxPair[1].card);
      } else {
        if (this.random(this.maxPair[1]) > 50) {
          this.choice.push(this.maxPair[1].card);
        } else {
          this.getCardsNotSet(cardsContainers);
        }
      }
    } else {
      this.getCardsNotSet(cardsContainers);
    }
  }

  getCardsNotSet(cardsContainers: NodeListOf<HTMLDivElement>) {
    this.getRandomCardNotFlipped(this.getNonSetCards(cardsContainers));
  }

  checkForPair(firstCardSelected: HTMLDivElement) {
    this.store.forEach((storeElement) => {
      if (storeElement.card.id !== firstCardSelected.id) {
        if (
          storeElement.card.getAttribute("data-name") ===
          firstCardSelected.getAttribute("data-name")
        ) {
          //theoretisch auslagern
          if (storeElement.timesFlipped >= this.difficultyValue) {
            let card = document.getElementById(
              storeElement.card.id
            ) as HTMLDivElement;
            this.choice.push(card);
            this.selectCards();
          }
        }
      }
    });
    if (this.choice.length < 2) {
      this.getRandomCardNotFlipped(this.nonSetCards);
    }
  }

  filterCards(memoryCards: HTMLDivElement[]): HTMLDivElement[] {
    let filteredCards = [];
    filteredCards = memoryCards.filter((memoryCard) => {
      return !this.store.find((storedCard) => {
        return storedCard.card.id === memoryCard.id;
      });
    });

    return filteredCards;
  }

  getRandomCardNotFlipped(memoryCards: HTMLDivElement[]) {
    let filteredCards = this.filterCards(memoryCards);
    if (filteredCards.length !== 0) {
      if (!this.choice[0]) {
        this.choice[0] =
          filteredCards[Math.floor(Math.random() * filteredCards.length)];
        this.checkForPair(this.choice[0]);
      } else {
        this.checkForSameCard(filteredCards);
      }
    } else {
      this.getRandomNonSetCard(memoryCards);
    }
  }

  checkForSameCard(cards: HTMLDivElement[]) {
    let sameCard = false;
    while (!sameCard) {
      this.choice[1] = cards[Math.floor(Math.random() * cards.length)];
      if (this.choice[0].id !== this.choice[1].id) {
        sameCard = true;
      }
    }
  }

  getRandomNonSetCard(memoryCards: HTMLDivElement[]) {
    this.checkForSameCard(memoryCards);
  }

  selectCards(): HTMLDivElement[] {
    this.choice.forEach((element) => {
      this.storeCard(element);
      element.classList.add("selected");
      this.setFlipCards();
    });
    return this.choice;
  }

  clear() {
    this.pairs = [];
    this.choice = [];
    this.nonSetCards = [];
    this.maxPair = [];
  }

  findAllPairsInStore() {
    for (let i = 0; i < this.store.length; i++) {
      for (let j = 0; j < this.store.length; j++) {
        if (this.store[i].card.id !== this.store[j].card.id) {
          if (
            this.store[i].card.getAttribute("data-name") ===
            this.store[j].card.getAttribute("data-name")
          ) {
            if (!this.pairs.includes(this.store[i] || this.store[j])) {
              this.pairs.push(this.store[i], this.store[j]);
            }
          }
        }
      }
    }
    if (this.pairs.length !== 0) {
      this.getPairWithMostFlips();
    }
  }

  getPairWithMostFlips() {
    let maxTimesFlipped = 0;
    for (let i = 0; i < this.pairs.length; i++) {
      if (this.pairs[i].timesFlipped > maxTimesFlipped) {
        maxTimesFlipped = this.pairs[i].timesFlipped;
        this.maxPair[0] = this.pairs[i];
      }
    }
    this.maxPair = this.pairs.filter((pair) => {
      return (
        pair.card.getAttribute("data-name") ===
        this.maxPair[0].card.getAttribute("data-name")
      );
    });
  }

  setFlipCards() {
    this.setFlips(this.getFlips() + 1);
    styling.setFlips(this.getFlips(), botFlip);
  }

  getBonus(card: IStore): number {
    let bonus = 0;
    if (this.difficulty === "easy") {
      bonus = card.timesFlipped;
    }
    if (this.difficulty === "medium") {
      bonus = card.timesFlipped * 5;
    }
    if (this.difficulty === "difficult") {
      bonus = card.timesFlipped * 10;
    }
    return bonus;
  }

  random(card: IStore): number {
    let bonus = this.getBonus(card);
    let rnd = Math.floor(Math.random() * 100 + 1);
    return rnd + bonus;
  }

  getNonSetCards(
    cardsContainers: NodeListOf<HTMLDivElement>
  ): HTMLDivElement[] {
    cardsContainers.forEach((cardsContainer) => {
      if (!cardsContainer.classList.contains("set")) {
        this.nonSetCards.push(cardsContainer);
      }
    });
    return this.nonSetCards;
  }
}
