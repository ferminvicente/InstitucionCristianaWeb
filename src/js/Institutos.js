import { sedesInstitutos } from './institutos-data.js';

class InstitutosManager {
    constructor() {
        this.map = null;
        this.markersGroup = [];
        this.activeModality = 'todos';
        
        // Elementos del DOM
        this.searchInput = document.getElementById('search-input');
        this.presbiterioSelect = document.getElementById('presbiterio-select');
        this.modalityButtons = document.querySelectorAll('.btn-filter');
        this.resultsCountText = document.getElementById('results-count-text');
        this.resetFiltersBtn = document.getElementById('btn-reset-filters');
        this.centerMapBtn = document.getElementById('btn-center-map');
        this.listContainer = document.getElementById('institutos-list');

        this.init();
    }

    init() {
        this.initMap();
        this.populatePresbiterios();
        this.renderList(sedesInstitutos);
        this.renderMarkers(sedesInstitutos);
        this.setupEventListeners();
        
        // Remover loader
        const loader = document.getElementById('loader');
        if (loader) loader.remove();
    }

    initMap() {
        // Centro inicial: República Dominicana
        const rdCenter = [18.7357, -70.1627];
        const initialZoom = 8;

        this.map = L.map('map', {
            scrollWheelZoom: false // Evitar atrapar el scroll de la página
        }).setView(rdCenter, initialZoom);

        // Capa de mapas OpenStreetMap (OSM)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(this.map);

        // Habilitar zoom por rueda si el usuario hace clic en el mapa
        this.map.on('click', () => {
            this.map.scrollWheelZoom.enable();
        });
        
        // Deshabilitar zoom por rueda si el ratón sale del mapa
        this.map.on('mouseout', () => {
            this.map.scrollWheelZoom.disable();
        });
    }

    populatePresbiterios() {
        // Extraer presbiterios únicos y ordenar alfabéticamente
        const presbiterios = [...new Set(sedesInstitutos.map(s => s.presbiterio))]
            .filter(p => p)
            .sort((a, b) => a.localeCompare(b));

        presbiterios.forEach(presb => {
            const option = document.createElement('option');
            option.value = presb;
            option.textContent = presb;
            this.presbiterioSelect.appendChild(option);
        });
    }

    renderList(data) {
        this.listContainer.innerHTML = '';

        if (data.length === 0) {
            this.listContainer.innerHTML = `
                <div class="text-center py-5 text-muted">
                    <i class="fas fa-search-minus fa-3x mb-3 text-secondary"></i>
                    <p class="h5">No se encontraron sedes coincidentes</p>
                    <p class="small">Prueba ajustando los términos de búsqueda o filtros.</p>
                </div>
            `;
            return;
        }

        data.forEach(sede => {
            const card = document.createElement('div');
            card.className = `instituto-card card-item-${sede.id}`;
            card.dataset.id = sede.id;

            // Construir detalles opcionales
            const asistenteHTML = sede.asistente 
                ? `<div class="info-line"><i class="fas fa-user-tag"></i> <span><strong>Secretaria/Contacto:</strong> ${sede.asistente}</span></div>` 
                : '';
            const estudiantesHTML = sede.estudiantes > 0 
                ? `<div class="info-line"><i class="fas fa-users"></i> <span><strong>Alumnos:</strong> ${sede.estudiantes} ${sede.fechaDatos ? `(${sede.fechaDatos})` : ''}</span></div>` 
                : '';
            const correoHTML = sede.correo 
                ? `<div class="info-line"><i class="fas fa-envelope"></i> <span><strong>Correo:</strong> ${sede.correo}</span></div>` 
                : '';

            card.innerHTML = `
                <div class="presbiterio-tag">${sede.presbiterio}</div>
                <h3>${sede.nombre}</h3>
                <div class="info-line">
                    <i class="fas fa-map-marker-alt"></i>
                    <span><strong>Dirección:</strong> ${sede.direccion}</span>
                </div>
                <div class="info-line">
                    <i class="fas fa-phone"></i>
                    <span><strong>Teléfono:</strong> ${sede.telefono}</span>
                </div>
                ${correoHTML}
                <div class="info-line">
                    <i class="fas fa-user-tie"></i>
                    <span><strong>Director:</strong> ${sede.director}</span>
                </div>
                ${asistenteHTML}
                ${estudiantesHTML}
                <div class="info-line">
                    <i class="fas fa-calendar-alt"></i>
                    <span><strong>Horario/Modalidad:</strong> ${sede.modalidad}</span>
                </div>
                <div class="card-actions">
                    <a href="tel:${sede.telefono.split('/')[0].trim()}" class="btn-action btn-action-call text-decoration-none"><i class="fas fa-phone-alt"></i> Llamar</a>
                    <a href="${sede.mapaUrl}" target="_blank" class="btn-action btn-action-map text-decoration-none"><i class="fas fa-directions"></i> Cómo Llegar</a>
                </div>
            `;

            // Escuchar clic en la tarjeta para centrar e interactuar con el mapa
            card.addEventListener('click', (e) => {
                // Prevenir que se ejecute si se hace clic en botones de acción
                if (e.target.closest('.btn-action')) return;
                this.focusSede(sede);
            });

            this.listContainer.appendChild(card);
        });
    }

    renderMarkers(data) {
        // Limpiar marcadores anteriores
        this.markersGroup.forEach(marker => this.map.removeLayer(marker));
        this.markersGroup = [];

        data.forEach(sede => {
            if (!sede.coords || sede.coords.length !== 2) return;

            const marker = L.marker(sede.coords);
            
            const popupContent = `
                <div>
                    <h4>${sede.nombre}</h4>
                    <p><strong>Presbiterio:</strong> ${sede.presbiterio}</p>
                    <p><strong>Director:</strong> ${sede.director}</p>
                    <p><strong>Teléfono:</strong> ${sede.telefono}</p>
                    <p><strong>Modalidad:</strong> ${sede.modalidad}</p>
                    <a href="${sede.mapaUrl}" target="_blank"><i class="fas fa-external-link-alt me-1"></i>Ver en Google Maps</a>
                </div>
            `;

            marker.bindPopup(popupContent);
            
            // Sincronizar clic en marcador con la tarjeta correspondiente
            marker.on('click', () => {
                this.highlightCard(sede.id);
            });

            marker.addTo(this.map);
            this.markersGroup.push(marker);
            
            // Guardar referencia en el objeto de datos para acceso rápido
            sede.markerRef = marker;
        });
    }

    focusSede(sede) {
        if (!sede.coords || sede.coords.length !== 2) return;

        this.highlightCard(sede.id);

        // Desplazar mapa suavemente y abrir popup
        this.map.setView(sede.coords, 15);
        if (sede.markerRef) {
            sede.markerRef.openPopup();
        }

        // En pantallas móviles, desplazar la pantalla suavemente hacia el mapa
        if (window.innerWidth < 992) {
            document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    highlightCard(id) {
        // Quitar resaltado de todas
        document.querySelectorAll('.instituto-card').forEach(c => {
            c.classList.remove('active-card');
        });

        // Resaltar la actual
        const activeCard = document.querySelector(`.card-item-${id}`);
        if (activeCard) {
            activeCard.classList.add('active-card');
            
            // Hacer scroll dentro del contenedor de la lista hacia la tarjeta seleccionada
            activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    setupEventListeners() {
        // Escuchar cambios de inputs
        this.searchInput.addEventListener('input', () => this.handleFilters());
        this.presbiterioSelect.addEventListener('change', () => this.handleFilters());

        // Escuchar clics de modalidad
        this.modalityButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.modalityButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.activeModality = e.target.dataset.modalidad;
                this.handleFilters();
            });
        });

        // Centrar mapa
        this.centerMapBtn.addEventListener('click', () => {
            this.map.setView([18.7357, -70.1627], 8);
        });

        // Limpiar filtros
        this.resetFiltersBtn.addEventListener('click', () => {
            this.searchInput.value = '';
            this.presbiterioSelect.value = '';
            this.activeModality = 'todos';
            
            this.modalityButtons.forEach(b => {
                if (b.dataset.modalidad === 'todos') b.classList.add('active');
                else b.classList.remove('active');
            });

            this.handleFilters();
        });
    }

    handleFilters() {
        const query = this.searchInput.value.toLowerCase().trim();
        const selectedPresb = this.presbiterioSelect.value;
        const modality = this.activeModality;

        // Filtrar datos
        const filteredData = sedesInstitutos.filter(sede => {
            // 1. Filtro de búsqueda
            const matchesQuery = !query || 
                sede.nombre.toLowerCase().includes(query) ||
                sede.direccion.toLowerCase().includes(query) ||
                sede.presbiterio.toLowerCase().includes(query) ||
                sede.director.toLowerCase().includes(query) ||
                (sede.asistente && sede.asistente.toLowerCase().includes(query)) ||
                (sede.correo && sede.correo.toLowerCase().includes(query));

            // 2. Filtro de Presbiterio
            const matchesPresb = !selectedPresb || sede.presbiterio === selectedPresb;

            // 3. Filtro de Modalidad
            let matchesModality = true;
            if (modality !== 'todos') {
                matchesModality = sede.modalidad.toLowerCase().includes(modality.toLowerCase());
            }

            return matchesQuery && matchesPresb && matchesModality;
        });

        // Actualizar vistas
        this.renderList(filteredData);
        this.renderMarkers(filteredData);

        // Actualizar contador
        if (filteredData.length === 1) {
            this.resultsCountText.textContent = "1 sede encontrada";
        } else {
            this.resultsCountText.textContent = `${filteredData.length} sedes encontradas`;
        }

        // Mostrar u ocultar botón de limpiar filtros
        const hasActiveFilters = query !== '' || selectedPresb !== '' || modality !== 'todos';
        if (hasActiveFilters) {
            this.resetFiltersBtn.classList.remove('d-none');
        } else {
            this.resetFiltersBtn.classList.add('d-none');
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new InstitutosManager();
});
