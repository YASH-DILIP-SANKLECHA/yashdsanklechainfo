(() => {
  const canvas = document.createElement("canvas");
  canvas.id = "particleCanvas";
  canvas.className = "particle-canvas";
  document.body.appendChild(canvas);

  const style = document.createElement("style");
  style.textContent = `
    .particle-canvas {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      opacity: 0.45;
    }

    body > header,
    body > section,
    body > main,
    body > footer,
    body > .backtop {
      position: relative;
      z-index: 1;
    }
  `;
  document.head.appendChild(style);

  const ctx = canvas.getContext("2d");
  let w = 0;
  let h = 0;
  let particles = [];

  function resize() {
    w = canvas.width = window.innerWidth * window.devicePixelRatio;
    h = canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    const count = Math.max(28, Math.min(64, Math.floor(window.innerWidth / 18)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.6 + 0.6) * window.devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.22 * window.devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.22 * window.devicePixelRatio,
    }));
  }

  function drawLine(a, b, alpha) {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = `rgba(255, 184, 28, ${alpha})`;
    ctx.lineWidth = 1 * window.devicePixelRatio;
    ctx.stroke();
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 140 * window.devicePixelRatio;

        if (dist < maxDist) {
          drawLine(a, b, (1 - dist / maxDist) * 0.15);
        }
      }
    }

    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();
  frame();
})();