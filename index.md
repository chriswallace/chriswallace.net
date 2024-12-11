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

<div class="content-container relative ~mt-40/24 mb-8">
  <div class="animated-headline">
    <div class="text-container">
      <div class="text-paragraph forwards" data-splitting>Bold Design + Product Leadership</div>
    </div>
  </div>
</div>

<div class="content-container-wo">
  <video-player id="backgroundVideo" video-url="https://ik.imagekit.io/UltraDAO/chriswallace.net/portfolio-video.mp4" video-title="2024 Showreel" video-description="A collection of works from my latest role leading product design at Candy Digital." class="text-primary-600 mb-12" autoplay playsinline muted loop nocontrols></video-player>
</div>

<div class="content-container">
  <div class="max-w-prose fade-in-element">
    <p class="~text-xl/2xl"><strong>I'm Chris Wallace</strong>: a design executive with 20 years in startups, product, and agency. Empathy, craft, and vision are the tools I use to build successful, high-performing design orgs. I've worked with Microsoft, Starbucks, Google, Facebook, The Nobel Prize, The Walking Dead, Breaking Bad, et al.</p>
    <p>This site is built on <a href="https://jekyllrb.com">Jekyll</a> and <a href="https://tailwindcss.com/">TailwindCSS</a>, hosted by <a href="https://pages.github.com/">Github Pages</a>. Typeset in <a href="https://fonts.adobe.com/fonts/norman-variable">Norman Variable</a> and <a href="https://fonts.adobe.com/fonts/acumin">Acumin</a>.</p>
  </div>
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
    <a class="inline-block mx-auto relative transition-transform transition-200 hover:scale-105 rounded-xl shadow-xl overflow-hidden" href="/portfolio/woodies/">
      <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black from-0% to-60% ~p-4/8 z-20">
        <span class="text-white uppercase tracking-widest ~text-xs/sm decoration-offset-4">Don't miss this</span>
        <h3 class="mt-3 mb-0 font-serif font-semibold ~text-xl/5xl max-w-[75%] md:max-w-[50%] text-white">Woodies&mdash;a web3 entertainment brand powered by nature</h3>
      </div>
      <img src="https://ik.imagekit.io/UltraDAO/chriswallace.net/woodies-thumbnail.webp?tr=q-50,f-auto" class="mx-auto max-w-full relative z-10" alt="" loading="lazy" width="1600" height="1080">
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
      <a class="portfolio-list__link" href="/portfolio/dc3-interactive-comic-reader/">
          <img src="https://ik.imagekit.io/UltraDAO/chriswallace.net/dc3-reader-1.png?tr=w-1000,f-auto" class="portfolio-list__image" alt="" loading="lazy" width="800" height="540">
          <h3 class="portfolio-list__title">DC3 Interactive Comic Reader</h3>
          <p class="portfolio-list__description">An interactive comic book reader application for Candy's DC3 digital comic collection.</p>
      </a>
    </div>
    <div class="portfolio-list__item fade-in-element">
      <a class="portfolio-list__link" href="/portfolio/palm-quest/">
          <img src="https://ik.imagekit.io/UltraDAO/chriswallace.net/palm-quest-thumbnail.png?tr=w-1000,f-auto" class="portfolio-list__image" alt="" loading="lazy" width="800" height="540">
          <h3 class="portfolio-list__title">Palm Quest App Prototype</h3>
          <p class="portfolio-list__description">Creating a gamified airdrop farming experience with SvelteKit.</p>
      </a>
    </div>
  </div>
</div>

{% if jekyll.environment == 'production' %}

<script src="/assets/js/homepage.min.js?v={{ site.version }}" expires="31536000"></script>

{% else %}

<script src="/assets/js/homepage.js?v={{ site.version }}" expires="31536000"></script>

{% endif %}
