---
layout: interplay
title: Interplay
permalink: /art/interplay
---

<article>
    <div class="grid md:grid-cols-2 gap-8">
        <div>
            <a href="/art" class="back-btn fade-in-element">/art</a>
            <h1 class="fade-in-element">Interplay</h1>
            <p class="mb-4 fade-in-element">Explore the Interplay algorithm, a generative Javascript-based algorithm written by myself and GPT-4. This artwork begs the question: does AI-assisted art mean anything? Is it another tool of human expression or merely soulless aesthetically-pleasing eye candy?</p>
            <p id="metadata" class="fade-in-element"></p>
            <p id="hash" class="text-sm text-ellipsis overflow-hidden whitespace-nowrap w-[320px] md:w-full fade-in-element"></p>
            <p><button id="refresh-btn" class="refresh-btn fade-in-element"><svg id="refresh" class="inline w-[16px] h-[16px] align-middle -t-1 mr-1 relative" data-name="refresh" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16"><defs><style>.cls-1 { fill-rule: evenodd; stroke-width: 0px;}</style>
            </defs><path class="cls-1" d="m17,4l3,4h-2c0,4.42-3.58,8-8,8-1.92,0-3.69-.68-4.98-1.88l1.19-1.54c1,.9,2.33,1.42,3.79,1.42,3.31,0,6-2.69,6-6h-2l3-4h0ZM3.12,11.84h0s-.12.16-.12.16L0,8h2C2,3.58,5.58,0,10,0c1.92,0,3.69.68,4.98,1.88l-1.19,1.54c-1-.9-2.33-1.42-3.79-1.42-3.23,0-5.87,2.55-6,6h2l-1.58,2.1h0l-1.31,1.74h0Z"/></svg> Refresh
            </button></p>
        </div>
        <div>
            <div class="mb-0 md:mb-12 text-center mx-auto o-hidden relative fade-in-element">
                <canvas id="artCanvas" width="1240" height="1754" class="w-auto max-w-full mx-auto"></canvas>
                <div
                    id="loadingBar"
                    style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 20%;
                    height: 10px;
                    background: black;
                    display: flex;
                    "
                >
                <div
                    id="loadingBarProgress"
                    style="width: 0%; height: 100%; background: white"
                    class="t-[50%]"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</article>

<script>
window.onload = function(){
    const hashContainer = document.getElementById('hash');
    if( $fx && $fx.hash ){
        hashContainer.innerHTML = "Hash: " + $fx.hash;
    }

    const refreshBtn = document.getElementById('refresh-btn');

    refreshBtn.addEventListener("click", function(e){
        location.reload();
    });

    let output = '';
for (let [key, value] of Object.entries($fx._features)) {
  output += `<strong>${key}:</strong> ${value}<br>`;
}
document.getElementById('metadata').innerHTML = output;
}
</script>
