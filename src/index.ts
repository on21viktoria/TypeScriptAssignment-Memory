//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE!
import { helloWorld, Beispiel } from "./myModule";
import { MemoryCard } from "./MemoryCard.interface";
import { alertMe } from "./myOtherModule";

const cards: MemoryCard[] = [
  {
    cardId: "breaking-bad",
    image: "./src/assets/cards/breaking_bad.png",
    count: 0,
    selected: false,
    set: false,
  },
  {
    cardId: "damengambit",
    image: "./src/assets/cards/damengambit.png",
    count: 0,
    selected: false,
    set: false,
  },
  {
    cardId: "friends",
    image: "./src/assets/cards/friends.png",
    count: 0,
    selected: false,
    set: false,
  },
  {
    cardId: "game-of-thrones",
    image: "./src/assets/cards/game_of_thrones.png",
    count: 0,
    selected: false,
    set: false,
  },
  {
    cardId: "haus-des-geldes",
    image: "./src/assets/cards/haus_des_geldes.png",
    count: 0,
    selected: false,
    set: false,
  },
  {
    cardId: "rick_and_morty",
    image: "./src/assets/cards/rick_and_morty.png",
    count: 0,
    selected: false,
    set: false,
  },
  {
    cardId: "star-trek",
    image: "./src/assets/cards/star_trek.png",
    count: 0,
    selected: false,
    set: false,
  },
  {
    cardId: "the-office",
    image: "./src/assets/cards/the_office.png",
    count: 0,
    selected: false,
    set: false,
  },
];

const cardsContainers =
  document.querySelectorAll<HTMLDivElement>(".card");
let selectedCards: HTMLDivElement[] = [];
let score: number = 0;

assignRandomSpotsForCards();

function assignRandomSpotsForCards(): void {
  let memoryCardsSpots: MemoryCard[] = [];

  while (memoryCardsSpots.length < 16) {
    let generatedCard = cards[Math.floor(Math.random() * cards.length)];

    if (generatedCard.count < 2) {
      memoryCardsSpots.push(generatedCard);
      generatedCard.count++;
    }
  }
  for (let i = 0; i < cardsContainers.length; i++) {
    console.log(cardsContainers[i].lastElementChild?.firstElementChild)
    cardsContainers[i].lastElementChild?.firstElementChild?.setAttribute("src", memoryCardsSpots[i].image);
    cardsContainers[i].lastElementChild?.firstElementChild?.setAttribute("alt", memoryCardsSpots[i].cardId);
    cardsContainers[i].lastElementChild?.firstElementChild?.setAttribute("name", memoryCardsSpots[i].cardId);
  }
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
  console.log(selectedCards[0])
  if (
    selectedCards[0].lastElementChild?.firstElementChild?.getAttribute("name") ===
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
      }, 1000);
    });
  }

  selectedCards = []
}

function setScore() {
  score++;
  let scoreElement = document.querySelector(".score-number-player") as HTMLHeadingElement
  scoreElement.innerHTML = score.toString();

  if(score === 8) {
    alertMe()
  }
}
