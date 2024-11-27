'use client'
import React, { useState } from 'react';
import { Send, ImagePlus, Download, User } from 'lucide-react';

const MemeChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { type: 'text', content: 'Hello! I can help you create memes. Just describe what you want!', sender: 'bot' },
  ]);

  const handleSend = (e:any) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'text', content: message, sender: 'user' }]);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'meme',
        content: '/api/placeholder/300/300',
        sender: 'bot'
      }]);
    }, 1000);

    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">MemeGen</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-sm rounded-lg p-4 ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white shadow-md'
              }`}
            >
              {msg.type === 'text' ? (
                <p>{msg.content}</p>
              ) : (
                <div className="space-y-2">
                  <img
                    src={msg.content}
                    alt="Generated Meme"
                    className="rounded-lg w-full"
                  />
                  <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800">
                    <Download className="w-4 h-4" />
                    <span>Save Meme</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <form onSubmit={handleSend} className="flex items-center space-x-4">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <ImagePlus className="w-6 h-6" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your meme idea..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemeChatPage;