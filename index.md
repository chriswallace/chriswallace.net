---
layout: home
title: Chris Wallace - Executive Design + Leadership
description: Product design leader with over 20 years experience in e-commerce, digital publishing, interactive media, and web3. Currently searching for my next long-term role.
---

<div class="notifications--button opacity-0">
  <button id="notifs" class="notifications--button-inner">3</button>
</div>

<div id="notificationsOverlay" class="notifications--overlay hidden"></div>

<div class="notifications hidden opacity-0 -translate-y-2">
  <div class="notifications--notification-title">What's New?</div>
  <a class="notifications--notification-item article" href="/articles/marketing-ai-digital-products">
    <span class="notifications--notification-overline">New article</span> 
    <span>AI in Digital Products: Are You Marketing It Wrong?</span>
  </a>
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
      <video-player id="backgroundVideo" video-url="https://ik.imagekit.io/UltraDAO/chriswallace.net/portfolio-video.mp4"></video-player>
    </div>
  </div>
</div>

{% if jekyll.environment == 'production' %}

<script src="/assets/js/homepage.min.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/notifications.min.js?v={{ site.version }}" expires="31536000"></script>

{% else %}

<script src="/assets/js/homepage.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/notifications.js?v={{ site.version }}" expires="31536000"></script>

{% endif %}
