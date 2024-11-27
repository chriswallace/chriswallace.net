---
layout: default
---

  <div class="content-container ~pt-24/16">
    <div class="primary-heading fade-in-element">
      <h1>
        {{ page.title | escape }}
      </h1>
    </div>
    <div class="{{ page.markdown }} max-w-none">
      {{ content }}
    </div>
  </div>
