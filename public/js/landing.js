document.addEventListener('DOMContentLoaded', function() {
  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Sticky header class adjustment on scroll
  const header = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollY = window.scrollY;
  });
  
  // Mobile menu toggle (if needed for smaller screens)
  const setupMobileMenu = () => {
    // This would be implemented if we had a mobile menu toggle button
    // For now, our responsive design handles the navigation layout
  };
  
  // Testimonial slider auto-scroll (optional enhancement)
  const testimonialSlider = document.querySelector('.testimonial-slider');
  let isDown = false;
  let startX;
  let scrollLeft;
  
  if (testimonialSlider) {
    testimonialSlider.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - testimonialSlider.offsetLeft;
      scrollLeft = testimonialSlider.scrollLeft;
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
      isDown = false;
    });
    
    testimonialSlider.addEventListener('mouseup', () => {
      isDown = false;
    });
    
    testimonialSlider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - testimonialSlider.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      testimonialSlider.scrollLeft = scrollLeft - walk;
    });
  }
  
  // Initialize any animations for elements that should animate on page load
  const animateOnLoad = () => {
    document.querySelectorAll('.fade-in').forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, 100 * index);
    });
  };
  
  animateOnLoad();
}); 