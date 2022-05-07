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
import {
  playbutton,
  selectedTheme,
  themeSelector,
  chooseTheme,
  getThemeCards,
  startGame,
} from "./modules/gameSetupModule";

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
const bot = new Bot();
const player = new Player("Viktoria");
let currentPlayer: Player = player;

themeSelector.addEventListener("change", chooseTheme);
playbutton?.addEventListener("click", startGame);
cardsContainers.forEach((cardsContainer) => {
  cardsContainer.addEventListener("click", flipCard);
});

function flipCard(this: HTMLDivElement) {
  setFlips();
  this.removeEventListener("click", flipCard);
  this.classList.add("selected");

  selectedCards.push(this);

  if(selectedCards.length === 2){
    checkforMatch(selectedCards)
  }
}

function checkforMatch(selectedcards: HTMLDivElement[]) {
  if (
    selectedcards[0].lastElementChild?.firstElementChild?.getAttribute(
      "name"
    ) ===
    selectedcards[1].lastElementChild?.firstElementChild?.getAttribute("name")
  ) {
    selectedcards.forEach((selectedcard) => {
      selectedcard.classList.add("set");
      selectedcard.classList.remove("selected");
      setPlayerColor(selectedcard);
      selectedcard.removeEventListener("click", flipCard);
    });

    setScore();
  } else {
    selectedcards.forEach((selectedcard) => {
      setTimeout(() => {
        selectedcard.classList.remove("selected");
        selectedcard.addEventListener("click", flipCard);
      }, 1500);
    });
  }

  selectedCards = [];
}

function setScore() {
  player.setScore(player.getScore() + 1);

  let scoreElement: HTMLHeadingElement;
  scoreElement = document.querySelector(
    ".score-number-player"
  ) as HTMLHeadingElement;

  scoreElement.innerHTML = currentPlayer.getScore().toString();
}

function setFlips(){
  player.setFlips(player.getFlips() + 1);

  let flipElement: HTMLHeadingElement;
  flipElement = document.querySelector(
    ".flips-number-player"
  ) as HTMLHeadingElement;

  flipElement.innerHTML = currentPlayer.getFlips().toString();
}

function setPlayerColor(selectedCard: HTMLDivElement) {
    selectedCard.classList.add("set-player");
}
