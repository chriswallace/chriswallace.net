{% if jekyll.environment == 'production' %}

<script src="/assets/js/concatenated.min.js?v={{ site.version }}" expires="31536000"></script>

{% else %}

<script src="/assets/js/navigation.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/animations.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/image-lazyloader.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/zoomable.js?v={{ site.version }}" expires="31536000"></script>

{% endif %}
