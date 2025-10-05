import axios from 'axios';
import { 
  mockPapers, 
  mockAuthors, 
  mockKeywords, 
  mockThemes, 
  mockPaperAuthors, 
  mockPaperKeywords, 
  mockPaperThemes, 
  mockRecommendations,
  mockVisualizationData 
} from '../data/mockData.js';

// Configuración base de axios para futuras llamadas a la API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Servicios para Papers
export const paperService = {
  // GET /papers - Listar todos los papers
  async getPapers(params = {}) {
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredPapers = [...mockPapers];
      
      // Filtros básicos
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        filteredPapers = filteredPapers.filter(paper => 
          paper.title.toLowerCase().includes(searchTerm) ||
          paper.abstract.toLowerCase().includes(searchTerm)
        );
      }
      
      if (params.year) {
        filteredPapers = filteredPapers.filter(paper => paper.year === parseInt(params.year));
      }
      
      if (params.journal) {
        filteredPapers = filteredPapers.filter(paper => 
          paper.journal.toLowerCase().includes(params.journal.toLowerCase())
        );
      }
      
      // Paginación
      const page = parseInt(params.page) || 1;
      const limit = parseInt(params.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      const paginatedPapers = filteredPapers.slice(startIndex, endIndex);
      
      return {
        data: paginatedPapers,
        pagination: {
          page,
          limit,
          total: filteredPapers.length,
          totalPages: Math.ceil(filteredPapers.length / limit)
        }
      };
    } catch (error) {
      console.error('Error fetching papers:', error);
      throw error;
    }
  },

  // GET /papers/:id - Obtener detalles de un paper
  async getPaperById(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const paper = mockPapers.find(p => p.id_paper === parseInt(id));
      if (!paper) {
        throw new Error('Paper not found');
      }
      
      // Enriquecer con datos relacionados
      const authors = mockPaperAuthors
        .filter(pa => pa.id_paper === paper.id_paper)
        .map(pa => mockAuthors.find(a => a.id_author === pa.id_author))
        .filter(Boolean);
      
      const keywords = mockPaperKeywords
        .filter(pk => pk.id_paper === paper.id_paper)
        .map(pk => mockKeywords.find(k => k.id_keyword === pk.id_keyword))
        .filter(Boolean);
      
      const themes = mockPaperThemes
        .filter(pt => pt.id_paper === paper.id_paper)
        .map(pt => mockThemes.find(t => t.id_theme === pt.id_theme))
        .filter(Boolean);
      
      const recommendations = mockRecommendations.find(r => r.id_paper === paper.id_paper);
      
      return {
        ...paper,
        authors,
        keywords,
        themes,
        recommendations
      };
    } catch (error) {
      console.error('Error fetching paper:', error);
      throw error;
    }
  },

  // POST /papers - Crear nuevo paper (para futuro)
  async createPaper(paperData) {
    try {
      const response = await api.post('/papers', paperData);
      return response.data;
    } catch (error) {
      console.error('Error creating paper:', error);
      throw error;
    }
  }
};

// Servicios para Chat
export const chatService = {
  // POST /chat - Enviar mensaje al chatbot
  async sendMessage(message, paperId = null) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular respuestas del chatbot basadas en el contexto
      let response = "Lo siento, no puedo procesar tu solicitud en este momento.";
      
      if (message.toLowerCase().includes('resumen') || message.toLowerCase().includes('summary')) {
        response = "Puedo ayudarte a resumir el contenido del paper. ¿Te gustaría que me enfoque en alguna sección específica como el abstract, métodos, resultados o conclusiones?";
      } else if (message.toLowerCase().includes('método') || message.toLowerCase().includes('method')) {
        response = "Los métodos utilizados en este estudio incluyen análisis estadístico avanzado, modelado computacional y técnicas de validación experimental. ¿Te gustaría más detalles sobre algún método específico?";
      } else if (message.toLowerCase().includes('resultado') || message.toLowerCase().includes('result')) {
        response = "Los resultados principales muestran hallazgos significativos que contribuyen al campo de investigación. ¿Te interesa conocer más sobre las implicaciones de estos resultados?";
      } else if (message.toLowerCase().includes('conclusión') || message.toLowerCase().includes('conclusion')) {
        response = "Las conclusiones del estudio sugieren importantes implicaciones para futuras investigaciones y aplicaciones prácticas. ¿Te gustaría explorar las recomendaciones para investigación futura?";
      } else if (message.toLowerCase().includes('relacionado') || message.toLowerCase().includes('related')) {
        response = "Puedo recomendarte papers relacionados basados en temas similares, autores compartidos o metodologías comparables. ¿Qué tipo de relación te interesa más?";
      } else if (message.toLowerCase().includes('gráfico') || message.toLowerCase().includes('chart')) {
        response = "Los gráficos y visualizaciones en este paper muestran datos importantes. ¿Te gustaría que analice algún gráfico específico o que explique cómo interpretar los datos?";
      } else {
        response = "Entiendo tu pregunta. Basándome en el contenido del paper, puedo ayudarte a entender mejor los conceptos, metodologías o resultados. ¿Podrías ser más específico sobre qué aspecto te interesa?";
      }
      
      return {
        message: response,
        timestamp: new Date().toISOString(),
        paperId: paperId,
        suggestions: [
          "¿Puedes explicar los métodos utilizados?",
          "¿Cuáles son los resultados principales?",
          "¿Qué papers relacionados recomiendas?",
          "¿Cómo interpretar los gráficos?"
        ]
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
};

// Servicios para Visualizaciones
export const visualizationService = {
  // GET /graphs - Obtener datos para gráficos
  async getGraphData(type = 'all') {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      switch (type) {
        case 'papers-by-year':
          return mockVisualizationData.papersByYear;
        case 'papers-by-theme':
          return mockVisualizationData.papersByTheme;
        case 'citations-trend':
          return mockVisualizationData.citationsTrend;
        case 'all':
        default:
          return mockVisualizationData;
      }
    } catch (error) {
      console.error('Error fetching graph data:', error);
      throw error;
    }
  },

  // GET /stats - Obtener estadísticas generales
  async getStats() {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return {
        totalPapers: mockPapers.length,
        totalAuthors: mockAuthors.length,
        totalKeywords: mockKeywords.length,
        totalThemes: mockThemes.length,
        averageCitations: Math.round(mockPapers.reduce((sum, p) => sum + p.citations_count, 0) / mockPapers.length),
        papersThisYear: mockPapers.filter(p => p.year === 2023).length
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }
};

// Servicios para Temas
export const themeService = {
  // GET /themes - Listar todos los temas
  async getThemes() {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockThemes;
    } catch (error) {
      console.error('Error fetching themes:', error);
      throw error;
    }
  },

  // GET /themes/:id/papers - Obtener papers por tema
  async getPapersByTheme(themeId) {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const paperIds = mockPaperThemes
        .filter(pt => pt.id_theme === parseInt(themeId))
        .map(pt => pt.id_paper);
      
      const papers = mockPapers.filter(p => paperIds.includes(p.id_paper));
      
      return papers;
    } catch (error) {
      console.error('Error fetching papers by theme:', error);
      throw error;
    }
  }
};

export default api;
