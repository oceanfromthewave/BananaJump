import React from "react";
import styles from "../styles/Loader.module.scss";

export default function Loader() {
  return (
    <div className={styles.loaderBg}>
      <div className={styles.loaderCircle}></div>
      <div className={styles.loaderTitle}>LOADING</div>
    </div>
  );
}
