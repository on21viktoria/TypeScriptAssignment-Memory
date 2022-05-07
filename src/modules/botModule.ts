import { MemoryCard } from "./memoryCard";
import { Player } from "./playerModule";

export enum Difficulty {
  easy,
  medium,
  hard,
}

export interface Store {
  memoryCard: HTMLDivElement;
  timesFlipped: number;
}

export interface Bot extends Player {
  difficulty: Difficulty;
  store: Store[];
}

export class Bot extends Player implements Bot {
  choice: HTMLDivElement[] = [];

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

  storeCards(memoryCard: HTMLDivElement): void {
    let timesFlipped = 1;

    if (this.store.length === 0) {
      this.store.push({ memoryCard, timesFlipped });
    } else {
      let currentCard = this.store.find(
        (s) => s.memoryCard.id === memoryCard.id
      );
      if (currentCard) {
        currentCard.timesFlipped += 1;
      } else {
        this.store.push({ memoryCard, timesFlipped });
      }
    }
  }

  selectCardsToFlip(cardsContainers: NodeListOf<HTMLDivElement>): void {
    let possibleChoices: HTMLDivElement[] = [];
    let choicesNotEqual = false;

    cardsContainers.forEach((cardsContainer) => {
      if (!cardsContainer.classList.contains("set")) {
        possibleChoices.push(cardsContainer);
      }
    });

    this.choice[0] =
      possibleChoices[Math.floor(Math.random() * possibleChoices.length)];

    this.choice[1] =
      possibleChoices[Math.floor(Math.random() * possibleChoices.length)];

    if(this.choice[0] === this.choice[1]){
      while(!choicesNotEqual){
        this.choice[1] =
        possibleChoices[Math.floor(Math.random() * possibleChoices.length)];
      }
      if(this.choice[0] === this.choice[1]){
        choicesNotEqual = true;
      }
    }
  }

  

  flipCardBot(
    cardsContainers: NodeListOf<HTMLDivElement>,
  ): HTMLDivElement[] {
    this.selectCardsToFlip(cardsContainers);

    this.choice.forEach((c) => {
      setTimeout(() => {
        c.classList.add("selected");
      }, 1500);

      console.log(c.classList);
    });


    return this.choice;
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
