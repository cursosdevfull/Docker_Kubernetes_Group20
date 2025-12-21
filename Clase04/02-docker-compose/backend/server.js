const express = require('express');
const cors = require('cors');
const cursosRoutes = require('./routes/cursosRoutes');
const { testConnection } = require('./database/connection');

const app = express();
const PORT = process.env.PORT || 3001;
const API_VERSION = process.env.API_VERSION || 'v1';

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: 'API de Cursos de Tecnología',
        version: API_VERSION,
        endpoints: {
            cursos: `/api/${API_VERSION}/cursos`,
            curso: `/api/${API_VERSION}/cursos/:id`,
            crear: `POST /api/${API_VERSION}/cursos`,
            actualizar: `PUT /api/${API_VERSION}/cursos/:id`,
            eliminar: `DELETE /api/${API_VERSION}/cursos/:id`,
            healthcheck: '/health'
        }
    });
});

// Healthcheck endpoint
app.get('/health', async (req, res) => {
    try {
        // Probar conexión a la base de datos
        const isDbConnected = await testConnection();

        const healthStatus = {
            status: isDbConnected ? 'healthy' : 'unhealthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: API_VERSION,
            database: {
                status: isDbConnected ? 'connected' : 'disconnected',
                host: process.env.DB_HOST || 'localhost',
                port: process.env.DB_PORT || 3306,
                database: process.env.DB_NAME || 'cursos_db'
            },
            server: {
                port: PORT,
                environment: process.env.NODE_ENV || 'development'
            }
        };

        const statusCode = isDbConnected ? 200 : 503;
        res.status(statusCode).json(healthStatus);
    } catch (error) {
        res.status(503).json({
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: API_VERSION,
            error: error.message,
            database: {
                status: 'error',
                host: process.env.DB_HOST || 'localhost',
                port: process.env.DB_PORT || 3306,
                database: process.env.DB_NAME || 'cursos_db'
            }
        });
    }
});

// Alias para healthcheck
app.get('/healthcheck', async (req, res) => {
    // Redirect to /health endpoint
    req.url = '/health';
    app._router.handle(req, res);
});

// Rutas de cursos
app.use(`/api/${API_VERSION}/cursos`, cursosRoutes);

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Middleware para manejo de errores
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
    });
});

// Iniciar servidor
app.listen(PORT, async () => {
    console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
    console.log(`📚 API de cursos disponible en http://localhost:${PORT}/api/${API_VERSION}/cursos`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);

    // Probar conexión a la base de datos
    await testConnection();
});