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
    <div id="chat-container" class="hidden speech-bubble">
      <input type="text" id="chat-input" maxlength="30" autocomplete="off" />
      <div id="hidden-div"></div>
      <div id="messages"></div>
    </div>
    <script type="module">
    import 'https://cdn.skypack.dev/emoji-picker-element';
    </script>
    <script src="/assets/js/animations.js"></script>
    <script src="/assets/js/emoji-funtime.js?v=0.11"></script>
    <script src="/assets/js/image-lazyloader.js"></script>
    <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
  </body>
</html>