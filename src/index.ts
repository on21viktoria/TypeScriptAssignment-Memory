//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE!
import { helloWorld, Beispiel } from "./myModule";
import { MemoryCard } from "./MemoryCard.interface";

const cards: MemoryCard[] = [
  {
    cardId: "breaking-bad",
    image: "./src/assets/cards/breaking_bad.jpg",
    count: 0,
    selected: false,
    set: false,
  },
  {
    cardId: "damengambit",
    image: "./src/assets/cards/damengambit.jpg",
    count: 0,
    selected: false,
    set: false,
  },
  {
    cardId: "friends",
    image: "./src/assets/cards/friends.jpg",
    count: 0,
    selected: false,
    set: false,
  },
  {
    cardId: "game-of-thrones",
    image: "./src/assets/cards/game_of_thrones.jpg",
    count: 0,
    selected: false,
    set: false,
  },
  {
    cardId: "haus-des-geldes",
    image: "./src/assets/cards/haus_des_geldes.jpg",
    count: 0,
    selected: false,
    set: false,
  },
  {
    cardId: "rick_and_morty",
    image: "./src/assets/cards/rick_and_morty.JPG",
    count: 0,
    selected: false,
    set: false,
  },
  {
    cardId: "star-trek",
    image: "./src/assets/cards/star_trek.jpg",
    count: 0,
    selected: false,
    set: false,
  },
  {
    cardId: "the-office",
    image: "./src/assets/cards/the_office.jpg",
    count: 0,
    selected: false,
    set: false,
  },
];

const cardsContainers =
  document.querySelectorAll<HTMLImageElement>(".memory-card");
let selectedCards: HTMLImageElement[] = [];
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
    cardsContainers[i].setAttribute("src", memoryCardsSpots[i].image);
    cardsContainers[i].setAttribute("alt", memoryCardsSpots[i].cardId);
    cardsContainers[i].setAttribute("name", memoryCardsSpots[i].cardId);
  }
}

cardsContainers.forEach((cardsContainer) => {
  cardsContainer.addEventListener("click", selectCard);
});

function selectCard(e: UIEvent) {
  const currentCard = e.target as HTMLImageElement;
  currentCard.removeEventListener("click", selectCard);

  selectedCards.push(currentCard);

  selectedCards.forEach((selectedCard) => {
    console.log(selectedCard);
    selectedCard.parentElement?.classList.add("selected")
  });

  if (selectedCards.length === 2) {
    checkforMatch();
  }
}

function checkforMatch() {
  if (
    selectedCards[0].getAttribute("name") ===
    selectedCards[1].getAttribute("name")
  ) {
    console.log("Match");
    selectedCards.forEach((selectedCard) => {
    selectedCard.parentElement?.classList.remove("selected");
    selectedCard.parentElement?.classList.add("set");
    selectedCard.removeEventListener("click", selectCard);
    });

    setScore();
  } else {
    console.log("no match");
    selectedCards.forEach((selectedCard) => {
      selectedCard.parentElement?.classList.remove("selected");
      selectedCard.addEventListener("click", selectCard);
    });
  }

  selectedCards = []
}

function setScore() {
  score++;
  let scoreElement = document.querySelector(".score") as HTMLHeadingElement
  scoreElement.innerHTML = score.toString();

  if(score === 8) {
    console.log("You won!")
  }
}
