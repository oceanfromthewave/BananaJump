import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/InfoShare.module.scss";

export default function InfoShare({ onClose }) {
  const [showToast, setShowToast] = useState(false);
  const modalRef = useRef(null);

  // 바깥 영역 클릭 시 닫기
  useEffect(() => {
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // 포커스 강제 (모달 접근성 향상)
  useEffect(() => {
    modalRef.current?.focus();
  }, []);

const handleCopy = () => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(window.location.href)
      .then(() => setShowToast(true))
      .catch(() => alert("복사 실패!"));
    setTimeout(() => setShowToast(false), 1200);
  } else {
    // fallback: 임시 input/select/copy (오래된 브라우저 지원)
    try {
      const tempInput = document.createElement("input");
      tempInput.value = window.location.href;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1200);
    } catch {
      alert("복사 기능을 지원하지 않는 브라우저입니다.");
    }
  }
};
  return (
    <div className={styles.infoModalBg} tabIndex={-1} style={{ cursor: "auto" }}>
      <div
        className={styles.glassModal}
        ref={modalRef}
        tabIndex={0}
        style={{ cursor: "auto" }}
        aria-modal="true"
        role="dialog"
      >
        <button className={styles.modalClose} onClick={onClose} aria-label="close">
          ×
        </button>
        <h2>🍌 Banana Jump</h2>
        <p>
          바나나가 점프합니다<br />
          바나나 클릭도 가능해요<br />
          <span style={{ fontSize: "0.95em", color: "#b99" }}>
            바나나는 바보입니다.
          </span>
        </p>
        <div className={styles.shareBtns}>
          <button onClick={handleCopy}>🔗 Copy Link</button>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            🐙 Github
          </a>
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
        {showToast && <div className={styles.toastCopy}>복사되었습니다!</div>}
      </div>
    </div>
  );
}
