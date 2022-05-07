import { IMemoryCard } from "./memoryCard";
import { memoryCardGroups } from "./memoryCard";

export const cardsContainers =
  document.querySelectorAll<HTMLDivElement>(".card");
export const themeSelector = document.getElementById(
  "gameTheme"
) as HTMLSelectElement;

