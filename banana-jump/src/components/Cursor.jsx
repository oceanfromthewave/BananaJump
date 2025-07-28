import React, { useState, useEffect } from "react";
import styles from "../styles/Cursor.module.scss";

export default function Cursor({ theme }) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      if (Math.random() < 0.06) {
        const newStar = {
          x: e.clientX + (Math.random() - 0.5) * 36,
          y: e.clientY + (Math.random() - 0.5) * 36,
          id: Date.now() + Math.random(),
          size: Math.random() * 7 + 6, // 6~13px
        };
        setStars((prev) => [...prev, newStar]);
        setTimeout(() => {
          setStars((prev) => prev.filter((star) => star.id !== newStar.id));
        }, 1100);
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
          background: `radial-gradient(circle at 60% 40%, #ffe7fcff 60%, ${theme?.glow || "#ffe04a"} 100%)`,
          boxShadow: `0 0 18px 4px ${theme?.glow || "#ffe04a"}66, 0 0 4px 2px #fffbe733`,
        }}
      />
      <div
        className={styles.cursorHalo}
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          background: `radial-gradient(circle, ${theme?.glow || "#ffe04a"}88 0%, transparent 80%)`,
        }}
      />
      {stars.map((star) => (
        <div
          key={star.id}
          className={styles.cursorStar}
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            background: `radial-gradient(circle at 40% 60%, #fffbe7 40%, ${theme?.glow || "#ffe04a"} 100%)`,
            boxShadow: `0 0 10px 0 ${theme?.glow || "#ffe04a"}44`,
            filter: `blur(${star.size > 10 ? 2 : 0.7}px)`,
          }}
        />
      ))}
    </>
  );
}
