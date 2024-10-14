import React, { useState } from 'react';
import './Chat.css'; // Import the CSS file for chat styling
import { httpClient } from './api';
import Markdown from 'react-markdown'

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    let allMsgs = [...messages, message]
    const request = await httpClient.post('/chat', {query: message });
    const {response} = request.data
    // debugger;
    
    if (response.length) {
      setMessages([...allMsgs, response]);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat with Us</h2>
      <div className="chat-window">
        <div className="message-list">
          {messages.map((msg, index) => (
            <div key={index} className={ (index % 2 != 0 ) ? "message" : "message  right"}>
              <span className="message-text">  <Markdown>{msg}</Markdown></span>
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
