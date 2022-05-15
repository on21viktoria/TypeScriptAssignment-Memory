import { button, difficultySelector, themeSelector } from "./domUtils";
import * as gameSetup from "./modules/gameSetupModule";

themeSelector.addEventListener("input", gameSetup.chooseTheme);
difficultySelector.addEventListener("input", gameSetup.chooseDifficulty);
button.addEventListener("click", gameSetup.startGameSetup);
