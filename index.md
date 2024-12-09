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

<div class="content-container relative mb-8 md:mb-0">
  <div class="animated-headline my-[30px]">
    <div class="text-container place-content-between flex flex-row justify-end items-end md:justify-between gap-0">
      <div>
        <div class="text-paragraph forwards text-lg !capitalize font-medium" data-splitting>Chris Wallace</div>
      </div>
      <div>
        <div class="text-paragraph backwards text-lg !capitalize font-medium hidden md:block" data-splitting>Executive Design + Leadership</div>
      </div>
    </div>
  </div>
</div>

<div class="content-container mx-auto">
  <video-player id="backgroundVideo" video-url="https://ik.imagekit.io/UltraDAO/chriswallace.net/portfolio-video.mp4" video-title="2024 Showreel" video-description="A collection of works from my latest role leading product design at Candy Digital." class="text-primary-600" autoplay playsinline muted loop></video-player>
</div>

<div class="content-container space-y-24 md:py-12">
  <div class="md:grid md:grid-cols-3">
    <div>
      <h2 class="~text-2xl/4xl md:mt-1.5 fade-in-element">What's new?</h2>
    </div>
    <div class="notifications md:col-span-2">
      <a class="notifications--notification-item article fade-in-element" href="/articles/marketing-ai-digital-products">
        <span class="notifications--notification-overline">New Article</span>
        <span>AI in Digital Products: Are You Marketing It Wrong?</span>
      </a>
      <a class="notifications--notification-item article fade-in-element" href="/articles/the-design-systems-guide-for-big-companies">
        <span class="notifications--notification-overline">New Article</span>
        <span>Design Systems for Big Companies</span>
      </a>
      <a class="notifications--notification-item portfolio fade-in-element" href="/design-services">
        <span class="notifications--notification-overline">New Service</span>
        <span>Fractional Chief Designer Officer</span>
      </a>
    </div>
  </div>

  <div class="flex justify-center fade-in-element">
    <a class="inline-block mx-auto relative transition-transform transition-200 hover:scale-105" href="/portfolio/woodies/">
      <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black from-0% to-60% ~p-4/8 z-20">
        <span class="text-white uppercase tracking-widest ~text-xs/sm decoration-offset-4">Don't miss this</span>
        <h3 class="mt-3 mb-0 font-serif font-semibold ~text-xl/5xl max-w-[75%] md:max-w-[50%]">Woodies&mdash;a web3 entertainment brand powered by nature</h3>
      </div>
      <img src="https://ik.imagekit.io/UltraDAO/chriswallace.net/woodies-thumbnail.webp?tr=q-50,f-auto" class="mx-auto max-w-full rounded-xl shadow-xl relative z-10" alt="" loading="lazy" width="1600" height="1080">
    </a>
  </div>

  <div class="testimonial fade-in-element">
    <blockquote class="testimonial__quote !max-w-[65rem]">
        <p class="testimonial__text">"Chris is an <em class="testimonial__emphasis">exceptionally talented and proactive</em> team member, consistently pushing boundaries to deliver innovative, impactful solutions. His technical expertise, thoughtful approach to design, and keen user-centric mindset <span class="testimonial__highlight">set him apart</span> in the field.</p>
        <p class="testimonial__author">— Eric Ginsberg, Marketing Director @ Candy Digital</p>
    </blockquote>
  </div>

  <h2 class="font-serif fade-in-element mb-0 flex justify-between items-end"><span class="~text-2xl/5xl">Dive right in.</span><a href="/portfolio" class="~text-lg/3xl">Scope my portfolio &rarr;</a></h2>
  <div class="portfolio-list !max-w-none !mt-8">
    <div class="portfolio-list__item fade-in-element">
        <a class="portfolio-list__link" href="/portfolio/redacted-mlb-game/">
            <img src="https://ik.imagekit.io/UltraDAO/chriswallace.net/redacted-mlb-game-thumbnail.png?tr=w-1000,f-auto" class="portfolio-list__image" alt="" loading="lazy" width="800" height="540">
        </a>
        <h3 class="portfolio-list__title"><a href="/portfolio/redacted-mlb-game/">[Redacted] MLB Game</a></h3>
        <p class="portfolio-list__description">A series of mockups for a mobile game concept using digital collectibles as game pieces.</p>
    </div>
    <div class="portfolio-list__item fade-in-element">
        <a href="/portfolio/dc3-interactive-comic-reader/">
            <img src="https://ik.imagekit.io/UltraDAO/chriswallace.net/dc3-reader-1.png?tr=w-1000,f-auto" class="portfolio-list__image" alt="" loading="lazy" width="800" height="540">
        </a>
        <h3 class="portfolio-list__title"><a href="/portfolio/dc3-interactive-comic-reader/">DC3 Interactive Comic Reader</a></h3>
        <p class="portfolio-list__description">An interactive comic book reader application for Candy's DC3 digital comic collection.</p>
    </div>
    <div class="portfolio-list__item fade-in-element">
        <a class="portfolio-list__link" href="/portfolio/palm-quest/">
            <img src="https://ik.imagekit.io/UltraDAO/chriswallace.net/palm-quest-thumbnail.png?tr=w-1000,f-auto" class="portfolio-list__image" alt="" loading="lazy" width="800" height="540">
        </a>
        <h3 class="portfolio-list__title"><a href="/portfolio/palm-quest/">Palm Quest App Prototype</a></h3>
        <p class="portfolio-list__description">Creating a gamified airdrop farming experience with SvelteKit.</p>
    </div>
    <div class="portfolio-list__item fade-in-element">
        <a class="portfolio-list__link" href="/portfolio/candy-physical-digital-feature/">
            <img src="https://ik.imagekit.io/UltraDAO/chriswallace.net/physical-digital.png?tr=w-1000,f-auto" class="portfolio-list__image" alt="" loading="lazy" width="800" height="540">
        </a>
        <h3 class="portfolio-list__title"><a href="/portfolio/candy-physical-digital-feature/">Candy.io Physical-Digital Checkout</a></h3>
        <p class="portfolio-list__description">Designing a new feature for Candy's existing checkout process.</p>
    </div>

  </div>
</div>

{% if jekyll.environment == 'production' %}

<script src="/assets/js/homepage.min.js?v={{ site.version }}" expires="31536000"></script>

{% else %}

<script src="/assets/js/homepage.js?v={{ site.version }}" expires="31536000"></script>

{% endif %}
