# Frontend de Cursos de Tecnología

Aplicación frontend moderna construida con JavaScript vanilla, CSS moderno y servida con Node.js/Express.

## Características

- ✨ **JavaScript Vanilla**: Sin frameworks ni librerías externas
- 🎨 **CSS Moderno**: Variables CSS, Grid, Flexbox, animaciones
- 📱 **Responsive Design**: Optimizado para móviles y desktop
- 🔄 **CRUD Completo**: Crear, leer, actualizar y eliminar cursos
- 🔍 **Búsqueda**: Filtrado en tiempo real por categorías
- ⚡ **API Integration**: Comunicación con backend REST API
- 🎯 **UX Moderna**: Feedback visual, loading states, confirmaciones

## Tecnologías utilizadas

- Node.js + Express (servidor)
- JavaScript ES6+ (frontend)
- CSS Grid + Flexbox
- Fetch API para llamadas HTTP
- HTML5 semántico

## Configuración

### Variables de entorno

- `PORT`: Puerto del servidor frontend (default: 3000)
- `API_BASE_URL`: URL del backend API (default: http://localhost:3001)
- `API_VERSION`: Versión de la API (default: v1)
- `NODE_ENV`: Ambiente de ejecución

### Instalación

```bash
npm install
```

### Ejecución

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

## Estructura del proyecto

```
frontend/
├── server.js                    # Servidor Express
├── package.json                 # Dependencias y scripts
├── public/
│   ├── index.html              # Aplicación SPA
│   ├── css/
│   │   └── style.css           # Estilos modernos
│   └── js/
│       └── app.js              # Lógica de la aplicación
└── README.md
```

## Funcionalidades

### 📋 Gestión de Cursos
- **Listar**: Ver todos los cursos en grid responsivo
- **Crear**: Formulario para agregar nuevos cursos
- **Editar**: Modificar cursos existentes
- **Eliminar**: Borrar con confirmación modal

### 🔍 Búsqueda y Filtros
- Búsqueda por categorías en tiempo real
- Filtrado del lado del servidor
- Estado vacío personalizado

### 🎨 Interfaz Moderna
- **Design System**: Variables CSS consistentes
- **Loading States**: Spinners y feedback visual
- **Error Handling**: Mensajes de error elegantes
- **Responsive**: Mobile-first design
- **Animaciones**: Transiciones suaves

### ⚡ Performance
- **Lazy Loading**: Imágenes con fallback
- **Debounced Search**: Búsqueda optimizada
- **API Caching**: Estado local de datos
- **Minimal DOM**: Rendering eficiente

## API Integration

La aplicación se conecta al backend en:
- **Base URL**: `http://localhost:3001/api/v1`
- **Endpoints**:
  - `GET /cursos` - Obtener todos los cursos
  - `GET /cursos/:id` - Obtener curso específico
  - `POST /cursos` - Crear nuevo curso
  - `PUT /cursos/:id` - Actualizar curso
  - `DELETE /cursos/:id` - Eliminar curso
  - `GET /cursos/categoria/:categoria` - Búsqueda

## Uso

1. **Iniciar backend** en puerto 3001
2. **Iniciar frontend**: `npm start`
3. **Abrir browser**: `http://localhost:3000`
4. **Explorar funcionalidades**:
   - Ver cursos existentes
   - Buscar por tecnologías
   - Agregar nuevos cursos
   - Editar información
   - Eliminar cursos

## Características Técnicas

### JavaScript Moderno
- ES6+ features (async/await, arrow functions, destructuring)
- Modular architecture con namespaces
- Event-driven programming
- Error boundaries y handling

### CSS Avanzado
- Custom properties (variables CSS)
- CSS Grid para layouts complejos
- Flexbox para alineación
- Media queries para responsive
- Animaciones y transiciones

### UX/UI
- Loading spinners durante API calls
- Success/error messages con auto-hide
- Modal de confirmación para acciones destructivas
- Form validation y feedback
- Keyboard shortcuts (ESC para cerrar modales)

La aplicación demuestra cómo crear interfaces modernas y funcionales usando solo tecnologías web estándar, sin dependencias externas.