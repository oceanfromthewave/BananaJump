import React, { useEffect, useRef } from "react";

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

    let particles = Array.from({ length: 24 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 32 + 16,
      dx: Math.random() * 0.6 - 0.3,
      dy: Math.random() * 0.25 + 0.06,
      o: Math.random() * 0.1 + 0.07,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI, false);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.o;
        ctx.shadowBlur = 22;
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
      style={{
        position: "fixed",
        zIndex: 1,
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none"
      }}
    />
  );
}
