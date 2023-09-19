  <footer class="fade-in-element">
    <div class="container">
      <p>
        Copyright © 2023 Chris Wallace. All rights reserved. Artwork displayed on this website is copyright its respective creator.
      </p>
    </div>
  </footer>

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