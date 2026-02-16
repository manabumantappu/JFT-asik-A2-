import { getVocab } from "../services/vocabService.js";

const container = document.getElementById("quizContainer");
const scoreDisplay = document.getElementById("score");

let vocabData = [];
let currentQuestion = null;
let score = 0;

// ================= LOAD =================
async function init() {
  vocabData = await getVocab();
  generateQuestion();
}

// ================= GENERATE QUESTION =================
function generateQuestion() {

  if (vocabData.length < 4) {
    container.innerHTML = "Minimal 4 kosakata dibutuhkan.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * vocabData.length);
  currentQuestion = vocabData[randomIndex];

  const choices = shuffleArray([
    currentQuestion.arti,
    ...getRandomChoices(currentQuestion.arti)
  ]);

  container.innerHTML = `
    <div class="text-xl font-bold mb-4">
      Arti dari: ${currentQuestion.kanji}
    </div>

    ${choices.map(choice => `
      <button 
        class="block w-full bg-gray-200 p-3 rounded-xl mb-2"
        onclick="checkAnswer('${choice.replace(/'/g, "\\'")}')">
        ${choice}
      </button>
    `).join("")}
  `;
}

// ================= CHECK =================
window.checkAnswer = function(answer) {

  if (answer === currentQuestion.arti) {
    score++;
    alert("✅ Benar!");
  } else {
    alert("❌ Salah!\nJawaban: " + currentQuestion.arti);
  }

  scoreDisplay.innerText = "Skor: " + score;
};

// ================= NEXT =================
window.nextQuestion = function() {
  generateQuestion();
};

// ================= HELPERS =================
function getRandomChoices(correct) {

  const others = vocabData
    .filter(item => item.arti !== correct)
    .map(item => item.arti);

  shuffleArray(others);

  return others.slice(0, 3);
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// ================= INIT =================
init();
