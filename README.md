# 💼 Portfolio Profesional - David Valls Lozano

Sitio web de portfolio técnico diseñado para exhibir proyectos de ingeniería de software, investigación en inteligencia artificial generativa, visión por computador y arquitecturas de producción. Optimizado para enlazar en **LinkedIn** y en el **Currículum Vitae (CV)**.

---

## 🚀 Proyectos Incluidos

1. **SSB-OCT (Trabajo de Fin de Grado en IA Médica)**:
   - *Inteligencia artificial generativa para el cambio de dominio en imágenes oftalmológicas OCT*.
   - Self-Supervised Semantic Bridge (SSB), Brownian Bridge Diffusion, Optimal Transport Flow Matching (OT-FM), DINOv2 (ViT), Latent KL-VAE determinista y Solvers Heun/RK4.
   - Benchmark entre 4 escáneres retinianos comerciales (Bioptigen, Spectralis, Cirrus, Optovue).

2. **FinTrack (Plataforma Financiera Personal)**:
   - Contabilidad neta real (*True Net Spend*) inspirada en el minimalismo analítico de Trade Republic.
   - Arquitectura Hexagonal estricta (Puertos y Adaptadores), Next.js 15 App Router, TypeScript, Tailwind CSS (*Midnight Purple* con contraste WCAG 2.2 AAA), PostgreSQL 16 con UUIDv7, Drizzle ORM y Open Banking PSD2 AISP (GoCardless).

3. **Jarvis (Asistente Autónomo Personal en Telegram)**:
   - Agente autónomo con razonamiento LLM (Qwen-2.5 27B vía Groq API) y 18 esquemas JSON de Tool Calling.
   - Integración con Google Calendar OAuth2, Gmail API (Zero-PII), persistencia en PostgreSQL 16 con SQLAlchemy async, parrilla proactiva con APScheduler y despliegue en Docker Compose.

4. **Sistema DRM con Criptografía Híbrida (Proyecto Segder)**:
   - Prototipo de distribución y protección multimedia basado en el estándar W3C Encrypted Media Extensions (EME).
   - Negociación de claves RSA-2048 OAEP (SHA-256) + cifrado de flujo con AES-128 CBC PKCS#7 + firmas no repudiables RSA-PSS.
   - Servidor TCP con inyección de marca de agua forense dinámica (*Watermarking*) y Content Decryption Module (CDM) aislado.

5. **Benchmark de Detección & Reconocimiento de Matrículas (ALPR)**:
   - Estudio comparativo entre visión clásica (OpenCV con contornos y operadores morfológicos), EasyOCR preentrenado, CNN convolucional desde cero en PyTorch y Ultralytics YOLOv8 con Transfer Learning.
   - Evaluación exhaustiva de IoU, tiempos de inferencia y tasa de error de caracteres (CER).

---

## 📂 Estructura del Portfolio

```text
C:\Users\dvdva\Documents\portfolio\
├── index.html                   # Página principal interactiva (SPA centrada en proyectos)
├── README.md                    # Guía de uso y despliegue
├── assets/
│   ├── David_Valls_Lozano_CV.pdf# Currículum en PDF listo para descarga directa
│   ├── TFG_David_Valls_Memoria.pdf # Memoria académica completa del TFG (37.7 MB)
│   ├── TFG_David_Valls_Resumen_Ejecutivo.pdf # Resumen ejecutivo del TFG
│   ├── css/
│   │   └── styles.css           # Estilos limpios craft, sin clichés de IA
│   ├── js/
│   │   └── main.js              # Datos, renderizado de cards con imágenes y modal
│   └── images/
│       ├── avatar_0.png         # Fotografía de perfil profesional
│       ├── fintrack-preview.svg # Mockup UI de FinTrack (True Net Spend & Hexagonal)
│       ├── jarvis-preview.svg   # Interfaz Telegram y Tool Calling de Jarvis
│       ├── segder-preview.svg   # Diagrama criptográfico W3C EME & Forensic Watermark
│       ├── tfg-benchmark.png    # Resultados benchmark de SSB-OCT (4 escáneres)
│       ├── tfg-esquema.png      # Arquitectura del modelo del TFG (SSBridgeNet)
│       ├── tfg-diffusion.png    # Proceso de difusión estocástica
│       ├── matriculas-yolo.png  # Detección YOLOv8
│       ├── matriculas-contornos.png # Morfología y gradientes OpenCV
│       └── matriculas-benchmark.png # Comparativa de detectores ALPR
```

---

## 🌐 ¿Cómo Publicar el Portfolio en Internet Gratis?

Tienes tres opciones recomendadas, gratuitas y de despliegue en 2 minutos:

### Opción 1: GitHub Pages (La más recomendada para desarrolladores)
1. Entra en tu cuenta de GitHub y crea un nuevo repositorio llamado:
   - `dvalloz.github.io` (se publicará directamente en la raíz `https://dvalloz.github.io`)
   - O bien un repositorio llamado `portfolio` (se publicará en `https://dvalloz.github.io/portfolio`).
2. Abre la terminal en esta carpeta y sube los archivos:
   ```bash
   cd C:\Users\dvdva\Documents\portfolio
   git init
   git add .
   git commit -m "Initial commit: David Valls portfolio"
   git branch -M main
   git remote add origin https://github.com/dvalloz/dvalloz.github.io.git
   git push -u origin main
   ```
3. En GitHub, ve a **Settings** > **Pages** > En **Branch** selecciona `main` y guarda. En menos de un minuto tu portfolio estará online.

### Opción 2: Vercel (Un solo clic)
1. Entra en [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **Add New** > **Project** y selecciona el repositorio de tu portfolio.
3. Haz clic en **Deploy**. Te dará un enlace instantáneo tipo `davidvalls.vercel.app` con certificado SSL gratuito y rendimiento ultra rápido.

### Opción 3: Netlify Drop (Sin terminal)
1. Entra en [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra la carpeta `portfolio` directamente al navegador.
3. Te generará una URL pública al instante.

---

## 🔗 Dónde Linkearlo para Maximizar el Impacto

### 1. En tu perfil de LinkedIn:
- **Encabezado principal (Bajo tu nombre)**: Añade el enlace a tu portfolio como "Sitio web del perfil" (Personaliza el texto del enlace como `🌐 Portfolio de Proyectos`).
- **Sección "Destacado" (Featured)**: Crea una publicación o añade un enlace directo a tu portfolio con el título: *"Portfolio de Ingeniería en IA & Software: Proyectos, TFG e Investigaciones"*.
- **En la sección Acerca de**: Menciona *"Puedes consultar el desglose técnico y demostraciones de mis proyectos en mi portfolio: [URL]"*.

### 2. En tu Currículum Vitae (PDF):
- En la cabecera (junto a tu teléfono, email y LinkedIn), añade un icono o enlace clicable:
  `🌐 Portfolio: https://dvdvalls04.github.io`

---

## 🛠️ Personalización Rápida
- **Cambiar enlaces de GitHub**: En `assets/js/main.js`, en cada objeto de `projectsData` puedes cambiar la clave `repoUrl` si quieres apuntar a una URL específica, o cambiar `repoPrivate: false` si en el futuro decides hacer público algún repositorio.
- **Actualizar CV**: Si actualizas tu currículum, simplemente reemplaza el archivo en `assets/David_Valls_Lozano_CV.pdf` con el mismo nombre.
- **Modificar datos de contacto**: Todo está centralizado en `index.html` y en `assets/js/main.js`.
