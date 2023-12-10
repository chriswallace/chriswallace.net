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

  function setupMedia(mediaElement, index) {
    if (mediaElement.getAttribute("data-processed") === "true") {
      return;
    }

    imgObserver.observe(mediaElement); // Start observing this element

    const isImage = mediaElement.tagName === "IMG";
    const isVideo = mediaElement.tagName === "VIDEO";

    // Event listeners for images
    if (isImage) {
      mediaElement.addEventListener("mouseover", function () {
        const altText = this.getAttribute("alt");
        if (altText) {
          tooltip.textContent = altText;
          tooltip.style.display = "block";
        }
      });

      mediaElement.addEventListener("mouseout", function () {
        tooltip.style.display = "none";
      });
    }

    // Create a wrapper div around the media element
    const wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("media-wrapper");
    mediaElement.parentNode.insertBefore(wrapperDiv, mediaElement);
    wrapperDiv.appendChild(mediaElement);

    // Move tooltip inside wrapperDiv for images
    if (isImage) {
      wrapperDiv.appendChild(tooltip);
    }

    const maximizeIcon = document.createElement("div");
    maximizeIcon.classList.add("maximize-icon");

    // Caption for mobile images
    if (isMobile() && isImage && mediaElement.alt.trim().length) {
      const caption = document.createElement("caption");
      caption.innerHTML = mediaElement.alt;
      wrapperDiv.appendChild(caption);
    }

    // Add maximize icon and full-screen functionality
    if (!isMobile() && webglSupport()) {
      wrapperDiv.appendChild(maximizeIcon);
      maximizeIcon.addEventListener("click", () => goFullscreen(mediaElement, index));
    }

    mediaElement.setAttribute("data-processed", "true");
  }

  // Function to fetch and associate metadata
  function loadArtworkMetadata(nextPartKey, elementsToUpdate, callback) {
    const uri = `/collection/chunk${nextPartKey}.json`;
    fetch(uri)
      .then(response => response.json())
      .then(data => {
        associateMetadata(data, elementsToUpdate);
        if (callback) {
          callback();
        }
      })
      .catch(error => console.error('Error loading JSON:', error));
  }

  function associateMetadata(metadata, elementsToUpdate) {
    elementsToUpdate.forEach((img, index) => {
      const data = metadata[index];
      if (data) {
        // Create a container for the metadata
        const metadataDiv = document.createElement('div');
        metadataDiv.classList.add('artwork-metadata', 'hidden');

        // Add content to the metadata container
        const name = document.createElement('h3');
        name.textContent = data.name || 'Artwork';
        metadataDiv.appendChild(name);

        const artist = document.createElement('p');
        artist.textContent = `Artist: ${data.artist || 'Unknown'}`;
        metadataDiv.appendChild(artist);

        const description = document.createElement('p');
        description.textContent = `Description: ${data.description || 'No description available.'}`;
        metadataDiv.appendChild(description);

        // Add more elements as needed for other metadata like tags, live_uri, etc.

        // Append the metadata container to the image's parent div
        img.parentNode.appendChild(metadataDiv);
      }
    });
  }

  const autoRotateNextArtwork = () => {
    // Clear previous timeout if exists
    if (autoRotateTimeout) {
      clearTimeout(autoRotateTimeout);
    }

    images = artCollection.querySelectorAll("img");

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
    // Re-query the DOM for the current list of images
    images = artCollection.querySelectorAll("img");
    const totalImages = images.length;

    if (currentIndex === null || totalImages === 0) return;

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

    viewer.classList.add("fullscreen-viewer", "fade-out");

    setTimeout(() => {
      const loader = document.createElement("div");
      loader.className = "loader";

      const newImg = document.createElement("img");
      const currentSrc = img.getAttribute("src");
      const currentIframeSrc = img.getAttribute("data-iframe-src");
      const currentIframeSize = img.getAttribute("data-iframe-size");

      // Clone the metadata container
      const metadataContainer = img.parentNode.querySelector('.artwork-metadata');
      const metadataClone = metadataContainer ? metadataContainer.cloneNode(true) : null;
      if (metadataClone)
        metadataClone.classList.remove('hidden');

      // Reset the data-is-current attribute for all images before setting for the current image
      document
        .querySelectorAll("[data-is-current='true']")
        .forEach((el) => el.setAttribute("data-is-current", "false"));
      img.setAttribute("data-is-current", "true");

      newImg.onload = () => {
        loader.remove();
        if (currentIframeSrc && metadataClone)
          metadataClone.appendChild(
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
      newDiv.classList.add('fullscreen-artwork');

      viewer.innerHTML = "";
      viewer.appendChild(loader);
      viewer.appendChild(newDiv);
      newDiv.appendChild(newImg);

      // Create a container for the image and metadata
      const contentDiv = document.createElement("div");
      contentDiv.className = "fullscreen-content";
      if (metadataClone) contentDiv.appendChild(metadataClone);

      viewer.appendChild(contentDiv);

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
        if (autoRotateTimeout) {
          clearTimeout(autoRotateTimeout);
          autoRotateTimeout = null;
        }

        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;
        const iframe = document.createElement("iframe");
        iframe.setAttribute("src", iframeSrc);
        if (currentIframeSize === "fullscreen") {
          iframe.setAttribute("width", window.innerWidth); // Set the iframe width to match the image
          iframe.setAttribute("height", window.innerHeight); // Set the iframe height to match the image
        } else {
          iframe.setAttribute("width", imgWidth); // Set the iframe width to match the image
          iframe.setAttribute("height", imgHeight); // Set the iframe height to match the image
        }
        const viewer = document.querySelector(".fullscreen-artwork");
        viewer.innerHTML = "";
        viewer.appendChild(iframe);
      }
    });
    return viewCodeButton;
  }

  const checkFullscreenStatus = () => {
    if (!document.fullscreenElement &&
      !document.webkitFullscreenElement &&
      !document.mozFullScreenElement &&
      !document.msFullscreenElement) {
      viewer.className = "hidden";

      // Clear auto-rotate timeout
      if (autoRotateTimeout) {
        clearTimeout(autoRotateTimeout);
        autoRotateTimeout = null;
      }

      // Additional logic for handling exit from fullscreen
    }
  };

  // Listeners for fullscreen change across different browsers
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
    ".fade-in-element,.art-collection .media-wrapper,.art-collection h3,.art-collection h4"
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

          const unloadedImages = artCollection.querySelectorAll("img:not(.loaded),video:not(.loaded)");
          unloadedImages.forEach((img, index) => setupImages(img, index));

          const newElements = artCollection.querySelectorAll(".fade-in-element:not(.visible),.art-collection .media-wrapper:not(.visible),.art-collection h3:not(.visible),.art-collection h4:not(.visible)");
          observeElements(newElements);
          loadArtworkMetadata(Number(nextPartKey), unloadedImages);

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
