(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const typedText = document.getElementById("typedText");
  const backTop = document.getElementById("backTop");
  const modal = document.getElementById("previewModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");

  const typingWords = [
    "CSE Student",
    "C++ Developer",
    "Web Developer",
    "Problem Solver",
    "App Development Learner"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const word = typingWords[wordIndex];
    const nextText = deleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);
    typedText.textContent = nextText;

    if (!deleting && charIndex > word.length) {
      deleting = true;
      setTimeout(typeLoop, 1100);
      return;
    }

    if (deleting && charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
      charIndex = 0;
    }

    setTimeout(typeLoop, deleting ? 45 : 70);
  }

  typeLoop();

  const savedTheme = localStorage.getItem("theme");
  const initialTheme =
    savedTheme ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  applyTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme") || "light";
    applyTheme(current === "dark" ? "light" : "dark");
  });

  const revealItems = document.querySelectorAll(
    ".section, .card, .project-card, .cert-card, .contact-box, .skill, .fact"
  );

  revealItems.forEach((el) => el.classList.add("reveal"));

  function showBackTop() {
    if (window.scrollY > 360) backTop.classList.add("show");
    else backTop.classList.remove("show");
  }

  window.addEventListener("scroll", showBackTop);
  showBackTop();

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      )
    : null;

  if (observer) {
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("show"));
  }

  const modalOpeners = document.querySelectorAll("[data-cert]");
  const closeModalTargets = modal.querySelectorAll("[data-close-modal]");

  function openModal({ title, subtitle, image }) {
    modalImage.src = image;
    modalImage.alt = title;
    modalTitle.textContent = title;
    modalSubtitle.textContent = subtitle;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  modalOpeners.forEach((button) => {
    button.addEventListener("click", () => {
      openModal({
        title: button.dataset.title || "Certificate",
        subtitle: button.dataset.subtitle || "",
        image: button.dataset.image || ""
      });
    });
  });

  closeModalTargets.forEach((target) => target.addEventListener("click", closeModal));

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  const projectCards = document.querySelectorAll("[data-project]");
  projectCards.forEach((card, index) => {
    const liveLink = card.querySelector(".btn-live");
    const codeLink = card.querySelector(".btn-code");

    const projectNames = [
      "Project 1",
      "Project 2",
      "Project 3",
      "Project 4",
      "Project 5"
    ];

    liveLink.addEventListener("click", (e) => {
      e.preventDefault();
      openModal({
        title: projectNames[index],
        subtitle: "Project is under testing. Live demo will be added later.",
        image: "myphoto.jpg"
      });
    });

    codeLink.addEventListener("click", (e) => {
      e.preventDefault();
      openModal({
        title: projectNames[index],
        subtitle: "GitHub source link will be added later.",
        image: "myphoto.jpg"
      });
    });
  });

  const navLinks = document.querySelectorAll(".nav a, .brand, .hero-actions a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (modal.classList.contains("open")) closeModal();
    });
  });
})();