---
layout: full-width
title: The Wallace Collection
description: A selection of generative artworks from my family's private collection on the Tezos and Ethereum blockchains. In full-screen mode, press your keyboard's &larr; and &rarr; buttons to browse all works.
permalink: /art/collection/
---

<script type="text/javascript">
  window.pageSettings = {
    musicTracks : [
    {
      src: "/assets/audio/Avatar_Gotham_lead_vocal_3_19.mp3",
      title: "Gotham",
      artist: "Avatar",
    },

    {
      src: "/assets/audio/Lunareh_Soul_Sister_background_vocals_3_31.mp3",
      title: "Soul Sister",
      artist: "Lunareh",
    },
    {
      src: "/assets/audio/Nom_Fabrique_Under_Your_Thumb_lead_vocal_3_41.mp3",
      title: "Under Your Thumb",
      artist: "Nom Fabrique",
    },
    {
      src: "/assets/audio/GRAMATTYK_Don_Cheadle_3_04.mp3",
      title: "Don Cheadle",
      artist: "GRAMATTYK",
    },
    {
      src: "/assets/audio/Dresden_The_Flamingo_Showdown_At_The_Dresden_instrumental_2_45.mp3",
      title: "Showdown At The Dresden (Instrumental)",
      artist: "The Dresden",
    },
    {
      src: "/assets/audio/Scarlett_Solo_Watch_It_All_Fall_lead_vocal_2_46.mp3",
      title: "Watch It All Fall",
      artist: "Scarlett Solo, INNXCENT",
    },
    {
      src: "/assets/audio/Mikey_Geiger_Come_Back_To_My_Heart_Feat_Jessie_Villa_Stripped_lead_vocal_1_56.mp3",
      title: "Come Back To My Heart (Stripped)",
      artist: "Mikey Geiger, Jessie Villa",
    },
    {
      src: "/assets/audio/Lost_Portals_Twilight_lead_vocal_4_18.mp3",
      title: "Twilight",
      artist: "Lost Portals",
    },
  ],
    htmlParts : {
      "part0": "/collection/chunk0.html",
      "part1": "/collection/chunk1.html",
      "part2": "/collection/chunk2.html",
      "part3": "/collection/chunk3.html",
      "part4": "/collection/chunk4.html",
      "part5": "/collection/chunk5.html",
      "part6": "/collection/chunk6.html",
      "part7": "/collection/chunk7.html",
      "part8": "/collection/chunk8.html",
      "part9": "/collection/chunk9.html",
      "part10": "/collection/chunk10.html",
    }
  }
</script>
<script src="/assets/js/gallery-viewer.js?v=0.1"></script>
<script src="/assets/js/player.js?v=0.1"></script>
<article>
  <a class="back-btn fade-in-element" href="/art">/art</a>
  <h1 class="fade-in-element">Introducing the Wallace Collection, a selection of generative art from my family's private collection&mdash;secured by the blockchain.
  </h1>
  <div class="collection-notes fade-in-element">
    <p style="flex:1;">
      <strong>Fullscreen controls:</strong>
      Click the maximize icon on any image and browse using your keyboard's &larr; and &rarr; buttons.
    </p>
    <div id="zenMode" class="hidden sm:flex sm:gap-4" style="flex:1.4;">
      <p class="mb-4" class="flex-1">
        <strong>Zen mode:</strong> Experience the collection alongside a curated selection of songs.
      </p>
      <p>
        <button id="autoPlayCollection" class="button "><i></i> Enter zen mode</button>
      </p>
    </div>
  </div>
  <div id="art-collection" class="art-collection"></div>
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
  <div class="to-top hidden sm:block">
    <button id="backToTop" title="Go to top">
      <i></i>
    </button>
  </div>
</div>
