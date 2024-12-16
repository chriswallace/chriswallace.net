---
layout: interplay
title: Interplay
permalink: /art/interplay/
description: Explore the Interplay algorithm, a generative Javascript-based algorithm written by myself and GPT-4.
---

<div class="content-container">
    <div id="interplayArtwork" class="interplay-grid">
        <div>
            <a href="/art" class="back fade-in-element">/art</a>
            <h1 class="primary-heading-no-slash fade-in-element">Interplay</h1>
            <p class="mb-4 fade-in-element">Explore the Interplay algorithm, a generative Javascript-based algorithm written by myself and GPT-4. This artwork begs the question: does AI-assisted art mean anything? Is it another tool of human expression or merely soulless aesthetically-pleasing eye candy?</p>
            <p id="metadata" class="fade-in-element"></p>
            <p id="hash" class="text-sm text-ellipsis overflow-hidden whitespace-nowrap w-[320px] md:w-full fade-in-element"></p>
            <p><button id="refresh-btn" class="button fade-in-element"><i><svg id="refresh" width="20" height="20" data-name="refresh" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16"><defs>
            </defs><path class="cls-1" d="m17,4l3,4h-2c0,4.42-3.58,8-8,8-1.92,0-3.69-.68-4.98-1.88l1.19-1.54c1,.9,2.33,1.42,3.79,1.42,3.31,0,6-2.69,6-6h-2l3-4h0ZM3.12,11.84h0s-.12.16-.12.16L0,8h2C2,3.58,5.58,0,10,0c1.92,0,3.69.68,4.98,1.88l-1.19,1.54c-1-.9-2.33-1.42-3.79-1.42-3.23,0-5.87,2.55-6,6h2l-1.58,2.1h0l-1.31,1.74h0Z"/></svg></i> Refresh
            </button></p>
        </div>
        <div id="bgSwitch" class="pt-12">
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
</div>

<script src="/assets/js/fxhash.min.js"></script>
<script src="/assets/js/interplay-page.min.js?v={{ site.version }}"></script>
<script defer src="/assets/js/bundle.js?v={{ site.version }}"></script>
