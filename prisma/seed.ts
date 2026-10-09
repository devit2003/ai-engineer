import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type DaySeed = { day: number; title: string; topics: string[]; output: string };
type WeekSeed = { week: number; title: string; days: DaySeed[] };
type MonthSeed = { month: number; title: string; weeks: WeekSeed[] };

// Kurikulum 90 hari — versi final "From Software Engineering -> Machine Learning ->
// Deep Learning -> Generative AI -> Production". Sumber tunggal kebenaran untuk roadmap.
// Ubah di sini jika roadmap berubah lagi, lalu jalankan `npm run db:seed`.
const CURRICULUM: MonthSeed[] = [
  {
    month: 1,
    title: "Software & Machine Learning",
    weeks: [
      {
        week: 1,
        title: "Python & Software Engineering",
        days: [
          {
            day: 1,
            title: "Project Structure & Clean Code",
            topics: ["Struktur project Python", "Clean Code", "Naming convention", "Single Responsibility", "Separation of Concerns", "Modular programming", "Refactoring"],
            output: "Refactor project Python menjadi struktur yang modular dan mudah dibaca.",
          },
          {
            day: 2,
            title: "Object-Oriented Programming",
            topics: ["Class & Object", "Constructor", "Attribute & Method", "Encapsulation", "Inheritance", "Polymorphism", "Composition"],
            output: "Membuat mini project menggunakan OOP.",
          },
          {
            day: 3,
            title: "Dataclasses & Type Hinting",
            topics: ["Type hints", "Function annotations", "Return types", "Generic collections", "Optional types", "Dataclass"],
            output: "Refactor project dengan dataclass dan type hints.",
          },
          {
            day: 4,
            title: "Functions, Decorators & Generators",
            topics: ["Function design", "*args & **kwargs", "Scope", "Higher-order functions", "Decorators", "Generators", "yield"],
            output: "Membuat decorator dan generator yang digunakan dalam project.",
          },
          {
            day: 5,
            title: "Exception Handling & Logging",
            topics: ["Exception", "try / except", "raise", "Custom exception", "Logging", "Log levels", "Debugging"],
            output: "Project memiliki error handling dan logging.",
          },
          {
            day: 6,
            title: "Environment & Configuration",
            topics: ["Environment variables", ".env", "Configuration management", "Development vs production", "Secret management"],
            output: "Project menggunakan configuration dan environment variables dengan aman.",
          },
          {
            day: 7,
            title: "Virtual Environment & Package Management",
            topics: ["venv", "pip", "requirements.txt", "Dependency management", ".gitignore"],
            output: "Project dapat di-install dan dijalankan di environment baru.",
          },
        ],
      },
      {
        week: 2,
        title: "Backend Engineering",
        days: [
          {
            day: 8,
            title: "HTTP & REST API",
            topics: ["HTTP", "Request & Response", "HTTP methods", "Status codes", "REST principles", "JSON"],
            output: "Membuat REST API sederhana.",
          },
          {
            day: 9,
            title: "FastAPI Fundamentals",
            topics: ["FastAPI", "Routing", "Path parameter", "Query parameter", "Request body", "API documentation"],
            output: "REST API menggunakan FastAPI.",
          },
          {
            day: 10,
            title: "Pydantic & Data Validation",
            topics: ["Pydantic", "Schema", "Validation", "Serialization", "Response model"],
            output: "API dengan validation yang proper.",
          },
          {
            day: 11,
            title: "Database Fundamentals",
            topics: ["Relational database", "Table", "Primary key", "Foreign key", "CRUD", "SQL fundamentals"],
            output: "Database sederhana untuk aplikasi.",
          },
          {
            day: 12,
            title: "PostgreSQL",
            topics: ["PostgreSQL", "Database design", "SQL queries", "Relationships", "Index fundamentals"],
            output: "Database PostgreSQL untuk project.",
          },
          {
            day: 13,
            title: "FastAPI + PostgreSQL",
            topics: ["Database connection", "ORM", "CRUD API", "Repository pattern"],
            output: "Backend API terhubung PostgreSQL.",
          },
          {
            day: 14,
            title: "Backend Architecture",
            topics: ["Layered architecture", "Service layer", "Repository layer", "Dependency injection", "Project organization"],
            output: "Backend project dengan architecture yang rapi.",
          },
        ],
      },
      {
        week: 3,
        title: "Machine Learning Fundamentals",
        days: [
          {
            day: 15,
            title: "NumPy, Pandas & Data Handling",
            topics: ["NumPy", "Pandas", "DataFrame", "Data cleaning", "Data manipulation"],
            output: "Notebook eksplorasi dan preprocessing dataset.",
          },
          {
            day: 16,
            title: "Exploratory Data Analysis",
            topics: ["Data distribution", "Missing values", "Outliers", "Correlation", "Visualization"],
            output: "EDA report dari sebuah dataset.",
          },
          {
            day: 17,
            title: "Data Preprocessing & Feature Engineering",
            topics: ["Encoding", "Scaling", "Imputation", "Feature selection", "Feature engineering", "Train/validation/test split"],
            output: "Preprocessing pipeline.",
          },
          {
            day: 18,
            title: "Regression",
            topics: ["Linear Regression", "Multiple Regression", "Prediction", "Loss function", "MAE", "MSE", "RMSE", "R²"],
            output: "Model regression end-to-end.",
          },
          {
            day: 19,
            title: "Classification",
            topics: ["Logistic Regression", "Decision Tree", "Random Forest", "KNN", "SVM", "Classification workflow"],
            output: "Model classification.",
          },
          {
            day: 20,
            title: "Model Evaluation",
            topics: ["Confusion Matrix", "Accuracy", "Precision", "Recall", "F1-score", "ROC-AUC", "Cross-validation"],
            output: "Evaluation report beberapa model.",
          },
          {
            day: 21,
            title: "Scikit-learn Pipeline",
            topics: ["Pipeline", "ColumnTransformer", "Cross-validation", "Hyperparameter tuning", "GridSearchCV"],
            output: "ML pipeline yang reproducible.",
          },
        ],
      },
      {
        week: 4,
        title: "Machine Learning Project",
        days: [
          { day: 22, title: "Problem Definition", topics: ["Problem formulation", "Business objective", "Target variable", "Success metrics"], output: "Project specification." },
          { day: 23, title: "Dataset & Data Collection", topics: ["Dataset selection", "Data loading", "Data validation", "Data quality"], output: "Dataset siap digunakan." },
          { day: 24, title: "EDA", topics: ["Data exploration", "Visualization", "Pattern discovery"], output: "EDA notebook." },
          { day: 25, title: "Preprocessing", topics: ["Cleaning", "Encoding", "Scaling", "Feature engineering"], output: "Preprocessing pipeline." },
          { day: 26, title: "Baseline Model", topics: ["Baseline", "Training", "Evaluation"], output: "Baseline model." },
          { day: 27, title: "Model Comparison", topics: ["Multiple algorithms", "Cross-validation", "Hyperparameter tuning"], output: "Model comparison report." },
          { day: 28, title: "Model Selection", topics: ["Select best model", "Error analysis", "Model interpretation"], output: "Final ML model." },
          { day: 29, title: "Model Deployment", topics: ["Save model", "FastAPI", "Prediction endpoint"], output: "ML API." },
          { day: 30, title: "ML Project Documentation", topics: ["README", "Architecture", "API documentation", "Results", "Limitations"], output: "1 complete End-to-End ML Project." },
        ],
      },
    ],
  },
  {
    month: 2,
    title: "Deep Learning & Generative AI",
    weeks: [
      {
        week: 5,
        title: "Deep Learning Fundamentals",
        days: [
          { day: 31, title: "Neural Networks", topics: ["Neuron", "Layer", "Weight", "Bias", "Activation function"], output: "Neural network sederhana." },
          { day: 32, title: "Forward & Backpropagation", topics: ["Forward propagation", "Loss", "Gradient", "Backpropagation"], output: "Implementasi neural network sederhana." },
          { day: 33, title: "Optimization", topics: ["Gradient Descent", "SGD", "Adam", "Learning rate", "Batch size", "Epoch"], output: "Training experiment." },
          { day: 34, title: "PyTorch Fundamentals", topics: ["Tensor", "Dataset", "DataLoader", "Model", "Module"], output: "PyTorch training pipeline." },
          { day: 35, title: "Training Loop", topics: ["Forward pass", "Loss calculation", "Backward pass", "Optimizer", "Validation"], output: "Custom PyTorch training loop." },
          { day: 36, title: "Overfitting & Regularization", topics: ["Overfitting", "Underfitting", "Dropout", "Weight decay", "Early stopping", "Data augmentation"], output: "Experiment membandingkan teknik regularization." },
          { day: 37, title: "Deep Learning Evaluation", topics: ["Training curves", "Validation curves", "Confusion matrix", "Error analysis"], output: "Deep learning evaluation report." },
        ],
      },
      {
        week: 6,
        title: "Computer Vision & Deep Learning",
        days: [
          { day: 38, title: "CNN Fundamentals", topics: ["Convolution", "Kernel", "Feature map", "Pooling", "CNN architecture"], output: "CNN sederhana." },
          { day: 39, title: "Image Classification", topics: ["Image preprocessing", "Dataset", "Training", "Evaluation"], output: "Image classification model." },
          { day: 40, title: "Transfer Learning", topics: ["Pretrained model", "Feature extraction", "Fine-tuning"], output: "Transfer learning experiment." },
          { day: 41, title: "Data Augmentation", topics: ["Flip", "Rotation", "Crop", "Normalization", "Augmentation strategy"], output: "Augmentation experiment." },
          { day: 42, title: "Model Improvement", topics: ["Hyperparameter tuning", "Learning rate", "Batch size", "Architecture comparison"], output: "Model improvement report." },
          { day: 43, title: "Model Inference", topics: ["Save model", "Load model", "Prediction pipeline"], output: "Inference script/API." },
          { day: 44, title: "Deep Learning Project", topics: [], output: "1 complete Deep Learning / Computer Vision Project." },
        ],
      },
      {
        week: 7,
        title: "NLP, Transformer & LLM",
        days: [
          { day: 45, title: "NLP Fundamentals", topics: ["Text preprocessing", "Tokenization", "Vocabulary", "Embedding"], output: "NLP preprocessing pipeline." },
          { day: 46, title: "Word Embeddings", topics: ["Word vectors", "Semantic similarity", "Embedding space"], output: "Embedding experiment." },
          { day: 47, title: "Attention Mechanism", topics: ["Query", "Key", "Value", "Self-attention", "Attention score"], output: "Implementasi/visualisasi sederhana attention." },
          { day: 48, title: "Transformer Architecture", topics: ["Encoder", "Decoder", "Multi-head attention", "Positional encoding", "Transformer block"], output: "Diagram dan implementasi sederhana Transformer." },
          { day: 49, title: "Tokenization & LLM", topics: ["Token", "Token IDs", "Context window", "Tokenization strategies"], output: "Eksperimen tokenizer." },
          { day: 50, title: "LLM Inference", topics: ["Pretrained LLM", "Inference", "Generation", "Temperature", "Top-k", "Top-p"], output: "LLM inference application." },
          { day: 51, title: "Prompt Engineering", topics: ["System prompt", "Few-shot prompting", "Role prompting", "Output constraints"], output: "Prompt experiment + evaluation." },
        ],
      },
      {
        week: 8,
        title: "LLM Engineering",
        days: [
          { day: 52, title: "Structured Output", topics: ["JSON output", "Schema", "Validation"], output: "LLM menghasilkan structured response." },
          { day: 53, title: "Function Calling", topics: ["Tools", "Tool schema", "Function execution"], output: "LLM yang dapat memanggil function." },
          { day: 54, title: "LLM + Backend", topics: ["FastAPI + LLM", "API architecture", "Request handling"], output: "LLM API." },
          { day: 55, title: "Streaming", topics: ["Streaming response", "Token streaming", "Async fundamentals"], output: "Streaming LLM API." },
          { day: 56, title: "LLM Evaluation", topics: ["Accuracy", "Relevance", "Hallucination", "Response quality"], output: "Evaluation dataset." },
          { day: 57, title: "LLM Reliability", topics: ["Retry", "Validation", "Fallback", "Error handling", "Guardrails"], output: "Reliable LLM pipeline." },
          { day: 58, title: "LLM Application Architecture", topics: ["Frontend", "Backend", "LLM", "Database", "API"], output: "System architecture." },
          { day: 59, title: "LLM Mini Project", topics: [], output: "Working LLM application." },
          { day: 60, title: "LLM Project Documentation", topics: [], output: "1 complete LLM Engineering Project." },
        ],
      },
    ],
  },
  {
    month: 3,
    title: "RAG, Agents & Production AI",
    weeks: [
      {
        week: 9,
        title: "RAG Engineering",
        days: [
          { day: 61, title: "Document Processing", topics: ["PDF", "DOCX", "TXT", "Document extraction", "Metadata"], output: "Document processing pipeline." },
          { day: 62, title: "Chunking", topics: ["Fixed-size chunking", "Recursive chunking", "Chunk size", "Overlap"], output: "Chunking experiment." },
          { day: 63, title: "Embeddings", topics: ["Embedding model", "Semantic representation", "Similarity"], output: "Embedding pipeline." },
          { day: 64, title: "Vector Database", topics: ["Vector storage", "Similarity search", "Metadata"], output: "Vector database implementation." },
          { day: 65, title: "Dense Retrieval", topics: ["Semantic search", "Top-k retrieval", "Similarity metrics"], output: "Dense retrieval system." },
          { day: 66, title: "BM25", topics: ["Keyword retrieval", "TF-IDF concept", "BM25"], output: "BM25 retrieval system." },
          { day: 67, title: "Hybrid Search", topics: ["Dense retrieval", "BM25", "Score combination", "Retrieval comparison"], output: "Hybrid retrieval system." },
        ],
      },
      {
        week: 10,
        title: "Advanced RAG & AI Agents",
        days: [
          { day: 68, title: "Reranking", topics: ["Candidate retrieval", "Reranker", "Relevance scoring"], output: "Reranking pipeline." },
          { day: 69, title: "RAG Evaluation", topics: ["Retrieval evaluation", "Context relevance", "Answer relevance", "Faithfulness"], output: "RAG evaluation report." },
          { day: 70, title: "Query Transformation", topics: ["Query rewriting", "Query expansion", "Query transformation"], output: "Improved retrieval pipeline." },
          { day: 71, title: "Multi Query & HyDE", topics: ["Multi-query retrieval", "Hypothetical Document Embeddings", "Retrieval comparison"], output: "Advanced retrieval experiment." },
          { day: 72, title: "AI Agent Fundamentals", topics: ["Agent", "Tool", "Agent loop", "Decision making"], output: "Simple AI Agent." },
          { day: 73, title: "Tool Calling & Agent State", topics: ["Tools", "State", "Context", "Tool execution"], output: "Agent with multiple tools." },
          { day: 74, title: "Agent Evaluation", topics: ["Task success", "Tool accuracy", "Failure analysis", "Guardrails"], output: "Agent evaluation report." },
        ],
      },
      {
        week: 11,
        title: "Agentic AI & Production",
        days: [
          { day: 75, title: "LangGraph Fundamentals", topics: ["Graph", "Nodes", "Edges", "State"], output: "Basic LangGraph agent." },
          { day: 76, title: "Agentic RAG", topics: ["RAG + Agent", "Retrieval decision", "Tool-based retrieval"], output: "Agentic RAG system." },
          { day: 77, title: "Multi-Step Agent", topics: ["Planning", "Tool execution", "State management"], output: "Multi-step agent." },
          { day: 78, title: "Docker Fundamentals", topics: ["Image", "Container", "Dockerfile", "Docker Compose"], output: "Containerized AI application." },
          { day: 79, title: "Testing AI Applications", topics: ["Unit testing", "Integration testing", "API testing", "Evaluation testing"], output: "Test suite." },
          { day: 80, title: "Logging, Monitoring & Caching", topics: ["Structured logging", "Monitoring", "Caching", "Performance"], output: "Production monitoring layer." },
          { day: 81, title: "Security", topics: ["API keys", "Authentication", "Authorization", "Input validation", "Rate limiting"], output: "Secured API." },
          { day: 82, title: "Production Architecture", topics: ["AI service", "Backend", "Database", "Vector database", "LLM", "Monitoring"], output: "Production architecture diagram." },
        ],
      },
      {
        week: 12,
        title: "AI Engineer Capstone",
        days: [
          { day: 83, title: "Business Problem", topics: ["Identify problem", "User", "Pain point", "Business value"], output: "Problem statement." },
          { day: 84, title: "Requirements", topics: ["Functional requirements", "Non-functional requirements", "User flow"], output: "Technical specification." },
          { day: 85, title: "System Architecture", topics: ["Backend", "Database", "AI model", "LLM", "RAG", "Agent", "API"], output: "Complete system architecture." },
          { day: 86, title: "Backend Development", topics: ["FastAPI", "Database", "Authentication", "API"], output: "Backend system." },
          { day: 87, title: "AI / ML Component", topics: ["ML model", "Deep Learning model", "LLM", "RAG", "or combination"], output: "AI component integrated." },
          { day: 88, title: "Agent & AI System", topics: ["Agent", "Tool calling", "RAG", "Workflow", "Guardrails"], output: "Complete AI workflow." },
          { day: 89, title: "Deployment", topics: ["Docker", "Cloud/server", "Environment", "Domain/HTTPS", "CI/CD"], output: "Deployed application." },
          { day: 90, title: "Documentation & Demo", topics: ["README", "Architecture", "Technical explanation", "Demo", "Evaluation", "Limitations", "Future improvements"], output: "🏆 Production-Ready AI Engineering Capstone" },
        ],
      },
    ],
  },
];

// Milestone disesuaikan ulang ke struktur roadmap baru (akhir tiap milestone besar).
const MILESTONES = [
  { title: "Selesaikan Fondasi Python & Backend", threshold: 14 },
  { title: "Bangun Proyek Machine Learning Pertama", threshold: 30 },
  { title: "Bangun Proyek Deep Learning / Computer Vision", threshold: 44 },
  { title: "Bangun Aplikasi LLM Pertama", threshold: 60 },
  { title: "Bangun Sistem RAG & AI Agent", threshold: 74 },
  { title: "Deploy Aplikasi AI ke Production", threshold: 82 },
  { title: "Selesaikan Capstone AI Engineer", threshold: 90 },
];

async function main() {
  console.log("Seeding kurikulum 90 hari (versi final)...");

  for (const month of CURRICULUM) {
    const monthRecord = await prisma.month.upsert({
      where: { number: month.month },
      update: { title: month.title },
      create: { number: month.month, title: month.title },
    });

    for (const week of month.weeks) {
      const weekRecord = await prisma.week.upsert({
        where: { number: week.week },
        update: { title: week.title, monthId: monthRecord.id },
        create: { number: week.week, title: week.title, monthId: monthRecord.id },
      });

      for (const day of week.days) {
        const existing = await prisma.learningDay.findUnique({ where: { dayNumber: day.day } });

        // Hari pertama ditandai CURRENT kalau belum ada data sama sekali;
        // kalau sudah pernah dijalankan sebelumnya, status progres yang ada tidak ditimpa.
        const status = existing ? existing.status : day.day === 1 ? "CURRENT" : "LOCKED";

        // Jangan timpa Objektif yang sudah pernah diedit manual lewat halaman hari —
        // hanya isi otomatis dari "Output" kalau Objektif-nya masih kosong.
        const shouldFillObjective = !existing || !existing.objective;

        const dayRecord = await prisma.learningDay.upsert({
          where: { dayNumber: day.day },
          update: {
            title: day.title,
            weekId: weekRecord.id,
            ...(shouldFillObjective ? { objective: day.output } : {}),
          },
          create: {
            dayNumber: day.day,
            title: day.title,
            objective: day.output,
            whyItMatters: "",
            status,
            weekId: weekRecord.id,
          },
        });

        // Topics di-replace total tiap seed supaya aman dijalankan berkali-kali tanpa duplikat.
        await prisma.topic.deleteMany({ where: { dayId: dayRecord.id } });
        if (day.topics.length > 0) {
          await prisma.topic.createMany({
            data: day.topics.map((name) => ({ name, dayId: dayRecord.id })),
          });
        }
      }
    }
  }

  const currentTitles = MILESTONES.map((m) => m.title);

  // Buang milestone lama yang judulnya sudah tidak ada di roadmap versi sekarang,
  // supaya ganti roadmap tidak menyisakan milestone usang di halaman /milestones.
  const stale = await prisma.milestone.findMany({
    where: { title: { notIn: currentTitles } },
  });
  if (stale.length > 0) {
    await prisma.milestone.deleteMany({ where: { id: { in: stale.map((m: { id: string }) => m.id) } } });
    console.log(`Membersihkan ${stale.length} milestone lama: ${stale.map((m: { title: string }) => m.title).join(", ")}`);
  }

  for (const milestone of MILESTONES) {
    const existing = await prisma.milestone.findFirst({ where: { title: milestone.title } });
    if (!existing) {
      await prisma.milestone.create({
        data: { title: milestone.title, unlockDayThreshold: milestone.threshold },
      });
    } else if (existing.unlockDayThreshold !== milestone.threshold) {
      await prisma.milestone.update({
        where: { id: existing.id },
        data: { unlockDayThreshold: milestone.threshold },
      });
    }
  }

  const dayCount = await prisma.learningDay.count();
  const topicCount = await prisma.topic.count();
  console.log(`Selesai. ${dayCount} hari belajar dan ${topicCount} topik tersimpan.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
