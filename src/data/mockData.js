// Mock data basado en el esquema de base de datos
export const mockPapers = [
  {
    id_paper: 1,
    title: "Climate Change Impact on Arctic Ecosystems: A Comprehensive Analysis",
    abstract: "This study examines the profound effects of climate change on Arctic ecosystems, focusing on biodiversity shifts, ice melting patterns, and ecosystem resilience. Our findings reveal significant changes in species distribution and ecosystem dynamics over the past two decades.",
    year: 2023,
    journal: "Nature Climate Change",
    doi: "10.1038/s41558-023-01567-8",
    pdf_url: "https://example.com/papers/climate-arctic-2023.pdf",
    results_section: "Our analysis of satellite data from 2000-2023 shows a 15% reduction in Arctic ice coverage. Species migration patterns have shifted northward by an average of 200km. Temperature increases of 2.3°C have been recorded in key monitoring stations.",
    conclusions_section: "The Arctic ecosystem is undergoing rapid transformation. Immediate conservation efforts are needed to protect vulnerable species and maintain ecosystem balance. Policy interventions should focus on reducing greenhouse gas emissions and establishing protected areas.",
    methods_section: "We utilized satellite imagery analysis, field surveys across 50 Arctic locations, and climate modeling using IPCC data. Statistical analysis was performed using R software with mixed-effects models.",
    publication_date: "2023-08-15",
    citations_count: 127,
    created_at: "2023-08-15T10:00:00Z",
    updated_at: "2023-08-15T10:00:00Z"
  },
  {
    id_paper: 2,
    title: "Machine Learning Applications in Space Exploration: Autonomous Navigation Systems",
    abstract: "This paper presents novel machine learning algorithms for autonomous spacecraft navigation. We demonstrate how deep reinforcement learning can improve mission success rates and reduce human intervention requirements in deep space missions.",
    year: 2023,
    journal: "Journal of Space Technology",
    doi: "10.1016/j.jst.2023.04.012",
    pdf_url: "https://example.com/papers/ml-space-2023.pdf",
    results_section: "Our autonomous navigation system achieved 94% accuracy in obstacle avoidance during Mars rover simulations. The system reduced mission planning time by 60% compared to traditional methods.",
    conclusions_section: "Machine learning-based navigation systems show great promise for future space missions. Further development is needed to ensure reliability in extreme space conditions.",
    methods_section: "We developed a deep Q-network (DQN) algorithm trained on 10,000 simulated Mars missions. The system was tested using NASA's Mars terrain simulation environment.",
    publication_date: "2023-06-20",
    citations_count: 89,
    created_at: "2023-06-20T14:30:00Z",
    updated_at: "2023-06-20T14:30:00Z"
  },
  {
    id_paper: 3,
    title: "Quantum Computing Breakthrough: Error Correction in Noisy Intermediate-Scale Quantum Devices",
    abstract: "We present a new quantum error correction protocol that significantly improves the reliability of quantum computations in noisy environments. This breakthrough brings us closer to practical quantum computing applications.",
    year: 2023,
    journal: "Physical Review Letters",
    doi: "10.1103/PhysRevLett.130.240501",
    pdf_url: "https://example.com/papers/quantum-error-2023.pdf",
    results_section: "Our error correction protocol reduced quantum error rates by 85% in 50-qubit systems. Logical qubit fidelity improved from 0.7 to 0.95 under realistic noise conditions.",
    conclusions_section: "This error correction method represents a significant step toward fault-tolerant quantum computing. The protocol is scalable and compatible with existing quantum hardware architectures.",
    methods_section: "We implemented a surface code-based error correction scheme with adaptive syndrome measurement. Experiments were conducted on IBM Quantum and Google Quantum AI platforms.",
    publication_date: "2023-09-10",
    citations_count: 156,
    created_at: "2023-09-10T09:15:00Z",
    updated_at: "2023-09-10T09:15:00Z"
  },
  {
    id_paper: 4,
    title: "Renewable Energy Storage: Advanced Battery Technologies for Grid-Scale Applications",
    abstract: "This research explores next-generation battery technologies for large-scale renewable energy storage. We evaluate lithium-sulfur, solid-state, and flow battery systems for their potential in grid applications.",
    year: 2023,
    journal: "Energy & Environmental Science",
    doi: "10.1039/D3EE01542A",
    pdf_url: "https://example.com/papers/battery-storage-2023.pdf",
    results_section: "Solid-state batteries achieved 400 Wh/kg energy density with 10,000 cycle life. Flow batteries showed 95% round-trip efficiency for 8-hour storage applications.",
    conclusions_section: "Multiple battery technologies show promise for grid-scale storage. Cost reduction and manufacturing scale-up remain key challenges for commercial deployment.",
    methods_section: "We conducted electrochemical testing, cycle life analysis, and techno-economic modeling. Battery prototypes were tested under various temperature and load conditions.",
    publication_date: "2023-07-25",
    citations_count: 203,
    created_at: "2023-07-25T16:45:00Z",
    updated_at: "2023-07-25T16:45:00Z"
  },
  {
    id_paper: 5,
    title: "CRISPR Gene Editing: Precision Medicine Applications in Cancer Treatment",
    abstract: "This study demonstrates the potential of CRISPR-Cas9 gene editing for personalized cancer treatment. We show how targeted gene modifications can enhance immunotherapy effectiveness and reduce treatment side effects.",
    year: 2023,
    journal: "Nature Medicine",
    doi: "10.1038/s41591-023-02456-7",
    pdf_url: "https://example.com/papers/crispr-cancer-2023.pdf",
    results_section: "CRISPR-edited T-cells showed 3x higher tumor killing efficiency. Patient survival rates improved by 40% in Phase II clinical trials for advanced melanoma.",
    conclusions_section: "CRISPR-based cancer therapies represent a paradigm shift in precision medicine. Further clinical validation is needed before widespread adoption.",
    methods_section: "We used CRISPR-Cas9 to modify T-cell receptors in vitro. Clinical trials involved 120 patients across 15 medical centers with 18-month follow-up.",
    publication_date: "2023-05-18",
    citations_count: 178,
    created_at: "2023-05-18T11:20:00Z",
    updated_at: "2023-05-18T11:20:00Z"
  }
];

export const mockAuthors = [
  { id_author: 1, first_name: "Sarah", last_name: "Johnson", affiliation: "NASA Goddard Space Flight Center" },
  { id_author: 2, first_name: "Michael", last_name: "Chen", affiliation: "MIT Computer Science" },
  { id_author: 3, first_name: "Elena", last_name: "Rodriguez", affiliation: "Stanford Quantum Institute" },
  { id_author: 4, first_name: "David", last_name: "Kim", affiliation: "Berkeley Energy Lab" },
  { id_author: 5, first_name: "Lisa", last_name: "Wang", affiliation: "Johns Hopkins Medicine" }
];

export const mockKeywords = [
  { id_keyword: 1, word: "climate change" },
  { id_keyword: 2, word: "arctic ecosystems" },
  { id_keyword: 3, word: "machine learning" },
  { id_keyword: 4, word: "space exploration" },
  { id_keyword: 5, word: "quantum computing" },
  { id_keyword: 6, word: "error correction" },
  { id_keyword: 7, word: "renewable energy" },
  { id_keyword: 8, word: "battery technology" },
  { id_keyword: 9, word: "CRISPR" },
  { id_keyword: 10, word: "cancer treatment" }
];

export const mockThemes = [
  { id_theme: 1, theme_name: "Climate Science", description: "Research on climate change and environmental impacts", color: "#3b82f6", paper_count: 1 },
  { id_theme: 2, theme_name: "Space Technology", description: "Advances in space exploration and aerospace engineering", color: "#1e3a8a", paper_count: 1 },
  { id_theme: 3, theme_name: "Quantum Physics", description: "Quantum computing and quantum mechanics research", color: "#6366f1", paper_count: 1 },
  { id_theme: 4, theme_name: "Energy Storage", description: "Battery technologies and energy storage systems", color: "#059669", paper_count: 1 },
  { id_theme: 5, theme_name: "Biomedical Research", description: "Medical research and biotechnology applications", color: "#dc2626", paper_count: 1 }
];

export const mockPaperAuthors = [
  { id_paper: 1, id_author: 1, author_position: 1 },
  { id_paper: 2, id_author: 2, author_position: 1 },
  { id_paper: 3, id_author: 3, author_position: 1 },
  { id_paper: 4, id_author: 4, author_position: 1 },
  { id_paper: 5, id_author: 5, author_position: 1 }
];

export const mockPaperKeywords = [
  { id_paper: 1, id_keyword: 1, relevance_score: 0.95 },
  { id_paper: 1, id_keyword: 2, relevance_score: 0.88 },
  { id_paper: 2, id_keyword: 3, relevance_score: 0.92 },
  { id_paper: 2, id_keyword: 4, relevance_score: 0.85 },
  { id_paper: 3, id_keyword: 5, relevance_score: 0.98 },
  { id_paper: 3, id_keyword: 6, relevance_score: 0.90 },
  { id_paper: 4, id_keyword: 7, relevance_score: 0.87 },
  { id_paper: 4, id_keyword: 8, relevance_score: 0.93 },
  { id_paper: 5, id_keyword: 9, relevance_score: 0.96 },
  { id_paper: 5, id_keyword: 10, relevance_score: 0.89 }
];

export const mockPaperThemes = [
  { id_paper: 1, id_theme: 1, confidence_score: 0.92 },
  { id_paper: 2, id_theme: 2, confidence_score: 0.88 },
  { id_paper: 3, id_theme: 3, confidence_score: 0.95 },
  { id_paper: 4, id_theme: 4, confidence_score: 0.90 },
  { id_paper: 5, id_theme: 5, confidence_score: 0.94 }
];

export const mockRecommendations = [
  {
    id_recommendation: 1,
    id_paper: 1,
    recommended_papers: [2, 4],
    similarity_scores: [0.75, 0.68],
    reason: "Similar environmental impact research and technological solutions"
  },
  {
    id_recommendation: 2,
    id_paper: 2,
    recommended_papers: [3, 5],
    similarity_scores: [0.82, 0.71],
    reason: "Advanced technology applications in different domains"
  }
];

export const mockVisualizationData = {
  papersByYear: [
    { year: 2020, count: 45 },
    { year: 2021, count: 52 },
    { year: 2022, count: 67 },
    { year: 2023, count: 89 }
  ],
  papersByTheme: [
    { theme: "Climate Science", count: 23, color: "#3b82f6" },
    { theme: "Space Technology", count: 18, color: "#1e3a8a" },
    { theme: "Quantum Physics", count: 15, color: "#6366f1" },
    { theme: "Energy Storage", count: 21, color: "#059669" },
    { theme: "Biomedical Research", count: 12, color: "#dc2626" }
  ],
  citationsTrend: [
    { month: "Jan", citations: 120 },
    { month: "Feb", citations: 135 },
    { month: "Mar", citations: 148 },
    { month: "Apr", citations: 162 },
    { month: "May", citations: 175 },
    { month: "Jun", citations: 189 }
  ]
};

