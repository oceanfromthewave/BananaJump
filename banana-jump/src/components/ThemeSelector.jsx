import React from "react";
import styles from "../styles/ThemeSelector.module.scss";

export default function ThemeSelector({ characterList, themeIdx, setThemeIdx }) {
  return (
    <div className={styles.themeSelector}>
      {characterList.map((char, idx) => (
        <button
          key={char.name}
          className={`${styles.themeBtn}${themeIdx === idx ? " " + styles.active : ""}`}
          style={{
            boxShadow: `0 0 14px 0 ${char.glow}99`,
            background: themeIdx === idx ? "#fff7" : "#fff4"
          }}
          onClick={() => setThemeIdx(idx)}
          aria-label={char.name}
        >
          <img src={char.src} alt={char.name} />
          <span>{char.emoji}</span>
        </button>
      ))}
    </div>
  );
}
