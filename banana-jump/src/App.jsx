import React, { useEffect, useState, useRef } from "react";
import ParticleBG from "./components/ParticleBG";
import Character from "./components/Character";
import Cursor from "./components/Cursor";
import Achievements from "./components/Achievements";
import Loader from "./components/Loader";
import ThemeSelector from "./components/ThemeSelector";
import InfoShare from "./components/InfoShare";
import ConfettiExplosion from "./components/ConfettiExplosion";
import styles from "./styles/App.module.scss";
import images from './utils/CharacterImages';

const CHARACTER_LIST = [
  { name: "Banana", emoji: "🍌", src: images.banana, glow: "#ffe04a", colors: ["#ffe04a30", "#fffbd910", "#ffec8f13"] },
];

const NEON_COLORS = ["#ffe04a", "#fd40ff", "#00ffd0", "#ff5252", "#00e0ff", "#fae56e", "#b287f9"];
const CHAOS_FONTS = [
  "'Press Start 2P', cursive",
  "'Montserrat', sans-serif",
  "'Comic Sans MS', cursive",
  "'Quicksand', sans-serif",
];
const CHAOS_EMOJIS = ["🍌","🍕","🪐","👽","😱","🍔","🐵","🥚","🌟","🚀","👻","🎉"];

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [themeIdx, setThemeIdx] = useState(0);
  const [shouldJump, setShouldJump] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [confettiAchievements, setConfettiAchievements] = useState({});
  const [shake, setShake] = useState(false);
  const [bananas, setBananas] = useState([]);
  const [bananaText, setBananaText] = useState(false);
  const [randomMsg, setRandomMsg] = useState("");
  const [chaosMode, setChaosMode] = useState(false);
  const [chaosColor, setChaosColor] = useState("#ffe04a");
  const [chaosFont, setChaosFont] = useState("'Press Start 2P', sans-serif");
  const [chaosEmoji, setChaosEmoji] = useState("🍌");
  const [showBlackhole, setShowBlackhole] = useState(false);
  const [showDoNotClick, setShowDoNotClick] = useState(false);
  const chaosTimerRef = useRef();
  const lastClicks = useRef([]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // 점프 (2초마다)
  useEffect(() => {
    const jumpInterval = setInterval(() => {
      setShouldJump(true);
      setTimeout(() => setShouldJump(false), 600);
    }, 2000);
    return () => clearInterval(jumpInterval);
  }, []);

  // 업적 confetti
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
    if (didShow) setTimeout(() => setShowConfetti(false), 1700);
  }, [clicks, seconds, confettiAchievements]);

  // CHAOS MODE (컬러/폰트/이모지/쉐이크)
  useEffect(() => {
    if ((clicks > 0 && clicks % 100 === 0) || (seconds > 0 && seconds % 120 === 0)) {
      setChaosMode(true);
      chaosTimerRef.current = setInterval(() => {
        setChaosColor(NEON_COLORS[Math.floor(Math.random()*NEON_COLORS.length)]);
        setChaosFont(CHAOS_FONTS[Math.floor(Math.random()*CHAOS_FONTS.length)]);
        setChaosEmoji(CHAOS_EMOJIS[Math.floor(Math.random()*CHAOS_EMOJIS.length)]);
        setShake(true);
        setTimeout(() => setShake(false), 180);
      }, 180);
      setTimeout(() => {
        setChaosMode(false);
        clearInterval(chaosTimerRef.current);
        setChaosColor("#ffe04a");
        setChaosFont("'Press Start 2P', sans-serif");
        setChaosEmoji("🍌");
      }, 2900);
    }
    return () => clearInterval(chaosTimerRef.current);
  }, [clicks, seconds]);

  // 우주 바나나/블랙홀
  useEffect(() => {
    if ((seconds > 0 && seconds % 90 === 0) || (clicks > 0 && clicks % 77 === 0)) {
      setShowBlackhole(true);
      setTimeout(() => setShowBlackhole(false), 1400);
    }
  }, [seconds, clicks]);

  // DO NOT CLICK! 버튼
  useEffect(() => {
    if ((seconds > 120 && !showDoNotClick) || (clicks > 0 && clicks % 120 === 0)) {
      setShowDoNotClick(true);
    }
  }, [seconds, clicks, showDoNotClick]);

  function megaBananaRain() {
    const arr = Array.from({ length: 50 + Math.floor(Math.random()*20) }).map((_, i) => ({
      left: `${Math.random() * 98}%`,
      delay: Math.random() * 0.7,
      key: `${Date.now()}_${i}`
    }));
    setBananas(arr);
    setTimeout(() => setBananas([]), 1800);
  }

  useEffect(() => {
    if (clicks > 0) {
      const now = Date.now();
      lastClicks.current = [...lastClicks.current, now].filter(t => now - t < 950);
      if (lastClicks.current.length >= 5) {
        setBananaText(true);
        setTimeout(() => setBananaText(false), 900);
        lastClicks.current = [];
        megaBananaRain();
      } else if (Math.random() < 0.05) {
        megaBananaRain();
      }
    }
  }, [clicks]);

  // 랜덤 멘트 (60초마다)
  useEffect(() => {
    if (seconds > 0 && seconds % 60 === 0) {
      const msgs = [
        "Did you really just spend a minute here?",
        "Banana never gives up.",
        "Are you ok?",
        "Jump is life.",
        "바나나는 당신을 보고 있다.",
        "🍌 바나나 바나나 바나나 🍌",
        "Nice hands!",
      ];
      setRandomMsg(msgs[Math.floor(Math.random() * msgs.length)]);
      setTimeout(() => setRandomMsg(""), 3100);
    }
  }, [seconds]);

  function handleDoNotClick() {
    setShowDoNotClick(false);
    setChaosMode(true);
    setBananaText(true);
    megaBananaRain();
    setShake(true);
    setTimeout(() => setChaosMode(false), 3600);
    setTimeout(() => setBananaText(false), 1400);
    setTimeout(() => setShake(false), 700);
  }

  const currentChar = CHARACTER_LIST[themeIdx];
  const chaosBananaText = Array.from({length: Math.floor(Math.random()*3)+2}).map(()=>chaosEmoji).join('');

  return (
    <div
      className={
        styles.superBg
        + (shake ? ` ${styles.screenShake}` : "")
        + (chaosMode ? ` ${styles.chaos}` : "")
      }
      style={{
        "--char-glow": currentChar.glow,
        "--pal-1": currentChar.colors[0],
        "--pal-2": currentChar.colors[1],
        "--pal-3": currentChar.colors[2],
        backgroundColor: chaosMode ? chaosColor : undefined,
        fontFamily: chaosMode ? chaosFont : undefined,
        color: chaosMode ? chaosColor : undefined,
        transition: "all 0.17s cubic-bezier(.75,1.9,.41,1)"
      }}
    >
      {bananaText && (
        <span className={styles.bananaText} style={chaosMode ? {
          color: chaosColor, fontFamily: chaosFont
        } : {}}>
          {chaosMode ? chaosBananaText : "BANANA!"}
        </span>
      )}
      {bananas.map(b => (
        <span
          key={b.key}
          className={styles.rainBanana}
          style={{
            left: b.left,
            animationDelay: `${b.delay}s`
          }}
          role="img"
          aria-label="banana"
        >🍌</span>
      ))}
      {randomMsg && (
        <span className={styles.randomMsg} style={chaosMode ? {
          color: chaosColor, fontFamily: chaosFont, border: `2.5px dashed ${chaosColor}`
        } : {}}>
          {chaosMode ? chaosEmoji : null} {randomMsg}
        </span>
      )}

      {/* 블랙홀(우주) 이펙트 */}
      {showBlackhole && (
        <div className={styles.blackholeWrap}>
          {Array.from({ length: 18 }).map((_, i) =>
            <span
              key={i}
              className={styles.spaceBanana}
              style={{
                left: `${30 + 36 * Math.cos(i / 18 * 2 * Math.PI)}vw`,
                top: `${50 + 29 * Math.sin(i / 18 * 2 * Math.PI)}vh`,
                fontSize: `${2 + Math.random()*2.5}rem`
              }}
            >🍌</span>
          )}
          <div className={styles.blackhole}></div>
        </div>
      )}

      {showDoNotClick && (
        <button className={styles.doNotClickBtn} onClick={handleDoNotClick}
          style={chaosMode ? {color: chaosColor, fontFamily: chaosFont, animation: "shake-btn 0.15s infinite"} : {}}>
          DO NOT CLICK!
        </button>
      )}

      {showConfetti && <ConfettiExplosion />}
      <Cursor theme={currentChar} />
      <ParticleBG theme={currentChar} />
      <div className={styles.animatedBlobBg} />
      {loading && <Loader />}

      <div className={styles.topBar}>
        <div className={styles.themeSelectorWrap}>
          <ThemeSelector
            characterList={CHARACTER_LIST}
            themeIdx={themeIdx}
            setThemeIdx={setThemeIdx}
          />
          <button
            className={styles.infoBtn}
            onClick={() => setShowInfo(true)}
            aria-label="Info / Share"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" fill="#fffbe9" stroke="#ffe04a" strokeWidth="2" />
              <circle cx="16" cy="11" r="1.7" fill="#ffe04a" stroke="#232e46" strokeWidth="1.2" />
              <rect x="14.4" y="15" width="3.2" height="8" rx="1.5" fill="#ffe04a" stroke="#232e46" strokeWidth="1.2" />
              <rect x="14.9" y="19.5" width="2.2" height="1.7" rx="0.7" fill="#fffbe9" />
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.contentCenter} style={{ opacity: loading ? 0 : 1 }}>
        <Character
          key={currentChar.name}
          src={currentChar.src}
          glow={currentChar.glow}
          emoji={chaosMode ? chaosEmoji : currentChar.emoji}
          onClick={() => setClicks((c) => c + 1)}
          showConfetti={false}
          shouldJump={shouldJump}
        />
        <div className={styles.glassCounter} style={chaosMode ? {color: chaosColor, fontFamily: chaosFont} : {}}>
          <span className={styles.emoji} role="img" aria-label={currentChar.name.toLowerCase()}>
            {chaosMode ? chaosEmoji : currentChar.emoji}
          </span>
          <span>
            <b>{currentChar.name.toUpperCase()}</b>  <span className={styles.sec}>{seconds}</span> seconds!
          </span>
          <span className={styles.counterClick}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v10m0 0l3-3m-3 3l-3-3" stroke="#232e46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="19" r="3" fill="#ffe04a" stroke="#e5a500" strokeWidth="2" />
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
