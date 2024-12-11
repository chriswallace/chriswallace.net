document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const videoPlayer = document.querySelector('video-player');
  const preloader = document.querySelector('.content-preloader');
  const playButton = document.getElementById('playButton');
  const controls = document.querySelector('.portfolio__controls');

  Splitting();
  
  // Set initial states
  if (videoPlayer) {
    videoPlayer.style.opacity = '0';
    videoPlayer.style.transform = 'scale(0.95)';
    
    const video = videoPlayer.shadowRoot.querySelector('video');
    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Auto-play failed:", error);
        });
      }
    }
  }
  
  if (controls) {
    controls.classList.add('invisible');
  }
  
  if (playButton) {
    playButton.style.display = 'flex';
  }
  
  // Ensure video starts muted and playing
  if (videoPlayer) {
    const video = videoPlayer.shadowRoot.querySelector('video');
    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Auto-play failed:", error);
        });
      }
    }
  }

  // Wait for everything to be ready
  Promise.all([
    document.fonts.ready,
    new Promise(resolve => {
      if (videoPlayer) {
        const video = videoPlayer.shadowRoot.querySelector('video');
        if (video && video.readyState >= 2) {
          resolve();
        } else if (video) {
          video.addEventListener('loadeddata', resolve, { once: true });
        }
      }
    }),
  ]).then(() => {
    // Start animations
    startGSAPAnimations();
  });
});

function startGSAPAnimations() {
  const sections = document.querySelectorAll('.text-container');
  const videoPlayer = document.querySelector('video-player');
  const preloader = document.querySelector('.content-preloader');
  const headlines = document.querySelectorAll('.animated-headline');
  const aboutSection = document.querySelector('#aboutSection');

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

  // Update video animation
  if (videoPlayer) {
    // First ensure initial styles are applied
    gsap.set(videoPlayer, {
      opacity: 0,
      scale: 1,
      top: 16
    });
    
    // Animate the video-player element
    mainTimeline.to(videoPlayer, {
      duration: 0.8,
      opacity: 1,
      scale: 1,
      top: 0,
      ease: "power2.out"
    });
  }
  
  // Handle text animations
  sections.forEach((section) => {
    const chars = section.querySelectorAll('.text-paragraph .word > .char, .whitespace');
    if (chars.length) {
      mainTimeline.to(chars, {
        duration: 0.5,
        ease: 'Power3.easeInOut',
        y: '0',
        stagger: 0.014,
        opacity: 1,
      }, "-=0.2");
    }
  });

  // About section animation
  if (aboutSection) {
    // Set initial state
    gsap.set(aboutSection, {
      opacity: 0,
      y: 30
    });

    // Add to main timeline
    mainTimeline.to(aboutSection, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "power3.out"
    }, "-=0.4"); // Overlap with previous animation
  }
}