---
layout: default
title: The Wallace Collection
description: A selection of generative artworks currently held in my family's private collection on the Tezos and Ethereum blockchains. These code-powered works are represented mostly in static images, however some pieces are live code to attempt a faithful reproduction of the intended artistic output where possible.
permalink: /art/collection/
---

<script>
    function webglSupport() {
        try {
            var canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }
    function isMobile() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }
    document.addEventListener('DOMContentLoaded', () => {
        // Select all images on the page
        const images = document.querySelectorAll('img');

        // Create a tooltip element
        const tooltip = document.createElement('div');
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = 'black';
        tooltip.style.color = 'white';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.display = 'none';
        tooltip.style.zIndex = '9999';
        document.body.appendChild(tooltip);

        // Attach event listeners to each image
        images.forEach((img) => {
            img.addEventListener('mouseover', function (event) {
                const altText = this.getAttribute('alt');
                if (altText) {
                    tooltip.textContent = altText;
                    tooltip.style.display = 'block';
                }
            });

            img.addEventListener('mousemove', function (event) {
                tooltip.style.left = event.pageX + 10 + 'px';
                tooltip.style.top = event.pageY + 10 + 'px';
            });

            img.addEventListener('mouseout', function () {
                tooltip.style.display = 'none';
            });
        });

        if (!isMobile() && webglSupport()) {
            let iframes = document.getElementsByClassName('live-code');
            Array.from(iframes).forEach((iframe) => {
                let dataSrc = iframe.getAttribute('data-src');
                if (dataSrc) {
                    iframe.src = dataSrc;
                }
            });
        }
    });
</script>
<article>
    <a class="back-btn" href="/art">
        Art
    </a>
    <h1>
        The Wallace Collection
    </h1>
    <p class="sub-heading">
        A selection of generative artworks currently held in my family's private collection on the Tezos and Ethereum
        blockchains. These code-powered works are represented mostly in static images, however some pieces are live code
        to attempt a faithful reproduction of the intended artistic output where possible.
    </p>
    <hr />
    <div>
        <div>
            <h3 class="collection-title">
                Manolo Gamboa Naon
            </h3>
            <div class="gallery-row gallery-flex">
                <div style="flex: 1;">
                    <img alt="Tempo de Amor" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/tempo_de_amor.jpg?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/tempo_de_amor.jpg?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/tempo_de_amor.jpg?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/tempo_de_amor.jpg?tr=w-800,q-70 800w" />
                </div>
                <div style="flex: 1;">
                    <img alt="en llamas" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/en_llamas.jpg?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/en_llamas.jpg?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/en_llamas.jpg?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/en_llamas.jpg?tr=w-800,q-70 800w" />
                </div>
                <div style="flex: 1.50146628;">
                    <img alt="furia" class="sc-a7460964-0 flHabD" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/furia.jpg?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/furia.jpg?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/furia.jpg?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/furia.jpg?tr=w-800,q-70 800w" />
                </div>
            </div>
        </div>
        <div class="gallery-row gallery-double-wide">
            <div>
                <h3 class="collection-title">
                    Reticulum by Harvey Rayner
                </h3>
                <img alt="Reticulum by Harvey Rayner" loading="lazy"
                    sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/reticulum_by_harvey_rayner.jpg?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/reticulum_by_harvey_rayner.jpg?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/reticulum_by_harvey_rayner.jpg?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/reticulum_by_harvey_rayner.jpg?tr=w-800,q-70 800w" />
            </div>
            <div>
                <h3 class="collection-title">
                    Dragons #489 by William Mapan
                </h3>
                <img alt="Dragons #489" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/dragons_489.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/dragons_489.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/dragons_489.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/dragons_489.png?tr=w-800,q-70 800w" />
            </div>
        </div>
        <div class="gallery-row gallery-double-wide">
            <div>
                <h3 class="collection-title">
                    QQL #94 by Tyler Hobbs and Dandelion Wist
                </h3>
                <img alt="QQL #94" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/qql_94.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/qql_94.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/qql_94.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/qql_94.png?tr=w-800,q-70 800w" />
            </div>
            <div>
                <h3 class="collection-title">
                    Acequia #219 by Rich Poole and Rick Crane
                </h3>
                <img alt="Acequia #219" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/acequia_219.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/acequia_219.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/acequia_219.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/acequia_219.png?tr=w-800,q-70 800w" />
            </div>
        </div>
        <div class="gallery-row sm:flex gap-2 sm:gap-4 mb-12 sm:mb-24">
            <div class="mb-12 sm:mb-0" style="flex: 1.77774687;">
                <h3 class="collection-title">
                    kaiC by p1xelfool
                </h3>
                <img _ngcontent-vdp-c97="" alt="kaiC" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/kaic.gif?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/kaic.gif?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/kaic.gif?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/kaic.gif?tr=w-800,q-70 800w" />
            </div>
            <div style="flex:1;">
                <h3 class="collection-title">
                    8 18 54 51 by Kim Asendorf
                </h3>
                <img alt="8 18 54 51" class="w-full h-auto" loading="lazy"
                    sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/8_18_54_51.gif?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/8_18_54_51.gif?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/8_18_54_51.gif?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/8_18_54_51.gif?tr=w-800,q-70 800w" />
            </div>
        </div>
        <div>
            <h3 class="collection-title">
                Quasi Dragon Studies by Harvey Rayner
            </h3>
            <div class="gallery-row gallery-flex">
                <div style="flex: 0.8661133;">
                    <img alt="Quasi Dragon Studies #252" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/quasi_dragon_studies_252.png?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/quasi_dragon_studies_252.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/quasi_dragon_studies_252.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/quasi_dragon_studies_252.png?tr=w-800,q-70 800w" />
                </div>
                <div style="flex: 0.2886666;">
                    <img alt="Quasi Dragon Studies #255" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/quasi_dragon_studies_255.png?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/quasi_dragon_studies_255.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/quasi_dragon_studies_255.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/quasi_dragon_studies_255.png?tr=w-800,q-70 800w" />
                </div>
                <div style="flex: 0.2886666;">
                    <img alt="Quasi Dragon Studies #254" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/quasi_dragon_studies_254.png?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/quasi_dragon_studies_254.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/quasi_dragon_studies_254.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/quasi_dragon_studies_254.png?tr=w-800,q-70 800w" />
                </div>
            </div>
        </div>
        <h3 class="collection-title">
            Michaël Zancan
        </h3>
        <div class="gallery-row gallery-double-wide">
            <img alt="Garden, Monoliths #125" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/garden_monoliths_125.jpg?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/garden_monoliths_125.jpg?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/garden_monoliths_125.jpg?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/garden_monoliths_125.jpg?tr=w-800,q-70 800w" />
            <img alt="(kinder)Garden, Monuments #23" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/_kinder_garden_monuments_23.jpg?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/_kinder_garden_monuments_23.jpg?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/_kinder_garden_monuments_23.jpg?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/_kinder_garden_monuments_23.jpg?tr=w-800,q-70 800w" />
            <img alt="A Bugged Forest #169" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/a_bugged_forest_169.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/a_bugged_forest_169.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/a_bugged_forest_169.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/a_bugged_forest_169.png?tr=w-800,q-70 800w" />
            <img alt="Everything, made simple" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/everything_made_simple.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/everything_made_simple.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/everything_made_simple.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/everything_made_simple.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Piter Pasma
        </h3>
        <div class="gallery-row gallery-double-wide">
            <img alt="Chaos Candy Plasma Vent" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/chaos_candy_plasma_vent.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/chaos_candy_plasma_vent.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/chaos_candy_plasma_vent.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/chaos_candy_plasma_vent.png?tr=w-800,q-70 800w" />
            <img alt="Neutron amusement park" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/neutron_amusement_park.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/neutron_amusement_park.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/neutron_amusement_park.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/neutron_amusement_park.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Contrapuntos by Marcelo Soria-Rodríguez
        </h3>
        <div class="gallery-row gallery-triple-wide">
            <img alt="contrapuntos #364" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/contrapuntos_364.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/contrapuntos_364.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/contrapuntos_364.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/contrapuntos_364.png?tr=w-800,q-70 800w" />
            <img alt="contrapuntos #500" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/contrapuntos_500.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/contrapuntos_500.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/contrapuntos_500.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/contrapuntos_500.png?tr=w-800,q-70 800w" />
            <img alt="contrapuntos #367" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/contrapuntos_367.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/contrapuntos_367.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/contrapuntos_367.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/contrapuntos_367.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Bravura by dmarchi
        </h3>
        <div class="gallery-row gallery-triple-wide">
            <img alt="Bravura #90" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/bravura_90.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/bravura_90.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/bravura_90.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/bravura_90.png?tr=w-800,q-70 800w" />
            <img alt="Bravura #82" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/bravura_82.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/bravura_82.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/bravura_82.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/bravura_82.png?tr=w-800,q-70 800w" />
            <img alt="Bravura #81" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/bravura_81.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/bravura_81.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/bravura_81.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/bravura_81.png?tr=w-800,q-70 800w" />
        </div>
        <div class="sm:block hidden">
            <h3 class="collection-title">
                Gerhard and Richter by Richard Nadler and Leander Herzog
            </h3>
            <div class="gallery-row gallery-double-wide">
                <iframe allow="accelerometer *; camera *; gyroscope *; microphone *; xr-spatial-tracking *;"
                    class="aspect-square w-full live-code"
                    data-src="https://gateway.fxhash2.xyz/ipfs/QmW7Cj5QMG2FFVGMcRKGFhW4V1113seN6iX5FwQrKqTHSM/?fxhash=oo3iCxnjsGQU6Jx4xZpf4Zfc3EPoXWkYhsqXTyGwnGQQKWUjrDB&amp;fxiteration=368&amp;fxminter=tz1Yw6YSydH7qb4vERwxAmSnsihfRcVvnLL3"
                    sandbox="allow-scripts allow-same-origin allow-modals">
                </iframe>
                <iframe allow="accelerometer *; camera *; gyroscope *; microphone *; xr-spatial-tracking *;"
                    class="aspect-square w-full live-code"
                    data-src="https://gateway.fxhash2.xyz/ipfs/QmQzbsQM9hd6vc821LmpHCkLXv18fZfhbJf6ygyVhqWB5a/?fxhash=opQ7z15XLoNzWauyGgashqrsyB6zenAjUHpPBAsvMe6dknwj4JQ&amp;fxiteration=399&amp;fxminter=tz1Ym9Ued9v2N2wwsrtQ52HRGGn7qDmzuUZU"
                    sandbox="allow-scripts allow-same-origin allow-modals">
                </iframe>
            </div>
        </div>
        <h3 class="collection-title">
            Entretiempos by Marcelo Soria-Rodríguez
        </h3>
        <div class="gallery-row gallery-quadruple-wide">
            <img alt="entretiempos #865" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/entretiempos_865.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/entretiempos_865.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/entretiempos_865.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/entretiempos_865.png?tr=w-800,q-70 800w" />
            <img alt="entretiempos #690" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/entretiempos_690.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/entretiempos_690.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/entretiempos_690.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/entretiempos_690.png?tr=w-800,q-70 800w" />
            <img alt="entretiempos #654" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/entretiempos_654.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/entretiempos_654.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/entretiempos_654.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/entretiempos_654.png?tr=w-800,q-70 800w" />
            <img alt="entretiempos #453" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/entretiempos_453.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/entretiempos_453.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/entretiempos_453.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/entretiempos_453.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Escape by Iskra Velitchkova
        </h3>
        <div class="gallery-row gallery-double-wide">
            <img alt="Escape #255" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/escape_255.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/escape_255.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/escape_255.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/escape_255.png?tr=w-800,q-70 800w" />
            <img alt="Escape #145" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/escape_145.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/escape_145.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/escape_145.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/escape_145.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Helena Sarin
        </h3>
        <div class="gallery-row gallery-quadruple-wide">
            <div class="sm:col-span-2">
                <img alt="Cats of Latentscaux" loading="lazy"
                    sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/cats_of_latentscaux.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/cats_of_latentscaux.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/cats_of_latentscaux.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/cats_of_latentscaux.png?tr=w-800,q-70 800w" />
            </div>
            <div class="sm:col-span-2">
                <img alt="Ping Pong, the Isolation Games" loading="lazy"
                    sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/ping_pong_the_isolation_games.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/ping_pong_the_isolation_games.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/ping_pong_the_isolation_games.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/ping_pong_the_isolation_games.png?tr=w-800,q-70 800w" />
            </div>
            <img alt="Inceptio Levis" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/inceptio_levis.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/inceptio_levis.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/inceptio_levis.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/inceptio_levis.png?tr=w-800,q-70 800w" />
            <img alt="Stipula Praecox" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/stipula_praecox.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/stipula_praecox.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/stipula_praecox.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/stipula_praecox.png?tr=w-800,q-70 800w" />
            <img alt="Susurro Lenis" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/susurro_lenis.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/susurro_lenis.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/susurro_lenis.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/susurro_lenis.png?tr=w-800,q-70 800w" />
            <img alt="Rusticus Romaineus" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/rusticus_romaineus.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/rusticus_romaineus.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/rusticus_romaineus.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/rusticus_romaineus.png?tr=w-800,q-70 800w" />
        </div>
        <div>
            <h3 class="collection-title">
                Iskra Velitchkova
            </h3>
            <div class="gallery-row gallery-flex sm:mb-4">
                <div style="flex: 1;">
                    <img alt="🐥🪱 - A bird as if a worm as a bird as a worm | for Bird and Worm Society"
                        class="sc-a7460964-0 flHabD" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/_a_bird_as_if_a_worm_as_a_bird_as_a_worm_for_bird_and_worm_society.png?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/_a_bird_as_if_a_worm_as_a_bird_as_a_worm_for_bird_and_worm_society.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/_a_bird_as_if_a_worm_as_a_bird_as_a_worm_for_bird_and_worm_society.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/_a_bird_as_if_a_worm_as_a_bird_as_a_worm_for_bird_and_worm_society.png?tr=w-800,q-70 800w" />
                </div>
                <div style="flex:1.10583153;">
                    <img alt="The very first B I R D S " class="sc-a7460964-0 flHabD" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/the_very_first_b_i_r_d_s_.png?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/the_very_first_b_i_r_d_s_.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/the_very_first_b_i_r_d_s_.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/the_very_first_b_i_r_d_s_.png?tr=w-800,q-70 800w" />
                </div>
                <div style="flex:0.726756565;">
                    <img alt="H20thB" class="sc-a7460964-0 flHabD" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/h20thb.png?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/h20thb.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/h20thb.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/h20thb.png?tr=w-800,q-70 800w" />
                </div>
            </div>
            <div class="gallery-row gallery-flex sm:mb-4">
                <div style="flex: 1;">
                    <img alt="GenerativO Sov I" class="sc-a7460964-0 flHabD" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/generativo_sov_iii.png?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/generativo_sov_iii.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/generativo_sov_iii.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/generativo_sov_iii.png?tr=w-800,q-70 800w" />
                </div>
                <div style="flex: 1;">
                    <img alt="GenerativO Sov III" class="sc-a7460964-0 flHabD" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/generativo_sov_iii.png?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/generativo_sov_iii.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/generativo_sov_iii.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/generativo_sov_iii.png?tr=w-800,q-70 800w" />
                </div>
            </div>
            <div class="gallery-row gallery-flex">
                <div style="flex: 1;">
                    <img alt="Hypothetically Micro #83" class="sc-a7460964-0 flHabD" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/hypothetically_micro_83.jpg?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/hypothetically_micro_83.jpg?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/hypothetically_micro_83.jpg?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/hypothetically_micro_83.jpg?tr=w-800,q-70 800w" />
                </div>
                <div style="flex:2.01972387;">
                    <img alt="BOSKË" class="sc-a7460964-0 flHabD" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/boske%CC%88.png?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/boske%CC%88.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/boske%CC%88.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/boske%CC%88.png?tr=w-800,q-70 800w" />
                </div>
            </div>
        </div>
        <div>
            <h3 class="collection-title">
                Qubibi
            </h3>
            <div class="gallery-row gallery-flex mb-0 sm:mb-4">
                <div style="flex: 1;">
                    <img alt="MMZ ERRR 3 B" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/mmz_errr_3_b.gif?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/mmz_errr_3_b.gif?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_errr_3_b.gif?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_errr_3_b.gif?tr=w-800,q-70 800w" />
                </div>
                <div style="flex: 1;">
                    <img alt="230907s01cBp30003000" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/230907s01cbp30003000.png?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/230907s01cbp30003000.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/230907s01cbp30003000.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/230907s01cbp30003000.png?tr=w-800,q-70 800w" />
                </div>
            </div>
            <div class="gallery-row gallery-flex mb-0 sm:mb-4">
                <div style="flex: 0.4;">
                    <img alt="MMZ 197 G" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/mmz_197_g.png?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/mmz_197_g.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_197_g.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_197_g.png?tr=w-800,q-70 800w" />
                </div>
                <div style="flex: 0.5;">
                    <img alt="wwz uu15M7kj722Ho #51" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/wwz_uu15m7kj722ho_51.png?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/wwz_uu15m7kj722ho_51.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/wwz_uu15m7kj722ho_51.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/wwz_uu15m7kj722ho_51.png?tr=w-800,q-70 800w" />
                </div>
                <div style="flex: 0.710617627;">
                    <img alt="MMZ 188 D" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/mmz_188_d.png?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/mmz_188_d.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_188_d.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_188_d.png?tr=w-800,q-70 800w" />
                </div>
            </div>
            <div class="gallery-row gallery-quadruple-wide">
                <img alt="230830s19pQh37003700" class="sm:col-span-2" loading="lazy"
                    sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/230830s19pqh37003700.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/230830s19pqh37003700.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/230830s19pqh37003700.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/230830s19pqh37003700.png?tr=w-800,q-70 800w" />
                <img alt="220831k03zWf35003500" class="sm:col-span-2" loading="lazy"
                    sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/220831k03zwf35003500.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/220831k03zwf35003500.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/220831k03zwf35003500.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/220831k03zwf35003500.png?tr=w-800,q-70 800w" />
                <img alt="MMZ 204 B" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/mmz_204_b.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/mmz_204_b.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_204_b.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_204_b.png?tr=w-800,q-70 800w" />
                <img alt="MMZ 47" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/mmz_47.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/mmz_47.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_47.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_47.png?tr=w-800,q-70 800w" />
                <img alt="MMZ 207 B" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/mmz_207_b.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/mmz_207_b.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_207_b.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_207_b.png?tr=w-800,q-70 800w" />
                <img alt="MMZ 207 D" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/mmz_207_d.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/mmz_207_d.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_207_d.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_207_d.png?tr=w-800,q-70 800w" />
                <img alt="MMZ 64" class="sm:col-span-2" loading="lazy"
                    sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/mmz_64.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/mmz_64.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_64.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_64.png?tr=w-800,q-70 800w" />
                <img alt="MMZ 181 A" class="sm:col-span-2" loading="lazy"
                    sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/mmz_181_a.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/mmz_181_a.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_181_a.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/mmz_181_a.png?tr=w-800,q-70 800w" />
            </div>
        </div>
        <h3 class="collection-title">
            Olivier Bodini
        </h3>
        <div class="gallery-row gallery-double-wide">
            <img alt="The sky is so colorful tonight" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/the_sky_is_so_colorful_tonight.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/the_sky_is_so_colorful_tonight.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/the_sky_is_so_colorful_tonight.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/the_sky_is_so_colorful_tonight.png?tr=w-800,q-70 800w" />
            <img alt="A black sun over the war by Olivier Bodini" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/a_black_sun_over_the_war_by_olivier_bodini.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/a_black_sun_over_the_war_by_olivier_bodini.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/a_black_sun_over_the_war_by_olivier_bodini.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/a_black_sun_over_the_war_by_olivier_bodini.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Loom by Andreas Rau
        </h3>
        <div class="gallery-row gallery-quadruple-wide-trip-small">
            <img alt="Loom #389" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/loom_389.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/loom_389.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_389.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_389.png?tr=w-800,q-70 800w" />
            <img alt="Loom #405" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/loom_405.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/loom_405.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_405.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_405.png?tr=w-800,q-70 800w" />
            <img alt="Loom #412" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/loom_412.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/loom_412.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_412.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_412.png?tr=w-800,q-70 800w" />
            <img alt="Loom #421" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/loom_421.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/loom_421.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_421.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_421.png?tr=w-800,q-70 800w" />
            <img alt="Loom #201" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/loom_201.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/loom_201.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_201.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_201.png?tr=w-800,q-70 800w" />
            <img alt="Loom #404" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/loom_404.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/loom_404.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_404.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_404.png?tr=w-800,q-70 800w" />
            <img alt="Loom #409" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/loom_409.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/loom_409.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_409.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_409.png?tr=w-800,q-70 800w" />
            <img alt="Loom #232" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/loom_232.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/loom_232.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_232.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_232.png?tr=w-800,q-70 800w" />
            <img alt="Loom #414" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/loom_414.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/loom_414.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_414.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_414.png?tr=w-800,q-70 800w" />
            <img alt="Loom #113" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/loom_113.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/loom_113.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_113.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_113.png?tr=w-800,q-70 800w" />
            <img alt="Loom #163" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/loom_163.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/loom_163.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_163.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_163.png?tr=w-800,q-70 800w" />
            <img alt="Loom #424" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/loom_424.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/loom_424.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_424.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/loom_424.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Unfolded by Lars Wander
        </h3>
        <div class="gallery-row gallery-six-wide">
            <div class="col-span-3">
                <img alt="Unfolded #3" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/unfolded_3.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/unfolded_3.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unfolded_3.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unfolded_3.png?tr=w-800,q-70 800w" />
            </div>
            <div class="col-span-3">
                <img alt="Unfolded #20" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/unfolded_20.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/unfolded_20.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unfolded_20.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unfolded_20.png?tr=w-800,q-70 800w" />
            </div>
            <img alt="Unfolded #74" class="col-span-2" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/unfolded_74.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/unfolded_74.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unfolded_74.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unfolded_74.png?tr=w-800,q-70 800w" />
            <img alt="Unfolded #52" class="col-span-2" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/unfolded_52.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/unfolded_52.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unfolded_52.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unfolded_52.png?tr=w-800,q-70 800w" />
            <img alt="Unfolded #5" class="col-span-2" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/unfolded_52.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/unfolded_52.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unfolded_52.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unfolded_52.png?tr=w-800,q-70 800w" />
        </div>
        <div class="gallery-row sm:flex gap-2 sm:gap-4 mb-12 sm:mb-24">
            <div class="mb-12 sm:mb-0" style="flex: 1;">
                <h3 class="collection-title">
                    Acoustic Drift by Joshua Bagley
                </h3>
                <img alt="Acoustic Drift" loading="lazy"
                    sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/acoustic_drift.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/acoustic_drift.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/acoustic_drift.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/acoustic_drift.png?tr=w-800,q-70 800w" />
            </div>
            <div class="mb-12 sm:mb-0" style="flex: 1;">
                <h3 class="collection-title">
                    Fold #223 by rudxane
                </h3>
                <img alt="Fold #223" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/fold_223.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/fold_223.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/fold_223.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/fold_223.png?tr=w-800,q-70 800w" />
            </div>
            <div class="mb-12 sm:mb-0" style="flex: 1;">
                <h3 class="collection-title">
                    Diverse Mix by Thomas Lin Pedersen
                </h3>
                <img alt="Diverse Mix" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/diverse_mix.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/diverse_mix.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/diverse_mix.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/diverse_mix.png?tr=w-800,q-70 800w" />
            </div>
        </div>
        <h3 class="collection-title">
            Elefante by Michael Connolly
        </h3>
        <div class="gallery-row gallery-triple-wide">
            <img alt="Elefante #60" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/elefante_60.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/elefante_60.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/elefante_60.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/elefante_60.png?tr=w-800,q-70 800w" />
            <img alt="Elefante #53" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/elefante_53.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/elefante_53.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/elefante_53.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/elefante_53.png?tr=w-800,q-70 800w" />
            <img alt="Elefante #16" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/elefante_16.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/elefante_16.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/elefante_16.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/elefante_16.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Zbageti by Melissa Wiederrecht
        </h3>
        <div class="gallery-row gallery-triple-wide">
            <img alt="Zbageti #79" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/zbageti_79.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/zbageti_79.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/zbageti_79.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/zbageti_79.png?tr=w-800,q-70 800w" />
            <img alt="Zbageti #73" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/zbageti_73.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/zbageti_73.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/zbageti_73.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/zbageti_73.png?tr=w-800,q-70 800w" />
            <img alt="Zbageti #53" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/zbageti_53.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/zbageti_53.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/zbageti_53.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/zbageti_53.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Shapes on a Plane by Mount Vitruvius
        </h3>
        <div class="gallery-row gallery-triple-wide">
            <img alt="Shapes on a Plane #455" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/shapes_on_a_plane_455.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/shapes_on_a_plane_455.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/shapes_on_a_plane_455.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/shapes_on_a_plane_455.png?tr=w-800,q-70 800w" />
            <img alt="Shapes on a Plane #314" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/shapes_on_a_plane_314.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/shapes_on_a_plane_314.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/shapes_on_a_plane_314.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/shapes_on_a_plane_314.png?tr=w-800,q-70 800w" />
            <img alt="Shapes on a Plane #466" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/shapes_on_a_plane_466.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/shapes_on_a_plane_466.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/shapes_on_a_plane_466.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/shapes_on_a_plane_466.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Obscured by Nadieh Bremer
        </h3>
        <div class="gallery-row gallery-triple-wide">
            <img alt="Obscured 02f0" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/obscured_02f0.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/obscured_02f0.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/obscured_02f0.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/obscured_02f0.png?tr=w-800,q-70 800w" />
            <img alt="Obscured 3d53" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/obscured_3d53.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/obscured_3d53.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/obscured_3d53.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/obscured_3d53.png?tr=w-800,q-70 800w" />
            <img alt="Obscured 43f3" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/obscured_43f3.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/obscured_43f3.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/obscured_43f3.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/obscured_43f3.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Deconstructions by DistCollective
        </h3>
        <div class="gallery-row gallery-triple-wide">
            <img alt="Deconstructions #43" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/deconstructions_43.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/deconstructions_43.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/deconstructions_43.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/deconstructions_43.png?tr=w-800,q-70 800w" />
            <img alt="Deconstructions #217" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/deconstructions_217.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/deconstructions_217.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/deconstructions_217.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/deconstructions_217.png?tr=w-800,q-70 800w" />
            <img alt="Deconstructions #224" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/deconstructions_224.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/deconstructions_224.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/deconstructions_224.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/deconstructions_224.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Chepertom
        </h3>
        <div class="gallery-row gallery-triple-wide">
            <img alt="Circuit_Bending_3.RAD" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/circuit_bending_3_rad.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/circuit_bending_3_rad.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/circuit_bending_3_rad.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/circuit_bending_3_rad.png?tr=w-800,q-70 800w" />
            <img alt="Purple.RAD" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/purple_rad.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/purple_rad.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/purple_rad.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/purple_rad.png?tr=w-800,q-70 800w" />
            <img alt="16.RAD" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/16_rad.jpg?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/16_rad.jpg?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/16_rad.jpg?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/16_rad.jpg?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Assembling Machine by Tyler Boswell
        </h3>
        <div class="gallery-row gallery-triple-wide">
            <img alt="ASSEMBLING MACHINE #243" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/assembling_machine_243.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/assembling_machine_243.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/assembling_machine_243.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/assembling_machine_243.png?tr=w-800,q-70 800w" />
            <img alt="ASSEMBLING MACHINE #134" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/assembling_machine_134.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/assembling_machine_134.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/assembling_machine_134.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/assembling_machine_134.png?tr=w-800,q-70 800w" />
            <img alt="ASSEMBLING MACHINE #76" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/assembling_machine_76.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/assembling_machine_76.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/assembling_machine_76.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/assembling_machine_76.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Impressions of Order by nbswwit
        </h3>
        <div class="gallery-row gallery-triple-wide">
            <img alt="Impressions of Order #79" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/impressions_of_order_79.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/impressions_of_order_79.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/impressions_of_order_79.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/impressions_of_order_79.png?tr=w-800,q-70 800w" />
            <img alt="Impressions of Order #113" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/impressions_of_order_113.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/impressions_of_order_113.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/impressions_of_order_113.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/impressions_of_order_113.png?tr=w-800,q-70 800w" />
            <img alt="Impressions of Order #215" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/impressions_of_order_215.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/impressions_of_order_215.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/impressions_of_order_215.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/impressions_of_order_215.png?tr=w-800,q-70 800w" />
        </div>
        <div class="gallery-row gallery-double-wide">
            <div>
                <h3 class="collection-title">
                    Crude Figures by Kjetil Golid
                </h3>
                <img alt="Crude Figures" loading="lazy"
                    sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/crude_figures.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/crude_figures.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/crude_figures.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/crude_figures.png?tr=w-800,q-70 800w" />
            </div>
            <div>
                <h3 class="collection-title">
                    STRINGS PROTOTYPE #13 by IX Shells
                </h3>
                <img alt="STRINGS PROTOTYPE :::..._ #13/20" loading="lazy"
                    sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/strings_prototype_13_20.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/strings_prototype_13_20.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/strings_prototype_13_20.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/strings_prototype_13_20.png?tr=w-800,q-70 800w" />
            </div>
        </div>
        <div class="gallery-row gallery-double-wide">
            <div>
                <h3 class="collection-title">
                    Nothing Remains #63 by Brendan Dawes
                </h3>
                <img alt="Nothing Remains #63" class="sc-a7460964-0 flHabD" loading="lazy"
                    sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/nothing_remains_63.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/nothing_remains_63.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/nothing_remains_63.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/nothing_remains_63.png?tr=w-800,q-70 800w" />
            </div>
            <div>
                <h3 class="collection-title">
                    Bardez #149 by Nat Sarkissian
                </h3>
                <img alt="Bardez #149" class="sc-a7460964-0 flHabD" loading="lazy"
                    sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/bardez_149.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/bardez_149.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/bardez_149.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/bardez_149.png?tr=w-800,q-70 800w" />
            </div>
        </div>
        <h3 class="collection-title">
            Microgravity by Ryan Bell
        </h3>
        <div class="gallery-row gallery-triple-wide">
            <img alt="Microgravity #268" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/microgravity_268.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/microgravity_268.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/microgravity_268.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/microgravity_268.png?tr=w-800,q-70 800w" />
            <img alt="Microgravity #531" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/microgravity_531.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/microgravity_531.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/microgravity_531.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/microgravity_531.png?tr=w-800,q-70 800w" />
            <img alt="Microgravity #713" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/microgravity_713.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/microgravity_713.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/microgravity_713.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/microgravity_713.png?tr=w-800,q-70 800w" />
            <img alt="Microgravity #1099" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/microgravity_1099.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/microgravity_1099.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/microgravity_1099.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/microgravity_1099.png?tr=w-800,q-70 800w" />
            <img alt="Microgravity #1214" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/microgravity_1214.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/microgravity_1214.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/microgravity_1214.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/microgravity_1214.png?tr=w-800,q-70 800w" />
            <img alt="Microgravity #360" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/microgravity_360.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/microgravity_360.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/microgravity_360.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/microgravity_360.png?tr=w-800,q-70 800w" />
        </div>
        <div class="gallery-row sm:flex gap-2 sm:gap-4 mb-12 sm:mb-24 sm:visible hidden">
            <div class="mb-12 sm:mb-0" style="flex:1;">
                <h3 class="collection-title">
                    Etched Sinuosity #2 by Saskia Freeke
                </h3>
                <iframe allow="accelerometer; camera; gyroscope; microphone; xr-spatial-tracking; midi;"
                    class="aspect-square w-full live-code"
                    data-src="https://ipfs.io/ipfs/QmbdemW25i8uqXa4okK5jKXP3EDvezeT27tfEgoZcK8shZ/"
                    sandbox="allow-scripts allow-downloads allow-same-origin" scrolling="">
                </iframe>
            </div>
            <div style="flex: 1;">
                <h3 class="collection-title">
                    Fluctuating Paragon #3 by Saskia Freeke
                </h3>
                <iframe allow="accelerometer; camera; gyroscope; microphone; xr-spatial-tracking; midi;"
                    class="aspect-square w-full live-code"
                    data-src="https://ipfs.io/ipfs/QmZoGW3fJhgm5j5ijBK31rWFwJ1CYvkFDBXxwmfPX6bKyQ/"
                    sandbox="allow-scripts allow-downloads allow-same-origin" scrolling="">
                </iframe>
            </div>
        </div>
        <div class="gallery-row sm:flex gap-2 sm:gap-4 mb-12 sm:mb-24">
            <div class="mb-12 sm:mb-0" style="flex:0.8;">
                <h3 class="collection-title">
                    Asemica #632 by Emily Edelman, Dima Ofman, Andrew Badr
                </h3>
                <img alt="Asemica #632" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/asemica_632.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/asemica_632.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/asemica_632.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/asemica_632.png?tr=w-800,q-70 800w" />
            </div>
            <div style="flex:0.833333333;">
                <h3 class="collection-title">
                    ertdfgcvb
                </h3>
                <img alt="ABCDEFGHIJKLMNOPQRSTUVWXYZ" loading="lazy"
                    sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/abcdefghijklmnopqrstuvwxyz.gif?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/abcdefghijklmnopqrstuvwxyz.gif?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/abcdefghijklmnopqrstuvwxyz.gif?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/abcdefghijklmnopqrstuvwxyz.gif?tr=w-800,q-70 800w" />
            </div>
        </div>
        <div class="sm:block hidden">
            <h3 class="collection-title">
                Cosmic Type by Mark Webster
            </h3>
            <div class="gallery-row gallery-triple-wide">
                <iframe class="aspect-square w-full live-code"
                    data-src="https://gateway.fxhash2.xyz/ipfs/Qmc82PoP6NHKm47YM131W7KoNzQeG1Y9aK5zcT6XSeAuiy/?fxhash=opDHtTdB8PW7rv2aH83HJiiUBVJ2f2F9a6YMTE1A4bPrw2Kh4Fz&amp;fxiteration=163&amp;fxminter=tz1eHtSYDmFePHvZYHQZvQLk1kpvfcMFdLeJ"
                    loading="lazy" sandbox="allow-scripts allow-same-origin">
                </iframe>
                <iframe class="aspect-square w-full live-code"
                    data-src="https://gateway.fxhash2.xyz/ipfs/Qmc82PoP6NHKm47YM131W7KoNzQeG1Y9aK5zcT6XSeAuiy/?fxhash=ooqXZigratr7VFpBPzhiUSwpKXyQ5VFHv77yf58HWkLhXzmQnBw&amp;fxiteration=242&amp;fxminter=tz1TbpNqZHiiyrip1NMPioM5vwRxoz8UXabj"
                    loading="lazy" sandbox="allow-scripts allow-same-origin">
                </iframe>
                <iframe class="aspect-square w-full live-code" loading="lazy" sandbox="allow-scripts allow-same-origin"
                    src="https://gateway.fxhash2.xyz/ipfs/Qmc82PoP6NHKm47YM131W7KoNzQeG1Y9aK5zcT6XSeAuiy/?fxhash=onws1HjExouNprzkaJBgJAevLBcjSpmCkMRvHaX96aD1SZwhuia&amp;fxiteration=268&amp;fxminter=tz1TSdoeS5udkYmVr1cEpErTqxGVrC3Kcd2J">
                </iframe>
            </div>
        </div>
        <h3 class="collection-title">
            Hypertype by Mark Webster
        </h3>
        <div class="gallery-row gallery-double-wide">
            <img alt="Hypertype #124" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/hypertype_124.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/hypertype_124.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/hypertype_124.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/hypertype_124.png?tr=w-800,q-70 800w" />
            <img alt="Hypertype #57" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/hypertype_57.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/hypertype_57.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/hypertype_57.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/hypertype_57.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Hyperspacers by Stranger in the Q
        </h3>
        <div class="gallery-row gallery-double-wide">
            <img alt="Hyperspacers #335" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/hyperspacers_335.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/hyperspacers_335.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/hyperspacers_335.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/hyperspacers_335.png?tr=w-800,q-70 800w" />
            <img alt="Hyperspacers #334" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/hyperspacers_334.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/hyperspacers_334.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/hyperspacers_334.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/hyperspacers_334.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            adrift by Jacek Markusiewicz
        </h3>
        <div class="gallery-row gallery-double-wide">
            <img alt="adrift #146" class="sc-a7460964-0 flHabD" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/adrift_146.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/adrift_146.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/adrift_146.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/adrift_146.png?tr=w-800,q-70 800w" />
            <img alt="adrift #228" class="sc-a7460964-0 flHabD" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/adrift_228.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/adrift_228.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/adrift_228.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/adrift_228.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            RGB Elementary Cellular Automaton by Ciphrd
        </h3>
        <div class="gallery-row gallery-double-wide">
            <img alt="RGB Elementary Cellular Automaton #366" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/rgb_elementary_cellular_automaton_366.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/rgb_elementary_cellular_automaton_366.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/rgb_elementary_cellular_automaton_366.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/rgb_elementary_cellular_automaton_366.png?tr=w-800,q-70 800w" />
            <img alt="RGB Elementary Cellular Automaton #474" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/rgb_elementary_cellular_automaton_474.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/rgb_elementary_cellular_automaton_474.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/rgb_elementary_cellular_automaton_474.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/rgb_elementary_cellular_automaton_474.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Caesuras / Casey Reas
        </h3>
        <div class="gallery-row gallery-double-wide">
            <img alt="CSRSNT-ZAAI-23-of-64.png" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/csrsnt_zaai_23_of_64_png.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/csrsnt_zaai_23_of_64_png.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/csrsnt_zaai_23_of_64_png.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/csrsnt_zaai_23_of_64_png.png?tr=w-800,q-70 800w" />
            <img alt="CSRSNT-QAAI-18-of-32.png" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/csrsnt_qaai_18_of_32_png.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/csrsnt_qaai_18_of_32_png.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/csrsnt_qaai_18_of_32_png.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/csrsnt_qaai_18_of_32_png.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Punktwelt by Erik Swahn
        </h3>
        <div class="gallery-row gallery-double-wide">
            <img alt="Punktwelt #420" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/punktwelt_420.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/punktwelt_420.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/punktwelt_420.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/punktwelt_420.png?tr=w-800,q-70 800w" />
            <img alt="Punktwelt #556" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/punktwelt_556.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/punktwelt_556.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/punktwelt_556.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/punktwelt_556.png?tr=w-800,q-70 800w" />
        </div>
        <div class="sm:block hidden">
            <h3 class="collection-title">
                Primitives by Aranda/Lasch
            </h3>
            <div class="gallery-row gallery-double-wide">
                <iframe class="aspect-square w-full live-code"
                    data-src="https://generator.artblocks.io/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/368000242"
                    loading="lazy" sandbox="allow-scripts allow-same-origin">
                </iframe>
                <iframe class="aspect-square w-full live-code"
                    data-src="https://generator.artblocks.io/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/368000049"
                    loading="lazy" sandbox="allow-scripts allow-same-origin">
                </iframe>
            </div>
        </div>
        <h3 class="collection-title">
            Hypergiraffes by Piter Pasma
        </h3>
        <div class="gallery-row gallery-double-wide">
            <img alt="Hypergiraffe #151" class="sc-a7460964-0 flHabD" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/hypergiraffe_151.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/hypergiraffe_151.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/hypergiraffe_151.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/hypergiraffe_151.png?tr=w-800,q-70 800w" />
            <img alt="Hypergiraffe #150" class="sc-a7460964-0 flHabD" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/hypergiraffe_150.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/hypergiraffe_150.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/hypergiraffe_150.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/hypergiraffe_150.png?tr=w-800,q-70 800w" />
        </div>
        <div class="gallery-row gallery-double-wide">
            <div>
                <h3 class="collection-title">
                    Computational Specimen No. 2 by Sarah Ridgley
                </h3>
                <img alt="Computational Specimen No. 2" loading="lazy"
                    sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/computational_specimen_no_2.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/computational_specimen_no_2.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/computational_specimen_no_2.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/computational_specimen_no_2.png?tr=w-800,q-70 800w" />
            </div>
            <div>
                <h3 class="collection-title">
                    Anthropogeny by Claire Silver
                </h3>
                <img alt="Claire Silver - Anthropogeny" loading="lazy"
                    sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                    src="https://ik.imagekit.io/UltraDAO/wallace/claire_silver_anthropogeny.png?tr=w-400,q-70"
                    srcset="https://ik.imagekit.io/UltraDAO/wallace/claire_silver_anthropogeny.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/claire_silver_anthropogeny.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/claire_silver_anthropogeny.png?tr=w-800,q-70 800w" />
            </div>
        </div>
        <div>
            <h3 class="collection-title">
                Matthias Isaaksen
            </h3>
            <div class="gallery-row gallery-flex">
                <div style="flex: 1;">
                    <img alt="Extramundane" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/extramundane.jpg?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/extramundane.jpg?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/extramundane.jpg?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/extramundane.jpg?tr=w-800,q-70 800w" />
                </div>
                <div style="flex: 0.8;">
                    <img alt="Inside World" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/inside_world.png?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/inside_world.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/inside_world.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/inside_world.png?tr=w-800,q-70 800w" />
                </div>
                <div style="flex: 0.6611865;">
                    <img alt="In Disharmony, New Found Freedom" loading="lazy"
                        sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/in_disharmony_new_found_freedom.jpg?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/in_disharmony_new_found_freedom.jpg?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/in_disharmony_new_found_freedom.jpg?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/in_disharmony_new_found_freedom.jpg?tr=w-800,q-70 800w" />
                </div>
            </div>
        </div>
        <h3 class="collection-title">
            Factura by Matthias Isaaksen
        </h3>
        <div class="gallery-row gallery-quadruple-wide">
            <img alt="Factura #402" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/factura_402.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/factura_402.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/factura_402.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/factura_402.png?tr=w-800,q-70 800w" />
            <img alt="Factura #842" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/factura_842.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/factura_842.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/factura_842.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/factura_842.png?tr=w-800,q-70 800w" />
            <img alt="Factura #996" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/factura_996.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/factura_996.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/factura_996.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/factura_996.png?tr=w-800,q-70 800w" />
            <img alt="Factura #252" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/factura_252.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/factura_252.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/factura_252.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/factura_252.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Mind the Gap by MountVitruvius
        </h3>
        <div class="gallery-row gallery-triple-wide">
            <img alt="Mind the Gap #490" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/mind_the_gap_490.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/mind_the_gap_490.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/mind_the_gap_490.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/mind_the_gap_490.png?tr=w-800,q-70 800w" />
            <img alt="Mind the Gap #189" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/mind_the_gap_189.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/mind_the_gap_189.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/mind_the_gap_189.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/mind_the_gap_189.png?tr=w-800,q-70 800w" />
            <img alt="Mind the Gap #114" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/mind_the_gap_114.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/mind_the_gap_114.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/mind_the_gap_114.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/mind_the_gap_114.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            de|growth:generations by Jacek Markusiewicz
        </h3>
        <div class="gallery-row gallery-triple-wide">
            <img alt="de|growth:generations #68" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/de_growth_generations_68.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/de_growth_generations_68.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/de_growth_generations_68.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/de_growth_generations_68.png?tr=w-800,q-70 800w" />
            <img alt="de|growth:generations #106" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/de_growth_generations_106.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/de_growth_generations_106.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/de_growth_generations_106.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/de_growth_generations_106.png?tr=w-800,q-70 800w" />
            <img alt="de|growth:generations #53" loading="lazy"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/de_growth_generations_53.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/de_growth_generations_53.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/de_growth_generations_53.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/de_growth_generations_53.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Elevation by Andreas Rau
        </h3>
        <div class="gallery-row gallery-triple-wide">
            <img alt="Elevation #257" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/elevation_257.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/elevation_257.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/elevation_257.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/elevation_257.png?tr=w-800,q-70 800w" />
            <img alt="Elevation #79" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/elevation_79.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/elevation_79.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/elevation_79.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/elevation_79.png?tr=w-800,q-70 800w" />
            <img alt="Elevation #124" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/elevation_124.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/elevation_124.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/elevation_124.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/elevation_124.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Millefoglie by Stefan Contiero
        </h3>
        <div class="gallery-row gallery-double-wide">
            <img alt="Millefoglie #169" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/millefoglie_169.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/millefoglie_169.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/millefoglie_169.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/millefoglie_169.png?tr=w-800,q-70 800w" />
            <img alt="Millefoglie #104" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/millefoglie_104.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/millefoglie_104.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/millefoglie_104.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/millefoglie_104.png?tr=w-800,q-70 800w" />
        </div>
        <div>
            <h3 class="collection-title">
                Fields by Erik Swahn
            </h3>
            <div class="gallery-row gallery-flex">
                <div style="flex: 1;">
                    <img alt="Fields #648" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/fields_648.png?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/fields_648.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/fields_648.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/fields_648.png?tr=w-800,q-70 800w" />
                </div>
                <div style="flex: 1.6;">
                    <img alt="Fields #695" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                        src="https://ik.imagekit.io/UltraDAO/wallace/fields_695.png?tr=w-400,q-70"
                        srcset="https://ik.imagekit.io/UltraDAO/wallace/fields_695.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/fields_695.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/fields_695.png?tr=w-800,q-70 800w" />
                </div>
            </div>
        </div>
        <div class="sm:block hidden">
            <h3 class="collection-title">
                Cathedral Study by Eric di Giuli
            </h3>
            <div class="gallery-row gallery-double-wide">
                <iframe class="aspect-square w-full live-code"
                    data-src="https://generator.artblocks.io/0x1353fd9d3dc70d1a18149c8fb2adb4fb906de4e8/6000377"
                    loading="lazy" sandbox="allow-scripts allow-same-origin">
                </iframe>
                <iframe class="aspect-square w-full live-code"
                    data-src="https://generator.artblocks.io/0x1353fd9d3dc70d1a18149c8fb2adb4fb906de4e8/6000363"
                    loading="lazy" sandbox="allow-scripts allow-same-origin">
                </iframe>
            </div>
        </div>
        <div class="sm:block hidden">
            <h3 class="mb-0">
                Ir/rational Beauty by Yazid
            </h3>
            <div class="gallery-row gallery-flex">
                <iframe class="aspect-[3/4] live-code"
                    data-src="https://gateway.fxhash2.xyz/ipfs/Qme5QKF1t4AbpGDMKQjWfyx8v8YLG1gyk55aA6evFyuaVM/?fxhash=ooMkJ1sbnrjd1rU25bUmuKjHUAqU3s1AEZA3KypMiHcLjM5uGes&amp;fxiteration=107&amp;fxminter=tz1ZFsnAQ8UorVbyiMcTP63djTMDcj3rrSc3"
                    loading="lazy" sandbox="allow-scripts allow-same-origin" style="flex: 0.833125;">
                </iframe>
                <iframe class="aspect-[4/3] live-code"
                    data-src="https://gateway.fxhash2.xyz/ipfs/Qme5QKF1t4AbpGDMKQjWfyx8v8YLG1gyk55aA6evFyuaVM/?fxhash=ooz5Rf6wR1CkCNPWY3hdDrNThjfy7gHfBRVfzHjyd9W2z1AE2nF&amp;fxiteration=65&amp;fxminter=tz1gLeXAGc1Rho2UTE246xD26SapeyztMF8E"
                    loading="lazy" sandbox="allow-scripts allow-same-origin" style="flex: 1.6194332;">
                </iframe>
            </div>
        </div>
        <h3 class="collection-title">
            Tych by rudxane
        </h3>
        <div class="gallery-row gallery-triple-wide">
            <img alt="Tych #185" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/tych_185.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/tych_185.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_185.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_185.png?tr=w-800,q-70 800w" />
            <img alt="Tych #309" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/tych_309.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/tych_309.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_309.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_309.png?tr=w-800,q-70 800w" />
            <img alt="Tych #190" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/tych_190.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/tych_190.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_190.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_190.png?tr=w-800,q-70 800w" />
            <img alt="Tych #176" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/tych_176.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/tych_176.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_176.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_176.png?tr=w-800,q-70 800w" />
            <img alt="Tych #99" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/tych_99.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/tych_99.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_99.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_99.png?tr=w-800,q-70 800w" />
            <img alt="Tych #305" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/tych_305.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/tych_305.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_305.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_305.png?tr=w-800,q-70 800w" />
            <img alt="Tych #123" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/tych_123.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/tych_123.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_123.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_123.png?tr=w-800,q-70 800w" />
            <img alt="Tych #195" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/tych_195.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/tych_195.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_195.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_195.png?tr=w-800,q-70 800w" />
            <img alt="Tych #91" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/tych_91.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/tych_91.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_91.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/tych_91.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Tesseract by Studio Yorktown
        </h3>
        <div class="gallery-row gallery-quadruple-wide">
            <img alt="Tesseract #365" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/tesseract_365.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/tesseract_365.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/tesseract_365.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/tesseract_365.png?tr=w-800,q-70 800w" />
            <img alt="Tesseract #431" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/tesseract_431.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/tesseract_431.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/tesseract_431.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/tesseract_431.png?tr=w-800,q-70 800w" />
            <img alt="Tesseract #369" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/tesseract_369.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/tesseract_369.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/tesseract_369.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/tesseract_369.png?tr=w-800,q-70 800w" />
            <img alt="Tesseract #388" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/tesseract_388.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/tesseract_388.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/tesseract_388.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/tesseract_388.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Catharsis by Dario Lanza
        </h3>
        <div class="gallery-row gallery-quadruple-wide">
            <img alt="Catharsis #633 - This Is Always" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/catharsis_633_this_is_always.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/catharsis_633_this_is_always.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/catharsis_633_this_is_always.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/catharsis_633_this_is_always.png?tr=w-800,q-70 800w" />
            <img alt="Catharsis #468 - Pick Up Sticks" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/catharsis_468_pick_up_sticks.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/catharsis_468_pick_up_sticks.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/catharsis_468_pick_up_sticks.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/catharsis_468_pick_up_sticks.png?tr=w-800,q-70 800w" />
            <img alt="Catharsis #711 - I'm Yours" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/catharsis_711_i_m_yours.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/catharsis_711_i_m_yours.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/catharsis_711_i_m_yours.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/catharsis_711_i_m_yours.png?tr=w-800,q-70 800w" />
            <img alt="Catharsis #100 - Away in a Manger"
                sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/catharsis_100_away_in_a_manger.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/catharsis_100_away_in_a_manger.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/catharsis_100_away_in_a_manger.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/catharsis_100_away_in_a_manger.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            For Algernon by Elsif
        </h3>
        <div class="gallery-row gallery-quadruple-wide">
            <img alt="For Algernon #207" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/for_algernon_207.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/for_algernon_207.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/for_algernon_207.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/for_algernon_207.png?tr=w-800,q-70 800w" />
            <img alt="For Algernon #223" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/for_algernon_223.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/for_algernon_223.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/for_algernon_223.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/for_algernon_223.png?tr=w-800,q-70 800w" />
            <img alt="For Algernon #170" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/for_algernon_170.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/for_algernon_170.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/for_algernon_170.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/for_algernon_170.png?tr=w-800,q-70 800w" />
            <img alt="For Algernon #248" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/for_algernon_248.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/for_algernon_248.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/for_algernon_248.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/for_algernon_248.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            Morphology by Emily Xie
        </h3>
        <div class="gallery-row gallery-double-wide">
            <img alt="LUNA" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/luna.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/luna.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/luna.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/luna.png?tr=w-800,q-70 800w" />
            <img alt="Shield" loading="lazy" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/shield.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/shield.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/shield.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/shield.png?tr=w-800,q-70 800w" />
        </div>
        <h3 class="collection-title">
            unbuilt by Jacek Markusiewicz
        </h3>
        <div class="gallery-row gallery-quadruple-wide-trip-small">
            <img alt="unbuilt #238" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_238.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_238.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_238.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_238.png?tr=w-800,q-70 800w" />
            <img alt="unbuilt #176" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_176.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_176.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_176.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_176.png?tr=w-800,q-70 800w" />
            <img alt="unbuilt #206" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_206.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_206.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_206.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_206.png?tr=w-800,q-70 800w" />
            <img alt="unbuilt #154" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_154.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_154.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_154.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_154.png?tr=w-800,q-70 800w" />
            <img alt="unbuilt #200" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_200.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_200.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_200.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_200.png?tr=w-800,q-70 800w" />
            <img alt="unbuilt #240" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_240.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_240.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_240.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_240.png?tr=w-800,q-70 800w" />
            <img alt="unbuilt #19" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_19.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_19.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_19.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_19.png?tr=w-800,q-70 800w" />
            <img alt="unbuilt #218" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_218.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_218.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_218.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_218.png?tr=w-800,q-70 800w" />
            <img alt="unbuilt #248" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_248.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_248.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_248.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_248.png?tr=w-800,q-70 800w" />
            <img alt="unbuilt #190" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_190.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_190.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_190.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_190.png?tr=w-800,q-70 800w" />
            <img alt="unbuilt #43" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_43.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_43.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_43.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_43.png?tr=w-800,q-70 800w" />
            <img alt="unbuilt #197" sizes="(max-width: 400px) 200px, (max-width: 800px) 400px, 800px"
                src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_197.png?tr=w-400,q-70"
                srcset="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_197.png?tr=w-200,q-70 200w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_197.png?tr=w-400,q-70 400w,                                    https://ik.imagekit.io/UltraDAO/wallace/unbuilt_197.png?tr=w-800,q-70 800w" />
        </div>
    </div>
</article>
