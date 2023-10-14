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
  <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
  </body>
</html>
