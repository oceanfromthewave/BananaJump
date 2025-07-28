import React, { useState, useEffect } from "react";
import styles from "../styles/Cursor.module.scss";

export default function Cursor({ theme }) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      // 랜덤하게 별 생성
      if (Math.random() < 0.05) {
        const newStar = {
          x: e.clientX + (Math.random() - 0.5) * 30,
          y: e.clientY + (Math.random() - 0.5) * 30,
          id: Date.now() + Math.random(),
        };
        setStars(prev => [...prev, newStar]);
        
        // 1초 후 별 제거
        setTimeout(() => {
          setStars(prev => prev.filter(star => star.id !== newStar.id));
        }, 1000);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        className={styles.cursorDot}
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          background: theme?.glow || "#ffe04a",
          boxShadow: `0 0 12px ${theme?.glow || "#ffe04a"}70`,
        }}
      />
      <div
        className={styles.cursorHalo}
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          background: `${theme?.glow || "#ffe04a"}88`,
        }}
      />
      {stars.map((star) => (
        <div
          key={star.id}
          className={styles.cursorStar}
          style={{
            left: star.x,
            top: star.y,
            background: theme?.glow || "#ffe04a",
          }}
        />
      ))}
    </>
  );
}
