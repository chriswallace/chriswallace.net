---
layout: full-width
title: QQL Curation
description: After poring over thousands of QQL outputs, I've curated a set that I am extremely proud of. Some are for sale while others have already been minted or sold.
permalink: /art/qql-curation/
---

<script src="/assets/js/gallery-viewer.js"></script>
<script src="/assets/js/player.js"></script>
<article class="lg:max-w-6xl 3xl:max-w-full mx-auto">
  <a class="back-btn fade-in-element" href="/art">Art</a>
  <h1 class="fade-in-element">QQL Curation</h1>
  <h2 class="sub-heading fade-in-element">
    After poring over thousands of QQL outputs, I've curated a set that I am extremely proud of. Some are for sale while others have already been minted or sold.
  </h2>
  <p class="fade-in-element">
    <strong>Fullscreen browser:</strong>
    Enter fullscreen viewer by clicking the maximize icon on any image. Browse using &larr; and &rarr; keyboard buttons.
  </p>
  <div id="zenMode" class="hidden sm:block">
    <p class="mb-4 fade-in-element">
      <strong>Zen mode:</strong> Experience the curation alongside a curated selection of songs.
    </p>
    <p class="mb-12 fade-in-element">
      <button id="autoPlayCollection" class="button"><i></i> Enter zen mode</button>
    </p>
  </div>
  <hr class="mb-16 md:mb-20 fade-in-element" />
  <div id="art-collection" class="art-collection">
    <div>
      <div class="gallery-row gallery-triple-wide-double-small">
        <div>
          <h3 class="artist-title">Coat of Margin</h3>
          <h4 class="collection-title"><a target="_blank" href="https://qql.art/token/0x8367a713bc14212ab1bb8c55a778e43e50b8b92746ce7ccd8e7fffff10c14b0b">For sale: Ξ2.0</a></h4>
          <img
            alt=""
            src="https://ik.imagekit.io/UltraDAO/wallace/qql_14b0b.png?tr=w-100,q-20,bl-6" />
        </div>
        <div>
          <h3 class="artist-title">Castles in the Sky</h3>
          <h4 class="collection-title"><a target="_blank" href="https://qql.art/token/0x8367a713bc14212ab1bb8c55a778e43e50b8b927495f18679de7ffff15810d48">For sale: Ξ0.75</a></h4>
          <img
            alt=""
            src="https://ik.imagekit.io/UltraDAO/wallace/qql_10d48.png?tr=w-100,q-20,bl-6" />
        </div>
        <div>
          <h3 class="artist-title">Interstellar</h3>
          <h4 class="collection-title"><a target="_blank" href="https://qql.art/token/0x8367a713bc14212ab1bb8c55a778e43e50b8b92746ce7ccd8e7fffff10c14b0b">For sale: Ξ2.0</a></h4>
          <img
            alt=""
            src="https://ik.imagekit.io/UltraDAO/wallace/qql_c14b0b.png?tr=w-100,q-20,bl-6" />
        </div>
      </div>
      <div class="gallery-row gallery-triple-wide-double-small">
        <div>
          <h3 class="artist-title">Perfect Wave</h3>
          <h4 class="collection-title"><a target="_blank" href="https://qql.art/token/0x8367a713bc14212ab1bb8c55a778e43e50b8b927f956b5f54d87ffff15617045">For sale: Ξ1.0</a></h4>
          <img
            alt=""
            src="https://ik.imagekit.io/UltraDAO/wallace/qql_17045.png?tr=w-100,q-20,bl-6" />
        </div>
        <div>
          <h3 class="artist-title">Rugged</h3>
          <h4 class="collection-title">Minted as QQL #94</h4>
          <img
            alt=""
            src="https://ik.imagekit.io/UltraDAO/wallace/qql_94.png?tr=w-100,q-20,bl-6" />
        </div>
        <div>
          <h3 class="artist-title">Distortion Machine</h3>
          <h4 class="collection-title"><a target="_blank" href="https://qql.art/token/0x8367a713bc14212ab1bb8c55a778e43e50b8b9274b0a0a33ecd2ffff11518a40">For sale: Ξ0.5</a></h4>
          <img
            alt=""
            src="https://ik.imagekit.io/UltraDAO/wallace/qql_18a40.png?tr=w-100,q-20,bl-6" />
        </div>
      </div>
    </div>
  </div>
</article>
<div id="fullscreen-viewer" class="hidden"></div>
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
  <div class="to-top">
    <button id="backToTop" title="Go to top">
      <i></i>
    </button>
  </div>
</div>

<footer class="fade-in-element">
  <div class="container">
    <p>
      Copyright © 2023 Chris Wallace. All rights reserved. Artwork displayed on this website is copyright its respective creator.
    </p>
  </div>
</footer>
