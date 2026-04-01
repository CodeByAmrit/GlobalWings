/**
 * SkyForge Client-Side Interactivity
 * Handles search, animations, and dynamic UI feedback for the SkyForge redesign.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Select elements with logging for debugging
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const aircraftCards = document.querySelectorAll('.aircraft-card-wrapper');
  const resultCountBadge = document.getElementById('resultCountBadge');
  const heroViewer = document.getElementById('heroModelViewer');

  if (!searchInput || !searchBtn) {
    console.warn('SkyForge: Search interface elements not found in the DOM.');
  }

  /**
   * Filter Aircraft Cards based on Search Term
   * Updates visibility and result count badge.
   */
  const filterAircraft = () => {
    if (!searchInput) return;
    const searchTerm = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    aircraftCards.forEach((card) => {
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const model = (card.getAttribute('data-model') || '').toLowerCase();
      const type = (card.getAttribute('data-type') || '').toLowerCase();

      if (
        name.includes(searchTerm) ||
        model.includes(searchTerm) ||
        type.includes(searchTerm)
      ) {
        card.style.display = 'block';
        card.classList.add('card-animate');
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.classList.remove('card-animate');
      }
    });

    // Update result count badge
    if (resultCountBadge) {
      resultCountBadge.innerHTML = `<i class="bi bi-airplane me-1"></i> ${visibleCount} ${visibleCount === 1 ? 'airframe' : 'airframes'} active`;
    }
  };

  // Live Search on Input
  if (searchInput) {
    searchInput.addEventListener('input', filterAircraft);

    // Handle Enter key
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        filterAircraft();
      }
    });
  }

  // Search Button Click
  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      filterAircraft();
    });
  }

  /**
   * Subtle Hero Interaction
   * Adjusts the 3D model orbit slightly on scroll for a dynamic feel.
   */
  if (heroViewer) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < 600) {
        const rotateVal = 75 + scrollY * 0.05;
        heroViewer.setAttribute('camera-orbit', `${rotateVal}deg 85deg auto`);
      }
    });
  }

  // Intersection Observer for scroll reveal (for cards)
  if (aircraftCards.length > 0) {
    const revealOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    aircraftCards.forEach((card) => {
      revealOnScroll.observe(card);
    });
  }

  // Startup feedback
  console.log('SkyForge Intelligence Core: ACTIVE');
});
