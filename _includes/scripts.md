{% if jekyll.environment == 'production' %}

<script src="/assets/js/concatenated.min.js?v={{ site.version }}"></script>

{% else %}

<script src="/assets/js/navigation.js?v={{ site.version }}"></script>
<script src="/assets/js/animations.js?v={{ site.version }}"></script>
<script src="https://cdn.jsdelivr.net/npm/gl-matrix@3.4.3/gl-matrix-min.js"></script>
<script type="module" src="/assets/js/visualization.js?v={{ site.version }}"></script>
<script src="/assets/js/image-lazyloader.js?v={{ site.version }}"></script>
<script src="/assets/js/zoomable.js?v={{ site.version }}"></script>

{% endif %}
