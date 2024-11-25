{% if jekyll.environment == 'production' %}

<script src="/assets/js/concatenated.min.js?v={{ site.version }}" expires="31536000"></script>

{% else %}

<script src="/assets/js/navigation.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/animations.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/image-lazyloader.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/zoomable.js?v={{ site.version }}" expires="31536000"></script>

{% endif %}

<script src="https://cdn.jsdelivr.net/npm/gsap@3.3.3/dist/gsap.min.js"></script>
<script src="https://unpkg.com/splitting/dist/splitting.min.js"></script>
