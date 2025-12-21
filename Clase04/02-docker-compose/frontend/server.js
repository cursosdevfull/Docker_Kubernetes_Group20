const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
const API_VERSION = process.env.API_VERSION || 'v1';

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obtener configuración del cliente
app.get('/config', (req, res) => {
    res.json({
        apiBaseUrl: API_BASE_URL,
        apiVersion: API_VERSION,
        environment: process.env.NODE_ENV || 'development'
    });
});

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Healthcheck
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        apiBaseUrl: API_BASE_URL
    });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Frontend servidor ejecutándose en puerto ${PORT}`);
    console.log(`📱 Aplicación disponible en http://localhost:${PORT}`);
    console.log(`🔗 API Backend: ${API_BASE_URL}`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});