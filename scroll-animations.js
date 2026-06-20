(() => {
  const targets = [
    ".card",
    ".stat",
    ".skill",
    ".item-card",
    ".contact-box"
  ];

  const elements = document.querySelectorAll(targets.join(","));
  if (!elements.length) return;

  elements.forEach((el) => {
    el.classList.add("reveal");
  });

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
})();