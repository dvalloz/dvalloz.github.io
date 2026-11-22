// Portfolio Data and Interactive Functionality for David Valls Lozano

const projectsData = [
  {
    id: "ssb-oct",
    title: "Inteligencia artificial generativa para el cambio de dominio en imágenes oftalmológicas OCT",
    category: ["tfg"],
    type: "TFG · Investigación Avanzada",
    institution: "UPV (ETSIT) & Università di Bologna",
    badgeColor: "purple",
    repoType: "academic",
    repoUrl: "https://github.com/dvalloz/SSB-OCT",
    repoPrivate: true,
    pdfUrl: "assets/TFG_David_Valls_Memoria.pdf",
    pdfSummaryUrl: "assets/TFG_David_Valls_Resumen_Ejecutivo.pdf",
    pdfPresentationUrl: "assets/Presentacion_TFG.pdf",
    shortDescription: "Marco generativo para adaptación de dominio no supervisada entre 4 escáneres oftalmológicos OCT mediante Self-Supervised Semantic Bridge (SSB), Flow Matching y DINOv2.",
    featuredImage: "assets/images/tfg-benchmark.png",
    tags: ["PyTorch", "Flow Matching", "Brownian Bridge", "DINOv2 (ViT)", "Latent KL-VAE", "Medical AI", "ODE/SDE Solvers"],
    metrics: [
      { label: "Datasets Evaluados", value: "4 Escáneres" },
      { label: "Resolución Procesada", value: "256x256 px" },
      { label: "Anclaje Anatómico", value: "16 Canales PCA" },
      { label: "Integradores Numéricos", value: "Heun / RK4 / DDBM" }
    ],
    overview: `
      La Tomografía de Coherencia Óptica (OCT) es la técnica diagnóstica no invasiva por excelencia en oftalmología para evaluar la integridad morfométrica de la retina. No obstante, en la práctica clínica hospitalaria se presenta un cuello de botella crítico: la acusada disparidad en especificaciones físicas entre fabricantes de escáneres (longitud de onda de la fuente láser, apertura numérica, algoritmos de reconstrucción tomográfica y patrones estocásticos de ruido 'speckle').
      
      Esta heterogeneidad inter-dispositivo genera un severo 'domain shift'. Un modelo de Deep Learning entrenado con tomografías de un dispositivo de alta gama como Heidelberg Spectralis colapsa en precisión al evaluar pacientes escaneados en equipos portátiles o de diferentes tecnologías (Bioptigen, Zeiss Cirrus u Optovue). Además, al tratarse de pacientes distintos en cada centro, resulta matemáticamente inviable disponer de datos emparejados (paired datasets).
      
      Para solventar este desafío sin incurrir en alucinaciones clínicas, este Trabajo de Fin de Grado propone e implementa el marco 'Self-Supervised Semantic Bridge' (SSB): una arquitectura generativa fundamentada en la hipótesis del espacio latente anatómico invariante, formulada a través de puentes de difusión estocástica y Optimal Transport Flow Matching (OT-FM). El sistema logra traducir imágenes retinianas preservando milimétricamente la microestructura celular mientras adapta con fidelidad física la firma espectral de ruido propia de cada escáner.
    `,
    architecture: `
      La canalización computacional se estructura en cuatro subsistemas modulares de alta ingeniería:

      1. Pipeline de Preprocesamiento & Normalización Morfológica:
         - Detección y recorte adaptativo de la Región de Interés (ROI) retiniana para descartar zonas vítreas y esclerales vacías.
         - Filtrado morfológico mediante diferencia de gaussianas (Difference of Gaussians - DoG) y ecualización adaptativa de contraste local (CLAHE) para uniformizar los histogramas de reflectancia sin deformar las capas anatómicas a resolución 256x256 px.

      2. Extractor Anatómico Invariante (Vision Transformer DINOv2 + PCA):
         - Backbone autofundacional DINOv2 (ViT-B/14 preentrenado con aprendizaje autosupervisado, operando a 448x448 px) que extrae tensores densos de 768 características semánticas por parche.
         - Reducción de dimensionalidad matemática mediante Análisis de Componentes Principales (PCA) restringido a los 16 componentes con mayor varianza biológica explicada.
         - Este mapa de 16 canales actúa como anclaje semántico 'congelado' (prior invariante al escáner), garantizando que las microestructuras (membrana limitante interna, capa plexiforme externa y fotorreceptores) permanezcan inalteradas durante la síntesis.

      3. Compresión Espacial en Espacio Latente Determinista (KL-VAE):
         - Autoencoder variacional convolucional ajustado con peso de divergencia KL regularizada (b=0), garantizando una compresión invertible y determinista a dimensiones latentes z ∈ ℝ^(64×64×8).
         - Esta formulación reduce drásticamente el coste computacional frente al espacio de píxeles sin perder detalle de alta frecuencia ni bordes celulares.

      4. Puente de Difusión & Flow Matching (Brownian Bridge SSBridgeNet):
         - Red neuronal SSBridgeNet con arquitectura U-Net latente condicionada mediante AdaLN (Adaptive Layer Normalization) y concatenación espacial de 32 canales: tensor latente temporal z_t (8), tensor objetivo z_terminal (8) y mapa semántico invariante proyectado (16).
         - Formulación teórica de Brownian Bridge SDE:
           d x_t = [(y - x_t) / (1 - t)] dt + g(t) d W_t
           conectando de manera acoplada la distribución fuente p_0 con la distribución objetivo p_1.
         - Integración mediante solvers numéricos de orden superior: Euler-Maruyama, Heun (Runge-Kutta 2 predictor-corrector) y Runge-Kutta 4 (RK4).
         - Incorporación experimental del módulo Spectral Consistent Flow (SCFlow) para inferencia acelerada en un único paso de integración.
    `,
    results: `
      - Evaluación benchmark exhaustiva cruzando 4 fabricantes líderes internacionales en oftalmología:
        * Bioptigen -> Heidelberg Spectralis
        * Zeiss Cirrus -> Heidelberg Spectralis
        * Optovue -> Heidelberg Spectralis
      
      - Métricas cuantitativas de fidelidad:
        * Reducción acusada de Fréchet Inception Distance (FID) inter-dominio frente a baselines clásicos (CycleGAN, CUT, pix2pix y DDIB).
        * Retención estricta de Structural Similarity Index Measure (SSIM) en el canal de segmentación de capas retinianas (>0.89 en regiones foveales críticas).
      
      - Validación médica de no-alucinación:
        * Preservación intacta del espesor de la membrana limitante interna (ILM), capa de fibras nerviosas de la retina (RNFL) y epitelio pigmentario retiniano (RPE).
        * Adaptación fidedigna de la textura estocástica del 'speckle noise', emulando la física óptica real de los fotodetectores receptores.
    `,
    gallery: [
      { src: "assets/images/tfg-benchmark.png", caption: "Gran comparativa benchmark de adaptación entre fabricantes OCT" },
      { src: "assets/images/tfg-esquema.png", caption: "Diagrama arquitectónico del Self-Supervised Semantic Bridge (SSB)" },
      { src: "assets/images/tfg-diffusion.png", caption: "Evolución temporal de la trayectoria del puente de difusión (t=1 a t=0)" }
    ]
  },
  {
    id: "fintrack",
    title: "FinTrack: Plataforma de Finanzas con Contabilidad Neta Real",
    category: ["personales"],
    type: "Proyecto Personal · Arquitectura Limpia",
    institution: "Desarrollo de Software Independiente",
    badgeColor: "emerald",
    repoType: "personal",
    repoUrl: "https://github.com/dvalloz/fintrack-project",
    repoPrivate: true,
    shortDescription: "Gestor multicuenta inspirado en Trade Republic que erradica la falacia del gasto bruto mediante contabilidad True Net Spend, Open Banking PSD2 y Arquitectura Hexagonal estricta.",
    featuredImage: "assets/images/fintrack-preview.svg",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "PostgreSQL 16", "Drizzle ORM", "Open Banking PSD2", "Hexagonal Arch", "UUIDv7"],
    metrics: [
      { label: "Patrón Arquitectónico", value: "Hexagonal Estricto" },
      { label: "Frontend Stack", value: "Next.js 15 App Router" },
      { label: "Accesibilidad", value: "WCAG 2.2 AAA" },
      { label: "Claves Primarias", value: "UUIDv7 Ordenables" }
    ],
    overview: `
      La gran mayoría de plataformas bancarias y aplicaciones de finanzas personales contemporáneas adolecen de un fallo matemático elemental: computan las transacciones de forma aislada e indiferenciada. 
      
      Cuando un usuario adelanta un pago compartido (por ejemplo una cena de grupo de 160 € de la que sus acompañantes le transfieren posteriormente 120 € vía Bizum), el banco anota 160 € en concepto de 'gasto' y 120 € como 'ingreso extraordinario'. Esta distorsión contable —denominada 'la falacia del gasto bruto'— altera radicalmente los indicadores de consumo real, infla de manera espuria la tasa de ahorro y obliga al usuario a recurrir a hojas de cálculo externas.
      
      FinTrack solventa esta deficiencia desde los cimientos mediante la Ecuación Contable Maestra de Gasto Neto Real (True Net Spend). En este paradigma, los reembolsos recibidos amortizan directamente y de forma atómica la partida original del gasto, las transferencias entre cuentas propias se anulan patrimonialmente y solo se computan flujos genuinos de capital, ofreciendo una radiografía financiera 100% veraz.
    `,
    architecture: `
      Diseñado e implementado bajo los principios de Arquitectura Hexagonal (Ports & Adapters) y Domain-Driven Design (DDD):

      1. Capa de Dominio (Hexágono Central - Pure Core):
         - Cero dependencias externas de librerías, drivers de base de datos o APIs web.
         - Entidades ricas e inmutables: Transaction, SplitAllocation, Account, ReimbursementLink.
         - Value Objects para modelado monetario preciso con representación en céntimos enteros (evitando los desvíos numéricos por coma flotante IEEE 754).
         - Invariantes de negocio encapsuladas: validación de amortizaciones vinculadas que impiden reembolsos superiores a la partida base.

      2. Capa de Aplicación (Use Cases & Abstract Ports):
         - Casos de uso orquestados: ComputeTrueNetSpend, ReconcileSharedExpense, IngestBankSyncStream, GenerateNetWorthReport.
         - Puertos de salida (Driven Ports) definidos como interfaces TypeScript estrictas: TransactionRepositoryPort, OpenBankingSyncPort, IdentityProviderPort.

      3. Adaptadores Primarios (Drivers - Capa de Entrada):
         - Next.js 15 con App Router y Server Actions asíncronas para mutaciones atómicas sin sobrecarga de controladores REST redundantes.
         - React Server Components (RSC) para renderizado ultra-rápido en servidor con hidratación mínima en cliente.
         - Sistema de diseño 'Midnight Purple' con tokens oficiales, fuentes tabulares monoespaciadas y contraste certificado WCAG 2.2 AAA (>17:1 en indicadores clave).

      4. Adaptadores Secundarios (Driven - Persistencia & Integraciones):
         - Base de datos PostgreSQL 16 utilizando identificadores cronológicos ordenables UUIDv7, optimizando los árboles de índice B-tree frente a UUIDv4 aleatorios.
         - Drizzle ORM con tipado estricto 'end-to-end', esquemas relacionales normalizados y soporte para consultas analíticas agregadas.
         - Conector Open Banking PSD2 AISP (vía GoCardless) para sincronización periódica de movimientos bancarios sin credenciales sensibles.
    `,
    results: `
      - Supresión absoluta de discrepancias y descuadres contables en balances mensuales y proyecciones de ahorro a largo plazo.
      - Latencia media en consultas analíticas inferior a 5 milisegundos gracias a la indexación temporal de UUIDv7 en PostgreSQL.
      - Experiencia de usuario austera, sin ruido publicitario, orientada al análisis matemático calmado de las finanzas personales.
    `,
    gallery: [
      { src: "assets/images/fintrack-preview.svg", caption: "Dashboard de FinTrack: Desglose de Gasto Neto Real (True Net Spend), splits y arquitectura hexagonal" }
    ]
  },
  {
    id: "jarvis",
    title: "Jarvis: Asistente Autónomo con LLM & Tool Calling",
    category: ["personales"],
    type: "Proyecto Personal · Agente de IA",
    institution: "Desarrollo Independiente",
    badgeColor: "blue",
    repoType: "personal",
    repoUrl: "https://github.com/dvalloz/jarvis-project",
    repoPrivate: false,
    shortDescription: "Agente ejecutivo proactivo en Telegram con razonamiento LLM (Qwen-2.5 27B vía Groq), 18 esquemas JSON de Tool Calling, triggers asíncronos y sincronización con Google Calendar y PostgreSQL.",
    featuredImage: "assets/images/jarvis-preview.svg",
    tags: ["Python 3.12", "Telegram Bot API", "Groq API (Qwen-2.5)", "AsyncIO", "PostgreSQL 16", "SQLAlchemy", "APScheduler", "Docker"],
    metrics: [
      { label: "Catálogo de Tools", value: "18 Schemas JSON" },
      { label: "Inferencia LLM", value: "~200 ms (Groq)" },
      { label: "Crons Proactivos", value: "AsyncIOScheduler" },
      { label: "Infraestructura", value: "Docker Compose" }
    ],
    overview: `
      La mayoría de asistentes virtuales comerciales operan como chatbots puramente reactivos y conversacionales: responden preguntas en un hilo de chat pero carecen de capacidad ejecutiva y agencia sobre las herramientas del mundo real del usuario.
      
      Jarvis fue concebido como un agente ejecutivo autónomo completo que centraliza la gestión del tiempo, rutinas físicas adaptativas, seguimiento de medicación con verificación en dos fases, control de micropagos compartidos y supervisión proactiva de proyectos con fecha límite.
      
      Operando directamente sobre la interfaz accesible de Telegram, el sistema razona dinámicamente mediante el modelo de pesos abiertos Qwen-2.5 27B (ejecutado con latencias inferiores a 250 ms sobre chips LPU en Groq) y cuenta con un catálogo de 18 esquemas de Tool Calling para interactuar con bases de datos, APIs de Google Workspace y temporizadores en segundo plano.
    `,
    architecture: `
      Arquitectura en 5 capas desacopladas con programación puramente asíncrona (Python 3.12 + AsyncIO):

      1. Capa de Presentación (Telegram Bot API v21):
         - Interfaz conversacional rica compatible con teclados táctiles inline, comandos contextuales interactivos y confirmaciones de acciones críticas con botones de un toque.

      2. Capa de Seguridad & Control de Acceso (Zero-Trust):
         - Decorador personalizado @restricted aplicado en cada manejador de entrada: valida de forma estricta el Telegram User ID del emisor antes de procesar cualquier prompt o llamar a tools.
         - Cero exposición de información sensible mediante clientes API configurados en modo Zero-PII.

      3. Capa de Razonamiento Cognitivo (Groq API + Dynamic Prompting):
         - Modelo base Qwen-2.5 27B con motor de inferencia optimizado por hardware.
         - Generación dinámica de System Prompts que inyectan el estado temporal exacto (hora en Europa/Madrid), el estado actual de la agenda del día y el historial inmediato de tareas pendientes.

      4. Capa de Ejecución de Herramientas (18 Schemas JSON + Fallback Heurístico):
         - Catálogo tipado de funciones: google_calendar_query, google_calendar_insert_event, track_workout_session, register_medication_dose, add_microexpense, query_pending_deadlines, entre otras.
         - Validación rigurosa de parámetros de entrada con esquemas JSON formales.
         - Mecanismo de fallback robusto basado en expresiones regulares y parsing XML estructurado ante respuestas anómalas o caídas de conectividad del proveedor LLM.

      5. Capa de Persistencia & Planificación Proactiva:
         - Motor asíncrono PostgreSQL 16 con driver de alto rendimiento asyncpg, ORM SQLAlchemy 2.0 y control de migraciones con Alembic.
         - Orquestador de eventos en segundo plano APScheduler (AsyncIOScheduler) con tareas daemon:
           * Briefing matinal (08:00 AM): agenda, prioridades y previsión.
           * Polling periódico (cada 15 min): alertas de solapamiento de compromisos y recordatorios de medicación.
           * Briefing nocturno (22:30 PM): cierre de hábitos y balance del día.
         - Despliegue contenerizado y reproducible mediante Docker Compose con volumen persistente y monitorización de estado de contenedores.
    `,
    results: `
      - Tasa de éxito en resolución de intenciones y ejecución correcta de tool calling superior al 98.4%.
      - Eliminación absoluta de fricción en la gestión personal diaria: un solo mensaje natural en Telegram planifica eventos complejos sin abrir interfaces bancarias o de calendario.
      - Despliegue en producción estable 24/7 sin dependencias de servicios de suscripción de terceros.
    `,
    gallery: [
      { src: "assets/images/jarvis-preview.svg", caption: "Chat interactivo en Telegram con briefing matutino proactivo, teclado táctil inline y ejecución de function calling" }
    ]
  },
  {
    id: "segder-drm",
    title: "Sistema DRM con Criptografía Híbrida & Watermark Forense",
    category: ["academicos"],
    type: "Seguridad & Multimedia · Prototipo W3C",
    institution: "Universitat Politècnica de València",
    badgeColor: "amber",
    repoType: "academic",
    repoUrl: "https://github.com/dvalloz/Proyecto-Segder",
    repoPrivate: false,
    shortDescription: "Prototipo de distribución y protección de contenidos multimedia basado en el estándar W3C EME con RSA-2048 OAEP, AES-128 CBC, firmas digitales RSA-PSS y marca de agua dinámica.",
    featuredImage: "assets/images/segder-preview.svg",
    tags: ["Python 3.10+", "Criptografía Híbrida", "RSA-2048 OAEP", "AES-128 CBC", "RSA-PSS", "W3C EME", "Sockets TCP", "Forensic Watermarking"],
    metrics: [
      { label: "Cifrado Simétrico", value: "AES-128-CBC PKCS#7" },
      { label: "Canal de Claves", value: "RSA-2048 OAEP" },
      { label: "Autenticación", value: "Firmas RSA-PSS" },
      { label: "Especificación", value: "W3C EME Desacoplada" }
    ],
    overview: `
      La distribución comercial de contenidos audiovisuales de alta definición a través de redes públicas se enfrenta al dilema de proteger los derechos de autor (Digital Rights Management - DRM) sin comprometer el ancho de banda ni degradar la experiencia de usuario.
      
      Este proyecto reproduce de manera rigurosa la arquitectura criptográfica de estándares de la industria como Google Widevine o Apple FairPlay, siguiendo las directrices formales de la especificación W3C Encrypted Media Extensions (EME).
      
      El prototipo implementa una topología cliente-servidor con cifrado híbrido en la que los módulos de descifrado operan en aislamiento lógico total respecto al frontend. Además, incorpora un mecanismo activo de seguridad forense: inyección dinámica de marcas de agua invisibles con la identidad criptográfica del usuario directamente en el flujo de vídeo antes del cifrado, garantizando trazabilidad ante filtraciones no autorizadas o capturas de pantalla directas.
    `,
    architecture: `
      Topología distribuida cliente-servidor con estricto desacoplamiento de capas:

      1. Content Decryption Module (CDM Aislado en Cliente):
         - Entorno de ejecución seguro que almacena en memoria volátil protegida la clave privada RSA-2048 del cliente.
         - Generación de peticiones de licencia firmadas criptográficamente con RSA-PSS (SHA-256) para garantizar el no repudio y la autenticidad del terminal reproductor.
         - Recepción del payload cifrado con clave de sesión, descifrado local en memoria segura y renderizado directo al buffer de salida de vídeo sin permitir la inspección de fotogramas sin cifrar por parte del frontend.

      2. User Agent (Front-end & Transporte de Red):
         - Capa ligera encargada del transporte de paquetes mediante sockets TCP multihilo.
         - Inspección heurística de Magic Bytes binarios (encabezados JFIF para JPEG, chunks IHDR para PNG) para verificar la integridad del contenedor antes del pase al CDM.

      3. Servidor de Licencias (KMS - Key Management Server):
         - Valida la firma digital RSA-PSS de la solicitud de licencia contra la base de datos de claves públicas autorizadas.
         - Empaqueta la clave de sesión simétrica AES-128 y el Vector de Inicialización (IV) cifrados mediante RSA-2048 con relleno probabilístico OAEP (Optimal Asymmetric Encryption Padding) y función hash SHA-256.

      4. Servidor de Contenidos & Pipeline de Watermarking Forense:
         - Servidor de medios multihilo que gestiona peticiones concurrentes de streaming.
         - Inyector dinámico de marca de agua forense en tiempo real: altera sutilmente coeficientes espaciales de la imagen con el identificador único del usuario, timestamp de transmisión y dirección IP antes de proceder al cifrado.
         - Cifrador simétrico de alta velocidad utilizando AES-128 en modo CBC con relleno estándar PKCS#7.
    `,
    results: `
      - Garantía formal de confidencialidad, integridad y no repudio en todo el ciclo de vida del transporte multimedia.
      - Impacto mínimo en latencia de transmisión (<3% de overhead criptográfico), permitiendo reproducción continua de flujos audiovisuales.
      - Resistencia demostrada del watermarking forense frente a remuestreos, compresiones con pérdida y grabaciones directas de pantalla, permitiendo la identificación inequívoca del emisor de la fuga.
    `,
    gallery: [
      { src: "assets/images/segder-preview.svg", caption: "Diagrama formal de arquitectura W3C EME: Servidor de Contenidos, CDM aislado, UA y Servidor de Licencias (KMS)" }
    ]
  },
  {
    id: "matriculas-cv",
    title: "Benchmark de Detección & Reconocimiento de Matrículas (ALPR)",
    category: ["academicos"],
    type: "Computer Vision · Benchmark Empírico",
    institution: "Universitat Politècnica de València",
    badgeColor: "cyan",
    repoType: "academic",
    repoUrl: "https://github.com/dvalloz/Comparacion-de-detectores-de-matriculas",
    repoPrivate: false,
    shortDescription: "Estudio empírico comparativo entre visión clásica (OpenCV), OCR neuronal (EasyOCR), CNN propia en PyTorch y Ultralytics YOLOv8 para reconocimiento vehicular bajo condiciones adversas.",
    featuredImage: "assets/images/matriculas-yolo.png",
    tags: ["OpenCV", "PyTorch", "YOLOv8", "EasyOCR", "Computer Vision", "Deep Learning", "Benchmark", "Edge Computing"],
    metrics: [
      { label: "Métodos Evaluados", value: "4 Enfoques" },
      { label: "Detector SOTA", value: "Ultralytics YOLOv8" },
      { label: "Métricas", value: "IoU, CER, Latencia" },
      { label: "Entorno", value: "Python / PyTorch GPU" }
    ],
    overview: `
      El reconocimiento automático de matrículas de vehículos (Automatic License Plate Recognition - ALPR) constituye una tecnología estratégica en la gestión de ciudades inteligentes, sistemas de peaje de flujo libre y seguridad vial. 
      
      No obstante, en entornos reales de captura, los sistemas se enfrentan a escenarios severamente degradados: perspectivas angulares pronunciadas, sobreexposición solar, sombras intensas de edificios o árboles, suciedad en la chapa y desenfoque por movimiento.
      
      Este trabajo desarrolla un riguroso estudio experimental y empírico para cuantificar el compromiso clásico entre coste computacional, requerimiento de datos y robustez diagnóstica, evaluando 4 generaciones de soluciones técnicas: desde la visión artificial morfológica de los años 90 hasta las redes convolucionales y detectores 'single-stage' de última generación.
    `,
    architecture: `
      Implementación, entrenamiento y contraste comparativo de cuatro metodologías diferenciadas:

      1. Visión Clásica Morfológica & Gradientes (OpenCV):
         - Canalización con filtrado bilateral para atenuar ruido preservando bordes.
         - Detección de bordes verticales con operador Sobel (aprovechando la densidad de caracteres rectangulares de las matrículas).
         - Umbralización adaptativa de Otsu y operaciones morfológicas de clausura con elementos estructurantes rectangulares.
         - Filtrado de contornos candidatos por relación de aspecto (aspect ratio de 2.5 a 5.5) y área mínima.
         - Muy bajo coste de cómputo (viable en microcontroladores), pero alta sensibilidad a brillos e inclinaciones.

      2. Pipeline con Detector de Texto Neuronal (EasyOCR):
         - Arquitectura basada en CRAFT (Character Region Awareness for Text Detection) y red neuronal recurrente CRNN (CNN + LSTM + decodificación CTC).
         - Inferencia directa sobre la imagen global sin bounding box previo.
         - Excelente lectura de fuentes tipográficas limpias, pero degradación acusada de precisión en ángulos superiores a 35°.

      3. Red Convolucional Personalizada desde Cero (PyTorch):
         - Arquitectura CNN ad-hoc de 4 bloques convolucionales con capas Conv2D (3x3), Batch Normalization, funciones de activación LeakyReLU y MaxPooling.
         - Regularización mediante Dropout (0.3) y clasificadores densos completamente conectados.
         - Diseñada para analizar los límites de capacidad representacional de representaciones intermedias cuando se opera con datasets acotados y sin transfer learning previo.

      4. Ultralytics YOLOv8 con Transfer Learning (Deep Learning SOTA):
         - Fine-tuning del modelo YOLOv8n y YOLOv8s entrenado con data augmentation específica para escenarios de tráfico (Mosaic, MixUp, variaciones de brillo y rotaciones afines).
         - Detección precisa de la región de la matrícula combinada con un recortador automático que alimenta un motor OCR normalizado.
         - Inferencia optimizada para GPU y exportación a formatos embebidos (ONNX y TensorRT).
    `,
    results: `
      - YOLOv8 demostró una superioridad incontestable con un Intersection over Union (IoU) medio de 0.92 en condiciones lumínicas adversas y oclusiones parciales.
      - Comparativa rigurosa de tiempos de inferencia (FPS): el método clásico de OpenCV procesa a >60 FPS en CPU básica, mientras que YOLOv8n alcanza 45 FPS en hardware acelerado, ofreciendo el balance óptimo para despliegues en el 'edge' (cámaras inteligentes de tráfico).
      - Análisis de la tasa de error por carácter (Character Error Rate - CER), evidenciando que el preprocesamiento geométrico y rectificación de perspectiva es el factor más determinante para el éxito del OCR.
    `,
    gallery: [
      { src: "assets/images/matriculas-yolo.png", caption: "Inferencia y detección de bounding box con YOLOv8" },
      { src: "assets/images/matriculas-contornos.png", caption: "Procesamiento por contornos y gradientes morfológicos en OpenCV" },
      { src: "assets/images/matriculas-benchmark.png", caption: "Comparativa visual de resultados y lectura OCR" }
    ]
  },
  {
    id: "pid-turismo",
    title: "PID: Plataforma Inteligente de Destinos",
    category: ["profesionales"],
    type: "Proyecto Profesional · Smart Destination & Data Platform",
    institution: "Ministerio de Industria y Turismo / SEGITTUR · URBO",
    badgeColor: "emerald",
    repoType: "professional",
    repoUrl: "https://www.plataformainteligentedestinos.es/es",
    repoPrivate: true,
    shortDescription: "Ingesta, orquestación y analítica de datos territoriales para la Plataforma Inteligente de Destinos (SEGITTUR) en Álava, Cáceres, Granada y Getafe, integrando pipelines ETL con Pentaho, arquitectura FIWARE y cuadros de mando en URBO.",
    featuredImage: "assets/images/pid-preview.png",
    tags: ["Pentaho PDI (Kettle)", "FIWARE Orion", "Cygnus", "URBO", "Cubos OLAP", "JPivot", "REST APIs", "CDE Dashboards", "Smart Tourism"],
    metrics: [
      { label: "Destinos Desplegados", value: "Álava, Cáceres, Granada, Getafe" },
      { label: "Gestión de Contexto", value: "FIWARE Orion Broker" },
      { label: "Pipelines ETL / ELT", value: "Pentaho Kettle" },
      { label: "Analítica & BI", value: "Cubos OLAP & CDE" }
    ],
    overview: `
      La Plataforma Inteligente de Destinos (PID) es una iniciativa estratégica tractora promovida por el Ministerio de Industria y Turismo del Gobierno de España a través de SEGITTUR. Su misión es dotar a los destinos turísticos nacionales de una infraestructura tecnológica soberana que homogenice, integre e interprete grandes volúmenes de datos heterogéneos (flujos de movilidad urbana, ocupación hotelera, gasto turístico con tarjetas, afluencia en tiempo real, consumo de recursos y oferta cultural).

      En este marco, colaboro activamente en el despliegue e integración técnica para cuatro destinos emblemáticos con casuísticas territoriales diferenciadas: Álava, Cáceres, Granada y Getafe. El reto reside en la gran dispersión y disparidad de fuentes de datos (desde APIs REST de operadores y sensores IoT en vía pública hasta ficheros tabulares abiertos), requiriendo una estandarización rigurosa bajo modelos semánticos comunes (FIWARE Smart Data Models) para garantizar la interoperabilidad vertical y horizontal.
    `,
    architecture: `
      La solución técnica se implementa dentro del ecosistema URBO y se articula en cuatro capas fundamentales:

      1. Ingesta Heterogénea y Transformación de Datos (ETL/ELT con Pentaho PDI):
         - Diseño y ejecución de transformaciones y jobs en Pentaho Data Integration (Kettle) para extraer información periódica y en tiempo real desde APIs REST, bases de datos relacionales, feeds de transporte y fuentes abiertas.
         - Limpieza, reconciliación de entidades territoriales y conversión de formatos semiestructurados (JSON, XML, CSV) a especificaciones normalizadas.

      2. Gestión de Contexto en Tiempo Real (FIWARE Orion Context Broker):
         - Publicación y actualización continua de entidades de contexto mediante operaciones CRUD atómicas sobre Orion.
         - Modelado estructurado bajo FIWARE Smart Data Models (Destination, PointOfInterest, WeatherObserved, TrafficFlowObserved).
         - Configuración de suscripciones a eventos y notificaciones asíncronas para disparar flujos orientados a contexto.

      3. Persistencia Estructurada y Series Temporales (Cygnus):
         - Conexión de Cygnus como sink de persistencia conectado al Orion Broker.
         - Almacenamiento histórico de series temporales de indicadores de contexto para su explotación analítica posterior sin degradar la latencia del broker operacional.

      4. Modelado Multidimensional (Cubos OLAP & JPivot) y Business Intelligence (URBO):
         - Diseño y construcción de cubos analíticos OLAP para exploración multidimensional agregada (tiempo, geolocalización, tipología turística).
         - Integración de herramientas como JPivot para navegación por drill-down y slice-and-dice de métricas complejas.
         - Desarrollo de cuadros de mando interactivos (CDE - Community Dashboard Editor) en URBO, facilitando a los gestores de los destinos la monitorización visual y la toma de decisiones informada.
    `,
    results: `
      - Despliegue operativo de pipelines de datos y cuadros de mando adaptados a los requerimientos de gobernanza de Álava, Cáceres, Granada y Getafe.
      - Estandarización de más de 30 fuentes de datos heterogéneas bajo el marco semántico europeo FIWARE.
      - Habilitación de paneles analíticos interactivos y cubos OLAP con tiempos de consulta agregada sub-segundo para análisis de estacionalidad, aforos e impacto económico territorial.
    `,
    gallery: [
      { src: "assets/images/pid-preview.png", caption: "Identidad Visual y Arquitectura Conceptual de la Plataforma Inteligente de Destinos (SEGITTUR)" },
      { src: "assets/images/pid-dashboard.png", caption: "Interfaz Operativa y Visualización Territorial de la Plataforma de Destinos" }
    ]
  },
  {
    id: "impulso-vlci",
    title: "Impulso VLCi: Plataforma Smart City de València",
    category: ["profesionales"],
    type: "Proyecto Profesional · Smart City & IoT Platform",
    institution: "Ajuntament de València · Plataforma VLCi",
    badgeColor: "blue",
    repoType: "professional",
    repoUrl: "https://smartcity.valencia.es/vlci/plataforma-vlci/",
    repoPrivate: true,
    shortDescription: "Mantenimiento y evolución técnica de la plataforma de ciudad inteligente Impulso VLCi del Ayuntamiento de Valencia, orquestando flujos de datos urbanos mediante el estándar FIWARE, Pentaho PDI y gestión de contexto.",
    featuredImage: "assets/images/vlci-preview.jpg",
    tags: ["FIWARE Orion", "Cygnus", "Pentaho PDI (Kettle)", "Smart City", "Event-Driven", "IoT Context Broker", "URBO", "Open Data"],
    metrics: [
      { label: "Estándar Urbano", value: "FIWARE Compliant" },
      { label: "Motor de Contexto", value: "Orion Context Broker" },
      { label: "Persistencia", value: "Cygnus Historic Engine" },
      { label: "Ámbito Territorial", value: "Ciudad de València" }
    ],
    overview: `
      La plataforma VLCi (València Ciudad Inteligente) del Ajuntament de València fue la primera plataforma de ciudad inteligente de España 100% conforme a los estándares europeos de la Unión Europea y la iniciativa FIWARE. Conecta de forma centralizada la operativa de los servicios públicos municipales: sensores de tráfico y movilidad, redes de calidad del aire y ruido, alumbrado inteligente, gestión de residuos y eficiencia energética en edificios públicos.

      Participo en las labores de mantenimiento evolutivo, monitoreo de integridad y soporte de ingeniería de datos para la infraestructura de Impulso VLCi, garantizando la fiabilidad continua en la sincronización de flujos de contexto que alimentan el cuadro de mando de ciudad y el portal municipal de datos abiertos.
    `,
    architecture: `
      La arquitectura tecnológica se fundamenta en componentes open source certificados FIWARE:

      1. Orquestación del Contexto Urbano (FIWARE Orion Context Broker):
         - Mantenimiento y supervisión del bróker de contexto Orion para la gestión de entidades urbanas en tiempo real.
         - Ejecución y validación de operaciones CRUD masivas sobre entidades de sensores, paradas de transporte y estaciones meteorológicas.
         - Gestión y depuración de suscripciones a eventos de contexto (context subscriptions) para el procesamiento reactivo de incidencias urbanas.

      2. Ingesta y Pipelines de Sincronización (Pentaho Data Integration):
         - Actualización y monitoreo de transformaciones Kettle para la extracción programada desde sistemas departamentales y repositorios municipales.
         - Aseguramiento de la calidad de datos (validación de esquemas, detección de valores atípicos y normalización geográfica).

      3. Almacenamiento Histórico e Inteligencia de Datos (Cygnus & URBO):
         - Canalización continua de eventos de contexto hacia sistemas de persistencia histórica mediante Cygnus.
         - Consolidación de datos temporales para análisis longitudinal de tendencias de tráfico, emisiones ambientales y consumo de servicios públicos.
         - Soporte a la alimentación de cuadros de mando estratégicos de la plataforma URBO para el personal técnico municipal.
    `,
    results: `
      - Garantía de alta disponibilidad y consistencia en el procesamiento de millones de eventos y lecturas sensoriales urbanas.
      - Automatización de procesos de sincronización entre servicios operacionales municipales y la capa analítica de contexto.
      - Soporte continuo a la infraestructura Smart City que posiciona a Valencia como referente internacional en digitalización urbana abierta y estandarizada.
    `,
    gallery: [
      { src: "assets/images/vlci-preview.jpg", caption: "Plataforma Smart City Valencia · Arquitectura Thinking City Powered by FIWARE" },
      { src: "assets/images/vlci-idom.png", caption: "Despliegue y Consultoría Tecnológica Impulso VLCi (València Smart City)" }
    ]
  }
];

// Document ready initializations
document.addEventListener('DOMContentLoaded', () => {
  renderProjects('all');
  setupEventListeners();
  setupModalHandlers();
});

// Render Project Cards with Rich Visual Previews & Actions
function renderProjects(filter = 'all') {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  const f = (filter || 'all').toLowerCase().trim();

  let filtered = [];
  if (f === 'all') {
    filtered = projectsData;
  } else if (f === 'tfg') {
    // TFG: SSB-OCT
    filtered = projectsData.filter(p => p.id === 'ssb-oct' || (p.category && p.category.includes('tfg')));
  } else if (f === 'academicos' || f === 'academic' || f.includes('academ')) {
    // Proyectos Académicos: Matrículas y DRM
    filtered = projectsData.filter(p => p.id === 'segder-drm' || p.id === 'matriculas-cv' || (p.category && p.category.some(c => c.includes('academ')) && p.id !== 'ssb-oct'));
  } else if (f === 'personales' || f === 'personal' || f.includes('person')) {
    // Proyectos Personales: Jarvis y FinTrack
    filtered = projectsData.filter(p => p.id === 'jarvis' || p.id === 'fintrack' || (p.category && p.category.some(c => c.includes('person'))));
  } else if (f === 'profesionales' || f === 'profesional' || f.includes('profesion')) {
    // Proyectos Profesionales: PID y VLCi
    filtered = projectsData.filter(p => p.id === 'pid-turismo' || p.id === 'impulso-vlci' || (p.category && p.category.some(c => c.includes('profesion'))));
  } else {
    filtered = projectsData.filter(p => p.category && p.category.includes(f));
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-12 text-center rounded-2xl bg-[#0e121a] border border-neutral-800/80">
        <div class="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 mx-auto flex items-center justify-center mb-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </div>
        <h4 class="text-base font-bold text-white mb-1">Próximamente Proyectos Profesionales</h4>
        <p class="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
          Actualmente desempeñando tareas en ingeniería de datos. Próximamente se incorporarán casos de estudio y proyectos del ámbito profesional.
        </p>
      </div>
    `;
    return;
  }

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
  return `
    <article class="project-card group bg-[#0e121a] hover:bg-[#121722] rounded-2xl border border-neutral-800/80 hover:border-blue-500/50 transition-all duration-300 flex flex-col lg:flex-row overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/5">
      <!-- Left Side: Image / Mockup Preview -->
      <div class="lg:w-[42%] xl:w-[40%] relative bg-[#07090e] border-b lg:border-b-0 lg:border-r border-neutral-800/80 overflow-hidden cursor-pointer open-modal-trigger flex items-center justify-center min-h-[250px] sm:min-h-[290px] lg:min-h-[350px]" data-id="${project.id}">
        <img 
          src="${project.featuredImage}" 
          alt="${project.title}" 
          class="w-full h-full object-contain p-4 sm:p-6 group-hover:scale-[1.03] transition-transform duration-300"
          loading="lazy"
        >
        <div class="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none"></div>

        <!-- Quick inspect hint -->
        <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-black/80 text-blue-300 border border-blue-500/40 backdrop-blur-sm shadow-md">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            Ver Ficha Técnica
          </span>
        </div>
      </div>

      <!-- Right Side: Content Details -->
      <div class="lg:w-[58%] xl:w-[60%] p-6 sm:p-7 lg:p-8 flex flex-col justify-between">
        <div>
          <!-- Header Meta -->
          <div class="text-xs font-mono text-neutral-400 mb-2 font-medium flex items-center gap-2">
            <span class="text-blue-400 font-semibold">${project.type}</span>
            <span class="text-neutral-600">·</span>
            <span>${project.institution}</span>
          </div>

          <!-- Title -->
          <h3 
            class="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer open-modal-trigger mb-3 leading-snug"
            data-id="${project.id}"
          >
            ${project.title}
          </h3>

          <!-- Description -->
          <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5">
            ${project.shortDescription}
          </p>

          <!-- Key Metrics Strip (4 columns) -->
          <div class="p-3.5 rounded-xl bg-[#080b11] border border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-5">
            ${project.metrics.map(m => `
              <div>
                <span class="text-neutral-500 block text-[10px] uppercase font-mono tracking-wider">${m.label}</span>
                <span class="text-neutral-200 font-semibold font-mono text-xs sm:text-[13px]">${m.value}</span>
              </div>
            `).join('')}
          </div>

          <!-- Tags List -->
          <div class="flex flex-wrap gap-1.5 mb-6">
            ${project.tags.map(tag => `
              <span class="px-2.5 py-1 rounded-md text-[11px] font-mono bg-neutral-800/70 text-neutral-300 border border-neutral-700/50">
                ${tag}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Action Buttons Row -->
        <div class="pt-4 border-t border-neutral-800/80 flex flex-wrap items-center gap-3">
          <button 
            data-id="${project.id}" 
            class="open-modal-trigger inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm transition-all duration-200 shadow-sm"
          >
            <span>Explorar Ficha Técnica Extensa</span>
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>

          ${project.pdfUrl ? `
            <a 
              href="${project.pdfUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-700/80 hover:border-purple-600 font-medium text-xs sm:text-sm transition-all"
              title="Leer Memoria Oficial en el navegador"
            >
              <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              <span>Memoria Oficial (PDF)</span>
            </a>
          ` : ''}

          ${project.pdfPresentationUrl ? `
            <a 
              href="${project.pdfPresentationUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-700/80 hover:border-purple-600 font-medium text-xs sm:text-sm transition-all"
              title="Ver Presentación de Diapositivas en el navegador"
            >
              <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
              <span>Presentación (Slides)</span>
            </a>
          ` : ''}

          ${!project.repoPrivate ? `
            <a 
              href="${project.repoUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/80 font-medium text-xs sm:text-sm transition-all"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              <span>GitHub</span>
            </a>
          ` : ''}
        </div>
      </div>
    </article>
  `;
}

// Global filter trigger
window.filterProjects = function (category, element) {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(b => b.classList.remove('active'));
  if (element) {
    element.classList.add('active');
  } else {
    const targetBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
    if (targetBtn) targetBtn.classList.add('active');
  }
  renderProjects(category);
};

// Event Listeners Setup
function setupEventListeners() {
  // Category filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const category = btn.getAttribute('data-filter');
      window.filterProjects(category, btn);
    });
  });

  // Copy Email Buttons
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = 'dvdvalls04@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('¡Email copiado al portapapeles!');
      }).catch(() => {
        showToast('dvdvalls04@gmail.com');
      });
    });
  });
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
  modalOverview.innerHTML = `<p class="whitespace-pre-line text-neutral-300 leading-relaxed text-sm sm:text-base">${project.overview.trim()}</p>`;
  modalArch.innerHTML = `<pre class="bg-[#080b11] p-4 sm:p-5 rounded-xl border border-neutral-800 text-neutral-300 text-xs sm:text-sm font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">${project.architecture.trim()}</pre>`;
  modalResults.innerHTML = `<div class="whitespace-pre-line text-neutral-300 leading-relaxed text-sm sm:text-base">${project.results.trim()}</div>`;

  // Tags
  modalTags.innerHTML = project.tags.map(tag => `
    <span class="px-2.5 py-1 rounded-md bg-blue-950/60 text-blue-300 border border-blue-800/60 font-mono text-xs">
      ${tag}
    </span>
  `).join('');

  // Metrics
  modalMetrics.innerHTML = project.metrics.map(m => `
    <div class="bg-[#0b0e15] p-3 rounded-xl border border-neutral-800 text-center">
      <div class="text-[11px] font-mono uppercase text-neutral-400 mb-1">${m.label}</div>
      <div class="text-sm sm:text-base font-bold text-white font-mono">${m.value}</div>
    </div>
  `).join('');

  // Gallery
  if (project.gallery && project.gallery.length > 0) {
    modalGallery.classList.remove('hidden');
    modalGallery.innerHTML = `
      <h4 class="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-3">Evidencia Experimental, UI &amp; Diagramas Arquitectónicos</h4>
      <div class="grid grid-cols-1 ${project.gallery.length > 1 ? 'md:grid-cols-2' : ''} gap-4">
        ${project.gallery.map(img => `
          <div class="rounded-xl overflow-hidden border border-neutral-800 bg-[#07090e] p-2">
            <a href="${img.src}" target="_blank" rel="noopener noreferrer" class="block group/img">
              <img src="${img.src}" alt="${img.caption}" class="w-full h-auto rounded-lg object-contain max-h-80 bg-black/40 group-hover/img:opacity-90 transition-opacity" loading="lazy">
            </a>
            <p class="text-xs text-neutral-400 mt-2 px-1 text-center font-mono">${img.caption}</p>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    modalGallery.classList.add('hidden');
    modalGallery.innerHTML = '';
  }

  // Repository & PDF Notice Block
  let actionHtml = '';

  // If project has PDF (like SSB-OCT)
  if (project.pdfUrl) {
    actionHtml += `
      <div class="p-4 rounded-xl bg-purple-950/30 border border-purple-800/60 text-purple-200 text-xs sm:text-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div class="flex items-start gap-3">
          <svg class="w-6 h-6 flex-shrink-0 text-purple-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <div>
            <div class="font-bold text-white">Memoria Oficial del Trabajo de Fin de Grado (UPV)</div>
            <div class="text-xs text-purple-300 mt-0.5">Accede a la memoria académica completa en PDF (37.7 MB) directamente en tu navegador.</div>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <a href="${project.pdfUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs shadow-sm transition-colors whitespace-nowrap">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            <span>Memoria Completa</span>
          </a>
          ${project.pdfPresentationUrl ? `
            <a href="${project.pdfPresentationUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-700/80 font-medium text-xs transition-colors whitespace-nowrap">
              <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
              <span>Presentación (Slides)</span>
            </a>
          ` : ''}
          ${project.pdfSummaryUrl ? `
            <a href="${project.pdfSummaryUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs border border-neutral-700 transition-colors whitespace-nowrap">
              <span>Resumen Ejecutivo</span>
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }

  // Repository Notice
  if (project.repoPrivate) {
    actionHtml += `
      <div class="flex items-center gap-3 p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 text-amber-200 text-xs sm:text-sm">
        <svg class="w-5 h-5 flex-shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        <div>
          <span class="font-bold">Repositorio Privado:</span> Código fuente y modelos bajo autoría académica o privada. Disponible para evaluación técnica contactando a <a href="mailto:dvdvalls04@gmail.com?subject=Solicitud%20de%20Acceso%20al%20Repo%20${encodeURIComponent(project.title)}" class="underline font-semibold hover:text-white">dvdvalls04@gmail.com</a>.
        </div>
      </div>
    `;
  } else {
    actionHtml += `
      <div class="flex items-center justify-between p-4 rounded-xl bg-blue-950/30 border border-blue-800/60 text-blue-200 text-xs sm:text-sm">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Repositorio de código abierto accesible públicamente en GitHub.</span>
        </div>
        <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs whitespace-nowrap">
          Ver Repositorio en GitHub
        </a>
      </div>
    `;
  }

  modalRepoNotice.innerHTML = actionHtml;

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
      btn.classList.remove('border-transparent', 'text-neutral-400');
    } else {
      btn.classList.remove('border-blue-500', 'text-blue-400');
      btn.classList.add('border-transparent', 'text-neutral-400');
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
  }, 3000);
}
