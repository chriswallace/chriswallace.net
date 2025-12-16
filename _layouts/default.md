<!DOCTYPE html>
<html lang="en">
  {% include head.md %}
  <body class="{{ page.layout }}">
    <div class="ui-frame">
      {% include header.md %}
      <div class="ui-content">
        {{ content }}
        {% include footer.md %}
      </div>
    </div>

    {% include scripts.md %}

  </body>
</html>
