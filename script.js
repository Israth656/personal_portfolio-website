document.addEventListener('DOMContentLoaded', () => {
    // ===== DARK MODE TOGGLE =====
    const body = document.body;
    const desktopToggle = document.getElementById('toggle');
    const mobileToggle = document.getElementById('mobile-toggle');
    const savedMode = localStorage.getItem('darkMode');
    function toggleDarkMode(checked) {
        body.classList.toggle('dark', checked);
        body.classList.toggle('light', !checked);
        localStorage.setItem('darkMode', checked ? 'true' : 'false');
        if (desktopToggle) desktopToggle.checked = checked;
        if (mobileToggle) mobileToggle.checked = checked;
    }
    if (savedMode === 'true') toggleDarkMode(true);
    else toggleDarkMode(false);
    if (desktopToggle) desktopToggle.addEventListener('change', () => toggleDarkMode(desktopToggle.checked));
    if (mobileToggle) mobileToggle.addEventListener('change', () => toggleDarkMode(mobileToggle.checked));

    // Animate entire page on load
    document.body.classList.add('page-show');

    // ===== MOBILE MENU TOGGLE =====
   const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        // Close mobile menu when a nav-link is clicked
        mobileMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // ===== NAVBAR ANIMATION =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        setTimeout(() => {
            navbar.classList.add('navbar-show');
        }, 100);
    }

    // ===== SCROLL TO TOP BUTTON =====
    const scrollBtn = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        if (scrollBtn) {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        }
    });
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== SKILL CARD & ICON ANIMATION ON SCROLL =====
    const skillCards = document.querySelectorAll('.skill-card');
    const observerOptions = { threshold: 0.1 };
    const showOnScroll = (elements, showClass) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(showClass);
                }
            });
        }, observerOptions);
        elements.forEach(el => observer.observe(el));
    };
    showOnScroll(skillCards, 'show');

    // ===== STAGGERED DROP-IN FOR SKILL ICONS =====
    const iconItems = document.querySelectorAll('.icon-item');
    const iconObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                iconItems.forEach((icon, idx) => {
                    setTimeout(() => icon.classList.add('show'), idx * 300);
                });
            }
        });
    }, { threshold: 0.1 });
    iconItems.forEach(icon => iconObserver.observe(icon));

    // ===== SKILL BAR ANIMATION =====
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        if (targetWidth) {
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 500);
        }
    });

    // ===== CONTACT FORM VALIDATION =====
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const subject = document.getElementById('subject')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!name || !email || !subject || !message) {
                if (formError) {
                    formError.textContent = '❌ Please fill out all fields.';
                    formError.classList.remove('hidden');
                    formSuccess?.classList.add('hidden');
                }
                return;
            }
            if (!emailPattern.test(email)) {
                if (formError) {
                    formError.textContent = '❌ Please enter a valid email address.';
                    formError.classList.remove('hidden');
                    formSuccess?.classList.add('hidden');
                }
                return;
            }
            if (formSuccess) {
                formSuccess.textContent = '✅ Your message has been sent successfully!';
                formSuccess.classList.remove('hidden');
                formError?.classList.add('hidden');
            }
            contactForm.reset();
        });
    }

    // ===== ATTRACTIVE ANIMATIONS ON SCROLL =====
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-scale');
            }
        });
    }, { threshold: 0.2 });
    animatedElements.forEach(el => animationObserver.observe(el));

    // ===== TYPEWRITER ANIMATION FOR NAME =====
const typewriterName = document.getElementById('typewriter-name');
const nameWords = ["Israth Begum"];
let nameWordIndex = 0;
let nameCharIndex = 0;
let nameIsDeleting = false;

function typeName() {
    const currentName = nameWords[nameWordIndex];
    let displayText = currentName.substring(0, nameCharIndex);
    if (typewriterName) typewriterName.textContent = displayText;

    if (!nameIsDeleting && nameCharIndex < currentName.length) {
        nameCharIndex++;
        setTimeout(typeName, 120);
    } else if (nameIsDeleting && nameCharIndex > 0) {
        nameCharIndex--;
        setTimeout(typeName, 60);
    } else {
        if (!nameIsDeleting) {
            setTimeout(() => { nameIsDeleting = true; typeName(); }, 1000);
        } else {
            nameIsDeleting = false;
            nameWordIndex = (nameWordIndex + 1) % nameWords.length;
            setTimeout(typeName, 400);
        }
    }
}
if (typewriterName) typeName();

    // ===== TYPEWRITER ANIMATION FOR HERO SUBTITLE =====
    const typewriter = document.getElementById('typewriter');
const words = ["Web Designer", "Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    let displayText = currentWord.substring(0, charIndex);
    if (typewriter) typewriter.textContent = displayText;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, 120);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 60);
    } else {
        if (!isDeleting) {
            setTimeout(() => { isDeleting = true; type(); }, 1000);
        } else {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 400);
        }
    }
}
if (typewriter) type();
});
