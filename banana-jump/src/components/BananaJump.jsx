import React from "react";
import banana from "../assets/bananaJump.gif";
import styles from "../styles/BananaJump.module.scss";

function BananaJump() {
  return (
    <div className={styles.bananaJump3d}>
      <img src={banana} alt="Banana Jump" draggable={false} className={styles.bananaImg} />
      <div className={styles.bananaGlow}></div>
    </div>
  );
}

export default BananaJump;
