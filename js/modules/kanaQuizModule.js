export function initQuiz(data, saveXP) {

  const container = document.getElementById("quizBox");
  let score = 0;
  let current;

  function nextQuestion() {

    current = data[Math.floor(Math.random() * data.length)];

    const choices = shuffle([
      current.romaji,
      ...data.filter(d => d.romaji !== current.romaji)
             .slice(0,3)
             .map(d => d.romaji)
    ]);

    container.innerHTML = `
      <div class="text-5xl font-bold mb-6">
        ${current.char}
      </div>

      ${choices.map(c => `
        <button class="choice block w-full bg-gray-200 p-3 rounded-xl mb-2">
          ${c}
        </button>
      `).join("")}
    `;

    document.querySelectorAll(".choice").forEach(btn => {
      btn.onclick = () => checkAnswer(btn.innerText);
    });
  }

  function checkAnswer(answer) {

    if (answer === current.romaji) {
      score++;
      btnFeedback("Benar!");
    } else {
      btnFeedback("Salah!");
    }

    setTimeout(nextQuestion, 800);
  }

  function btnFeedback(text) {
    container.insertAdjacentHTML("beforeend",
      `<div class="mt-4 font-bold">${text}</div>`);
  }

  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  nextQuestion();
}
