document.addEventListener("DOMContentLoaded", () => {
  let viewer,
    currentIndex = null; // Declare it globally
  let autoRotateTimeout = null;

  // Select all images on the page
  const artCollection = document.getElementById("art-collection");
  let images = artCollection.querySelectorAll("img");

  // Create a tooltip element
  const tooltip = document.createElement("div");
  tooltip.style.position = "absolute";
  tooltip.style.backgroundColor = "black";
  tooltip.style.color = "white";
  tooltip.style.padding = "5px 10px";
  tooltip.style.borderRadius = "5px";
  tooltip.style.display = "none";
  tooltip.style.zIndex = "9999";
  document.body.appendChild(tooltip);

  var canvas = document.createElement("canvas");

  function webglSupport() {
    try {
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  }

  function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  function setupImages(img, index) {
    if (img.getAttribute("data-processed") === "true") {
      return;
    }

    imgObserver.observe(img); // Start observing this image

    img.addEventListener("mouseover", function (event) {
      const altText = this.getAttribute("alt");
      if (altText) {
        tooltip.textContent = altText;
        tooltip.style.display = "block";
      }
    });

    img.addEventListener("mousemove", function (event) {
      const tooltipWidth = tooltip.offsetWidth;
      const windowWidth = window.innerWidth;

      if (event.pageX + tooltipWidth + 20 > windowWidth) {
        // Tooltip would go off the right edge of the screen
        // Show tooltip to the left of the cursor instead
        tooltip.style.left = event.pageX - tooltipWidth - 10 + "px";
      } else {
        // Normal behavior
        tooltip.style.left = event.pageX + 10 + "px";
      }

      tooltip.style.top = event.pageY + 10 + "px";
    });

    img.addEventListener("mouseout", function () {
      tooltip.style.display = "none";
    });

    // Create a wrapper div around the image
    const wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("image-wrapper");
    img.parentNode.insertBefore(wrapperDiv, img);
    wrapperDiv.appendChild(img);

    const maximizeIcon = document.createElement("div");
    maximizeIcon.classList.add("maximize-icon");

    // Check if img alt attribute is not empty before adding caption
    if (isMobile() && img.alt.trim().length) {
      const caption = document.createElement("caption");
      caption.innerHTML = img.alt;
      wrapperDiv.appendChild(caption);
    }

    if (!isMobile() && webglSupport()) {
      wrapperDiv.appendChild(maximizeIcon);
      maximizeIcon.addEventListener("click", () => goFullscreen(img, index));
    }

    img.setAttribute("data-processed", "true");
  }

  const autoRotateNextArtwork = () => {
    // Clear previous timeout if exists
    if (autoRotateTimeout) {
      clearTimeout(autoRotateTimeout);
    }

    images = artCollection.querySelectorAll("img"); // Get the current list of images

    if (currentIndex === null) return;

    if (currentIndex >= images.length - 1) {
      // If you're at the last image, load more art
      loadMoreArt();
    }

    const currentImg = images[currentIndex];
    const nextIndex = currentIndex + 1;
    const nextImg = images[nextIndex];

    let delay;

    if (currentImg.getAttribute("data-iframe-src")) {
      delay = 12000;
    } else {
      delay = 8000;
    }

    if (nextImg && !nextImg.getAttribute("data-iframe-src")) {
      const preloaderImg = new Image();
      const nextSrc = nextImg.getAttribute("src");
      preloaderImg.src = nextSrc;
    }

    autoRotateTimeout = setTimeout(() => {
      navigateArtwork(1);
      autoRotateNextArtwork();
    }, delay);
  };

  // Function to start auto rotation
  const startAutoRotation = () => {
    goFullscreen(document.querySelectorAll("img")[0], 0, true);
    autoRotateNextArtwork();

    // Add event listeners for buttons
    document.getElementById("playButton").click();
  };

  // Attach the startAutoRotation function to your button
  const autoRotateBtn = document.getElementById("autoPlayCollection");

  if (autoRotateBtn) autoRotateBtn.addEventListener("click", startAutoRotation);

  // Attach event listeners to each image
  images.forEach((img, index) => setupImages(img, index));

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      navigateArtwork(-1);
    } else if (event.key === "ArrowRight") {
      navigateArtwork(1);
    }
  });

  const navigateArtwork = (step) => {
    if (currentIndex === null) return;

    const totalImages = images.length;
    let newIndex = currentIndex + step;

    if (newIndex < 0 || newIndex >= totalImages) {
      return;
    }

    images[currentIndex].removeAttribute("data-is-current");
    goFullscreen(images[newIndex], newIndex);
  };

  const goFullscreen = (img, index, shouldAutoRotate = false) => {
    viewer = document.getElementById("fullscreen-viewer");

    if (!viewer) {
      viewer = document.createElement("div");
      viewer.id = "fullscreen-viewer";
      document.body.appendChild(viewer);
    }

    viewer.classList.add("fade-out");

    setTimeout(() => {
      const loader = document.createElement("div");
      loader.className = "loader";

      const newImg = document.createElement("img");
      const currentSrc = img.getAttribute("src");
      const currentIframeSrc = img.getAttribute("data-iframe-src");
      const currentIframeSize = img.getAttribute("data-iframe-size");

      // Reset the data-is-current attribute for all images before setting for the current image
      document
        .querySelectorAll("[data-is-current='true']")
        .forEach((el) => el.setAttribute("data-is-current", "false"));
      img.setAttribute("data-is-current", "true");

      newImg.onload = () => {
        loader.remove();
        if (currentIframeSrc)
          newDiv.appendChild(
            createViewLiveCodeButton(
              currentIframeSrc,
              newImg,
              currentIframeSize
            )
          );
      };

      viewer.classList.remove("hidden");
      currentIndex = index;

      if (currentIframeSize === "fullscreen" && currentIframeSrc) {
        const newDiv = document.createElement("div");
        const iframe = document.createElement("iframe");
        iframe.setAttribute("src", currentIframeSrc);
        iframe.setAttribute(
          "style",
          "position: absolute; left: 0; top: 0; right: 0; bottom: 0; width: 100vw; height: 100vh;"
        );
        viewer.innerHTML = "";
        viewer.appendChild(newDiv);
        newDiv.appendChild(iframe);
        viewer.className = "";
        if (viewer.requestFullscreen) {
          viewer.requestFullscreen();
        }
        return;
      }

      let highResSrc;
      const isGif = currentSrc.endsWith(".gif") || currentSrc.includes(".gif?");
      if (isGif) {
        highResSrc = currentSrc.replace(/w-\d+,?/, "");
      } else {
        highResSrc = currentSrc
          .replace(/w-\d+/, `w-${window.innerWidth * 2}`)
          .replace(/q-\d+/, "q-90");
      }
      highResSrc = highResSrc.replace(/,bl-\d+/, "");

      newImg.src = highResSrc;
      newImg.setAttribute("src", highResSrc);

      const newDiv = document.createElement("div");

      viewer.innerHTML = "";
      viewer.appendChild(loader);
      viewer.appendChild(newDiv);
      newDiv.appendChild(newImg);

      viewer.classList.remove("fade-out");

      if (viewer.requestFullscreen) {
        viewer.requestFullscreen();
      }

      if (shouldAutoRotate) {
        autoRotateNextArtwork();
      }
    }, 750);
  };

  if (!isMobile() && webglSupport()) {
    let iframes = document.getElementsByClassName("live-code");
    Array.from(iframes).forEach((iframe) => {
      let dataSrc = iframe.getAttribute("data-src");
      if (dataSrc) {
        iframe.src = dataSrc;
      }
    });
  }

  function createViewLiveCodeButton(iframeSrc, img, currentIframeSize) {
    const viewCodeButton = document.createElement("button");
    viewCodeButton.textContent = "View Live";
    viewCodeButton.className = "live-code-btn";
    viewCodeButton.addEventListener("click", () => {
      if (iframeSrc) {
        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;
        const newDiv = document.createElement("div");
        const iframe = document.createElement("iframe");
        iframe.setAttribute("src", iframeSrc);
        if (currentIframeSize === "fullscreen") {
          iframe.setAttribute("width", window.innerWidth); // Set the iframe width to match the image
          iframe.setAttribute("height", window.innerHeight); // Set the iframe height to match the image
        } else {
          iframe.setAttribute("width", imgWidth); // Set the iframe width to match the image
          iframe.setAttribute("height", imgHeight); // Set the iframe height to match the image
        }
        const viewer = document.getElementById("fullscreen-viewer");
        viewer.innerHTML = "";
        viewer.appendChild(newDiv);
        newDiv.appendChild(iframe);
      }
    });
    return viewCodeButton;
  }

  // Function to check fullscreen status and stop auto-rotate if needed
  const checkFullscreenStatus = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitFullscreenElement &&
      !document.mozFullScreenElement &&
      !document.msFullscreenElement
    ) {
      viewer.className = "hidden";

      // Stop auto-rotate when exiting fullscreen
      if (autoRotateTimeout) {
        clearTimeout(autoRotateTimeout);
      }
    }
  };

  document.addEventListener("fullscreenchange", checkFullscreenStatus);
  document.addEventListener("webkitfullscreenchange", checkFullscreenStatus);
  document.addEventListener("mozfullscreenchange", checkFullscreenStatus);
  document.addEventListener("MSFullscreenChange", checkFullscreenStatus);

  let observerIndex = 0;

  const observeElements = (elementsToObserve) => {
    elementsToObserve.forEach((el) => observer.observe(el));
  };

  function scrollStop(callback, refresh = 66) {
    if (!callback || typeof callback !== "function") return;
    let isScrolling;
    window.addEventListener(
      "scroll",
      function (event) {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(callback, refresh);
      },
      false
    );
  }

  const elements = document.querySelectorAll(
    ".fade-in-element,.art-collection .image-wrapper,.art-collection h3,.art-collection h4"
  );

  scrollStop(function () {
    observerIndex = 0; // Reset index when scrolling stops
  });

  const fadeIn = (el, delay) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, delay);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = observerIndex * 50;
        fadeIn(entry.target, delay);
        observer.unobserve(entry.target);
        observerIndex++;
      }
    });
  });

  observeElements(elements); // Observe initial elements

  // Seedable random number generator
  function seededRandom(seed) {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  // Shuffle an array with a given seed
  function shuffleArray(array, seed) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(seededRandom(seed) * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  if (window.pageSettings) {
    let isLoading = false; // Lock to prevent concurrent fetches
    let htmlParts = window.pageSettings.htmlParts;

    loadMoreArt();

    // Function to load more art
    function loadMoreArt() {
      if (isLoading) return; // Return if already fetching
      if (Object.keys(htmlParts).length === 0) return; // No more parts to load

      // Generate a seed based on the current hour
      const seed = Math.floor(new Date().getTime() / (60 * 60 * 1000));

      // Shuffle the keys based on the seed
      const keys = Object.keys(htmlParts);
      shuffleArray(keys, seed);

      // Pick a part to load (uses the first key in the shuffled array)
      const nextPartKey = keys[0];
      const nextPartUrl = htmlParts[nextPartKey];

      delete htmlParts[nextPartKey]; // Remove the used part from the htmlParts object

      isLoading = true; // Set lock

      fetch(nextPartUrl)
        .then((response) => response.text())
        .then((html) => {
          const artCollection = document.getElementById("art-collection");
          artCollection.insertAdjacentHTML("beforeend", html);

          const unloadedImages = artCollection.querySelectorAll("img:not(.loaded)");
          unloadedImages.forEach((img, index) => setupImages(img, index));

          const newElements = artCollection.querySelectorAll(".fade-in-element:not(.visible),.art-collection .image-wrapper:not(.visible),.art-collection h3:not(.visible),.art-collection h4:not(.visible)");
          observeElements(newElements);

          isLoading = false; // Release lock
        })
        .catch((error) => {
          console.error("Fetch failed:", error);
          isLoading = false; // Release lock in case of failure
        });
    }

    // Throttle the scroll event
    let lastScrollTime = 0;

    window.addEventListener("scroll", () => {
      const now = Date.now();
      if (now - lastScrollTime > 200) {
        // Throttle time in milliseconds
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500
        ) {
          loadMoreArt();
        }
        lastScrollTime = now;
      }
    });
  }
});
