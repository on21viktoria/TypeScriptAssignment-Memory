//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE!
import { helloWorld, Beispiel } from "./myModule";
import { IMemoryCard, MemoryCard } from "./modules/memoryCard";

const cards: IMemoryCard[] = [
  {
    cardId: "breaking-bad",
    image: "./src/assets/cards/breaking_bad.png",
    count: 0,
    flipped: false,
    set: false,
  },
  {
    cardId: "damengambit",
    image: "./src/assets/cards/damengambit.png",
    count: 0,
    flipped: false,
    set: false,
  },
  {
    cardId: "friends",
    image: "./src/assets/cards/friends.png",
    count: 0,
    flipped: false,
    set: false,
  },
  {
    cardId: "game-of-thrones",
    image: "./src/assets/cards/game_of_thrones.png",
    count: 0,
    flipped: false,
    set: false,
  },
  {
    cardId: "haus-des-geldes",
    image: "./src/assets/cards/haus_des_geldes.png",
    count: 0,
    flipped: false,
    set: false,
  },
  {
    cardId: "rick_and_morty",
    image: "./src/assets/cards/rick_and_morty.png",
    count: 0,
    flipped: false,
    set: false,
  },
  {
    cardId: "star-trek",
    image: "./src/assets/cards/star_trek.png",
    count: 0,
    flipped: false,
    set: false,
  },
  {
    cardId: "the-office",
    image: "./src/assets/cards/the_office.png",
    count: 0,
    flipped: false,
    set: false,
  },
  {
    cardId: "sherlock",
    image: "./src/assets/cards/sherlock.png",
    count: 0,
    flipped: false,
    set: false,
  },
  {
    cardId: "better_call_saul",
    image: "./src/assets/cards/better_call_saul.png",
    count: 0,
    flipped: false,
    set: false,
  },
  {
    cardId: "stranger_things",
    image: "./src/assets/cards/stranger_things.png",
    count: 0,
    flipped: false,
    set: false,
  },
  {
    cardId: "the_twilight_zone",
    image: "./src/assets/cards/the_twilight_zone.png",
    count: 0,
    flipped: false,
    set: false,
  },
  {
    cardId: "the_walking_dead",
    image: "./src/assets/cards/the_walking_dead.png",
    count: 0,
    flipped: false,
    set: false,
  },
  {
    cardId: "the-wire",
    image: "./src/assets/cards/the_wire.png",
    count: 0,
    flipped: false,
    set: false,
  },
  {
    cardId: "vikings",
    image: "./src/assets/cards/vikings.png",
    count: 0,
    flipped: false,
    set: false,
  },
];

const cardsContainers = document.querySelectorAll<HTMLDivElement>(".card");
let selectedCards: HTMLDivElement[] = [];
let score = 0;
let currentPlayer = 0;

assignRandomSpotsForCards();

function assignRandomSpotsForCards(): void {
  let memoryCardsSpots: IMemoryCard[] = [];

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
  }
}

const button = document.querySelector<HTMLButtonElement>(".btn");

if (button) {
  console.log(button);
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

  selectedCards.push(this);

  selectedCards.forEach((selectedCard) => {
    console.log(selectedCard);
    selectedCard.classList.add("selected");
  });

  if (selectedCards.length === 2) {
    checkforMatch();
  }
}

function checkforMatch() {
  console.log(selectedCards[0]);
  if (
    selectedCards[0].lastElementChild?.firstElementChild?.getAttribute(
      "name"
    ) ===
    selectedCards[1].lastElementChild?.firstElementChild?.getAttribute("name")
  ) {
    console.log("Match");
    selectedCards.forEach((selectedCard) => {
      selectedCard.classList.add("set-player");
      selectedCard.removeEventListener("click", flipCard);
    });

    setScore();
  } else {
    console.log("no match");
    selectedCards.forEach((selectedCard) => {
      setTimeout(() => {
        selectedCard.classList.remove("selected");
        selectedCard.addEventListener("click", flipCard);
      }, 1500);
    });
  }

  selectedCards = [];
}

function setScore() {
  score++;
  let scoreElement = document.querySelector(
    ".score-number-player"
  ) as HTMLHeadingElement;
  scoreElement.innerHTML = score.toString();
}
