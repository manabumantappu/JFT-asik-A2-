import { hiraganaData } from "../data/hiragana.js";

const card = document.getElementById("card");

let index = 0;
let flipped = false;

function showCard() {
  card.innerText = flipped 
    ? hiraganaData[index].romaji 
    : hiraganaData[index].char;
}

card.addEventListener("click", () => {
  flipped = !flipped;
  showCard();
});

function nextCard() {
  flipped = false;
  index = (index + 1) % hiraganaData.length;
  showCard();
}

setInterval(nextCard, 4000);

showCard();
