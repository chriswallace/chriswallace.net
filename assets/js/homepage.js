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
  // SECTION 1: Hero Headline Animation
  // ===================================

  const headline = document.querySelector("h1[data-splitting]");
  const heroInfo = document.querySelector(".hero-info");

  if (headline) {
    // Initialize Splitting.js to split text into words and characters
    const result = Splitting({ target: headline });

    const chars = headline.querySelectorAll(".char");

    // Create main timeline for hero section
    const heroTimeline = gsap.timeline();

    // Animate headline characters with sliding door effect
    heroTimeline.to(chars, {
      duration: 0.5,
      y: 0,
      opacity: 1,
      ease: "power3.out",
      stagger: 0.01,
    });

    // Fade in hero info after headline animation starts
    if (heroInfo) {
      heroTimeline.to(
        heroInfo,
        {
          duration: 0.4,
          opacity: 1,
          ease: "power2.out",
        },
        "-=0.4"
      ); // Start before headline finishes
    }
  }

  // =====================================================
  // SECTION 2: Horizontal Scrolling Images with Alignment
  // =====================================================

  const horizontalScrollSection = document.querySelector(
    ".horizontal-scroll-section"
  );
  const horizontalScrollContainer = document.querySelector(
    ".horizontal-scroll-container"
  );
  const horizontalScrollTrack = document.querySelector(
    ".horizontal-scroll-track"
  );

  if (
    horizontalScrollSection &&
    horizontalScrollContainer &&
    horizontalScrollTrack
  ) {
    // Calculate exact scroll distance
    const scrollImages =
      horizontalScrollTrack.querySelectorAll(".scroll-image");

    // Function to calculate total width
    const calculateScrollDistance = () => {
      let totalWidth = 0;

      scrollImages.forEach((img, index) => {
        totalWidth += img.offsetWidth;
        // Add gap between images - responsive gaps matching CSS
        if (index < scrollImages.length - 1) {
          if (window.innerWidth <= 480) {
            totalWidth += 16; // gap-4 = 1rem = 16px
          } else if (window.innerWidth <= 768) {
            totalWidth += 24; // gap-6 = 1.5rem = 24px
          } else {
            totalWidth += 32; // gap-8 = 2rem = 32px
          }
        }
      });

      // Add the 16px right padding
      totalWidth += 16;

      // Calculate how much we need to scroll
      // Start: first image at left edge (x: 0)
      // End: last image's right edge + 16px padding at viewport's right edge
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth;

      return scrollDistance;
    };

    // Set initial position at left edge
    gsap.set(horizontalScrollTrack, { x: 0 });

    // Create the horizontal scroll animation
    // Use container as trigger, start when bottom hits viewport bottom
    gsap.to(horizontalScrollTrack, {
      x: () => -calculateScrollDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: horizontalScrollContainer,
        start: "bottom bottom", // Start when container bottom reaches viewport bottom (fully visible)
        end: () =>
          `+=${horizontalScrollSection.offsetHeight - window.innerHeight}`, // Scroll through remaining section height
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }

  // ==============================================
  // BIO SECTION: Text and Image Animations
  // ==============================================

  const bioSection = document.querySelector(".bio-section");
  const bioParagraph = document.querySelector(".bio-paragraph");
  const bioText = document.querySelector(".bio-text");

  // Initialize Splitting.js for the main bio text
  if (bioText) {
    Splitting({ target: bioText });
  }

  // Animate bio paragraph (initial reveal)
  if (bioParagraph) {
    gsap.to(bioParagraph, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: bioParagraph,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }

  // Progressive text reveal effect for the single paragraph
  if (bioText) {
    const chars = bioText.querySelectorAll(".char");

    if (chars.length > 0) {
      chars.forEach((char, index) => {
        ScrollTrigger.create({
          trigger: bioSection,
          start: "top 50%",
          end: "bottom 50%",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const charProgress = progress * chars.length - index;

            if (charProgress > 0) {
              char.classList.add("revealed");
            } else {
              char.classList.remove("revealed");
            }
          },
        });
      });
    }
  }

  // ==============================================
  // CONTACT SECTION: Fun Animated Contact
  // ==============================================

  const contactSection = document.querySelector(".contact-section");
  const contactHeading = document.querySelector(".contact-heading");
  const contactEmail = document.querySelector(".contact-email");

  // Initialize Splitting.js for contact heading
  if (contactHeading) {
    Splitting({ target: contactHeading });
  }

  // Animate contact heading with fun character effects
  if (contactHeading) {
    const chars = contactHeading.querySelectorAll(".char");

    gsap.to(contactHeading, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contactSection,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    if (chars.length > 0) {
      gsap.to(chars, {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.4)",
        stagger: 0.08,
        scrollTrigger: {
          trigger: contactSection,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        delay: 0.2,
      });
    }
  }

  // Animate email with bounce effect
  if (contactEmail) {
    gsap.to(contactEmail, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "bounce.out",
      scrollTrigger: {
        trigger: contactSection,
        start: "top 70%",
        toggleActions: "play none none none",
      },
      delay: 0.8,
    });
  }

  // ==============================================
  // SECTION 3: Staggered Project Row Animations
  // ==============================================

  const projectSection = document.querySelector(".project-grid-section");
  const projectHeading = projectSection?.querySelector("h3");
  const projectRows = document.querySelectorAll(".project-row.animate-row");

  // Animate the "Recent Clients" heading first
  if (projectHeading) {
    gsap.set(projectHeading, { opacity: 0, y: 30 });

    gsap.to(projectHeading, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: projectHeading,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }

  // Animate project rows with stagger
  if (projectRows.length > 0) {
    projectRows.forEach((row, index) => {
      gsap.to(row, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        delay: index * 0.05, // Stagger effect
      });
    });
  }
}
