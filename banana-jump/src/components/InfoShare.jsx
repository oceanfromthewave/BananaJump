import React from "react";

export default function InfoShare({ onClose }) {
  return (
    <div className="info-modal-bg" tabIndex={-1}>
      <div className="info-modal glass-modal">
        <button className="modal-close" onClick={onClose} aria-label="close">×</button>
        <h2>🍌 Clicky Fruits</h2>
        <p>nyan.cat 감성을 <b>트렌디 UI/UX</b>로 풀어낸 클릭 인터랙티브 아트!<br />
        바나나, 딸기, 사과, 오렌지 등 캐릭터를 클릭해 업적을 모으세요.<br />
        <span style={{fontSize:"0.95em",color:"#b99"}}>소리는 없습니다!</span></p>
        <div className="share-btns">
          <button onClick={() => {navigator.clipboard.writeText(window.location.href)}}>🔗 Copy Link</button>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">🐙 Github</a>
          <a
            href={
              "https://twitter.com/intent/tweet?text=Clicky%20Fruits!&url=" +
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
