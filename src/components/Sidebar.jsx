import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, FileText, MessageCircle, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home, description: 'Overview and statistics', color: 'var(--primary-blue)' },
    { name: 'Papers', href: '/papers', icon: FileText, description: 'Explore scientific papers', color: 'var(--secondary-blue)' },
    { name: 'Chat', href: '/chat', icon: MessageCircle, description: 'Intelligent assistant', color: 'var(--accent-blue)' },
    { name: 'Visualizations', href: '/visualizations', icon: BarChart3, description: 'Charts and analysis', color: 'var(--navy-blue)' }
  ];

  return (
    <motion.aside 
      className={`sidebar ${isOpen ? 'open' : 'closed'}`}
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -280 }}
      transition={{ duration: 0.3 }}
    >
      <div className="sidebar-content">
        <div className="sidebar-header">
          <button 
            className="sidebar-toggle-btn"
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-title">Navigation</h3>
          <nav className="sidebar-nav">
            {navigation.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`sidebar-link ${location.pathname === item.href ? 'active' : ''}`}
                  >
                    <div 
                      className="sidebar-icon-wrapper"
                      style={{ backgroundColor: location.pathname === item.href ? 'rgba(255, 255, 255, 0.2)' : `${item.color}15` }}
                    >
                      <IconComponent size={20} className="sidebar-icon" />
                    </div>
                    {isOpen && (
                      <div className="sidebar-link-content">
                        <span className="sidebar-link-text">{item.name}</span>
                        <span className="sidebar-link-desc">{item.description}</span>
                      </div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>

        {isOpen && (
          <div className="sidebar-section">
              <h3 className="sidebar-title">Popular Themes</h3>
            <div className="popular-themes">
              {[
                { name: 'Climate Science', color: '#10b981', papers: 23 },
                { name: 'Space Technology', color: '#3b82f6', papers: 18 },
                { name: 'Quantum Physics', color: '#8b5cf6', papers: 15 },
                { name: 'Energy Storage', color: '#f59e0b', papers: 12 },
                { name: 'Biomedical', color: '#ef4444', papers: 21 }
              ].map((theme, index) => (
                <motion.div
                  key={theme.name}
                  className="theme-tag"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div 
                    className="theme-color-dot" 
                    style={{ backgroundColor: theme.color }}
                  />
                  <div className="theme-content">
                    <span className="theme-name">{theme.name}</span>
                    <span className="theme-count">{theme.papers} papers</span>
                  </div>
                </motion.div>
              ))}
            </div>
            </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;