document.addEventListener("DOMContentLoaded", () => {
  Splitting();
  
  const mainHeadline = document.getElementById('mainHeadline');
  
  // Create main timeline
  const mainTimeline = gsap.timeline();

  const images = document.querySelectorAll('.bio-grid__image');
  
  // Create load promises for all images
  const imageLoadPromises = Array.from(images).map(img => {
    return new Promise(resolve => {
      if (img.complete) {
        resolve();
      } else {
        img.addEventListener('load', resolve);
      }
    });
  });

  // Initial animation for all images
  mainTimeline.from(images, {
    duration: 1.2,
    x: () => (Math.random() - 0.5) * 200,
    y: () => (Math.random() - 0.5) * 200,
    rotation: () => (Math.random() - 0.5) * 45,
    opacity: 0,
    scale: 0.8,
    ease: "power2.out",
    stagger: {
      amount: 0.6,
      from: "random"
    }
  });

  // Move text-related animations into a separate timeline
  const textTimeline = gsap.timeline();

  // Move text animations into the observer callback
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Reset and play image animations first
        mainTimeline.restart();
        
        // Then handle text animations
        const chars = mainHeadline.querySelectorAll('.word > .char, .whitespace');
        if (chars.length) {
          gsap.to(chars, {
            duration: 0.5,
            ease: 'Power3.easeInOut',
            y: '0',
            stagger: 0.008,
            opacity: 1,
          });
          
          gsap.to(mainHeadline.querySelectorAll('.word'), {
            className: 'word text-highlight',
            stagger: {
              each: 0.3,
              from: "start",
              ease: "none"
            },
            delay: 0.8,
          });
        }
        
        observer.unobserve(mainHeadline);
      }
    });
  }, { threshold: 0.1 });

  // Only pause mainTimeline
  mainTimeline.pause();

  observer.observe(mainHeadline);
}); 