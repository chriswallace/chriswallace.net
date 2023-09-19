<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  {% seo title=true %}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/main.css?version=1.41" />
  <link rel="icon" type="image/x-icon" href="/assets/images/favicon.png" />
  <meta property="og:image" content="/assets/images/chris-wallace.jpg" />
  {% seo title=false %}
  <style>
  .fade-in-element,
  .art-collection img,
  .art-collection h3,
  .art-collection h4 {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .fade-in-element.visible,
  .art-collection img.visible,
  .art-collection h3.visible,
  .art-collection h4.visible {
      opacity: 1;
      transform: translateY(0);
  }
  </style>
  <script>
document.addEventListener('DOMContentLoaded', function() {
  let observerIndex = 0; // Declare a separate index for IntersectionObserver

  function scrollStop (callback, refresh = 66) {

    // Make sure a valid callback was provided
    if (!callback || typeof callback !== 'function') return;

    // Setup scrolling variable
    let isScrolling;

    // Listen for scroll events
    window.addEventListener('scroll', function (event) {

      // Clear our timeout throughout the scroll
      window.clearTimeout(isScrolling);

      // Set a timeout to run after scrolling ends
      isScrolling = setTimeout(callback, refresh);

	  }, false);

  }

  // Select the elements you want to observe
  const elements = document.querySelectorAll('.fade-in-element,.art-collection img,.art-collection h3,.art-collection h4');

  scrollStop(function(){
    observerIndex = 0;
  });
  
  const fadeIn = (el, delay) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, delay);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // Only trigger if the entry is intersecting
      if (entry.isIntersecting) {
        const delay = observerIndex * 50;  // 100ms delay for cascading effect
        fadeIn(entry.target, delay);

        console.log(delay);
        
        // Unobserve the current target
        observer.unobserve(entry.target);

        // Increment observerIndex only when an element becomes visible
        observerIndex++;
      }
    });
  });

  // Start observing each element
  elements.forEach(el => observer.observe(el));

  if (!isMobile()) {
    const backToTopButton = document.getElementById('backToTop');
    const pageTitle = document.getElementById('pageTitle');

    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Toggle button's visibility based on scroll position
    window.addEventListener('scroll', function() {
      if (window.scrollY > 200) { // Show button after 200px of scrolling
        backToTopButton.style.opacity = 1;
        pageTitle.style.opacity = 1;
      } else {
        backToTopButton.style.opacity = 0;
        pageTitle.style.opacity = 0;
      }
    });
  }
});
</script>
</head>