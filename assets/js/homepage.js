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

  if (heroSection) {
    // Initial reveal animation for hero elements
    const heroTimeline = gsap.timeline();

    // Set initial state - blur and opacity 0
    gsap.set(heroSection.querySelectorAll(".reveal"), {
      filter: "blur(10px)",
      opacity: 0,
    });

    // Reveal hero elements on page load with stagger - blur in effect
    heroTimeline
      .to(heroLabel?.closest(".reveal") || heroLabel, {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(
        heroTitle,
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        heroDescription,
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        heroButtons,
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

    // Add visible class to prevent CSS transitions from interfering
    heroTimeline.eventCallback("onComplete", () => {
      heroSection
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("visible"));
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
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaBanner,
          start: "top 80%",
          toggleActions: "play none none reverse",
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
        duration: 0.6,
        delay: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaBanner,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  if (ctaWMark) {
    gsap.fromTo(
      ctaWMark,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
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
      filter: "blur(12px)",
      opacity: 0,
    });

    workItems.forEach((item) => {
      gsap.fromTo(
        item,
        {
          filter: "blur(12px)",
          opacity: 0,
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Subtle hover scale on images
      const img = item.querySelector(".work-image");
      if (img) {
        item.addEventListener("mouseenter", () => {
          gsap.to(img, { scale: 1.02, duration: 0.4, ease: "power2.out" });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" });
        });
      }
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
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: testimonialsSection,
          start: "top 75%",
          toggleActions: "play none none reverse",
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
          duration: 0.5,
          delay: index * 0.08,
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
          duration: 0.5,
          delay: index * 0.08,
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

  if (footerTop) {
    gsap.fromTo(
      footerTop,
      { filter: "blur(12px)", opacity: 0 },
      {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerSection,
          start: "top 80%",
          toggleActions: "play none none reverse",
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
    if (!el.closest(".hero-section")) {
      // Skip hero, it has custom handling
      gsap.fromTo(
        el,
        { filter: "blur(8px)", opacity: 0 },
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.5,
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
}
