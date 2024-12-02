---
layout: home
title: Chris Wallace - Executive Design + Leadership
description: Product design leader with over 20 years experience in e-commerce, digital publishing, interactive media, and web3. Currently searching for my next long-term role.
---

<div class="notifications--button opacity-0">
  <button id="notifs" class="notifications--button-inner">2</button>
</div>

<div id="notificationsOverlay" class="notifications--overlay hidden"></div>

<div class="notifications hidden opacity-0 -translate-y-2">
  <div class="notifications--notification-title">Notifications</div>
  <a class="notifications--notification-item article" href="/articles/the-design-systems-guide-for-big-companies">
    <span class="notifications--notification-overline">New article</span> 
    <span>Design Systems for Big Companies</span>
  </a>
  <a class="notifications--notification-item portfolio" href="/design-services">
    <span class="notifications--notification-overline">New service</span> 
    <span>Fractional Chief Designer Officer</span>
  </a>
</div>

<div class="content-preloader flex flex-col gap-4">
  <div class="logo-container">
    <div class="gradient-rect"></div>
  </div>
</div>

<div class="flex flex-col md:flex-row h-screen w-screen justify-center md:justify-between items-between md:items-center gap-6 z-0 p-4 lg:p-8">
  <div class="animated-headline">
    <div class="text-container">
      <div class="text-paragraph backwards ~text-2xl/3xl !capitalize font-medium !mb-4" data-splitting>Chris Wallace</div>
      <div class="text-paragraph forwards text-gray-950 dark:text-white ~text-4xl/5xl font-medium" data-splitting>Executive Design + Leadership</div>
      <div class="text-paragraph backwards" data-splitting>
        <a class="font-sans font-normal ~text-lg/xl capitalize hover:text-gray-950 dark:hover:text-white" href="/bio">My Bio &rarr;</a>
      </div>
    </div>
  </div>
  <div>
    <div class="video-container">
      <video id="backgroundVideo" class="homepage-video" poster="https://ik.imagekit.io/UltraDAO/chriswallace.net/portfolio-poster.png" autoplay muted loop playsinline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback">
          <source src="https://ik.imagekit.io/UltraDAO/chriswallace.net/portfolio-video.mp4" type="video/mp4">
          Your browser does not support HTML5 video.
      </video>
      <div class="portfolio__controls invisible">
        <button id="playButton" class="portfolio__play-button" onclick="togglePlay()" aria-label="Pause video">
            <svg id="playIcon" width="12" height="20" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 1C0 0.447716 0.447715 0 1 0H5C5.55228 0 6 0.447715 6 1V23C6 23.5523 5.55228 24 5 24H1C0.447715 24 0 23.5523 0 23V1Z" class="fill-current"/>
                <path d="M10 1C10 0.447716 10.4477 0 11 0H15C15.5523 0 16 0.447715 16 1V23C16 23.5523 15.5523 24 15 24H11C10.4477 24 10 23.5523 10 23V1Z" class="fill-current"/>
            </svg>
            <span id="buttonText" class="sr-only">Pause</span>
        </button>
        <button id="muteButton" class="portfolio__play-button" onclick="toggleMute()" aria-label="Unmute video">
            <svg id="muteIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 9a5 5 0 0 1 .95 2.293"/>
                <path d="M19.364 5.636a9 9 0 0 1 1.889 9.96"/>
                <path d="m2 2 20 20"/>
                <path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"/>
                <path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686"/>
            </svg>
            <span id="muteText" class="sr-only">Unmute</span>
        </button>
      </div>
    </div>
  </div>
</div>

{% if jekyll.environment == 'production' %}

<script src="/assets/js/portfolioVideo.min.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/homepage.min.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/notifications.min.js?v={{ site.version }}" expires="31536000"></script>

{% else %}

<script src="/assets/js/portfolioVideo.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/homepage.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/notifications.js?v={{ site.version }}" expires="31536000"></script>

{% endif %}
