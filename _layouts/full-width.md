---
layout: compress
---

<!DOCTYPE html>
<html lang="en">
  {% include head.md %}
  <body>
    <div class="mx-4 lg:px-0">
      {% include header.md %}
      <div class="container">
        {{ content }}
      </div>
    </div>
    {% include scripts.md %}
  </body>
</html>