import confetti from "canvas-confetti";

const RAINBOW_COLORS = [
  "#e84057", // red
  "#e8883a", // orange
  "#d4c73a", // yellow
  "#2db87a", // green
  "#3a8fe8", // blue
  "#8a4fe8", // purple
  "#e84fa5", // pink
  "#f0c040", // gold
];

export function fireFireworks() {
  const duration = 3000;
  const end = Date.now() + duration;

  // Initial big burst
  confetti({
    particleCount: 150,
    spread: 100,
    startVelocity: 55,
    origin: { x: 0.5, y: 0.5 },
    colors: RAINBOW_COLORS,
    scalar: 1.2,
    gravity: 0.8,
    ticks: 200,
  });

  // Side cannons
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 70,
    origin: { x: 0, y: 0.7 },
    colors: RAINBOW_COLORS,
    startVelocity: 45,
  });
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 70,
    origin: { x: 1, y: 0.7 },
    colors: RAINBOW_COLORS,
    startVelocity: 45,
  });

  // Sustained fireworks
  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    confetti({
      particleCount: 30,
      spread: 60 + Math.random() * 40,
      startVelocity: 30 + Math.random() * 20,
      origin: {
        x: 0.2 + Math.random() * 0.6,
        y: 0.3 + Math.random() * 0.4,
      },
      colors: RAINBOW_COLORS,
      scalar: 0.8 + Math.random() * 0.5,
      shapes: ["circle", "square"],
      gravity: 0.7 + Math.random() * 0.5,
    });
  }, 250);
}
