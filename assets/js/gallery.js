/* =====================================================
   GALLERY & LIGHTBOX SYSTEM
   Image filtering and modal lightbox
   ===================================================== */

// Gallery data
const galleryImages = [
  { id: 1, category: 'valorant', title: 'Valorant Championship', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800' },
  { id: 2, category: 'cs2', title: 'CS2 Tournament Finals', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800' },
  { id: 3, category: 'lol', title: 'League of Legends Worlds', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800' },
  { id: 4, category: 'apex', title: 'Apex Legends Arena', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800' },
  { id: 5, category: 'valorant', title: 'Team Phoenix Victory', image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800' },
  { id: 6, category: 'cs2', title: 'Counter-Strike Champions', image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800' },
  { id: 7, category: 'lol', title: 'LoL Grand Finals', image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800' },
  { id: 8, category: 'apex', title: 'Apex Battle Royale', image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800' },
  { id: 9, category: 'valorant', title: 'Valorant Pro League', image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=800' }
];

let currentImageIndex = 0;

// ==================== FILTER GALLERY ====================
function initGalleryFilters() {
  const filterButtons = document.querySelectorAll('[data-filter]');
  const galleryContainer = document.querySelector('[data-gallery-grid]');
  
  if (!filterButtons.length || !galleryContainer) return;
  
  // Render initial gallery
  renderGallery('all');
  
  // Filter button click handlers
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter gallery
      const filter = button.getAttribute('data-filter');
      renderGallery(filter);
    });
  });
}

// ==================== RENDER GALLERY ====================
function renderGallery(filter) {
  const galleryContainer = document.querySelector('[data-gallery-grid]');
  if (!galleryContainer) return;
  
  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);
  
  galleryContainer.innerHTML = filteredImages.map((img, index) => `
    <div class="gallery-item reveal" data-testid="gallery-item-${img.id}" style="cursor: pointer;">
      <div class="card" style="padding: 0; overflow: hidden; height: 280px;">
        <img 
          src="${img.image}" 
          alt="${img.title}" 
          loading="lazy"
          style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;"
          data-lightbox-trigger="${index}"
        />
        <div class="gallery-overlay" style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%);
          display: flex;
          align-items: flex-end;
          padding: var(--space-lg);
          opacity: 0;
          transition: opacity 0.3s ease;
        ">
          <h4 style="margin: 0; font-size: 1rem; color: var(--color-text);">${img.title}</h4>
        </div>
      </div>
    </div>
  `).join('');
  
  // Add hover effects
  const galleryItems = galleryContainer.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    const overlay = item.querySelector('.gallery-overlay');
    
    item.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.1)';
      overlay.style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
      overlay.style.opacity = '0';
    });
    
    // Lightbox trigger
    img.addEventListener('click', () => {
      const index = parseInt(img.getAttribute('data-lightbox-trigger'));
      openLightbox(index, filteredImages);
    });
  });
  
  // Re-initialize scroll reveal for new items
  if (typeof initScrollReveal === 'function') {
    initScrollReveal();
  }
}

// ==================== LIGHTBOX MODAL ====================
function openLightbox(index, images) {
  currentImageIndex = index;
  const currentImage = images[currentImageIndex];
  
  // Create lightbox if it doesn't exist
  let lightbox = document.querySelector('[data-lightbox]');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.setAttribute('data-lightbox', '');
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: var(--space-xl);
    `;
    
    lightbox.innerHTML = `
      <button data-lightbox-close style="
        position: absolute;
        top: var(--space-lg);
        right: var(--space-lg);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid var(--color-border);
        color: var(--color-text);
        font-size: 1.5rem;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
      " data-testid="lightbox-close">
        ✕
      </button>
      
      <button data-lightbox-prev style="
        position: absolute;
        left: var(--space-lg);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid var(--color-border);
        color: var(--color-text);
        font-size: 1.5rem;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
      " data-testid="lightbox-prev">
        ‹
      </button>
      
      <button data-lightbox-next style="
        position: absolute;
        right: var(--space-lg);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid var(--color-border);
        color: var(--color-text);
        font-size: 1.5rem;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
      " data-testid="lightbox-next">
        ›
      </button>
      
      <div style="max-width: 1200px; width: 100%; text-align: center;">
        <img data-lightbox-image src="" alt="" style="max-width: 100%; max-height: 80vh; border-radius: var(--radius-lg);" />
        <h3 data-lightbox-title style="margin-top: var(--space-lg); color: var(--color-text);"></h3>
      </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Event listeners
    lightbox.querySelector('[data-lightbox-close]').addEventListener('click', closeLightbox);
    lightbox.querySelector('[data-lightbox-prev]').addEventListener('click', () => navigateLightbox(-1, images));
    lightbox.querySelector('[data-lightbox-next]').addEventListener('click', () => navigateLightbox(1, images));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  
  // Update lightbox content
  lightbox.querySelector('[data-lightbox-image]').src = currentImage.image;
  lightbox.querySelector('[data-lightbox-title]').textContent = currentImage.title;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.querySelector('[data-lightbox]');
  if (lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function navigateLightbox(direction, images) {
  currentImageIndex += direction;
  if (currentImageIndex < 0) currentImageIndex = images.length - 1;
  if (currentImageIndex >= images.length) currentImageIndex = 0;
  
  const currentImage = images[currentImageIndex];
  document.querySelector('[data-lightbox-image]').src = currentImage.image;
  document.querySelector('[data-lightbox-title]').textContent = currentImage.title;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const lightbox = document.querySelector('[data-lightbox]');
  if (lightbox && lightbox.style.display === 'flex') {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1, galleryImages);
    if (e.key === 'ArrowRight') navigateLightbox(1, galleryImages);
  }
});

// ==================== INITIALIZE GALLERY ====================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGalleryFilters);
} else {
  initGalleryFilters();
}