const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
}

const navLinks = document.querySelectorAll('.mobile-nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    if (menuToggle) menuToggle.classList.remove('active');
  });
});

const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.textContent = '☀️';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      themeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offset = 65;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

const modal = document.getElementById('service-modal');
const modalThumb = modal && modal.querySelector('.modal-thumb');
const modalTitle = modal && modal.querySelector('.modal-title');
const modalPrice = modal && modal.querySelector('.modal-price');
const modalDesc = modal && modal.querySelector('.modal-desc');
const modalClose = modal && modal.querySelector('.modal-close');

function openServiceModal(card) {
  if (!modal) return;
  const img = card.querySelector('.servico-thumb');
  const service = card.getAttribute('data-service') || '';
  const price = card.getAttribute('data-price') || '';
  const desc = card.getAttribute('data-desc') || '';
  if (modalThumb && img) modalThumb.src = img.src;
  if (modalTitle) modalTitle.textContent = service;
  if (modalPrice) modalPrice.textContent = price;
  if (modalDesc) modalDesc.textContent = desc;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.servico-card').forEach(card => {
  card.addEventListener('click', () => openServiceModal(card));
});

if (modalClose) modalClose.addEventListener('click', closeServiceModal);
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target && e.target.dataset && e.target.dataset.close) closeServiceModal();
  });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeServiceModal(); });
}

const heroImage = document.querySelector('.hero-image img');
if (heroImage) {
  const heroContainer = document.querySelector('.hero-image');
  let mouseX = 0;
  let mouseY = 0;
  let rotateX = 0;
  let rotateY = 0;
  
  heroContainer.addEventListener('mousemove', (e) => {
    const rect = heroContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const targetRotateX = ((y - centerY) / centerY) * 20;
    const targetRotateY = ((x - centerX) / centerX) * 20;
    
    rotateX += (targetRotateX - rotateX) * 0.08;
    rotateY += (targetRotateY - rotateY) * 0.08;
    
    heroImage.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  heroContainer.addEventListener('mouseleave', () => {
    const interval = setInterval(() => {
      rotateX *= 0.9;
      rotateY *= 0.9;
      heroImage.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
      
      if (Math.abs(rotateX) < 0.1 && Math.abs(rotateY) < 0.1) {
        clearInterval(interval);
        heroImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
    }, 16);
  });
}

const galleryModal = document.getElementById('gallery-modal');
const galleryImg = galleryModal && galleryModal.querySelector('.gallery-modal-img');
const galleryClose = galleryModal && galleryModal.querySelector('.gallery-modal-close');

document.querySelectorAll('.galeria-clickable').forEach(img => {
  img.addEventListener('click', (e) => {
    if (!galleryModal || !galleryImg) return;
    galleryImg.src = img.src;
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeGallery() {
  if (!galleryModal) return;
  galleryModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (galleryClose) galleryClose.addEventListener('click', closeGallery);
if (galleryModal) {
  galleryModal.addEventListener('click', (e) => {
    if (e.target && e.target.dataset && e.target.dataset.close) closeGallery();
  });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeGallery(); });
}