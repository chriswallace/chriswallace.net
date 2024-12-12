// Add this helper function at the top level, before the DOMContentLoaded listener
function randomFloat(min, max) {
  return min + Math.random() * (max - min);
}

document.addEventListener("DOMContentLoaded", () => {
  Splitting();
  
  const mainHeadline = document.getElementById('mainHeadline');
  const preloader = document.querySelector('.content-preloader');
  const mainContent = document.querySelector('.about-content');
  const images = document.querySelectorAll('.bio-grid__image');
  
  // Don't set initial visibility with GSAP
  // Instead, rely on CSS initial state
  
  // Create load promises for all images
  const imageLoadPromises = Array.from(images).map(img => {
    return new Promise(resolve => {
      // Create a new image to preload
      const preloadImage = new Image();
      
      // When this image loads, resolve the promise
      preloadImage.onload = () => {
        img.src = preloadImage.src; // Set the source
        resolve();
      };
      
      // Start loading the image
      preloadImage.src = img.getAttribute('data-src');
      
      // If image is already cached, resolve immediately
      if (preloadImage.complete) {
        img.src = preloadImage.src;
        resolve();
      }
    });
  });

  // Wait for everything to be ready
  Promise.all([
    document.fonts.ready,
    ...imageLoadPromises,
    new Promise(resolve => setTimeout(resolve, 2000))
  ]).then(() => {
    // Fade out preloader
    gsap.to(preloader, {
      duration: 0.5,
      opacity: 0,
      onComplete: () => {
        preloader.style.display = 'none';
        
        // Show main content
        gsap.to(mainContent, {
          duration: 0.5,
          opacity: 1,
          onComplete: startMainAnimations
        });
      }
    });
  });

  function startMainAnimations() {
    // Animate images
    gsap.to(images, {
      duration: 1.2,
      opacity: 1,
      scale: 1,
      stagger: {
        amount: 0.6,
        from: "random"
      },
      ease: "power2.out",
    });

    // Then add the random position animations
    images.forEach(img => {
      gsap.from(img, {
        duration: 1.2,
        x: () => (Math.random() - 0.5) * 200,
        y: () => (Math.random() - 0.5) * 200,
        rotation: () => (Math.random() - 0.5) * 45,
        ease: "power2.out",
      });
    });

    // Handle text animations
    const chars = mainHeadline.querySelectorAll('.word > .char, .whitespace');
    if (chars.length) {
      gsap.to(chars, {
        duration: 0.5,
        ease: 'Power3.easeInOut',
        y: '0',
        stagger: 0.012,
        opacity: 1,
      });

      gsap.to(mainHeadline.querySelectorAll('.word:not([data-char="—"])'), {
        className: 'word text-highlight',
        stagger: {
          each: 0.175 * randomFloat(0.25, 1),
          from: "start",
          ease: "none"
        },
        delay: 0.8,
      });
    }
  }
}); 