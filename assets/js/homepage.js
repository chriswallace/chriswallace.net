document.addEventListener("DOMContentLoaded", () => {
  Splitting();

  const sections = document.querySelectorAll('.text-container');
  const preloader = document.querySelector('.content-preloader');
  const headlines = document.querySelectorAll('.animated-headline');
  const aboutSection = document.querySelector('#aboutSection');
  const workStatus = document.querySelector('#workStatus');

  // Initial setup - hide all content
  gsap.set([headlines, aboutSection, workStatus], { 
    opacity: 0,
    y: 30
  });

  // Handle text animations separately
  sections.forEach((section) => {
    const chars = section.querySelectorAll('.text-paragraph .word > .char, .whitespace');
    if (chars.length) {
      gsap.set(chars, { opacity: 0, y: 30 });
    }
  });

  // Wait for everything to be ready
  Promise.all([
    document.fonts.ready,
    new Promise(resolve => setTimeout(resolve, 2000)) // Simulate loading delay
  ]).then(() => {
    // Create main timeline
    const mainTimeline = gsap.timeline()
      // Fade out preloader
      .to(preloader, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          if (preloader) {
            preloader.style.display = 'none';
          }
        }
      })
      // Show headlines
      .to(headlines, {
        duration: 0.3,
        opacity: 1,
        y: 0,
        ease: "power2.out"
      });

    // Handle text animations
    sections.forEach((section) => {
      const chars = section.querySelectorAll('.text-paragraph .word > .char, .whitespace');
      if (chars.length) {
        mainTimeline.to(chars, {
          duration: 0.5,
          ease: 'Power3.easeInOut',
          y: '0',
          stagger: 0.01,
          opacity: 1,
        }, "-=0.2");
      }
    });

    // About section animation
    if (aboutSection) {
      mainTimeline.to(aboutSection, {
        duration: 0.8,
        opacity: 1,
        y: 0,
        ease: "power3.out"
      }, "-=0.3"); // Overlap with previous animation
    }

    // Work status animated elements
    if (workStatus) {
      mainTimeline.to(workStatus, {
        duration: 0.8,
        opacity: 1,
        y: 0,
        ease: "power3.out"
      }, "-=0.3"); // Ensure workStatus itself is animated

      const animatedElements = workStatus.querySelectorAll('.animated');
      if (animatedElements.length) {
        mainTimeline.to(animatedElements, {
          duration: 0.6,
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.1"); 
      }
    }
  });
});