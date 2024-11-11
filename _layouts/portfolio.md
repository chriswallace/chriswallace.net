---
layout: compress
---

<!DOCTYPE html>
<html lang="en">
  {% include head.md %}
  <body>
    <div class="ui-frame">
      <div class="ui-navbar">
        {% include header.md %}
      </div>
      <div class="ui-content !pt-0 md:pt-0">
        <div class="content-container-wo">
          <div class="portfolio__video-container">
            <div class="portfolio__video-overlay"></div>
            <video id="backgroundVideo" class="portfolio__video" poster="https://ik.imagekit.io/UltraDAO/chriswallace.net/portfolio-poster.png" autoplay muted loop playsinline>
                <source src="https://ik.imagekit.io/UltraDAO/chriswallace.net/portfolio-video.mp4" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
            <div class="fade-in-element portfolio__controls">
              <button id="playButton" class="portfolio__play-button" onclick="togglePlay()">
                  <svg id="playIcon" width="12" height="20" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.4353 10.8295L1.80706 0.23623C1.06251 -0.342509 0 0.208084 0 1.17265V22.8274C0 23.7919 1.06251 24.3425 1.80706 23.7638L15.4353 13.1705C16.1882 12.5853 16.1882 11.4147 15.4353 10.8295Z" class="fill-current" /></svg>
                  <div class="pt-[4px]" id="buttonText">Play Showreel</div>
              </button>
              <h1 class="portfolio__title">/portfolio</h1>
            </div>
          </div>
          {{ content }}
        </div>
        {% include footer.md %}
      </div>
    </div>
    {% include scripts.md %}
    {% if jekyll.environment == 'production' %}
    <script src="/assets/js/portfolioVideo.min.js?v={{ site.version }}"></script>
    {% else %}
    <script src="/assets/js/portfolioVideo.js?v={{ site.version }}"></script>
    {% endif %}
  </body>
</html>
