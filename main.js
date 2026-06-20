const words = [
  "CSE Student",
  "C++ Developer",
  "Web Developer",
  "Problem Solver",
  "App Development Learner"
];

const typeEl = document.getElementById("typeText");
const themeBtn = document.getElementById("themeBtn");
const backTop = document.getElementById("backTop");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeTick() {
  const word = words[wordIndex];
  const text = deleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);
  typeEl.textContent = text;

  if (!deleting && charIndex > word.length) {
    deleting = true;
    setTimeout(typeTick, 1000);
    return;
  }

  if (deleting && charIndex < 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    charIndex = 0;
  }

  setTimeout(typeTick, deleting ? 45 : 70);
}

typeTick();

const savedTheme = localStorage.getItem("theme") || "light";
document.body.setAttribute("data-theme", savedTheme);
themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

themeBtn.addEventListener("click", () => {
  const nextTheme = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
  themeBtn.textContent = nextTheme === "dark" ? "☀️" : "🌙";
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 350) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});