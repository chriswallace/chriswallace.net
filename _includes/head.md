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

  <!-- Preconnect to Fontshare -->
  <link rel="preconnect" href="https://api.fontshare.com">
  <link rel="preconnect" href="https://cdn.fontshare.com" crossorigin>

  <!-- Load Tabular font from Fontshare -->
  <link href="https://api.fontshare.com/v2/css?f[]=tabular@1&display=swap" rel="stylesheet">

  <!-- Font loading optimization -->
  <script>
    if ("fonts" in document) {
      // Add a class to indicate fonts are not loaded yet
      document.documentElement.classList.add('fonts-loading');
      
      Promise.all([
        document.fonts.load('400 1em "Tabular"'),
        document.fonts.load('300 1em "Tabular"'),
        document.fonts.load('700 1em "Tabular"')
      ]).then(() => {
        // Remove loading class and add loaded class when fonts are ready
        document.documentElement.classList.remove('fonts-loading');
        document.documentElement.classList.add('fonts-loaded');
        // Dispatch an event that can be used by other scripts
        document.dispatchEvent(new Event('fontsLoaded'));
      }).catch(() => {
        // In case of failure, remove loading class to ensure content is displayed
        document.documentElement.classList.remove('fonts-loading');
      });
    }
  </script>

  <link rel="stylesheet" href="/assets/content-preloader.css" />
  <link rel="stylesheet" href="https://unpkg.com/splitting/dist/splitting.css" />
  <link rel="stylesheet" href="https://unpkg.com/splitting/dist/splitting-cells.css" />
  <link rel="stylesheet" href="/assets/main.css?v={{ site.version }}" expires="31536000">
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.3.3/dist/gsap.min.js" expires="31536000"></script>
  <script src="https://unpkg.com/splitting/dist/splitting.min.js" expires="31536000"></script>
  <script src="/assets/js/text-scrambler.min.js?v={{ site.version }}" expires="31536000"></script>

  <link rel="icon" type="image/x-icon" href="https://ik.imagekit.io/UltraDAO/wallace/favicon.png" expires="31536000">
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
