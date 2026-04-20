<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-6EK0EHWB8D" expires="31536000"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-6EK0EHWB8D');
  </script>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Cache-Control" content="public, max-age=86400">
  <meta http-equiv="Expires" content="86400">
  {% seo title=true %}

  <!-- Prevent FOUC: Hide all reveal elements by default -->
  <style>
    .reveal,
    .stagger-children > *,
    .work-item,
    .nav-link,
    .site-logo-link,
    .nav-cta,
    .hero-wallace-logo {
      opacity: 0;
      filter: blur(10px);
    }
  </style>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Syne:wght@400;500;700;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="/assets/content-preloader.css" />
  <link rel="stylesheet" href="https://unpkg.com/splitting/dist/splitting.css" />
  <link rel="stylesheet" href="https://unpkg.com/splitting/dist/splitting-cells.css" />
  <link rel="stylesheet" href="/assets/main.css?v={{ site.version }}" expires="31536000">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" expires="31536000"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" expires="31536000"></script>
  <script src="https://unpkg.com/lenis@1.3.17/dist/lenis.min.js" expires="31536000"></script>
  <link rel="stylesheet" href="https://unpkg.com/lenis@1.3.17/dist/lenis.css" expires="31536000">
  <script src="https://unpkg.com/splitting/dist/splitting.min.js" expires="31536000"></script>
  <script src="/assets/js/text-scrambler.min.js?v={{ site.version }}" expires="31536000"></script>

  <link rel="icon" type="image/svg+xml" href="/assets/images/logo.svg" expires="31536000">
  <link rel="icon" type="image/png" href="/assets/images/favicon.png" expires="31536000">
  <meta property="og:image" content="{{page.thumbnail | default: 'https://ik.imagekit.io/UltraDAO/wallace/chris-wallace.jpg'}}">
  <meta property="twitter:image" content="{{page.thumbnail | default: 'https://ik.imagekit.io/UltraDAO/wallace/chris-wallace.jpg'}}">

  <style>
  .fade-in-element {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .fade-in-element.visible{
      opacity: 1;
      transform: translateY(0);
  }
  </style>
</head>
