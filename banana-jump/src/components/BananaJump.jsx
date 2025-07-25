import React from "react";
import banana from '../assets/bananaJump.gif';

function BananaJump() {
  return (
    <div className="banana-jump3d">
      <img src={banana} alt="Banana Jump" draggable={false} />
      <div className="banana-glow"></div>
    </div>
  );
}

export default BananaJump;
