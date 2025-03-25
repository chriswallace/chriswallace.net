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

  // Create main timeline for initial content
  const mainTimeline = gsap.timeline();

  // Wait for fonts and initial content
  Promise.all([
    document.fonts.ready,
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(() => {
    mainTimeline
      .to(preloader, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          if (preloader) {
            preloader.style.display = "none";
          }
        },
      })
      .to(headlines, {
        duration: 0.3,
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
            duration: 0.5,
            ease: "Power3.easeInOut",
            y: "0",
            stagger: 0.01,
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
        "-=0.3"
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
        "-=0.3"
      );

      const animatedElements = Array.from(
        workStatus.querySelectorAll(".animated")
      );
      if (animatedElements.length) {
        mainTimeline.from(
          animatedElements,
          {
            duration: 0.6,
            opacity: 0,
            y: 30,
            stagger: 0.3,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }
    }

    // Animate Woodies section after top section
    if (woodiesSection) {
      mainTimeline.to(
        woodiesSection,
        {
          duration: 0.8,
          opacity: 1,
          y: 0,
          ease: "power3.out",
          delay: 0.3, // Small delay after top section finishes
        },
        "+=0.2"
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

  // Modified resize handler to target the correct element
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const topSection = document.querySelector(".content-container > div");
      if (topSection) {
        gsap.to(topSection, {
          duration: 0.3,
          minHeight: window.innerWidth >= 768 ? "70vh" : "100vh",
          ease: "power2.inOut",
        });
      }
    }, 250);
  });
});
