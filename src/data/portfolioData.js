// =============================================
// RITHWIK THIRUMALARAJU — Portfolio Data
// =============================================

export const personalInfo = {
  name: "Rithwik Thirumalaraju",
  initials: "RT",
  role: "AI Engineer",
  tagline: "Building Intelligent Systems that Think, Reason & Act",
  bio: `I architect and ship <strong>Generative AI</strong> products — from natural-language database interfaces to autonomous agentic pipelines. Currently engineering the future of graph-powered AI at <strong>ArangoAI</strong> and previously driving enterprise automation at <strong>BluePal Software Solutions</strong>.`,
  email: "rithwikthirumalaraju@gmail.com",
  linkedin: "www.linkedin.com/in/rithwik-thirumalaraju-ai",
  linkedinUrl: "https://www.linkedin.com/in/rithwik-thirumalaraju-ai",
  github: "github.com/rithwikthirumalaraju14",
  githubUrl: "https://github.com/rithwikthirumalaraju14",
};

export const metrics = [
  { number: "2", plus: "+", label: "Years Experience" },
  { number: "6", plus: "+", label: "AI Products Shipped" },
  { number: "50", plus: "K+", label: "Queries Processed" },
  { number: "99.2", plus: "%", label: "System Uptime" },
];

export const companies = [
  {
    name: "ArangoAI",
    role: "AI Engineer",
    period: "Jul 2024 – Present",
    theme: "arango-theme",
    icon: "🧠",
    linkText: "arangoai.com",
    linkUrl: "https://arangoai.com",
    description:
      "Leading development of the Text-to-AQL natural language interface, enabling enterprise users to query ArangoDB's multi-model graph database using plain English. Built production-grade gRPC microservices powering schema-aware query generation.",
    bullets: [
      "Architected txt2aql — a natural-language-to-AQL pipeline with schema introspection, serving 50K+ queries with <50ms p95 latency",
      "Designed ArangoGraphML model-serving infrastructure with versioned deployment pipelines",
      "Built enterprise RAG systems with hybrid vector + graph retrieval achieving 94% relevance scores",
      "Implemented gRPC service mesh with mTLS authentication and circuit-breaker patterns",
    ],
    tags: [
      "Python",
      "LangChain",
      "ArangoDB",
      "gRPC",
      "FastAPI",
      "Docker",
      "GraphML",
      "RAG",
    ],
  },
  {
    name: "BluePal Software Solutions",
    role: "AI/ML Developer",
    period: "Jan 2024 – Jul 2024",
    theme: "bluepal-theme",
    icon: "⚡",
    linkText: "bluepal.com",
    linkUrl: "https://bluepal.com",
    description:
      "Spearheaded the OpenManus agentic AI framework, enabling multi-step autonomous workflows for enterprise clients. Integrated retrieval-augmented generation systems with real-time monitoring and observability.",
    bullets: [
      "Built OpenManus — a multi-agent orchestration framework handling 200+ concurrent agent sessions",
      "Developed WebSocket-powered real-time dashboards for agent monitoring with <100ms refresh rates",
      "Integrated LangSmith observability pipelines reducing debugging time by 60%",
      "Shipped RAG-powered document Q&A system processing 10K+ enterprise documents",
    ],
    tags: [
      "Python",
      "LangChain",
      "WebSockets",
      "React",
      "LangSmith",
      "Redis",
      "PostgreSQL",
      "AWS",
    ],
  },
];

export const internships = [
  {
    org: "SAK Informatics",
    role: "Computer Vision Intern",
    date: "Jan 2024 – Apr 2024",
    desc: "Developed a CNN and OpenCV pipeline for real-time hand-sign recognition and live predictions.",
  },
  {
    org: "Indian Servers",
    role: "Software Trainee · Intern",
    date: "Apr 2023 – Jun 2023",
    desc: "Software trainee internship (UID: IndServ23a1231). Fine-tuned Hugging Face transformer models for movie recommendations with real-time Telegram bot API delivery.",
  },
  {
    org: "1stop",
    role: "Machine Learning Intern",
    date: "Nov 2021 – Jan 2022",
    desc: "Built supervised machine learning models to detect fake news across large datasets and developed a misinformation filtering pipeline.",
  },
];

export const aqlPresets = {
  fraud: {
    query:
      'Find high-value transactions (> $500) within 2 hops of flagged fraudulent IP addresses',
    aql: `// Natural Language Query -> Text-to-AQL (txt2aql)
FOR vertex, edge, path IN 1..2 ANY @fraudIpIpAddress
  GRAPH 'FinCrimeIntelligenceGraph'
  FILTER vertex.riskScore >= 0.85
  FOR tx IN transactions
    FILTER tx.sourceAccount == vertex._id
       AND tx.amount >= 500
    SORT tx.timestamp DESC
    RETURN {
      transactionId: tx._id,
      amount: tx.amount,
      entity: vertex.entityName,
      riskLevel: vertex.riskCategory,
      detectionLatency: "4.2ms"
    }`,
    explanation:
      "Identified 14 anomalous fund flows through intermediary proxy accounts. All nodes scored above 0.85 risk threshold in ArangoDB multi-model graph traversal.",
    latency: "4.2 ms",
  },
  recommend: {
    query:
      "Recommend enterprise GraphML models based on co-purchased tools and active deployments",
    aql: `// ArangoGraphML Model Traversal Query
WITH users, models, deployments
FOR u IN users
  FILTER u._key == @currentUserId
  FOR v, e IN 1..2 OUTBOUND u userInteractions
    FILTER v.category == "GenerativeAI"
    COLLECT recommendedModel = v.modelName WITH COUNT INTO frequency
    SORT frequency DESC
    LIMIT 5
    RETURN {
      model: recommendedModel,
      relevanceScore: frequency / 10.0,
      runtime: "ArangoGraphML v2.4"
    }`,
    explanation:
      "Synthesized collaborative graph recommendations with sub-second traversal over 1.2M relationship edges.",
    latency: "6.8 ms",
  },
  shortestPath: {
    query:
      "Compute the shortest knowledge dependency path between Natural Language Service and ArangoDB cluster",
    aql: `// gRPC Service Dependency Path Resolution
FOR v, e IN OUTBOUND SHORTEST_PATH
  'services/txt2aql_grpc' TO 'clusters/arango_primary'
  GRAPH 'InfrastructureTopology'
  RETURN {
    node: v._key,
    protocol: e.protocol,
    authMethod: e.authPolicy,
    latencyBudget: e.maxLatencyMs
  }`,
    explanation:
      "Discovered deterministic 3-hop routing: txt2aql_grpc -> query_validator -> arango_coordinator. Zero unauthenticated hops detected.",
    latency: "2.1 ms",
  },
};

export const workflowSteps = [
  {
    name: "User Intent Parsing",
    desc: "NLU engine classifies intent & extracts entities",
  },
  {
    name: "Tool Selection Agent",
    desc: "ReAct agent selects optimal tool from registry",
  },
  {
    name: "Context Retrieval (RAG)",
    desc: "Hybrid vector + graph retrieval from knowledge base",
  },
  {
    name: "Action Execution",
    desc: "Sandboxed code execution with error recovery",
  },
  {
    name: "Response Synthesis",
    desc: "LLM generates structured output with citations",
  },
];

export const projects = [
  {
    title: "Text-to-AQL Engine",
    category: "nlp",
    featured: true,
    desc: "Production natural-language-to-database query engine converting plain English questions into ArangoDB AQL queries with schema-aware context injection.",
    stats: [
      { val: "50K+", lbl: "Queries" },
      { val: "<50ms", lbl: "P95 Latency" },
      { val: "94%", lbl: "Accuracy" },
    ],
    tags: ["Python", "LangChain", "ArangoDB", "gRPC"],
  },
  {
    title: "OpenManus Agent Framework",
    category: "agents",
    featured: true,
    desc: "Multi-agent orchestration platform enabling autonomous workflows with tool-use, memory persistence, and real-time monitoring dashboards.",
    stats: [
      { val: "200+", lbl: "Concurrent" },
      { val: "5", lbl: "Agent Types" },
      { val: "480ms", lbl: "Avg Latency" },
    ],
    tags: ["Python", "WebSockets", "React", "Redis"],
  },
  {
    title: "Enterprise RAG Pipeline",
    category: "rag",
    featured: false,
    desc: "Hybrid retrieval system combining dense vector search with graph-based knowledge traversal for enterprise document Q&A.",
    stats: [
      { val: "10K+", lbl: "Documents" },
      { val: "94%", lbl: "Relevance" },
      { val: "1.2s", lbl: "Response" },
    ],
    tags: ["LangChain", "FAISS", "ArangoDB", "FastAPI"],
  },
  {
    title: "ArangoGraphML Platform",
    category: "ml",
    featured: false,
    desc: "Model-serving infrastructure for graph neural networks with versioned deployment pipelines and A/B testing capabilities.",
    stats: [
      { val: "12", lbl: "Models" },
      { val: "99.9%", lbl: "Uptime" },
      { val: "<200ms", lbl: "Inference" },
    ],
    tags: ["PyTorch", "Docker", "Kubernetes", "GraphML"],
  },
  {
    title: "LangSmith Observability",
    category: "agents",
    featured: false,
    desc: "End-to-end observability pipeline for LLM applications with trace visualization, cost tracking, and automated quality evaluation.",
    stats: [
      { val: "60%", lbl: "Debug ↓" },
      { val: "1M+", lbl: "Traces" },
      { val: "Real-time", lbl: "Alerts" },
    ],
    tags: ["LangSmith", "Python", "Grafana", "PostgreSQL"],
  },
  {
    title: "Schema Introspection Service",
    category: "nlp",
    featured: false,
    desc: "Automated database schema analysis engine that generates contextual metadata for improving natural language query accuracy.",
    stats: [
      { val: "Auto", lbl: "Discovery" },
      { val: "500+", lbl: "Schemas" },
      { val: "98%", lbl: "Coverage" },
    ],
    tags: ["Python", "ArangoDB", "gRPC", "Protobuf"],
  },
];

export const projectFilters = [
  { label: "All Projects", value: "all" },
  { label: "NLP & Language", value: "nlp" },
  { label: "Agentic AI", value: "agents" },
  { label: "RAG Systems", value: "rag" },
  { label: "ML Infrastructure", value: "ml" },
];

export const skills = [
  {
    title: "Languages & Frameworks",
    icon: "⌨️",
    chips: [
      { label: "Python", highlight: true },
      { label: "JavaScript" },
      { label: "TypeScript" },
      { label: "SQL" },
      { label: "AQL", highlight: true },
      { label: "FastAPI" },
      { label: "Flask" },
      { label: "React" },
      { label: "Node.js" },
    ],
  },
  {
    title: "AI / ML Stack",
    icon: "🤖",
    chips: [
      { label: "LangChain", highlight: true },
      { label: "LangGraph" },
      { label: "OpenAI API" },
      { label: "Hugging Face" },
      { label: "PyTorch" },
      { label: "Transformers" },
      { label: "FAISS" },
      { label: "RAG Pipelines", highlight: true },
      { label: "Prompt Engineering" },
    ],
  },
  {
    title: "Infrastructure & Tools",
    icon: "🛠️",
    chips: [
      { label: "Docker", highlight: true },
      { label: "Kubernetes" },
      { label: "AWS" },
      { label: "gRPC", highlight: true },
      { label: "Redis" },
      { label: "PostgreSQL" },
      { label: "ArangoDB", highlight: true },
      { label: "Git" },
      { label: "CI/CD" },
    ],
  },
  {
    title: "Databases",
    icon: "🗄️",
    chips: [
      { label: "ArangoDB", highlight: true },
      { label: "PostgreSQL" },
      { label: "MongoDB" },
      { label: "Redis" },
      { label: "FAISS" },
      { label: "Pinecone" },
    ],
  },
  {
    title: "Observability",
    icon: "📊",
    chips: [
      { label: "LangSmith", highlight: true },
      { label: "Grafana" },
      { label: "Prometheus" },
      { label: "OpenTelemetry" },
      { label: "Logging" },
    ],
  },
  {
    title: "Methodologies",
    icon: "📐",
    chips: [
      { label: "Agile / Scrum" },
      { label: "TDD" },
      { label: "Microservices" },
      { label: "Event-Driven", highlight: true },
      { label: "API Design" },
      { label: "System Design" },
    ],
  },
];

export const education = [
  {
    year: "2020 – 2024",
    degree: "B.Tech in Computer Science & Engineering",
    institution: "KL University, Hyderabad",
    affiliation: "Affiliated to JNTU — CGPA: 8.5/10",
  },
];

export const certifications = [
  {
    icon: "📜",
    name: "Claude Code in Action",
    issuer: "Anthropic",
    badge: "Verified",
    verifyUrl: "https://verify.skilljar.com/c/t59q6rrffck4",
  },
  {
    icon: "🏆",
    name: "Building LLM Applications using Prompt Engineering",
    issuer: "NVIDIA",
    badge: "Verified",
  },
  {
    icon: "🎓",
    name: "ArangoDB Certified Professional",
    issuer: "ArangoDB",
    badge: "Certified",
  },
  {
    icon: "☁️",
    name: "Cloud Computing Basics",
    issuer: "NPTEL",
    badge: "Verified",
  },
];

export const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Lab", href: "#lab" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
