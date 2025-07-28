import React from "react";
import styles from "../styles/InfoShare.module.scss";

export default function InfoShare({ onClose }) {
  return (
    <div className={styles.infoModalBg} tabIndex={-1}>
      <div className={styles.glassModal}>
        <button className={styles.modalClose} onClick={onClose} aria-label="close">×</button>
        <h2>🍌 Banana Jump</h2>
        <p>nyan.cat 감성을 <b>트렌디 UI/UX</b>로 풀어낸 바나나 점프 게임!<br />
        귀여운 바나나를 클릭하고 2초마다 자동 점프를 감상하세요.<br />
        <span style={{fontSize:"0.95em",color:"#b99"}}>힐링되는 바나나의 매력에 빠져보세요!</span></p>
        <div className={styles.shareBtns}>
          <button onClick={() => {navigator.clipboard.writeText(window.location.href)}}>🔗 Copy Link</button>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">🐙 Github</a>
          <a
            href={
              "https://twitter.com/intent/tweet?text=Banana%20Jump!&url=" +
              encodeURIComponent(window.location.href)
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            🐦 Twitter
          </a>
        </div>
      </div>
    </div>
  );
}
