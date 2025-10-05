import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, Users, TrendingUp, ExternalLink, MessageCircle, Tag, Award } from 'lucide-react';
import { paperService } from '../services/api';
import ChatWidget from '../components/ChatWidget';
import './PaperDetailPage.css';

const PaperDetailPage = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('abstract');

  useEffect(() => {
    fetchPaper();
  }, [id]);

  const fetchPaper = async () => {
    try {
      setLoading(true);
      const response = await paperService.getPaperById(id);
      setPaper(response);
    } catch (error) {
      console.error('Error fetching paper:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sections = [
    { id: 'abstract', label: 'Abstract', icon: '📄' },
    { id: 'methods', label: 'Methods', icon: '🔬' },
    { id: 'results', label: 'Results', icon: '📊' },
    { id: 'conclusions', label: 'Conclusions', icon: '💡' }
  ];

  if (loading) {
    return (
      <div className="paper-detail-page">
        <div className="loading-container">
          <div className="loading-spinner" />
          <p>Loading paper...</p>
        </div>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="paper-detail-page">
        <div className="error-container">
          <h2>Paper not found</h2>
          <p>The paper you are looking for does not exist or has been deleted.</p>
          <Link to="/papers" className="back-btn">
            Back to Papers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="paper-detail-page">
      <motion.div
        className="paper-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="breadcrumb">
          <Link to="/papers">Papers</Link>
          <span>/</span>
          <span>{paper.title}</span>
        </div>

        <h1 className="paper-title">{paper.title}</h1>

        <div className="paper-meta-grid">
          <div className="meta-item">
            <Calendar size={20} />
            <div>
              <span className="meta-label">Year</span>
              <span className="meta-value">{paper.year}</span>
            </div>
          </div>
          <div className="meta-item">
            <BookOpen size={20} />
            <div>
              <span className="meta-label">Journal</span>
              <span className="meta-value">{paper.journal}</span>
            </div>
          </div>
          <div className="meta-item">
            <TrendingUp size={20} />
            <div>
              <span className="meta-label">Citations</span>
              <span className="meta-value">{paper.citations_count}</span>
            </div>
          </div>
          <div className="meta-item">
            <ExternalLink size={20} />
            <div>
              <span className="meta-label">DOI</span>
              <span className="meta-value">{paper.doi}</span>
            </div>
          </div>
        </div>

        {paper.authors && paper.authors.length > 0 && (
          <div className="authors-section">
            <h3 className="section-title">
              <Users size={20} />
              Authors
            </h3>
            <div className="authors-list">
              {paper.authors.map((author, index) => (
                <div key={index} className="author-card">
                  <div className="author-name">
                    {author.first_name} {author.last_name}
                  </div>
                  <div className="author-affiliation">
                    {author.affiliation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {paper.keywords && paper.keywords.length > 0 && (
          <div className="keywords-section">
            <h3 className="section-title">
              <Tag size={20} />
              Keywords
            </h3>
            <div className="keywords-list">
              {paper.keywords.map((keyword, index) => (
                <span key={index} className="keyword-tag">
                  {keyword.word}
                </span>
              ))}
            </div>
          </div>
        )}

        {paper.themes && paper.themes.length > 0 && (
          <div className="themes-section">
            <h3 className="section-title">
              <Award size={20} />
              Themes
            </h3>
            <div className="themes-list">
              {paper.themes.map((theme, index) => (
                <div key={index} className="theme-card">
                  <div 
                    className="theme-color" 
                    style={{ backgroundColor: theme.color }}
                  />
                  <div className="theme-content">
                    <div className="theme-name">{theme.theme_name}</div>
                    <div className="theme-description">{theme.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      <div className="paper-content">
        <motion.div
          className="content-navigation"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>Content</h3>
          <nav className="content-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-label">{section.label}</span>
              </button>
            ))}
          </nav>
        </motion.div>

        <motion.div
          className="content-main"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="content-section">
            {activeSection === 'abstract' && (
              <div>
                <h2 className="content-title">Abstract</h2>
                <p className="content-text">{paper.abstract}</p>
              </div>
            )}

            {activeSection === 'methods' && (
              <div>
                <h2 className="content-title">Methods</h2>
                <p className="content-text">{paper.methods_section}</p>
              </div>
            )}

            {activeSection === 'results' && (
              <div>
                <h2 className="content-title">Results</h2>
                <p className="content-text">{paper.results_section}</p>
              </div>
            )}

            {activeSection === 'conclusions' && (
              <div>
                <h2 className="content-title">Conclusions</h2>
                <p className="content-text">{paper.conclusions_section}</p>
              </div>
            )}
          </div>

          {paper.recommendations && (
            <motion.div
              className="recommendations-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="section-title">
                <MessageCircle size={20} />
                Related Papers
              </h3>
              <div className="recommendations-list">
                {paper.recommendations.recommended_papers.map((paperId, index) => {
                  const recommendedPaper = paperService.getPapers().then(response => 
                    response.data.find(p => p.id_paper === paperId)
                  );
                  return (
                    <div key={index} className="recommendation-card">
                      <div className="recommendation-score">
                        {Math.round(paper.recommendations.similarity_scores[index] * 100)}% similar
                      </div>
                      <div className="recommendation-content">
                        <Link to={`/papers/${paperId}`} className="recommendation-link">
                          View related paper
                        </Link>
                        <p className="recommendation-reason">
                          {paper.recommendations.reason}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <ChatWidget paperId={paper.id_paper} />
    </div>
  );
};

export default PaperDetailPage;
