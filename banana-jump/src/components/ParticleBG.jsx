import React, { useEffect, useRef } from "react";

const STAR_LAYERS = [
  { count: 55, size: [1, 2.3], speed: 0.16, color: "#fff9", blur: 0 },
  { count: 38, size: [1.8, 3.6], speed: 0.27, color: "#ffe04a99", blur: 1.5 },
  { count: 18, size: [3.1, 5.1], speed: 0.37, color: "#ffefb499", blur: 3.6 },
  { count: 7, size: [4.2, 8], speed: 0.62, color: "#fff", blur: 7 }
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}
function makeStars({ count, size, color, blur }) {
  return Array.from({ length: count }).map(() => ({
    x: Math.random(),
    y: Math.random(),
    r: randomBetween(size[0], size[1]),
    color,
    blur
  }));
}

export default function ParticleBG() {
  const ref = useRef(null);
  const stars = useRef(STAR_LAYERS.map(layer => makeStars(layer)));

  useEffect(() => {
    let anim;
    let t = 0;
    const draw = () => {
      const canvas = ref.current;
      if (!canvas) return;
      const w = canvas.width = window.innerWidth;
      const h = canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, w, h);

      t += 1;
      stars.current.forEach((layer, idx) => {
        layer.forEach(star => {
          star.x += STAR_LAYERS[idx].speed / 400;
          if (star.x > 1) star.x = 0; // 오른쪽에서 나가면 왼쪽으로 리셋
          const px = star.x * w;
          const py = star.y * h;
          ctx.save();
          if (star.blur)
            ctx.shadowBlur = star.blur, ctx.shadowColor = star.color;
          ctx.beginPath();
          ctx.arc(px, py, star.r, 0, 2 * Math.PI);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = 0.9 - idx * 0.22;
          ctx.fill();
          ctx.restore();
        });
      });
      anim = requestAnimationFrame(draw);
    };
    anim = requestAnimationFrame(draw);

    // 윈도우 리사이즈 시 캔버스 맞춤
    const onResize = () => {
      if (ref.current) {
        ref.current.width = window.innerWidth;
        ref.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh",
        zIndex: 0, pointerEvents: "none"
      }}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}
