document.addEventListener('DOMContentLoaded', function () {
    const zoomables = document.querySelectorAll('.zoomable');
    let overlay = null;
    let originalPosition = {}; // Store original positions

    // Create a page overlay
    function createOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'page-overlay';
        document.body.appendChild(overlay);
    }

    // Get the original position and dimensions of the zoomable media
    function getOriginalPosition(zoomable) {
        const rect = zoomable.getBoundingClientRect();
        const x = rect.left;
        const y = rect.top;

        return {
            left: x,
            top: y,
            width: rect.width,
            height: rect.height
        };
    }

    // Maintain a 4:3 aspect ratio
    function calculateAspectRatio(width, height) {
        const aspectRatio = 4 / 3;
        if (width / height > aspectRatio) {
            width = height * aspectRatio;
        } else {
            height = width / aspectRatio;
        }

        return { width, height };
    }

    // Animate zoomable element into fullscreen
    function zoomIn(zoomable) {
        const position = getOriginalPosition(zoomable);
        originalPosition[zoomable] = position;

        const viewportWidth = window.innerWidth * 0.9; // 90% of the viewport width
        const viewportHeight = window.innerHeight * 0.9; // 90% of the viewport height
        const { width, height } = calculateAspectRatio(viewportWidth, viewportHeight);

        // Set initial position and dimensions
        zoomable.style.position = 'fixed';
        zoomable.style.top = `${position.top}px`;
        zoomable.style.left = `${position.left}px`;
        zoomable.style.width = `${position.width}px`;
        zoomable.style.height = `${position.height}px`;
        zoomable.style.zIndex = '9999';

        // Add transition and animate to fullscreen
        requestAnimationFrame(() => {
            zoomable.classList.add('zoom-fullscreen');
            zoomable.style.top = '50%';
            zoomable.style.left = '50%';
            zoomable.style.width = `${width}px`;
            zoomable.style.height = `${height}px`;
            zoomable.style.transform = 'translate(-50%, -50%)';
        });
    }

    // Animate zoomable element back to its original position
    function zoomOut(zoomable) {
        const position = originalPosition[zoomable];

        // Animate back to original position
        zoomable.style.transition = 'all 0.3s ease';
        zoomable.style.top = `${position.top}px`;
        zoomable.style.left = `${position.left}px`;
        zoomable.style.width = `${position.width}px`;
        zoomable.style.height = `${position.height}px`;
        zoomable.style.transform = 'none';

        setTimeout(() => {
            zoomable.classList.remove('zoom-fullscreen');
            zoomable.style.zIndex = '1';
            zoomable.style.position = '';
            zoomable.style.top = '';
            zoomable.style.left = '';
            zoomable.style.width = '';
            zoomable.style.height = '';
            zoomable.style.transform = '';
            enableScroll();
        }, 300);
    }

    // Disable scrolling on body
    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    // Enable scrolling on body
    function enableScroll() {
        document.body.style.overflow = '';
    }

    // Handle zoom-in and zoom-out on click
    zoomables.forEach((zoomable) => {
        zoomable.addEventListener('click', function () {
            const isFullscreen = zoomable.classList.contains('zoom-fullscreen');
            const dataType = zoomable.getAttribute('data-type');

            if (!isFullscreen) {
                if (!overlay) createOverlay();
                overlay.classList.add('active');
                zoomIn(zoomable);
                disableScroll();

                // Handle video playback
                if (dataType === 'video') {
                    zoomable.muted = false;
                    zoomable.play();
                }
            } else {
                overlay.classList.remove('active');
                zoomOut(zoomable);

                // Handle video mute
                if (dataType === 'video') {
                    zoomable.muted = true;
                }
            }
        });
    });

    // Close fullscreen if clicking outside the zoomable media
    if (overlay) {
        overlay.addEventListener('click', () => {
            const fullscreenItems = document.querySelectorAll('.zoom-fullscreen');
            fullscreenItems.forEach((item) => {
                item.classList.remove('zoom-fullscreen');
                zoomOut(item);
            });
            overlay.classList.remove('active');
        });
    }

    const galleries = document.querySelectorAll('.image-gallery');
    galleries.forEach((gallery) => {
        const images = gallery.querySelectorAll('img');
        let currentIndex = 0;
        let intervalId = null;

        function showImage(index) {
            images.forEach((img, i) => {
                img.style.display = (i === index) ? 'block' : 'none';
            });
        }

        function rotateImages() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        intervalId = setInterval(rotateImages, 2000);

        showImage(currentIndex);
    });
});