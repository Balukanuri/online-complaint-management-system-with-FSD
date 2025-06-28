// src/components/ChatWindow.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const ChatWindow = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
    return () => socket.off('chat message');
  }, []);

  const sendMessage = () => {
    if (text.trim()) {
      const msg = { sender: user.name || 'Unknown', text };
      socket.emit('chat message', msg);
      setText('');
    }
  };

  return (
    <div>
      <h4>Live Chat</h4>
      <div>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.sender}:</strong> {msg.text}</p>
        ))}
      </div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
