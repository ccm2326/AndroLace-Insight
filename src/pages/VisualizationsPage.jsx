import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { visualizationService } from '../services/api';
import './VisualizationsPage.css';

const VisualizationsPage = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState('papers-by-year');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await visualizationService.getGraphData('all');
      setChartData(data);
    } catch (error) {
      console.error('Error fetching visualization data:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#3b82f6', '#1e3a8a', '#6366f1', '#059669', '#dc2626'];

  const chartConfigs = [
    {
      id: 'papers-by-year',
      title: 'Papers by Year',
      description: 'Evolution of the number of papers published per year',
      type: 'bar'
    },
    {
      id: 'papers-by-theme',
      title: 'Distribution by Themes',
      description: 'Distribution of papers by thematic area',
      type: 'pie'
    },
    {
      id: 'citations-trend',
      title: 'Citations Trend',
      description: 'Evolution of the number of citations per month',
      type: 'line'
    }
  ];

  const renderChart = () => {
    if (!chartData) return null;

    switch (activeChart) {
      case 'papers-by-year':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData.papersByYear}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="year" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--white)', 
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: 'var(--shadow-md)'
                }} 
              />
              <Bar 
                dataKey="count" 
                fill="url(#colorGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary-blue)" />
                  <stop offset="100%" stopColor="var(--secondary-blue)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'papers-by-theme':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData.papersByTheme}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="count"
              >
                {chartData.papersByTheme.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--white)', 
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: 'var(--shadow-md)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'citations-trend':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData.citationsTrend}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary-blue)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary-blue)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--white)', 
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: 'var(--shadow-md)'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="citations" 
                stroke="var(--primary-blue)" 
                strokeWidth={3}
                fill="url(#areaGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="visualizations-page">
        <div className="loading-container">
          <div className="loading-spinner" />
          <p>Loading visualizations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="visualizations-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page-title">Visualizations</h1>
        <p className="page-subtitle">
          Explore patterns and trends in scientific data
        </p>
      </motion.div>

      <motion.div
        className="chart-selector"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="chart-tabs">
          {chartConfigs.map((config) => (
            <button
              key={config.id}
              className={`chart-tab ${activeChart === config.id ? 'active' : ''}`}
              onClick={() => setActiveChart(config.id)}
            >
              <div className="tab-content">
                <h3>{config.title}</h3>
                <p>{config.description}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="chart-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="chart-header">
          <h2 className="chart-title">
            {chartConfigs.find(config => config.id === activeChart)?.title}
          </h2>
          <div className="chart-actions">
            <button className="action-btn">
              📊 Export
            </button>
            <button className="action-btn">
              🔗 Share
            </button>
          </div>
        </div>

        <div className="chart-content">
          {renderChart()}
        </div>

        <div className="chart-footer">
          <p className="chart-description">
            {chartConfigs.find(config => config.id === activeChart)?.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VisualizationsPage;
