# Go For Life México - Landing Page

Sitio web institucional para Go For Life México, empresa especializada en el diseño, fabricación y servicio de sistemas de purificación de agua para consumo humano. El proyecto presenta dos modelos de negocio: Purificadoras Tradicionales y Ventanas Automáticas 24/7.

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características Principales](#características-principales)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
  - [Instalación Local](#instalación-local)
  - [Instalación con Docker](#instalación-con-docker)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Configuración de Google Analytics](#configuración-de-google-analytics)
- [Sistema de Formularios](#sistema-de-formularios)
- [Despliegue](#despliegue)
- [Mantenimiento y Desarrollo](#mantenimiento-y-desarrollo)
- [Resolución de Problemas](#resolución-de-problemas)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Descripción General

Landing page moderna y responsiva construida con Vite, diseñada para convertir visitantes en clientes potenciales mediante formularios de contacto, integración con WhatsApp y seguimiento de conversiones con Google Ads. La aplicación presenta un diseño oscuro profesional con animaciones fluidas y optimizaciones de rendimiento.

**Propósito del Proyecto:**
- Captar leads cualificados interesados en adquirir equipos de purificación de agua
- Mostrar modelos de negocio disponibles (Tradicional y Ventanas Automáticas)
- Facilitar el contacto directo mediante WhatsApp, teléfono y formulario web
- Trackear conversiones para optimización de campañas publicitarias

## Características Principales

### Interfaz de Usuario
- Diseño responsivo adaptado a dispositivos móviles, tablets y desktop
- Esquema de colores oscuro con acentos en verde y naranja
- Animaciones de scroll suaves mediante Intersection Observer API
- Preloader animado con barra de progreso personalizada
- Navegación fija con comportamiento adaptativo según scroll

### Secciones Principales
1. **Hero Section**: Video de fondo con overlay y CTA destacados
2. **Beneficios**: Grid de 4 tarjetas con iconos animados
3. **Modelos de Negocio**: Comparativa visual de ambos equipos con precios y características
4. **Tecnología**: Descripción del sistema de monedero electrónico exclusivo
5. **Testimonios**: Carrusel de opiniones de clientes con galería de imágenes
6. **Formulario de Contacto**: Sistema completo con validación y envío por email

### Optimizaciones
- Lazy loading de imágenes y recursos
- Carga diferida de fuentes de Google
- Minificación y bundling con Vite
- Imágenes WebP para mejor compresión
- Preload de recursos críticos

## Arquitectura del Proyecto

El proyecto sigue una arquitectura modular basada en componentes JavaScript y partials SCSS:

```
Landing Page (Vite)
├── Frontend (HTML/SCSS/JS)
│   ├── Módulos JavaScript independientes
│   ├── Estilos SCSS modulares
│   └── Assets optimizados
├── Backend (PHP)
│   ├── Envío de formularios con PHPMailer
│   └── Validación server-side
└── Contenedorización (Docker)
    ├── Nginx para servir archivos estáticos
    └── PHP-FPM para procesamiento de formularios
```

## Tecnologías Utilizadas

### Frontend
- **Vite 7.1.7**: Herramienta de construcción y bundler moderna
- **Sass**: Preprocesador CSS con arquitectura modular
- **JavaScript ES6+**: Módulos nativos sin frameworks
- **Font Awesome 6.4.0**: Biblioteca de iconos
- **Google Fonts**: Rubik y Roboto

### Backend
- **PHP**: Procesamiento server-side para formularios
- **PHPMailer**: Biblioteca SMTP para envío de correos
- **IONOS SMTP**: Servidor de correo configurado

### Infraestructura
- **Docker & Docker Compose**: Contenedorización de la aplicación
- **Node.js 20 Alpine**: Imagen base ligera para desarrollo
- **Nginx**: Servidor web para producción (opcional)

### Análisis y Marketing
- **Google Ads (gtag.js)**: Seguimiento de conversiones
- **Event Tracking**: Conversiones personalizadas por tipo de interacción

## Requisitos Previos

### Para Desarrollo Local
- Node.js versión 18.x o superior
- npm versión 9.x o superior
- Servidor PHP 7.4+ con extensión SMTP (para formularios)
- Git para control de versiones

### Para Docker
- Docker Engine 20.x o superior
- Docker Compose 2.x o superior
- 2GB de espacio en disco disponible

### Opcional
- Visual Studio Code con extensiones: Vite, SCSS IntelliSense, ESLint
- Cuenta de Google Ads para tracking de conversiones
- Cuenta SMTP para envío de correos

## Instalación

### Instalación Local

#### 1. Clonar el Repositorio

```bash
git clone https://github.com/Santiago-Penaranda-Peinado/GoForLife-Landing.git
cd GoForLife-Landing
```

#### 2. Instalar Dependencias

```bash
npm install
```

Este comando instalará:
- Vite como herramienta de desarrollo
- Sass para compilación de estilos
- Todas las dependencias declaradas en package.json

#### 3. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

El servidor se iniciará en:
- **URL Local**: http://localhost:5173
- **URL Red**: http://[tu-ip-local]:5173 (accesible desde otros dispositivos en la misma red)

#### 4. Compilar para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`:
- HTML minificado
- CSS combinado y minificado
- JavaScript bundled y minificado
- Assets optimizados

#### 5. Previsualizar Build de Producción

```bash
npm run preview
```

Sirve los archivos de `dist/` en http://localhost:4173 para verificar el build antes del despliegue.

### Instalación con Docker

Docker permite ejecutar el proyecto sin instalar Node.js localmente, manteniendo un entorno consistente.

#### 1. Clonar el Repositorio

```bash
git clone https://github.com/Santiago-Penaranda-Peinado/GoForLife-Landing.git
cd GoForLife-Landing
```

#### 2. Construir y Levantar Contenedores

```bash
docker-compose up --build
```

Este comando:
- Construye la imagen Docker basada en Node 20 Alpine
- Instala dependencias dentro del contenedor
- Monta el directorio actual como volumen para desarrollo
- Expone el puerto 5173 en tu máquina

#### 3. Acceder a la Aplicación

Abre tu navegador en:
- **Desarrollo**: http://localhost:5173
- **Desde otros dispositivos**: http://[ip-del-host]:5173

#### 4. Detener los Contenedores

```bash
docker-compose down
```

Para eliminar también los volúmenes:

```bash
docker-compose down -v
```

#### 5. Ver Logs del Contenedor

```bash
docker-compose logs -f app
```

#### 6. Ejecutar Comandos dentro del Contenedor

```bash
# Acceder a la shell del contenedor
docker-compose exec app sh

# Instalar nueva dependencia
docker-compose exec app npm install [paquete]

# Ejecutar build de producción
docker-compose exec app npm run build
```

## Scripts Disponibles

Scripts definidos en `package.json`:

### `npm run dev`
Inicia el servidor de desarrollo de Vite con hot-reload.

**Uso:**
```bash
npm run dev
```

**Características:**
- Hot Module Replacement (HMR)
- Recarga automática al guardar cambios
- Source maps para debugging
- Compilación incremental ultrarrápida

### `npm run build`
Compila el proyecto para producción.

**Uso:**
```bash
npm run build
```

**Proceso:**
1. Limpia el directorio `dist/`
2. Compila Sass a CSS
3. Transpila y minifica JavaScript
4. Optimiza imágenes y assets
5. Genera archivos HTML con referencias actualizadas

**Salida:**
```
dist/
├── index.html
├── gracias.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── public/
    └── [archivos copiados]
```

### `npm run preview`
Sirve la versión de producción localmente.

**Uso:**
```bash
npm run build
npm run preview
```

**Puerto:** http://localhost:4173

Útil para:
- Probar el build antes de desplegar
- Verificar optimizaciones de producción
- Comprobar rutas y enlaces

## Estructura del Proyecto

```
GoForLife-Landing/
│
├── public/                          # Archivos estáticos servidos directamente
│   ├── enviar-formulario.php       # Script PHP para envío de correos
│   ├── carrusel/                   # Imágenes del carrusel de testimonios
│   ├── hero/                       # Videos y poster del hero section
│   │   ├── goforlife-hero-background-1900x600.mp4
│   │   ├── banner-responsive-gfl.mp4
│   │   └── goforlife-hero-poster.png
│   ├── images/                     # Imágenes de productos y modelos
│   │   ├── modelo-tradicional.jpg
│   │   ├── ventanas-automaticas.jpg
│   │   └── ventanas-despachadoras-de-agua.webp
│   ├── logo/                       # Logos y favicons
│   │   └── goforlifeMexico-logo.png
│   └── phpmailer/                  # Biblioteca PHPMailer
│       ├── PHPMailer.php
│       ├── SMTP.php
│       ├── Exception.php
│       └── ...
│
├── src/                            # Código fuente de la aplicación
│   ├── main.js                     # Punto de entrada JavaScript
│   │
│   ├── js/                         # Módulos JavaScript
│   │   └── modules/
│   │       ├── animations.js       # Animaciones de scroll
│   │       ├── contact-animations.js  # Animaciones del formulario
│   │       ├── header.js           # Comportamiento del header
│   │       ├── image-gallery.js    # Galería de imágenes modal
│   │       ├── popup-buenfin.js    # Popup promocional (actualmente deshabilitado)
│   │       ├── tecnologia-enhanced.js  # Efectos de la sección tecnología
│   │       └── testimonios.js      # Carrusel de testimonios
│   │
│   └── scss/                       # Estilos Sass
│       ├── main.scss               # Archivo principal de estilos
│       └── partials/               # Partials modulares
│           ├── _variables.scss     # Variables globales (colores, fuentes)
│           ├── _mixins.scss        # Mixins reutilizables
│           ├── _base.scss          # Reset y estilos base
│           ├── _layout.scss        # Layout general y contenedores
│           ├── _preloader.scss     # Estilos del preloader
│           ├── _header.scss        # Header y navegación
│           ├── _hero.scss          # Hero section
│           ├── _benefits.scss      # Sección de beneficios
│           ├── _models.scss        # Sección de modelos
│           ├── _tecnologia.scss    # Sección de tecnología
│           ├── _testimonios.scss   # Carrusel de testimonios
│           ├── _contact.scss       # Formulario de contacto
│           ├── _footer.scss        # Footer
│           ├── _floating-buttons.scss  # Botones flotantes
│           └── _popup-buenfin.scss # Popup promocional
│
├── index.html                      # Página principal
├── gracias.html                    # Página de agradecimiento post-formulario
│
├── vite.config.js                  # Configuración de Vite
├── package.json                    # Dependencias y scripts npm
├── package-lock.json               # Lockfile de dependencias
│
├── Dockerfile                      # Imagen Docker para desarrollo
├── docker-compose.yml              # Orquestación de contenedores
│
├── LICENSE                         # Licencia GNU GPL v2
└── README.md                       # Este archivo
```

### Descripción de Directorios Clave

#### `/public`
Archivos servidos directamente sin procesamiento. Vite copia este directorio tal cual al build.

**Contenido importante:**
- `enviar-formulario.php`: Backend de formularios con PHPMailer
- `/hero`: Videos optimizados para desktop y móvil
- `/images`: Imágenes de productos en formatos optimizados (JPG, WebP)
- `/phpmailer`: Biblioteca completa para envío SMTP

#### `/src`
Código fuente procesado y bundled por Vite.

**main.js**: Importa todos los módulos y estilos, inicializa la aplicación.

**js/modules/**: Módulos JavaScript independientes con responsabilidades únicas:
- Cada módulo exporta una función `init*()` llamada desde main.js
- Utiliza Intersection Observer para animaciones performantes
- Event listeners optimizados con delegation cuando es posible

**scss/partials/**: Arquitectura modular de estilos:
- Variables centralizadas para mantener consistencia
- Mixins para responsive design y efectos reutilizables
- Un partial por sección/componente principal

## Funcionalidades Implementadas

### 1. Sistema de Navegación

**Características:**
- Navegación fija (sticky) con transición de fondo al hacer scroll
- Menu hamburguesa responsivo para móviles
- Smooth scroll a secciones
- Indicador visual de sección activa

**Archivo:** `src/js/modules/header.js`

**Comportamiento:**
```javascript
// Header se vuelve opaco después de 100px de scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  }
});
```

### 2. Preloader Animado

**Características:**
- Barra de progreso con easing suave
- Mensajes dinámicos rotatorios
- Logo animado con spinner
- Tiempo de carga mínimo garantizado

**Archivo:** `src/main.js` (función `initPreloader`)

**Timing:**
- Duración base: 2 segundos
- Timeout máximo: 8 segundos
- Mensajes cambian cada 25% de progreso

### 3. Hero Section Adaptativo

**Características:**
- Video de fondo con fallback a imagen
- Videos diferentes para desktop y móvil
- Overlay oscuro para legibilidad
- Indicador de scroll animado

**Archivos:**
- Estructura: `index.html` (section#hero)
- Estilos: `src/scss/partials/_hero.scss`
- Videos: `public/hero/`

**Videos utilizados:**
- Desktop: `goforlife-hero-background-1900x600.mp4`
- Móvil: `banner-responsive-gfl.mp4`
- Poster: `goforlife-hero-poster.png`

### 4. Animaciones de Scroll

**Características:**
- Intersection Observer API para rendimiento óptimo
- Animaciones escalonadas en grids
- Fade-in y slide-up effects
- Threshold configurable por sección

**Archivo:** `src/js/modules/animations.js`

**Implementación:**
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
```

### 5. Carrusel de Testimonios

**Características:**
- Autoplay con pausa en hover
- Navegación por flechas
- Indicadores de paginación
- Transiciones suaves
- Touch-friendly en móviles

**Archivo:** `src/js/modules/testimonios.js`

**Controles:**
- Autoplay interval: 5 segundos
- Botones prev/next
- Dots de navegación directa

### 6. Galería Modal de Imágenes

**Características:**
- Modal full-screen con overlay
- Navegación entre imágenes
- Contador de posición
- Cierre con ESC o clic en overlay
- Lazy loading de imágenes

**Archivo:** `src/js/modules/image-gallery.js`

**Funcionalidad:**
```javascript
// Abrir modal al hacer clic en imagen de galería
galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    openModal(img.src, img.alt, currentIndex);
  });
});
```

### 7. Formulario de Contacto

**Características:**
- Validación HTML5 nativa
- Campos requeridos marcados con asterisco
- Select personalizados para modelo e inversión
- Envío asíncrono con feedback visual
- Redirección a página de agradecimiento

**Archivos:**
- Frontend: `index.html` (section#contacto)
- Backend: `public/enviar-formulario.php`
- Estilos: `src/scss/partials/_contact.scss`

**Campos del formulario:**
- Nombre completo (requerido)
- Teléfono 10 dígitos (requerido)
- Email (requerido)
- Modelo de interés (requerido)
- Inversión aproximada (opcional)
- Ciudad (opcional)
- Mensaje (opcional)

**Validaciones:**
```php
// Server-side validation
if (empty($nombre) || empty($telefono) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die('Error: Campos requeridos incompletos');
}
```

### 8. Botones Flotantes de Contacto

**Características:**
- Botones fijos en viewport
- WhatsApp, teléfono y email
- Tracking de conversiones integrado
- Animación hover
- Z-index alto para visibilidad constante

**Archivo:** `src/scss/partials/_floating-buttons.scss`

**Conversiones trackeadas:**
- WhatsApp: `gtag_report_conversion_whatsapp()`
- Llamada: `gtag_report_conversion_call()`

### 9. Sistema de Conversiones

**Implementado en:** `index.html` y `gracias.html`

**Eventos de conversión configurados:**

1. **Conversión WhatsApp**
   - ID: `AW-17575125653/SZa7CLuf0rUbEJXFvLxB`
   - Trigger: Clic en cualquier botón de WhatsApp
   - Timeout: 2 segundos

2. **Conversión Llamada**
   - ID: `AW-17575125653/BA5XCJKkxrUbEJXFvLxB`
   - Trigger: Clic en botón de llamada
   - Timeout: 2 segundos

3. **Conversión Modelo Tradicional**
   - ID: `AW-17575125653/mZbUCL_M2r0bEJXFvLxB`
   - Trigger: Clic en CTA de modelo tradicional
   - Timeout: 2 segundos

4. **Conversión Ventanas Automáticas**
   - ID: `AW-17575125653/I2gVCMLM2r0bEJXFvLxB`
   - Trigger: Clic en CTA de ventanas automáticas
   - Timeout: 2 segundos

5. **Conversión Lead (Formulario)**
   - ID: `AW-17575125653/HU6yCL6f0rUbEJXFvLxB`
   - Trigger: Envío exitoso de formulario
   - Anti-duplicados con sessionStorage

**Protección anti-duplicados:**
```javascript
if (!sessionStorage.getItem('lead_conversion_sent')) {
    gtag('event', 'conversion', {'send_to': 'AW-17575125653/HU6yCL6f0rUbEJXFvLxB'});
    sessionStorage.setItem('lead_conversion_sent', '1');
}
```

## Configuración de Google Analytics

### Google Ads (gtag.js)

El proyecto utiliza Google Ads con ID: `AW-17575125653`

**Configuración actual:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17575125653"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);} 
  gtag('js', new Date());
  gtag('config', 'AW-17575125653');
</script>
```

**Cuenta anterior desactivada:** `AW-10959842291` (comentada para evitar conteo doble)

### Conversiones Personalizadas

Cada evento de conversión incluye:
- `send_to`: ID del evento de conversión
- `event_callback`: Callback para ejecutar acción (abrir WhatsApp, redirigir, etc.)
- `event_timeout`: Tiempo máximo de espera antes de ejecutar callback (2000ms)

**Ejemplo de implementación:**
```javascript
function gtag_report_conversion_whatsapp(url) {
  if (window.__conv_whatsapp) return false; // Prevenir duplicados
  window.__conv_whatsapp = true;
  
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.open(url, '_blank');
    }
  };
  
  gtag('event', 'conversion', {
    send_to: 'AW-17575125653/SZa7CLuf0rUbEJXFvLxB',
    event_callback: callback,
    event_timeout: 2000
  });
  
  return false;
}
```

### Modificar IDs de Conversión

Para actualizar IDs de conversión:

1. Accede a Google Ads
2. Ve a Herramientas > Conversiones
3. Copia el ID de conversión nuevo
4. Reemplaza en `index.html` y `gracias.html`:

```javascript
// Buscar la función correspondiente y actualizar el send_to
gtag('event', 'conversion', {
  send_to: 'TU-NUEVO-ID-AQUI',
  event_callback: callback,
  event_timeout: 2000
});
```

## Sistema de Formularios

### Flujo de Procesamiento

1. **Usuario completa formulario** en `index.html#contacto`
2. **Envío POST** a `public/enviar-formulario.php`
3. **Validación server-side** de campos requeridos
4. **Construcción del email** con datos del formulario
5. **Envío SMTP** mediante PHPMailer
6. **Redirección** a `gracias.html?estado=exito`
7. **Disparo de conversión** en página de agradecimiento

### Configuración de PHPMailer

**Servidor SMTP configurado:** IONOS México

```php
$mail->Host = "smtp.ionos.mx";
$mail->Port = 587;
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'tls';
$mail->Username = "formularios@wde.com.mx";
$mail->Password = "Wde.2025!";
```

**Dirección de destino:**
```php
$correoDestino = 'gflmtex@gmail.com';
```

### Modificar Configuración de Email

Para cambiar credenciales SMTP o destino:

1. Abre `public/enviar-formulario.php`
2. Localiza la sección de configuración de PHPMailer
3. Actualiza las credenciales:

```php
// Configuración SMTP
$mail->Host = "tu-servidor-smtp.com";
$mail->Port = 587; // o 465 para SSL
$mail->Username = "tu-email@dominio.com";
$mail->Password = "tu-contraseña";

// Cambiar destinatario
$correoDestino = 'nuevo-destino@dominio.com';
```

### Testing Local de Formularios

Para probar el envío de formularios localmente:

1. **Instala un servidor PHP local** (XAMPP, WAMP, Laravel Valet)

2. **Copia el proyecto** al directorio del servidor

3. **Configura SMTP** con credenciales de prueba:
   - Gmail: Habilita "Aplicaciones menos seguras"
   - Mailtrap: Servicio de testing SMTP
   - Mailhog: Servidor SMTP local

4. **Accede al proyecto** vía localhost con soporte PHP

**Alternativa sin servidor PHP:**
```bash
# Usar PHP built-in server
cd GoForLife-Landing
php -S localhost:8000
```

Accede a http://localhost:8000 y prueba el formulario.

### Debugging de Emails

Habilitar modo debug en `enviar-formulario.php`:

```php
// Cambiar de 0 a 2 para debug completo
$mail->SMTPDebug = 2;
$mail->Debugoutput = 'html';
```

Niveles de debug:
- 0: Sin debug (producción)
- 1: Comandos del cliente
- 2: Comandos del cliente y respuestas del servidor
- 3: Como 2 más información de conexión

## Despliegue

### Despliegue en Hosting Compartido

1. **Compilar el proyecto:**

```bash
npm run build
```

2. **Subir archivos al servidor:**
   - Contenido de `dist/` a la raíz del hosting
   - Carpeta `public/phpmailer/` debe estar accesible
   - Asegurar permisos de ejecución en `.php`

3. **Configurar `.htaccess` (si es Apache):**

```apache
# Rewrite URLs
RewriteEngine On
RewriteBase /

# Redirección a HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Comprimir assets
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache estático
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

4. **Verificar funcionamiento:**
   - Navegar por todas las secciones
   - Probar envío de formulario
   - Verificar conversiones en Google Ads
   - Comprobar enlaces a WhatsApp y teléfono

### Despliegue en VPS/Cloud

#### Opción 1: Nginx + Node.js

1. **Instalar dependencias en servidor:**

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar Nginx
sudo apt install -y nginx

# Instalar PHP y extensiones
sudo apt install -y php-fpm php-mbstring php-xml
```

2. **Clonar y compilar proyecto:**

```bash
cd /var/www
git clone https://github.com/Santiago-Penaranda-Peinado/GoForLife-Landing.git
cd GoForLife-Landing
npm install
npm run build
```

3. **Configurar Nginx:**

```nginx
# /etc/nginx/sites-available/goforlife
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;
    root /var/www/GoForLife-Landing/dist;
    index index.html;

    # Comprimir assets
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    # Servir archivos estáticos
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Procesar PHP
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
    }

    # Cache estático
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|webp|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

4. **Habilitar sitio:**

```bash
sudo ln -s /etc/nginx/sites-available/goforlife /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

5. **Configurar SSL con Let's Encrypt:**

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
```

#### Opción 2: Docker en Producción

1. **Crear Dockerfile de producción:**

```dockerfile
# Dockerfile.prod
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Configurar Nginx para contenedor:**

```nginx
# nginx.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|webp|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

3. **Construir y ejecutar:**

```bash
docker build -f Dockerfile.prod -t goforlife-landing .
docker run -d -p 80:80 --name goforlife goforlife-landing
```

### Verificación Post-Despliegue

Checklist de verificación:

- [ ] Sitio accesible en dominio
- [ ] HTTPS funcionando (si aplica)
- [ ] Todas las imágenes cargan correctamente
- [ ] Videos de hero section reproducen
- [ ] Formulario envía emails
- [ ] Conversiones de Google Ads disparan
- [ ] Botones de WhatsApp abren correctamente
- [ ] Enlaces de teléfono funcionan en móviles
- [ ] Navegación responsive en mobile
- [ ] Lighthouse score > 80 en todas las métricas
- [ ] Consola sin errores JavaScript
- [ ] Todos los enlaces del footer funcionan

## Mantenimiento y Desarrollo

### Agregar Nueva Sección

1. **Crear HTML en `index.html`:**

```html
<section id="nueva-seccion" class="section">
  <div class="container">
    <h2 class="section-title">Nueva Sección</h2>
    <!-- Contenido -->
  </div>
</section>
```

2. **Crear partial SCSS en `src/scss/partials/_nueva-seccion.scss`:**

```scss
@use 'variables' as *;
@use 'mixins' as *;

.nueva-seccion {
  padding: 5rem 0;
  background-color: $color-dark;
  
  // Estilos específicos
}
```

3. **Importar partial en `src/scss/main.scss`:**

```scss
@use 'partials/nueva-seccion';
```

4. **Crear módulo JS (si necesita interactividad):**

```javascript
// src/js/modules/nueva-seccion.js
export function initNuevaSeccion() {
  const seccion = document.querySelector('#nueva-seccion');
  if (!seccion) return;
  
  // Lógica de la sección
}
```

5. **Importar e inicializar en `src/main.js`:**

```javascript
import { initNuevaSeccion } from './js/modules/nueva-seccion.js';

document.addEventListener('DOMContentLoaded', () => {
  initNuevaSeccion();
  // ... otros inits
});
```

### Modificar Colores del Tema

Todos los colores están centralizados en `src/scss/partials/_variables.scss`:

```scss
// Colores principales
$color-primary: #FF6600;      // Naranja principal
$color-secondary: #4ADE80;    // Verde secundario
$color-accent: #FF3300;       // Rojo acento

// Colores de fondo
$color-dark: #0f0f0f;         // Fondo oscuro principal
$color-dark-alt: #1a1a1a;     // Fondo oscuro alternativo
$color-dark-card: #1e1e1e;    // Fondo de tarjetas

// Colores de texto
$color-text-light: #ffffff;
$color-text-muted: rgba(255, 255, 255, 0.7);
$color-text-dark: #1a1a1a;
```

Para cambiar el esquema de colores:
1. Modifica las variables en `_variables.scss`
2. Los cambios se propagarán automáticamente por todo el proyecto
3. No necesitas buscar y reemplazar colores manualmente

### Agregar Nuevo Producto/Modelo

1. **Preparar imagen del producto:**
   - Tamaño recomendado: 800x600px
   - Formato: JPG o WebP
   - Ubicación: `public/images/`

2. **Agregar tarjeta en la sección de modelos:**

```html
<div class="model-card">
    <div class="model-card__image">
        <img src="/images/nuevo-modelo.jpg" alt="Nuevo Modelo" loading="lazy">
        <div class="image-wave-mask">
            <svg viewBox="0 0 500 50" preserveAspectRatio="none">
                <path d="M0,0 C150,50 350,0 500,20 L500,50 L0,50 Z" fill="currentColor"></path>
            </svg>
        </div>
    </div>
    <div class="model-card__header">
        <h3>Nuevo Modelo</h3>
        <div class="model-card__price">$XX,XXX</div>
    </div>
    <div class="model-card__features">
        <ul>
            <li><i class="fas fa-icono"></i><span>Característica 1</span></li>
            <li><i class="fas fa-icono"></i><span>Característica 2</span></li>
            <!-- Más características -->
        </ul>
    </div>
    <div class="model-card__cta">
        <a href="URL-WHATSAPP" target="_blank" class="btn btn--primary">
            Quiero Este Modelo
        </a>
    </div>
</div>
```

3. **Crear evento de conversión en Google Ads:**
   - Copia uno de los eventos existentes
   - Genera nuevo ID de conversión
   - Agrega función en `<head>` de `index.html`

```javascript
function gtag_report_conversion_nuevo_modelo(url) {
  if (window.__conv_nuevo_modelo) return false;
  window.__conv_nuevo_modelo = true;
  
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.open(url, '_blank');
    }
  };
  
  gtag('event', 'conversion', {
    send_to: 'AW-17575125653/NUEVO-ID-AQUI',
    event_callback: callback,
    event_timeout: 2000
  });
  
  return false;
}
```

4. **Vincular conversión al botón:**

```html
<a href="URL-WHATSAPP" 
   target="_blank" 
   class="btn btn--primary"
   onclick="return gtag_report_conversion_nuevo_modelo('URL-WHATSAPP');">
  Quiero Este Modelo
</a>
```

### Actualizar Dependencias

```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar dependencias menores (patch/minor)
npm update

# Actualizar dependencia específica
npm install vite@latest

# Actualizar dependencias mayores (con precaución)
npm install vite@latest --save-dev

# Verificar que todo funcione después de actualizar
npm run dev
npm run build
```

**Precauciones:**
- Revisa CHANGELOGs antes de actualizar major versions
- Prueba el build después de actualizar
- Haz commit antes de actualizar dependencias críticas

### Performance Optimization

**Técnicas ya implementadas:**
- Code splitting automático con Vite
- Lazy loading de imágenes con `loading="lazy"`
- Preload de recursos críticos
- Minificación de CSS/JS en build
- Compresión de assets

**Mejoras adicionales sugeridas:**

1. **Convertir imágenes a WebP:**

```bash
# Instalar herramienta de conversión
npm install -g webp-converter-cli

# Convertir imágenes
webp-converter-cli public/images/*.jpg -o public/images/
```

2. **Implementar Service Worker para PWA:**

```bash
npm install vite-plugin-pwa --save-dev
```

```javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Go For Life México',
        short_name: 'GFL México',
        description: 'Plantas Purificadoras de Agua',
        theme_color: '#0f0f0f',
        icons: [
          {
            src: '/logo/goforlifeMexico-logo.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

3. **Analizar bundle size:**

```bash
npm install -D rollup-plugin-visualizer
```

```javascript
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ]
});
```

## Resolución de Problemas

### El servidor de desarrollo no inicia

**Error:** `EADDRINUSE: address already in use :::5173`

**Solución:**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9

# O cambiar puerto
npm run dev -- --port 3000
```

### Errores de compilación de Sass

**Error:** `Module build failed: Error: Can't find stylesheet to import.`

**Solución:**
- Verifica que todos los partials existan en `src/scss/partials/`
- Asegúrate de que los imports en `main.scss` usen rutas correctas
- Comprueba que los archivos partial empiecen con `_`

```bash
# Reinstalar Sass
npm uninstall sass
npm install sass --save-dev
```

### Formulario no envía emails

**Causas comunes:**
1. Credenciales SMTP incorrectas
2. Puerto bloqueado por firewall
3. PHPMailer no instalado correctamente

**Debugging:**
```php
// En enviar-formulario.php, habilita debug
$mail->SMTPDebug = 2;
$mail->Debugoutput = 'html';

// Verifica extensiones PHP
phpinfo(); // Busca extensiones: openssl, sockets
```

**Soluciones:**
- Verifica credenciales SMTP
- Prueba con puerto alternativo (465 SSL en lugar de 587 TLS)
- Asegúrate de que `public/phpmailer/` esté completo

### Imágenes no cargan en producción

**Causas:**
- Rutas relativas incorrectas
- Archivos no copiados al build
- Permisos de archivos incorrectos

**Soluciones:**
```bash
# Verificar que public/ se copia correctamente
npm run build

# Verificar dist/
ls -la dist/public/images/

# En hosting, verificar permisos
chmod 755 public/
chmod 644 public/images/*
```

### Conversiones de Google Ads no disparan

**Verificación:**
1. Abre Chrome DevTools > Network
2. Filtra por "google-analytics.com"
3. Busca requests con `conversion` en payload

**Soluciones:**
- Verifica que el ID de conversión sea correcto
- Comprueba que gtag.js se carga antes de los eventos
- Desactiva bloqueadores de anuncios al testear
- Revisa la consola por errores JavaScript

### Docker no levanta contenedor

**Error:** `Cannot start service app: driver failed`

**Solución:**
```bash
# Limpiar contenedores e imágenes
docker-compose down -v
docker system prune -a

# Reconstruir desde cero
docker-compose build --no-cache
docker-compose up
```

### Hot reload no funciona en Docker

**Causa:** Polling de archivos no detecta cambios en volúmenes montados.

**Solución:**
Agregar variables de entorno en `docker-compose.yml`:

```yaml
services:
  app:
    build: .
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
      - CHOKIDAR_INTERVAL=1000
```

### Estilos no se aplican después del build

**Causa:** CSS no se está importando correctamente en JS.

**Solución:**
```javascript
// Verifica que main.js importe el SCSS
import './scss/main.scss'; // Esta línea DEBE estar presente
```

Si el problema persiste:
```bash
# Limpiar cache de Vite
rm -rf node_modules/.vite
npm run dev
```

## Licencia

Este proyecto está licenciado bajo la **GNU General Public License v2.0**.

### Resumen de Permisos

**Permitido:**
- Uso comercial
- Modificación del código
- Distribución
- Uso privado

**Condiciones:**
- Divulgar el código fuente al distribuir
- Mantener la misma licencia en trabajos derivados
- Incluir copyright y aviso de licencia
- Documentar cambios realizados

**Limitaciones:**
- Sin garantía
- Sin responsabilidad del autor

Para más información, consulta el archivo [LICENSE](LICENSE) en la raíz del proyecto.

## Contacto

### Desarrollado por: Santiago Peñaranda Peinado

### Repositorio

**GitHub:** [Santiago-Penaranda-Peinado/GoForLife-Landing](https://github.com/Santiago-Penaranda-Peinado/GoForLife-Landing)

**Issues:** Para reportar bugs o solicitar features, abre un issue en GitHub.

**Contribuciones:** Pull requests son bienvenidos. Para cambios mayores, abre un issue primero para discutir los cambios propuestos.

---

**Última actualización:** Noviembre 2025

**Versión:** 1.0.0

**Construido con:** Vite 7.1.7 | Sass | Vanilla JavaScript | PHP | Docker

**Diseño y Desarrollo:** WDE Diseño / Santiago Peñaranda Peinado
