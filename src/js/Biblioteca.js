// wwwroot/js/biblioteca-slider.js
class BibliotecaSlider {
    constructor() {
        this.slider = document.querySelector('.categorias-slider');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.cards = document.querySelectorAll('.categoria-card');
        this.container = document.querySelector('.categorias-slider-container');

        this.currentIndex = 0;
        this.cardsPerView = 3;

        this.init();
    }

    init() {
        this.calculateCardsPerView();
        this.attachEventListeners();
        this.updateSlider();

        // Recalcular en resize con debounce
        window.addEventListener('resize', this.debounce(() => {
            this.calculateCardsPerView();
            this.updateSlider();
        }, 250));
    }

    calculateCardsPerView() {
        if (window.innerWidth < 576) this.cardsPerView = 1;
        else if (window.innerWidth < 768) this.cardsPerView = 1;
        else if (window.innerWidth < 992) this.cardsPerView = 2;
        else this.cardsPerView = 3;
    }

    updateSlider() {
        const cardWidth = this.cards[0].offsetWidth + 30;
        const maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
        this.currentIndex = Math.min(this.currentIndex, maxIndex);

        const translateX = this.currentIndex * cardWidth;
        this.slider.style.transform = `translateX(-${translateX}px)`;
        this.updateButtons();
    }

    updateButtons() {
        const maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= maxIndex;
    }

    next() {
        const maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateSlider();
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSlider();
        }
    }

    attachEventListeners() {
        this.nextBtn.addEventListener('click', () => this.next());
        this.prevBtn.addEventListener('click', () => this.prev());

        // Efectos hover
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    new BibliotecaSlider();
});