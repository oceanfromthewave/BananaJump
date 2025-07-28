import React, { useEffect, useState } from "react";
import ParticleBG from "./components/ParticleBG";
import Character from "./components/Character";
import Cursor from "./components/Cursor";
import Achievements from "./components/Achievements";
import Loader from "./components/Loader";
import ThemeSelector from "./components/ThemeSelector";
import InfoShare from "./components/InfoShare";
import ConfettiExplosion from "./components/ConfettiExplosion";
import "./styles/App.css";
import styles from "./styles/App.module.scss";
import images from './utils/CharacterImages';

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

  const [confettiAchievements, setConfettiAchievements] = useState({});

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const jumpInterval = setInterval(() => {
      setShouldJump(true);
      setTimeout(() => setShouldJump(false), 600);
    }, 2000);
    return () => clearInterval(jumpInterval);
  }, []);

  useEffect(() => {
    const secondsAchievements = [10, 30, 60, 120];
    const clicksAchievements = [10, 30, 60, 100];
    let didShow = false;
    if (secondsAchievements.includes(seconds) && !confettiAchievements[`sec${seconds}`]) {
      setShowConfetti(true);
      setConfettiAchievements(prev => ({ ...prev, [`sec${seconds}`]: true }));
      didShow = true;
    }
    if (clicksAchievements.includes(clicks) && !confettiAchievements[`click${clicks}`]) {
      setShowConfetti(true);
      setConfettiAchievements(prev => ({ ...prev, [`click${clicks}`]: true }));
      didShow = true;
    }
    if (didShow) {
      setTimeout(() => setShowConfetti(false), 1700);
    }
  }, [clicks, seconds, confettiAchievements]);

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
      {showConfetti && <ConfettiExplosion />}
      <Cursor theme={currentChar} />
      <ParticleBG theme={currentChar} />
      <div className={styles.animatedBlobBg} />
      {loading && <Loader />}

      {/* 상단 테마 선택 바 */}
<div className={styles.topBar}>
  <div className={styles.themeSelectorWrap}>
    <ThemeSelector
      characterList={CHARACTER_LIST}
      themeIdx={themeIdx}
      setThemeIdx={setThemeIdx}
    />
  </div>
<button
  className={styles.infoBtn}
  onClick={() => setShowInfo(true)}
  aria-label="Info / Share"
>
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="15" fill="#fffbe9" stroke="#ffe04a" strokeWidth="2"/>
    <circle cx="16" cy="11" r="1.7" fill="#ffe04a" stroke="#232e46" strokeWidth="1.2"/>
    <rect x="14.4" y="15" width="3.2" height="8" rx="1.5" fill="#ffe04a" stroke="#232e46" strokeWidth="1.2"/>
    <rect x="14.9" y="19.5" width="2.2" height="1.7" rx="0.7" fill="#fffbe9" />
  </svg>
</button>
</div>        
      <div className={styles.contentCenter} style={{ opacity: loading ? 0 : 1 }}>
        <Character
          key={currentChar.name}
          src={currentChar.src}
          glow={currentChar.glow}
          emoji={currentChar.emoji}
          onClick={() => setClicks((c) => c + 1)}
          showConfetti={false}
          shouldJump={shouldJump}
        />
        <div className={styles.glassCounter}>
          <span className={styles.emoji} role="img" aria-label={currentChar.name.toLowerCase()}>
            {currentChar.emoji}
          </span>
          <span>
            <b>{currentChar.name.toUpperCase()}</b>  <span className={styles.sec}>{seconds}</span> seconds!
          </span>
          <span className={styles.counterClick}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v10m0 0l3-3m-3 3l-3-3" stroke="#232e46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="19" r="3" fill="#ffe04a" stroke="#e5a500" strokeWidth="2"/>
            </svg>
            {clicks}
          </span>
        </div>
        <Achievements seconds={seconds} clicks={clicks} />
      </div>
      {showInfo && <InfoShare onClose={() => setShowInfo(false)} />}
    </div>
  );
}
