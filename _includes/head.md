<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  {% seo title=true %}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/main.css?version=1.39" />
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

      const elements = document.querySelectorAll('.fade-in-element,.art-collection img,.art-collection h3,.art-collection h4');
      const fadeIn = (el, delay) => {
          setTimeout(() => {
              el.classList.add('visible');
          }, delay);
      };
      elements.forEach((el, index) => {
          const delay = index * Math.round((300 / (elements.length / 4))); // 300ms delay for cascading effect
          fadeIn(el, delay);
      });
      const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
              const delay = observerIndex * 100;  // 100ms delay for cascading effect
              if (entry.isIntersecting) {
                  fadeIn(entry.target, delay);
                  observer.unobserve(entry.target);
              }
              observerIndex++;  // Increment the observerIndex after each entry
          });
      });
      elements.forEach(el => observer.observe(el));
    });

</script>

</head>
