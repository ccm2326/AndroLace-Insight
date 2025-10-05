import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, BookOpen, TrendingUp, Download } from 'lucide-react';
import { paperService } from '../services/api';
import './PapersPage.css';

const PapersPage = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    year: '',
    journal: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    fetchPapers();
  }, [searchTerm, filters, pagination.page]);

  const fetchPapers = async () => {
    try {
      setLoading(true);
      const params = {
        search: searchTerm,
        year: filters.year,
        journal: filters.journal,
        page: pagination.page,
        limit: pagination.limit
      };
      
      const response = await paperService.getPapers(params);
      setPapers(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error fetching papers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="papers-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page-title">Scientific Papers</h1>
        <p className="page-subtitle">
          Explore our collection of scientific research papers
        </p>
      </motion.div>

      <motion.div
        className="search-filters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search papers by title, abstract, author..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <label className="filter-label">Year</label>
            <select
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              className="filter-select"
            >
              <option value="">All years</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Journal</label>
            <select
              value={filters.journal}
              onChange={(e) => handleFilterChange('journal', e.target.value)}
              className="filter-select"
            >
              <option value="">All journals</option>
              <option value="Nature">Nature</option>
              <option value="Science">Science</option>
              <option value="Cell">Cell</option>
              <option value="Physical Review">Physical Review</option>
            </select>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner" />
          <p>Loading papers...</p>
        </div>
      ) : (
        <>
          <div className="results-info">
            <p>
              Showing {papers.length} of {pagination.total} papers
            </p>
          </div>

          <div className="papers-grid">
            {papers.map((paper, index) => (
              <motion.div
                key={paper.id_paper}
                className="paper-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Metadata pills at the top */}
                <div className="paper-metadata">
                  <div className="metadata-pill">
                    <Calendar size={14} />
                    <span>{paper.year}</span>
                  </div>
                  <div className="metadata-pill">
                    <BookOpen size={14} />
                    <span>{paper.journal}</span>
                  </div>
                  <div className="metadata-pill">
                    <TrendingUp size={14} />
                    <span>{paper.citations_count} citations</span>
                  </div>
                </div>

                {/* Paper title with quotes */}
                <h3 className="paper-title">
                  <Link to={`/papers/${paper.id_paper}`}>
                    "{paper.title}"
                  </Link>
                </h3>

                {/* Author information */}
                <p className="paper-author">
                  Lead Author, Dr. {paper.authors?.[0]?.first_name} {paper.authors?.[0]?.last_name} ({paper.year})
                </p>

                {/* Abstract */}
                <div className="paper-abstract">
                  <p>
                    {truncateText(paper.abstract, 300)}
                  </p>
                </div>

                {/* Bottom section */}
                <div className="paper-bottom">
                  <a 
                    href={paper.pdf_url || `https://doi.org/${paper.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-paper-btn"
                  >
                    <Download size={16} />
                    <span>VIEW PAPER</span>
                  </a>
                  <div className="paper-doi">
                    {paper.doi}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <motion.div
              className="pagination"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              
              <div className="pagination-info">
                Page {pagination.page} of {pagination.totalPages}
              </div>
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default PapersPage;