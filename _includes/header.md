{% if page.layout == 'home' %}

<!-- Homepage uses its own inline navigation -->

{% else %}

<div class="ui-navbar fade-in-element">
  <button id="menu-button" class="menu-button" aria-label="Open Navigation Menu" aria-expanded="false">
    <svg width="24" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.48842 29L0 0H7.96031L13.4487 25.0072L17.7222 0H25.7244L32.3413 25.0072L34.9022 13.6594C35.7401 9.68228 34.6528 1.53286 28.913 0H38L32.0507 29H24.0904L17.9735 0.994285L13.4487 29H5.48842Z" fill="currentColor"/></svg>
  </button>
  
  <nav id="navigation-items" class="menu" aria-label="Main Navigation">
    <div class="menu__header">
      <button id="menu-close" class="menu__close" aria-label="Close Navigation Menu">
        <i></i>
      </button>
      <a href="/" class="menu__logo" aria-label="Home">
        <svg width="46" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.48842 29L0 0H7.96031L13.4487 25.0072L17.7222 0H25.7244L32.3413 25.0072L34.9022 13.6594C35.7401 9.68228 34.6528 1.53286 28.913 0H38L32.0507 29H24.0904L17.9735 0.994285L13.4487 29H5.48842Z" fill="currentColor"/></svg>
      </a>
    </div>
    
    <ul class="menu__list">
      <li class="menu__item"><a href="/" class="menu__link" aria-label="Home">Home</a></li>
      <li class="menu__item"><a href="/portfolio" class="menu__link" aria-label="Portfolio">Portfolio</a></li>
      <li class="menu__item"><a href="/bio" class="menu__link" aria-label="Bio">Bio</a></li>
      <li class="menu__item"><a href="/design-services" class="menu__link" aria-label="Services">Services</a></li>
      <li class="menu__item"><a href="/resume" class="menu__link" aria-label="Resume">Resume / CV</a></li>
      <li class="menu__item"><a href="/contact" class="menu__link" aria-label="Contact">Contact</a></li>
    </ul>
    
    <div class="menu__social">
      <a href="https://twitter.com/chriswallace" aria-label="Twitter">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"/>
        </svg>
      </a>
      <a href="https://bsky.app/profile/chriswallace.net" aria-label="BlueSky">
        <svg width="21" height="24" viewBox="0 -3.268 64 68.414" fill="currentColor">
          <path d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805zm36.254 0C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745z"/>
        </svg>
      </a>
    </div>
  </nav>
</div>
{% endif %}
