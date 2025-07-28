import React, { useEffect, useRef } from "react";
import styles from "../styles/ParticleBG.module.scss";

export default function ParticleBG({ theme }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth, height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    let colors = theme.colors || ["#ffe04a30", "#fffbd910", "#ffec8f13"];

    let particles = Array.from({ length: 35 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 28 + 12,
      dx: Math.random() * 1.2 - 0.6,
      dy: Math.random() * 0.4 + 0.1,
      o: Math.random() * 0.15 + 0.05,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulse: Math.random() * Math.PI * 2
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        // 맥동 효과 추가
        p.pulse += 0.02;
        let pulseFactor = 1 + Math.sin(p.pulse) * 0.1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulseFactor, 0, 2 * Math.PI, false);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.o * (0.8 + Math.sin(p.pulse) * 0.2);
        ctx.shadowBlur = 25 + Math.sin(p.pulse) * 5;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        
        // Move particle
        p.x += p.dx;
        p.y += p.dy;
        
        // Reset if out of bounds
        if (p.y - p.r > height) {
          p.x = Math.random() * width;
          p.y = -p.r;
          p.pulse = Math.random() * Math.PI * 2; // 리셋 시 맥동도 리셋
        }
        if (p.x < -p.r) p.x = width + p.r;
        if (p.x > width + p.r) p.x = -p.r;
      }
      ctx.shadowBlur = 0;
      requestAnimationFrame(draw);
    }
    draw();

    function onResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [theme]);

  return (
    <canvas
      ref={ref}
      className={styles.particleCanvas}
    />
  );
}
