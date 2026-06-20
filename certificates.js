(() => {
  const certificates = [
    {
      title: "Certificate 1",
      subtitle: "NPTEL / IBM / In progress",
      image: "cert1.jpg",
    },
    {
      title: "Certificate 2",
      subtitle: "NPTEL / IBM / In progress",
      image: "cert2.jpg",
    },
    {
      title: "Certificate 3",
      subtitle: "NPTEL / IBM / In progress",
      image: "cert3.jpg",
    },
    {
      title: "Certificate 4",
      subtitle: "Placeholder image later",
      image: "cert4.jpg",
    },
    {
      title: "Certificate 5",
      subtitle: "Placeholder image later",
      image: "cert5.jpg",
    },
  ];

  function createModal() {
    const modal = document.createElement("div");
    modal.className = "cert-modal";
    modal.innerHTML = `
      <div class="cert-modal-backdrop"></div>
      <div class="cert-modal-content">
        <button class="cert-modal-close" aria-label="Close">×</button>
        <img class="cert-modal-image" alt="" />
        <h3 class="cert-modal-title"></h3>
        <p class="cert-modal-subtitle"></p>
      </div>
    `;
    document.body.appendChild(modal);

    const close = () => modal.classList.remove("open");
    modal.querySelector(".cert-modal-backdrop").addEventListener("click", close);
    modal.querySelector(".cert-modal-close").addEventListener("click", close);
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    return {
      open(item) {
        const img = modal.querySelector(".cert-modal-image");
        modal.querySelector(".cert-modal-title").textContent = item.title;
        modal.querySelector(".cert-modal-subtitle").textContent = item.subtitle;
        img.src = item.image;
        img.alt = item.title;
        modal.classList.add("open");
      },
    };
  }

  function renderCertificates() {
    const grid = document.querySelector("#certificates .cert-grid");
    if (!grid) return;

    const modal = createModal();

    grid.innerHTML = certificates
      .map(
        (cert, index) => `
          <article class="card item-card cert-fade" data-cert-index="${index}">
            <div class="cert-image-wrap">
              <img class="cert-image" src="${cert.image}" alt="${cert.title}" />
            </div>
            <div class="body">
              <h3>${cert.title}</h3>
              <div class="meta">${cert.subtitle}</div>
              <button class="link live cert-view-btn" type="button">View Certificate</button>
            </div>
          </article>
        `
      )
      .join("");

    grid.querySelectorAll(".cert-fade").forEach((card) => {
      const index = Number(card.dataset.certIndex);
      const item = certificates[index];
      const openBtn = card.querySelector(".cert-view-btn");

      card.addEventListener("click", () => modal.open(item));
      openBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        modal.open(item);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", renderCertificates);
})();