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
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/woodies-thumbnail.png?tr=w-800,q-60,f-auto", // Desktop
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/dc3-reader-mobile.png?tr=w-800,q-60,f-auto", // Mobile
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/overdrive-quests-desktop.png?tr=w-800,q-60,f-auto", // Desktop
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/12d-artists-light-mobile.png?tr=w-800,q-60,f-auto", // Desktop
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/candy-league-mobile-mobile.png?tr=w-800,q-60,f-auto", // Mobile
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/plymouth-street-overlay-mobile.png?tr=w-800,q-60,f-auto", // Desktop
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/redacted-mlb-game-mobile.png?tr=w-800,q-60,f-auto", // Mobile
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/palm-quest-2.png?tr=w-800,q-60,f-auto", // Desktop
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/plymouth-street-dashboard-mobile.png?tr=w-800,q-60,f-auto", // Mobile
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/overdrive-comic-mobile.png?tr=w-800,q-60,f-auto", // Mobile
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/woodies-thumbnail.gif?tr=w-800,q-60,f-auto", // Mobile
  ];

  // Page content images to preload while animation runs
  const contentImages = [
    // Plymouth Street project images
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/plymouth-street-mobile-desktop.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/plymouth-street-dashboard-desktop.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/plymouth-street-overlay-desktop.png?tr=w-1200,q-60,f-auto",

    // Compendium images
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/compendium-desktop.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/compendium-2-desktop.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/compendium-icons-desktop.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/compendium-features-desktop.png?tr=w-1200,q-60,f-auto",

    // DC3 and Overdrive images
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/dc3-reader-desktop.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/overdrive-quests-desktop.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/overdrive-market-desktop.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/overdrive-comic-desktop.png?tr=w-1200,q-60,f-auto",

    // MLB and slide images
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/redacted-mlb-game-desktop.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/2.slide.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/3.slide.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/4.slide.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/5.slide.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/6.slide.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/7.slide.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/8.slide.png?tr=w-1200,q-60,f-auto",

    // Candy and Palm Quest images
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/candy-checkout-desktop.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/palm-quest-home-desktop.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/palm-quest-2.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/palm-quest-1.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/palm-quest-3.png?tr=w-1200,q-60,f-auto",

    // Candy League images
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/candy-league-desktop.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/candy-league-homepage-desktop.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/candy-league-rewards-desktop.png?tr=w-1200,q-60,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/candy-league-mobile-desktop.png?tr=w-1200,q-60,f-auto",

    // 12D images
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/12d-artworks-dark-desktop.png?tr=q-60&w-1280,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/12d-artworks-2-desktop.png?tr=q-60&w-1280,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/12d-artists-dark-desktop.png?tr=q-60&w-1280,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/12d-artists-light-desktop.png?tr=q-60&w-1280,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/12d-interview-desktop.png?tr=q-60&w-1280,f-auto",

    // UltraDAO images
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/ultradao-creator-desktop.png?tr=q-60&w-1280,f-auto",
    "https://ik.imagekit.io/UltraDAO/chriswallace.net/ultradao-ultrapass-desktop.png?tr=q-60&w-1280,f-auto",
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

    // Start preloading content images in parallel with the animation
    preloadContentImages();

    // Skip dot animation - go directly to image loading
    startImageLoading();
  }

  function preloadContentImages() {
    console.log("Starting content image preloading...");

    let contentLoadedCount = 0;
    const totalContentImages = contentImages.length;

    contentImages.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        contentLoadedCount++;
        console.log(
          `Content image ${contentLoadedCount}/${totalContentImages} loaded`
        );
      };
      img.onerror = () => {
        contentLoadedCount++;
        console.warn(`Failed to load content image: ${src}`);
      };
      img.src = src;
    });
  }

  function startImageLoading() {
    console.log("Starting image loading...");

    let loadedImages = 0;
    const imageElements = [];
    const preloadedImages = []; // Store preloaded image data

    function preloadImage(src, index) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          // Store the preloaded image data without displaying it yet
          preloadedImages[index] = {
            src: src,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            index: index,
          };
          loadedImages++;
          console.log(`Preloaded image ${index + 1}/${portfolioImages.length}`);
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}`);
          loadedImages++;
          resolve(); // Continue even if one image fails
        };
        img.src = src;
      });
    }

    // Preload all images first
    const preloadPromises = portfolioImages.map((src, index) =>
      preloadImage(src, index)
    );

    Promise.all(preloadPromises).then(() => {
      console.log("All images preloaded, starting display sequence...");
      startImageDisplaySequence(preloadedImages, imageElements);
    });
  }

  function startImageDisplaySequence(preloadedImages, imageElements) {
    // Now display images with stagger effect after all are preloaded
    preloadedImages.forEach((imageData, index) => {
      if (!imageData) return; // Skip failed images

      setTimeout(() => {
        const imgElement = document.createElement("img");
        imgElement.src = imageData.src;
        imgElement.classList.add("stack-image");

        // Calculate positioning - curated offsets for better composition
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const viewportAspectRatio = screenWidth / screenHeight;

        let scaleFactor;
        if (screenWidth >= 1600) {
          scaleFactor = 1.4;
        } else if (screenWidth >= 1200) {
          scaleFactor = 1.2;
        } else if (screenWidth >= 768) {
          scaleFactor = 1.1;
        } else {
          scaleFactor = 0.9;
        }

        // Add vertical spacing multiplier based on viewport aspect ratio
        // When viewport is taller (lower aspect ratio), increase vertical spread
        let verticalSpacingMultiplier = 1.7;
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

        const baseOffsets = [
          { x: -18, y: -22 }, // Start near center, slight up-left
          { x: 32, y: 8 }, // Right, slight down
          { x: -27, y: 27 }, // Left, down
          { x: 14, y: -32 }, // Right, up
          { x: -44, y: 12 }, // Far left, slight down
          { x: 38, y: 36 }, // Far right, down
          { x: -12, y: -38 }, // Left, up
          { x: 48, y: -18 }, // Far right, up
          { x: -36, y: 44 }, // Far left, far down
          { x: 22, y: 52 }, // Right, far down
          { x: -54, y: -8 }, // Far left, slight up
          { x: 8, y: 58 }, // Center-right, far down
        ];

        const baseOffset = baseOffsets[index] || { x: 0, y: 0 };
        const offsetX = baseOffset.x;
        const offsetY = baseOffset.y;

        // Calculate scale based on aspect ratio - normalize by long edge
        const aspectRatio = imageData.naturalWidth / imageData.naturalHeight;
        const targetLongEdge = 600; // Target size for the long edge in pixels

        let scale;
        if (aspectRatio > 1) {
          // Landscape: width is longer
          scale = targetLongEdge / imageData.naturalWidth;
        } else {
          // Portrait: height is longer
          scale = targetLongEdge / imageData.naturalHeight;
        }

        imgElement.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
        imgElement.style.opacity = "1"; // Now show the image

        imageStack.appendChild(imgElement);
        imageElements.push(imgElement);
      }, index * 300); // Reduced stagger timing for faster display
    });

    // Wait for display sequence to complete, then start exit animation
    const totalDisplayTime = preloadedImages.length * 300 + 500; // Extra buffer
    setTimeout(() => {
      startImageExitAnimation(imageElements);
    }, totalDisplayTime);
  }

  function startImageExitAnimation(imageElements) {
    console.log("Starting swipe transition over images...");

    // Don't fade out images - keep them visible
    // Start the reveal sequence immediately after images are loaded
    setTimeout(() => {
      startRevealSequence();
    }, 1200); // Very short pause before swipe begins
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
