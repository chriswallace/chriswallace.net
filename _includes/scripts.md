{% if jekyll.environment == 'production' %}

<script src="/assets/js/concatenated.min.js?v={{ site.version }}"></script>

{% else %}

<script src="/assets/js/navigation.js?v={{ site.version }}"></script>
<script src="/assets/js/animations.js?v={{ site.version }}"></script>
<script src="/assets/js/image-lazyloader.js?v={{ site.version }}"></script>
<script src="/assets/js/zoomable.js?v={{ site.version }}"></script>

{% endif %}
