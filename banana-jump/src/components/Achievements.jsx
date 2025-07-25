import React from "react";

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
    <div className="achievements-bar">
      {ACHS.map(({ label, cond }) => (
        <span
          key={label}
          className={"achv" + (cond({ seconds, clicks }) ? " on" : "")}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
