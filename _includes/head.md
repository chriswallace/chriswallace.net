<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-6EK0EHWB8D"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-6EK0EHWB8D');
  </script>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  {% seo title=true %}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://use.typekit.net/eub1ezs.css">
  <link rel="stylesheet" href="/assets/main.css?v={{ site.version }}">
  <link rel="icon" type="image/x-icon" href="https://ik.imagekit.io/UltraDAO/wallace/favicon.png">
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
