import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import './Header.css';

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-container">
        <div className="header-left">
          <button 
            className="sidebar-toggle"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="logo">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">AndroLace Insight</span>
          </Link>
        </div>

        <div className="header-right">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search papers, authors, topics..."
              className="search-input"
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
