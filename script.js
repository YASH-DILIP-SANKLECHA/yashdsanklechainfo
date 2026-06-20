(() => {
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  if (!navToggle || !siteNav) return;

  const closeNav = () => {
    siteNav.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  };

  const openNav = () => {
    siteNav.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close navigation");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.contains("nav-open");
    if (isOpen) closeNav();
    else openNav();
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 760) closeNav();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeNav();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });
})();