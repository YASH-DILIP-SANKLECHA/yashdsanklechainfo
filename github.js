(() => {
  const GITHUB_USERNAME = "YOUR_GITHUB_USERNAME";

  const githubSection = document.getElementById("github");
  if (!githubSection) return;

  githubSection.innerHTML = `
    <div class="section-head">
      <h2>GitHub</h2>
      <span>Live profile data</span>
    </div>
    <div class="card github-loading">Loading GitHub profile...</div>
  `;

  async function fetchJson(url) {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });
    if (!response.ok) {
      throw new Error(`GitHub request failed: ${response.status}`);
    }
    return response.json();
  }

  async function loadGitHub() {
    try {
      const profile = await fetchJson(`https://api.github.com/users/${GITHUB_USERNAME}`);
      const repos = await fetchJson(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
      );

      const topRepos = repos
        .filter((repo) => !repo.fork)
        .slice(0, 6);

      githubSection.innerHTML = `
        <div class="section-head">
          <h2>GitHub</h2>
          <span>@${GITHUB_USERNAME}</span>
        </div>

        <div class="github-grid">
          <div class="github-card">
            <strong>${profile.public_repos}</strong>
            <span>Public Repos</span>
          </div>
          <div class="github-card">
            <strong>${profile.followers}</strong>
            <span>Followers</span>
          </div>
          <div class="github-card">
            <strong>${profile.following}</strong>
            <span>Following</span>
          </div>
          <div class="github-card">
            <strong>${profile.public_gists}</strong>
            <span>Gists</span>
          </div>
        </div>

        <div class="github-repos">
          ${topRepos
            .map(
              (repo) => `
              <a class="repo-item" href="${repo.html_url}" target="_blank" rel="noreferrer">
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description added yet."}</p>
                <span>${repo.language || "Code"} • ★ ${repo.stargazers_count}</span>
              </a>
            `
            )
            .join("")}
        </div>
      `;
    } catch (error) {
      githubSection.innerHTML = `
        <div class="section-head">
          <h2>GitHub</h2>
          <span>Unavailable</span>
        </div>
        <div class="card">
          GitHub profile could not be loaded. Set your username inside <b>github.js</b>.
        </div>
      `;
      console.error(error);
    }
  }

  document.addEventListener("DOMContentLoaded", loadGitHub);
})();