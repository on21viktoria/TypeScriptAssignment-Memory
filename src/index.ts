//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE!
import { helloWorld, Beispiel } from "./myModule";
import {
  IMemoryCard,
  MemoryCard,
  memoryCardGroups,
} from "./modules/memoryCard";
import { Bot } from "./modules/botModule";
import { Player } from "./modules/playerModule";
import * as game from "./modules/gameModule";

const cards: IMemoryCard[] = [
  {
    cardId: "breaking-bad",
    image: "./src/assets/cards/breaking_bad.png",
    count: 0,
  },
  {
    cardId: "damengambit",
    image: "./src/assets/cards/damengambit.png",
    count: 0,
  },
  {
    cardId: "friends",
    image: "./src/assets/cards/friends.png",
    count: 0,
  },
  {
    cardId: "game-of-thrones",
    image: "./src/assets/cards/game_of_thrones.png",
    count: 0,
  },
  {
    cardId: "haus-des-geldes",
    image: "./src/assets/cards/haus_des_geldes.png",
    count: 0,
  },
  {
    cardId: "rick_and_morty",
    image: "./src/assets/cards/rick_and_morty.png",
    count: 0,
  },
  {
    cardId: "star-trek",
    image: "./src/assets/cards/star_trek.png",
    count: 0,
  },
  {
    cardId: "the-office",
    image: "./src/assets/cards/the_office.png",
    count: 0,
  },
  {
    cardId: "sherlock",
    image: "./src/assets/cards/sherlock.png",
    count: 0,
  },
  {
    cardId: "better_call_saul",
    image: "./src/assets/cards/better_call_saul.png",
    count: 0,
  },
  {
    cardId: "stranger_things",
    image: "./src/assets/cards/stranger_things.png",
    count: 0,
  },
  {
    cardId: "the_twilight_zone",
    image: "./src/assets/cards/the_twilight_zone.png",
    count: 0,
  },
  {
    cardId: "the_walking_dead",
    image: "./src/assets/cards/the_walking_dead.png",
    count: 0,
  },
  {
    cardId: "the-wire",
    image: "./src/assets/cards/the_wire.png",
    count: 0,
  },
  {
    cardId: "vikings",
    image: "./src/assets/cards/vikings.png",
    count: 0,
  },
];

const cardsContainers = document.querySelectorAll<HTMLDivElement>(".card");
let selectedCards: HTMLDivElement[] = [];
let score = 0;
const bot = new Bot();
const player = new Player("Viktoria", "aqua", 0);
let currentPlayer: Player = player;
const themeSelector = document.getElementById("gameTheme");
let selectedTheme: string

themeSelector?.addEventListener("change", chooseTheme);

function chooseTheme(this: HTMLSelectElement) : void {
  let index = this.selectedIndex;
  selectedTheme = this.options[index].value;
  console.log(selectedTheme);

  chooseThemeCards();
}

function chooseThemeCards() : void {
  let currentCardDeck: IMemoryCard[] = [];
  memoryCardGroups.forEach(memoryCardGroup => {
    if(memoryCardGroup.group === selectedTheme){
      currentCardDeck = memoryCardGroup.memoryCards
    }
  });

  assignRandomSpotsForCards(currentCardDeck);
}


function assignRandomSpotsForCards(currentCardDeck: IMemoryCard[]): void {
  let memoryCardsSpots: IMemoryCard[] = [];

  while (memoryCardsSpots.length < 30) {
    let generatedCard = currentCardDeck[Math.floor(Math.random() * cards.length)];

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
  }
}

const button = document.querySelector<HTMLButtonElement>(".btn");

if (button) {
  button.onclick = function () {
    const popup = document.querySelector<HTMLDivElement>(".popup");
    if (popup) {
      popup.style.display = "none";
    }
  };
}

cardsContainers.forEach((cardsContainer) => {
  cardsContainer.addEventListener("click", flipCard);
});

function flipCard(this: HTMLDivElement) {
  this.removeEventListener("click", flipCard);

  bot.storeCards(this);

  selectedCards.push(this);

  selectedCards.forEach((selectedCard) => {
    selectedCard.classList.add("selected");
  });

  if (selectedCards.length === 2) {
    checkforMatch();
  }
}

function flipCardBot(choice: HTMLDivElement[]){
  selectedCards.push(choice[0]);
  selectedCards.push(choice[1])
  selectedCards.forEach((selectedCard) => {
    setTimeout(() => {
      selectedCard.classList.add("selected");
    })
  });

  if (selectedCards.length === 2) {
    checkforMatch();
  }
}



function checkforMatch() {
  if (
    selectedCards[0].lastElementChild?.firstElementChild?.getAttribute(
      "name"
    ) ===
    selectedCards[1].lastElementChild?.firstElementChild?.getAttribute("name")
  ) {
    selectedCards.forEach((selectedCard) => {
      selectedCard.classList.add("set");
      selectedCard.classList.remove("selected");
      setPlayerColor(selectedCard);
      selectedCard.removeEventListener("click", flipCard);
    });

    setScore();
  } else {
    selectedCards.forEach((selectedCard) => {
      setTimeout(() => {
        selectedCard.classList.remove("selected");
        selectedCard.addEventListener("click", flipCard);
      }, 1500);
    });
    changePlayer();
  }

  selectedCards = [];
}

function setScore() {
  currentPlayer.setScore(currentPlayer.getScore() + 1);

  let scoreElement!: HTMLHeadingElement;
  if (currentPlayer === player) {
    scoreElement = document.querySelector(
      ".score-number-player"
    ) as HTMLHeadingElement;
  }
  if (currentPlayer === bot) {
    scoreElement = document.querySelector(
      ".score-number-bot"
    ) as HTMLHeadingElement;
  }
  scoreElement.innerHTML = currentPlayer.getScore().toString();
}

function changePlayer() {
  if (currentPlayer === player) {
    currentPlayer = bot;
    flipCardBot(bot.selectCardsToFlip(cardsContainers));
  } else {
    currentPlayer = player;
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
