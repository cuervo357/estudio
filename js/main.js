// Smooth scrolling for navigation links
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

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formDataObj = {};
        formData.forEach((value, key) => formDataObj[key] = value);
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Gracias por su consulta. Nos pondremos en contacto con usted a la brevedad.');
        this.reset();
    });
}

// Animate stats when they come into view
const stats = document.querySelectorAll('.stat-number');
const animateStats = () => {
    stats.forEach(stat => {
        const value = stat.innerText;
        if (isElementInViewport(stat) && !stat.classList.contains('animated')) {
            animateValue(stat, 0, parseInt(value), 2000);
            stat.classList.add('animated');
        }
    });
};

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Helper function to animate numbers
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Form validation messages in Spanish
const form = document.querySelector('.contact-form');
if (form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            if (!e.target.validity.valid) {
                if (e.target.validity.valueMissing) {
                    e.target.setCustomValidity('Este campo es obligatorio');
                } else if (e.target.validity.typeMismatch) {
                    if (e.target.type === 'email') {
                        e.target.setCustomValidity('Por favor, ingrese un correo electrónico válido');
                    } else if (e.target.type === 'tel') {
                        e.target.setCustomValidity('Por favor, ingrese un número de teléfono válido');
                    }
                }
            }
        });
        
        input.addEventListener('input', (e) => {
            e.target.setCustomValidity('');
        });
    });
}

// Listen for scroll events to trigger animations
window.addEventListener('scroll', animateStats);
// Initial check for stats in view
document.addEventListener('DOMContentLoaded', animateStats); 