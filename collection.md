---
layout: full-width
title: The Wallace Collection
description: A selection of generative artworks from my family's private collection on the Tezos and Ethereum blockchains. In full-screen mode, press your keyboard's &larr; and &rarr; buttons to browse all works.
permalink: /art/collection/
---

<article>
  <a class="back fade-in-element" href="/art">/art</a>
  <h1 class="fade-in-element">Introducing the Wallace Collection, a selection of generative art from my family's private collection&mdash;secured by the blockchain.
  </h1>
  <div class="collection-notes fade-in-element">
    <p>
      <strong>Fullscreen controls:</strong>
      Click the maximize icon on any image and browse using your keyboard's &larr; and &rarr; buttons.
    </p>
    <div id="zenMode" class="zen-mode">
      <p>
        <strong>Zen mode:</strong> Experience the collection alongside a curated selection of songs.
      </p>
      <p>
        <button id="autoPlayCollection" class="button"><span class="emoji-icon">🧘🏻</span> Enter zen mode</button>
      </p>
    </div>
  </div>
  <div id="bgSwitch">
    <div id="art-collection" class="art-collection"></div>
  </div>
</article>
<div id="fullscreen-viewer" class="fullscreen-viewer hidden"></div>
<div id="utility-bar" class="utility-bar hidden">
  <div class="page-title-container">
    <div id="pageTitle" class="page-title">The Wallace Collection</div>
  </div>
  <div class="music-player-container">
    <div id="musicPlayer" class="music-player">
      <audio id="audioElement" src=""></audio>
      <div class="trackActivityContainer">
        <div class="trackActivity">
          <div class="infoBox">
            <div id="trackInfo" class="marquee"></div>
          </div>
        </div>
      </div>
      <button id="playButton" aria-labelledby="play-label">
        <i></i>
        <span id="play-label">Play</span>
      </button>
      <button id="pauseButton" aria-labelledby="pause-label">
        <i></i>
        <span id="pause-label">Pause</span>
      </button>
      <button id="prevButton" aria-labelledby="previous-label">
        <i></i>
        <span id="previous-label">Previous track</span>
      </button>
      <button id="nextButton" aria-labelledby="next-label">
        <i></i>
        <span id="next-label">Next</span>
      </button>
      <input id="volumeControl" type="range" min="0" max="1" step="0.1" aria-label="Volume" />
    </div>
  </div>
  <div class="to-top hidden">
    <button id="backToTop" title="Go to top">
      <i>
        <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11L9 5L15 11" stroke="#ADADAD" stroke-width="2" stroke-linecap="round"/></svg>
      </i>
    </button>
  </div>
</div>

{% if jekyll.environment == 'production' %}
  <script src="/assets/js/collection-page.min.js?v={{ site.version }}"></script>
  <script src="/assets/js/gallery-viewer.min.js??v={{ site.version }}"></script>
  <script src="/assets/js/player.min.js?v=0.11?v={{ site.version }}"></script>
{% else %}
  <script src="/assets/js/collection-page.js?v={{ site.version }}"></script>
  <script src="/assets/js/gallery-viewer.js?v={{ site.version }}"></script>
  <script src="/assets/js/player.js?v=0.11?v={{ site.version }}"></script>
{% endif %}