<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.8.0/webcomponents-loader.js"></script>

{% if jekyll.environment == 'production' %}

<script src="/assets/js/concatenated.min.js?v={{ site.version }}" expires="31536000"></script>

<script>function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
o.onload=function(){window.trackingFunctions.onLoad({appId:"69581acfac22e60015b8fbf2"})},
document.head.appendChild(o)}initApollo();</script>

{% else %}

<script src="/assets/js/navigation.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/homepage.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/animations.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/card-flip.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/card.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/video-player.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/image-lazyloader.js?v={{ site.version }}" expires="31536000"></script>
<script src="/assets/js/zoomable.js?v={{ site.version }}" expires="31536000"></script>

{% endif %}
