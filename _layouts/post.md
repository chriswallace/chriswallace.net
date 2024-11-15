---
layout: default
---

  <div class="primary-heading border-b border-primary-500 pt-32 pt-8 md:pb-12 mb-16 fade-in-element">
    <div class="content-container">
      <h1 class="text-primary-500">
        {{ page.title | escape }}
      </h1>
    </div>
  </div>
  <div class="{{ page.markdown }} max-w-none content-container">
    {{ content }}
  </div>
