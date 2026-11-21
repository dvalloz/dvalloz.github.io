// Portfolio Data and Interactive Functionality for David Valls Lozano

const projectsData = [
  {
    id: "ssb-oct",
    title: "SSB-OCT: Inteligencia Artificial Generativa en Imágenes Médicas",
    category: ["ia", "academic", "research"],
    type: "Trabajo de Fin de Grado (Investigación)",
    institution: "Universitat Politècnica de València (ETSIT) & Università di Bologna",
    badgeColor: "purple",
    repoType: "academic",
    repoUrl: "https://github.com/dvalloz/SSB-OCT", // Placeholder configurable
    repoPrivate: true,
    shortDescription: "Marco de IA generativa para adaptación de dominio no supervisada entre escáneres oftalmológicos OCT mediante Self-Supervised Semantic Bridge (SSB), Flow Matching y DINOv2.",
    featuredImage: "assets/images/tfg-benchmark.png",
    tags: ["PyTorch", "Flow Matching", "Diffusion Bridges", "DINOv2 (ViT)", "Latent VAE", "Computer Vision", "Medical AI"],
    metrics: [
      { label: "Datasets Evaluados", value: "4 Escáneres" },
      { label: "Resolución Procesada", value: "256x256 px" },
      { label: "Anclaje Semántico", value: "16 Canales PCA" },
      { label: "Solvers Numéricos", value: "Heun / RK4 / DDBM" }
    ],
    overview: `
      La Tomografía de Coherencia Óptica (OCT) es una técnica esencial en oftalmología para el diagnóstico no invasivo de la retina. Sin embargo, la disparidad en longitudes de onda, óptica y patrones de ruido (speckle) entre dispositivos comerciales (Bioptigen, Heidelberg Spectralis, Zeiss Cirrus, Optovue) provoca un severo 'domain shift', imposibilitando la interoperabilidad de modelos de Deep Learning sin datos emparejados.
      
      Este proyecto desarrolla una solución pionera basada en la hipótesis del espacio latente compartido, logrando traducir imágenes retinianas preservando estrictamente la microestructura anatómica y adaptando la firma espectral de ruido.
    `,
    architecture: `
      El sistema se estructura en una arquitectura modular de 4 fases de alta ingeniería:
      
      1. Preprocesamiento & Normalización:
         - Segmentación automática de Región de Interés (ROI), CLAHE para ecualización de contraste y filtros Difference of Gaussians (DoG) a 256x256 px.
      
      2. Extractor Anatómico Invariante (DINOv2 + PCA):
         - Backbone Vision Transformer DINOv2 (ViT-B/14 a 448x448 px) que extrae 768 características densas por parche.
         - Reducción dimensional por Análisis de Componentes Principales (PCA) a 16 canales semánticos, sirviendo de ancla biológica para impedir alucinaciones clínicas.
      
      3. Espacio Latente Determinista (KL-VAE):
         - Variational Autoencoder convolucional determinista (b=0) comprimiendo a 64x64x8 canales, garantizando fidelidad milimétrica.
      
      4. Puente de Difusión & Flow Matching (Brownian Bridge):
         - SSBridgeNet condicionado con 32 canales totales (latente t, latente terminal y mapa anatómico).
         - Solvers numéricos integradores de ODEs y SDEs de orden superior: Euler, Heun (RK2 predictor-corrector) y Runge-Kutta 4 (RK4).
         - Módulo adicional de ajuste espectral de frecuencias (SCFlow) para inferencia acelerada en un solo paso.
    `,
    results: `
      - Evaluación benchmark exhaustiva cruzando 4 fabricantes líderes: Bioptigen -> Spectralis, Cirrus -> Spectralis y Optovue -> Spectralis.
      - Preservación íntegra de la morfología de capas retinianas (membrana limitante interna, capa de fotorreceptores y EPR) sin deformaciones patológicas.
      - Disminución drástica de la métrica Fréchet Inception Distance (FID) y adaptación fidedigna de la textura estocástica de speckle noise.
    `,
    gallery: [
      { src: "assets/images/tfg-benchmark.png", caption: "Gran comparativa benchmark de adaptación entre fabricantes OCT" },
      { src: "assets/images/tfg-esquema.png", caption: "Diagrama arquitectónico del Self-Supervised Semantic Bridge" },
      { src: "assets/images/tfg-diffusion.png", caption: "Evolución temporal de la integración del puente de difusión (t=1 a t=0)" }
    ]
  },
  {
    id: "fintrack",
    title: "FinTrack: Plataforma Financiera con Contabilidad Neta Real",
    category: ["fullstack", "personal"],
    type: "Proyecto Personal (Arquitectura Hexagonal)",
    institution: "Desarrollo Independiente",
    badgeColor: "emerald",
    repoType: "personal",
    repoUrl: "https://github.com/dvalloz/fintrack-project", // Placeholder configurable
    repoPrivate: true,
    shortDescription: "Gestor financiero multicuenta inspirado en Trade Republic que erradica la 'falacia del gasto bruto' con contabilidad True Net Spend, Open Banking PSD2 y arquitectura hexagonal.",
    featuredImage: "assets/images/matriculas-benchmark.png", // Usaremos un preview interactivo en SVG/UI
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "PostgreSQL 16", "Drizzle ORM", "Open Banking PSD2", "Clean Architecture"],
    metrics: [
      { label: "Arquitectura", value: "Hexagonal Estricta" },
      { label: "Frontend", value: "Next.js 15 App Router" },
      { label: "Accesibilidad", value: "WCAG 2.2 AAA" },
      { label: "Identificadores", value: "UUIDv7 Cronológicos" }
    ],
    overview: `
      Las aplicaciones bancarias tradicionales cometen un error contable crítico: cuando una persona adelanta un pago compartido (por ejemplo una cena de 150 € y sus amigos le abonan 120 € por Bizum), registran 150 € de gasto y 120 € de ingresos. Esto infla artificialmente la tasa de gasto y de ahorro, obligando al usuario a llevar cuentas manuales.
      
      FinTrack resuelve este problema estructural mediante la Ecuación Contable Maestra de Gasto Neto Real (True Net Spend): los reembolsos reducen directamente la partida original, los traspasos entre cuentas propias son neutros y solo se computan ingresos netos genuinos.
    `,
    architecture: `
      Construido bajo el rigor de la Arquitectura Hexagonal (Puertos y Adaptadores):
      
      1. Capa de Dominio (Core):
         - Cero dependencias de librerías externas o frameworks web.
         - Modelado contable inmutable, validaciones monetarias estrictas y reglas de split/reembolsos vinculados.
      
      2. Capa de Aplicación (Use Cases & Ports):
         - Orquestación de casos de uso: cálculo de ahorro neto, liquidación de traspasos y sincronización bancaria.
         - Interfaces abstractas (Ports) para persistencia, autenticación y Open Banking.
      
      3. Adaptadores Primarios (Drivers):
         - Next.js 15 App Router con Server Actions asíncronas y tipado estricto de extremo a extremo.
         - Sistema de diseño de alto contraste 'Midnight Purple' con tokens oficiales y números tabulares (tnum).
      
      4. Adaptadores Secundarios (Driven):
         - Base de datos PostgreSQL 16 con claves primarias ordenables temporalmente (UUIDv7).
         - Drizzle ORM para consultas SQL seguras en milisegundos y conector Open Banking (GoCardless AISP).
    `,
    results: `
      - Cumplimiento de ratios de contraste WCAG 2.2 AAA (>17:1 en métricas clave) para máxima legibilidad y cero fatiga visual.
      - Precisión contable absoluta sin descuadres por céntimos ni distorsiones en gráficas mensuales de patrimonio.
      - Interfaz reactiva fluida optimizada para el análisis sosegado y austero de las finanzas personales.
    `,
    gallery: []
  },
  {
    id: "jarvis",
    title: "Jarvis: Asistente Autónomo con LLM & Function Calling",
    category: ["ia", "personal"],
    type: "Proyecto Personal (Agente Autónomo)",
    institution: "Desarrollo Independiente",
    badgeColor: "blue",
    repoType: "personal",
    repoUrl: "https://github.com/dvalloz/jarvis-project",
    repoPrivate: true,
    shortDescription: "Agente proactivo en Telegram con razonamiento LLM (Qwen-2.5 27B vía Groq), 18 esquemas de Tool Calling, crons reactivos y sincronización con Google Calendar y PostgreSQL.",
    featuredImage: "assets/images/tfg-esquema.png",
    tags: ["Python 3.12", "Telegram Bot API", "Groq API", "AsyncIO", "PostgreSQL 16", "SQLAlchemy", "APScheduler", "Docker"],
    metrics: [
      { label: "Catálogo de Tools", value: "18 Schemas JSON" },
      { label: "Latencia Inferencia", value: "Ultra rápida (Groq)" },
      { label: "Crons Proactivos", value: "AsyncIOScheduler" },
      { label: "Infraestructura", value: "Docker Compose" }
    ],
    overview: `
      Jarvis no es un simple chatbot de respuestas textuales, sino un agente ejecutivo autónomo capaz de interactuar con el entorno digital del usuario. A través de Telegram, gestiona agendas, rutinas físicas adaptativas, seguimiento de medicación con verificación en dos fases, control de micropagos compartidos y supervisión de tareas con fecha límite (deadlines).
      
      El sistema opera tanto de manera reactiva (a petición del usuario) como proactiva (disparando alertas inteligentes sin intervención manual).
    `,
    architecture: `
      Arquitectura desacoplada en 5 niveles de ejecución asíncrona:
      
      - Capa 1 (Interfaz): Telegram Bot API v21 gestionando mensajes, teclados inline táctiles y comandos contextuales.
      - Capa 2 (Seguridad & Enrutado): Decorador @restricted para validación estricta de identidad por ID único.
      - Capa 3 (Motor de Razonamiento LLM): Groq API ejecutando Qwen-2.5 27B con generación de System Prompt temporal dinámico (zona horaria Europe/Madrid).
      - Capa 4 (Function Calling & XML Fallback): 18 esquemas JSON que permiten al LLM consultar y modificar eventos de Google Calendar (OAuth2), registrar entrenamientos de escalada o actualizar base de datos.
      - Capa 5 (Persistencia & Crons): PostgreSQL 16 con motor asíncrono asyncpg y orquestador APScheduler con revisiones cada 15 min y briefings matinales y nocturnos.
    `,
    results: `
      - Automatización completa de la gestión diaria de tareas y hábitos sin fricción de interfaces complejas.
      - Despliegue contenerizado en producción con Docker Compose y monitorización de salud automatizada.
      - Cero exposición de datos personales gracias a clientes API configurados en modo Zero-PII.
    `,
    gallery: []
  },
  {
    id: "segder-drm",
    title: "Sistema DRM con Criptografía Híbrida & Watermark Forense",
    category: ["cyber", "academic"],
    type: "Proyecto Académico de Seguridad y Multimedia",
    institution: "Universitat Politècnica de València",
    badgeColor: "amber",
    repoType: "academic",
    repoUrl: "https://github.com/dvalloz/Proyecto-Segder", // Placeholder configurable
    repoPrivate: false,
    shortDescription: "Prototipo de distribución y protección de contenidos multimedia basado en el estándar W3C EME con RSA-2048 OAEP, AES-128 CBC, firmas RSA-PSS y marca de agua dinámica.",
    featuredImage: "assets/images/tfg-esquema.png",
    tags: ["Python 3.10+", "Criptografía Híbrida", "RSA-2048 OAEP", "AES-128 CBC", "RSA-PSS", "W3C EME", "Sockets TCP"],
    metrics: [
      { label: "Cifrado Simétrico", value: "AES-128-CBC PKCS#7" },
      { label: "Canal Claves", value: "RSA-2048 OAEP" },
      { label: "Autenticación", value: "Firmas RSA-PSS" },
      { label: "Arquitectura", value: "W3C EME Desacoplada" }
    ],
    overview: `
      Implementación completa de un ecosistema DRM (Digital Rights Management) que reproduce la arquitectura de seguridad de estándares comerciales como Google Widevine o Apple FairPlay, siguiendo las directrices de W3C Encrypted Media Extensions (EME).
      
      El proyecto resuelve el compromiso entre transmisión de contenido de alto ancho de banda, custodia de material criptográfico sin exposición de claves maestras y protección activa contra redistribuciones ilegales mediante marcas de agua forenses dinámicas.
    `,
    architecture: `
      Topología distribuida cliente-servidor con aislamiento criptográfico:
      
      1. Content Decryption Module (CDM Aislado):
         - Módulo de ejecución segura que custodia las claves privadas del cliente.
         - Genera solicitudes de licencia firmadas digitalmente con RSA-PSS y SHA-256 para garantizar autenticidad y no repudio.
      
      2. User Agent (Front-end):
         - Responsable del transporte de red y la inspección heurística de paquetes por Magic Bytes binarios.
      
      3. Servidor de Licencias (KMS - Key Management Server):
         - Valida la firma criptográfica del cliente y empaqueta la clave simétrica y el Vector de Inicialización (IV) cifrados mediante RSA-2048 con relleno OAEP.
      
      4. Servidor de Contenidos & Watermarking:
         - Servidor TCP multihilo que inyecta en tiempo real una marca de agua forense con el ID del usuario directamente en el flujo audiovisual antes del cifrado AES.
    `,
    results: `
      - Garantía formal de confidencialidad en tránsito, integridad de contenido y trazabilidad ante filtraciones no autorizadas.
      - Desacoplamiento total entre la lógica de interfaz de usuario y el entorno de descifrado seguro.
      - Validación exhaustiva con imágenes y flujos de vídeo de diferentes formatos (JPEG, PNG, JFIF).
    `,
    gallery: []
  },
  {
    id: "matriculas-cv",
    title: "Benchmark de Detección y Reconocimiento de Matrículas (ALPR)",
    category: ["ia", "academic"],
    type: "Proyecto Académico de Visión por Computador",
    institution: "Universitat Politècnica de València",
    badgeColor: "cyan",
    repoType: "academic",
    repoUrl: "https://github.com/dvalloz/Comparacion-de-detectores-de-matriculas",
    repoPrivate: false,
    shortDescription: "Estudio empírico y comparativo entre visión clásica (OpenCV), OCR preentrenado (EasyOCR), CNN propia en PyTorch y YOLOv8 para reconocimiento de matrículas vehiculares.",
    featuredImage: "assets/images/matriculas-yolo.png",
    tags: ["OpenCV", "PyTorch", "YOLOv8", "EasyOCR", "Computer Vision", "Deep Learning", "Benchmark"],
    metrics: [
      { label: "Métodos Evaluados", value: "4 Enfoques" },
      { label: "Detector SOTA", value: "Ultralytics YOLOv8" },
      { label: "Métricas", value: "IoU, CER, Latencia" },
      { label: "Entorno", value: "Python 3.10+ / GPU" }
    ],
    overview: `
      El reconocimiento automático de matrículas (ALPR) es una pieza angular en ciudades inteligentes, control de peajes y seguridad vial. Este estudio aborda el reto de cómo se comportan los métodos clásicos frente a las arquitecturas modernas de Deep Learning bajo condiciones visuales adversas (inclinaciones, sombras, variaciones lumínicas y baja resolución).
    `,
    architecture: `
      Implementación y contraste experimental de 4 métodos representativos:
      
      1. Morfología y Contornos Clásicos (OpenCV):
         - Umbralización adaptativa de Otsu, operadores Sobel y filtrado por aspect-ratio geométrico.
         - Altamente ligero computacionalmente pero susceptible a brillos y deformaciones angulares.
      
      2. Sistema Basado en EasyOCR:
         - Detección y transcripción directa de texto mediante redes neuronales preentrenadas.
         - Excelente para escenarios frontales, con caídas de rendimiento en ángulos agudos.
      
      3. CNN Convolucional Personalizada (PyTorch):
         - Red convolucional diseñada e implementada desde cero para entender los límites de representaciones intermedias con datasets limitados.
      
      4. YOLOv8 con Transfer Learning (Ultralytics):
         - Detector SOTA adaptado a matrículas vehiculares, ofreciendo el balance óptimo entre precisión de localización e inferencia en milisegundos.
    `,
    results: `
      - YOLOv8 demostró la mayor robustez frente a oclusiones parciales y cambios drásticos de iluminación.
      - Comparativa detallada de curvas de tiempo de inferencia por fotograma (FPS), ideal para implementaciones en sistemas embebidos de tráfico.
    `,
    gallery: [
      { src: "assets/images/matriculas-yolo.png", caption: "Inferencia y detección de bounding box con YOLOv8" },
      { src: "assets/images/matriculas-contornos.png", caption: "Procesamiento por contornos y gradientes morfológicos en OpenCV" },
      { src: "assets/images/matriculas-benchmark.png", caption: "Comparativa visual de resultados y lectura OCR" }
    ]
  }
];

// Document ready initializations
document.addEventListener('DOMContentLoaded', () => {
  renderProjects('all');
  setupEventListeners();
  setupModalHandlers();
});

// Render Project Cards
function renderProjects(filter) {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  const filtered = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category.includes(filter));

  container.innerHTML = filtered.map(p => createProjectCardHTML(p)).join('');
  
  // Re-attach card click listeners
  document.querySelectorAll('.open-modal-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectId = e.currentTarget.getAttribute('data-id');
      openProjectModal(projectId);
    });
  });
}

function createProjectCardHTML(project) {
  const badgeClasses = {
    purple: 'bg-purple-950/60 text-purple-300 border-purple-800/60',
    emerald: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
    blue: 'bg-blue-950/60 text-blue-300 border-blue-800/60',
    amber: 'bg-amber-950/60 text-amber-300 border-amber-800/60',
    cyan: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60',
  }[project.badgeColor] || 'bg-slate-900 text-slate-300 border-slate-700';

  const repoBadge = project.repoPrivate 
    ? `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        Repo Privado (Bajo petición)
       </span>`
    : `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-950/80 text-blue-300 border border-blue-700/60 hover:bg-blue-900 transition-colors">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
        GitHub Público
       </a>`;

  return `
    <div class="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group">
      <div>
        <!-- Card Top Bar -->
        <div class="p-6 pb-4">
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeClasses}">
              ${project.type}
            </span>
            ${repoBadge}
          </div>

          <h3 class="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
            ${project.title}
          </h3>

          <p class="text-sm text-slate-400 line-clamp-3 mb-4 leading-relaxed">
            ${project.shortDescription}
          </p>
        </div>

        <!-- Metric pill grid -->
        <div class="px-6 py-3 bg-slate-900/60 border-y border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
          ${project.metrics.map(m => `
            <div>
              <span class="text-slate-500 block text-[10px] uppercase font-mono">${m.label}</span>
              <span class="text-slate-200 font-semibold font-mono">${m.value}</span>
            </div>
          `).join('')}
        </div>

        <!-- Tags -->
        <div class="px-6 py-4 flex flex-wrap gap-1.5">
          ${project.tags.slice(0, 4).map(tag => `
            <span class="tag-badge px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50">
              ${tag}
            </span>
          `).join('')}
          ${project.tags.length > 4 ? `
            <span class="tag-badge px-2 py-1 rounded-md bg-slate-800/40 text-slate-400">
              +${project.tags.length - 4}
            </span>
          ` : ''}
        </div>
      </div>

      <!-- Action Footer -->
      <div class="p-6 pt-2">
        <button 
          data-id="${project.id}" 
          class="open-modal-trigger w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-blue-600 text-slate-200 hover:text-white font-medium text-sm border border-slate-700/70 hover:border-blue-500 transition-all duration-200"
        >
          <span>Explorar Ficha Técnica</span>
          <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      </div>
    </div>
  `;
}

// Event Listeners Setup
function setupEventListeners() {
  // Category filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      renderProjects(category);
    });
  });

  // Copy Email Button
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'dvdvalls04@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('¡Email copiado al portapapeles!');
      }).catch(() => {
        showToast('dvdvalls04@gmail.com');
      });
    });
  }
}

// Modal handling
let currentProject = null;

function setupModalHandlers() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openProjectModal(id) {
  const project = projectsData.find(p => p.id === id);
  if (!project) return;
  currentProject = project;

  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalOverview = document.getElementById('modal-overview-content');
  const modalArch = document.getElementById('modal-arch-content');
  const modalResults = document.getElementById('modal-results-content');
  const modalTags = document.getElementById('modal-tags');
  const modalMetrics = document.getElementById('modal-metrics');
  const modalGallery = document.getElementById('modal-gallery-container');
  const modalRepoNotice = document.getElementById('modal-repo-notice');

  modalTitle.textContent = project.title;
  modalSubtitle.textContent = `${project.type} · ${project.institution}`;
  modalOverview.innerHTML = `<p class="whitespace-pre-line text-slate-300 leading-relaxed">${project.overview.trim()}</p>`;
  modalArch.innerHTML = `<pre class="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-slate-300 text-xs sm:text-sm font-mono overflow-x-auto whitespace-pre-wrap">${project.architecture.trim()}</pre>`;
  modalResults.innerHTML = `<div class="whitespace-pre-line text-slate-300 leading-relaxed">${project.results.trim()}</div>`;

  // Tags
  modalTags.innerHTML = project.tags.map(tag => `
    <span class="tag-badge px-3 py-1 rounded-lg bg-blue-950/50 text-blue-300 border border-blue-800/60">
      ${tag}
    </span>
  `).join('');

  // Metrics
  modalMetrics.innerHTML = project.metrics.map(m => `
    <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
      <div class="text-[11px] font-mono uppercase text-slate-400 mb-1">${m.label}</div>
      <div class="text-base font-bold text-slate-100 font-mono">${m.value}</div>
    </div>
  `).join('');

  // Gallery
  if (project.gallery && project.gallery.length > 0) {
    modalGallery.classList.remove('hidden');
    modalGallery.innerHTML = `
      <h4 class="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">Evidencia Experimental & Diagramas</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${project.gallery.map(img => `
          <div class="rounded-xl overflow-hidden border border-slate-800 bg-slate-950/60 p-2">
            <img src="${img.src}" alt="${img.caption}" class="w-full h-auto rounded-lg object-contain max-h-72 bg-slate-900" loading="lazy">
            <p class="text-xs text-slate-400 mt-2 px-1 text-center">${img.caption}</p>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    modalGallery.classList.add('hidden');
    modalGallery.innerHTML = '';
  }

  // Repo notice
  if (project.repoPrivate) {
    modalRepoNotice.innerHTML = `
      <div class="flex items-center gap-3 p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs sm:text-sm">
        <svg class="w-5 h-5 flex-shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        <div>
          <span class="font-bold">Repositorio Privado:</span> El código fuente, pesos y memoria técnica están bajo control de autoría académica/propiedad personal. Disponible para evaluación técnica contactando a <a href="mailto:dvdvalls04@gmail.com?subject=Solicitud%20de%20Acceso%20al%20Repo%20${encodeURIComponent(project.title)}" class="underline font-semibold hover:text-white">dvdvalls04@gmail.com</a>.
        </div>
      </div>
    `;
  } else {
    modalRepoNotice.innerHTML = `
      <div class="flex items-center justify-between p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 text-blue-200 text-xs sm:text-sm">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Repositorio de código abierto accesible públicamente en GitHub.</span>
        </div>
        <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs">
          Ver en GitHub
        </a>
      </div>
    `;
  }

  // Switch to first tab
  switchModalTab('overview');

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

function switchModalTab(tabId) {
  const tabButtons = document.querySelectorAll('.modal-tab-btn');
  const tabPanels = document.querySelectorAll('.modal-tab-panel');

  tabButtons.forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('border-blue-500', 'text-blue-400');
      btn.classList.remove('border-transparent', 'text-slate-400');
    } else {
      btn.classList.remove('border-blue-500', 'text-blue-400');
      btn.classList.add('border-transparent', 'text-slate-400');
    }
  });

  tabPanels.forEach(panel => {
    if (panel.id === `tab-${tabId}`) {
      panel.classList.remove('hidden');
    } else {
      panel.classList.add('hidden');
    }
  });
}

// Toast notification helper
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
