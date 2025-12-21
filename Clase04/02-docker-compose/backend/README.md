# Cursos Backend API - CRUD con MySQL

API REST completa para gestión de cursos de tecnología con operaciones CRUD, arquitectura modular y persistencia en MySQL.

## Tecnologías utilizadas

- Node.js
- Express.js
- MySQL (mysql2)
- CORS

## Arquitectura del proyecto

```
backend/
├── server.js                    # Archivo principal de la aplicación
├── package.json                 # Dependencias y scripts
├── controllers/
│   └── cursosController.js      # Lógica de negocio para cursos
├── routes/
│   └── cursosRoutes.js          # Definición de rutas para cursos
├── database/
│   └── connection.js            # Configuración y conexión a MySQL
├── sql/
│   ├── schema.sql               # Script para crear tabla de cursos
│   └── data.sql                 # Script para insertar datos iniciales
└── README.md                    # Documentación
```

## Configuración

### Variables de entorno para la aplicación

- `PORT`: Puerto en el que se ejecuta la aplicación (default: 3001)
- `NODE_ENV`: Ambiente de ejecución (development/production)
- `API_VERSION`: Versión de la API (default: v1)

### Variables de entorno para MySQL

- `DB_HOST`: Host de la base de datos (default: localhost)
- `DB_PORT`: Puerto de MySQL (default: 3306)
- `DB_USER`: Usuario de MySQL (default: root)
- `DB_PASSWORD`: Contraseña de MySQL (default: password)
- `DB_NAME`: Nombre de la base de datos (default: cursos_db)

### Instalación

1. **Instalar dependencias**:
```bash
npm install
```

2. **Configurar MySQL**:
   - Ejecutar el script de esquema: `sql/schema.sql`
   - Ejecutar el script de datos: `sql/data.sql`

3. **Configurar variables de entorno** (opcional):
   Crear las variables de entorno para la conexión a MySQL o usar los valores por defecto.

### Ejecución

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

## Endpoints disponibles - CRUD

### GET /
Información general de la API y endpoints disponibles.

### CREATE - POST /api/v1/cursos
Crea un nuevo curso.

**Body requerido:**
```json
{
  "title": "Nombre del curso",
  "description": "Descripción detallada del curso",
  "imageUrl": "https://ejemplo.com/imagen.jpg"
}
```

### READ - GET /api/v1/cursos
Obtiene todos los cursos disponibles.

**Respuesta:**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "id": 1,
      "title": "Desarrollo Frontend Moderno",
      "description": "Aprende las tecnologías más demandadas del frontend...",
      "imageUrl": "https://...",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### READ - GET /api/v1/cursos/:id
Obtiene un curso específico por ID.

**Parámetros:**
- `id` (number): ID del curso

### UPDATE - PUT /api/v1/cursos/:id
Actualiza un curso existente completamente.

**Parámetros:**
- `id` (number): ID del curso a actualizar

**Body requerido:**
```json
{
  "title": "Nuevo nombre del curso",
  "description": "Nueva descripción del curso",
  "imageUrl": "https://nueva-imagen.com/imagen.jpg"
}
```

### DELETE - DELETE /api/v1/cursos/:id
Elimina un curso específico.

**Parámetros:**
- `id` (number): ID del curso a eliminar

### GET /api/v1/cursos/categoria/:categoria
Filtra cursos por categoría.

**Parámetros:**
- `categoria` (string): Categoría a filtrar (frontend, backend, cloud, etc.)

## Validaciones

Todos los campos son requeridos para crear y actualizar cursos:
- `title`: String no vacío
- `description`: String no vacío  
- `imageUrl`: String no vacío

## Códigos de respuesta

- `200`: Operación exitosa
- `201`: Recurso creado exitosamente
- `400`: Datos inválidos
- `404`: Recurso no encontrado
- `500`: Error interno del servidor

## Base de datos

### Tabla: cursos
```sql
CREATE TABLE cursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  imageUrl VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Configuración de scripts SQL

1. **schema.sql**: Crear la base de datos y tabla
2. **data.sql**: Insertar 6 cursos de ejemplo

## Características adicionales

- **Pool de conexiones**: Para mejor rendimiento y manejo de conexiones
- **Arquitectura modular**: Separación clara de responsabilidades
- **Manejo de errores**: Logging y respuestas consistentes
- **Validaciones**: En controladores antes de operaciones de base de datos
- **Reconexión automática**: Configuración robusta de MySQL