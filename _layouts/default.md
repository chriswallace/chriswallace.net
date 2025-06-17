<!DOCTYPE html>
<html lang="en">
  {% include head.md %}
  <body class="{{ page.layout }}">
    <div class="ui-frame">
      <div class="ui-navbar">
        {% include header.md %}
      </div>
      <div class="ui-content">
        {{ content }}
        {% include footer.md %}
      </div>
    </div>

    {% include scripts.md %}

  </body>
</html>
