import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "../styles/Character.module.scss";

// confetti, click 파티클용 이모지
const CONFETTI_EMOJIS = ["✨", "⭐", "🌟", "💛", "💖", "🥳", "🎉", "🟡", "🟠", "💫"];
function randomStars(count) {
  return Array.from({ length: count }).map((_, i) => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 140 + 60;
    return {
      left: "50%",
      top: "50%",
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: Math.random() * 20 + 18,
      emoji: CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)],
      delay: Math.random() * 0.3,
      rotate: Math.random() * 320 - 160,
      scale: Math.random() * 0.7 + 0.5,
      key: i + "_" + Math.random(),
    };
  });
}
function generateClickParticles(count) {
  const EMOJI = ["🍌", "✨", "💫", "⭐"];
  return Array.from({ length: count }).map((_, i) => ({
    id: Date.now() + i,
    x: (Math.random() - 0.5) * 250,
    y: (Math.random() - 0.5) * 250,
    scale: Math.random() * 0.8 + 0.4,
    rotation: Math.random() * 720,
    delay: Math.random() * 0.3,
    emoji: EMOJI[Math.floor(Math.random() * EMOJI.length)],
  }));
}

export default function Character({ src, onClick, showConfetti, emoji, shouldJump }) {
  const controls = useAnimation();
  const [clickParticles, setClickParticles] = useState([]);
  const [stars, setStars] = useState([]);

  // 업적용 confetti 이펙트
  useEffect(() => {
    if (showConfetti) {
      setStars(randomStars(32));
      setTimeout(() => setStars([]), 1800);
    }
  }, [showConfetti]);

  // 클릭 파티클
  const handleClick = () => {
    controls.start({ scale: [1, 1.19, 0.97, 1.08, 1] }); // rotate는 제거!
    setClickParticles(generateClickParticles(22));
    setTimeout(() => {
      setClickParticles([]);
    }, 800);
    if (onClick) onClick();
  };

  // 자동 점프 (애니메이션)
  useEffect(() => {
    if (shouldJump) {
      controls.start({
        y: [0, -60, 0],
        scale: [1, 1.1, 1],
        transition: {
          duration: 0.6,
          ease: "easeInOut",
        },
      });
    }
  }, [shouldJump, controls]);

  return (
    <motion.div
      className={styles.character3d}
      animate={controls}
      whileHover={{ scale: 1.09 }}
      whileTap={{ scale: 1.13 }}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={emoji}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      <img
        src={src}
        alt="Character"
        draggable={false}
        className={styles.characterImg}
        style={{
          transformOrigin: "center center"
        }}
      />
      {/* confetti(별/이모지) */}
      {stars.map((star) => (
        <motion.div
          key={star.key}
          className={styles.star}
          initial={{
            opacity: 0,
            scale: 0.7,
            x: 0,
            y: 0,
            rotate: 0,
            filter: "blur(1.6px)",
          }}
          animate={{
            opacity: [0.13, 1, 0],
            scale: [0.7, star.scale, 0.4],
            x: star.x,
            y: star.y,
            rotate: star.rotate,
            filter: ["blur(1.6px)", "blur(0.4px)", "blur(2.2px)"],
          }}
          transition={{
            duration: 1.3 + Math.random() * 0.3,
            delay: star.delay,
            type: "spring",
          }}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            fontSize: star.size * 0.95,
            zIndex: 9999,
            color: "#ffe04a",
            pointerEvents: "none",
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {star.emoji}
        </motion.div>
      ))}
      {/* 클릭 파티클 */}
      {clickParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className={styles.clickParticle}
          initial={{
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
            rotate: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, particle.scale, 0],
            x: particle.x,
            y: particle.y,
            rotate: particle.rotation,
          }}
          transition={{
            duration: 0.8,
            delay: particle.delay,
            ease: "easeOut",
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </motion.div>
  );
}
