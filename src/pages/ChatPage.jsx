import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Minimize2, Maximize2, Search, BookOpen, Link, BarChart3 } from 'lucide-react';
import { chatService } from '../services/api';
import './ChatPage.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Initial welcome message
    if (messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        text: "Hello! I'm your intelligent assistant specialized in scientific papers. I can help you understand concepts, find related papers, explain methodologies and much more. How can I help you today?",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        suggestions: [
          "Can you explain what machine learning is?",
          "What papers are there about climate change?",
          "How does CRISPR gene editing work?",
          "What are the latest trends in renewable energy?"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, []);

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
      const response = await chatService.sendMessage(inputMessage);
      
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
    <div className="chat-page">
      <motion.div
        className="chat-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-content">
        <div className="header-info">
          <Bot size={32} />
          <div>
            <h1 className="header-title">Intelligent Assistant</h1>
            <p className="header-subtitle">
              Your companion to explore scientific knowledge
            </p>
          </div>
        </div>
        </div>
      </motion.div>

      <motion.div
        className="chat-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="chat-messages">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`message ${message.sender}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="message-avatar">
                  {message.sender === 'bot' ? <Bot size={20} /> : <User size={20} />}
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
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              className="message bot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="message-avatar">
                <Bot size={20} />
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
              placeholder="Type your message here..."
              className="chat-input"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="chat-send-btn"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="chat-features"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="features-title">What can I do for you?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Search size={48} />
            </div>
            <h3>Intelligent Search</h3>
            <p>Find specific papers based on your search criteria</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <BookOpen size={48} />
            </div>
            <h3>Detailed Explanations</h3>
            <p>I help you understand complex concepts in a simple way</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Link size={48} />
            </div>
            <h3>Related Papers</h3>
            <p>Discover similar research and connections between studies</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <BarChart3 size={48} />
            </div>
            <h3>Data Analysis</h3>
            <p>Interpret graphs, tables and statistical results</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatPage;
