---
layout: compress
---

<!DOCTYPE html>
<html lang="en">
  {% include head.md %}
  <body>
    <div class="ui-frame">
      <div class="ui-navbar">
        {% include header.md %}
      </div>
      <div class="ui-content !pt-0 relative">
        {{ content }}
      </div>
    </div>
    {% include scripts.md %}
  </body>
</html>
