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
  const contentSections = document.querySelectorAll('.content-container > .max-w-prose > *');
  
  // Create load promises for all images
  const imageLoadPromises = Array.from(images).map(img => {
    return new Promise(resolve => {
      const preloadImage = new Image();
      preloadImage.onload = () => {
        img.src = preloadImage.src;
        resolve();
      };
      preloadImage.src = img.getAttribute('data-src');
      if (preloadImage.complete) {
        img.src = preloadImage.src;
        resolve();
      }
    });
  });

  // Initial setup - hide content sections
  gsap.set(contentSections, { 
    opacity: 0,
    y: 30
  });

  // Wait for everything to be ready
  Promise.all([
    document.fonts.ready,
    ...imageLoadPromises,
    new Promise(resolve => setTimeout(resolve, 2000))
  ]).then(() => {
    // Create main timeline
    const mainTL = gsap.timeline();

    // Fade out preloader
    mainTL.to(preloader, {
      duration: 0.5,
      opacity: 0,
      onComplete: () => preloader.style.display = 'none'
    })

    // Show main content
    .to(mainContent, {
      duration: 0.5,
      opacity: 1
    })

    // Animate hero section (images and text)
    .add(animateHeroSection())

    // Animate content sections
    .add(animateContentSections(), "-=0.5");
  });

  function animateHeroSection() {
    const heroTL = gsap.timeline();

    // Animate images
    heroTL.to(images, {
      duration: 1.2,
      opacity: 1,
      scale: 1,
      stagger: {
        amount: 0.6,
        from: "random"
      },
      ease: "power2.out",
    });

    // Add random position animations
    images.forEach(img => {
      heroTL.from(img, {
        duration: 1.2,
        x: () => (Math.random() - 0.5) * 200,
        y: () => (Math.random() - 0.5) * 200,
        rotation: () => (Math.random() - 0.5) * 45,
        ease: "power2.out",
      }, "<");
    });

    // Handle text animations
    const chars = mainHeadline.querySelectorAll('.word > .char, .whitespace');
    if (chars.length) {
      heroTL.to(chars, {
        duration: 0.5,
        ease: 'Power3.easeInOut',
        y: '0',
        stagger: 0.012,
        opacity: 1,
      }, "-=1")
      .to(mainHeadline.querySelectorAll('.word:not([data-char="—"])'), {
        className: 'word text-highlight',
        stagger: {
          each: 0.175 * randomFloat(0.25, 1),
          from: "start",
          ease: "none"
        },
      }, "-=0.5");
    }

    return heroTL;
  }

  function animateContentSections() {
    return gsap.to(contentSections, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      stagger: {
        amount: 1.2,
        ease: "power2.out"
      }
    });
  }
}); 