import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";

function App() {
  const [msg, setMsg] = useState("");
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = io.connect("http://localhost:5000");
    socketRef.current.on("connect", () => {
      console.log(socketRef.id); // x8WIv7-mJelg7on_ALbx
    });
  }, []);
  const handleChange = (e) => {
    setMsg(e.target.value);
    console.log("RUn")
    socketRef.current.emit("hello", "world");
  };
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" onChange={(e) => handleChange(e)} />
      </header>
    </div>
  );
}

export default App;
