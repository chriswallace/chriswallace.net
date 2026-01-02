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

  <!-- Preconnect to Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Load fonts from Google - Kode Mono + fallback display fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Bandeins Variable Fonts - Self-hosted -->
  <style>
    @font-face {
      font-family: 'Bandeins Sans';
      src: url('/assets/fonts/BandeinsSansVariable.woff2') format('woff2-variations'),
           url('/assets/fonts/BandeinsSansVariable.woff2') format('woff2');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }
    
    @font-face {
      font-family: 'Bandeins Strange';
      src: url('/assets/fonts/BandeinsStrangeVariable.woff2') format('woff2-variations'),
           url('/assets/fonts/BandeinsStrangeVariable.woff2') format('woff2');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }
  </style>

  <!-- Font loading optimization -->
  <script>
    if ("fonts" in document) {
      document.documentElement.classList.add('fonts-loading');
      
      Promise.all([
        document.fonts.load('400 1em "Bandeins Sans"'),
        document.fonts.load('300 1em "Bandeins Sans"'),
        document.fonts.load('600 1em "Bandeins Sans"'),
        document.fonts.load('700 1em "Bandeins Sans"'),
        document.fonts.load('300 1em "Bandeins Strange"'),
        document.fonts.load('400 1em "Bandeins Strange"'),
        document.fonts.load('600 1em "Bandeins Strange"'),
        document.fonts.load('400 1em "Kode Mono"'),
        document.fonts.load('400 1em "Space Grotesk"'),
        document.fonts.load('400 1em "Syne"')
      ]).then(() => {
        document.documentElement.classList.remove('fonts-loading');
        document.documentElement.classList.add('fonts-loaded');
        document.dispatchEvent(new Event('fontsLoaded'));
      }).catch(() => {
        document.documentElement.classList.remove('fonts-loading');
      });
    }
  </script>
  <!-- Apollo script begin -->
  <script>(function initApolloInbound(){var TIMEOUT_MS=15000;var timeoutId;var style=document.createElement('style');style.id='apollo-form-prehide-css';style.textContent='form:has(input[type="email" i]),form:has(input[name="field-email" i]),.hs-form-iframe{position:relative!important}form:has(input[type="email" i])::before,form:has(input[name="field-email" i])::before,.hs-form-iframe::before{content:"";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;width:50px;height:50px;margin:auto;border:2.5px solid #e1e1e1;border-top:2.5px solid #9ea3a6;border-radius:50%;animation:spin 1s linear infinite;background-color:transparent;pointer-events:auto;z-index:999999;opacity:1}form:has(input[type="email" i]) *,form:has(input[name="field-email" i]) *,.hs-form-iframe *{opacity:0!important;user-select:none!important;pointer-events:none!important}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}';(document.head || document.documentElement).appendChild(style);function cleanup(){var styleEl=document.getElementById('apollo-form-prehide-css');if(styleEl)styleEl.remove();if(timeoutId)clearTimeout(timeoutId);}timeoutId=setTimeout(function(){console.warn('[Apollo] Form enrichment timeout after 5s - revealing forms. Check network and console for errors.');cleanup();},TIMEOUT_MS);var nocache=Math.random().toString(36).substring(7);var script=document.createElement('script');script.src='https://assets.apollo.io/js/apollo-inbound.js?nocache=' + nocache;script.defer=true;script.onerror=function(){console.error('[Apollo] Failed to load form enrichment script');cleanup();};script.onload=function(){try{window.ApolloInbound.formEnrichment.init({appId: '69583f8489bd7f0011d66fc7',onReady: function(){cleanup();},onError: function(err){console.error('[Apollo] Form enrichment init error:',err);cleanup();}});}catch(err){console.error('[Apollo] Error initializing form enrichment:',err);cleanup();}};document.head.appendChild(script);})();</script>
  <!-- Apollo script end -->
  <link rel="stylesheet" href="/assets/content-preloader.css" />
  <link rel="stylesheet" href="https://unpkg.com/splitting/dist/splitting.css" />
  <link rel="stylesheet" href="https://unpkg.com/splitting/dist/splitting-cells.css" />
  <link rel="stylesheet" href="/assets/main.css?v={{ site.version }}" expires="31536000">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" expires="31536000"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" expires="31536000"></script>
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
