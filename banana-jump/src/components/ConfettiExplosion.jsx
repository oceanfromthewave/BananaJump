// components/ConfettiExplosion.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles/ConfettiExplosion.module.scss";

const CONFETTI_EMOJIS = [
  "✨", "⭐", "🌟", "💛", "💖", "🥳", "🎉", "🟡", "🟠", "💫",
  "🧡", "💙", "💚", "❤️", "💜", "🪅", "🎊"
];

function randomConfetti(count, width, height) {
  return Array.from({ length: count }).map((_, i) => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * (Math.min(width, height) / 1.4);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const left = width / 2 + x;
    const top = height / 2 + y;
    return {
      left,
      top,
      size: Math.random() * 36 + 24,
      emoji: CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)],
      delay: Math.random() * 0.2,
      rotate: Math.random() * 360,
      scale: Math.random() * 1 + 0.7,
      key: i + "_" + Math.random(),
    };
  });
}

export default function ConfettiExplosion({ count = 200, duration = 1700 }) {
  const [confetti, setConfetti] = useState([]);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);
    setConfetti(randomConfetti(count, window.innerWidth, window.innerHeight));
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.confettiExplosion}>
      {confetti.map((c) => (
<motion.div
  key={c.key}
  className={styles.confettiParticle}
   initial={{
    opacity: 0,
    scale: 0.7,
    x: dimensions.width / 2,
    y: dimensions.height / 2,
    rotate: 0,
  }}
  animate={{
    opacity: [0, 1, 0], // 3개 keyframe
    scale: [0.7, c.scale], // 2개
    x: [dimensions.width / 2, c.left],
    y: [dimensions.height / 2, c.top],
    rotate: c.rotate,
  }}
  transition={{
    opacity: {
      duration: duration / 1000,
      delay: c.delay,
      type: "tween",
      ease: "easeInOut",
    },
    scale: {
      duration: duration / 1000,
      delay: c.delay,
      type: "spring",
    },
    x: {
      duration: duration / 1000,
      delay: c.delay,
      type: "spring",
    },
    y: {
      duration: duration / 1000,
      delay: c.delay,
      type: "spring",
    },
    rotate: {
      duration: duration / 1000,
      delay: c.delay,
      type: "spring",
    }
  }}
>
  {c.emoji}
</motion.div>
      ))}
    </div>
  );
}
