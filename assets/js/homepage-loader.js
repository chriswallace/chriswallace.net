// Homepage Reveal Animation - Codrops Style with Image Loading
document.addEventListener("DOMContentLoaded", function () {
  // Only run on homepage
  if (!document.body.classList.contains("home")) return;

  const content = document.querySelector(".content");
  const revealer = document.querySelector(".revealer");
  const revealerLayers = document.querySelectorAll(".revealer__layer");
  const imageLoading = document.querySelector(".image-loading");
  const imageStack = document.querySelector(".image-stack");

  if (!content || !revealer || revealerLayers.length === 0) {
    console.warn("Reveal elements not found, showing content immediately");
    if (content) content.classList.add("content--show");
    document.body.classList.add("animation-complete"); // Restore scrolling
    return;
  }

  console.log("Initializing Codrops-style page reveal with image loading");

  // Get portfolio images - mix of mobile and desktop aspect ratios
  const portfolioImages = [
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/plymouth-street-mobile-mobile.png?tr=w-800,q-60,f-auto", // Mobile
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/compendium-desktop.png?tr=w-800,q-60,f-auto", // Desktop
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/dc3-reader-mobile.png?tr=w-800,q-60,f-auto", // Mobile
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/overdrive-quests-desktop.png?tr=w-800,q-60,f-auto", // Desktop
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/candy-checkout-mobile.png?tr=w-800,q-60,f-auto", // Mobile
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/palm-quest-home-desktop.png?tr=w-800,q-60,f-auto", // Desktop
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/candy-league-mobile-desktop.png?tr=w-800,q-60,f-auto", // Mobile
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/overdrive-market-desktop.png?tr=w-800,q-60,f-auto", // Desktop
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/compendium-features-mobile.png?tr=w-800,q-60,f-auto", // Mobile
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/palm-quest-2.png?tr=w-800,q-60,f-auto", // Desktop
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/plymouth-street-dashboard-mobile.png?tr=w-800,q-60,f-auto", // Mobile
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/overdrive-comic-desktop.png?tr=w-800,q-60,f-auto", // Desktop
  ];

  // Initialize: content hidden, revealer visible
  content.classList.remove("content--show");

  // Start the sequence
  setTimeout(() => {
    startLoadingSequence();
  }, 500);

  // Safety timeout to restore scrolling if animation fails
  setTimeout(() => {
    if (!document.body.classList.contains("animation-complete")) {
      console.warn("Animation timeout - restoring scrolling");
      document.body.classList.add("animation-complete");
      if (content) content.classList.add("content--show");
      if (revealer) revealer.style.display = "none";
      if (imageLoading) imageLoading.style.display = "none";
    }
  }, 10000); // 10 second safety timeout

  function startLoadingSequence() {
    console.log("Starting loading sequence...");

    // Skip dot animation - go directly to image loading
    startImageLoading();
  }

  function startImageLoading() {
    console.log("Starting image loading...");

    let loadedImages = 0;
    const imageElements = [];

    function loadImage(src, index) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const imgElement = document.createElement("img");
          imgElement.src = src;
          imgElement.classList.add("stack-image");

          // Calculate positioning - curated offsets for better composition
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;
          const viewportAspectRatio = screenWidth / screenHeight;

          let scaleFactor;
          if (screenWidth >= 1600) {
            scaleFactor = 1.0;
          } else if (screenWidth >= 1200) {
            scaleFactor = 0.8;
          } else if (screenWidth >= 768) {
            scaleFactor = 0.5;
          } else {
            scaleFactor = 0.3;
          }

          // Add vertical spacing multiplier based on viewport aspect ratio
          // When viewport is taller (lower aspect ratio), increase vertical spread
          let verticalSpacingMultiplier = 1.0;
          if (viewportAspectRatio < 1.0) {
            // Portrait orientation - increase vertical spacing significantly
            verticalSpacingMultiplier = 1.8;
          } else if (viewportAspectRatio < 1.3) {
            // Tall landscape - moderate increase
            verticalSpacingMultiplier = 1.4;
          } else if (viewportAspectRatio < 1.6) {
            // Standard landscape - slight increase
            verticalSpacingMultiplier = 1.2;
          }
          // Wide landscape (>1.6) keeps default 1.0

          // Progressive positioning - start tight, then spread out as more images load
          const baseOffsets = [
            { x: -20, y: -15 }, // Start very close to center
            { x: 25, y: -10 },
            { x: -35, y: 5 },
            { x: 30, y: 20 },
            { x: -45, y: 35 },
            { x: 50, y: 40 },
            { x: -60, y: -30 },
            { x: 70, y: -20 },
            { x: -80, y: 60 },
            { x: 90, y: -40 },
            { x: -100, y: 80 },
            { x: 110, y: 90 },
          ];

          // Progressive expansion factor - each image spreads further from center
          const expansionFactor = 1 + index * 0.05; // Each image expands by 0.05x more

          const baseOffset = baseOffsets[index] || { x: 0, y: 0 };
          const offsetX = baseOffset.x * expansionFactor * scaleFactor;
          const offsetY =
            baseOffset.y *
            expansionFactor *
            scaleFactor *
            verticalSpacingMultiplier;

          // Calculate scale based on aspect ratio - normalize by long edge
          const aspectRatio = img.naturalWidth / img.naturalHeight;
          const targetLongEdge = 600; // Target size for the long edge in pixels

          let scale;
          if (aspectRatio > 1) {
            // Landscape: width is longer
            scale = targetLongEdge / img.naturalWidth;
          } else {
            // Portrait: height is longer
            scale = targetLongEdge / img.naturalHeight;
          }

          imgElement.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
          imgElement.style.opacity = "1";

          imageStack.appendChild(imgElement);
          imageElements.push(imgElement);

          loadedImages++;
          resolve();
        };
        img.src = src;
      });
    }

    // Load images with stagger
    portfolioImages.forEach((src, index) => {
      setTimeout(() => {
        loadImage(src, index);
      }, index * 400); // Original timing
    });

    // Wait for all images to load, then start exit animation
    const checkImagesLoaded = () => {
      if (loadedImages >= portfolioImages.length) {
        setTimeout(() => {
          startImageExitAnimation(imageElements);
        }, 500);
      } else {
        setTimeout(checkImagesLoaded, 100);
      }
    };
    checkImagesLoaded();
  }

  function startImageExitAnimation(imageElements) {
    console.log("Starting swipe transition over images...");

    // Don't fade out images - keep them visible
    // Start the reveal sequence immediately after images are loaded
    setTimeout(() => {
      startRevealSequence();
    }, 200); // Very short pause before swipe begins
  }

  function startRevealSequence() {
    console.log("Starting reveal sequence...");

    // Use all three layers (orange, darker orange/red, tan)
    const activeLayers = Array.from(revealerLayers);

    // Phase 1: Start clipping images and animate layers in (bottom to top)
    // Start clipping images immediately as first layer begins
    imageLoading.classList.add("image-loading--clipped");

    activeLayers.forEach((layer, index) => {
      setTimeout(() => {
        layer.classList.add("revealer__layer--animate-in");
      }, index * 50); // Much faster stagger - 50ms
    });

    // Phase 2: After layers are in, show content and animate out
    setTimeout(() => {
      // Show content
      content.classList.add("content--show");

      // Animate layers out (top to bottom) - reverse order
      [...activeLayers].reverse().forEach((layer, index) => {
        setTimeout(() => {
          layer.classList.remove("revealer__layer--animate-in");
          layer.classList.add("revealer__layer--animate-out");
        }, index * 50); // Much faster stagger - 50ms
      });

      // Clean up after animation completes
      setTimeout(() => {
        imageLoading.style.display = "none";
        revealer.style.display = "none";

        // Restore scrolling
        document.body.classList.add("animation-complete");

        console.log("Homepage reveal animation complete - scrolling restored");
      }, 400); // Even faster cleanup
    }, 300); // Much faster transition to out phase
  }
});
