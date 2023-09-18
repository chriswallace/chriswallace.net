<!DOCTYPE html>
<html lang="en">
  {% include head.md %}
  <body>
    <div class="mx-6 lg:px-0">
      {% include header.md %}
      <div class="container-lg fade-in-element">
        {{ content }}
      </div>
      {% include footer.md %}
    </div>
  </body>
</html>
