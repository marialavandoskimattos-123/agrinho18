document.addEventListener('DOMContentLoaded', () => {

    // Seletores do Fundo Parallax e do Tema
    const heroBg = document.querySelector('.hero-bg');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    // === 1. LÓGICA DE MODO ESCURO / MODO CLARO ===
    
    // Verifica se o usuário já tinha uma preferência salva anteriormente
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Ouvinte do clique de inversão de tema
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Altera o ícone de acordo com o estado atual da classe
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark'); // Salva escolha como escuro
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light'); // Salva escolha como claro
        }
    });


    // === 2. EFEITO PARALLAX DINÂMICO NO FUNDO ===
    window.addEventListener('scroll', () => {
        let scrollValue = window.scrollY;
        
        if (scrollValue <= window.innerHeight) {
            heroBg.style.top = `${scrollValue * 0.4}px`;
        }
        
        const header = document.querySelector('header');
        if (scrollValue > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // === 3. COMPORTAMENTO DE ACESSIBILIDADE (FONTE) ===
    let currentFontSize = 100;
    const fontMin = 70;
    const fontMax = 140;
    const fontStep = 10;

    const btnIncrease = document.getElementById('btn-increase');
    const btnDecrease = document.getElementById('btn-decrease');

    btnIncrease.addEventListener('click', () => {
        if (currentFontSize < fontMax) {
            currentFontSize += fontStep;
            document.documentElement.style.fontSize = `${currentFontSize}%`;
        }
    });

    btnDecrease.addEventListener('click', () => {
        if (currentFontSize > fontMin) {
            currentFontSize -= fontStep;
            document.documentElement.style.fontSize = `${currentFontSize}%`;
        }
    });


    // === 4. MENU HAMBÚRGUER MOBILE ===
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            if(icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        });
    });


    // === 5. ROLAGEM SUAVE DOS LINKS INTERNOS ===
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


    // === 6. ANIMAÇÃO TIMED DOS CARDS DE VALORES ===
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 250 * index);
    });

});
