import { IPlayer, Player } from "./playerModule";
import * as domUtils from "./../domUtils";
import { Bot } from "./botModule";

export function setCard(selectedCard: HTMLDivElement) {
  selectedCard.classList.add("set");
  selectedCard.classList.remove("selected");
}

export function removeSelectedState(selectedCard: HTMLDivElement) {
  selectedCard.classList.remove("selected");
}

export function setPlayerColorForCard(
  selectedCard: HTMLDivElement,
  currentPlayer: IPlayer
) {
  if (currentPlayer.name === "player") {
    selectedCard.classList.add("set-player");
  }
  if (currentPlayer.name === "bot") {
    selectedCard.classList.add("set-bot");
  }
}

export function changeMessageBoxToBot() {
  domUtils.playerTurn.classList.add("botTurn");
  domUtils.playerTurn.classList.remove("playerTurn");
  domUtils.playerTurn.innerHTML = "Bot's turn";
}

export function changeMessageBoxToPlayer() {
  domUtils.playerTurn.classList.add("playerTurn");
  domUtils.playerTurn.classList.remove("botTurn");
  domUtils.playerTurn.innerHTML = "Your turn";
}

export function setScore(score: number, scoreElement: HTMLHeadingElement) {
  scoreElement.innerHTML = score.toString();
}

export function setFlips(flip: number, flipElement: HTMLHeadingElement) {
  flipElement.innerHTML = flip.toString();
}
