import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { chatService } from '../services/api';
import './ChatWidget.css';

const ChatWidget = ({ paperId = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initial welcome message
    if (messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        text: paperId 
          ? "Hello! I'm your intelligent assistant specialized in this paper. How can I help you today?"
          : "Hello! I'm your intelligent assistant for scientific papers. How can I help you today?",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        suggestions: [
          "Can you explain the methods used?",
          "What are the main results?",
          "What related papers do you recommend?",
          "How to interpret the graphs?"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [paperId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(inputMessage, paperId);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response.message,
        sender: 'bot',
        timestamp: response.timestamp,
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, there was an error processing your message. Please try again.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <motion.button
          className="chat-toggle-btn"
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bot size={24} />
        </motion.button>
      )}

      {/* Widget de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chat-widget ${isMinimized ? 'minimized' : ''}`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chat-header">
              <div className="chat-header-info">
                <Bot size={20} />
                <span>Intelligent Assistant</span>
              </div>
              <div className="chat-header-actions">
                <button
                  className="chat-action-btn"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  className="chat-action-btn"
                  onClick={() => setIsOpen(false)}
                >
                  ×
                </button>
              </div>
            </div>

            {!isMinimized && (
              <div className="chat-content">
                <div className="chat-messages">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`message ${message.sender}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="message-avatar">
                        {message.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                      </div>
                      <div className="message-content">
                        <div className="message-text">{message.text}</div>
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="message-suggestions">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                className="suggestion-btn"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      className="message bot"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="message-avatar">
                        <Bot size={16} />
                      </div>
                      <div className="message-content">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                <div className="chat-input-container">
                  <div className="chat-input-wrapper">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="chat-input"
                      rows={1}
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="chat-send-btn"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
