import React, { useState } from 'react';
import './Chat.css'; // Import the CSS file for chat styling

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat with Us</h2>
      <div className="chat-window">
        <div className="message-list">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <span className="message-text">{msg}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="chat-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="chat-input"
          />
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
