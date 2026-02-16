export function initFlash(data) {

  const container = document.getElementById("flashCard");

  let index = 0;
  let flipped = false;

  function render() {
    container.innerHTML = flipped
      ? `<div class="text-3xl">${data[index].romaji}</div>`
      : `<div class="text-6xl font-bold">${data[index].char}</div>`;
  }

  container.addEventListener("click", () => {
    flipped = !flipped;
    render();
  });

  window.nextKana = function() {
    flipped = false;
    index = (index + 1) % data.length;
    render();
  };

  render();
}
