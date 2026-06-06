// --- Botón Volver Arriba (Scroll to Top) ---
document.addEventListener('DOMContentLoaded', () => {
    // Crear el botón dinámicamente
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.className = 'scroll-to-top-btn';
    scrollToTopBtn.setAttribute('aria-label', 'Volver arriba');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollToTopBtn);

    // Mostrar u ocultar el botón al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Evento de clic para scroll suave
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Tarjetas Clickables Globales (UX 2026) ---
    document.querySelectorAll('.clickable-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // No redirigir si se hace clic en botones, enlaces o elementos interactivos nativos
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('select') || e.target.closest('input')) {
                return;
            }
            const href = card.getAttribute('data-href');
            if (href) {
                window.location.href = href;
            }
        });
    });
});
