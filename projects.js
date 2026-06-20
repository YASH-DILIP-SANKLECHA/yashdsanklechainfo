(() => {
  const projects = [
    {
      title: "Project 1",
      status: "Under testing",
      description: "A live project slot reserved for your first major work.",
      tech: ["HTML", "CSS", "JavaScript"],
      live: "#",
      github: "#",
    },
    {
      title: "Project 2",
      status: "Under testing",
      description: "A live project slot reserved for your second major work.",
      tech: ["HTML", "CSS", "JavaScript"],
      live: "#",
      github: "#",
    },
    {
      title: "Project 3",
      status: "Under testing",
      description: "A live project slot reserved for your third major work.",
      tech: ["HTML", "CSS", "JavaScript"],
      live: "#",
      github: "#",
    },
    {
      title: "Project 4",
      status: "Under testing",
      description: "A live project slot reserved for your fourth major work.",
      tech: ["HTML", "CSS", "JavaScript"],
      live: "#",
      github: "#",
    },
    {
      title: "Project 5",
      status: "Under testing",
      description: "A live project slot reserved for your fifth major work.",
      tech: ["HTML", "CSS", "JavaScript"],
      live: "#",
      github: "#",
    },
  ];

  function renderProjects() {
    const grid = document.querySelector("#projects .projects-grid");
    if (!grid) return;

    grid.innerHTML = projects
      .map(
        (project, index) => `
          <article class="card item-card project-fade">
            <div class="thumb">PROJECT ${index + 1} · ${project.status.toUpperCase()} · IMAGE / LINK PLACEHOLDER</div>
            <div class="body">
              <h3>${project.title}</h3>
              <div class="meta">${project.status}</div>
              <p>${project.description}</p>
              <div class="tech-row">
                ${project.tech.map((tech) => `<span class="tech-pill">${tech}</span>`).join("")}
              </div>
              <div class="link-row">
                <a class="link live" href="${project.live}" target="_blank" rel="noreferrer">Live Demo</a>
                <a class="link code" href="${project.github}" target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
          </article>
        `
      )
      .join("");
  }

  document.addEventListener("DOMContentLoaded", renderProjects);
})();