// Efeito de entrada suave dos cards ao rolar
    const cards = document.querySelectorAll(".card");
    const cardServicos = document.querySelectorAll(".card-servico");
    const avaliacoes = document.querySelectorAll(".avaliacao");
    const sections = document.querySelectorAll(".section-animate");

    // Observer para animar elementos ao entrarem na viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("card") || 
              entry.target.classList.contains("card-servico") || 
              entry.target.classList.contains("avaliacao")) {
            entry.target.classList.add("animate");
          } else {
            entry.target.classList.add("visible");
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    // Observar todos os elementos com animação
    sections.forEach(section => {
      observer.observe(section);
    });

    cards.forEach(card => {
      observer.observe(card);
    });

    cardServicos.forEach(card => {
      observer.observe(card);
    });

    avaliacoes.forEach(avaliacao => {
      observer.observe(avaliacao);
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

      document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carrosselTrack');
    const slides = document.querySelectorAll('.carrossel-slide');
    let currentIndex = 0;
    let autoPlayInterval;
    let slidesPerView = 1;

    // Determinar quantos slides mostrar por vez
    function getSlidesPerView() {
      return window.innerWidth >= 768 ? 3 : 1;
    }

    // Calcular a largura total a ser movida
    function calculateSlideWidth() {
      const firstSlide = slides[0];
      const style = window.getComputedStyle(firstSlide);
      return firstSlide.offsetWidth + 
             parseInt(style.marginLeft) + 
             parseInt(style.marginRight);
    }

    function updateCarrossel() {
      slidesPerView = getSlidesPerView();
      const slideWidth = calculateSlideWidth();
      const translateX = currentIndex * slideWidth * slidesPerView;
      track.style.transform = `translateX(-${translateX}px)`;
    }

    function nextSlide() {
      const totalSlides = slides.length;
      const maxIndex = Math.ceil(totalSlides / slidesPerView) - 1;
      
      currentIndex = (currentIndex + 1) > maxIndex ? 0 : currentIndex + 1;
      updateCarrossel();
    }

    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 4000);
    }

    // Inicializar carrossel
    updateCarrossel();
    startAutoPlay();

    // Recalcular em redimensionamento
    window.addEventListener('resize', () => {
      updateCarrossel();
    });

    // Pausar autoplay ao interagir
    track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    track.addEventListener('mouseleave', startAutoPlay);
    track.addEventListener('touchstart', () => clearInterval(autoPlayInterval));
    track.addEventListener('touchend', startAutoPlay);
  });