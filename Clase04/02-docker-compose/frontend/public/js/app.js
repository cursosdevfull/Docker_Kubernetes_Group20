// Configuración global
let CONFIG = {
    apiBaseUrl: 'http://localhost:9010',
    apiVersion: 'v2'
};

// Estado de la aplicación
const state = {
    cursos: [],
    filteredCursos: [],
    currentCurso: null,
    isEditing: false,
    searchTerm: ''
};

// Elementos del DOM
const elements = {
    loading: document.getElementById('loading'),
    errorMessage: document.getElementById('error-message'),
    errorText: document.getElementById('error-text'),
    successMessage: document.getElementById('success-message'),
    successText: document.getElementById('success-text'),
    btnTodos: document.getElementById('btn-todos'),
    btnAgregar: document.getElementById('btn-agregar'),
    btnBuscar: document.getElementById('btn-buscar'),
    btnRetry: document.getElementById('btn-retry'),
    searchInput: document.getElementById('search-input'),
    formContainer: document.getElementById('form-container'),
    cursosContainer: document.getElementById('cursos-container'),
    formTitle: document.getElementById('form-title'),
    cursoForm: document.getElementById('curso-form'),
    btnGuardar: document.getElementById('btn-guardar'),
    btnCancelar: document.getElementById('btn-cancelar'),
    cursosGrid: document.getElementById('cursos-grid'),
    cursosCount: document.getElementById('cursos-count'),
    confirmModal: document.getElementById('confirm-modal'),
    confirmTitle: document.getElementById('confirm-title'),
    confirmMessage: document.getElementById('confirm-message'),
    btnConfirmYes: document.getElementById('btn-confirm-yes'),
    btnConfirmNo: document.getElementById('btn-confirm-no')
};

// API Helper Functions
const api = {
    async request(endpoint, options = {}) {
        const url = `${CONFIG.apiBaseUrl}/api/${CONFIG.apiVersion}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    async getCursos() {
        return await this.request('/cursos');
    },

    async getCurso(id) {
        return await this.request(`/cursos/${id}`);
    },

    async createCurso(curso) {
        return await this.request('/cursos', {
            method: 'POST',
            body: JSON.stringify(curso)
        });
    },

    async updateCurso(id, curso) {
        return await this.request(`/cursos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(curso)
        });
    },

    async deleteCurso(id) {
        return await this.request(`/cursos/${id}`, {
            method: 'DELETE'
        });
    },

    async searchCursos(categoria) {
        return await this.request(`/cursos/categoria/${categoria}`);
    }
};

// UI Helper Functions
const ui = {
    showElement(element) {
        element.classList.remove('hidden');
    },

    hideElement(element) {
        element.classList.add('hidden');
    },

    showLoading() {
        this.showElement(elements.loading);
        this.hideError();
        this.hideSuccess();
    },

    hideLoading() {
        this.hideElement(elements.loading);
    },

    showError(message) {
        elements.errorText.textContent = message;
        this.showElement(elements.errorMessage);
        this.hideLoading();
        this.hideSuccess();
    },

    hideError() {
        this.hideElement(elements.errorMessage);
    },

    showSuccess(message) {
        elements.successText.textContent = message;
        this.showElement(elements.successMessage);
        this.hideError();
        setTimeout(() => this.hideSuccess(), 3000);
    },

    hideSuccess() {
        this.hideElement(elements.successMessage);
    },

    showForm() {
        this.showElement(elements.formContainer);
        this.hideElement(elements.cursosContainer);
        elements.btnTodos.classList.remove('active');
        elements.btnAgregar.classList.add('active');
    },

    showCursos() {
        this.hideElement(elements.formContainer);
        this.showElement(elements.cursosContainer);
        elements.btnAgregar.classList.remove('active');
        elements.btnTodos.classList.add('active');
    },

    showModal() {
        this.showElement(elements.confirmModal);
    },

    hideModal() {
        this.hideElement(elements.confirmModal);
    },

    clearForm() {
        elements.cursoForm.reset();
        state.currentCurso = null;
        state.isEditing = false;
        elements.formTitle.textContent = 'Agregar Nuevo Curso';
        elements.btnGuardar.textContent = 'Guardar';
    },

    updateCursosCount() {
        const count = state.filteredCursos.length;
        elements.cursosCount.textContent = `${count} curso${count !== 1 ? 's' : ''}`;
    }
};

// Render Functions
const render = {
    cursos() {
        const cursosToShow = state.filteredCursos.length > 0 ? state.filteredCursos : state.cursos;

        if (cursosToShow.length === 0) {
            elements.cursosGrid.innerHTML = this.emptyState();
        } else {
            elements.cursosGrid.innerHTML = cursosToShow.map(curso => this.cursoCard(curso)).join('');
        }

        ui.updateCursosCount();
        this.attachCardEvents();
    },

    cursoCard(curso) {
        return `
            <div class="curso-card" data-id="${curso.id}">
                <img src="${curso.imageUrl}" alt="${curso.title}" class="curso-image" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZmFmYyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY0NzQ4YiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg=='">
                <div class="curso-content">
                    <h3 class="curso-title">${curso.title}</h3>
                    <p class="curso-description">${curso.description}</p>
                    <div class="curso-actions">
                        <button class="btn btn-primary btn-sm edit-btn" data-id="${curso.id}">
                            ✏️ Editar
                        </button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${curso.id}">
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    emptyState() {
        const message = state.searchTerm
            ? `No se encontraron cursos para "${state.searchTerm}"`
            : 'No hay cursos disponibles';

        return `
            <div class="empty-state">
                <div class="empty-icon">📚</div>
                <h3>${message}</h3>
                <p>Intenta con otros términos de búsqueda o agrega un nuevo curso.</p>
            </div>
        `;
    },

    attachCardEvents() {
        // Edit buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = parseInt(e.target.dataset.id);
                await actions.editCurso(id);
            });
        });

        // Delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const curso = state.cursos.find(c => c.id === id);
                actions.confirmDelete(id, curso.title);
            });
        });
    }
};

// Action Functions
const actions = {
    async loadConfig() {
        try {
            const response = await fetch('/config');
            const config = await response.json();
            CONFIG.apiBaseUrl = config.apiBaseUrl;
            CONFIG.apiVersion = config.apiVersion;
        } catch (error) {
            console.warn('Could not load config, using defaults:', error);
        }
    },

    async loadCursos() {
        try {
            ui.showLoading();
            const response = await api.getCursos();
            state.cursos = response.data || [];
            state.filteredCursos = [];
            render.cursos();
            ui.hideLoading();
        } catch (error) {
            ui.showError(`Error al cargar cursos: ${error.message}`);
        }
    },

    async editCurso(id) {
        try {
            ui.showLoading();
            const response = await api.getCurso(id);
            const curso = response.data;

            state.currentCurso = curso;
            state.isEditing = true;

            // Llenar formulario
            document.getElementById('title').value = curso.title;
            document.getElementById('description').value = curso.description;
            document.getElementById('imageUrl').value = curso.imageUrl;

            elements.formTitle.textContent = 'Editar Curso';
            elements.btnGuardar.textContent = 'Actualizar';

            ui.showForm();
            ui.hideLoading();
        } catch (error) {
            ui.showError(`Error al cargar curso: ${error.message}`);
        }
    },

    async saveCurso(formData) {
        try {
            ui.showLoading();

            const cursoData = {
                title: formData.get('title').trim(),
                description: formData.get('description').trim(),
                imageUrl: formData.get('imageUrl').trim()
            };

            let response;
            if (state.isEditing) {
                response = await api.updateCurso(state.currentCurso.id, cursoData);
                ui.showSuccess('Curso actualizado exitosamente');
            } else {
                response = await api.createCurso(cursoData);
                ui.showSuccess('Curso creado exitosamente');
            }

            ui.clearForm();
            ui.showCursos();
            await this.loadCursos();
        } catch (error) {
            ui.showError(`Error al guardar curso: ${error.message}`);
        }
    },

    confirmDelete(id, title) {
        elements.confirmTitle.textContent = 'Eliminar Curso';
        elements.confirmMessage.textContent = `¿Estás seguro de que deseas eliminar el curso "${title}"?`;

        elements.btnConfirmYes.onclick = () => {
            this.deleteCurso(id);
            ui.hideModal();
        };

        ui.showModal();
    },

    async deleteCurso(id) {
        try {
            ui.showLoading();
            await api.deleteCurso(id);
            ui.showSuccess('Curso eliminado exitosamente');
            await this.loadCursos();
        } catch (error) {
            ui.showError(`Error al eliminar curso: ${error.message}`);
        }
    },

    async searchCursos(term) {
        if (!term.trim()) {
            state.filteredCursos = [];
            state.searchTerm = '';
            render.cursos();
            return;
        }

        try {
            ui.showLoading();
            state.searchTerm = term;
            const response = await api.searchCursos(term);
            state.filteredCursos = response.data || [];
            render.cursos();
            ui.hideLoading();
        } catch (error) {
            ui.showError(`Error en búsqueda: ${error.message}`);
        }
    }
};

// Event Listeners
function setupEventListeners() {
    // Navigation
    elements.btnTodos.addEventListener('click', () => {
        ui.showCursos();
        ui.clearForm();
        state.filteredCursos = [];
        state.searchTerm = '';
        elements.searchInput.value = '';
        render.cursos();
    });

    elements.btnAgregar.addEventListener('click', () => {
        ui.clearForm();
        ui.showForm();
    });

    // Search
    elements.btnBuscar.addEventListener('click', () => {
        const term = elements.searchInput.value.trim();
        actions.searchCursos(term);
    });

    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const term = e.target.value.trim();
            actions.searchCursos(term);
        }
    });

    elements.searchInput.addEventListener('input', (e) => {
        if (e.target.value === '') {
            state.filteredCursos = [];
            state.searchTerm = '';
            render.cursos();
        }
    });

    // Form
    elements.cursoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        actions.saveCurso(formData);
    });

    elements.btnCancelar.addEventListener('click', () => {
        ui.clearForm();
        ui.showCursos();
    });

    // Modal
    elements.btnConfirmNo.addEventListener('click', ui.hideModal);

    elements.confirmModal.addEventListener('click', (e) => {
        if (e.target === elements.confirmModal) {
            ui.hideModal();
        }
    });

    // Retry
    elements.btnRetry.addEventListener('click', actions.loadCursos);

    // Escape key to close modal/form
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!elements.confirmModal.classList.contains('hidden')) {
                ui.hideModal();
            } else if (!elements.formContainer.classList.contains('hidden')) {
                ui.clearForm();
                ui.showCursos();
            }
        }
    });
}

// Initialize App
async function initApp() {
    try {
        await actions.loadConfig();
        setupEventListeners();
        await actions.loadCursos();
    } catch (error) {
        ui.showError(`Error al inicializar la aplicación: ${error.message}`);
    }
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);