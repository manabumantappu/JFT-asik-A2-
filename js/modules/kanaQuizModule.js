export function initQuiz(data, mode = "quiz") {

  const quizBox = document.getElementById("quizBox");

  let score = 0;
  let timeLeft = mode === "speed" ? 30 : 60;

  let timerInterval;
  let current;

  // ================= TIMER =================
  function startTimer() {
    timerInterval = setInterval(() => {

      timeLeft--;

      const timerEl = document.getElementById("timer");
      if (timerEl) {
        timerEl.innerText = timeLeft + "s";
      }

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endGame();
      }

    }, 1000);
  }

  // ================= NEXT QUESTION =================
  function nextQuestion() {

    current = data[Math.floor(Math.random() * data.length)];

    const choices = shuffle([
      current.romaji,
      ...shuffle(
        data.filter(d => d.romaji !== current.romaji)
      ).slice(0, 3).map(d => d.romaji)
    ]);

    quizBox.innerHTML = `
      <div class="flex justify-between text-sm text-gray-500 mb-4">
        <div>⏳ <span id="timer">${timeLeft}s</span></div>
        <div>⭐ Score: ${score}</div>
      </div>

      <div class="flex items-center justify-center h-[32vh] sm:h-[240px]">

        <div id="kanaChar"
             class="kana-animate
                    text-[28vw] sm:text-7xl md:text-8xl
                    font-bold leading-none text-purple-700">
          ${current.char}
        </div>

      </div>

      <div class="space-y-4 mt-4">
        ${choices.map(opt => `
          <button
            class="choice w-full py-4 rounded-2xl bg-gray-100
                   text-lg font-semibold
                   hover:bg-purple-200
                   active:scale-95 transition">
            ${opt}
          </button>
        `).join("")}
      </div>
    `;

    // Trigger animasi ulang
    setTimeout(() => {
      const kana = document.getElementById("kanaChar");
      if (kana) {
        kana.classList.remove("kana-animate");
        void kana.offsetWidth;
        kana.classList.add("kana-animate");
      }
    }, 10);

    // Add event listener
    document.querySelectorAll(".choice").forEach(btn => {
      btn.onclick = () => checkAnswer(btn.innerText);
    });
  }

  // ================= CHECK ANSWER =================
  function checkAnswer(answer) {

    if (answer === current.romaji) {
      score++;
    }

    nextQuestion();
  }

  // ================= END GAME =================
  function endGame() {

    quizBox.innerHTML = `
      <div class="text-center">

        <div class="text-3xl font-bold mb-4 text-purple-700">
          ⏰ Waktu Habis!
        </div>

        <div class="text-xl mb-6">
          Skor Akhir:
          <span class="font-bold text-indigo-600">
            ${score}
          </span>
        </div>

        <button onclick="location.reload()"
          class="bg-indigo-600 text-white px-6 py-3 rounded-2xl
                 hover:scale-105 active:scale-95 transition">
          Main Lagi
        </button>

      </div>
    `;
  }

  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  nextQuestion();
  startTimer();
}
