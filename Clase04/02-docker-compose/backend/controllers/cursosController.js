const { pool } = require('../database/connection');

// Función para validar datos del curso
const validateCursoData = (data) => {
    const errors = [];

    if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
        errors.push('El título es requerido y debe ser una cadena no vacía');
    }

    if (!data.description || typeof data.description !== 'string' || data.description.trim() === '') {
        errors.push('La descripción es requerida y debe ser una cadena no vacía');
    }

    if (!data.imageUrl || typeof data.imageUrl !== 'string' || data.imageUrl.trim() === '') {
        errors.push('La URL de imagen es requerida y debe ser una cadena no vacía');
    }

    return errors;
};

// Obtener todos los cursos
const getAllCursos = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM cursos ORDER BY id');

        res.json({
            success: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        console.error('Error obteniendo cursos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los cursos',
            error: error.message
        });
    }
};

// Obtener un curso por ID
const getCursoById = async (req, res) => {
    try {
        const cursoId = parseInt(req.params.id);

        if (isNaN(cursoId)) {
            return res.status(400).json({
                success: false,
                message: 'ID de curso inválido'
            });
        }

        const [rows] = await pool.execute('SELECT * FROM cursos WHERE id = ?', [cursoId]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado'
            });
        }

        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error('Error obteniendo curso:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el curso',
            error: error.message
        });
    }
};

// Crear un nuevo curso
const createCurso = async (req, res) => {
    try {
        const errors = validateCursoData(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Datos inválidos',
                errors: errors
            });
        }

        const { title, description, imageUrl } = req.body;

        const [result] = await pool.execute(
            'INSERT INTO cursos (title, description, imageUrl) VALUES (?, ?, ?)',
            [title.trim(), description.trim(), imageUrl.trim()]
        );

        const [newCurso] = await pool.execute('SELECT * FROM cursos WHERE id = ?', [result.insertId]);

        res.status(201).json({
            success: true,
            message: 'Curso creado exitosamente',
            data: newCurso[0]
        });
    } catch (error) {
        console.error('Error creando curso:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear el curso',
            error: error.message
        });
    }
};

// Actualizar un curso existente
const updateCurso = async (req, res) => {
    try {
        const cursoId = parseInt(req.params.id);

        if (isNaN(cursoId)) {
            return res.status(400).json({
                success: false,
                message: 'ID de curso inválido'
            });
        }

        const errors = validateCursoData(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Datos inválidos',
                errors: errors
            });
        }

        const { title, description, imageUrl } = req.body;

        const [result] = await pool.execute(
            'UPDATE cursos SET title = ?, description = ?, imageUrl = ? WHERE id = ?',
            [title.trim(), description.trim(), imageUrl.trim(), cursoId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado'
            });
        }

        const [updatedCurso] = await pool.execute('SELECT * FROM cursos WHERE id = ?', [cursoId]);

        res.json({
            success: true,
            message: 'Curso actualizado exitosamente',
            data: updatedCurso[0]
        });
    } catch (error) {
        console.error('Error actualizando curso:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el curso',
            error: error.message
        });
    }
};

// Eliminar un curso
const deleteCurso = async (req, res) => {
    try {
        const cursoId = parseInt(req.params.id);

        if (isNaN(cursoId)) {
            return res.status(400).json({
                success: false,
                message: 'ID de curso inválido'
            });
        }

        // Obtener el curso antes de eliminarlo
        const [cursoToDelete] = await pool.execute('SELECT * FROM cursos WHERE id = ?', [cursoId]);

        if (cursoToDelete.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado'
            });
        }

        await pool.execute('DELETE FROM cursos WHERE id = ?', [cursoId]);

        res.json({
            success: true,
            message: 'Curso eliminado exitosamente',
            data: cursoToDelete[0]
        });
    } catch (error) {
        console.error('Error eliminando curso:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el curso',
            error: error.message
        });
    }
};

// Filtrar cursos por categoría
const getCursosByCategoria = async (req, res) => {
    try {
        const categoria = req.params.categoria.toLowerCase();

        const [rows] = await pool.execute(
            'SELECT * FROM cursos WHERE LOWER(title) LIKE ? OR LOWER(description) LIKE ? ORDER BY id',
            [`%${categoria}%`, `%${categoria}%`]
        );

        res.json({
            success: true,
            categoria: categoria,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        console.error('Error filtrando cursos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al filtrar cursos',
            error: error.message
        });
    }
};

module.exports = {
    getAllCursos,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso,
    getCursosByCategoria
};