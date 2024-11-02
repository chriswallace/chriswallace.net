document.addEventListener('DOMContentLoaded', function() {

    const titles = [
      "designer who codes",
      "2x emmy award nominated creative director",
      "mediocre at overwatch",
      "i did kick cancer's ass though",
      "I'm a 20-year tech veteran",
      "your favorite designer's favorite designer",
      "dad to a texas a&m sophomore",
      "prefer to work for money, plz gib me",
      "yes, i launched an nft project",
      "no, i'm not a millionaire",
      "love working with startups",
      "i'm a recovering agency exec",
      "probably should get my first colonoscopy soon"
    ];

    let currentTitleIndex = 0;
    let scrambleSpeed = 45; // milliseconds
    let pauseDuration = 5000; // pause for 5 seconds before scrambling
    let isScrambling = false;
    let charIndex = 0;
    let scrambleTimeout = null; // Added to store the timeout ID

    const typewriterElement = document.getElementById('typewriter');
    const cursorElement = document.createElement('span');
    cursorElement.className = 'cursor';

    function scrambleText() {
      clearTimeout(scrambleTimeout); // Clear the previous timeout to prevent acceleration
      if (!isScrambling) {
        isScrambling = true;
        charIndex = 0;
        scrambleTimeout = setTimeout(scrambleText, pauseDuration); // pause before starting scramble
      } else {
        let scrambledText = '';
        for (let i = 0; i < titles[currentTitleIndex].length; i++) {
          if (i < charIndex) {
            scrambledText += titles[currentTitleIndex][i];
          } else {
            scrambledText += String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97); // Random lowercase letter
          }
        }
        typewriterElement.textContent = scrambledText;
        charIndex++;
        if (charIndex > titles[currentTitleIndex].length) {
          isScrambling = false;
          currentTitleIndex = (currentTitleIndex + 1) % titles.length;
          charIndex = 0; // Reset charIndex for the next title
          if (currentTitleIndex === 0) { // Check if we've reached the end of the titles array
            currentTitleIndex = 0; // Reset to the first title to start again
          }
        }
      }

      if (isScrambling) {
        scrambleTimeout = setTimeout(scrambleText, scrambleSpeed);
      }
    }
  
    scrambleText();
});