const imgObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                replaceImageWithVideo(img);  // Call your new function
                setSrcSetAndSizes(img); // Call your function to set srcset and sizes
                observer.unobserve(img); // Stop observing this image
            }
        });
    },
    { rootMargin: "0px 0px 200px 0px" }
); // Trigger if the image gets within 200px of the viewport

const replaceImageWithVideo = (img) => {
    const videoURL = img.getAttribute('data-video');
    if (videoURL) {
        const video = document.createElement('video');
        video.src = videoURL;
        video.style.objectFit = 'cover'; // maintain the aspect ratio
        video.setAttribute('playsinline', ''); // ensure the video plays inline
        video.setAttribute('muted', ''); // ensure the video plays inline
        video.playbackRate = 1.0; // attempt to ensure 60fps
        video.addEventListener('ended', () => video.pause()); // pause on the last frame
        const imageWrapper = img.closest('.media-wrapper');
        if (imageWrapper) {
            img.replaceWith(video); // replace the img element with the video element

            // Listen for the end of the transition on the .media-wrapper, then play the video
            imageWrapper.addEventListener('transitionend', () => {
                video.play(); // play the video once the transition ends
            });
        }
    }
};

// Function to set srcset and sizes
const setSrcSetAndSizes = (img) => {
    const renderedWidth = img.clientWidth;
    const base_url = "https://ik.imagekit.io/UltraDAO/wallace_collection/";
    const img_name = img.src.split("/").pop().split("?")[0];

    const max_width = img.getAttribute("data-max-width");

    if (max_width && max_width <= renderedWidth) {
        img.src = `${base_url}${img_name}?tr=q-70`;
    } else {
        let size_1x = renderedWidth,
            size_2x = renderedWidth * 2,
            size_3x = renderedWidth * 3,
            size_4x = renderedWidth * 4;

        if (max_width) {
            size_1x = Math.min(max_width, size_1x);
            size_2x = Math.min(max_width, size_2x);
            size_3x = Math.min(max_width, size_3x);
            size_4x = Math.min(max_width, size_4x);
        }

        const srcsetStr = `${base_url}${img_name}?tr=w-${size_1x},q-70 1x,
                            ${base_url}${img_name}?tr=w-${size_2x},q-70 2x,
                            ${base_url}${img_name}?tr=w-${size_3x},q-70 3x`;

        // This should reflect your actual layout rules in your CSS
        const sizesStr = `(max-width: 400px) ${size_1x}px,
                        (max-width: 800px) ${size_2x}px,
                        (max-width: 1200px) ${size_3x}px,
                        ${size_4x}px`;

        img.src = `${base_url}${img_name}?tr=w-${size_1x},q-70`;
        img.srcset = srcsetStr;
        img.sizes = sizesStr;
    }
    img.classList.add("loaded");
};

const cardObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const card = entry.target;
                setBackground(card);  // Call your function to set background
                observer.unobserve(card);  // Stop observing this card
            }
        });
    },
    { rootMargin: "0px 0px 200px 0px" }
);

// Function to set background
const setBackground = (card) => {
    const renderedWidth = card.clientWidth;
    const dpr = window.devicePixelRatio || 1;  // Get the device pixel ratio, default to 1
    const bgImageURL = card.style.backgroundImage;

    // Extract the base URL and the query string
    const [base_url, query_string] = bgImageURL.slice(5, -2).split('?');

    // Update the 'w' and 'q' parameters based on the rendered width and device pixel ratio
    const new_width = Math.round(renderedWidth * dpr);

    // Construct the new URL
    const new_url = `${base_url}?tr=w-${new_width},q-70`;

    // Set the background image
    card.style.backgroundImage = `url("${new_url}")`;

    // Add a class to indicate the background image has been loaded
    card.classList.add("loaded");
};

// Target all cards with a specific class for the observer
document.querySelectorAll('.bg-image-card').forEach(card => {
    cardObserver.observe(card);
});