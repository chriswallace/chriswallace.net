document.addEventListener("DOMContentLoaded", () => {
  Splitting();
  
  const mainHeadline = document.getElementById('mainHeadline');
  
  // Create main timeline
  const mainTimeline = gsap.timeline();

  const images = document.querySelectorAll('.bio-grid__image');
  images.forEach((img, index) => {
    img.addEventListener('load', () => {
      const startX = (Math.random() - 0.5) * 200;
      const startY = (Math.random() - 0.5) * 200;
      const startRotation = (Math.random() - 0.5) * 45;

      gsap.from(img, {
        duration: 1.2,
        x: startX,
        y: startY,
        rotation: startRotation,
        opacity: 0,
        scale: 0.8,
        ease: "power2.out"
      });

      // Add floating animation to images after they appear
      const floatX = (Math.random() - 0.5) * 20;
      const floatY = (Math.random() - 0.5) * 20;
      const floatRotation = (Math.random() - 0.5) * 10;
      const duration = 1.2 + Math.random() * 1.4;

      gsap.to(img, {
        x: floatX,
        y: floatY,
        rotation: floatRotation,
        duration: duration,
        ease: "sine.inOut"
      });
    });

    // Trigger the load event manually if the image is already cached
    if (img.complete) {
      img.dispatchEvent(new Event('load'));
    }
  });

  // 1. Handle text animations for the main headline
  const chars = mainHeadline.querySelectorAll('.word > .char, .whitespace');
  if (chars.length) {
    mainTimeline.to(chars, {
      duration: 0.5,
      ease: 'Power3.easeInOut',
      y: '0',
      stagger: 0.008,
      opacity: 1,
    }, "-=0.2");
  }

  // Pause the timeline initially
  mainTimeline.pause();

  // Trigger headline animation when it scrolls into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mainTimeline.restart();
        observer.unobserve(mainHeadline);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(mainHeadline);

  // 2. Add text highlights with stagger
  const wordBlocks = mainHeadline.querySelectorAll('.word');
  mainTimeline.to(wordBlocks, {
    className: 'word text-highlight',
    stagger: {
      each: 0.3,
      from: "start",
      ease: "none"
    },
    delay: 0.4, // Delay by about a second before starting
  });

}); 