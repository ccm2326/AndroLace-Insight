import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import PapersPage from './pages/PapersPage';
import PaperDetailPage from './pages/PaperDetailPage';
import ChatPage from './pages/ChatPage';
import VisualizationsPage from './pages/VisualizationsPage';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="app-content">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/papers" element={<PapersPage />} />
            <Route path="/papers/:id" element={<PaperDetailPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/visualizations" element={<VisualizationsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
