// wwwroot/js/programas-filtros.js
class ProgramasFiltros {
    constructor() {
        this.filtroBtns = document.querySelectorAll('.filtro-btn');
        this.programaCards = document.querySelectorAll('.programa-card');

        this.init();
    }

    init() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.filtroBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filtrarProgramas(e.target.dataset.categoria);
                this.actualizarBotonesActivos(e.target);
            });
        });
    }

    filtrarProgramas(categoria) {
        this.programaCards.forEach(card => {
            if (categoria === 'todos' || card.dataset.categoria === categoria) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    actualizarBotonesActivos(btnActivo) {
        this.filtroBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btnActivo.classList.add('active');
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function () {
    new ProgramasFiltros();
});