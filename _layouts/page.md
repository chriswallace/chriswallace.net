---
layout: default
---

<article>
  <h1>
    {{ page.title | escape }}
  </h1>
  <div class="{{ page.markdown }} max-w-none">
    {{ content }}
  </div>
</article>
