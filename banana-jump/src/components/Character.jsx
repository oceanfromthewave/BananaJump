import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "../styles/Character.module.scss";

const CONFETTI_EMOJIS = [
  "✨", "⭐", "🌟", "💛", "💖", "🎉", "🍌", "🥚", "💫", "🟡", "🟠", "🧨", "🎆", "🎇"
];

function randomStars(count, pattern = "circle") {
  return Array.from({ length: count }).map((_, i) => {
    let angle, distance;
    if (pattern === "arc") {
      angle = Math.PI * (0.7 + 0.6 * Math.random());
      distance = Math.random() * 80 + 60;
    } else if (pattern === "spray") {
      angle = Math.random() * 2 * Math.PI;
      distance = Math.random() * 130;
    } else {
      angle = (i / count) * 2 * Math.PI;
      distance = 90 + Math.random() * 30;
    }
    return {
      left: "50%", top: "50%",
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: Math.random() * 19 + 13,
      emoji: CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)],
      delay: Math.random() * 0.28,
      rotate: Math.random() * 350 - 170,
      scale: Math.random() * 0.65 + 0.6,
      key: i + "_" + Math.random(),
    };
  });
}

export default function Character({ src, onClick, showConfetti, emoji, shouldJump }) {
  const controls = useAnimation();
  const [clickParticles, setClickParticles] = useState([]);
  const [stars, setStars] = useState([]);
  const [isJumping, setIsJumping] = useState(false);
  const [wave, setWave] = useState(false);

  // 이스터에그
  const [egg, setEgg] = useState(false);
  const clickCount = useRef(0);

  // 업적/이스터에그 Confetti
  useEffect(() => {
    if (showConfetti) {
      setStars(randomStars(32));
      setTimeout(() => setStars([]), 1800);
    }
  }, [showConfetti]);

  // 클릭 핸들러
  const handleClick = () => {
    clickCount.current += 1;
    // 10번 클릭마다 이스터에그
    if (clickCount.current % 10 === 0) {
      setEgg(true);
      setTimeout(() => setEgg(false), 1200);
    }

    controls.start({
      x: [0, -17, 21, -9, 0],
      rotate: [0, 11, -9, 7, 0],
      transition: { duration: 0.14, ease: [0.85, 0, 0.8, 1], type: "tween" }
    });
    setClickParticles(randomStars(13, "spray"));
    setTimeout(() => setClickParticles([]), 510);
    setWave(true);
    setTimeout(() => setWave(false), 410);

    if (onClick) onClick();
  };

  // 자동 점프
  useEffect(() => {
    if (shouldJump) {
      setIsJumping(true);
      controls.start({
        y: [0, -96, 0, 18, -8, 0],
        scaleY: [1, 0.87, 1.15, 0.99, 1.07, 1],
        scaleX: [1, 1.12, 0.96, 1.14, 0.99, 1],
        x: 0, rotate: 0,
        transition: { duration: 1.07, ease: [0.42, 1.8, 0.3, 1], type: "tween" }
      }).then(() => setIsJumping(false));
      setWave(true);
      setTimeout(() => setWave(false), 650);
    }
  }, [shouldJump, controls]);

  return (
    <motion.div
      className={styles.character3d}
      animate={controls}
      whileHover={{ scale: 1.13 }}
      whileTap={{ scale: 1.17 }}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={emoji}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      {/* 이스터에그 말풍선 */}
      {egg && (
        <div className={styles.eggSpeech}
          style={{
            position: "absolute", top: "-35px", left: "50%", transform: "translateX(-50%)",
            background: "#fff9", color: "#222", borderRadius: "1.3em",
            fontFamily: "'Press Start 2P', 'Montserrat'", fontSize: "0.9em",
            padding: "0.28em 1.2em", zIndex: 99, boxShadow: "0 2px 9px #ffe04a33"
          }}>
          {"Why am I a banana...?"}
        </div>
      )}

      {/* 바닥 그림자 + 파동 */}
      <div
        className={styles.shadow}
        style={{
          width: "110px",
          height: isJumping ? "13px" : "29px",
          background: "radial-gradient(circle, #2227 70%, transparent 100%)",
          opacity: isJumping ? 0.11 : 0.22,
          left: "50%",
          bottom: "20px",
          transform: "translateX(-50%)",
          position: "absolute",
          zIndex: 2,
          transition: "all 0.17s cubic-bezier(.7,1.6,.3,1)",
        }}
      />
      {/* 파동(Glow Wave) */}
      {wave && (
        <motion.div
          className={styles.wave}
          initial={{ opacity: 0.33, scale: 0.77 }}
          animate={{
            opacity: [0.33, 0.25, 0],
            scale: [0.77, 2.4, 2.15]
          }}
          transition={{ duration: 0.61, ease: "easeOut", type: "tween" }}
          style={{
            position: "absolute",
            left: "50%", top: "52%",
            width: "166px", height: "166px",
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle, #b287f933 20%, transparent 80%)",
            borderRadius: "50%",
            zIndex: 5,
            pointerEvents: "none"
          }}
        />
      )}
      {/* 바나나 */}
      <img
        src={src}
        alt="Character"
        draggable={false}
        className={styles.characterImg}
        style={{
          transformOrigin: "center center",
        }}
      />
      {/* confetti/파티클 */}
      {stars.map((star) => (
        <motion.div key={star.key} className={styles.star}
          initial={{ opacity: 0, scale: 0.7, x: 0, y: 0, rotate: 0, filter: "blur(1.6px)" }}
          animate={{
            opacity: [0.15, 1, 0],
            scale: [0.7, star.scale, 0.4],
            x: star.x, y: star.y, rotate: star.rotate,
            filter: ["blur(1.7px)", "blur(0.5px)", "blur(2.2px)"]
          }}
          transition={{
            duration: 1.17 + Math.random() * 0.22,
            delay: star.delay,
            type: "tween",
            ease: "easeInOut"
          }}
          style={{
            left: star.left, top: star.top,
            width: star.size, height: star.size,
            fontSize: star.size * 0.93,
            zIndex: 9999,
            color: "#ffe04a", pointerEvents: "none",
            userSelect: "none", display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >{star.emoji}</motion.div>
      ))}
      {/* 클릭 파티클 */}
      {clickParticles.map((particle) => (
        <motion.div
          key={particle.key}
          className={styles.clickParticle}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, particle.scale, 0],
            x: particle.x, y: particle.y, rotate: particle.rotate,
          }}
          transition={{
            duration: 0.62,
            delay: particle.delay,
            ease: "easeOut",
            type: "tween"
          }}
        >{particle.emoji}</motion.div>
      ))}
    </motion.div>
  );
}
