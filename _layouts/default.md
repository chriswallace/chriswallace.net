<!DOCTYPE html>
<html lang="en">
  {% include head.md %}
  <body>
    <div class="mx-4 lg:px-0">
      {% include header.md %}
      <div class="container mx-auto">
        {{ content }}
      </div>
      {% include footer.md %}
    </div>
  </body>
</html>
