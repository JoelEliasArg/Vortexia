// Scripts for Vortexia
document.addEventListener('DOMContentLoaded', () => {

    // 1. Menú Móvil: Esto lo hice para poder abrir y cerrar el menú en dispositivos pequeños.
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Opcional: Dejé esto comentado por si luego quiero animar el ícono del menú.
            // mobileMenuBtn.classList.toggle('open');
        });
    }

    // 2. Desplazamiento Suave: Agregué esto para que la navegación entre secciones se sienta fluida y no brusca.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Si el menú está abierto, lo cierro automáticamente para que el usuario vea el contenido.
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Validación del Formulario: Esto lo puse para verificar que el correo sea real antes de enviarlo.
    const newsletterForm = document.getElementById('newsletterForm');
    const formMessage = document.getElementById('formMessage');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (validateEmail(email)) {
                // Simulo que el envío fue exitoso y le muestro un mensaje bonito al usuario.
                formMessage.style.color = '#00f2ea'; // Color de éxito (verde/turquesa)
                formMessage.textContent = '¡Gracias por suscribirte!';
                emailInput.value = '';

                setTimeout(() => {
                    formMessage.textContent = '';
                }, 3000);
            } else {
                formMessage.style.color = '#ff0055'; // Color de error (rojo) para que resalte.
                formMessage.textContent = 'Por favor, introduce un correo válido.';
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // 4. Animaciones al hacer Scroll: Seleccioné estos elementos para que aparezcan con estilo cuando bajas la página.
    // Select elements to animate
    const animatedElements = document.querySelectorAll('.section-title, .product-card, .feature-item, .hero-content, .hero-visual, .testimonial-card');

    // Les agrego la clase 'reveal' al inicio para ocultarlos y que luego aparezcan.
    animatedElements.forEach(el => el.classList.add('reveal'));

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejo de observarlo para que la animación solo pase una vez.
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // --- Medidas de Seguridad ---

    // Deshabilitar Clic Derecho: Esto lo hice para dificultar que copien el contenido.
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Deshabilitar Atajos de Teclado: Bloqueé estas teclas para que no puedan inspeccionar el código fácilmente.
    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.key === 'u') ||
            (e.ctrlKey && e.shiftKey && e.key === 'i') ||
            (e.ctrlKey && e.shiftKey && e.key === 'j') || // Consola
            (e.ctrlKey && e.key === 's') // Guardar
        ) {
            e.preventDefault();
        }
    });

    // Deshabilitar Arrastre de Imágenes: Esto es para que no puedan arrastrar las imágenes al escritorio.
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    });
});

