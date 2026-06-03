// slider.js - Funcionalidad para el slider automático
document.addEventListener("DOMContentLoaded", function () {
    const slidesWrapper = document.querySelector(".slides-wrapper");
    const slides = document.querySelectorAll(".slide-item");
    let currentIndex = 0;
    let slideInterval;

    if (!slidesWrapper || slides.length === 0) return;

    // Configuración inicial del slider
    function initSlider() {
        // NO forzamos dimensiones CSS desde JavaScript
        // Las proporciones se manejan desde el CSS

        // Iniciar el movimiento automático
        startAutoSlide();
    }

    // Función para mover al siguiente slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSliderPosition();
    }

    // Función para actualizar la posición del slider
    function updateSliderPosition() {
        // Solo movemos el wrapper, sin afectar dimensiones de las imágenes
        slidesWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Iniciar movimiento automático
    function startAutoSlide() {
        // Limpiar intervalo existente si hay uno
        if (slideInterval) {
            clearInterval(slideInterval);
        }

        // Establecer nuevo intervalo (cada 4 segundos)
        slideInterval = setInterval(nextSlide, 4000);
    }

    // Pausar el slider al hacer hover
    function setupHoverPause() {
        const slider = document.querySelector('.photo-slider');

        slider.addEventListener('mouseenter', function () {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        });

        slider.addEventListener('mouseleave', function () {
            startAutoSlide();
        });
    }

    // Inicializar el slider
    initSlider();
    setupHoverPause();
});