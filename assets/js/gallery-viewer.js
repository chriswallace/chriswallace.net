let viewer, currentIndex = null;  // Declare it globally
let autoRotateTimeout = null;

var canvas = document.createElement('canvas');

function webglSupport() {
  try {
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}
function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

// Function to set srcset and sizes
const setSrcSetAndSizes = (img) => {
  const renderedWidth = img.clientWidth;
  const base_url = "https://ik.imagekit.io/UltraDAO/wallace/";
  const img_name = img.src.split('/').pop().split('?')[0];

  const srcsetStr = `${base_url}${img_name}?tr=w-${renderedWidth},q-70 1x,
                        ${base_url}${img_name}?tr=w-${renderedWidth * 2},q-70 2x,
                        ${base_url}${img_name}?tr=w-${renderedWidth * 3},q-70 3x`;

  // This should reflect your actual layout rules in your CSS
  const sizesStr = `(max-width: 400px) ${renderedWidth}px,
                      (max-width: 800px) ${renderedWidth * 2}px,
                      (max-width: 1200px) ${renderedWidth * 3}px,
                      ${renderedWidth * 4}px`;

  img.src = `${base_url}${img_name}?tr=w-${renderedWidth},q-70`;
  img.srcset = srcsetStr;
  img.sizes = sizesStr;
};

document.addEventListener('DOMContentLoaded', () => {
  // Select all images on the page
  const images = document.querySelectorAll('img');

  // Create a tooltip element
  const tooltip = document.createElement('div');
  tooltip.style.position = 'absolute';
  tooltip.style.backgroundColor = 'black';
  tooltip.style.color = 'white';
  tooltip.style.padding = '5px 10px';
  tooltip.style.borderRadius = '5px';
  tooltip.style.display = 'none';
  tooltip.style.zIndex = '9999';
  document.body.appendChild(tooltip);

  // Function to automatically rotate to the next artwork
  const autoRotateNextArtwork = () => {
    // Clear previous timeout if exists
    if (autoRotateTimeout) {
      clearTimeout(autoRotateTimeout);
    }

    if (currentIndex === null || currentIndex >= document.querySelectorAll('img').length - 1) return;

    const currentImg = document.querySelectorAll('img')[currentIndex];
    const nextIndex = currentIndex + 1;
    const nextImg = document.querySelectorAll('img')[nextIndex];

    let delay;

    // Check whether the current artwork is an iframe-based work or static image
    if (currentImg.getAttribute('data-iframe-src')) {
      delay = 25000; // 25 seconds for iframe-based works
    } else {
      delay = 15000; // 15 seconds for static images
    }

    // Preload next image if it's not an iframe-based work
    if (nextImg && !nextImg.getAttribute('data-iframe-src')) {
      const preloaderImg = new Image();
      const nextSrc = nextImg.getAttribute('src');
      preloaderImg.src = nextSrc;
    }

    autoRotateTimeout = setTimeout(() => {
      navigateArtwork(1);  // Move to next artwork
      autoRotateNextArtwork();  // Continue auto-rotate
    }, delay);
  };

  // Function to start auto rotation
  const startAutoRotation = () => {
    goFullscreen(document.querySelectorAll('img')[0], 0, true); 
    autoRotateNextArtwork();
    
    // Add event listeners for buttons
    document.getElementById("playButton").click();
  };

  // Attach the startAutoRotation function to your button
  const autoRotateBtn = document.getElementById("autoPlayCollection");
  autoRotateBtn.addEventListener('click', startAutoRotation);

  // Initialize IntersectionObserver
  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        setSrcSetAndSizes(img); // Call your function to set srcset and sizes
        observer.unobserve(img); // Stop observing this image
      }
    });
  }, { rootMargin: '0px 0px 200px 0px' });  // Trigger if the image gets within 200px of the viewport

  // Attach event listeners to each image
  images.forEach((img, index) => {
    imgObserver.observe(img);  // Start observing this image

    img.addEventListener('mouseover', function (event) {
      const altText = this.getAttribute('alt');
      if (altText) {
        tooltip.textContent = altText;
        tooltip.style.display = 'block';
      }
    });

    img.addEventListener('mousemove', function (event) {
      const tooltipWidth = tooltip.offsetWidth;
      const windowWidth = window.innerWidth;

      if (event.pageX + tooltipWidth + 20 > windowWidth) {
        // Tooltip would go off the right edge of the screen
        // Show tooltip to the left of the cursor instead
        tooltip.style.left = (event.pageX - tooltipWidth - 10) + 'px';
      } else {
        // Normal behavior
        tooltip.style.left = event.pageX + 10 + 'px';
      }

      tooltip.style.top = event.pageY + 10 + 'px';
    });

    img.addEventListener('mouseout', function () {
      tooltip.style.display = 'none';
    });

    // Create a wrapper div around the image
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('image-wrapper');
    img.parentNode.insertBefore(wrapperDiv, img);
    wrapperDiv.appendChild(img);

    const maximizeIcon = document.createElement('div');
    maximizeIcon.classList.add('maximize-icon');

    if (isMobile()) {
      const caption = document.createElement('caption');
      caption.innerHTML = img.alt;
      wrapperDiv.appendChild(caption);
    }


    if (!isMobile() && webglSupport()) {
      wrapperDiv.appendChild(maximizeIcon);
      maximizeIcon.addEventListener('click', () => goFullscreen(img, index));
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      navigateArtwork(-1);
    } else if (event.key === 'ArrowRight') {
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
  
    viewer.classList.add('fade-out');
  
    setTimeout(() => {
      const loader = document.createElement('div');
      loader.className = 'loader';
  
      const newImg = document.createElement('img');
      const currentSrc = img.getAttribute('src');
      const currentIframeSrc = img.getAttribute('data-iframe-src');
      const currentIframeSize = img.getAttribute('data-iframe-size');
  
      // Reset the data-is-current attribute for all images before setting for the current image
      document.querySelectorAll("[data-is-current='true']").forEach(el => el.setAttribute("data-is-current", "false"));
      img.setAttribute("data-is-current", "true");
  
      newImg.onload = () => {
        loader.remove();
        if (currentIframeSrc)
          newDiv.appendChild(createViewLiveCodeButton(currentIframeSrc, newImg, currentIframeSize));
      };
  
      viewer.classList.remove("hidden");
      currentIndex = index;
  
      if (currentIframeSize === 'fullscreen' && currentIframeSrc) {
        const newDiv = document.createElement('div');
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', currentIframeSrc);
        iframe.setAttribute('style', 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; width: 100vw; height: 100vh;');
        viewer.innerHTML = '';
        viewer.appendChild(newDiv);
        newDiv.appendChild(iframe);
        viewer.className = '';
        if (viewer.requestFullscreen) {
          viewer.requestFullscreen();
        }
        return;
      }
  
      let highResSrc;
      const isGif = currentSrc.endsWith('.gif') || currentSrc.includes('.gif?');
      if (isGif) {
        highResSrc = currentSrc.replace(/w-\d+,?/, '');
      } else {
        highResSrc = currentSrc.replace(/w-\d+/, `w-${window.innerWidth * 2}`).replace(/q-\d+/, 'q-90');
      }
      highResSrc = highResSrc.replace(/,bl-\d+/, '');
  
      newImg.src = highResSrc;
      newImg.setAttribute('src', highResSrc);
  
      const newDiv = document.createElement('div');
  
      viewer.innerHTML = '';
      viewer.appendChild(loader);
      viewer.appendChild(newDiv);
      newDiv.appendChild(newImg);
  
      viewer.classList.remove('fade-out');
  
      if (viewer.requestFullscreen) {
        viewer.requestFullscreen();
      }
  
      if (shouldAutoRotate) {
        autoRotateNextArtwork();
      }
  
    }, 750);
  };  

  if (!isMobile() && webglSupport()) {
    let iframes = document.getElementsByClassName('live-code');
    Array.from(iframes).forEach((iframe) => {
      let dataSrc = iframe.getAttribute('data-src');
      if (dataSrc) {
        iframe.src = dataSrc;
      }
    });
  }

  function createViewLiveCodeButton(iframeSrc, img, currentIframeSize) {
    const viewCodeButton = document.createElement('button');
    viewCodeButton.textContent = 'View Live';
    viewCodeButton.className = 'live-code-btn';
    viewCodeButton.addEventListener('click', () => {
      if (iframeSrc) {
        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;
        const newDiv = document.createElement('div');
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', iframeSrc);
        if (currentIframeSize === 'fullscreen') {
          iframe.setAttribute('width', window.innerWidth);  // Set the iframe width to match the image
          iframe.setAttribute('height', window.innerHeight);  // Set the iframe height to match the image
        } else {
          iframe.setAttribute('width', imgWidth);  // Set the iframe width to match the image
          iframe.setAttribute('height', imgHeight);  // Set the iframe height to match the image
        }
        const viewer = document.getElementById('fullscreen-viewer');
        viewer.innerHTML = '';
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
      viewer.className = 'hidden';

      // Stop auto-rotate when exiting fullscreen
      if (autoRotateTimeout) {
        clearTimeout(autoRotateTimeout);
      }
    }
  };

  document.addEventListener('fullscreenchange', checkFullscreenStatus);
  document.addEventListener('webkitfullscreenchange', checkFullscreenStatus);
  document.addEventListener('mozfullscreenchange', checkFullscreenStatus);
  document.addEventListener('MSFullscreenChange', checkFullscreenStatus);

});