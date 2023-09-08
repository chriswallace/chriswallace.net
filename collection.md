---
layout: default
title: The Wallace Collection
description: A selection of generative artworks currently held in my family's private collection on the Tezos and Ethereum blockchains. These code-powered works are represented mostly in static images, however some pieces are live code to attempt a faithful reproduction of the intended artistic output where possible.
permalink: /art/collection/
---

<script>
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
    img.addEventListener('mouseover', function(event) {
      const altText = this.getAttribute('alt');
      if (altText) {
        tooltip.textContent = altText;
        tooltip.style.display = 'block';
      }
    });

    img.addEventListener('mousemove', function(event) {
      tooltip.style.left = event.pageX + 10 + 'px';
      tooltip.style.top = event.pageY + 10 + 'px';
    });

    img.addEventListener('mouseout', function() {
      tooltip.style.display = 'none';
    });
  });
});
</script>
<article>

<a href="/art" class="back-btn">Art</a>

<h1>The Wallace Collection</h1>

<p class="sub-heading">A selection of generative artworks currently held in my family's private collection on the Tezos and Ethereum blockchains. These code-powered works are represented mostly in static images, however some pieces are live code to attempt a faithful reproduction of the intended artistic output where possible.</p>

<hr>

<div>
    <h3 class="collection-title">Manolo Gamboa Naon</h3>
    <div class="gallery-flex">
        <div style="flex: 1;">
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-9fe7-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685693791&amp;w=1024&amp;s=09b7e581d85382e19d6f37db7456c724" alt="Tempo de Amor" loading="lazy">
        </div>
        <div style="flex: 1;">
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-a505-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-animation?auto=format%2Ccompress&amp;fit=max&amp;glryts=1691540384&amp;w=1024&amp;s=2559b82ad035ad28ea0e8732bf4f1852" alt="en llamas" loading="lazy">
        </div>
        <div style="flex: 1.50146628;">
            <img class="sc-a7460964-0 flHabD" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-b3ab-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685693324&amp;w=1024&amp;s=e2374169937be59305cf0213c7432d16" alt="furia" loading="lazy">
        </div>
    </div>
    <div class="gallery-double-wide">
        <div>
            <h3 class="collection-title">Reticulum by Harvey Rayner</h3>
            <img src="/assets/images/collection/bfe6982b96849db4c3731c4e9ad6efa9.jpg" alt="Reticulum by Harvey Rayner" loading="lazy">
        </div>
        <div>
            <h3 class="collection-title">Dragons #489 by William Mapan</h3>
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-1ffd7-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684247027&amp;w=1024&amp;s=76510d07d9e36b365ced0afd95e170eb" alt="Dragons #489" loading="lazy">
        </div>
    </div>
    <div class="gallery-double-wide">
        <div>
            <h3 class="collection-title">QQL #94 by Tyler Hobbs and Dandelion Wist</h3>
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-5e-0x845dd2a7ee2a92a0518ab2135365ed63fdba0c88-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685116086&amp;w=1024&amp;s=e0d6d164a737090f7c0c15aacfc28e21" alt="QQL #94" loading="lazy">
        </div>
        <div>
            <h3 class="collection-title">Acequia #219 by Rich Poole and Rick Crane</h3>
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-137237-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684247024&amp;w=1024&amp;s=e9b0cdd6a0cc6766485a4aa7ab70f0d6" alt="Acequia #219" loading="lazy">
        </div>
    </div>
    <div class="sm:flex gap-2 sm:gap-4 mb-12 sm:mb-24">
        <div style="flex: 1.77774687;" class="mb-12 sm:mb-0">
            <h3 class="collection-title">kaiC by p1xelfool</h3>
            <img _ngcontent-vdp-c97="" src="https://ipfs.io/ipfs/QmUYBMZshxre8Gc99BzgD68MhHGWqyhhk3xFeeTY7RzYxh/" alt="kaiC">
        </div>
        <div style="flex:1;">
            <h3 class="collection-title">8 18 54 51 by Kim Asendorf</h3>
            <img class="w-full h-auto" src="/assets/images/collection/8-18-54-51.gif" alt="8 18 54 51" loading="lazy">
        </div>
    </div>
    <h3 class="collection-title">Quasi Dragon Studies by Harvey Rayner</h3>
    <div class="gallery-flex">
        <div style="flex: 0.8661133;">
            <img src="/assets/images/collection/generate-preview_a7893293-2a16-4cd1-8909-1a0b71163de3.png" alt="Quasi Dragon Studies #252" loading="lazy">
        </div>
        <div style="flex: 0.2886666;">
            <img src="/assets/images/collection/generate-preview_4ce2f068-9bf1-4aa8-845a-1514d8c49e99.png" alt="Quasi Dragon Studies #255" loading="lazy">
        </div>
        <div style="flex: 0.2886666;">
            <img src="/assets/images/collection/generate-preview_70205dd1-e715-460d-8a54-d2152013774b.png" alt="Quasi Dragon Studies #254" loading="lazy">
        </div>
    </div>
    <h3 class="collection-title">Michaël Zancan</h3>
    <div class="gallery-double-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-23ac1-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684211701&amp;w=1024&amp;s=255f0e7795081acb279d8a672d97cb14" alt="Garden, Monoliths #125" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-91dea-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1691890930&amp;w=1024&amp;s=b39a116dcafff39ba0a2855b2f264bf9" alt="(kinder)Garden, Monuments #23" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-d9edc-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684231008&amp;w=1024&amp;s=3b055456a45d6bf60deb43888c2b5aba" alt="A Bugged Forest #169" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-c05d8-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1691890934&amp;w=1024&amp;s=0865ade685208d61f8685de1dd8533b6" alt="Everything, made simple" loading="lazy">
    </div>
    <h3 class="collection-title">Piter Pasma</h3>
    <div class="gallery-double-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-337aa-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210053&amp;w=1024&amp;s=d473e34469469bd649b81dd1f01a01ee" alt="Chaos Candy Plasma Vent" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-8dd9-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-animation?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210141&amp;w=1024&amp;s=8edb5bf32704316776c299438851fcda" alt="Neutron amusement park" loading="lazy">
    </div>
    <h3 class="collection-title">Contrapuntos by Marcelo Soria-Rodríguez</h3>
    <div class="gallery-triple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-7be2-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684233747&amp;w=1024&amp;s=dd0295e62b5324fe269768a65fab9c7f" alt="contrapuntos #364" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-aa07-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684229228&amp;w=1024&amp;s=028d6581bba5ee64c28234b73a50ed6f" alt="contrapuntos #500" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-7c17-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210139&amp;w=1024&amp;s=edbaf3e19b6f8337c4cd6a7f49babeba" alt="contrapuntos #367" loading="lazy">
    </div>
    <h3 class="collection-title">Bravura by dmarchi</h3>
    <div class="gallery-triple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-6b4ab-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210120&amp;w=1024&amp;s=952e211039626f284dea98e01372d723" alt="Bravura #90" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-6b4a3-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210235&amp;w=1024&amp;s=d878e6ac145a412a612b54658ce87c66" alt="Bravura #82" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-6b4a2-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210216&amp;w=1024&amp;s=2b2605a0e2b9c65b459cdb710030344d" alt="Bravura #81" loading="lazy">
    </div>
    <h3 class="collection-title">Gerhard and Richter by Richard Nadler and Leander Herzog</h3>
    <div class="gallery-double-wide">
        <iframe src="https://gateway.fxhash2.xyz/ipfs/QmW7Cj5QMG2FFVGMcRKGFhW4V1113seN6iX5FwQrKqTHSM/?fxhash=oo3iCxnjsGQU6Jx4xZpf4Zfc3EPoXWkYhsqXTyGwnGQQKWUjrDB&fxiteration=368&fxminter=tz1Yw6YSydH7qb4vERwxAmSnsihfRcVvnLL3" sandbox="allow-scripts allow-same-origin allow-modals" class="aspect-square w-full" allow="accelerometer *; camera *; gyroscope *; microphone *; xr-spatial-tracking *;"></iframe>
        <iframe src="https://gateway.fxhash2.xyz/ipfs/QmQzbsQM9hd6vc821LmpHCkLXv18fZfhbJf6ygyVhqWB5a/?fxhash=opQ7z15XLoNzWauyGgashqrsyB6zenAjUHpPBAsvMe6dknwj4JQ&fxiteration=399&fxminter=tz1Ym9Ued9v2N2wwsrtQ52HRGGn7qDmzuUZU" sandbox="allow-scripts allow-same-origin allow-modals" class="aspect-square w-full" allow="accelerometer *; camera *; gyroscope *; microphone *; xr-spatial-tracking *;"></iframe>
    </div>
    <h3 class="collection-title">Entretiempos by Marcelo Soria-Rodríguez</h3>
    <div class="gallery-quadruple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-fea1c21-0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685114871&amp;w=1024&amp;s=25c52dbb29ec896d5957a065c51c44a4" alt="entretiempos #865" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-fea1b72-0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115459&amp;w=1024&amp;s=7e4bbb08932e92a90c91750cba334431" alt="entretiempos #690" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-fea1b4e-0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115827&amp;w=1024&amp;s=fa46252de2dce87b7e089af29b7c26ed" alt="entretiempos #654" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-fea1a85-0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115871&amp;w=1024&amp;s=7485848d6b4f2df1499f51e73b868843" alt="entretiempos #453" loading="lazy">
    </div>
    <h3 class="collection-title">Escape by Iskra Velitchkova</h3>
    <div class="gallery-double-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-ff-0xf5683d319dd306b5e438c5f6b183325925eb8480-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115130&amp;w=1024&amp;s=7b854a91b851f3f660ec03b36a03c9ad" alt="Escape #255" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-91-0xf5683d319dd306b5e438c5f6b183325925eb8480-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1691709409&amp;w=1024&amp;s=bc1a46aef639597756b4763854c415fb" alt="Escape #145" loading="lazy">
    </div>
    <h3 class="collection-title">Helena Sarin</h3>
    <div class="gallery-quadruple-wide">
        <div class="sm:col-span-2">
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-30-0x2c3b2af5ca4fc71f25f25d1d9292afdede5963e1-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685116122&amp;w=1024&amp;s=15e58abafad888141ab720a643799cf3" alt="Cats of Latentscaux" loading="lazy">
        </div>
        <div class="sm:col-span-2">
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-3669-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685693550&amp;w=1024&amp;s=9ff684d5aa14b9bc14c9591a9f7316d6" alt="Ping Pong, the Isolation Games" loading="lazy">
        </div>
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-163-0x48b17a2c46007471b3eb72d16268eaecdd1502b7-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115357&amp;w=1024&amp;s=cf6242ad77b8704b42d54bdc8fa04a61" alt="Inceptio Levis" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-2e6-0x48b17a2c46007471b3eb72d16268eaecdd1502b7-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685116094&amp;w=1024&amp;s=33047ecb6c5545b4f83b2d361838493e" alt="Stipula Praecox" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-302-0x48b17a2c46007471b3eb72d16268eaecdd1502b7-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685116127&amp;w=1024&amp;s=4c870eb175b865797385c2a6efaff8ab" alt="Susurro Lenis" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-23d-0x48b17a2c46007471b3eb72d16268eaecdd1502b7-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115510&amp;w=1024&amp;s=c81e173c27bdeeecdf6517723c193acd" alt="Rusticus Romaineus" loading="lazy">
    </div>
    <h3 class="collection-title">Iskra Velitchkova</h3>
    <div class="gallery-flex">
        <div style="flex: 1;">
            <img class="sc-a7460964-0 flHabD" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-ba2c6-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684815056&amp;q=100&amp;w=1024&amp;s=879f0103e8b0de4f4ed192383a0404fe" alt="🐥🪱 - A bird as if a worm as a bird as a worm | for Bird and Worm Society" loading="lazy">
        </div>
        <div style="flex:1.10583153;">
            <img class="sc-a7460964-0 flHabD" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-2d770-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684209563&amp;q=100&amp;w=1024&amp;s=5716c8070f2aa090ec97804859d3a017" alt="The very first B I R D S " loading="lazy">
        </div>
        <div style="flex:0.726756565;">
            <img class="sc-a7460964-0 flHabD" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-35313-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-animation?auto=format%2Ccompress&amp;fit=max&amp;glryts=1686053010&amp;w=1024&amp;s=a58f93644e4dcb0bd6e2b30364598dcd" alt="H20thB" loading="lazy">
        </div>
    </div>
    <div class="gallery-flex">
        <div style="flex: 1;">
            <img class="sc-a7460964-0 flHabD" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-2846-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-animation?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210161&amp;w=1024&amp;s=c5a04f7db553ef19d2a4d2d22c7a4f42" alt="GenerativO Sov I" loading="lazy">
        </div>
        <div style="flex: 1;">
            <img class="sc-a7460964-0 flHabD" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-284a-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-animation?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210129&amp;w=1024&amp;s=1f01462f8593c7e25888cee8b71f91da" alt="GenerativO Sov III" loading="lazy">
        </div>
    </div>
    <div class="gallery-flex">
        <div style="flex: 1;">
            <img class="sc-a7460964-0 flHabD" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-c85e7b5c36fc675ba5f02f4e9587021f1ad78d35cd443d4b77b5ade8a05f5747-0xd8eed224e1b358fa6f7b167124c2c1afe42275b4-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115738&amp;w=1024&amp;s=c69f0b218b9dc83de27bf0ad43e79654" alt="Hypothetically Micro #83" loading="lazy">
        </div>
        <div style="flex:2.01972387;">
            <img class="sc-a7460964-0 flHabD" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-85a36-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210135&amp;w=1024&amp;s=0fd221c34fcbbfcb4823be7f652b7cc2" alt="BOSKË" loading="lazy">
        </div>
    </div>
    <div>
        <h3 class="collection-title">Qubibi</h3>
        <div class="gallery-flex">
            <div style="flex: 1;">
                <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-22864-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-animation?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210134&amp;w=1024&amp;s=236b0ae0420da8085d104737b0bb8a4d" alt="MMZ ERRR 3 B" loading="lazy">
            </div>
            <div style="flex: 1;">
                <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-90-KT19rTtzjSczSjfmAx4dESY5BecDHKJwB8Ww-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1694184781&amp;w=1024&amp;s=7a398841d98b7beaf8ee6f7b3546d811" alt="230907s01cBp30003000" loading="lazy">
            </div>
        </div>
        <div class="gallery-flex">
            <div style="flex: 0.4;">
                <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-8f8fe-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210214&amp;w=1024&amp;s=4048347589513027ccd2bf1ff238955f" alt="MMZ 197 G" loading="lazy">
            </div>
            <div style="flex: 0.5;">
                <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-1f161ff8-0xc3ce0b793d15a4777f96afb4c03744c9a25583d0-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685116187&amp;w=1024&amp;s=13bd6fb0e8a2e040dbe0d07eac2f3742" alt="wwz uu15M7kj722Ho #51" loading="lazy">
            </div>
            <div style="flex: 0.710617627;">
                <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-7de69-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210115&amp;w=1024&amp;s=497548c4b0363c96d86dbf860160045a" alt="MMZ 188 D" loading="lazy">
            </div>
        </div>
        <div class="gallery-quadruple-wide">
            <img class="sm:col-span-2" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-8d-KT19rTtzjSczSjfmAx4dESY5BecDHKJwB8Ww-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1694183971&amp;w=1024&amp;s=fe70ee4e30f1c48ed41c52724b1e6427" alt="230830s19pQh37003700" loading="lazy">
            <img class="sm:col-span-2" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-22-KT19rTtzjSczSjfmAx4dESY5BecDHKJwB8Ww-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210241&amp;w=1024&amp;s=1daab1256969695039d0e2f7c19bf5bb" alt="220831k03zWf35003500" loading="lazy">
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-9a696-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210190&amp;w=1024&amp;s=3189c16d1bb7696e105c07728816b6fe" alt="MMZ 204 B" loading="lazy">
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-1d53d-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210216&amp;w=1024&amp;s=677e71fbe91876d34d8ea564361af19f" alt="MMZ 47" loading="lazy">
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-9a83c-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210130&amp;w=1024&amp;s=6011f16953462ab9d944d1e2a67ec83e" alt="MMZ 207 B" loading="lazy">
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-9a83e-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210184&amp;w=1024&amp;s=885d9ad8cc7a29b6a2269bc871a9f303" alt="MMZ 207 D" loading="lazy">
            <img class="sm:col-span-2" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-23172-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210139&amp;w=1024&amp;s=fe773b4a2499e39ef827d7b2103b05f7" alt="MMZ 64" loading="lazy">
            <img class="sm:col-span-2" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-7237c-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210213&amp;w=1024&amp;s=59ffb35d42773df3b78bee0a67d7aac5" alt="MMZ 181 A" loading="lazy">
        </div>
    </div>
    <h3 class="collection-title">Olivier Bodini</h3>
    <div class="gallery-double-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-19-KT1RuLAdLVitEae7EQMP6zFB98rsfeTbbyLE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210143&amp;w=1024&amp;s=0005a46f530559ad9bd57c118f776177" alt="The sky is so colorful tonight" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-200-0x5927ef9c92e47f87d1e76db2a9936f91ea24c88c-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115884&amp;w=1024&amp;s=7d75f164e0547865fd41d1baa73a3327" alt="A black sun over the war by Olivier Bodini" loading="lazy">
    </div>
    <h3 class="collection-title">Loom by Andreas Rau</h3>
    <div class="gallery-quadruple-wide-trip-small">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-4e8b-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210112&amp;w=1024&amp;s=05bdb2578755810f964b14ab0d86c845" alt="Loom #389" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-4f67-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210229&amp;w=1024&amp;s=e03525cad5b35b6bf5f894ae683ee985" alt="Loom #405" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-4f92-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1692062045&amp;w=1024&amp;s=9f85023c6533512d237d7f41351d6bc5" alt="Loom #412" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-4fe9-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210205&amp;w=1024&amp;s=278d4e221e648db1528be79dffe62b53" alt="Loom #421" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-42cf-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210210&amp;w=1024&amp;s=43db508702278e0598a7e9884b063087" alt="Loom #201" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-4f56-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210206&amp;w=1024&amp;s=fe657c59277cbcc780577c213310254b" alt="Loom #404" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-4f80-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684211703&amp;w=1024&amp;s=6d71f3d759d57c7219c25d3756b80929" alt="Loom #409" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-447e-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684211702&amp;w=1024&amp;s=491fcba3c38182e07a919a7cd6805e46" alt="Loom #232" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-4f9f-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1692062014&amp;w=1024&amp;s=70f828def06ef68e0da40f5c07b924e2" alt="Loom #414" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-3c54-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210132&amp;w=1024&amp;s=d0341f22244478da7480671b8e40ef66" alt="Loom #113" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-3fb4-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210139&amp;w=1024&amp;s=165230f8200753773f01981b442e2a01" alt="Loom #163" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-500a-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210148&amp;w=1024&amp;s=8fe840875d5cce40f65dee5901836e00" alt="Loom #424" />
    </div>
    <h3 class="collection-title">Unfolded by Lars Wander</h3>
    <div class="gallery-six-wide">
        <div class="col-span-3">
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-26108-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210208&amp;w=1024&amp;s=7fccfb4f6d9989cc3ab91b2b86e240fb" alt="Unfolded #3" loading="lazy">
        </div>
        <div class="col-span-3">
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-26122-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210233&amp;w=1024&amp;s=963e007d5c860bf7f013ad93498dd021" alt="Unfolded #20" loading="lazy">
        </div>
        <img class="col-span-2" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-26163-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210113&amp;w=1024&amp;s=01c9ca371b94cf37418c31dbde6e0458" alt="Unfolded #74" loading="lazy">
        <img class="col-span-2" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-26147-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210138&amp;w=1024&amp;s=54fb816920e03222ae9d15d7355eeb7a" alt="Unfolded #52" loading="lazy">
        <img class="col-span-2" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-2610e-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210141&amp;w=1024&amp;s=4b73647c3cd397d0ba1b16107174a2ad" alt="Unfolded #5" loading="lazy">
    </div>
    <div class="sm:flex gap-2 sm:gap-4 mb-12 sm:mb-24">
        <div class="mb-12 sm:mb-0" style="flex: 1;">
            <h3 class="collection-title">Acoustic Drift by Joshua Bagley</h3>
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-132f2-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-animation?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684209897&amp;w=1024&amp;s=5ebc50fabd72d5f70b0de14f632d0dc3" alt="Acoustic Drift" loading="lazy">
        </div>
        <div class="mb-12 sm:mb-0" style="flex: 1;">
            <h3 class="collection-title">Fold #223 by rudxane</h3>
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-f431f-0xaf40b66072fe00cacf5a25cd1b7f1688cde20f2f-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1691510432&amp;w=1024&amp;s=2385cffd309796daf75e9c9988175e80" alt="Fold #223" loading="lazy">
        </div>
        <div class="mb-12 sm:mb-0" style="flex: 1;">
            <h3 class="collection-title">Diverse Mix by Thomas Lin Pedersen</h3>
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-ae83-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685694228&amp;w=1024&amp;s=8566dddce25fa71268b825df0bb68971" alt="Diverse Mix" loading="lazy">
        </div>
    </div>
    <h3 class="collection-title">Elefante by Michael Connolly</h3>
    <div class="gallery-triple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-3d093c-0x32d4be5ee74376e08038d652d4dc26e62c67f436-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685114899&amp;w=1024&amp;s=00828a74780632a202b67b62b91d99be" alt="Elefante #60" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-3d0935-0x32d4be5ee74376e08038d652d4dc26e62c67f436-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115341&amp;w=1024&amp;s=1aa9284e01fa1754e30a25038939cff9" alt="Elefante #53" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-3d0910-0x32d4be5ee74376e08038d652d4dc26e62c67f436-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115188&amp;w=1024&amp;s=3e0169bffefa0b99a1363143ea1776fd" alt="Elefante #16" loading="lazy">
    </div>
    <h3 class="collection-title">Zbageti by Melissa Wiederrecht</h3>
    <div class="gallery-triple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-1063d8-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684211702&amp;w=1024&amp;s=bdc364e60f9ab00758521616ace5ebfa" alt="Zbageti #79" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-1063d2-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210124&amp;w=1024&amp;s=34783a43a2f32df026e175d509190386" alt="Zbageti #73" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-1063be-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210217&amp;w=1024&amp;s=36a3889e350d0375e757582fc503db7c" alt="Zbageti #53" loading="lazy">
    </div>
    <h3 class="collection-title">Shapes on a Plane by Mount Vitruvius</h3>
    <div class="gallery-triple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-dca43-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210214&amp;w=1024&amp;s=0ade8705476da66e9efd443df0eb50c3" alt="Shapes on a Plane #455" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-dc9b6-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210113&amp;w=1024&amp;s=1b2646edd09760a485b7223a72d94290" alt="Shapes on a Plane #314" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-dca4e-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210132&amp;w=1024&amp;s=b1d91ee9ea85d906954f1f820b38bcb4" alt="Shapes on a Plane #466" loading="lazy">
    </div>
    <h3 class="collection-title">Obscured by Nadieh Bremer</h3>
    <div class="gallery-triple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-325-KT1S23ui1PKU5G3V52Ds2NyNnPgxJbZhUY6y-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210200&amp;w=1024&amp;s=8c1fde5c08d7a2d2fb6fa213baec0770" alt="Obscured 02f0" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-311-KT1S23ui1PKU5G3V52Ds2NyNnPgxJbZhUY6y-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210152&amp;w=1024&amp;s=c413a78bc96ff7029f49a7345d832cba" alt="Obscured 3d53" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-2d9-KT1S23ui1PKU5G3V52Ds2NyNnPgxJbZhUY6y-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210141&amp;w=1024&amp;s=94643eb1befffedd95d67fc1db4bf51d" alt="Obscured 43f3" loading="lazy">
    </div>
    <h3 class="collection-title">Deconstructions by DistCollective</h3>
    <div class="gallery-triple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-ac20f-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684211968&amp;w=1024&amp;s=74431915bf46454d17bb5a166184fc92" alt="Deconstructions #43" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-ac2c2-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210137&amp;w=1024&amp;s=1491b6fbc6ba9f99d2d30bb3951c9090" alt="Deconstructions #217" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-ac2c9-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210143&amp;w=1024&amp;s=ab8aa5540237669977e99357c414d184" alt="Deconstructions #224" loading="lazy">
    </div>
    <h3 class="collection-title">Chepertom</h3>
    <div class="gallery-triple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-69112-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-animation?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210143&amp;w=1024&amp;s=e32f84d5113db09d68cc79571e9a8804" alt="Circuit_Bending_3.RAD" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-80917-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-animation?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210180&amp;w=1024&amp;s=2de73e9a42103dd9ae4c628d4e6854b0" alt="Purple.RAD" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-2-KT1So5S57PAN8HvwBQVXHqcBsCXbPZDjKbSM-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210179&amp;w=1024&amp;s=8e051b7b0adf5980a304b712f04daaf6" alt="16.RAD" loading="lazy">
    </div>
    <h3 class="collection-title">Assembling Machine by Tyler Boswell</h3>
    <div class="gallery-triple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-106e9f-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210137&amp;w=1024&amp;s=babb4566ad53f7fe0c3c836d9fe2fd0e" alt="ASSEMBLING MACHINE #243" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-106e31-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210134&amp;w=1024&amp;s=90deb3be1fb0c234d4ea2ed6a4bfd504" alt="ASSEMBLING MACHINE #134" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-106df7-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210117&amp;w=1024&amp;s=3866771689883ba6ea38978b6d1593d9" alt="ASSEMBLING MACHINE #76" loading="lazy">
    </div>
    <h3 class="collection-title">Impressions of Order by nbswwit</h3>
    <div class="gallery-triple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-11d70a-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210210&amp;w=1024&amp;s=a7b41fd66b6d56bdf9e956ae2db8f5d9" alt="Impressions of Order #79" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-11d72e-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210123&amp;w=1024&amp;s=ff5b26f85ebbc6b8302b1128eee9d956" alt="Impressions of Order #113" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-11d79a-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210135&amp;w=1024&amp;s=e6ee1aa7b1c0ec20464168059e6de117" alt="Impressions of Order #215" loading="lazy">
    </div>
    <div class="gallery-double-wide">
        <div>
            <h3 class="collection-title">Crude Figures by Kjetil Golid</h3>
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-360-0xd78afb925a21f87fa0e35abae2aead3f70ced96b-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1691818901&amp;q=100&amp;w=1024&amp;s=15b884e9446cf5c7fb0a98d2e903ca1b" alt="Crude Figures" loading="lazy">
        </div>
        <div>
            <h3 class="collection-title">STRINGS PROTOTYPE #13 by IX Shells</h3>
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-f-0xa5f3bbd51a133cd42e0c404a74b4bee07c001012-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685114779&amp;w=1024&amp;s=fe0dc5afa5643e9d11491c6b8ac85e40" alt="STRINGS PROTOTYPE :::..._ #13/20" loading="lazy">
        </div>
    </div>
    <div class="gallery-double-wide">
        <div>
            <h3 class="collection-title">Nothing Remains #63 by Brendan Dawes</h3>
            <img class="sc-a7460964-0 flHabD" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-108ba3-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210114&amp;w=1024&amp;s=5c10564816ecc9e75ba9ba2c1527fadc" alt="Nothing Remains #63" loading="lazy">
        </div>
        <div>
            <h3 class="collection-title">Bardez #149 by Nat Sarkissian</h3>
            <img class="sc-a7460964-0 flHabD" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-eb556-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210139&amp;w=1024&amp;s=1b71b4bd587eae945345d32e445f951c" alt="Bardez #149" loading="lazy">
        </div>
    </div>
    <h3 class="collection-title">Microgravity by Ryan Bell</h3>
    <div class="gallery-triple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-b903e-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1692062061&amp;w=1024&amp;s=a2a36cf3dcc2be9403d58ffb9a69d420" alt="Microgravity #268" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-bc763-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210219&amp;w=1024&amp;s=142bcbbc34741a3b86dfd4a2dd553540" alt="Microgravity #531" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-bd946-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210231&amp;w=1024&amp;s=0d722b4d4cdc4858384b26e32ff9736c" alt="Microgravity #713" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-be5d1-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210136&amp;w=1024&amp;s=088b65862acc723495b9c15c36ffa2d9" alt="Microgravity #1099" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-be78b-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210130&amp;w=1024&amp;s=38d750608dbb325f7df2c8906043eb12" alt="Microgravity #1214" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-bac26-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210212&amp;w=1024&amp;s=ad87d045b0ee3dda06e546e2e637bb8c" alt="Microgravity #360" loading="lazy">
    </div>
    <div class="sm:flex gap-2 sm:gap-4 mb-12 sm:mb-24">
        <div class="mb-12 sm:mb-0" style="flex:1;">
            <h3 class="collection-title">Etched Sinuosity #2 by Saskia Freeke</h3>
            <iframe allow="accelerometer; camera; gyroscope; microphone; xr-spatial-tracking; midi;" class="aspect-square w-full" sandbox="allow-scripts allow-downloads allow-same-origin" scrolling="" src="https://ipfs.io/ipfs/QmbdemW25i8uqXa4okK5jKXP3EDvezeT27tfEgoZcK8shZ/"></iframe>
        </div>
        <div>
            <h3 class="collection-title">Fluctuating Paragon #3 by Saskia Freeke</h3>
            <iframe allow="accelerometer; camera; gyroscope; microphone; xr-spatial-tracking; midi;" class="aspect-square w-full" sandbox="allow-scripts allow-downloads allow-same-origin" scrolling="" src="https://ipfs.io/ipfs/QmZoGW3fJhgm5j5ijBK31rWFwJ1CYvkFDBXxwmfPX6bKyQ/"></iframe>
        </div>
    </div>
    <div class="sm:flex gap-2 sm:gap-4 mb-12 sm:mb-24">
        <div class="mb-12 sm:mb-0" style="flex:1;">
            <h3 class="collection-title">Asemica #632 by Emily Edelman, Dima Ofman, Andrew Badr</h3>
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-c4751f8-0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115265&amp;w=1024&amp;s=0d8594ae0f78cc91b58d3a82d8db9c9b" alt="Asemica #632" loading="lazy">
        </div>
        <div>
            <h3 class="collection-title">ertdfgcvb</h3>
            <img src="https://storage.googleapis.com/prod-token-content/4-b398-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-animation" alt="ABCDEFGHIJKLMNOPQRSTUVWXYZ" loading="lazy">
        </div>
    </div>
    <h3 class="collection-title">Cosmic Type by Mark Webster</h3>
    <div class="gallery-triple-wide">
        <iframe src="https://gateway.fxhash2.xyz/ipfs/Qmc82PoP6NHKm47YM131W7KoNzQeG1Y9aK5zcT6XSeAuiy/?fxhash=opDHtTdB8PW7rv2aH83HJiiUBVJ2f2F9a6YMTE1A4bPrw2Kh4Fz&fxiteration=163&fxminter=tz1eHtSYDmFePHvZYHQZvQLk1kpvfcMFdLeJ" loading="lazy" sandbox="allow-scripts allow-same-origin" class="aspect-square w-full"></iframe>
        <iframe src="https://gateway.fxhash2.xyz/ipfs/Qmc82PoP6NHKm47YM131W7KoNzQeG1Y9aK5zcT6XSeAuiy/?fxhash=ooqXZigratr7VFpBPzhiUSwpKXyQ5VFHv77yf58HWkLhXzmQnBw&fxiteration=242&fxminter=tz1TbpNqZHiiyrip1NMPioM5vwRxoz8UXabj" loading="lazy" sandbox="allow-scripts allow-same-origin" class="aspect-square w-full"></iframe>
        <iframe src="https://gateway.fxhash2.xyz/ipfs/Qmc82PoP6NHKm47YM131W7KoNzQeG1Y9aK5zcT6XSeAuiy/?fxhash=onws1HjExouNprzkaJBgJAevLBcjSpmCkMRvHaX96aD1SZwhuia&fxiteration=268&fxminter=tz1TSdoeS5udkYmVr1cEpErTqxGVrC3Kcd2J" loading="lazy" sandbox="allow-scripts allow-same-origin" class="aspect-square w-full"></iframe>
    </div>
    <h3 class="collection-title">Hypertype by Mark Webster</h3>
    <div class="gallery-double-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-7c-0xbb5471c292065d3b01b2e81e299267221ae9a250-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685114824&amp;w=1024&amp;s=5e13bbb9dd3f322cfd80286d703e5a92" alt="Hypertype #124" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-39-0xbb5471c292065d3b01b2e81e299267221ae9a250-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115751&amp;w=1024&amp;s=c2dab9906154b1b8a874ab6587c3133c" alt="Hypertype #57" loading="lazy">
    </div>
    <h3 class="collection-title">Hyperspacers by Stranger in the Q</h3>
    <div class="gallery-double-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-f8d8e-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210135&amp;w=1024&amp;s=957ef57f925866b68a194e8c1f6b73e2" alt="Hyperspacers #335" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-f8d6d-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210121&amp;w=1024&amp;s=69604d0ac03dab4bd42733664b926a6c" alt="Hyperspacers #334" loading="lazy">
    </div>
    <h3 class="collection-title">adrift by Jacek Markusiewicz</h3>
    <div class="gallery-double-wide">
        <img class="sc-a7460964-0 flHabD" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-11c0a7-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210136&amp;w=1024&amp;s=eb3716a49ae4f35fa681ab11235f987a" alt="adrift #146" loading="lazy">
        <img class="sc-a7460964-0 flHabD" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-11c609-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1692062068&amp;w=1024&amp;s=0b7bc0a8aeb6c40770a740c0ceec15ce" alt="adrift #228" loading="lazy">
    </div>
    <h3 class="collection-title">RGB Elementary Cellular Automaton by Ciphrd</h3>
    <div class="gallery-double-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-25c-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210220&amp;w=1024&amp;s=c65511adb63b902a557aaacc40ddf071" alt="RGB Elementary Cellular Automaton #366" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-3d6-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210130&amp;w=1024&amp;s=f5c53878916d23c126363bee8a2fd4cf" alt="RGB Elementary Cellular Automaton #474" loading="lazy">
    </div>
    <h3 class="collection-title">Caesuras / Casey Reas</h3>
    <div class="gallery-double-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-53488-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210147&amp;w=1024&amp;s=7ca167b4e4e2c6b6f35dacc194791a3b" alt="CSRSNT-ZAAI-23-of-64.png" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-3a44c-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210137&amp;w=1024&amp;s=0e20e8ca1feead8598a9e11697b09b56" alt="CSRSNT-QAAI-18-of-32.png" loading="lazy">
    </div>
    <h3 class="collection-title">Punktwelt by Erik Swahn</h3>
    <div class="gallery-double-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-143c40-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684230973&amp;w=1024&amp;s=f360e54018f86297b24caf901194a35c" alt="Punktwelt #420" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-143cdd-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684230990&amp;w=1024&amp;s=9faadcdea4f00e68284b581b4c392f34" alt="Punktwelt #556" loading="lazy">
    </div>
    <h3 class="collection-title">Primitives by Aranda/Lasch</h3>
    <div class="gallery-double-wide">
        <iframe src="https://generator.artblocks.io/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/368000242" loading="lazy" sandbox="allow-scripts allow-same-origin" class="aspect-square w-full"></iframe>
        <iframe src="https://generator.artblocks.io/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/368000049" loading="lazy" sandbox="allow-scripts allow-same-origin" class="aspect-square w-full"></iframe>
    </div>
    <h3 class="collection-title">Hypergiraffes by Piter Pasma</h3>
    <div class="gallery-double-wide">
        <img class="sc-a7460964-0 flHabD" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-10ff0-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210144&amp;w=1024&amp;s=66ff2e0375fbb278dbf4d1021efe9e84" alt="Hypergiraffe #151" loading="lazy">
        <img class="sc-a7460964-0 flHabD" src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-10fee-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210127&amp;w=1024&amp;s=66200af3069e235dd201057d9fc0cd85" alt="Hypergiraffe #150" loading="lazy">
    </div>
    <div class="gallery-double-wide">
        <div>
            <h3 class="collection-title">Computational Specimen No. 2 by Sarah Ridgley</h3>
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-2ca27-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210224&amp;w=1024&amp;s=d85b5472fbe8316ca3a184b5760f94b4" alt="Computational Specimen No. 2" loading="lazy">
        </div>
        <div>
            <h3 class="collection-title"> Anthropogeny by Claire Silver</h3>
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-5-0x70ec58ec3a2ad80300a81968753aee56ebda89a1-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1689814988&amp;w=1024&amp;s=d157f0ac20334b3f4d1fa83c4c48364a" alt="Claire Silver - Anthropogeny" loading="lazy">
        </div>
    </div>
    <h3 class="collection-title">Matthias Isaaksen</h3>
    <div class="gallery-flex">
        <div style="flex: 1;">
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-a884d-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1691590892&amp;w=1024&amp;s=098b9c597a99a4a2263ddddc418d2a8e" alt="Extramundane" loading="lazy">
        </div>
        <div style="flex: 0.8;">
            <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-aa632-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685693258&amp;w=1024&amp;s=caec5516d64516cb9ea508d4d0271e1f" alt="Inside World" loading="lazy">
        </div>
        <div style="flex: 0.6611865;">
            <img src="/assets/images/collection/in-dis-harmony-new-found-freedom.jpg" alt="In Disharmony, New Found Freedom" loading="lazy">
        </div>
    </div>
    <h3 class="collection-title">Factura by Matthias Isaaksen</h3>
    <div class="gallery-quadruple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-192-0x27787755137863bb7f2387ed34942543c9f24efe-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115950&amp;q=100&amp;w=1024&amp;s=85923d9d45eac1f7f88d22f4d9f90084" alt="Factura #402" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-34a-0x27787755137863bb7f2387ed34942543c9f24efe-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115607&amp;q=100&amp;w=1024&amp;s=0acffa4c7e55b2aeb17d15e5628f4e87" alt="Factura #842" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-3e4-0x27787755137863bb7f2387ed34942543c9f24efe-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115219&amp;q=100&amp;w=1024&amp;s=b62622bdd56dd4f79b5ee81daed2bce4" alt="Factura #996" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-fc-0x27787755137863bb7f2387ed34942543c9f24efe-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685116076&amp;q=100&amp;w=1024&amp;s=52ecc12e0fae6362d810b6b655bc2b05" alt="Factura #252" loading="lazy">
    </div>
    <h3 class="collection-title">Mind the Gap by MountVitruvius</h3>
    <div class="gallery-triple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-1ea-0x0e42ffbac75bcc30cd0015f8aaa608539ba35fbb-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685116026&amp;w=1024&amp;s=ff787604d31b74b2df70f2fb890a1cfd" alt="Mind the Gap #490" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-bd-0x0e42ffbac75bcc30cd0015f8aaa608539ba35fbb-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685114805&amp;w=1024&amp;s=5d5df41428a9dc66d24c6940b7aef27b" alt="Mind the Gap #189" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-72-0x0e42ffbac75bcc30cd0015f8aaa608539ba35fbb-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685116029&amp;w=1024&amp;s=59f279192cea49e5f504b04b6c7bd4ee" alt="Mind the Gap #114" loading="lazy">
    </div>
    <h3 class="collection-title">de|growth:generations by Jacek Markusiewicz</h3>
    <div class="gallery-triple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-663ef-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210137&amp;w=1024&amp;s=148bd7103b65b9a022984b5bf6bec016" alt="de|growth:generations #68" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-66415-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210118&amp;w=1024&amp;s=b9fb9f6ecd29a02f2379d768c06e3fcc" alt="de|growth:generations #106" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-663e0-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210234&amp;w=1024&amp;s=3c34ea7ac87b1e8f0f3ac05f5e96e3b2" alt="de|growth:generations #53" loading="lazy">
    </div>
    <h3 class="collection-title">Elevation by Andreas Rau</h3>
    <div class="gallery-triple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-dd98b-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210121&amp;w=1024&amp;s=f56c50b593caa715e61192b87fb5ddd4" alt="Elevation #257" loading="lazy" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-dd8a0-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210240&amp;w=1024&amp;s=351cea692b26590cb0e578f1f8ae4d0a" alt="Elevation #79" loading="lazy" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-dd8fa-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1692062073&amp;w=1024&amp;s=86e20e755ccb36402d2645fb2a37812a" alt="Elevation #124" loading="lazy" />
    </div>
    <h3 class="collection-title">Millefoglie by Stefan Contiero</h3>
    <div class="gallery-double-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-ec619-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210235&amp;w=1024&amp;s=b1da13343b6b3423ab2929c6e2d98ac4" alt="Millefoglie #169" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-ec5d4-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210132&amp;w=1024&amp;s=75432a4ce140c1b47b3b08fcacc1440b" alt="Millefoglie #104" />
    </div>
    <div>
        <h3 class="collection-title">Fields by Erik Swahn</h3>
        <div class="gallery-flex">
            <div style="flex: 1;">
                <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-a7555b4f-0x1dbe39e071f2e580c1c0c49cfb19b9edb5b89b2d-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685116093&amp;w=1024&amp;s=9e0406ba3378b29bb599b8c6b6320bfd" alt="Fields #648" />
            </div>
            <div style="flex: 1.6;">
                <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-2f418d7b-0x1dbe39e071f2e580c1c0c49cfb19b9edb5b89b2d-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685116050&amp;w=1024&amp;s=1732fe85c381d8a16bdbd7441cc67198" alt="Fields #695" />
            </div>
        </div>
    </div>
    <h3 class="collection-title">Cathedral Study by Eric di Giuli</h3>
    <div class="gallery-double-wide">
        <iframe src="https://generator.artblocks.io/0x1353fd9d3dc70d1a18149c8fb2adb4fb906de4e8/6000377" loading="lazy" sandbox="allow-scripts allow-same-origin" class="aspect-square w-full"></iframe>
        <iframe src="https://generator.artblocks.io/0x1353fd9d3dc70d1a18149c8fb2adb4fb906de4e8/6000363" loading="lazy" sandbox="allow-scripts allow-same-origin" class="aspect-square w-full"></iframe>
    </div>
    <!--
    <h3 class="mb-0">Ir/rational Beauty by Yazid</h3>
    <div class="gallery-flex">
        <iframe src="https://gateway.fxhash2.xyz/ipfs/Qme5QKF1t4AbpGDMKQjWfyx8v8YLG1gyk55aA6evFyuaVM/?fxhash=ooMkJ1sbnrjd1rU25bUmuKjHUAqU3s1AEZA3KypMiHcLjM5uGes&fxiteration=107&fxminter=tz1ZFsnAQ8UorVbyiMcTP63djTMDcj3rrSc3" loading="lazy" sandbox="allow-scripts allow-same-origin"  class="aspect-[3/4]" style="flex: 0.833125;"></iframe>
        <iframe src="https://gateway.fxhash2.xyz/ipfs/Qme5QKF1t4AbpGDMKQjWfyx8v8YLG1gyk55aA6evFyuaVM/?fxhash=ooz5Rf6wR1CkCNPWY3hdDrNThjfy7gHfBRVfzHjyd9W2z1AE2nF&fxiteration=65&fxminter=tz1gLeXAGc1Rho2UTE246xD26SapeyztMF8E" loading="lazy" sandbox="allow-scripts allow-same-origin" class="aspect-[4/3]" style="flex: 1.6194332;"></iframe>
    </div>
    -->
    <h3 class="collection-title">Tych by rudxane</h3>
    <div class="gallery-triple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-20b4f-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1691754007&amp;w=1024&amp;s=acf6572df776dcb7e03b3f778fd22f5f" alt="Tych #185" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-20c6d-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210128&amp;w=1024&amp;s=d1df46d410873478cccd31d8bc7a5775" alt="Tych #309" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-20b56-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210218&amp;w=1024&amp;s=3be94ab67c8ef7dcdf893286544e00a5" alt="Tych #190" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-20b46-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210200&amp;w=1024&amp;s=a1b72263438c86f531f5cfb43f2ac8f7" alt="Tych #176" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-20a73-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210121&amp;w=1024&amp;s=003f21ed89f8ab17a102cf360804ba91" alt="Tych #99" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-20c68-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210143&amp;w=1024&amp;s=721a22b2aacc10155d91208a4da1aae8" alt="Tych #305" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-20abe-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210117&amp;w=1024&amp;s=d88753f4d0e3d452bb0ada7a0a197acc" alt="Tych #123" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-20b5b-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210128&amp;w=1024&amp;s=dab802a08f59568ee3f62ed9ac9fe715" alt="Tych #195" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-20a5c-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210125&amp;w=1024&amp;s=170532700d7ae140a5e5b260c0c53ba3" alt="Tych #91" loading="lazy">
    </div>
    <h3 class="collection-title">Tesseract by Studio Yorktown</h3>
    <div class="gallery-quadruple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-acf82-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210123&amp;w=1024&amp;s=bc1a3fe9ef0dde865699f49bf167a723" alt="Tesseract #365" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F4-ad3a9-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1691920929&amp;w=1024&amp;s=56d2c55594d8bf7c4804e9292ca8dcce" alt="Tesseract #431" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-acf8d-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210146&amp;w=1024&amp;s=36070c97145ecf998b6d7f91c9a2eaae" alt="Tesseract #369" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-ad124-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210141&amp;w=1024&amp;s=078a428db673891e984c16624637c6c6" alt="Tesseract #388" />
    </div>
    <h3 class="collection-title">Catharsis by Dario Lanza</h3>
    <div class="gallery-quadruple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-279-0x66293a9b1339ca99623e82bc71f88d767f60ad21-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685114883&amp;w=1024&amp;s=05ae2d9acb91c27a7355fc43bad91636" alt="Catharsis #633 - This Is Always" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-1d4-0x66293a9b1339ca99623e82bc71f88d767f60ad21-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115594&amp;w=1024&amp;s=f0474a43f3b43bfc1d5fa4bc45740a38" alt="Catharsis #468 - Pick Up Sticks" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-2c7-0x66293a9b1339ca99623e82bc71f88d767f60ad21-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685116057&amp;w=1024&amp;s=b02619bbc42837a0f594764f837de3e5" alt="Catharsis #711 - I'm Yours" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-64-0x66293a9b1339ca99623e82bc71f88d767f60ad21-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685115822&amp;w=1024&amp;s=96ec3513c1cc43bdb01fd8fa41032cb9" alt="Catharsis #100 - Away in a Manger" />
    </div>
    <h3 class="collection-title">For Algernon by Elsif</h3>
    <div class="gallery-quadruple-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-17265a-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684240716&amp;w=1024&amp;s=5c65c58b66c5405136e98b0a835d0037" alt="For Algernon #207" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-17266a-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684240727&amp;w=1024&amp;s=1fb38bdd09297d72c682d04d0e804b85" alt="For Algernon #223" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-172635-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684240716&amp;w=1024&amp;s=e77581463e96fe470c69145c72ff94bb" alt="For Algernon #170" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-172683-KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684240711&amp;w=1024&amp;s=9a199e049cd8b292ff75b8c2b3ab6a56" alt="For Algernon #248" />
    </div>
    <h3 class="collection-title">Morphology by Emily Xie</h3>
    <div class="gallery-double-wide">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-1ddf-0xb80fbf6cdb49c33dc6ae4ca11af8ac47b0b4c0f3-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685116096&amp;w=1024&amp;s=1a7790206c90e907c04bca9db381f2fd" alt="LUNA" loading="lazy">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Fprod-token-content%2F0-1d34-0xb80fbf6cdb49c33dc6ae4ca11af8ac47b0b4c0f3-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1685116114&amp;w=1024&amp;s=7c7bf83227db165794e16298d3004a43" alt="Shield" loading="lazy">
    </div>
    <h3 class="collection-title">unbuilt by Jacek Markusiewicz</h3>
    <div class="gallery-quadruple-wide-trip-small">
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-f81c-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210114&amp;w=1024&amp;s=5e722a0249dd125fa028f8636ff46a82" alt="unbuilt #238" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-f77c-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210146&amp;w=1024&amp;s=028a74b1430d3460ca3d9a98227285dd" alt="unbuilt #176" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-f7d9-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210125&amp;w=1024&amp;s=895e8021aa94dcd690b28ddb0dfaaab5" alt="unbuilt #206" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-f72f-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210141&amp;w=1024&amp;s=57ab92454452ff9cad6bc354ab8cabf6" alt="unbuilt #154" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-f7c9-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210112&amp;w=1024&amp;s=e265fa42fff2910582ba67189eeaa99b" alt="unbuilt #200" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-f81f-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210147&amp;w=1024&amp;s=5222a4046ed5cac849c9c4f83bc5927a" alt="unbuilt #240" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-f524-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210118&amp;w=1024&amp;s=8e2da90f8dc1736e5829fc1315bb2fc2" alt="unbuilt #19" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-f7ef-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210216&amp;w=1024&amp;s=c8c1bc0f1a9e2ab73d578fc0ec307229" alt="unbuilt #218" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-f82f-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210204&amp;w=1024&amp;s=5114f252036cdcf8606d653d5db1adb4" alt="unbuilt #248" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-f7ab-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210116&amp;w=1024&amp;s=c4cf69f01e4014e9c21a4c581c9f9e11" alt="unbuilt #190" />
        <img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-f5b7-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210142&amp;w=1024&amp;s=6bf954b22decaf249078a2fcb15f3ea4" alt="unbuilt #43" /><img src="https://assets.gallery.so/https%3A%2F%2Fstorage.googleapis.com%2Ftoken-media%2F4-f7c3-KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE-image?auto=format%2Ccompress&amp;fit=max&amp;glryts=1684210199&amp;w=1024&amp;s=53c07605a534165fe815557cd800339b" alt="unbuilt #197" />
    </div>

</div>

</article>
