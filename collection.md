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

  // Function to set srcset and sizes
  const setSrcSetAndSizes = (img) => {
      const renderedWidth = img.clientWidth;
      const base_url = "https://ik.imagekit.io/UltraDAO/wallace/";
      const img_name = img.src.split('/').pop().split('?')[0];

      const srcsetStr = `${base_url}${img_name}?tr=w-${renderedWidth},q-70 1x,
                          ${base_url}${img_name}?tr=w-${renderedWidth * 2},q-70 2x,
                          ${base_url}${img_name}?tr=w-${renderedWidth * 3},q-70 3x`;

      // This should reflect your actual layout rules in your CSS
      const sizesStr = `(max-width: 400px) ${renderedWidth}px,
                        (max-width: 800px) ${renderedWidth * 2}px,
                        (max-width: 1200px) ${renderedWidth * 3}px,
                        ${renderedWidth * 4}px`;

      img.src = `${base_url}${img_name}?tr=w-${renderedWidth},q-70`;
      img.srcset = srcsetStr;
      img.sizes = sizesStr;
  };

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

      // Initialize IntersectionObserver
      const imgObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const img = entry.target;
                  setSrcSetAndSizes(img); // Call your function to set srcset and sizes
                  observer.unobserve(img); // Stop observing this image
              }
          });
      }, { rootMargin: '0px 0px 200px 0px' });  // Trigger if the image gets within 200px of the viewport

      // Attach event listeners to each image
      images.forEach((img) => {
          imgObserver.observe(img);  // Start observing this image

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

          // Create a wrapper div around the image
          const wrapperDiv = document.createElement('div');
          wrapperDiv.classList.add('image-wrapper');
          img.parentNode.insertBefore(wrapperDiv, img);
          wrapperDiv.appendChild(img);

          // Create the maximize icon
          const maximizeIcon = document.createElement('div');
          maximizeIcon.classList.add('maximize-icon');
          maximizeIcon.textContent = '[+]';
          wrapperDiv.appendChild(maximizeIcon);

          const goFullscreen = () => {
            const viewer = document.getElementById('fullscreen-viewer');
            
            // Create a new image with higher resolution based on screen dimensions
            const newImg = document.createElement('img');
            const currentSrc = img.getAttribute('src');
            const highResSrc = currentSrc.replace(/w-\d+/, `w-${window.innerWidth*2}`).replace(/q-\d+/, 'q-90');
            
            newImg.setAttribute('src', highResSrc);
            
            const currentIframeSrc = img.getAttribute('data-iframe-src');
            
            const newDiv = document.createElement('div');

            viewer.innerHTML = '';
            viewer.appendChild(newDiv);
            newDiv.appendChild(newImg);
            newDiv.appendChild(createCloseButton());

            viewer.className = '';

            if (currentIframeSrc)
              newDiv.appendChild(createViewLiveCodeButton(currentIframeSrc, newImg));

            // For fullscreen
            if (viewer.requestFullscreen) {
              viewer.requestFullscreen();
            }
          };

          // Listen for clicks on the maximize icon
          maximizeIcon.addEventListener('click', goFullscreen);
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

      function createCloseButton() {
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.className = 'close-btn';
        closeButton.addEventListener('click', () => {
          document.exitFullscreen();
          const viewer = document.getElementById('fullscreen-viewer');
          viewer.className = 'hidden';
        });
        return closeButton;
      }

      function createViewLiveCodeButton(iframeSrc, img) {  // Pass the img element as an argument
          const viewCodeButton = document.createElement('button');
          viewCodeButton.textContent = 'View Live';
          viewCodeButton.className = 'live-code-btn';
          viewCodeButton.addEventListener('click', () => {
              if (iframeSrc) {
                  const imgWidth = img.offsetWidth;  // Fetch the rendered width of the image
                  const imgHeight = img.offsetHeight;  // Fetch the rendered height of the image
                  const newDiv = document.createElement('div');
                  const iframe = document.createElement('iframe');
                  iframe.setAttribute('src', iframeSrc);
                  iframe.setAttribute('width', imgWidth);  // Set the iframe width to match the image
                  iframe.setAttribute('height', imgHeight);  // Set the iframe height to match the image
                  const viewer = document.getElementById('fullscreen-viewer');
                  viewer.innerHTML = '';
                  viewer.appendChild(newDiv);
                  newDiv.appendChild(iframe);
                  newDiv.appendChild(createCloseButton());
              }
          });
          return viewCodeButton;
      }


  });

</script>
<article>
  <a class="back-btn" href="/art"> Art </a>
  <h1>The Wallace Collection</h1>
  <p class="sub-heading">
    A selection of generative artworks currently held in my family's private collection. These works are represented mostly in static images, however some pieces are the live code to provide the intended artistic impact.
  </p>
  <hr />
  <div>
    <div>
      <h3 class="collection-title">Manolo Gamboa Naon</h3>
      <div class="gallery-row gallery-flex">
        <div style="flex: 1">
          <img alt="Tempo de Amor" src="https://ik.imagekit.io/UltraDAO/wallace/tempo_de_amor.jpg?tr=w-100,q-70,bl=6" />
        </div>
        <div style="flex: 1">
          <img alt="en llamas" src="https://ik.imagekit.io/UltraDAO/wallace/en_llamas.jpg?tr=w-100,q-20,bl-6" />
        </div>
        <div style="flex: 1.50146628">
          <img alt="furia"
            class="sc-a7460964-0 flHabD" src="https://ik.imagekit.io/UltraDAO/wallace/furia.jpg?tr=w-100,q-20,bl-6" />
        </div>
      </div>
    </div>
    <h3 class="collection-title">centrifugal / omni (i) by Marcelo Soria-Rodgriguez</h3>
    <div class="gallery-row gallery-single-wide">
        <img alt="centrifugal / omni (i) by Marcelo Soria-Rodgriguez" src="https://ik.imagekit.io/UltraDAO/wallace/centrifugal.png?tr=w-100,q-20,bl-6" />
    </div>
    <div class="gallery-row gallery-double-wide">
      <div>
        <h3 class="collection-title">Reticulum by Harvey Rayner</h3>
        <img alt="Reticulum by Harvey Rayner" src="https://ik.imagekit.io/UltraDAO/wallace/reticulum_by_harvey_rayner.jpg?tr=w-100,q-20,bl-6" />
      </div>
      <div>
        <h3 class="collection-title">Dragons #489 by William Mapan</h3>
        <img alt="Dragons #489" src="https://ik.imagekit.io/UltraDAO/wallace/dragons_489.png?tr=w-100,q-20,bl-6" data-iframe-src="https://gateway.fxhash2.xyz/ipfs/QmeKNachzan9TamxbYmfhDfjkur7gbs1EEtGqMpsmyubeb/?fxhash=op8GW9Zq63p4qWsNRHS47QciYW5spKFTzMTroSMxH4EuBYaNAY7&fxiteration=489&fxminter=tz1P5jYGVw7JZLM7CNnFxGk1bSZaQovMrzfo" />
      </div>
    </div>
    <div class="gallery-row gallery-double-wide">
      <div>
        <h3 class="collection-title">
          QQL #94 by Tyler Hobbs and Dandelion Wist
        </h3>
        <img alt="QQL #94" src="https://ik.imagekit.io/UltraDAO/wallace/qql_94.png?tr=w-100,q-20,bl-6" data-iframe-src="https://qql.art/generator/0x8367a713bc14212ab1bb8c55a778e43e50b8b9277706fa5e6368ffff10c10c32" />
      </div>
      <div>
        <h3 class="collection-title">
          Acequia #219 by Rich Poole and Rick Crane
        </h3>
        <img alt="Acequia #219" src="https://ik.imagekit.io/UltraDAO/wallace/acequia_219.png?tr=w-100,q-20,bl-6" data-iframe-src="https://gateway.fxhash2.xyz/ipfs/QmUBXzcPTme2wwfjp52Wy6Ty8oS25qguo7DLjfAMW9eRQK/?fxhash=ooQWjKEjqYfYtS5BfRMwu31Zz8ZCHDcptbtaCqvhoq9QCSHZwYW&fxiteration=219&fxminter=tz1PHnydn2z7dtW5AZUmEcGfUyN9vBqR7q4W" />
      </div>
    </div>
    <div class="gallery-row sm:flex gap-2 sm:gap-4 mb-12 sm:mb-24">
      <div class="mb-12 sm:mb-0" style="flex: 1.77774687">
        <h3 class="collection-title">kaiC by p1xelfool</h3>
        <img alt="kaiC" src="https://ik.imagekit.io/UltraDAO/wallace/kaic.gif?tr=w-100,q-20,bl-6" />
      </div>
      <div style="flex: 1">
        <h3 class="collection-title">8 18 54 51 by Kim Asendorf</h3>
        <img alt="8 18 54 51"
          class="w-full h-auto" src="https://ik.imagekit.io/UltraDAO/wallace/8_18_54_51.gif?tr=w-100,q-20,bl-6" />
      </div>
    </div>
    <div>
      <h3 class="collection-title">Quasi Dragon Studies by Harvey Rayner</h3>
      <div class="gallery-row gallery-flex sm:mb-4">
        <div style="flex: 0.8661133">
          <img alt="Quasi Dragon Studies #252" src="https://ik.imagekit.io/UltraDAO/wallace/quasi_dragon_studies_252.png?tr=w-100,q-20,bl-6" data-iframe-src="https://public-bucket-verse-dev.s3.eu-west-1.amazonaws.com/genart/go/index.html?payload=eyJoYXNoIjoiMHhlZjcyZDg1N2FjYjRlN2VhMGZhNjg0YjM2NTdkNDM3YzMzOTU4MzdhMzU5YzMxZDViMmM1YjIzYWMxZGVmOTEyIiwiZWRpdGlvbk51bWJlciI6MjUyLCJ0b3RhbEVkaXRpb25zIjowLCJpbnB1dCI6eyIkcXVhc2lfZHJhZ29uczpjb21wb3NpdGUiOiI2NjA0NDIyKzAsMHg2MzMzNzM3ZmIxMzBmMWIwNGE4MWI4ZDg4MTE2NmM2ODY0ZTg2NGYyMWRkOTM0ZmQ3MDIzMzVkNmY3NTFkNmZmfjB4ZTc4ZGY1NDE2YTgwNzZhMGRmZWVlYjNmOTllZjY0ODg5OTA1Y2UwNmFjNDFhZDUyNzAwMmM2MDVhZmU1MDZlOCwweDQ5NDRlY2Q4MWQ0YWI5ZjMxNzIyYzZhZTIyZjFlMjYxOTI3NzVmZTI5MWIxYjkxNWQ3ZDk3ODg5ODk2NGEwYjR%2BMCwweDZhNGY4ZDY5OTUxZDgwZmEyMjgzNzIyOGYzZDQ2Yjg2ZTRmN2IzZmU3NjlhNDNjN2EyNjBjZGEyMWY4MTgzZmJ%2BMHg0N2I3ZjNjMjk0M2JiYmRhNzEwYTk0MzkyM2E2YzdlNzkwZmRkMDU3NDM1ZDM2NGU4OWJkMjM5ZDlmYWI5YmM3LEwwIn19" />
        </div>
        <div style="flex: 0.2886666">
          <img alt="Quasi Dragon Studies #255" src="https://ik.imagekit.io/UltraDAO/wallace/quasi_dragon_studies_255.png?tr=w-100,q-20,bl-6" data-iframe-src="https://public-bucket-verse-dev.s3.eu-west-1.amazonaws.com/genart/go/index.html?payload=eyJoYXNoIjoiMHgxMDQ5MThlMDg2MDg1ZWVmMWRiYjQ2MzUwN2Y5Mjk0ODA4NDI2YzRhOTBiMzQzM2ExNzEyZWI3ZDE1OWRjZGFmIiwiZWRpdGlvbk51bWJlciI6MjU1LCJ0b3RhbEVkaXRpb25zIjowLCJpbnB1dCI6eyIkcXVhc2lfZHJhZ29uczpjb21wb3NpdGUiOiI0MDg0KzB4ZDVkMGYzODEwYTNiZTBiNDc3MmIyZmMwMTljYmM5YmUwYTc3MGVkM2JiZDNiYjkyZTM1N2ZjNTQxNTIwMjA0Nn5MMHgyNjFlNDQxOThiZGJiY2JkYTg1OTE4ZTBiYzk0ZmI1ODFlOWVjMTA4NmUyZWFkMDkxNmFmMjcyMGI2M2I5Mzg1In19" />
        </div>
        <div style="flex: 0.2886666">
          <img alt="Quasi Dragon Studies #254" src="https://ik.imagekit.io/UltraDAO/wallace/quasi_dragon_studies_254.png?tr=w-100,q-20,bl-6" data-iframe-src="https://public-bucket-verse-dev.s3.eu-west-1.amazonaws.com/genart/go/index.html?payload=eyJoYXNoIjoiMHgxYjE1ZjBlOTA4NjRjMmE1ZDQ0Y2NlMjljMGJmODI5MTk0ZDRkODVlZjY0N2Y2NDIxNTEzYmZmNWNmMmQxMTYwIiwiZWRpdGlvbk51bWJlciI6MjU0LCJ0b3RhbEVkaXRpb25zIjowLCJpbnB1dCI6eyIkcXVhc2lfZHJhZ29uczpjb21wb3NpdGUiOiI0MDY2KzB4ZDk2ZjEzMGNkMGMwNjc3NWNkYzUwZDg3NzQxM2E2NjVmYTFjODg1NjRlYmNjYjdmOGZkY2FmYzU4MDg3ODY5Y35MMHg0NWU4YTljNzY3ZmExODdmYzk4Zjc2MWQ4ZWU1NzAzYmIyOTcwYjhlZGQ4MzZhZDY1ODRmNTQzM2M0MzU2OWQwIn19" />
        </div>
      </div>
      <div class="gallery-row gallery-single-wide">
          <img alt="Quasi Dragon Studies #289" src="https://ik.imagekit.io/UltraDAO/wallace/quasi_dragon_studies_289.jpg?tr=w-100,q-20,bl-6" data-iframe-src="https://public-bucket-verse-dev.s3.eu-west-1.amazonaws.com/genart/go/index.html?payload=eyJoYXNoIjoiMHgyZjkzYjI0YTJlYWMzMDM4Yjg4YmZjMzM3NzE2NzA4MTFmNGJhMzY2NTk1NGE1NGE4NmVjMGVmNDg2M2EzYmE1IiwiZWRpdGlvbk51bWJlciI6Mjg5LCJ0b3RhbEVkaXRpb25zIjowLCJpbnB1dCI6eyIkcXVhc2lfZHJhZ29uczpjb21wb3NpdGUiOiI0NjQwNisweDcwNmM3YzFmZjM3OTNhY2FjMWQxMzFmOGZjNGEzM2QyZDIxY2U2OTM5YTdmNjg3MDM3ZTMzN2NkOWRhNGZlNjUsMHg2Y2MwZTg4NDg1ZTM0YzFiMGRhYjM0ZDYyMmFkZGViZDJhZDYyY2RkNjFjMDA2Y2E1OWU5NmRiZDQ1ZjY0MzcxLEwweDNmZjkwOGE2ZDAxYTVmMTdiNDQyZTJkMWRkMWVlMTIzN2ZkNDk4YWJmZDI5NzU0ZDY0MGZjZDk0MjQ3MGEwNjYifX0%3D" />
      </div>
    </div>
    <h3 class="collection-title">Michaël Zancan</h3>
    <div class="gallery-row gallery-double-wide">
      <img alt="Garden, Monoliths #125" src="https://ik.imagekit.io/UltraDAO/wallace/garden_monoliths_125.jpg?tr=w-100,q-20,bl-6" data-iframe-src="https://gateway.fxhash2.xyz/ipfs/QmeuWoPt7WNMhTxMTZmumPqqw8zcCCd1K14wCHR2WoH6b2/?fxhash=ooqSn7h2GrHCn3XmNDTif3JXWnZ2DyqiSJ4YNcGuedguN6G7Y8V&fxiteration=125&fxminter=tz1Ym9Ued9v2N2wwsrtQ52HRGGn7qDmzuUZU" />
      <img alt="(kinder)Garden, Monuments #23" src="https://ik.imagekit.io/UltraDAO/wallace/_kinder_garden_monuments_23.jpg?tr=w-100,q-20,bl-6" data-iframe-src="https://gateway.fxhash2.xyz/ipfs/QmZvfCTkkAfJeWQE1ZjEKc2mZkfnNwkcA6Y2fMBcBBpPNZ/?fxhash=ooYtH4EyXP4xxd6RpX5cocqYbnTQsH9vZFxs8EPX32DhcUm1KPg&fxiteration=23&fxminter=tz1i6asBhhj3DjWLShhJaCncePohqmkw9WW9" />
      <img alt="A Bugged Forest #169" src="https://ik.imagekit.io/UltraDAO/wallace/a_bugged_forest_169.png?tr=w-100,q-20,bl-6" data-iframe-src="https://gateway.fxhash2.xyz/ipfs/QmebKrkUNabQq1Yhp1QrK2EUPbUctrphu9xEmiz23bQDgM/?fxhash=onsrts5KruP2eZrtca7eFu1DJTpjbenxwaHh9DX9Vpm7ped8k6P&fxiteration=169&fxminter=tz1Q22BiuDFqfvWhMqa5txLA6zGKrqLS6Yj1" />
      <img alt="Everything, made simple" src="https://ik.imagekit.io/UltraDAO/wallace/everything_made_simple.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Piter Pasma</h3>
    <div class="gallery-row gallery-double-wide">
      <img alt="Chaos Candy Plasma Vent" src="https://ik.imagekit.io/UltraDAO/wallace/chaos_candy_plasma_vent.png?tr=w-100,q-20,bl-6" />
      <img alt="Neutron amusement park" src="https://ik.imagekit.io/UltraDAO/wallace/neutron_amusement_park.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Contrapuntos by Marcelo Soria-Rodríguez</h3>
    <div class="gallery-row gallery-triple-wide">
      <img alt="contrapuntos #364" src="https://ik.imagekit.io/UltraDAO/wallace/contrapuntos_364.png?tr=w-100,q-20,bl-6" data-iframe-src="https://gateway.fxhash2.xyz/ipfs/QmfTQFEgcgYDohPJLJWWnrKeRMBYrRP8JF79k6kveuXEv2/?fxhash=opEBz3AH9YrPfFWShDASLAmqw6t5e3oqsNuS9fRFZ39kczBBwsi&fxiteration=364&fxminter=tz2SM2qp42H8kQchmfvexZ6G8qUHBXUbr4zK" />
      <img alt="contrapuntos #500" src="https://ik.imagekit.io/UltraDAO/wallace/contrapuntos_500.png?tr=w-100,q-20,bl-6" data-iframe-src="https://gateway.fxhash2.xyz/ipfs/QmfTQFEgcgYDohPJLJWWnrKeRMBYrRP8JF79k6kveuXEv2/?fxhash=ooZyxJbjLAs4EW7q2p231sY1FpLVTWWqdPYfcgB5wJWSNn8WREP&fxiteration=500&fxminter=tz1bafXvnKt87p1yXPV3vvVpe6gyD7BCdjyh" />
      <img alt="contrapuntos #367" src="https://ik.imagekit.io/UltraDAO/wallace/contrapuntos_367.png?tr=w-100,q-20,bl-6" data-iframe-src="https://gateway.fxhash2.xyz/ipfs/QmfTQFEgcgYDohPJLJWWnrKeRMBYrRP8JF79k6kveuXEv2/?fxhash=ooYKyTPwVLrK6ZmB9mFAiCTnKjRUooJbGmB5NcHXa44uskCMQBq&fxiteration=367&fxminter=tz1Ym9Ued9v2N2wwsrtQ52HRGGn7qDmzuUZU" />
    </div>
    <h3 class="collection-title">Bravura by dmarchi</h3>
    <div class="gallery-row gallery-triple-wide">
      <img alt="Bravura #90" src="https://ik.imagekit.io/UltraDAO/wallace/bravura_90.png?tr=w-100,q-20,bl-6" />
      <img alt="Bravura #82" src="https://ik.imagekit.io/UltraDAO/wallace/bravura_82.png?tr=w-100,q-20,bl-6" />
      <img alt="Bravura #81" src="https://ik.imagekit.io/UltraDAO/wallace/bravura_81.png?tr=w-100,q-20,bl-6" />
    </div>
    <div class="sm:block hidden">
      <h3 class="collection-title">
        Gerhard and Richter by Richard Nadler and Leander Herzog
      </h3>
      <div class="gallery-row gallery-double-wide">
        <iframe
          allow="accelerometer *; camera *; gyroscope *; microphone *; xr-spatial-tracking *;"
          class="aspect-square w-full live-code"
          data-src="https://gateway.fxhash2.xyz/ipfs/QmW7Cj5QMG2FFVGMcRKGFhW4V1113seN6iX5FwQrKqTHSM/?fxhash=oo3iCxnjsGQU6Jx4xZpf4Zfc3EPoXWkYhsqXTyGwnGQQKWUjrDB&amp;fxiteration=368&amp;fxminter=tz1Yw6YSydH7qb4vERwxAmSnsihfRcVvnLL3"
          sandbox="allow-scripts allow-same-origin allow-modals"
        >
        </iframe>
        <iframe
          allow="accelerometer *; camera *; gyroscope *; microphone *; xr-spatial-tracking *;"
          class="aspect-square w-full live-code"
          data-src="https://gateway.fxhash2.xyz/ipfs/QmQzbsQM9hd6vc821LmpHCkLXv18fZfhbJf6ygyVhqWB5a/?fxhash=opQ7z15XLoNzWauyGgashqrsyB6zenAjUHpPBAsvMe6dknwj4JQ&amp;fxiteration=399&amp;fxminter=tz1Ym9Ued9v2N2wwsrtQ52HRGGn7qDmzuUZU"
          sandbox="allow-scripts allow-same-origin allow-modals"
        >
        </iframe>
      </div>
    </div>
    <h3 class="collection-title">Entretiempos by Marcelo Soria-Rodríguez</h3>
    <div class="gallery-row gallery-quadruple-wide">
      <img alt="entretiempos #865" src="https://ik.imagekit.io/UltraDAO/wallace/entretiempos_865.png?tr=w-100,q-20,bl-6" />
      <img alt="entretiempos #690" src="https://ik.imagekit.io/UltraDAO/wallace/entretiempos_690.png?tr=w-100,q-20,bl-6" />
      <img alt="entretiempos #654" src="https://ik.imagekit.io/UltraDAO/wallace/entretiempos_654.png?tr=w-100,q-20,bl-6" />
      <img alt="entretiempos #453" src="https://ik.imagekit.io/UltraDAO/wallace/entretiempos_453.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Escape by Iskra Velitchkova</h3>
    <div class="gallery-row gallery-double-wide">
      <img alt="Escape #255" src="https://ik.imagekit.io/UltraDAO/wallace/escape_255.png?tr=w-100,q-20,bl-6" />
      <img alt="Escape #145" src="https://ik.imagekit.io/UltraDAO/wallace/escape_145.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Helena Sarin</h3>
    <div class="gallery-row gallery-quadruple-wide">
      <div class="sm:col-span-2">
        <img alt="Cats of Latentscaux" src="https://ik.imagekit.io/UltraDAO/wallace/cats_of_latentscaux.png?tr=w-100,q-20,bl-6" />
      </div>
      <div class="sm:col-span-2">
        <img alt="Ping Pong, the Isolation Games" src="https://ik.imagekit.io/UltraDAO/wallace/ping_pong_the_isolation_games.png?tr=w-100,q-20,bl-6" />
      </div>
      <img alt="Inceptio Levis" src="https://ik.imagekit.io/UltraDAO/wallace/inceptio_levis.png?tr=w-100,q-20,bl-6" />
      <img alt="Stipula Praecox" src="https://ik.imagekit.io/UltraDAO/wallace/stipula_praecox.png?tr=w-100,q-20,bl-6" />
      <img alt="Susurro Lenis" src="https://ik.imagekit.io/UltraDAO/wallace/susurro_lenis.png?tr=w-100,q-20,bl-6" />
      <img alt="Rusticus Romaineus" src="https://ik.imagekit.io/UltraDAO/wallace/rusticus_romaineus.png?tr=w-100,q-20,bl-6" />
    </div>
    <div>
      <h3 class="collection-title">Iskra Velitchkova</h3>
      <div class="gallery-row gallery-flex sm:mb-4">
        <div style="flex: 1">
          <img alt="🐥🪱 - A bird as if a worm as a bird as a worm | for Bird and Worm Society"
            class="sc-a7460964-0 flHabD" src="https://ik.imagekit.io/UltraDAO/wallace/_a_bird_as_if_a_worm_as_a_bird_as_a_worm_for_bird_and_worm_society.png?tr=w-100,q-20,bl-6" />
        </div>
        <div style="flex: 1.10583153">
          <img alt="The very first B I R D S "
            class="sc-a7460964-0 flHabD" src="https://ik.imagekit.io/UltraDAO/wallace/the_very_first_b_i_r_d_s_.png?tr=w-100,q-20,bl-6" />
        </div>
        <div style="flex: 0.726756565">
          <img alt="H20thB"
            class="sc-a7460964-0 flHabD" src="https://ik.imagekit.io/UltraDAO/wallace/h20thb.png?tr=w-100,q-20,bl-6" />
        </div>
      </div>
      <div class="gallery-row gallery-flex sm:mb-4">
        <div style="flex: 1">
          <img alt="GenerativO Sov I"
            class="sc-a7460964-0 flHabD" src="https://ik.imagekit.io/UltraDAO/wallace/generativo_sov_iii.png?tr=w-100,q-20,bl-6" />
        </div>
        <div style="flex: 1">
          <img alt="GenerativO Sov III"
            class="sc-a7460964-0 flHabD" src="https://ik.imagekit.io/UltraDAO/wallace/generativo_sov_iii.png?tr=w-100,q-20,bl-6" />
        </div>
      </div>
      <div class="gallery-row gallery-flex">
        <div style="flex: 1">
          <img alt="Hypothetically Micro #83"
            class="sc-a7460964-0 flHabD" src="https://ik.imagekit.io/UltraDAO/wallace/hypothetically_micro_83.jpg?tr=w-100,q-20,bl-6" />
        </div>
        <div style="flex: 2.01972387">
          <img alt="BOSKË"
            class="sc-a7460964-0 flHabD" src="https://ik.imagekit.io/UltraDAO/wallace/boske%CC%88.png?tr=w-100,q-20,bl-6" />
        </div>
      </div>
    </div>
    <div>
      <h3 class="collection-title">Qubibi</h3>
      <div class="gallery-row gallery-flex mb-0 sm:mb-4">
        <div style="flex: 1">
          <img alt="MMZ ERRR 3 B" src="https://ik.imagekit.io/UltraDAO/wallace/mmz_errr_3_b.gif?tr=w-100,q-20,bl-6" />
        </div>
        <div style="flex: 1">
          <img alt="230907s01cBp30003000" src="https://ik.imagekit.io/UltraDAO/wallace/230907s01cbp30003000.png?tr=w-100,q-20,bl-6" />
        </div>
      </div>
      <div class="gallery-row gallery-flex mb-0 sm:mb-4">
        <div style="flex: 0.4">
          <img alt="MMZ 197 G" src="https://ik.imagekit.io/UltraDAO/wallace/mmz_197_g.png?tr=w-100,q-20,bl-6" />
        </div>
        <div style="flex: 0.5">
          <img alt="wwz uu15M7kj722Ho #51" src="https://ik.imagekit.io/UltraDAO/wallace/wwz_uu15m7kj722ho_51.png?tr=w-100,q-20,bl-6" />
        </div>
        <div style="flex: 0.710617627">
          <img alt="MMZ 188 D" src="https://ik.imagekit.io/UltraDAO/wallace/mmz_188_d.png?tr=w-100,q-20,bl-6" />
        </div>
      </div>
      <div class="gallery-row gallery-quadruple-wide">
        <div class="sm:col-span-2">
          <img alt="230830s19pQh37003700" src="https://ik.imagekit.io/UltraDAO/wallace/230830s19pqh37003700.png?tr=w-100,q-20,bl-6" />
        </div>
        <div class="sm:col-span-2">
          <img alt="220831k03zWf35003500" src="https://ik.imagekit.io/UltraDAO/wallace/220831k03zwf35003500.png?tr=w-100,q-20,bl-6" />
        </div>
        <img alt="MMZ 204 B" src="https://ik.imagekit.io/UltraDAO/wallace/mmz_204_b.png?tr=w-100,q-20,bl-6" />
        <img alt="MMZ 47" src="https://ik.imagekit.io/UltraDAO/wallace/mmz_47.png?tr=w-100,q-20,bl-6" />
        <img alt="MMZ 207 B" src="https://ik.imagekit.io/UltraDAO/wallace/mmz_207_b.png?tr=w-100,q-20,bl-6" />
        <img alt="MMZ 207 D" src="https://ik.imagekit.io/UltraDAO/wallace/mmz_207_d.png?tr=w-100,q-20,bl-6" />
        <div class="sm:col-span-2">
          <img alt="MMZ 64" src="https://ik.imagekit.io/UltraDAO/wallace/mmz_64.png?tr=w-100,q-20,bl-6" />
        </div>
        <div class="sm:col-span-2">
          <img alt="MMZ 181 A" src="https://ik.imagekit.io/UltraDAO/wallace/mmz_181_a.png?tr=w-100,q-20,bl-6" />
        </div>
      </div>
    </div>
    <h3 class="collection-title">Olivier Bodini</h3>
    <div class="gallery-row gallery-double-wide">
      <img alt="The sky is so colorful tonight" src="https://ik.imagekit.io/UltraDAO/wallace/the_sky_is_so_colorful_tonight.png?tr=w-100,q-20,bl-6" />
      <img alt="A black sun over the war by Olivier Bodini" src="https://ik.imagekit.io/UltraDAO/wallace/a_black_sun_over_the_war_by_olivier_bodini.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Loom by Andreas Rau</h3>
    <div class="gallery-row gallery-quadruple-wide-trip-small">
      <img alt="Loom #389" src="https://ik.imagekit.io/UltraDAO/wallace/loom_389.png?tr=w-100,q-20,bl-6" />
      <img alt="Loom #405" src="https://ik.imagekit.io/UltraDAO/wallace/loom_405.png?tr=w-100,q-20,bl-6" />
      <img alt="Loom #412" src="https://ik.imagekit.io/UltraDAO/wallace/loom_412.png?tr=w-100,q-20,bl-6" />
      <img alt="Loom #421" src="https://ik.imagekit.io/UltraDAO/wallace/loom_421.png?tr=w-100,q-20,bl-6" />
      <img alt="Loom #201" src="https://ik.imagekit.io/UltraDAO/wallace/loom_201.png?tr=w-100,q-20,bl-6" />
      <img alt="Loom #404" src="https://ik.imagekit.io/UltraDAO/wallace/loom_404.png?tr=w-100,q-20,bl-6" />
      <img alt="Loom #409" src="https://ik.imagekit.io/UltraDAO/wallace/loom_409.png?tr=w-100,q-20,bl-6" />
      <img alt="Loom #232" src="https://ik.imagekit.io/UltraDAO/wallace/loom_232.png?tr=w-100,q-20,bl-6" />
      <img alt="Loom #414" src="https://ik.imagekit.io/UltraDAO/wallace/loom_414.png?tr=w-100,q-20,bl-6" />
      <img alt="Loom #113" src="https://ik.imagekit.io/UltraDAO/wallace/loom_113.png?tr=w-100,q-20,bl-6" />
      <img alt="Loom #163" src="https://ik.imagekit.io/UltraDAO/wallace/loom_163.png?tr=w-100,q-20,bl-6" />
      <img alt="Loom #424" src="https://ik.imagekit.io/UltraDAO/wallace/loom_424.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Unfolded by Lars Wander</h3>
    <div class="gallery-row gallery-six-wide">
      <div class="col-span-3">
        <img alt="Unfolded #3" src="https://ik.imagekit.io/UltraDAO/wallace/unfolded_3.png?tr=w-100,q-20,bl-6" />
      </div>
      <div class="col-span-3">
        <img alt="Unfolded #20" src="https://ik.imagekit.io/UltraDAO/wallace/unfolded_20.png?tr=w-100,q-20,bl-6" />
      </div>
      <div class="col-span-2">
        <img alt="Unfolded #74" src="https://ik.imagekit.io/UltraDAO/wallace/unfolded_74.png?tr=w-100,q-20,bl-6" />
      </div>
      <div class="col-span-2">
        <img alt="Unfolded #52" src="https://ik.imagekit.io/UltraDAO/wallace/unfolded_52.png?tr=w-100,q-20,bl-6" />
      </div>
      <div class="col-span-2">
        <img alt="Unfolded #5" src="https://ik.imagekit.io/UltraDAO/wallace/unfolded_52.png?tr=w-100,q-20,bl-6" />
      </div>
    </div>
    <div class="gallery-row sm:flex gap-2 sm:gap-4 mb-12 sm:mb-24">
      <div class="mb-12 sm:mb-0" style="flex: 1">
        <h3 class="collection-title">Acoustic Drift by Joshua Bagley</h3>
        <img alt="Acoustic Drift" src="https://ik.imagekit.io/UltraDAO/wallace/acoustic_drift.png?tr=w-100,q-20,bl-6" />
      </div>
      <div class="mb-12 sm:mb-0" style="flex: 1">
        <h3 class="collection-title">Fold #223 by rudxane</h3>
        <img alt="Fold #223" src="https://ik.imagekit.io/UltraDAO/wallace/fold_223.png?tr=w-100,q-20,bl-6" />
      </div>
      <div class="mb-12 sm:mb-0" style="flex: 1">
        <h3 class="collection-title">Diverse Mix by Thomas Lin Pedersen</h3>
        <img alt="Diverse Mix" src="https://ik.imagekit.io/UltraDAO/wallace/diverse_mix.png?tr=w-100,q-20,bl-6" />
      </div>
    </div>
    <h3 class="collection-title">Elefante by Michael Connolly</h3>
    <div class="gallery-row gallery-triple-wide">
      <img alt="Elefante #60" src="https://ik.imagekit.io/UltraDAO/wallace/elefante_60.png?tr=w-100,q-20,bl-6" data-iframe-src="https://generator.artblocks.io/0x32d4be5ee74376e08038d652d4dc26e62c67f436/4000060" />
      <img alt="Elefante #53" src="https://ik.imagekit.io/UltraDAO/wallace/elefante_53.png?tr=w-100,q-20,bl-6" data-iframe-src="https://generator.artblocks.io/0x32d4be5ee74376e08038d652d4dc26e62c67f436/4000053" />
      <img alt="Elefante #16" src="https://ik.imagekit.io/UltraDAO/wallace/elefante_16.png?tr=w-100,q-20,bl-6" data-iframe-src="https://generator.artblocks.io/0x32d4be5ee74376e08038d652d4dc26e62c67f436/4000016" />
    </div>
    <h3 class="collection-title">Zbageti by Melissa Wiederrecht</h3>
    <div class="gallery-row gallery-triple-wide">
      <img alt="Zbageti #79" src="https://ik.imagekit.io/UltraDAO/wallace/zbageti_79.png?tr=w-100,q-20,bl-6" />
      <img alt="Zbageti #73" src="https://ik.imagekit.io/UltraDAO/wallace/zbageti_73.png?tr=w-100,q-20,bl-6" />
      <img alt="Zbageti #53" src="https://ik.imagekit.io/UltraDAO/wallace/zbageti_53.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Shapes on a Plane by Mount Vitruvius</h3>
    <div class="gallery-row gallery-triple-wide">
      <img alt="Shapes on a Plane #455" src="https://ik.imagekit.io/UltraDAO/wallace/shapes_on_a_plane_455.png?tr=w-100,q-20,bl-6" />
      <img alt="Shapes on a Plane #314" src="https://ik.imagekit.io/UltraDAO/wallace/shapes_on_a_plane_314.png?tr=w-100,q-20,bl-6" />
      <img alt="Shapes on a Plane #466" src="https://ik.imagekit.io/UltraDAO/wallace/shapes_on_a_plane_466.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Obscured by Nadieh Bremer</h3>
    <div class="gallery-row gallery-triple-wide">
      <img alt="Obscured 02f0" src="https://ik.imagekit.io/UltraDAO/wallace/obscured_02f0.png?tr=w-100,q-20,bl-6" />
      <img alt="Obscured 3d53" src="https://ik.imagekit.io/UltraDAO/wallace/obscured_3d53.png?tr=w-100,q-20,bl-6" />
      <img alt="Obscured 43f3" src="https://ik.imagekit.io/UltraDAO/wallace/obscured_43f3.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Deconstructions by DistCollective</h3>
    <div class="gallery-row gallery-triple-wide">
      <img alt="Deconstructions #43" src="https://ik.imagekit.io/UltraDAO/wallace/deconstructions_43.png?tr=w-100,q-20,bl-6" />
      <img alt="Deconstructions #217" src="https://ik.imagekit.io/UltraDAO/wallace/deconstructions_217.png?tr=w-100,q-20,bl-6" />
      <img alt="Deconstructions #224" src="https://ik.imagekit.io/UltraDAO/wallace/deconstructions_224.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Chepertom</h3>
    <div class="gallery-row gallery-triple-wide">
      <img alt="Circuit_Bending_3.RAD" src="https://ik.imagekit.io/UltraDAO/wallace/circuit_bending_3_rad.png?tr=w-100,q-20,bl-6" />
      <img alt="Purple.RAD" src="https://ik.imagekit.io/UltraDAO/wallace/purple_rad.png?tr=w-100,q-20,bl-6" />
      <img alt="16.RAD" src="https://ik.imagekit.io/UltraDAO/wallace/16_rad.jpg?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Assembling Machine by Tyler Boswell</h3>
    <div class="gallery-row gallery-triple-wide">
      <img alt="ASSEMBLING MACHINE #243" src="https://ik.imagekit.io/UltraDAO/wallace/assembling_machine_243.png?tr=w-100,q-20,bl-6" />
      <img alt="ASSEMBLING MACHINE #134" src="https://ik.imagekit.io/UltraDAO/wallace/assembling_machine_134.png?tr=w-100,q-20,bl-6" />
      <img alt="ASSEMBLING MACHINE #76" src="https://ik.imagekit.io/UltraDAO/wallace/assembling_machine_76.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Impressions of Order by nbswwit</h3>
    <div class="gallery-row gallery-triple-wide">
      <img alt="Impressions of Order #79" src="https://ik.imagekit.io/UltraDAO/wallace/impressions_of_order_79.png?tr=w-100,q-20,bl-6" />
      <img alt="Impressions of Order #113" src="https://ik.imagekit.io/UltraDAO/wallace/impressions_of_order_113.png?tr=w-100,q-20,bl-6" />
      <img alt="Impressions of Order #215" src="https://ik.imagekit.io/UltraDAO/wallace/impressions_of_order_215.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Creatures by Florian Zumbrunn</h3>
    <div class="gallery-row gallery-double-wide">
      <img alt="Creatures #141" src="https://ik.imagekit.io/UltraDAO/wallace/creatures_141.png?tr=w-100,q-20,bl-6" />
      <img alt="Creatures #127" src="https://ik.imagekit.io/UltraDAO/wallace/creatures_127.png?tr=w-100,q-20,bl-6" />
      <img alt="Creatures #191" src="https://ik.imagekit.io/UltraDAO/wallace/creatures_191.png?tr=w-100,q-20,bl-6" />
      <img alt="Creatures #113" src="https://ik.imagekit.io/UltraDAO/wallace/creatures_113.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Emotional Shell by William Watkins</h3>
    <div class="gallery-row gallery-triple-wide">
      <img alt="Emotional Shell #166" src="https://ik.imagekit.io/UltraDAO/wallace/emotional_shell_166.png?tr=w-100,q-20,bl-6" />
      <img alt="Emotional Shell #182" src="https://ik.imagekit.io/UltraDAO/wallace/emotional_shell_182.png?tr=w-100,q-20,bl-6" />
      <img alt="Emotional Shell #196" src="https://ik.imagekit.io/UltraDAO/wallace/emotional_shell_196.png?tr=w-100,q-20,bl-6" />
    </div>
    <div class="gallery-row gallery-double-wide">
      <div>
        <h3 class="collection-title">Crude Figures by Kjetil Golid</h3>
        <img alt="Crude Figures" src="https://ik.imagekit.io/UltraDAO/wallace/crude_figures.png?tr=w-100,q-20,bl-6" />
      </div>
      <div>
        <h3 class="collection-title">STRINGS PROTOTYPE #13 by IX Shells</h3>
        <img alt="STRINGS PROTOTYPE :::..._ #13/20" src="https://ik.imagekit.io/UltraDAO/wallace/strings_prototype_13_20.png?tr=w-100,q-20,bl-6" />
      </div>
    </div>
    <div class="gallery-row gallery-double-wide">
      <div>
        <h3 class="collection-title">Nothing Remains #63 by Brendan Dawes</h3>
        <img alt="Nothing Remains #63"
          class="sc-a7460964-0 flHabD" src="https://ik.imagekit.io/UltraDAO/wallace/nothing_remains_63.png?tr=w-100,q-20,bl-6" />
      </div>
      <div>
        <h3 class="collection-title">Bardez #149 by Nat Sarkissian</h3>
        <img alt="Bardez #149"
          class="sc-a7460964-0 flHabD" src="https://ik.imagekit.io/UltraDAO/wallace/bardez_149.png?tr=w-100,q-20,bl-6" />
      </div>
    </div>
    <h3 class="collection-title">Microgravity by Ryan Bell</h3>
    <div class="gallery-row gallery-triple-wide">
      <img alt="Microgravity #268" src="https://ik.imagekit.io/UltraDAO/wallace/microgravity_268.png?tr=w-100,q-20,bl-6" />
      <img alt="Microgravity #531" src="https://ik.imagekit.io/UltraDAO/wallace/microgravity_531.png?tr=w-100,q-20,bl-6" />
      <img alt="Microgravity #713" src="https://ik.imagekit.io/UltraDAO/wallace/microgravity_713.png?tr=w-100,q-20,bl-6" />
      <img alt="Microgravity #1099" src="https://ik.imagekit.io/UltraDAO/wallace/microgravity_1099.png?tr=w-100,q-20,bl-6" />
      <img alt="Microgravity #1214" src="https://ik.imagekit.io/UltraDAO/wallace/microgravity_1214.png?tr=w-100,q-20,bl-6" />
      <img alt="Microgravity #360" src="https://ik.imagekit.io/UltraDAO/wallace/microgravity_360.png?tr=w-100,q-20,bl-6" />
    </div>
    <div
      class="gallery-row sm:flex gap-2 sm:gap-4 mb-12 sm:mb-24 sm:visible hidden"
    >
      <div class="mb-12 sm:mb-0" style="flex: 1">
        <h3 class="collection-title">Etched Sinuosity #2 by Saskia Freeke</h3>
        <iframe
          allow="accelerometer; camera; gyroscope; microphone; xr-spatial-tracking; midi;"
          class="aspect-square w-full live-code"
          data-src="https://ipfs.io/ipfs/QmbdemW25i8uqXa4okK5jKXP3EDvezeT27tfEgoZcK8shZ/"
          sandbox="allow-scripts allow-downloads allow-same-origin"
          scrolling=""
        >
        </iframe>
      </div>
      <div style="flex: 1">
        <h3 class="collection-title">
          Fluctuating Paragon #3 by Saskia Freeke
        </h3>
        <iframe
          allow="accelerometer; camera; gyroscope; microphone; xr-spatial-tracking; midi;"
          class="aspect-square w-full live-code"
          data-src="https://ipfs.io/ipfs/QmZoGW3fJhgm5j5ijBK31rWFwJ1CYvkFDBXxwmfPX6bKyQ/"
          sandbox="allow-scripts allow-downloads allow-same-origin"
          scrolling=""
        >
        </iframe>
      </div>
    </div>
    <div class="gallery-row sm:flex gap-2 sm:gap-4 mb-12 sm:mb-24">
      <div class="mb-12 sm:mb-0" style="flex: 0.8">
        <h3 class="collection-title">
          Asemica #632 by Emily Edelman, Dima Ofman, Andrew Badr
        </h3>
        <img alt="Asemica #632" src="https://ik.imagekit.io/UltraDAO/wallace/asemica_632.png?tr=w-100,q-20,bl-6" />
      </div>
      <div style="flex: 0.714">
        <h3 class="collection-title">
          Inland Emotions #22 by Ferdinand Dervieux
        </h3>
        <img alt="Inland Emotions #22" src="https://ik.imagekit.io/UltraDAO/wallace/inland_emotions_22.png?tr=w-100,q-20,bl-6" />
      </div>
    </div>
    <h3 class="collection-title">Hypertype by Mark Webster</h3>
    <div class="gallery-row gallery-double-wide">
      <img alt="Hypertype #124" src="https://ik.imagekit.io/UltraDAO/wallace/hypertype_124.png?tr=w-100,q-20,bl-6" />
      <img alt="Hypertype #57" src="https://ik.imagekit.io/UltraDAO/wallace/hypertype_57.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Hyperspacers by Stranger in the Q</h3>
    <div class="gallery-row gallery-double-wide">
      <img alt="Hyperspacers #335" src="https://ik.imagekit.io/UltraDAO/wallace/hyperspacers_335.png?tr=w-100,q-20,bl-6" />
      <img alt="Hyperspacers #334" src="https://ik.imagekit.io/UltraDAO/wallace/hyperspacers_334.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">adrift by Jacek Markusiewicz</h3>
    <div class="gallery-row gallery-double-wide">
      <img alt="adrift #146"
        class="sc-a7460964-0 flHabD" src="https://ik.imagekit.io/UltraDAO/wallace/adrift_146.png?tr=w-100,q-20,bl-6" />
      <img alt="adrift #228"
        class="sc-a7460964-0 flHabD" src="https://ik.imagekit.io/UltraDAO/wallace/adrift_228.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">
      RGB Elementary Cellular Automaton by Ciphrd
    </h3>
    <div class="gallery-row gallery-double-wide">
      <img alt="RGB Elementary Cellular Automaton #366" src="https://ik.imagekit.io/UltraDAO/wallace/rgb_elementary_cellular_automaton_366.png?tr=w-100,q-20,bl-6" />
      <img alt="RGB Elementary Cellular Automaton #474" src="https://ik.imagekit.io/UltraDAO/wallace/rgb_elementary_cellular_automaton_474.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Caesuras / Casey Reas</h3>
    <div class="gallery-row gallery-double-wide">
      <img alt="CSRSNT-ZAAI-23-of-64.png" src="https://ik.imagekit.io/UltraDAO/wallace/csrsnt_zaai_23_of_64_png.png?tr=w-100,q-20,bl-6" />
      <img alt="CSRSNT-QAAI-18-of-32.png" src="https://ik.imagekit.io/UltraDAO/wallace/csrsnt_qaai_18_of_32_png.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Punktwelt by Erik Swahn</h3>
    <div class="gallery-row gallery-double-wide">
      <img alt="Punktwelt #420" src="https://ik.imagekit.io/UltraDAO/wallace/punktwelt_420.png?tr=w-100,q-20,bl-6" />
      <img alt="Punktwelt #556" src="https://ik.imagekit.io/UltraDAO/wallace/punktwelt_556.png?tr=w-100,q-20,bl-6" />
    </div>
    <div class="sm:block hidden">
      <h3 class="collection-title">Primitives by Aranda/Lasch</h3>
      <div class="gallery-row gallery-double-wide">
        <iframe
          class="aspect-square w-full live-code"
          data-src="https://generator.artblocks.io/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/368000242"
          sandbox="allow-scripts allow-same-origin"
        >
        </iframe>
        <iframe
          class="aspect-square w-full live-code"
          data-src="https://generator.artblocks.io/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/368000049"
          sandbox="allow-scripts allow-same-origin"
        >
        </iframe>
      </div>
    </div>
    <h3 class="collection-title">Hypergiraffes by Piter Pasma</h3>
    <div class="gallery-row gallery-double-wide">
      <img alt="Hypergiraffe #151"
        class="sc-a7460964-0 flHabD" src="https://ik.imagekit.io/UltraDAO/wallace/hypergiraffe_151.png?tr=w-100,q-20,bl-6" />
      <img alt="Hypergiraffe #150"
        class="sc-a7460964-0 flHabD" src="https://ik.imagekit.io/UltraDAO/wallace/hypergiraffe_150.png?tr=w-100,q-20,bl-6" />
    </div>
    <div class="gallery-row gallery-double-wide">
      <div>
        <h3 class="collection-title">
          Computational Specimen No. 2 by Sarah Ridgley
        </h3>
        <img alt="Computational Specimen No. 2" src="https://ik.imagekit.io/UltraDAO/wallace/computational_specimen_no_2.png?tr=w-100,q-20,bl-6" />
      </div>
      <div>
        <h3 class="collection-title">Anthropogeny by Claire Silver</h3>
        <img alt="Claire Silver - Anthropogeny" src="https://ik.imagekit.io/UltraDAO/wallace/claire_silver_anthropogeny.png?tr=w-100,q-20,bl-6" />
      </div>
    </div>
    <div>
      <h3 class="collection-title">Matthias Isaaksen</h3>
      <div class="gallery-row gallery-flex">
        <div style="flex: 1">
          <img alt="Extramundane" src="https://ik.imagekit.io/UltraDAO/wallace/extramundane.jpg?tr=w-100,q-20,bl-6" />
        </div>
        <div style="flex: 0.8">
          <img alt="Inside World" src="https://ik.imagekit.io/UltraDAO/wallace/inside_world.png?tr=w-100,q-20,bl-6" />
        </div>
        <div style="flex: 0.6611865">
          <img alt="In Disharmony, New Found Freedom" src="https://ik.imagekit.io/UltraDAO/wallace/in_disharmony_new_found_freedom.jpg?tr=w-100,q-20,bl-6" />
        </div>
      </div>
    </div>
    <h3 class="collection-title">Factura by Matthias Isaaksen</h3>
    <div class="gallery-row gallery-quadruple-wide">
      <img alt="Factura #402" src="https://ik.imagekit.io/UltraDAO/wallace/factura_402.png?tr=w-100,q-20,bl-6" />
      <img alt="Factura #842" src="https://ik.imagekit.io/UltraDAO/wallace/factura_842.png?tr=w-100,q-20,bl-6" />
      <img alt="Factura #996" src="https://ik.imagekit.io/UltraDAO/wallace/factura_996.png?tr=w-100,q-20,bl-6" />
      <img alt="Factura #252" src="https://ik.imagekit.io/UltraDAO/wallace/factura_252.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Mind the Gap by MountVitruvius</h3>
    <div class="gallery-row gallery-triple-wide">
      <img alt="Mind the Gap #490" src="https://ik.imagekit.io/UltraDAO/wallace/mind_the_gap_490.png?tr=w-100,q-20,bl-6" />
      <img alt="Mind the Gap #189" src="https://ik.imagekit.io/UltraDAO/wallace/mind_the_gap_189.png?tr=w-100,q-20,bl-6" />
      <img alt="Mind the Gap #114" src="https://ik.imagekit.io/UltraDAO/wallace/mind_the_gap_114.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">
      de|growth:generations by Jacek Markusiewicz
    </h3>
    <div class="gallery-row gallery-triple-wide">
      <img alt="de|growth:generations #68" src="https://ik.imagekit.io/UltraDAO/wallace/de_growth_generations_68.png?tr=w-100,q-20,bl-6" />
      <img alt="de|growth:generations #106" src="https://ik.imagekit.io/UltraDAO/wallace/de_growth_generations_106.png?tr=w-100,q-20,bl-6" />
      <img alt="de|growth:generations #53" src="https://ik.imagekit.io/UltraDAO/wallace/de_growth_generations_53.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Elevation by Andreas Rau</h3>
    <div class="gallery-row gallery-triple-wide">
      <img alt="Elevation #257" src="https://ik.imagekit.io/UltraDAO/wallace/elevation_257.png?tr=w-100,q-20,bl-6" />
      <img alt="Elevation #79" src="https://ik.imagekit.io/UltraDAO/wallace/elevation_79.png?tr=w-100,q-20,bl-6" />
      <img alt="Elevation #124" src="https://ik.imagekit.io/UltraDAO/wallace/elevation_124.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Millefoglie by Stefan Contiero</h3>
    <div class="gallery-row gallery-double-wide">
      <img alt="Millefoglie #169" src="https://ik.imagekit.io/UltraDAO/wallace/millefoglie_169.png?tr=w-100,q-20,bl-6" />
      <img alt="Millefoglie #104" src="https://ik.imagekit.io/UltraDAO/wallace/millefoglie_104.png?tr=w-100,q-20,bl-6" />
    </div>
    <div>
      <h3 class="collection-title">Fields by Erik Swahn</h3>
      <div class="gallery-row gallery-flex">
        <div style="flex: 1">
          <img alt="Fields #648" src="https://ik.imagekit.io/UltraDAO/wallace/fields_648.png?tr=w-100,q-20,bl-6" />
        </div>
        <div style="flex: 1.6">
          <img alt="Fields #695" src="https://ik.imagekit.io/UltraDAO/wallace/fields_695.png?tr=w-100,q-20,bl-6" />
        </div>
      </div>
    </div>
    <div class="sm:block hidden">
      <h3 class="collection-title">Cathedral Study by Eric di Giuli</h3>
      <div class="gallery-row gallery-double-wide">
        <iframe
          class="aspect-square w-full live-code"
          data-src="https://generator.artblocks.io/0x1353fd9d3dc70d1a18149c8fb2adb4fb906de4e8/6000377"
          sandbox="allow-scripts allow-same-origin"
        >
        </iframe>
        <iframe
          class="aspect-square w-full live-code"
          data-src="https://generator.artblocks.io/0x1353fd9d3dc70d1a18149c8fb2adb4fb906de4e8/6000363"
          sandbox="allow-scripts allow-same-origin"
        >
        </iframe>
      </div>
    </div>
    <div class="sm:block hidden">
      <h3 class="mb-0">Ir/rational Beauty by Yazid</h3>
      <div class="gallery-row gallery-flex">
        <iframe
          class="aspect-[3/4] live-code"
          data-src="https://gateway.fxhash2.xyz/ipfs/Qme5QKF1t4AbpGDMKQjWfyx8v8YLG1gyk55aA6evFyuaVM/?fxhash=ooMkJ1sbnrjd1rU25bUmuKjHUAqU3s1AEZA3KypMiHcLjM5uGes&amp;fxiteration=107&amp;fxminter=tz1ZFsnAQ8UorVbyiMcTP63djTMDcj3rrSc3"
          sandbox="allow-scripts allow-same-origin"
          style="flex: 0.833125"
        >
        </iframe>
        <iframe
          class="aspect-[4/3] live-code"
          data-src="https://gateway.fxhash2.xyz/ipfs/Qme5QKF1t4AbpGDMKQjWfyx8v8YLG1gyk55aA6evFyuaVM/?fxhash=ooz5Rf6wR1CkCNPWY3hdDrNThjfy7gHfBRVfzHjyd9W2z1AE2nF&amp;fxiteration=65&amp;fxminter=tz1gLeXAGc1Rho2UTE246xD26SapeyztMF8E"
          sandbox="allow-scripts allow-same-origin"
          style="flex: 1.6194332"
        >
        </iframe>
      </div>
    </div>
    <h3 class="collection-title">Tych by rudxane</h3>
    <div class="gallery-row gallery-triple-wide">
      <img alt="Tych #185" src="https://ik.imagekit.io/UltraDAO/wallace/tych_185.png?tr=w-100,q-20,bl-6" />
      <img alt="Tych #309" src="https://ik.imagekit.io/UltraDAO/wallace/tych_309.png?tr=w-100,q-20,bl-6" />
      <img alt="Tych #190" src="https://ik.imagekit.io/UltraDAO/wallace/tych_190.png?tr=w-100,q-20,bl-6" />
      <img alt="Tych #176" src="https://ik.imagekit.io/UltraDAO/wallace/tych_176.png?tr=w-100,q-20,bl-6" />
      <img alt="Tych #99" src="https://ik.imagekit.io/UltraDAO/wallace/tych_99.png?tr=w-100,q-20,bl-6" />
      <img alt="Tych #305" src="https://ik.imagekit.io/UltraDAO/wallace/tych_305.png?tr=w-100,q-20,bl-6" />
      <img alt="Tych #123" src="https://ik.imagekit.io/UltraDAO/wallace/tych_123.png?tr=w-100,q-20,bl-6" />
      <img alt="Tych #195" src="https://ik.imagekit.io/UltraDAO/wallace/tych_195.png?tr=w-100,q-20,bl-6" />
      <img alt="Tych #91" src="https://ik.imagekit.io/UltraDAO/wallace/tych_91.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Tesseract by Studio Yorktown</h3>
    <div class="gallery-row gallery-quadruple-wide">
      <img alt="Tesseract #365" src="https://ik.imagekit.io/UltraDAO/wallace/tesseract_365.png?tr=w-100,q-20,bl-6" />
      <img alt="Tesseract #431" src="https://ik.imagekit.io/UltraDAO/wallace/tesseract_431.png?tr=w-100,q-20,bl-6" />
      <img alt="Tesseract #369" src="https://ik.imagekit.io/UltraDAO/wallace/tesseract_369.png?tr=w-100,q-20,bl-6" />
      <img alt="Tesseract #388" src="https://ik.imagekit.io/UltraDAO/wallace/tesseract_388.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Catharsis by Dario Lanza</h3>
    <div class="gallery-row gallery-quadruple-wide">
      <img alt="Catharsis #633 - This Is Always" src="https://ik.imagekit.io/UltraDAO/wallace/catharsis_633_this_is_always.png?tr=w-100,q-20,bl-6" />
      <img alt="Catharsis #468 - Pick Up Sticks" src="https://ik.imagekit.io/UltraDAO/wallace/catharsis_468_pick_up_sticks.png?tr=w-100,q-20,bl-6" />
      <img alt="Catharsis #711 - I'm Yours" src="https://ik.imagekit.io/UltraDAO/wallace/catharsis_711_i_m_yours.png?tr=w-100,q-20,bl-6" />
      <img alt="Catharsis #100 - Away in a Manger" src="https://ik.imagekit.io/UltraDAO/wallace/catharsis_100_away_in_a_manger.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">For Algernon by Elsif</h3>
    <div class="gallery-row gallery-quadruple-wide">
      <img alt="For Algernon #207" src="https://ik.imagekit.io/UltraDAO/wallace/for_algernon_207.png?tr=w-100,q-20,bl-6" />
      <img alt="For Algernon #223" src="https://ik.imagekit.io/UltraDAO/wallace/for_algernon_223.png?tr=w-100,q-20,bl-6" />
      <img alt="For Algernon #170" src="https://ik.imagekit.io/UltraDAO/wallace/for_algernon_170.png?tr=w-100,q-20,bl-6" />
      <img alt="For Algernon #248" src="https://ik.imagekit.io/UltraDAO/wallace/for_algernon_248.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">Morphology by Emily Xie</h3>
    <div class="gallery-row gallery-double-wide">
      <img alt="LUNA" src="https://ik.imagekit.io/UltraDAO/wallace/luna.png?tr=w-100,q-20,bl-6" />
      <img alt="Shield" src="https://ik.imagekit.io/UltraDAO/wallace/shield.png?tr=w-100,q-20,bl-6" />
    </div>
    <h3 class="collection-title">unbuilt by Jacek Markusiewicz</h3>
    <div class="gallery-row gallery-quadruple-wide-trip-small">
      <img alt="unbuilt #238" src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_238.png?tr=w-100,q-20,bl-6" />
      <img alt="unbuilt #176" src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_176.png?tr=w-100,q-20,bl-6" />
      <img alt="unbuilt #206" src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_206.png?tr=w-100,q-20,bl-6" />
      <img alt="unbuilt #154" src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_154.png?tr=w-100,q-20,bl-6" />
      <img alt="unbuilt #200" src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_200.png?tr=w-100,q-20,bl-6" />
      <img alt="unbuilt #240" src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_240.png?tr=w-100,q-20,bl-6" />
      <img alt="unbuilt #19" src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_19.png?tr=w-100,q-20,bl-6" />
      <img alt="unbuilt #218" src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_218.png?tr=w-100,q-20,bl-6" />
      <img alt="unbuilt #248" src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_248.png?tr=w-100,q-20,bl-6" />
      <img alt="unbuilt #190" src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_190.png?tr=w-100,q-20,bl-6" />
      <img alt="unbuilt #43" src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_43.png?tr=w-100,q-20,bl-6" />
      <img alt="unbuilt #197" src="https://ik.imagekit.io/UltraDAO/wallace/unbuilt_197.png?tr=w-100,q-20,bl-6" />
    </div>

  </div>
</article>

<div id="fullscreen-viewer" class="hidden"></div>
