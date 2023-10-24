<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  {% seo title=true %}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&family=Gabarito:wght@400;700&display=swap" rel="stylesheet">   <link rel="stylesheet" href="/assets/main.css?version=1.86" />
  <link rel="icon" type="image/x-icon" href="https://ik.imagekit.io/UltraDAO/wallace/favicon.png" />
  <meta property="og:image" content="{{page.thumbnail | default: 'https://ik.imagekit.io/UltraDAO/wallace/chris-wallace.jpg'}}" />
  <meta property="twitter:image" content="{{page.thumbnail | default: 'https://ik.imagekit.io/UltraDAO/wallace/chris-wallace.jpg'}}">
  
{% seo title=false %}

  <style>
  .fade-in-element,
  .art-collection .image-wrapper,
  .art-collection h3,
  .art-collection h4 {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .fade-in-element.visible,
  .art-collection .image-wrapper.visible,
  .art-collection h3.visible,
  .art-collection h4.visible {
      opacity: 1;
      transform: translateY(0);
  }
  </style>
</head>
