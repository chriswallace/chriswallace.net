document.addEventListener("DOMContentLoaded", () => {
  Splitting();

  const sections = document.querySelectorAll(".text-container");
  const preloader = document.querySelector(".content-preloader");
  const headlines = document.querySelectorAll(".animated-headline");
  const aboutSection = document.querySelector("#aboutSection");
  const workStatus = document.querySelector("#workStatus");

  // Initial setup - hide all content
  gsap.set([headlines, aboutSection, workStatus], {
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

  // Wait for everything to be ready
  Promise.all([
    document.fonts.ready,
    new Promise((resolve) => setTimeout(resolve, 2000)), // Simulate loading delay
  ]).then(() => {
    // Create main timeline
    const mainTimeline = gsap
      .timeline()
      // Fade out preloader
      .to(preloader, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          if (preloader) {
            preloader.style.display = "none";
          }
        },
      })
      // Show headlines
      .to(headlines, {
        duration: 0.3,
        opacity: 1,
        y: 0,
        ease: "power2.out",
      });

    // Handle text animations
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

    // About section animation
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
      ); // Overlap with previous animation
    }

    // Work status animated elements
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
      ); // Ensure workStatus itself is animated

      const animatedElements = Array.from(
        workStatus.querySelectorAll(".animated")
      );
      console.log("Animated elements found:", animatedElements.length);
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

    // Add shrink animation for top section on larger screens
    const topSection = document.querySelector(".content-container > div"); // Target the div with sm:h-screen class

    if (topSection) {
      // Remove the Tailwind class and set initial height
      topSection.classList.remove("sm:h-screen");
      gsap.set(topSection, { minHeight: "100vh" });

      // Check if screen is large enough
      if (window.innerWidth >= 768) {
        mainTimeline.to(topSection, {
          duration: 1.2,
          minHeight: "70vh",
          ease: "power3.inOut",
          delay: 1,
          onComplete: () => {
            gsap.to(topSection, {
              duration: 0.06,
              minHeight: "71vh",
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut",
            });
          },
        });
      }
    }
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
