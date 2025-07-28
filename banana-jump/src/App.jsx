import React, { useEffect, useState } from "react";
import ParticleBG from "./components/ParticleBG";
import Character from "./components/Character";
import Cursor from "./components/Cursor";
import Achievements from "./components/Achievements";
import Loader from "./components/Loader";
import ThemeSelector from "./components/ThemeSelector";
import InfoShare from "./components/InfoShare";
import "./styles/App.css";
import styles from "./styles/App.module.scss";
import images from './utils/CharacterImages'; //

const CHARACTER_LIST = [
  { name: "Banana", emoji: "🍌", src: images.banana, glow: "#ffe04a", colors: ["#ffe04a30", "#fffbd910", "#ffec8f13"] },
];

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [themeIdx, setThemeIdx] = useState(0);
  const [shouldJump, setShouldJump] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // 2초마다 바나나 점프
  useEffect(() => {
    const jumpInterval = setInterval(() => {
      setShouldJump(true);
      setTimeout(() => setShouldJump(false), 600); // 점프 애니메이션 지속시간
    }, 2000);
    return () => clearInterval(jumpInterval);
  }, []);

  // 업적 달성시 confetti
  useEffect(() => {
    if ([10, 30, 60, 100].includes(clicks) || [10, 30, 60, 120].includes(seconds)) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1700);
    }
  }, [clicks, seconds]);

  const currentChar = CHARACTER_LIST[themeIdx];

  return (
    <div
      className={styles.superBg}
      style={{
        "--char-glow": currentChar.glow,
        "--pal-1": currentChar.colors[0],
        "--pal-2": currentChar.colors[1],
        "--pal-3": currentChar.colors[2],
      }}
    >
      <Cursor theme={currentChar} />
      <ParticleBG theme={currentChar} />
      <div className={styles.animatedBlobBg} />
      {loading && <Loader />}
      <div className={styles.topBar}>
        {/* 바나나만 있으므로 테마 선택기 숨김 */}
        <ThemeSelector
          characterList={CHARACTER_LIST}
          themeIdx={themeIdx}
          setThemeIdx={setThemeIdx}
        />
        <button className={styles.infoBtn} onClick={() => setShowInfo(true)} aria-label="Info / Share">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#fff6" /><path d="M16 12v8M16 8v2" stroke="#444" strokeWidth="2.3" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div className={styles.contentCenter} style={{ opacity: loading ? 0 : 1 }}>
        <Character
          key={currentChar.name}
          src={currentChar.src}
          glow={currentChar.glow}
          emoji={currentChar.emoji}
          onClick={() => setClicks((c) => c + 1)}
          showConfetti={showConfetti}
          shouldJump={shouldJump}
        />
        <div className={styles.glassCounter}>
          <span className={styles.emoji} role="img" aria-label={currentChar.name.toLowerCase()}>
            {currentChar.emoji}
          </span>
          <span>
         <b>{currentChar.name.toUpperCase()}</b> Jump <span className={styles.sec}>{seconds}</span> 초!
          </span>
          <span className={styles.counterClick}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M7 13V7C7 4.79086 8.79086 3 11 3V3C13.2091 3 15 4.79086 15 7V13" stroke="#232e46" strokeWidth="2" /><circle cx="12" cy="17" r="3" fill="#ffe04a" stroke="#e5a500" strokeWidth="2" /></svg>
            {clicks}
          </span>
        </div>
        <Achievements seconds={seconds} clicks={clicks} />
      </div>
      {showInfo && <InfoShare onClose={() => setShowInfo(false)} />}
    </div>
  );
}
