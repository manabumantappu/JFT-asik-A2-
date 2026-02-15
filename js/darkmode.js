const toggleBtn = document.createElement("button");
toggleBtn.innerText = "🌙";
toggleBtn.className =
"fixed bottom-5 right-5 bg-gray-800 text-white p-3 rounded-full";

document.body.appendChild(toggleBtn);

toggleBtn.onclick = () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );
};

if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}
