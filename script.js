
console.log('script.js loaded');

// Smooth anchor scrolling for nav links
document.querySelectorAll('.nav-links a, a.cta, .footer a').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        e.preventDefault();
        const tgt = document.querySelector(href);
        if (tgt) tgt.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Scroll-to-top button
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 320) scrollBtn.classList.add('show');
    else scrollBtn.classList.remove('show');
});
scrollBtn.addEventListener('click', () => window.scrollTo({
    top: 0,
    behavior: 'smooth'
}));

// Reveal cards with IntersectionObserver
const cards = document.querySelectorAll('.card');
const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // optional: unobserve so animation runs once
            obs.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.18
});

cards.forEach(card => obs.observe(card));

// Form submission handling for the newsletter
const newsletterForm = document.querySelector('.newsletter-form');
const formStatus = document.querySelector('.form-status');

if (newsletterForm && formStatus) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = e.target.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (email && email.includes('@') && email.length > 5) {
            formStatus.textContent = 'Thank you for subscribing!';
            formStatus.style.color = 'var(--accent)';
            emailInput.value = '';
        } else {
            formStatus.textContent = 'Please enter a valid email address.';
            formStatus.style.color = '#ff6b6b';
        }
    });
}