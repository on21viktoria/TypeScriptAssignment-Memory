export const playerTurn = document.querySelector(".turn") as HTMLDivElement;
export const botScore = document.querySelector(
  ".score-number-bot"
) as HTMLHeadingElement;
export const playerScore = document.querySelector(
  ".score-number-player"
) as HTMLHeadingElement;
export const popup = document.querySelector<HTMLDivElement>(".popup");
export const button = document.querySelector(".btn") as HTMLButtonElement;
export const playerFlip = document.querySelector(
  ".flips-number-player"
) as HTMLHeadingElement;
export const botFlip = document.querySelector(
  ".flips-number-bot"
) as HTMLHeadingElement;
export const cardsContainers =
  document.querySelectorAll<HTMLDivElement>(".card");
export const themeSelector = document.getElementById(
  "gameTheme"
) as HTMLSelectElement;
export const difficultySelector = document.getElementById(
  "botDifficulty"
) as HTMLSelectElement;
