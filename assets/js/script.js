// ===== LOADER =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 800);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Navbar background
  navbar.classList.toggle('scrolled', scrollY > 50);

  // Back to top button
  backToTop.classList.toggle('visible', scrollY > 400);

  // Active nav link
  updateActiveNav();

  // Animate skill bars on scroll
  animateSkillBars();
});

// ===== ACTIVE NAV LINK =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Mobile dropdown toggle
const dropdownToggle = document.querySelector('.dropdown-toggle');
if (dropdownToggle) {
  dropdownToggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdownToggle.closest('.nav-dropdown').classList.toggle('open');
    }
  });
}

// ===== TYPEWRITER EFFECT =====
const typewriterEl = document.getElementById('typewriter');
const titles = [
  'Junior Python Developer',
  'Frontend Developer',
  'Full Stack Web Developer',
  'Diseñadora de Interfaces'
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typewriter() {
  const currentTitle = titles[titleIndex];

  if (isDeleting) {
    typewriterEl.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentTitle.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    speed = 500;
  }

  setTimeout(typewriter, speed);
}

typewriter();

// ===== STAT COUNTER ANIMATION =====
const statCards = document.querySelectorAll('.stat-card');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;

  const heroSection = document.getElementById('home');
  const rect = heroSection.getBoundingClientRect();
  if (rect.top > window.innerHeight || rect.bottom < 0) return;

  statsAnimated = true;

  statCards.forEach(card => {
    const target = parseInt(card.dataset.count);
    const numberEl = card.querySelector('.stat-number');
    const suffix = numberEl.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      numberEl.textContent = Math.floor(current) + suffix;
    }, 40);
  });
}

window.addEventListener('scroll', animateStats);
animateStats();

// ===== SKILL BARS ANIMATION =====
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;
  const skillBars = document.querySelectorAll('.skill-progress');
  if (skillBars.length === 0) return;

  const firstBar = skillBars[0];
  const rect = firstBar.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    skillsAnimated = true;
    skillBars.forEach(bar => {
      const width = bar.dataset.width;
      bar.style.width = width + '%';
    });
  }
}

// ===== PORTFOLIO FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.5s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== SCROLL ANIMATIONS =====
const animateElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animated');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animateElements.forEach(el => observer.observe(el));

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje enviado!';
      btn.style.background = 'linear-gradient(135deg, #00d4aa, #00b894)';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    }, 1500);
  });
}

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      background: rgba(108, 99, 255, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
    `;
    container.appendChild(particle);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0% { transform: translateY(0) translateX(0); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

createParticles();

// ===== SMOOTH SCROLL FOR ALL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

