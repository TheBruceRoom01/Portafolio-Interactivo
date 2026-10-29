document.addEventListener('DOMContentLoaded', function () {

    const loader = document.getElementById('loader');
    window.addEventListener('load', function () {
        setTimeout(function () {
            if (loader) loader.classList.add('hidden');
        }, 1300);
    });
    setTimeout(function () {
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
        }
    }, 3000);

    const form = document.getElementById('formContacto');
    const alertBox = document.getElementById('formAlert');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nombre   = document.getElementById('nombre').value.trim();
        const email    = document.getElementById('email').value.trim();
        const producto = document.getElementById('producto').value;
        const mensaje  = document.getElementById('mensaje').value.trim();

        if (!nombre) { showAlert('Por favor ingresa tu nombre.', 'danger'); return; }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showAlert('Ingresa un correo electrónico válido.', 'danger');
            return;
        }
        if (!producto) { showAlert('Selecciona el producto de interés.', 'danger'); return; }

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn-loader" aria-hidden="true"></span> Enviando...';

        setTimeout(function () {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
            form.reset();
            showAlert('¡Gracias ' + nombre + '! Recibirás la cotización del "' + producto + '" en menos de 24 horas.', 'success');
        }, 1600);
    });

    function showAlert(message, type) {
        alertBox.textContent = message;
        alertBox.className = 'alert mt-3 alert-' + type;
        alertBox.classList.remove('d-none');
        clearTimeout(alertBox._t);
        alertBox._t = setTimeout(function () {
            alertBox.classList.add('d-none');
        }, 5000);
    }

    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navbarMain');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (navbarCollapse.classList.contains('show')) {
                const collapse = bootstrap.Collapse.getInstance(navbarCollapse)
                    || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                collapse.hide();
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.product-card, .feature-block, .feature-list li').forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
            observer.observe(el);
        });
    }

});