import { sedesCentros } from './centros-data.js';

class CentrosManager {
    constructor() {
        this.map = null;
        this.markersGroup = [];

        // Elementos del DOM
        this.searchInput = document.getElementById('search-input');
        this.distritoSelect = document.getElementById('distrito-select');
        this.resultsCountText = document.getElementById('results-count-text');
        this.resetFiltersBtn = document.getElementById('btn-reset-filters');
        this.centerMapBtn = document.getElementById('btn-center-map');
        this.listContainer = document.getElementById('centros-list');

        this.init();
    }

    init() {
        this.initMap();
        this.populateDistritos();
        this.renderList(sedesCentros);
        this.renderMarkers(sedesCentros);
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
            scrollWheelZoom: false
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

    populateDistritos() {
        // Extraer distritos únicos y ordenar alfabéticamente
        const distritos = [...new Set(sedesCentros.map(s => s.distrito))]
            .filter(d => d && d.trim() !== '')
            .sort((a, b) => a.localeCompare(b));

        distritos.forEach(dist => {
            const option = document.createElement('option');
            option.value = dist;
            option.textContent = `Distrito ${dist}`;
            this.distritoSelect.appendChild(option);
        });
    }

    renderList(data) {
        this.listContainer.innerHTML = '';

        if (data.length === 0) {
            this.listContainer.innerHTML = `
                <div class="text-center py-5 text-muted">
                    <i class="fas fa-search-minus fa-3x mb-3 text-secondary"></i>
                    <p class="h5">No se encontraron centros educativos</p>
                    <p class="small">Prueba ajustando los términos de búsqueda o filtros.</p>
                </div>
            `;
            return;
        }

        data.forEach(centro => {
            const card = document.createElement('div');
            card.className = `centro-card card-item-${centro.id}`;
            card.dataset.id = centro.id;

            // Construir detalles opcionales
            const codigoHTML = centro.codigo
                ? `<div class="info-line"><i class="fas fa-hashtag"></i> <span><strong>Código:</strong> ${centro.codigo}</span></div>`
                : '';
            const distritoHTML = centro.distrito
                ? `<div class="info-line"><i class="fas fa-school"></i> <span><strong>Distrito:</strong> ${centro.distrito}</span></div>`
                : '';
            const matriculaHTML = centro.matricula
                ? `<div class="info-line"><i class="fas fa-users"></i> <span><strong>Matrícula:</strong> ${centro.matricula} alumnos</span></div>`
                : '';
            const aulasHTML = centro.aulas
                ? `<div class="info-line"><i class="fas fa-door-open"></i> <span><strong>Aulas:</strong> ${centro.aulas}</span></div>`
                : '';

            card.innerHTML = `
                <div class="distrito-tag">${centro.distrito ? `Distrito ${centro.distrito}` : 'Sin distrito'}</div>
                <h3>${centro.nombre}</h3>
                <div class="info-line">
                    <i class="fas fa-map-marker-alt"></i>
                    <span><strong>Dirección:</strong> ${centro.direccion}</span>
                </div>
                <div class="info-line">
                    <i class="fas fa-phone"></i>
                    <span><strong>Teléfono:</strong> ${centro.telefono}</span>
                </div>
                <div class="info-line">
                    <i class="fas fa-user-tie"></i>
                    <span><strong>Director(a):</strong> ${centro.director || 'No especificado'}</span>
                </div>
                ${codigoHTML}
                ${distritoHTML}
                ${matriculaHTML}
                ${aulasHTML}
                <div class="card-actions">
                    <a href="tel:${centro.telefono.replace(/[^0-9]/g, '')}" class="btn-action btn-action-call text-decoration-none"><i class="fas fa-phone-alt"></i> Llamar</a>
                    <a href="${centro.ubicacion}" target="_blank" class="btn-action btn-action-map text-decoration-none"><i class="fas fa-directions"></i> Cómo Llegar</a>
                </div>
            `;

            // Escuchar clic en la tarjeta para centrar e interactuar con el mapa
            card.addEventListener('click', (e) => {
                if (e.target.closest('.btn-action')) return;
                this.focusCentro(centro);
            });

            this.listContainer.appendChild(card);
        });
    }

    renderMarkers(data) {
        // Limpiar marcadores anteriores
        this.markersGroup.forEach(marker => this.map.removeLayer(marker));
        this.markersGroup = [];

        data.forEach(centro => {
            if (!centro.coords || centro.coords.length !== 2) return;

            const marker = L.marker(centro.coords);

            const popupContent = `
                <div>
                    <h4>${centro.nombre}</h4>
                    <p><strong>Director(a):</strong> ${centro.director || 'No especificado'}</p>
                    <p><strong>Teléfono:</strong> ${centro.telefono}</p>
                    <p><strong>Dirección:</strong> ${centro.direccion}</p>
                    <a href="${centro.ubicacion}" target="_blank"><i class="fas fa-external-link-alt me-1"></i>Ver en Google Maps</a>
                </div>
            `;

            marker.bindPopup(popupContent);

            // Sincronizar clic en marcador con la tarjeta correspondiente
            marker.on('click', () => {
                this.highlightCard(centro.id);
            });

            marker.addTo(this.map);
            this.markersGroup.push(marker);

            // Guardar referencia en el objeto de datos para acceso rápido
            centro.markerRef = marker;
        });
    }

    focusCentro(centro) {
        if (!centro.coords || centro.coords.length !== 2) return;

        this.highlightCard(centro.id);

        // Desplazar mapa suavemente y abrir popup
        this.map.setView(centro.coords, 15);
        if (centro.markerRef) {
            centro.markerRef.openPopup();
        }

        // En pantallas móviles, desplazar la pantalla suavemente hacia el mapa
        if (window.innerWidth < 992) {
            document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    highlightCard(id) {
        // Quitar resaltado de todas
        document.querySelectorAll('.centro-card').forEach(c => {
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
        this.distritoSelect.addEventListener('change', () => this.handleFilters());

        // Centrar mapa
        this.centerMapBtn.addEventListener('click', () => {
            this.map.setView([18.7357, -70.1627], 8);
        });

        // Limpiar filtros
        this.resetFiltersBtn.addEventListener('click', () => {
            this.searchInput.value = '';
            this.distritoSelect.value = '';
            this.handleFilters();
        });
    }

    handleFilters() {
        const query = this.searchInput.value.toLowerCase().trim();
        const selectedDistrito = this.distritoSelect.value;

        // Filtrar datos
        const filteredData = sedesCentros.filter(centro => {
            // 1. Filtro de búsqueda
            const matchesQuery = !query ||
                centro.nombre.toLowerCase().includes(query) ||
                centro.direccion.toLowerCase().includes(query) ||
                (centro.director && centro.director.toLowerCase().includes(query)) ||
                (centro.distrito && centro.distrito.includes(query)) ||
                (centro.codigo && centro.codigo.includes(query));

            // 2. Filtro de Distrito
            const matchesDistrito = !selectedDistrito || centro.distrito === selectedDistrito;

            return matchesQuery && matchesDistrito;
        });

        // Actualizar vistas
        this.renderList(filteredData);
        this.renderMarkers(filteredData);

        // Actualizar contador
        if (filteredData.length === 1) {
            this.resultsCountText.textContent = "1 centro educativo encontrado";
        } else {
            this.resultsCountText.textContent = `${filteredData.length} centros educativos encontrados`;
        }

        // Mostrar u ocultar botón de limpiar filtros
        const hasActiveFilters = query !== '' || selectedDistrito !== '';
        if (hasActiveFilters) {
            this.resetFiltersBtn.classList.remove('d-none');
        } else {
            this.resetFiltersBtn.classList.add('d-none');
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new CentrosManager();
});
