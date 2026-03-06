// ======================= CONTROLE DO MENU MOBILE =======================
const menuIcon = document.querySelector('#menu-icon');
const navList = document.querySelector('.navlist'); // CORRIGIDO: era '.nav-list'

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navList.classList.toggle('open');
    document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : 'auto';
});

document.querySelectorAll('.navlist a').forEach(link => { // CORRIGIDO: era '.nav-list a'
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
});

window.addEventListener('scroll', () => {
    if (navList.classList.contains('open')) {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});


// ======================= NAVEGAÇÃO ATIVA =======================
const navLinks = document.querySelectorAll('.navlist a'); // CORRIGIDO: era '.nav-list a'

function activeLink() {
    navLinks.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
}

navLinks.forEach(link => link.addEventListener('click', activeLink));


// ===================== ALTERNAR MODO CLARO/ESCURO =====================
function toggleMode() {
    const html = document.documentElement;
    html.classList.toggle('light');

    const mode = html.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);

    updateTextColor();
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.documentElement.classList.add('light');
}


// ===================== ANIMAÇÃO DO TÍTULO =====================
const titleElement = document.querySelector('#name');
const text = "KAUE RODRIGUES";
let index = 0;
let isTyping = true;
let currentColor = document.documentElement.classList.contains('light') ? '#000' : '#fff';

function animateText() {
    if (isTyping) {
        if (index < text.length) {
            titleElement.textContent = text.slice(0, index + 1);
            index++;
        } else {
            isTyping = false;
        }
    } else {
        if (index > 1) {
            titleElement.textContent = text.slice(0, index - 1);
            index--;
        } else {
            isTyping = true;

            const isLight = document.documentElement.classList.contains('light');
            const primaryColor = isLight ? '#000' : '#fff';
            const secondaryColor = isLight ? '#0058cc' : '#bb001c';

            currentColor = currentColor === primaryColor ? secondaryColor : primaryColor;
            titleElement.style.color = currentColor;
        }
    }
    setTimeout(animateText, 300);
}

function updateTextColor() {
    const isLight = document.documentElement.classList.contains('light');
    currentColor = isLight ? '#000' : '#fff';
    titleElement.style.color = currentColor;
}


// ===================== CARREGAMENTO DA PÁGINA =====================
document.addEventListener('DOMContentLoaded', () => {

    updateTextColor();
    animateText();

    // ========= ANIMAÇÃO DA SEÇÃO HOME =========
    const homeSection = document.querySelector('#home');
    homeSection.style.opacity = 0;
    homeSection.style.transition = 'opacity 1s ease, transform 1s ease';
    homeSection.style.transform = 'translateY(20px)';

    setTimeout(() => {
        homeSection.style.opacity = 1;
        homeSection.style.transform = 'translateY(0)';
    }, 100);

    // ====================== ANIMAÇÃO DAS SEÇÕES =======================
    const sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
        section.style.opacity = 0;
        section.style.transition = 'opacity 1s ease, transform 1s ease';

        if (index !== 0) {
            if (index === 1) section.style.transform = 'translateX(100px)';
            else if (index === 2) section.style.transform = 'scale(0.8)';
            else if (index === 3) section.style.transform = 'rotateY(90deg)';
        }
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'none';
            }
        });
    });

    sections.forEach(section => observer.observe(section));

    // ===================== BOTÃO DE VOLTAR AO TOPO ====================
    // CORRIGIDO: era 'document.queruSelector' (typo) e faltava o parâmetro 'e'
    document.querySelector('.top a').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===================== CARROSSEL DE PROJETOS =======================
    const carouselSlides = document.querySelector('.carousel-slides');
    const prevButton = document.querySelector('.carousel-button.prev'); // CORRIGIDO: era '.carousel-prev'
    const nextButton = document.querySelector('.carousel-button.next'); // CORRIGIDO: era '.carousel-next'
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(slideIndex) {
        if (slideIndex < 0) currentSlide = slides.length - 1;
        else if (slideIndex >= slides.length) currentSlide = 0;
        else currentSlide = slideIndex;

        updateSlidePosition();
    }

    function updateSlidePosition() {
        const slideWidth = slides[0].offsetWidth;
        carouselSlides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
        resetAutoSlide();
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
        resetAutoSlide();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    showSlide(currentSlide);
    startAutoSlide();

    window.addEventListener('resize', () => {
        updateSlidePosition();
    });

    carouselSlides.parentElement.addEventListener('mouseleave', startAutoSlide);

    // ====================== FORMULÁRIO DE CONTATO =======================
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        thankYouMessage.style.display = 'block';

        const formData = new FormData(contactForm);
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                setTimeout(() => window.location.reload(), 2000);
            } else {
                alert('Erro ao enviar formulário');
            }
        })
        .catch(() => alert('Erro na conexão. Tente novamente'));
    });

    // ================== ANIMAÇÃO DA SEÇÃO "SOBRE MIM" =================
    // CORRIGIDO: removido código com 'React.top' que era inválido
    const aboutSection = document.querySelector('.about');

    function checkAboutVisibility() {
        const windowHeight = window.innerHeight;
        const rect = aboutSection.getBoundingClientRect();

        if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
            aboutSection.classList.add('visible');
            window.removeEventListener('scroll', checkAboutVisibility);
        }
    }

    window.addEventListener('scroll', checkAboutVisibility);
    checkAboutVisibility();

}); // fim do DOMContentLoaded