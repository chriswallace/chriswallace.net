---
layout: default
---

  <div class="primary-heading content-container pt-12 lg:pt-24 fade-in-element">
    <h1>
      {{ page.title | escape }}
    </h1>
    <div class="{{ page.markdown }} max-w-none">
      {{ content }}
    </div>
  </div>
