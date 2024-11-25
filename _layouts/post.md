---
layout: default
---

  <div class="primary-heading border-b border-primary-500 pt-32 md:pt-24 md:pb-0 mb-16 fade-in-element">
    <div class="content-container pt-6 pb-12">
      <h1 class="text-primary-500">
        {{ page.title | escape }}
      </h1>
    </div>
  </div>
  <div class="{{ page.markdown }} max-w-none content-container pt-6 pb-12">
    {{ content }}
  </div>
