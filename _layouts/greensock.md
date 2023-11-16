---
layout: compress
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  {% seo title=true %}

  <link rel="stylesheet" href="https://use.typekit.net/tev1oeb.css?v={{ site.version }}">
  <link rel="stylesheet" href="/assets/interactive.css?v={{ site.version }}">
  <link rel="icon" type="image/x-icon" href="https://ik.imagekit.io/UltraDAO/wallace/favicon.png">
  <meta property="og:image" content="{{page.thumbnail | default: 'https://ik.imagekit.io/UltraDAO/wallace/chris-wallace.jpg'}}">
  <meta property="twitter:image" content="{{page.thumbnail | default: 'https://ik.imagekit.io/UltraDAO/wallace/chris-wallace.jpg'}}">

{% seo title=false %}

</head>
  <body>
    {{ content }}
  </body>
</html>