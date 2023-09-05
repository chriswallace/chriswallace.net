---
layout: default
---

<article>
<p class="home-title">
👋 &nbsp; Hi. I'm Chris.
</p>
  <h1 class="sub-heading">
    {{ page.description | escape }}
  </h1>
  <div class="{{ page.markdown }} max-w-none">
    {{ content }}
  </div>
</article>
