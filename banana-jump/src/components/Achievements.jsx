import React from "react";
import styles from "../styles/Achievements.module.scss";

const ACHS = [
  { label: "⏰ 10 sec", cond: ({ seconds }) => seconds >= 10 },
  { label: "⏰ 30 sec", cond: ({ seconds }) => seconds >= 30 },
  { label: "🍌 10 clicks", cond: ({ clicks }) => clicks >= 10 },
  { label: "🍓 50 clicks", cond: ({ clicks }) => clicks >= 50 },
  { label: "🥇 1 min", cond: ({ seconds }) => seconds >= 60 },
  { label: "👑 100 clicks", cond: ({ clicks }) => clicks >= 100 },
];

export default function Achievements({ seconds, clicks }) {
  return (
    <div className={styles.achievementsBar}>
      {ACHS.map(({ label, cond }) => (
        <span
          key={label}
          className={`${styles.achv}${cond({ seconds, clicks }) ? " " + styles.on : ""}`}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
