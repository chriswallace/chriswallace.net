---
layout: default
---

<article>
  <h1 class="fade-in-element primary-heading">
    {{ page.title | escape }}
  </h1>
  <div class="{{ page.markdown }} max-w-none">
    {{ content }}
  </div>
</article>
