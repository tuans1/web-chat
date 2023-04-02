import React, { useEffect, useState } from "react";
import { ChannelList } from "./ChannelList";
import "./chat.scss";
import { MessagesPanel } from "./MessagesPanel";
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8080";
export function Chat() {
  const [channels, setChannels] = useState([]);
  const [socket, setSocket] = useState(null);
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    loadChannels();
    configureSocket();
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);
  let channelArr = null;
  const configureSocket = () => {
    var sk = socketClient(SERVER);
    sk.on("connection", () => {
      if (channel) {
        handleChannelSelect(channel.id);
      }
    });
    sk.on("channel", (channel) => {
      let room = channelArr;
      room.forEach((c) => {
        if (c.id === channel.id) {
          c.participants = channel.participants;
        }
      });
      setChannels(room);
    });
    sk.on("message", (message) => {
      let room = channels;
      room.forEach((c) => {
        if (c.id === message.channel_id) {
          if (!c.messages) {
            c.messages = [message];
          } else {
            c.messages.push(message);
          }
        }
      });
      setChannel(room);
    });
    setSocket(sk);
  };

  const loadChannels = async () => {
    fetch("http://localhost:8080/getChannels").then(async (response) => {
      let data = await response.json();
      setChannels(data.channels);
      channelArr = data.channels;
    });
  };

  const handleChannelSelect = (id) => {
    let channel = channels.find((c) => {
      return c.id === id;
    });
    setChannel(channel);
    socket.emit("channel-join", id);
  };

  const handleSendMessage = (channel_id, text) => {
    socket.emit("send-message", {
      channel_id,
      text,
      senderName: socket.id,
      id: Date.now(),
    });
  };

  return (
    <div className="chat-app">
      <ChannelList channels={channels} onSelectChannel={handleChannelSelect} />
      <MessagesPanel onSendMessage={handleSendMessage} channel={channel} />
    </div>
  );
}
