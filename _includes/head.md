<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  {% seo title=true %}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,500&family=Teko:wght@300&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/main.css?version=1.34" />
  <link rel="icon" type="image/x-icon" href="/assets/images/favicon.png" />
  <meta property="og:image" content="/assets/images/chris-wallace.jpg" />
  {% seo title=false %}
  <style type="text/css">
    .fade-in {
      opacity: 0;
      transition: opacity 1s ease-in-out;
    }
    .fade-in.visible {
      opacity: 1;
    }
  </style>
  <script type="text/javascript">
  document.addEventListener('DOMContentLoaded', function() {
    // Function to handle fade-in
    function handleFadeIn(element, delay) {
      setTimeout(() => {
        element.classList.add('visible');
      }, delay);
    }
    let delay = 0;
    const step = 40;
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = 0;
          handleFadeIn(entry.target, delay);
          observer.unobserve(entry.target);
        }
      });
    });
    document.querySelectorAll('.footer, p, h1, h2, h3, h4, h5, h6, ul, ol, hr, blockquote, video, img, iframe, canvas, .card-zoom, .back-btn').forEach((element) => {
      element.classList.add('fade-in');
      delay += step;

      observer.observe(element);
    });

});
</script>

</head>
