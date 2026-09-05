export type Language = "en" | "es";

export const links = {
  github: "https://github.com/PepeGdlT",
  linkedin: "https://www.linkedin.com/in/jose-galvan-de-la-torre/",
  email: "mailto:pepegdlt02@gmail.com",
  cv: "/CV-JoseGalvan.pdf",
  tennis: "https://github.com/PepeGdlT/TenisPredictorML",
  publication: "https://doi.org/10.3390/a19080681",
  publicationCode:
    "https://github.com/PepeGdlT/WMOEA-EL-LSFS-EWV-Evolutionary-Ensembles-with-Learner-Specific-Feature-Selection",
} as const;

export const supportingProjects = [
  {
    key: "trilingo",
    href: "https://github.com/PepeGdlT/PDS-2025",
    technologies: ["Java 21", "JavaFX", "MVVM", "JPA", "SQLite"],
    grade: "9.0",
    team: ["Sergio Maiquez Noguera", { name: "Pablo Sánchez Albaladejo", linkedin: "https://es.linkedin.com/in/pablosancheza" }],
  },
  {
    key: "appchat",
    href: "https://github.com/PepeGdlT/TDS-AppChat",
    technologies: ["Java", "Maven", "JPA", "JUnit", "H2"],
    grade: "9.5",
  },
  {
    key: "nanofiles",
    href: "https://github.com/PepeGdlT/ProyectoRC",
    technologies: ["Java", "TCP / UDP", "Sockets", "Concurrency", "P2P"],
    grade: "10.0",
    team: [{ name: "Eduardo Meca Valles", linkedin: "https://es.linkedin.com/in/eduardo-meca-valles-20b15b3a7" }],
  },
  {
    key: "mythology",
    href: "https://github.com/PepeGdlT/DSINT",
    technologies: ["Protégé", "Drools", "Ontologies", "SWRL"],
    grade: "9.75",
    team: [{ name: "Eduardo Meca Valles", linkedin: "https://es.linkedin.com/in/eduardo-meca-valles-20b15b3a7" }, { name: "Juan Antonio Mendoza Perez", linkedin: "https://www.linkedin.com/in/juan-antonio-mendoza-perez-1a8b95359/" }],
  },
  {
    key: "entregaVia",
    href: "https://github.com/PepeGdlT/Entrega-Via",
    technologies: ["Python"],
    private: true,
  },
  {
    key: "iadj",
    href: "https://github.com/PepeGdlT/iadj",
    technologies: ["Unity", "C#", "AI steering"],
  },
] as const;

export const tennisMetrics = {
  protocol: {
    trainMatches: "199,523",
    testMatches: "484",
    features: "60",
    testWindow: "29 Jun – 18 Aug 2026",
    validationYears: "2023 · 2024 · 2025",
  },
  results: [
    { key: "ensemble", accuracy: 0.6364, auc: 0.697, logLoss: 0.6312, brier: 0.2208 },
    { key: "elo", accuracy: 0.6302, auc: 0.6743, logLoss: 0.6469, brier: 0.2279 },
    { key: "ranking", accuracy: 0.624, auc: 0.6814, logLoss: 0.6459, brier: 0.2271 },
  ],
} as const;

export const copy = {
  en: {
    languageName: "English",
    switchLanguage: "Cambiar a español",
    skip: "Skip to content",
    nav: {
      home: "Home",
      experience: "Experience",
      projects: "Projects",
      research: "Research",
      background: "Education & courses",
      contact: "Contact",
    },
    common: {
      viewCode: "View code",
      learnMore: "Read case study",
      external: "Opens in a new tab",
      backHome: "Back to portfolio",
      featured: "Featured project",
    },
    hero: {
      eyebrow: "Computer Engineering graduate · University of Murcia",
      title: "Software, data & a curious mind.",
      intro:
        "I’m José Galván. I develop internal applications at Clínica EGOS with React, TypeScript and AWS, and explore machine learning through tennis prediction and evolutionary ensembles.",
      primaryCta: "Explore featured work",
      secondaryCta: "Contact me",
      pillars: ["Software Engineering", "Artificial Intelligence / ML", "Research"],
      proof: [
        { value: "BSc", label: "Computer Engineering" },
        { value: "01", label: "Peer-reviewed publication" },
        { value: "Now", label: "Software developer · Clínica EGOS" },
      ],
    },
    profile: {
      eyebrow: "Profile",
      title: "From a payment flow to a learning algorithm.",
      body:
        "At OdinS, I worked on integrating GNU Taler payments into PrestaShop, from the merchant backend to payment and refund tests. At EGOS, I develop internal web and mobile applications, connect external services and implement role-based functionality.",
      note:
        "Alongside software development, my Computer Engineering thesis at the University of Murcia explored evolving models, feature subsets and voting weights together. That work led to a co-authored article in Algorithms. Spanish is my native language; I also work in English.",
      areas: [
        { title: "Software systems", text: "Backend services, REST integrations, persistence, testing and maintainable architectures." },
        { title: "Applied ML", text: "Leakage-aware features, temporal validation, model comparison and calibrated prediction." },
        { title: "Research", text: "Evolutionary optimization, heterogeneous ensembles and reproducible experimentation." },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "The software behind everyday work.",
      roles: [
        {
          company: "Clínica EGOS",
          role: "Software Developer",
          period: "Mar 2026 — Present",
          current: "Current role",
          summary:
            "Development and maintenance of internal web and mobile applications using React, TypeScript and AWS services.",
          details: [
            "Design and implementation of interfaces, features and role-based functionality for different business areas.",
            "Backend and cloud integrations using AWS Amplify, AppSync, DynamoDB, Cognito and Lambda.",
            "External API integrations, including social media and analytics platforms; testing and performance improvements.",
          ],
        },
        {
          company: "OdinS",
          role: "Software Development & Integration Intern",
          period: "Jan 2025 — Jul 2025",
          current: "Internship",
          summary:
            "Research and development of a payment module for PrestaShop using GNU Taler, covering the merchant backend, database setup and REST integration.",
          details: [
            "Configured and integrated the merchant backend and payment endpoints.",
            "Tested complete payment and refund flows end to end.",
            "Managed version control and CI/CD with GitLab, and documented the integration with technical and video materials.",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Selected work",
      title: "Different problems. A hands-on approach.",
      intro:
        "Predicting a tennis match, building a learning app or moving files between peers. A selection of my work in machine learning, Java and distributed systems.",
      tennis: {
        label: "Machine learning · Data · Python",
        title: "ATP Tennis Predictor",
        summary:
          "What can a player’s history tell us before the next match? A Python project that brings together ATP data, ELO ratings, recent form and model comparison to estimate match probabilities.",
        resultLabel: "Future holdout",
        metrics: [
          { value: "0.697", label: "AUC" },
          { value: "63.64%", label: "Accuracy" },
          { value: "0.631", label: "Log loss" },
        ],
        flow: ["Historical ATP data", "Stateful features", "Temporal validation", "Stacked probability"],
      },
      supportingTitle: "More things I’ve built",
      supporting: {
        trilingo: {
          title: "Trilingo",
          category: "Desktop software · 2025",
          description:
            "Course creation and learning application built with JavaFX, MVVM and persistent user progress.",
        },
        appchat: {
          title: "AppChat",
          category: "Software engineering · 2024–2025",
          description:
            "Chat application with contacts, messages, profiles, persistence, automated tests and PDF reporting.",
        },
        nanofiles: {
          title: "NanoFiles",
          category: "Distributed systems · 2023",
          description:
            "Hybrid client-server and peer-to-peer file sharing with direct TCP transfers and concurrent connections.",
        },
        mythology: {
          title: "Greek Mythology Intelligent System",
          category: "Knowledge systems · 2024",
          description:
            "Team-built ontology and rule-based system for answering questions over complex mythological events.",
        },
        entregaVia: {
          title: "VIA — Computer Vision",
          category: "Python · Updated May 27 · Private repository",
          description: "Private Python project in computer vision. The source remains restricted; contact me if you would like to discuss the implementation.",
        },
        iadj: {
          title: "IA para el desarrollo de juegos [25/26]",
          category: "Game AI · Unity / C# · 2025–2026",
          description: "A Unity game where the agents we built navigate the map, form groups and fight autonomously using steering behaviours, pathfinding and combat logic.",
        },
      },
    },
    research: {
      eyebrow: "Published research",
      title: "A thesis that became a publication.",
      summary:
        "My thesis explored a question: what if we evolved the models, the features each one sees and their voting weights together? With Gracia Sánchez and Fernando Jiménez, I co-authored a study of this approach to regression ensembles.",
      publicationLabel: "Peer-reviewed journal article",
      publicationTitle:
        "Simultaneous Multi-Objective Evolutionary Optimization of Heterogeneous Ensembles, Learner-Specific Feature Subsets, and Aggregation Weights",
      authors: "José Galván, Gracia Sánchez, Fernando Jiménez",
      venue: "Algorithms · MDPI · 2026 · Volume 19 · Article 681",
      doi: "DOI 10.3390/a19080681",
      articleCta: "Read publication",
      codeCta: "Explore research code",
    },
    background: {
      eyebrow: "Background",
      title: "A foundation in computing. A focus on AI.",
      educationLabel: "Education",
      education: [
        {
          title: "BSc in Computer Engineering",
          detail: "Computation specialization · 240 ECTS",
          institution: "University of Murcia",
          period: "2022 — 2026 · Completed",
        },
        {
          title: "Master's Degree in Artificial Intelligence",
          detail: "Incoming master's programme",
          institution: "University of Murcia",
          period: "Starts Sep 2026",
        },
      ],
      certificationLabel: "Cloud training",
      certifications: [
        { title: "AWS Cloud Practitioner Essentials", provider: "Amazon Web Services", date: "Jul 2025" },
        { title: "Infrastructure in Google Cloud", provider: "Google Cloud Skills Boost", date: "Jul 2025" },
        { title: "Cloud Computing Fundamentals", provider: "Google Cloud Skills Boost", date: "Jul 2025" },
        { title: "Networking & Security in Google Cloud", provider: "Google Cloud Skills Boost", date: "Jul 2025" },
      ],
      toolkitLabel: "Core toolkit",
      toolkit: [
        "Python",
        "Java",
        "TypeScript",
        "SQL",
        "scikit-learn",
        "XGBoost",
        "Spring Boot",
        "REST APIs",
        "PostgreSQL",
        "Git",
        "Docker",
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Have something in mind? Let’s talk.",
      body:
        "The fastest way to reach me is by email. You can also review my code, professional profile and CV below.",
      email: "Send an email",
      github: "GitHub",
      linkedin: "LinkedIn",
      cv: "CV",
      cvNote: "PDF",
    },
    footer: "Designed and built by José Galván.",
    tennisCase: {
      eyebrow: "Featured case study · Machine Learning",
      title: "Predicting ATP match outcomes from historical, pre-match information.",
      summary:
        "A reproducible machine-learning workflow that builds player state chronologically, compares model families with walk-forward validation, and evaluates the selected ensemble on matches that occur strictly after training.",
      repo: "View GitHub repository",
      snapshot: "Evaluation snapshot",
      snapshotNote: "Recorded in the repository on 18 Aug 2026",
      metrics: {
        train: "Training matches",
        test: "Future test matches",
        features: "Engineered features",
        window: "External test window",
      },
      problem: {
        eyebrow: "01 · Problem",
        title: "A prediction must only know what was available before the match.",
        body:
          "ATP outcomes depend on player strength, surface, form, fatigue and matchup history. The difficult engineering constraint is temporal: rankings, ratings and form must be reconstructed in order, without future information leaking into training features.",
      },
      data: {
        eyebrow: "02 · Data & features",
        title: "Historical match records become evolving player state.",
        body:
          "The pipeline processes professional ATP matches chronologically. Each row is transformed into comparative pre-match features, then the players’ state is updated only after that match has been observed.",
        features: [
          { title: "Ratings", text: "Global, surface and recent ELO signals." },
          { title: "Ranking", text: "Rank and ranking-point differences, with missing-value awareness." },
          { title: "Form", text: "Recent win rates, quality-adjusted form and streaks." },
          { title: "Matchup", text: "Head-to-head history and surface context." },
          { title: "Activity", text: "Rest, recent matches and minutes played." },
          { title: "Serve & return", text: "Historical rates and the amount of evidence behind them." },
        ],
      },
      approach: {
        eyebrow: "03 · Approach",
        title: "Compare diverse models, then combine their out-of-sample signals.",
        body:
          "Six model families were tested through 16 configurations: logistic regression with PCA, Random Forest, Extra Trees, Histogram Gradient Boosting, XGBoost, and XGBoost with PCA. The final model is a logistic stack trained on out-of-fold probabilities from those families plus global and surface ELO priors.",
        steps: [
          { title: "Chronological features", text: "Build every predictor from past matches only." },
          { title: "Walk-forward search", text: "Validate candidates on 2023, 2024 and 2025 folds." },
          { title: "Probability-first selection", text: "Use log loss as the primary metric, with AUC, Brier and calibration checks." },
          { title: "Strict future test", text: "Freeze selection before evaluating the 484-match external holdout." },
        ],
      },
      evaluation: {
        eyebrow: "04 · Evaluation",
        title: "A future holdout, compared with transparent baselines.",
        body:
          "The selected temporal ensemble is compared with global ELO and ATP ranking on the same 484 matches. Higher is better for accuracy and AUC; lower is better for log loss and Brier score.",
        model: "Temporal ensemble",
        elo: "Global ELO",
        ranking: "ATP ranking",
        accuracy: "Accuracy",
        auc: "AUC",
        logLoss: "Log loss",
        brier: "Brier score",
        higher: "Higher is better",
        lower: "Lower is better",
        caveat:
          "Interpretation: the ensemble leads the recorded baselines across all four metrics, but 484 matches remain a limited external sample. The repository reports confidence intervals and avoids claiming a definitive improvement where uncertainty overlaps.",
      },
      technology: {
        eyebrow: "05 · Technologies",
        title: "A reproducible Python analysis and prediction stack.",
        items: ["Python", "pandas", "NumPy", "scikit-learn", "XGBoost", "Jupyter", "Matplotlib", "Seaborn", "PyArrow"],
        closing:
          "The repository includes the training pipeline, tests, searchable notebook, saved metrics, model-search results and prediction artifacts.",
      },
    },
  },
  es: {
    languageName: "Español",
    switchLanguage: "Switch to English",
    skip: "Saltar al contenido",
    nav: {
      home: "Inicio",
      experience: "Experiencia",
      projects: "Proyectos",
      research: "Investigación",
      background: "Formación y cursos",
      contact: "Contacto",
    },
    common: {
      viewCode: "Ver código",
      learnMore: "Ver caso de estudio",
      external: "Se abre en una pestaña nueva",
      backHome: "Volver al portfolio",
      featured: "Proyecto destacado",
    },
    hero: {
      eyebrow: "Graduado en Ingeniería Informática · Universidad de Murcia",
      title: "Software, datos y ganas de ir más allá.",
      intro:
        "Soy José Galván. Desarrollo aplicaciones internas en Clínica EGOS con React, TypeScript y AWS, y exploro el machine learning con proyectos de predicción de tenis y ensembles evolutivos.",
      primaryCta: "Ver trabajo destacado",
      secondaryCta: "Contactar",
      pillars: ["Ingeniería de Software", "Inteligencia Artificial / ML", "Investigación"],
      proof: [
        { value: "Grado", label: "Ingeniería Informática" },
        { value: "01", label: "Publicación científica" },
        { value: "Ahora", label: "Desarrollador de software · Clínica EGOS" },
      ],
    },
    profile: {
      eyebrow: "Perfil",
      title: "De un flujo de pagos a un algoritmo que aprende.",
      body:
        "En OdinS trabajé en la integración de pagos con GNU Taler en PrestaShop: desde el backend del comercio hasta las pruebas de pago y reembolso. En EGOS desarrollo aplicaciones web y móviles internas, conecto servicios externos e implemento funcionalidades con permisos por roles.",
      note:
        "En paralelo, mi TFG en Ingeniería Informática en la Universidad de Murcia exploró cómo evolucionar modelos, variables y pesos de votación de forma conjunta. Ese trabajo dio lugar a un artículo del que soy coautor en Algorithms. Mi lengua materna es el español y también trabajo en inglés.",
      areas: [
        { title: "Sistemas de software", text: "Servicios backend, integraciones REST, persistencia, pruebas y arquitecturas mantenibles." },
        { title: "ML aplicado", text: "Features sin fuga, validación temporal, comparación de modelos y predicción calibrada." },
        { title: "Investigación", text: "Optimización evolutiva, ensembles heterogéneos y experimentación reproducible." },
      ],
    },
    experience: {
      eyebrow: "Experiencia",
      title: "El software que hace funcionar el día a día.",
      roles: [
        {
          company: "Clínica EGOS",
          role: "Desarrollador de software",
          period: "Mar 2026 — Actualidad",
          current: "Puesto actual",
          summary:
            "Desarrollo y mantenimiento de aplicaciones web y móviles internas con React, TypeScript y servicios de AWS.",
          details: [
            "Diseño e implementación de interfaces, funcionalidades y permisos por roles para distintas áreas de negocio.",
            "Backend e integraciones cloud con AWS Amplify, AppSync, DynamoDB, Cognito y Lambda.",
            "Integración de APIs de redes sociales y analítica, pruebas y mejoras de rendimiento de las plataformas internas.",
          ],
        },
        {
          company: "OdinS",
          role: "Prácticas en Desarrollo e Integración de Software",
          period: "Ene 2025 — Jul 2025",
          current: "Prácticas",
          summary:
            "Investigación y desarrollo de un módulo de pago para PrestaShop con GNU Taler, cubriendo el backend merchant, la base de datos y la integración REST.",
          details: [
            "Configuré e integré el backend merchant y los endpoints de pago.",
            "Probé de extremo a extremo los flujos completos de pago y reembolso.",
            "Trabajé con control de versiones y CI/CD en GitLab, y documenté la integración con material técnico y vídeos.",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Trabajo seleccionado",
      title: "Problemas distintos. Ganas de construir.",
      intro:
        "Predecir un partido, crear una aplicación de aprendizaje o transferir archivos entre pares. Una selección de mi trabajo con machine learning, Java y sistemas distribuidos.",
      tennis: {
        label: "Machine learning · Datos · Python",
        title: "Predictor de partidos ATP",
        summary:
          "¿Qué nos cuenta el historial de un jugador antes de su próximo partido? Un proyecto en Python que combina datos ATP, ratings ELO, forma reciente y comparación de modelos para estimar probabilidades de victoria.",
        resultLabel: "Test futuro",
        metrics: [
          { value: "0,697", label: "AUC" },
          { value: "63,64 %", label: "Accuracy" },
          { value: "0,631", label: "Log loss" },
        ],
        flow: ["Datos históricos ATP", "Features stateful", "Validación temporal", "Probabilidad apilada"],
      },
      supportingTitle: "Más cosas que he construido",
      supporting: {
        trilingo: {
          title: "Trilingo",
          category: "Software de escritorio · 2025",
          description:
            "Aplicación para crear y realizar cursos con JavaFX, MVVM y progreso persistente del usuario.",
        },
        appchat: {
          title: "AppChat",
          category: "Ingeniería de software · 2024–2025",
          description:
            "Aplicación de chat con contactos, mensajes, perfiles, persistencia, pruebas automáticas e informes PDF.",
        },
        nanofiles: {
          title: "NanoFiles",
          category: "Sistemas distribuidos · 2023",
          description:
            "Intercambio de archivos híbrido cliente-servidor y P2P con transferencias TCP directas y conexiones concurrentes.",
        },
        mythology: {
          title: "Sistema Inteligente de Mitología Griega",
          category: "Sistemas de conocimiento · 2024",
          description:
            "Sistema en equipo basado en ontologías y reglas para responder preguntas sobre eventos mitológicos complejos.",
        },
        entregaVia: {
          title: "VIA — Visión Artificial",
          category: "Python · Actualizado el 27 de mayo · Repositorio privado",
          description: "Proyecto privado de visión artificial desarrollado en Python. El código fuente no es público; puedes contactarme si quieres conocer más detalles de la implementación.",
        },
        iadj: {
          title: "IA para el desarrollo de juegos [25/26]",
          category: "IA para videojuegos · Unity / C# · 2025–2026",
          description: "Videojuego en Unity donde los agentes que creamos recorren el mapa, forman grupos y combaten solos mediante steering, pathfinding y lógica de combate.",
        },
      },
    },
    research: {
      eyebrow: "Investigación publicada",
      title: "Un TFG que acabó en una publicación.",
      summary:
        "Mi TFG partió de una pregunta: ¿y si evolucionamos a la vez los modelos, las variables que utiliza cada uno y sus pesos al votar? Junto a Gracia Sánchez y Fernando Jiménez, soy coautor de un estudio de este enfoque para ensembles de regresión.",
      publicationLabel: "Artículo científico revisado por pares",
      publicationTitle:
        "Simultaneous Multi-Objective Evolutionary Optimization of Heterogeneous Ensembles, Learner-Specific Feature Subsets, and Aggregation Weights",
      authors: "José Galván, Gracia Sánchez, Fernando Jiménez",
      venue: "Algorithms · MDPI · 2026 · Volumen 19 · Artículo 681",
      doi: "DOI 10.3390/a19080681",
      articleCta: "Leer publicación",
      codeCta: "Explorar código de investigación",
    },
    background: {
      eyebrow: "Formación",
      title: "Base en computación. Foco en IA.",
      educationLabel: "Formación",
      education: [
        {
          title: "Grado en Ingeniería Informática",
          detail: "Especialización en Computación · 240 ECTS",
          institution: "Universidad de Murcia",
          period: "2022 — 2026 · Completado",
        },
        {
          title: "Máster Universitario en Inteligencia Artificial",
          detail: "Próxima formación",
          institution: "Universidad de Murcia",
          period: "Comienza en sep 2026",
        },
      ],
      certificationLabel: "Formación cloud",
      certifications: [
        { title: "AWS Cloud Practitioner Essentials", provider: "Amazon Web Services", date: "Jul 2025" },
        { title: "Infrastructure in Google Cloud", provider: "Google Cloud Skills Boost", date: "Jul 2025" },
        { title: "Cloud Computing Fundamentals", provider: "Google Cloud Skills Boost", date: "Jul 2025" },
        { title: "Networking & Security in Google Cloud", provider: "Google Cloud Skills Boost", date: "Jul 2025" },
      ],
      toolkitLabel: "Stack principal",
      toolkit: [
        "Python",
        "Java",
        "TypeScript",
        "SQL",
        "scikit-learn",
        "XGBoost",
        "Spring Boot",
        "REST APIs",
        "PostgreSQL",
        "Git",
        "Docker",
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: "¿Tienes algo en mente? Hablemos.",
      body:
        "La forma más rápida de contactar conmigo es por email. También puedes revisar mi código, perfil profesional y CV.",
      email: "Enviar email",
      github: "GitHub",
      linkedin: "LinkedIn",
      cv: "CV",
      cvNote: "PDF",
    },
    footer: "Diseñado y desarrollado por José Galván.",
    tennisCase: {
      eyebrow: "Caso destacado · Machine Learning",
      title: "Predicción de partidos ATP a partir de información histórica pre-partido.",
      summary:
        "Un flujo reproducible de machine learning que construye el estado de cada jugador cronológicamente, compara familias de modelos con validación walk-forward y evalúa el ensemble seleccionado en partidos estrictamente posteriores al entrenamiento.",
      repo: "Ver repositorio en GitHub",
      snapshot: "Resumen de evaluación",
      snapshotNote: "Registrado en el repositorio el 18 ago 2026",
      metrics: {
        train: "Partidos de entrenamiento",
        test: "Partidos del test futuro",
        features: "Features generadas",
        window: "Ventana del test externo",
      },
      problem: {
        eyebrow: "01 · Problema",
        title: "Una predicción solo debe conocer lo disponible antes del partido.",
        body:
          "Los resultados ATP dependen del nivel, la superficie, la forma, la fatiga y el historial del enfrentamiento. La dificultad de ingeniería es temporal: rankings, ratings y forma deben reconstruirse en orden, sin que información futura contamine las features de entrenamiento.",
      },
      data: {
        eyebrow: "02 · Datos y features",
        title: "El histórico de partidos se convierte en un estado dinámico por jugador.",
        body:
          "El pipeline procesa cronológicamente los partidos profesionales ATP. Cada fila se transforma en variables comparativas pre-partido y el estado de los jugadores solo se actualiza después de observar ese encuentro.",
        features: [
          { title: "Ratings", text: "Señales ELO globales, por superficie y recientes." },
          { title: "Ranking", text: "Diferencias de ranking y puntos, contemplando valores ausentes." },
          { title: "Forma", text: "Victorias recientes, forma ajustada por calidad y rachas." },
          { title: "Enfrentamiento", text: "Historial head-to-head y contexto de superficie." },
          { title: "Actividad", text: "Descanso, partidos recientes y minutos jugados." },
          { title: "Saque y resto", text: "Tasas históricas y cantidad de evidencia disponible." },
        ],
      },
      approach: {
        eyebrow: "03 · Enfoque",
        title: "Comparar modelos diversos y combinar sus señales fuera de muestra.",
        body:
          "Se probaron 16 configuraciones de seis familias: regresión logística con PCA, Random Forest, Extra Trees, Histogram Gradient Boosting, XGBoost y XGBoost con PCA. El modelo final es un stacking logístico entrenado con probabilidades out-of-fold de esas familias y priors ELO globales y por superficie.",
        steps: [
          { title: "Features cronológicas", text: "Construir cada predictor únicamente con partidos pasados." },
          { title: "Búsqueda walk-forward", text: "Validar candidatos sobre folds de 2023, 2024 y 2025." },
          { title: "Selección probabilística", text: "Priorizar log loss, con AUC, Brier y calibración como apoyo." },
          { title: "Test futuro estricto", text: "Cerrar la selección antes de evaluar el holdout de 484 partidos." },
        ],
      },
      evaluation: {
        eyebrow: "04 · Evaluación",
        title: "Un holdout futuro comparado con baselines transparentes.",
        body:
          "El ensemble temporal seleccionado se compara con el ELO global y el ranking ATP sobre los mismos 484 partidos. En accuracy y AUC un valor mayor es mejor; en log loss y Brier es mejor un valor menor.",
        model: "Ensemble temporal",
        elo: "ELO global",
        ranking: "Ranking ATP",
        accuracy: "Accuracy",
        auc: "AUC",
        logLoss: "Log loss",
        brier: "Brier score",
        higher: "Mayor es mejor",
        lower: "Menor es mejor",
        caveat:
          "Interpretación: el ensemble lidera los baselines registrados en las cuatro métricas, pero 484 partidos siguen siendo una muestra externa limitada. El repositorio informa de intervalos de confianza y evita afirmar una mejora definitiva cuando la incertidumbre se solapa.",
      },
      technology: {
        eyebrow: "05 · Tecnologías",
        title: "Un stack Python reproducible para análisis y predicción.",
        items: ["Python", "pandas", "NumPy", "scikit-learn", "XGBoost", "Jupyter", "Matplotlib", "Seaborn", "PyArrow"],
        closing:
          "El repositorio incluye el pipeline de entrenamiento, tests, notebook interactivo, métricas guardadas, resultados de búsqueda y artefactos de predicción.",
      },
    },
  },
} as const;

export type PortfolioCopy = (typeof copy)[Language];

export function getLanguage(language?: string): Language {
  return language?.toLowerCase().startsWith("es") ? "es" : "en";
}
