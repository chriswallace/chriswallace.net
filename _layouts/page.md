---
layout: default
---

  <div class="content-container pt-[15svh]">
    <div class="primary-heading fade-in-element">
      <h1>
        {{ page.title | escape }}
      </h1>
    </div>
    <div class="{{ page.markdown }} max-w-none">
      {{ content }}
    </div>
  </div>
