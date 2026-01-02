<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.8.0/webcomponents-loader.js"></script>

{% if jekyll.environment == 'production' %}

<script src="/assets/js/concatenated.min.js?v={{ site.version }}" expires="31536000"></script>

<script>function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
o.onload=function(){window.trackingFunctions.onLoad({appId:"69581acfac22e60015b8fbf2"})},
document.head.appendChild(o)}initApollo();</script>
<script>(function initApolloInbound(){var TIMEOUT_MS=15000;var timeoutId;var style=document.createElement('style');style.id='apollo-form-prehide-css';style.textContent='form:has(input[type="email" i]),form:has(input[name="email" i]),.hs-form-iframe{position:relative!important}form:has(input[type="email" i])::before,form:has(input[name="email" i])::before,.hs-form-iframe::before{content:"";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;width:50px;height:50px;margin:auto;border:2.5px solid #e1e1e1;border-top:2.5px solid #9ea3a6;border-radius:50%;animation:spin 1s linear infinite;background-color:transparent;pointer-events:auto;z-index:999999;opacity:1}form:has(input[type="email" i]) *,form:has(input[name="email" i]) *,.hs-form-iframe *{opacity:0!important;user-select:none!important;pointer-events:none!important}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}';(document.head || document.documentElement).appendChild(style);function cleanup(){var styleEl=document.getElementById('apollo-form-prehide-css');if(styleEl)styleEl.remove();if(timeoutId)clearTimeout(timeoutId);}timeoutId=setTimeout(function(){console.warn('[Apollo] Form enrichment timeout after 5s - revealing forms. Check network and console for errors.');cleanup();},TIMEOUT_MS);var nocache=Math.random().toString(36).substring(7);var script=document.createElement('script');script.src='https://assets.apollo.io/js/apollo-inbound.js?nocache=' + nocache;script.defer=true;script.onerror=function(){console.error('[Apollo] Failed to load form enrichment script');cleanup();};script.onload=function(){try{window.ApolloInbound.formEnrichment.init({appId: '69583f8489bd7f0011d66fc7',onReady: function(){cleanup();},onError: function(err){console.error('[Apollo] Form enrichment init error:',err);cleanup();}});}catch(err){console.error('[Apollo] Error initializing form enrichment:',err);cleanup();}};document.head.appendChild(script);})();</script>

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
