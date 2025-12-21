# API REST con Python y Flask - Dockerizada

Esta es una API REST simple construida con Python y Flask que permite realizar operaciones CRUD sobre usuarios.

## Estructura del proyecto

```
07-dockerfile-python/
├── Dockerfile
└── app/
    ├── main.py
    └── requirements.txt
```

## Funcionalidades de la API

### Endpoints disponibles:

- **GET /** - Página de inicio con información de la API
- **GET /health** - Endpoint de salud para verificar el estado
- **GET /usuarios** - Obtener todos los usuarios
- **GET /usuarios/{id}** - Obtener un usuario específico
- **POST /usuarios** - Crear un nuevo usuario
- **PUT /usuarios/{id}** - Actualizar un usuario existente
- **DELETE /usuarios/{id}** - Eliminar un usuario

### Ejemplos de uso:

#### Obtener todos los usuarios:
```bash
curl -X GET http://localhost:5000/usuarios
```

#### Crear un nuevo usuario:
```bash
curl -X POST http://localhost:5000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Ana Ruiz", "email": "ana@example.com"}'
```

#### Actualizar un usuario:
```bash
curl -X PUT http://localhost:5000/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Juan Carlos Pérez", "email": "juancarlos@example.com"}'
```

## Construcción y ejecución con Docker

### 1. Construir la imagen:
```bash
docker build -t python-api .
```

### 2. Ejecutar el contenedor:
```bash
docker run -d -p 5000:5000 --name mi-python-api python-api
```

### 3. Verificar que funciona:
```bash
curl http://localhost:5000
```

### 4. Ver logs:
```bash
docker logs mi-python-api
```

### 5. Detener y eliminar:
```bash
docker stop mi-python-api
docker rm mi-python-api
```

## Características del Dockerfile

- **Imagen base**: Python 3.11-slim (optimizada para producción)
- **Multi-stage**: Aprovecha el cache de Docker copiando requirements.txt primero
- **Usuario no-root**: Ejecuta la aplicación con un usuario sin privilegios (appuser)
- **Healthcheck**: Incluye verificación automática de salud
- **Variables de entorno**: Configurable mediante ENV
- **Puerto expuesto**: 5000
- **Optimizaciones**: Limpieza de cache de apt y pip

## Seguridad

- Ejecuta con usuario no-root (uid 1001)
- No incluye herramientas de desarrollo en producción
- Utiliza imagen slim para reducir superficie de ataque
- Healthcheck incorporado para monitoreo