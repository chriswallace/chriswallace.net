document.addEventListener("DOMContentLoaded", () => {
  Splitting();

  // Start animations immediately since we no longer need to wait for arden image
  startGSAPAnimations();
});

function startGSAPAnimations() {
  const sections = document.querySelectorAll('.text-container');
  const preloader = document.querySelector('.content-preloader');
  const headlines = document.querySelectorAll('.animated-headline');
  const aboutSection = document.querySelector('#aboutSection');
  const workStatus = document.querySelector('#workStatus');

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
      visibility: 'visible',
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
    // Set initial state
    gsap.set(aboutSection, {
      opacity: 0,
      y: 12
    });

    // Add to main timeline
    mainTimeline.to(aboutSection, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "power3.out"
    }); // Overlap with previous animation
  }

  // Work status animated elements
  if (workStatus) {
    const animatedElements = workStatus.querySelectorAll('.animated');
    if (animatedElements.length) {
      // Set initial state
      gsap.set(animatedElements, {
        opacity: 0,
        y: 20
      });

      // Add to main timeline
      mainTimeline.to(animatedElements, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3"); 
    }
  }
}