document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Wait for fonts to load before starting animations
  Promise.all([
    document.fonts.ready,
    new Promise((resolve) => setTimeout(resolve, 100)),
  ]).then(() => {
    initHomepageAnimations();
  });
});

function initHomepageAnimations() {
  // ===================================
  // HERO: Initial reveal + subtle parallax
  // ===================================

  const heroSection = document.querySelector(".hero-section");
  const heroLabel = document.querySelector(".hero-label");
  const heroTitle = document.querySelector(".hero-title");
  const heroDescription = document.querySelector(".hero-description");
  const heroButtons = document.querySelector(".hero-buttons");
  const heroWallaceLogo = document.querySelector(".hero-wallace-logo");
  const credibilityContent = document.querySelector(".credibility-content");

  if (heroSection) {
    // Initial reveal animation for hero elements - unified fade-in
    const heroTimeline = gsap.timeline();

    // Set initial state - blur and opacity 0 for hero content
    const heroContent = heroSection.querySelector(".hero-content");
    if (heroContent) {
      gsap.set(heroContent.querySelectorAll(".reveal"), {
        filter: "blur(10px)",
        opacity: 0,
      });
    }

    // Set initial state for credibility content (outside hero-content)
    if (credibilityContent && heroSection.contains(credibilityContent)) {
      gsap.set(credibilityContent, {
        filter: "blur(10px)",
        opacity: 0,
      });
    }

    // Initialize Splitting.js for hero title BEFORE fade-in animation
    // Splitting is synchronous, so it completes immediately
    if (heroTitle && typeof Splitting !== "undefined") {
      Splitting({ target: heroTitle, by: "chars" });
      // Force a reflow to ensure DOM is updated before animation starts
      void heroTitle.offsetHeight;
    }

    // Animate Wallace logo
    if (heroWallaceLogo) {
      gsap.set(heroWallaceLogo, {
        filter: "blur(10px)",
        opacity: 0,
      });

      gsap.to(heroWallaceLogo, {
        filter: "blur(0px)",
        opacity: 0.15,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => heroWallaceLogo.classList.add("visible"),
      });
    }

    // Reveal hero elements on page load with stagger - fast blur-in effect
    heroTimeline
      .to(heroLabel?.closest(".reveal") || heroLabel, {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(
        heroTitle,
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .to(
        heroDescription,
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .to(
        heroButtons,
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      );

    // Animate credibility content if it exists in hero section
    if (credibilityContent && heroSection.contains(credibilityContent)) {
      heroTimeline.to(
        credibilityContent,
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }

    // Add visible class to prevent CSS transitions from interfering
    heroTimeline.eventCallback("onComplete", () => {
      if (heroContent) {
        heroContent
          .querySelectorAll(".reveal")
          .forEach((el) => el.classList.add("visible"));
      }
      // Add visible class to credibility content
      if (credibilityContent && heroSection.contains(credibilityContent)) {
        credibilityContent.classList.add("visible");
      }

      // Animate hero title font width variation using Splitting.js
      // (Splitting was already initialized before the fade-in)
      if (heroTitle && typeof Splitting !== "undefined") {
        // Get all character elements (Splitting adds .char class)
        const chars = Array.from(heroTitle.querySelectorAll(".char")).filter(
          (char) => char.textContent.trim() !== "" // Filter out spaces
        );

        if (chars.length > 0) {
          // Set initial state: widest width for all characters
          gsap.set(chars, {
            fontVariationSettings: '"wght" 100, "wdth" 500',
          });

          // Function to randomly animate a character
          const animateRandomChar = () => {
            // Pick a random character
            const randomChar = chars[Math.floor(Math.random() * chars.length)];

            // Randomly decide to shrink or expand
            const shouldShrink = Math.random() > 0.5;
            const targetWidth = shouldShrink ? 200 : 500;

            // Animate the character
            gsap.to(randomChar, {
              fontVariationSettings: `"wght" 100, "wdth" ${targetWidth}`,
              duration: 1.2 + Math.random() * 0.8, // Random duration between 1.2-2s
              ease: "power2.inOut",
            });
          };

          // Start the random animation loop after a short delay
          setTimeout(() => {
            // Initial random animations
            const initialAnimations = 3 + Math.floor(Math.random() * 3); // 3-5 initial animations
            for (let i = 0; i < initialAnimations; i++) {
              setTimeout(() => {
                animateRandomChar();
              }, i * 100); // Faster initial stagger
            }

            // Continue with random intervals
            const scheduleNext = () => {
              const delay = 100 + Math.random() * 150; // Random delay between 0.1-0.25s
              setTimeout(() => {
                animateRandomChar();
                scheduleNext(); // Schedule the next animation
              }, delay);
            };

            scheduleNext();
          }, 500); // Start after 500ms
        }
      }
    });
  }

  // ===================================
  // PROFILE: Image reveal with scale
  // ===================================

  // ===================================
  // CTA BANNER: Fade up
  // ===================================

  const ctaBanner = document.querySelector(".cta-banner");
  const ctaText = document.querySelector(".cta-text");
  const ctaButton = document.querySelector(".cta-button");
  const ctaWMark = document.querySelector(".cta-banner img");

  if (ctaBanner && ctaText) {
    gsap.fromTo(
      ctaText,
      { filter: "blur(10px)", opacity: 0 },
      {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaBanner,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onEnter: () => ctaText.classList.add("visible"),
        },
      }
    );
  }

  if (ctaButton) {
    gsap.fromTo(
      ctaButton,
      { filter: "blur(10px)", opacity: 0 },
      {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.4,
        delay: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaBanner,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onEnter: () => ctaButton.classList.add("visible"),
        },
      }
    );
  }

  if (ctaWMark) {
    gsap.fromTo(
      ctaWMark,
      { filter: "blur(10px)", opacity: 0 },
      {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaBanner,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // ===================================
  // WORK GRID: Staggered fade up
  // ===================================

  const workItems = document.querySelectorAll(".work-item");

  if (workItems.length > 0) {
    // Set initial state immediately to prevent flash
    gsap.set(workItems, {
      filter: "blur(10px)",
      opacity: 0,
    });

    workItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          filter: "blur(10px)",
          opacity: 0,
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none reverse",
            onEnter: () => item.classList.add("visible"),
          },
        }
      );
    });
  }

  // ===================================
  // TESTIMONIALS: Fade up
  // ===================================

  const testimonialsSection = document.querySelector(".testimonials-section");
  const testimonialTitle = document.querySelector(".testimonials-title");

  if (testimonialTitle) {
    gsap.fromTo(
      testimonialTitle,
      { filter: "blur(10px)", opacity: 0 },
      {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: testimonialsSection,
          start: "top 75%",
          toggleActions: "play none none reverse",
          onEnter: () => testimonialTitle.classList.add("visible"),
        },
      }
    );
  }

  // ===================================
  // APPROACH: Circular text + process cards
  // ===================================

  const approachSection = document.querySelector(".approach-section");
  const processCards = document.querySelectorAll(".process-card");
  const engagements = document.querySelector(".engagements");

  if (processCards.length > 0) {
    processCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          filter: "blur(10px)",
          opacity: 0,
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.4,
          delay: index * 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".approach-circle",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }

  // Engagement columns stagger
  const engagementColumns = document.querySelectorAll(".engagement-column");

  if (engagementColumns.length > 0) {
    engagementColumns.forEach((col, index) => {
      gsap.fromTo(
        col,
        { filter: "blur(10px)", opacity: 0 },
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.4,
          delay: index * 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: engagements,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }

  // ===================================
  // FOOTER: Fade up
  // ===================================

  const footerSection = document.querySelector(".footer-section");
  const footerTop = document.querySelector(".footer-top");
  const footerBottom = document.querySelector(".footer-bottom");

  if (footerTop) {
    gsap.fromTo(
      footerTop,
      { filter: "blur(10px)", opacity: 0 },
      {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerSection,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onEnter: () => footerTop.classList.add("visible"),
        },
      }
    );
  }

  if (footerBottom) {
    gsap.fromTo(
      footerBottom,
      { filter: "blur(10px)", opacity: 0 },
      {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.4,
        delay: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerBottom,
          start: "top bottom",
          toggleActions: "play none none reverse",
          onEnter: () => footerBottom.classList.add("visible"),
        },
      }
    );
  }

  // ===================================
  // GLOBAL: Subtle scroll progress indicator
  // ===================================

  // Create a subtle progress bar at top of page
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: var(--color-green-accent);
    transform-origin: left;
    transform: scaleX(0);
    z-index: 9999;
    pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  gsap.to(progressBar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
    },
  });

  // ===================================
  // SMOOTH REVEAL: Generic reveal class handler
  // ===================================

  // Handle .reveal elements that aren't caught by other animations
  const revealElements = document.querySelectorAll(".reveal:not(.visible)");

  revealElements.forEach((el) => {
    if (!el.closest(".hero-section") && el !== footerBottom) {
      // Skip hero and footer-bottom, they have custom handling
      gsap.fromTo(
        el,
        { filter: "blur(10px)", opacity: 0 },
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
            onEnter: () => el.classList.add("visible"),
          },
        }
      );
    }
  });

  // ===================================
  // NAV ITEMS: Fast blur-in
  // ===================================

  const navLinks = document.querySelectorAll(".nav-link");
  const siteLogoLink = document.querySelector(".site-logo-link");
  const navCta = document.querySelector(".nav-cta");

  // Logo animation
  if (siteLogoLink) {
    gsap.set(siteLogoLink, {
      filter: "blur(10px)",
      opacity: 0,
    });

    gsap.to(siteLogoLink, {
      filter: "blur(0px)",
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => siteLogoLink.classList.add("visible"),
    });
  }

  // Nav links animation
  if (navLinks.length > 0) {
    // Set initial state
    gsap.set(navLinks, {
      filter: "blur(10px)",
      opacity: 0,
    });

    navLinks.forEach((link, index) => {
      gsap.to(link, {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.4,
        delay: index * 0.05,
        ease: "power2.out",
        onComplete: () => link.classList.add("visible"),
      });
    });
  }

  // Nav CTA button animation
  if (navCta) {
    gsap.set(navCta, {
      filter: "blur(10px)",
      opacity: 0,
    });

    gsap.to(navCta, {
      filter: "blur(0px)",
      opacity: 1,
      duration: 0.4,
      delay: navLinks.length * 0.05,
      ease: "power2.out",
      onComplete: () => navCta.classList.add("visible"),
    });
  }
}
