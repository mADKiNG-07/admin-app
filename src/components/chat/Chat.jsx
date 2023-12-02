// ChatBox.js
import React, { useState, useEffect } from "react";
// import app from "./../../config/firebase";
// Adjust the path based on your file structure
import { getDatabase, ref, onValue, push } from "firebase/database";

import "./chat.scss";

function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const db = getDatabase();

  useEffect(() => {
    const messagesRef = ref(db, "notifications");

    // Listen for changes in the 'notifications' node
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      }
    });

    // Cleanup listener on component unmount
    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  });

  // Cleanup listener on component unmount

  const toggleChatBox = () => {
    console.log("Toggle chat box");
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const messagesRef = ref(db, "notifications");

      // Push new message to the 'notifications' node
      push(messagesRef, newMessage);

      setNewMessage("");
    }
  };

  return (
    <>
      <button className="chat-icon" onClick={toggleChatBox}>
        Chat
      </button>
      <div className={`chat-box ${isOpen ? "open" : ""}`}>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
}

export default Chat;
