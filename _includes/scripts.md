<div id="chat-container" class="hidden speech-bubble">
    <input type="text" id="chat-input" maxlength="40" autocomplete="nope" />
    <div id="hidden-div"></div>
    <div id="messages"></div>
</div>

<script type="module" src="https://cdn.skypack.dev/emoji-picker-element"></script>
<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>

{% if jekyll.environment == 'production' %}
    <script src="/assets/js/concatenated.min.js?v={{ site.version }}"></script>
{% else %}
    <script src="/assets/js/navigation.js?v={{ site.version }}"></script>
    <script src="/assets/js/bg-switch.js?v={{ site.version }}"></script>
    <script src="/assets/js/animations.js?v={{ site.version }}"></script>
    <script src="/assets/js/emoji-funtime.js?v={{ site.version }}"></script>
    <script src="/assets/js/image-lazyloader.js?v={{ site.version }}"></script>
{% endif %}