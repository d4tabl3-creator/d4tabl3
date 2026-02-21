import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  shape: "rect" | "circle" | "star";
}

const COLORS = [
  "hsl(0, 85%, 60%)",
  "hsl(30, 90%, 55%)",
  "hsl(55, 85%, 55%)",
  "hsl(155, 70%, 45%)",
  "hsl(210, 80%, 55%)",
  "hsl(270, 60%, 55%)",
  "hsl(320, 70%, 55%)",
  "hsl(45, 95%, 60%)",
];

// Fewer particles on mobile for performance (especially iOS)
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
};

const PARTICLE_COUNT = isMobileDevice() ? 12 : 35;

export default function ConfettiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // On iOS, use lower frame rate to prevent crashes
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    let frameCount = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createParticle = (startFromTop = true): Particle => ({
      x: Math.random() * canvas.width,
      y: startFromTop ? -20 - Math.random() * 100 : Math.random() * canvas.height,
      size: 4 + Math.random() * 6,
      speedY: 0.3 + Math.random() * 0.8,
      speedX: (Math.random() - 0.5) * 0.6,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: 0.15 + Math.random() * 0.25,
      shape: (["rect", "circle", "star"] as const)[Math.floor(Math.random() * 3)],
    });

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(false)
    );

    const drawStar = (cx: number, cy: number, size: number) => {
      const spikes = 5;
      const outerRadius = size;
      const innerRadius = size / 2;
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    const animate = () => {
      // Skip frames on iOS for better performance
      frameCount++;
      if (isIOS && frameCount % 2 !== 0) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }


      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.3;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 20) {
          particlesRef.current[i] = createParticle(true);
          return;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          drawStar(0, 0, p.size / 2);
        }

        ctx.restore();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
