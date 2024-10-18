import React, { useState } from "react";
import "./Chat.css"; // Import the CSS file for chat styling
import { Send, Shield } from "lucide-react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-[92vh] bg-gray-900 text-gray-100 font-sans flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-4 bg-gray-700 border-b border-gray-600 flex items-center">
            <Shield className="h-6 w-6 text-teal-400 mr-2" />
            <h2 className="text-xl font-semibold text-white">
              Chat Model
            </h2>
          </div>
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                    message.sender !== "user"
                      ? "bg-teal-600 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <p>{message}</p>
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-gray-700 border-t border-gray-600"
          >
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow px-4 py-2 bg-gray-600 text-white placeholder-gray-400 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </main>
      {/* <h2>Chat with Us</h2>
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
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default Chat;
