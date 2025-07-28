import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "../styles/Character.module.scss";

function randomStars(count) {
  return Array.from({ length: count }).map((_, i) => ({
    left: Math.random() * 90 + 5 + "%",
    top: Math.random() * 60 + 10 + "%",
    size: Math.random() * 16 + 10,
    delay: Math.random() * 0.5,
    key: i,
  }));
}

// 클릭 파티클 생성 함수
function generateClickParticles(count) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 250,
      y: (Math.random() - 0.5) * 250,
      scale: Math.random() * 0.8 + 0.4,
      rotation: Math.random() * 720, // 여러 번 회전
      delay: Math.random() * 0.3,
      emoji: ['🍌', '✨', '🎆', '🌈'][Math.floor(Math.random() * 4)]
    });
  }
  return particles;
}

export default function Character({ src, glow, onClick, showConfetti, emoji, shouldJump }) {
  const controls = useAnimation();
  const [clickParticles, setClickParticles] = useState([]);
  const [showBright, setShowBright] = useState(false);
  const stars = randomStars(showConfetti ? 20 : 0);

  const handleClick = () => {
    // 기본 애니메이션
    controls.start({ scale: [1, 1.19, 0.97, 1.08, 1], rotate: [0, -9, 8, -3, 0] });
    
    // 클릭 파티클 생성 (더 많이!)
    const newParticles = generateClickParticles(20);
    setClickParticles(newParticles);
    
    // 브라이트 효과
    setShowBright(true);
    
    // 효과 제거
    setTimeout(() => {
      setClickParticles([]);
      setShowBright(false);
    }, 800);
    
    if (onClick) onClick();
  };

  // 자동 점프 애니메이션
  React.useEffect(() => {
    if (shouldJump) {
      controls.start({
        y: [0, -60, 0],
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        transition: {
          duration: 0.6,
          ease: "easeInOut"
        }
      });
    }
  }, [shouldJump, controls]);

  return (
    <motion.div
      className={styles.character3d}
      style={{ 
        boxShadow: `0 0 64px 0 ${glow}99`,
        filter: showBright ? `brightness(1.13) saturate(1.13)` : 'brightness(1)'
      }}
      animate={controls}
      whileHover={{ scale: 1.09, rotate: -8 }}
      whileTap={{ scale: 1.13, rotate: 8 }}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={emoji}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
    >
      <img src={src} alt="Character" draggable={false} className={styles.characterImg} />
      <div
        className={styles.characterGlow}
        style={{
          background: `radial-gradient(circle, ${glow}88 0%, transparent 78%)`,
          filter: showBright ? 'blur(35px)' : 'blur(27px)'
        }}
      />
      
      {/* 브라이트 오버레이 */}
      {showBright && (
        <motion.div
          className={styles.brightOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 0.6 }}
          style={{
            background: `radial-gradient(circle, ${glow}40 0%, transparent 70%)`
          }}
        />
      )}
      
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
            rotate: 0
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, particle.scale, 0],
            x: particle.x,
            y: particle.y,
            rotate: particle.rotation
          }}
          transition={{
            duration: 0.8,
            delay: particle.delay,
            ease: "easeOut"
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
      {showConfetti &&
        stars.map((star) => (
          <motion.div
            key={star.key}
            className={styles.star}
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
            }}
          />
        ))}
    </motion.div>
  );
}
