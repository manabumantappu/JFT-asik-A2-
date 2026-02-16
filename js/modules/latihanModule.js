import { getVocab } from "../services/vocabService.js";

const container = document.getElementById("quizContainer");
const scoreDisplay = document.getElementById("score");

let vocabData = [];
let currentQuestion = null;
let score = 0;
let answered = false;

// ================= INIT =================
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

  answered = false;

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
        class="answerBtn block w-full bg-gray-200 p-3 rounded-xl mb-2 transition"
        data-answer="${choice}">
        ${choice}
      </button>
    `).join("")}
  `;

  document.querySelectorAll(".answerBtn").forEach(btn => {
    btn.addEventListener("click", () => checkAnswer(btn));
  });
}

// ================= CHECK ANSWER =================
function checkAnswer(button) {

  if (answered) return;
  answered = true;

  const selected = button.dataset.answer;
  const correct = currentQuestion.arti;

  const buttons = document.querySelectorAll(".answerBtn");

  buttons.forEach(btn => {

    btn.disabled = true;

    if (btn.dataset.answer === correct) {
      btn.classList.remove("bg-gray-200");
      btn.classList.add("bg-green-500", "text-white");
    }

    if (btn.dataset.answer === selected && selected !== correct) {
      btn.classList.remove("bg-gray-200");
      btn.classList.add("bg-red-500", "text-white");
    }
  });

  if (selected === correct) {
    score++;
    scoreDisplay.innerText = "Skor: " + score;
  }
}

// ================= NEXT QUESTION =================
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

// ================= START =================
init();
