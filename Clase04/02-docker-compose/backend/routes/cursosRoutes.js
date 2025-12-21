const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursosController');

// Rutas CRUD para cursos
router.get('/', cursosController.getAllCursos);                    // GET /api/v1/cursos
router.get('/categoria/:categoria', cursosController.getCursosByCategoria); // GET /api/v1/cursos/categoria/:categoria
router.get('/:id', cursosController.getCursoById);                // GET /api/v1/cursos/:id
router.post('/', cursosController.createCurso);                   // POST /api/v1/cursos
router.put('/:id', cursosController.updateCurso);                 // PUT /api/v1/cursos/:id
router.delete('/:id', cursosController.deleteCurso);              // DELETE /api/v1/cursos/:id

module.exports = router;