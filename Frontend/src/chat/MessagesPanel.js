import React, { useState } from "react";
import { Message } from "./Message";

export function MessagesPanel({ channel, onSendMessage }) {
  const [input, setInput] = useState("");
  const send = () => {
    if (input && input != "") {
      onSendMessage(channel.id, input);
      setInput("");
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  let list = (
    <div className="no-content-message">There is no messages to show</div>
  );
  if (channel && channel.messages) {
    list = channel.messages.map((m) => (
      <Message key={m.id} id={m.id} senderName={m.senderName} text={m.text} />
    ));
  }
  return (
    <div className="messages-panel">
      <div className="meesages-list">{list}</div>
      {channel && (
        <div className="messages-input">
          <input type="text" onChange={handleInput} value={input} />
          <button onClick={send}>Send</button>
        </div>
      )}
    </div>
  );
}
