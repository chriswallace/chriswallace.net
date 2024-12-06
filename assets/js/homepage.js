document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const videoPlayer = document.querySelector('video-player');
  const preloader = document.querySelector('.content-preloader');
  const playButton = document.getElementById('playButton');
  const controls = document.querySelector('.portfolio__controls');

  Splitting();
  
  // Set initial states
  if (videoPlayer) {
    const video = videoPlayer.shadowRoot.querySelector('video');
    if (video) {
      video.style.opacity = '0';
      video.style.transform = 'scale(0.95)';
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
  const controls = document.querySelector('.portfolio__controls');
  const headlines = document.querySelectorAll('.animated-headline');

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
        stagger: 0.014,
        opacity: 1,
      }, "-=0.2");
    }
  });

  // Reveal and zoom video
  if (videoPlayer) {
    const video = videoPlayer.shadowRoot.querySelector('video');
    if (video) {
      mainTimeline.to(video, {
        duration: 0.8,
        opacity: 1,
        scale: 1,
        ease: "power2.out"
      });
    }
  }

  // Show controls
  if (controls) {
    mainTimeline.to(controls, {
      duration: 0.3,
      opacity: 1,
      visibility: 'visible',
      onStart: () => {
        controls.classList.remove('invisible');
      },
      ease: "power2.out"
    });
  }

  const notificationsButton = document.querySelector('.notifications--button');

  if (notificationsButton) {
    // Remove the opacity-0 class before starting the animation
    notificationsButton.classList.remove('opacity-0');

    // Add animation for notifications button
    mainTimeline.from(notificationsButton, {
      duration: 0.6,
      opacity: 0,
      y: 10,
      ease: "power2.out",
      onStart: () => {
        gsap.to(notificationsButton, {
          duration: 0.1,
          x: -2,
          repeat: 3,
          yoyo: true,
          ease: "power1.inOut"
        });
      }
    });
  }
}