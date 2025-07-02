function createStars(layerId, count, size, color, speed, glow = false) {
  const container = document.getElementById(layerId);
  
  // Clear any previous canvas
  container.innerHTML = "";

  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const stars = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * size + 1,
    dx: (Math.random() - 0.5) * speed,
    dy: (Math.random() - 0.5) * speed,
    pulse: Math.random(),
    pulseSpeed: 0.02 + Math.random() * 0.02
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      star.pulse += star.pulseSpeed;
      const scale = 1 + Math.sin(star.pulse) * 0.4;

      ctx.shadowBlur = glow ? 30 : 0;
      ctx.shadowColor = glow ? color : 'transparent';
      ctx.fillStyle = color;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r * scale, 0, 2 * Math.PI);
      ctx.fill();
    });

    stars.forEach(star => {
      star.x += star.dx;
      star.y += star.dy;
      if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
      if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
    });

    requestAnimationFrame(draw);
  }

  draw();
}

document.addEventListener("mousemove", (e) => {
  const { innerWidth, innerHeight } = window;
  const x = (e.clientX - innerWidth / 2) / innerWidth;
  const y = (e.clientY - innerHeight / 2) / innerHeight;

  document.getElementById("bg-layer").style.transform = `translate(${x * 30}px, ${y * 30}px)`;
  document.getElementById("mid-layer").style.transform = `translate(${x * 50}px, ${y * 50}px)`;
  document.getElementById("fg-layer").style.transform = `translate(${x * 70}px, ${y * 70}px)`;
});

window.addEventListener("scroll", () => {
  const moon = document.getElementById("moon");
  const scrollY = window.scrollY;
  moon.style.top = scrollY > window.innerHeight * 0.3 ? "80vh" : "0";
});

window.addEventListener('load', () => {
  createStars("bg-layer", 100, 2, "rgba(200,200,255,0.7)", 0.2, true);
  createStars("mid-layer", 70, 3.5, "rgba(255,255,255,0.9)", 0.3, true);
  createStars("fg-layer", 40, 4.5, "#ffffff", 0.4, true);
});

const words = [
  "Welcome", "欢迎", "ようこそ", "환영합니다", "ยินดีต้อนรับ",
  "Bienvenue", "Willkommen", "Bienvenido", "Benvenuto", "Добро пожаловать"
];

let wordIndex = 0, charIndex = 0, isDeleting = false;
const el = document.getElementById("typewriter");
const typeSpeed = 100, deleteSpeed = 50, pauseAfterTyping = 1500;

function typeLoop() {
  const currentWord = words[wordIndex];
  el.textContent = currentWord.substring(0, charIndex);

  if (!isDeleting) {
    if (charIndex < currentWord.length) {
      charIndex++;
      setTimeout(typeLoop, typeSpeed);
    } else {
      isDeleting = true;
      setTimeout(typeLoop, pauseAfterTyping);
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
      setTimeout(typeLoop, deleteSpeed);
    } else {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeLoop, 400);
    }
  }
}

typeLoop();

window.addEventListener("resize", () => location.reload());
