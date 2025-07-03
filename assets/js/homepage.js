document.addEventListener("DOMContentLoaded", () => {
  Splitting();

  const sections = document.querySelectorAll(".text-container");
  const preloader = document.querySelector(".content-preloader");
  const headlines = document.querySelectorAll(".animated-headline");
  const aboutSection = document.querySelector("#aboutSection");
  const workStatus = document.querySelector("#workStatus");
  const woodiesSection = document.querySelector(
    'media-card[href="/portfolio/woodies/"]'
  );
  const lazyLoadElements = document.querySelectorAll(
    ".lazy-load:not(media-card[href='/portfolio/woodies/'])"
  );

  // Initial setup - hide all content
  gsap.set([headlines, aboutSection, workStatus, woodiesSection], {
    opacity: 0,
    y: 30,
  });

  gsap.set(lazyLoadElements, {
    opacity: 0,
    y: 30,
  });

  // Handle text animations separately
  sections.forEach((section) => {
    const chars = section.querySelectorAll(
      ".text-paragraph .word > .char, .whitespace"
    );
    if (chars.length) {
      gsap.set(chars, { opacity: 0, y: 30 });
    }
  });

  // Scroll-based background color animation
  let isScrolling = false;
  let scrollTimeout;

  const handleScrollBackground = () => {
    const scrollY = window.scrollY;
    const maxScroll = 200; // Distance to fully transition to dark color

    // Calculate opacity for the overlay
    const progress = Math.min(scrollY / maxScroll, 1);

    if (!isScrolling) {
      isScrolling = true;
      // Create or update the background overlay
      let overlay = document.querySelector(".scroll-background-overlay");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "scroll-background-overlay";
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color:rgb(14, 17, 21);
          opacity: 0;
          pointer-events: none;
          z-index: -1;
          transition: opacity 0.3s ease-out;
        `;
        document.body.appendChild(overlay);
      }
    }

    // Update overlay opacity
    const overlay = document.querySelector(".scroll-background-overlay");
    if (overlay) {
      overlay.style.opacity = progress;
    }

    // Clear the timeout and set a new one
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 150);
  };

  // Add scroll listener
  window.addEventListener("scroll", handleScrollBackground, { passive: true });

  // Create main timeline for initial content
  const mainTimeline = gsap.timeline();

  // Wait for fonts and initial content
  Promise.all([
    document.fonts.ready,
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(() => {
    mainTimeline
      .to(preloader, {
        duration: 0.2,
        opacity: 0,
        onComplete: () => {
          if (preloader) {
            preloader.style.display = "none";
          }
        },
      })
      .to(headlines, {
        duration: 0.2,
        opacity: 1,
        y: 0,
        ease: "power2.out",
      });

    // Text animations
    sections.forEach((section) => {
      const chars = section.querySelectorAll(
        ".text-paragraph .word > .char, .whitespace"
      );
      if (chars.length) {
        mainTimeline.to(
          chars,
          {
            duration: 0.6,
            ease: "Power3.easeInOut",
            y: "0",
            stagger: 0.003,
            opacity: 1,
          },
          "-=0.2"
        );
      }
    });

    // About section
    if (aboutSection) {
      mainTimeline.to(
        aboutSection,
        {
          duration: 0.8,
          opacity: 1,
          y: 0,
          ease: "power3.out",
        },
        "+=0.5"
      );
    }

    // Work status
    if (workStatus) {
      mainTimeline.to(
        workStatus,
        {
          duration: 0.8,
          opacity: 1,
          y: 0,
          ease: "power3.out",
        },
        "-=0.6"
      );

      const animatedElements = Array.from(
        workStatus.querySelectorAll(".animated")
      );
      if (animatedElements.length) {
        mainTimeline.from(
          animatedElements,
          {
            duration: 0.3,
            opacity: 0,
            y: 30,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.8"
        );
      }

      // HR separator animation
      const hrSeparator = document.querySelector(".hr-separator");
      if (hrSeparator) {
        mainTimeline.to(
          hrSeparator,
          {
            duration: 0.4,
            width: "100%",
            ease: "power2.inOut",
          },
          "-=0.4"
        );
      }
    }

    // Animate Woodies section after top section
    if (woodiesSection) {
      mainTimeline.to(
        woodiesSection,
        {
          duration: 0.6,
          opacity: 1,
          y: 0,
          ease: "power3.out",
          delay: 0.3, // Small delay after top section finishes
        },
        "-=0.6"
      );
    }

    // Setup intersection observer for remaining lazy load elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              duration: 0.8,
              opacity: 1,
              y: 0,
              ease: "power3.out",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    lazyLoadElements.forEach((element) => {
      observer.observe(element);
    });
  });
});
