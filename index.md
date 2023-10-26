---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: Chris Wallace
description: Hi. I'm Chris, an award-winning design executive with 16+ years of leadership and innovation for household brands and revered cultural institutions.
---

<h2 class="fade-in-element mb-6">Recent art projects</h2>

<div id="bgSwitch" class="card-grid">
  <a class="bg-image-card bottom-right fade-in-element" style="background-image: url('https://ik.imagekit.io/UltraDAO/wallace/qql-card.png?tr=w-100,q-20,bl-6');" href="/art/qql-studying-the-algorithm/">
    <div class="card-text">
      <div>
        <h3>QQL</h3>
        <p>Studying the algorithm</p>
        <div class="cta">Explore</div>
      </div>
    </div>
  </a>
  <a class="bg-image-card top-center dark fade-in-element" style="background-image: url('https://ik.imagekit.io/UltraDAO/wallace/wallace-collection-card-bg.png?tr=w-100,q-20,bl-6');" href="/art/collection">
    <div class="card-text">
      <div>
        <h3>Wallace Collection</h3>
        <p>Immerse yourself in art</p>
        <div class="cta">Explore</div>
      </div>
    </div>
  </a>
  <a class="bg-image-card fade-in-element" style="background-image: url('https://ik.imagekit.io/UltraDAO/wallace/interplay-card.png?tr=w-100,q-20,bl-6');" href="/art/interplay">
    <div class="card-text">
      <div>
        <h3>Interplay</h3>
        <p>Collaborating with GPT-4</p>
        <div class="cta">Explore</div>
      </div>
    </div>
  </a>
  <a class="bg-image-card bottom-center fade-in-element" style="background-image: url('https://ik.imagekit.io/UltraDAO/wallace/nemesis-card.png?tr=w-100,q-20,bl-6');" href="https://woodiesofficial.com" target="blank">
    <div class="card-text">
      <div>
        <h3>Woodies Nemesis</h3>
        <p>Coming soon</p>
        <div class="cta">Visit Woodies</div>
      </div>
    </div>
  </a>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const artCollection = document.getElementById('bgSwitch');
    const triggerPoint = artCollection.offsetTop;

    window.addEventListener('scroll', () => {
        if (window.scrollY === 0) {
            document.body.classList.remove('subtle-bg');
        } else if (window.scrollY + 140 >= triggerPoint) {
            document.body.classList.add('subtle-bg');
        } else {
            document.body.classList.remove('subtle-bg');
        }
    });
});
</script>