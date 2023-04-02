import React from "react";

export function Channel({ id, name, participants, onClick }) {
  const click = () => {
    onClick(id);
  };
  console.log(participants)
  return (
    <div className="channel-item" onClick={click}>
      <div>{name}</div>
      <span>{participants}</span>
    </div>
  );
}
