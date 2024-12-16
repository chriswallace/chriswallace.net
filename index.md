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

<div class="animation">
  <div class="relative">
    <div class="content-container">
      <div class="sm:h-screen max-w-prose flex flex-col justify-between gap-6">
        <div class="mt-24 mb-0 z-20">
          <div class="animated-headline">
            <div class="text-container">
              <div class="text-paragraph forwards" data-splitting>Leading design for the next generation of digital products.</div>
            </div>
          </div>
          <div id="aboutSection" class="~my-3/6">
            <p class="~text-base/lg mb-[1em]">I'm a senior design leader and technologist with 20 years in product and agency. I build high-functioning teams and transformative products used by real people, driving culture and elevating brands to their full potential.</p>
          </div>
        </div>
        <dl id="workStatus" class="work-status">
          <div class="work-status--work-status animated">
            <dt class="font-semibold">Work Status</dt>
            <dd><i></i> <a class="no-underline hover:underline" href="/contact">Available</a></dd>
          </div>
          <div class="work-status--available animated">
            <dt class="font-semibold">Now Booking</dt>
            <dd class="ml-0">January 2025</dd>
          </div>
          <div class="work-status--past-clients animated">
            <dt class="font-semibold">Ask Me About</dt>
            <dd class="ml-0">
              <div class="rotator">
                <div class="rotator__track">
                  <div class="rotator__item">Fractional Design Leadership</div>
                  <div class="rotator__item">My Experience in Web3</div>
                  <div class="rotator__item">What Makes a Product Great</div>
                  <div class="rotator__item">The Future of Design &amp; AI</div>
                  <div class="rotator__item">What Makes a Design Leader Great</div>
                  <div class="rotator__item">Fractional Design Leadership</div>
                </div>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>

  </div>
</div>

<hr class="hr-separator !w-full" />

<div class="content-container space-y-24 ~my-8/32">
  <div class="md:grid md:grid-cols-3">
    <div>
      <h2 class="~text-2xl/4xl md:mt-1.5 fade-in-element">Freshly published</h2>
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

  <div class="flex justify-center">
    <media-card
      href="/portfolio/woodies/"
      class="shadow-xl rounded-xl w-full fade-in-element" 
      overline="Don't miss this"
      title="Woodies—a web3 entertainment brand powered by nature"
      media-src="https://ik.imagekit.io/UltraDAO/chriswallace.net/woodies-thumbnail.mp4"
      media-type="video">
    </media-card>
  </div>

  <div class="testimonial fade-in-element">
    <blockquote class="testimonial__quote !max-w-[65rem]">
        <p class="testimonial__text">"Chris is an <em class="testimonial__emphasis">exceptionally talented and proactive</em> team member, consistently pushing boundaries to deliver innovative, impactful solutions. His technical expertise, thoughtful approach to design, and keen user-centric mindset <span class="testimonial__highlight">set him apart</span> in the field.</p>
        <p class="testimonial__author">— Eric Ginsberg, Marketing Director @ Candy Digital</p>
    </blockquote>
  </div>

  <h2 class="font-serif fade-in-element mb-0 flex justify-between items-end"><span class="~text-2xl/5xl">Dive right in.</span><a href="/portfolio" class="~text-lg/3xl mb-1.5">My portfolio &rarr;</a></h2>
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
