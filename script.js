const canvas = document.querySelector("#hero-canvas");
const ctx = canvas.getContext("2d");
const typedLine = document.querySelector("#typed-line");
const counters = document.querySelectorAll("[data-count]");
const tabs = document.querySelectorAll(".filter-tab");
const cards = document.querySelectorAll(".project-card");

const phrases = [
  "mapping BDD scenarios...",
  "validating API contracts...",
  "capturing trace evidence...",
  "turning failures into signal..."
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
let particles = [];

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(canvas.offsetWidth * ratio);
  canvas.height = Math.floor(canvas.offsetHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  seedParticles();
}

function seedParticles() {
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  const count = width < 680 ? 34 : 62;

  particles = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.34,
    vy: (Math.random() - 0.5) * 0.34,
    radius: index % 5 === 0 ? 2.2 : 1.35,
    hue: ["#f4a261", "#0f8b8d", "#4c956c", "#e76f51"][index % 4]
  }));
}

function drawCanvas() {
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  ctx.clearRect(0, 0, width, height);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > height) particle.vy *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.hue;
    ctx.globalAlpha = 0.78;
    ctx.fill();

    for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
      const next = particles[nextIndex];
      const distance = Math.hypot(particle.x - next.x, particle.y - next.y);
      if (distance < 130) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(next.x, next.y);
        ctx.strokeStyle = particle.hue;
        ctx.globalAlpha = (130 - distance) / 620;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawCanvas);
}

function typeLoop() {
  const phrase = phrases[phraseIndex];
  if (!deleting) {
    charIndex += 1;
    typedLine.textContent = phrase.slice(0, charIndex);
    if (charIndex === phrase.length) {
      deleting = true;
      window.setTimeout(typeLoop, 1100);
      return;
    }
  } else {
    charIndex -= 1;
    typedLine.textContent = phrase.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  window.setTimeout(typeLoop, deleting ? 34 : 58);
}

function animateCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.count);
    const duration = 900;
    const startedAt = performance.now();

    function tick(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = target === 100 ? `${value}%` : value;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    tabs.forEach((item) => {
      item.classList.toggle("is-active", item === tab);
      item.setAttribute("aria-selected", item === tab ? "true" : "false");
    });

    cards.forEach((card) => {
      card.classList.toggle("is-hidden", filter !== "all" && card.dataset.type !== filter);
    });
  });
});

const counterObserver = new IntersectionObserver(
  (entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      animateCounters();
      counterObserver.disconnect();
    }
  },
  { threshold: 0.35 }
);

const metrics = document.querySelector(".metrics-band");
if (metrics) counterObserver.observe(metrics);

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawCanvas();
typeLoop();

