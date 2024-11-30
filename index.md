---
layout: home
title: Chris Wallace - Executive Design + Leadership
description: Product design leader with over 20 years experience in e-commerce, digital publishing, interactive media, and web3. Currently searching for my next long-term role.
---

<div class="content-preloader flex flex-col gap-4">
  <div class="logo-container">
    <div class="gradient-rect"></div>
  </div>
</div>

<div class="flex flex-col md:flex-row h-screen w-screen justify-center md:justify-between items-between md:items-center gap-6 z-0 p-4 lg:p-8">
  <div class="animated-headline">
    <div class="text-container">
      <div class="text-paragraph backwards text-2xl" data-splitting>Chris Wallace</div>
      <div class="text-paragraph forwards text-gray-950 dark:text-white text-4xl" data-splitting>Product Design Leader</div>
    </div>
  </div>
  <div>
    <div class="video-container">
      <video id="backgroundVideo" class="homepage-video" poster="https://ik.imagekit.io/UltraDAO/chriswallace.net/portfolio-poster.png" autoplay muted loop playsinline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback">
          <source src="https://ik.imagekit.io/UltraDAO/chriswallace.net/portfolio-video.mp4" type="video/mp4">
          Your browser does not support HTML5 video.
      </video>
      <div class="portfolio__controls invisible">
        <button id="playButton" class="portfolio__play-button" onclick="togglePlay()">
            <svg id="playIcon" width="12" height="20" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.4353 10.8295L1.80706 0.23623C1.06251 -0.342509 0 0.208084 0 1.17265V22.8274C0 23.7919 1.06251 24.3425 1.80706 23.7638L15.4353 13.1705C16.1882 12.5853 16.1882 11.4147 15.4353 10.8295Z" class="fill-current" /></svg>
            <div class="pt-[4px]" id="buttonText">Play Showreel</div>
        </button>
      </div>
    </div>
  </div>
</div>

{% if jekyll.environment == 'production' %}

<script src="/assets/js/portfolioVideo.min.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/homepage.min.js?v={{ site.version }}" expires="31536000"></script>

{% else %}

<script src="/assets/js/portfolioVideo.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/homepage.js?v={{ site.version }}" expires="31536000"></script>

{% endif %}
