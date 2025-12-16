{% if page.layout == 'home' %}

<!-- Homepage uses its own inline navigation -->

{% else %}

<!-- Navigation -->
<nav class="site-navbar" id="site-navbar">
  <a href="/" class="site-logo-link">
    <img src="https://ik.imagekit.io/UltraDAO/chriswallace.net/homepage/wallace-design-logo.svg" alt="Wallace Design" class="site-logo-img">
  </a>
  
  <div class="nav-links">
    <a href="/portfolio" class="nav-link{% if page.url == '/portfolio' or page.url == '/portfolio/' %} active{% endif %}">Portfolio</a>
    <a href="/bio" class="nav-link{% if page.url == '/bio' or page.url == '/bio/' %} active{% endif %}">Bio</a>
    <a href="/design-services" class="nav-link{% if page.url == '/design-services' or page.url == '/design-services/' %} active{% endif %}">Services</a>
    <a href="/resume" class="nav-link{% if page.url == '/resume' or page.url == '/resume/' %} active{% endif %}">Resume</a>
    <a href="/contact" class="nav-link{% if page.url == '/contact' or page.url == '/contact/' %} active{% endif %}">Contact</a>
  </div>
  
  <a href="https://zcal.co/chriswallace" class="nav-cta" target="_blank" rel="noopener">
    Schedule a Call
  </a>
  
  <button class="mobile-menu-btn" aria-label="Toggle menu" id="mobile-menu-toggle">
    <span class="mobile-menu-handle"></span>
  </button>
</nav>

<!-- Mobile Menu Overlay -->
<div class="mobile-menu-overlay" id="mobile-menu-overlay"></div>

<!-- Mobile Menu (Pull-down Sheet) -->
<div class="mobile-menu" id="mobile-menu">
  <div class="mobile-menu-cta">
    <a href="https://zcal.co/chriswallace" class="btn btn-bright" target="_blank" rel="noopener">Schedule a Call</a>
  </div>
  <div class="mobile-menu-links">
    <a href="/" class="mobile-menu-link{% if page.url == '/' %} active{% endif %}">Home</a>
    <a href="/portfolio" class="mobile-menu-link{% if page.url == '/portfolio' or page.url == '/portfolio/' %} active{% endif %}">Portfolio</a>
    <a href="/bio" class="mobile-menu-link{% if page.url == '/bio' or page.url == '/bio/' %} active{% endif %}">Bio</a>
    <a href="/design-services" class="mobile-menu-link{% if page.url == '/design-services' or page.url == '/design-services/' %} active{% endif %}">Services</a>
    <a href="/resume" class="mobile-menu-link{% if page.url == '/resume' or page.url == '/resume/' %} active{% endif %}">Resume</a>
    <a href="/contact" class="mobile-menu-link{% if page.url == '/contact' or page.url == '/contact/' %} active{% endif %}">Contact</a>
  </div>
  <div class="mobile-menu-logo">
    <img src="https://ik.imagekit.io/UltraDAO/chriswallace.net/homepage/wallace-design-logo.svg" alt="Wallace Design">
  </div>
  <div class="mobile-menu-handle-bottom"></div>
</div>

{% endif %}
