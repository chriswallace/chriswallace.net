document.addEventListener('DOMContentLoaded', function() {

    const titles = [
      "Your favorite designer's favorite designer",
      "2x Emmy Award-nominated Design Director",
      "Probably too old for TikTok but too young for Facebook",
      "Proud owner of a computer that once had a turbo button",
      "The designer who peaked during web 2.0",
      "Skeuomorphism will always be extremely cool",
      "Some say unicorns don't exist but I am one",
      "Veteran of the great browser wars of '98",
      "That guy who launched an NFT project",
      "Still waiting for those NFT millions to roll in",
      "Proudly mediocre at Overwatch",
      "Cancer survivor since the age of 20",
      "Definitely not still using jQuery (maybe)",
      "Old enough to remember table-based layouts",
      "Twenty years deep in the tech industry",
      "Back when Bootstrap was considered revolutionary",
      "Proud parent of a Texas A&M sophomore",
      "Professional purveyor of dad jokes",
      "Will design for actual money, not exposure",
      "Survived the dark days of IE6 support",
      "Startup design specialist extraordinaire",
      "Flash websites were pretty cool, actually",
      "Reformed agency executive at your service",
      "Probably due for that first colonoscopy soon"
    ];

    let currentTitleIndex = 0;
    let scrambleSpeed = 50; // milliseconds
    let pauseDuration = 5000; // pause for 5 seconds before scrambling
    let isScrambling = false;
    let unscrambledIndices = new Set();
    let scrambleTimeout = null;
    let isPaused = false;

    const typewriterElement = document.getElementById('typewriter');

    function createSpans(text) {
      return text.split('').map((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.dataset.index = i;
        span.dataset.char = char;
        return span;
      });
    }

    function scrambleText() {
      if (isPaused) return;
      
      clearTimeout(scrambleTimeout);
      
      if (!isScrambling) {
        isScrambling = true;
        unscrambledIndices.clear();
        const spans = createSpans(titles[currentTitleIndex]);
        typewriterElement.innerHTML = '';
        spans.forEach(span => typewriterElement.appendChild(span));
        scrambleTimeout = setTimeout(scrambleText, pauseDuration);
      } else {
        const spans = Array.from(typewriterElement.children);
        const remainingIndices = spans
          .map((_, i) => i)
          .filter(i => !unscrambledIndices.has(i));

        if (remainingIndices.length > 0) {
          // Randomly select 1-3 indices to unscramble
          const numToUnscramble = Math.min(
            Math.ceil(Math.random() * 3),
            remainingIndices.length
          );
          
          for (let i = 0; i < numToUnscramble; i++) {
            const randomIndex = Math.floor(Math.random() * remainingIndices.length);
            const indexToUnscramble = remainingIndices[randomIndex];
            remainingIndices.splice(randomIndex, 1);
            unscrambledIndices.add(indexToUnscramble);
          }

          spans.forEach((span, i) => {
            if (unscrambledIndices.has(i)) {
              span.textContent = span.dataset.char;
            } else if (span.dataset.char === ' ') {
              span.textContent = ' ';
            } else {
              span.textContent = String.fromCharCode(
                Math.floor(Math.random() * 26) + 97
              );
            }
          });

          if (unscrambledIndices.size === spans.length) {
            isScrambling = false;
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            scrambleTimeout = setTimeout(scrambleText, pauseDuration); // Add this line to restart the cycle
          }
        }
      }

      if (isScrambling && !isPaused) {
        scrambleTimeout = setTimeout(scrambleText, scrambleSpeed);
      }
    }

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isPaused = false;
          if (!scrambleTimeout) {
            scrambleText();
          }
        } else {
          isPaused = true;
          if (scrambleTimeout) {
            clearTimeout(scrambleTimeout);
            scrambleTimeout = null;
          }
        }
      });
    }, {
      threshold: 0.5 // Trigger when 50% of element is visible
    });

    // Start observing the typewriter element
    observer.observe(typewriterElement);
  
    scrambleText();
});