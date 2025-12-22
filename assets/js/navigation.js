document.addEventListener("DOMContentLoaded", () => {
  // Add portfolio class to body if on portfolio page
  if (
    window.location.pathname.startsWith("/portfolio/") ||
    window.location.pathname === "/portfolio"
  ) {
    document.body.classList.add("portfolio-page");
  }

  // Mobile menu elements
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");
  const navLinks = document.querySelectorAll(".nav-link");
  const siteNavbar = document.getElementById("site-navbar");

  // Navbar scroll effect (works on all pages)
  if (siteNavbar) {
    let lastScroll = 0;
    let scrollThreshold = 50; // Minimum scroll distance before hiding
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset;

          // Add scrolled class for background effect
          if (currentScroll > 100) {
            siteNavbar.classList.add("scrolled");
          } else {
            siteNavbar.classList.remove("scrolled");
            // Always show navbar at top of page
            siteNavbar.classList.remove("nav-hidden");
          }

          // Hide/show navbar based on scroll direction
          if (currentScroll > scrollThreshold) {
            if (currentScroll > lastScroll) {
              // Scrolling down - hide navbar
              siteNavbar.classList.add("nav-hidden");
            } else {
              // Scrolling up - show navbar
              siteNavbar.classList.remove("nav-hidden");
            }
          }

          lastScroll = currentScroll;
          ticking = false;
        });

        ticking = true;
      }
    });
  }

  if (!mobileMenuToggle || !mobileMenu) return;

  // Toggle menu on tab click
  mobileMenuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking overlay
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", () => {
      closeMenu();
    });
  }

  // Close menu when clicking a link
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close menu when pressing Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.classList.contains("open")) {
      closeMenu();
      mobileMenuToggle.focus();
    }
  });

  // Touch/swipe support for pull-down gesture on the toggle button
  let touchStartY = 0;

  mobileMenuToggle.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  mobileMenuToggle.addEventListener(
    "touchend",
    (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const swipeDistance = touchEndY - touchStartY;
      // If swiped down more than 20px, open menu
      if (swipeDistance > 20 && !mobileMenu.classList.contains("open")) {
        openMenu();
      }
    },
    { passive: true }
  );

  // Swipe up on menu to close
  mobileMenu.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  mobileMenu.addEventListener(
    "touchend",
    (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const swipeDistance = touchStartY - touchEndY;
      // If swiped up more than 40px, close menu
      if (swipeDistance > 40 && mobileMenu.classList.contains("open")) {
        closeMenu();
      }
    },
    { passive: true }
  );

  function openMenu() {
    mobileMenu.classList.add("open");
    mobileMenuToggle.classList.add("open");
    if (mobileMenuOverlay) mobileMenuOverlay.classList.add("open");
    if (siteNavbar) siteNavbar.classList.add("menu-open");
    mobileMenuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileMenu.classList.remove("open");
    mobileMenuToggle.classList.remove("open");
    if (mobileMenuOverlay) mobileMenuOverlay.classList.remove("open");
    if (siteNavbar) siteNavbar.classList.remove("menu-open");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  // Close menu when clicking a nav link (for internal pages)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Update active mobile menu link based on scroll position
  function updateActiveMobileLink() {
    const sections = document.querySelectorAll("section[id]");
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    mobileMenuLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveMobileLink);
});
