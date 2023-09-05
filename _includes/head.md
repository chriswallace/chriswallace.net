<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  {% seo title=true %}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@10..48,300;10..48,500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/main.css?version=1.19" />
  <link rel="icon" type="image/x-icon" href="/assets/images/favicon.png">
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
      let delay = 0;
      const step = 100; // Delay increment in milliseconds
        document.querySelectorAll('.footer, p, h1, h2, h3, h4, h5, h6, ul, ol, hr, blockquote, video, img, .card-zoom').forEach((element) => {
            element.classList.add('fade-in');
            element.setAttribute('data-delay', delay);
            delay += step;
        });
        const fadeIns = document.querySelectorAll('.fade-in');
        fadeIns.forEach((element) => {
        const delay = element.getAttribute('data-delay') || 0;
            setTimeout(() => {
              element.classList.add('visible');
            }, delay);
        });
    });
  </script>
</head>
