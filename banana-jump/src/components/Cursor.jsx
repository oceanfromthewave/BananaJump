import React, { useEffect, useRef, useState } from "react";

export default function Cursor({ theme }) {
  const dot = useRef();
  const halo = useRef();
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const move = (e) => {
      dot.current.style.left = e.clientX + "px";
      dot.current.style.top = e.clientY + "px";
      halo.current.style.left = e.clientX + "px";
      halo.current.style.top = e.clientY + "px";
      setTrail(trail => [...trail.slice(-8), {x: e.clientX, y: e.clientY, id: Math.random()}]);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot"></div>
      <div ref={halo} className="cursor-halo" style={{ background: theme.glow || "#ffe04a" }} />
      {trail.map(t => (
        <div key={t.id} className="cursor-star"
          style={{
            left:t.x, top:t.y,
            background: `radial-gradient(circle, #fffbe8 0%, ${(theme.glow || "#ffe04a")}99 80%, transparent 100%)`
          }} />
      ))}
    </>
  );
}
