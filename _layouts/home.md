---
layout: default
---

<article>
<p class="home-title fade-in-element">
👋&nbsp; Hi. I'm Chris.
</p>
  <h1 class="sub-heading fade-in-element">
    {{ page.description | escape }}
  </h1>
  <div class="{{ page.markdown }} max-w-none fade-in-element">
    {{ content }}
  </div>
</article>
