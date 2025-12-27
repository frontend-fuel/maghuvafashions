// ========== Mobile Navigation ==========
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');

// Open menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// ========== Active Link on Scroll ==========
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ========== Dynamic Content Loader ==========
document.addEventListener('DOMContentLoaded', () => {
    loadDynamicContent();
});

async function loadDynamicContent() {
    const container = document.getElementById('dynamic-categories');
    if (!container) return;

    try {
        // Fetch directly from GitHub Raw URL with cache busting
        const repoUrl = 'https://raw.githubusercontent.com/frontend-fuel/maghuvafashions/main/data.json';
        const response = await fetch(`${repoUrl}?t=${Date.now()}`);
        const data = await response.json();

        container.innerHTML = data.map(item => `
            <div class="category-card ${item.reverse ? 'reverse' : ''}" data-aos="fade-up">
                <div class="category-image">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="category-overlay">
                        <a href="https://wa.me/918143113140?text=Hello! I'm interested in your ${item.title} collection. Please share more details."
                            class="btn btn-whatsapp" target="_blank">
                            <i class="fab fa-whatsapp"></i> Enquire Now
                        </a>
                    </div>
                </div>
                <div class="category-content">
                    <div class="category-icon">
                        <i class="${item.icon || 'fas fa-star'}"></i>
                    </div>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <ul class="category-features">
                        ${item.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
                    </ul>
                    <a href="https://wa.me/918143113140?text=Hi! I want to explore your ${item.title} collection."
                        class="order-btn" target="_blank">
                        <i class="fab fa-whatsapp"></i> View Collection
                    </a>
                </div>
            </div>
        `).join('');

        // Re-initialize tilt effect for new cards
        initTiltEffect();
    } catch (err) {
        console.error("Error loading categories:", err);
    }
}

function initTiltEffect() {
    document.querySelectorAll('.category-card, .feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ========== Header Scroll Effect ==========
const header = document.getElementById('header');

function scrollHeader() {
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 5px 30px rgba(0,0,0,0.1)';
    } else {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
}

window.addEventListener('scroll', scrollHeader);

// ========== Smooth Scroll ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Intersection Observer for Animations ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.feature-card, .product-card, .contact-card, .about-content, .about-images').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ========== Product Card Hover Effect ==========
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// ========== Category Card Animations ==========
document.querySelectorAll('.category-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'all 0.8s ease';
    observer.observe(card);
});

// ========== WhatsApp Float Button Animation ==========
const whatsappFloat = document.querySelector('.whatsapp-float');

if (whatsappFloat) {
    // Add tooltip on hover
    whatsappFloat.addEventListener('mouseenter', function () {
        this.title = 'Chat with us on WhatsApp!';
    });
}

// ========== Parallax Effect on Hero ==========
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;

    if (hero && scrolled < window.innerHeight) {
        const heroImage = document.querySelector('.hero-image-wrapper');
        const floatingShapes = document.querySelectorAll('.floating-shape');

        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.15}px) rotate(${scrolled * 0.02}deg)`;
        }

        // Parallax for floating shapes
        floatingShapes.forEach((shape, index) => {
            const speed = 0.05 * (index + 1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// ========== Preloader ==========
const preloader = document.getElementById('preloader');

window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hidden');

        // Animate hero elements after preloader
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');

        if (heroText) {
            heroText.style.animation = 'fadeInUp 0.8s ease forwards';
        }
        if (heroImage) {
            heroImage.style.animation = 'scaleIn 0.8s ease 0.3s forwards';
            heroImage.style.opacity = '0';
        }
    }, 1000);
});

// ========== Typing Effect for Hero Title ==========
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ========== Mouse Move Effect on Hero ==========
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const heroImage = document.querySelector('.hero-image-wrapper');
        if (heroImage) {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            heroImage.style.transform = `translate(${x}px, ${y}px)`;
        }
    });

    hero.addEventListener('mouseleave', () => {
        const heroImage = document.querySelector('.hero-image-wrapper');
        if (heroImage) {
            heroImage.style.transform = 'translate(0, 0)';
            heroImage.style.transition = 'transform 0.5s ease';
        }
    });
}

// ========== Smooth Counter Animation ==========
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    updateCounter();
}

// ========== Ripple Effect on Buttons ==========
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        setTimeout(() => ripple.remove(), 600);
    });
});

// ========== Back to Top Button ==========
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Re-init tilt is now handled in the dynamic loader
// document.querySelectorAll('.category-card, .feature-card').forEach(card => { ... })

// ========== Code Protection ==========
document.addEventListener('contextmenu', e => e.preventDefault());

document.onkeydown = function (e) {
    // Disable F12
    if (e.keyCode == 123) {
        return false;
    }
    // Disable Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.key === 'i')) {
        return false;
    }
    // Disable Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 'J'.charCodeAt(0) || e.key === 'j')) {
        return false;
    }
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && (e.keyCode == 'U'.charCodeAt(0) || e.key === 'u')) {
        return false;
    }
    // Disable Ctrl+S (Save Page)
    if (e.ctrlKey && (e.keyCode == 'S'.charCodeAt(0) || e.key === 's')) {
        return false;
    }
};

// ========== Console Log ==========
console.log('%c Maghuva Fashions 🌺', 'color: #8B1538; font-size: 24px; font-weight: bold;');
console.log('%c Elegance in Every Thread', 'color: #D4AF37; font-size: 14px;');
console.log('%c ✨ Premium Fashion Destination', 'color: #6B7280; font-size: 12px;');
