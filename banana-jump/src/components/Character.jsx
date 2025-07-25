import React from "react";
import { motion, useAnimation } from "framer-motion";

function randomStars(count) {
  return Array.from({ length: count }).map((_, i) => ({
    left: Math.random() * 90 + 5 + "%",
    top: Math.random() * 60 + 10 + "%",
    size: Math.random() * 16 + 10,
    delay: Math.random() * 0.5,
    key: i,
  }));
}

export default function Character({ src, glow, onClick, showConfetti, emoji }) {
  const controls = useAnimation();
  const stars = randomStars(showConfetti ? 20 : 0);

  const handleClick = () => {
    controls.start({ scale: [1, 1.19, 0.97, 1.08, 1], rotate: [0, -9, 8, -3, 0] });
    if (onClick) onClick();
  };

  return (
    <motion.div
      className="character-3d"
      style={{ boxShadow: `0 0 64px 0 ${glow}99` }}
      animate={controls}
      whileHover={{ scale: 1.09, rotate: -8 }}
      whileTap={{ scale: 1.13, rotate: 8 }}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={emoji}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
    >
      <img src={src} alt="Character" draggable={false} />
      <div
        className="character-glow"
        style={{
          background: `radial-gradient(circle, ${glow}88 0%, transparent 78%)`
        }}
      />
      {showConfetti &&
        stars.map((star) => (
          <motion.div
            key={star.key}
            className="star"
            initial={{ opacity: 0, scale: 0.7, x: 0, y: 0 }}
            animate={{
              opacity: [0.3, 1, 0],
              scale: [0.7, 1.4, 0.3],
              x: [0, (Math.random() - 0.5) * 180],
              y: [0, (Math.random() - 0.5) * 160],
            }}
            transition={{
              duration: 1.15,
              delay: star.delay,
              type: "spring",
            }}
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              background: `radial-gradient(circle, #fffbe8 0%, ${glow}90 80%, transparent 100%)`,
              borderRadius: "50%",
              position: "absolute",
              pointerEvents: "none",
              zIndex: 99,
              filter: "blur(0.5px)",
            }}
          />
        ))}
    </motion.div>
  );
}
