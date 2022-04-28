//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE!

import { helloWorld, Beispiel } from "./myModule";

console.log(helloWorld);
customElements.define("my-beispiel", Beispiel);

const myInputValue = document.querySelector<HTMLInputElement>("#myInput");

const myInputValueAlternate = document.querySelector(
  "#myInput"
) as HTMLInputElement;

document
  .querySelector<HTMLInputElement>("#myInput")
  ?.addEventListener("focus", doSmth);


function doSmth(e: UIEvent) {
  const val = e.target as HTMLInputElement;
  console.log(e, val.value);
}

let memoryCards = document.querySelectorAll<HTMLImageElement>("img");

memoryCards.forEach(memoryCard => {
  memoryCard.addEventListener("click", showName)
});

function showName(e: UIEvent) : void {
  const image = e.target as HTMLImageElement;
  const imageName = image.getAttribute("src");
  console.log(imageName);
}

