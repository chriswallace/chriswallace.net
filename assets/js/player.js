window.addEventListener("DOMContentLoaded", (event) => {

  function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }
  
  const playButton = document.getElementById("playButton");
  const pauseButton = document.getElementById("pauseButton");
  const nextButton = document.getElementById("nextButton");
  const prevButton = document.getElementById("prevButton");
  const volumeControl = document.getElementById("volumeControl");

  let audioElement = document.getElementById("audioElement");

  // Add event listeners for buttons
  document.getElementById("playButton").addEventListener("click", function () {
    audioElement.play();
  });

  document.getElementById("pauseButton").addEventListener("click", function () {
    audioElement.pause();
  });

  if( window.pageSettings ) {
    
    const tracks = window.pageSettings.musicTracks;

    if(tracks && tracks.length > 0) {

      document.getElementById("utility-bar").classList.remove("hidden");

      let currentTrackIndex = 0;

      const trackInfo = document.getElementById("trackInfo");

      trackInfo.className = "stopped";

      function loadTrack(index) {
        audioElement.src = tracks[index].src;
        trackInfo.innerHTML = tracks[index].title + " by " + tracks[index].artist;
      }

      function playTrack() {
        pauseButton.className = "visible";
        playButton.className = "hidden";
        trackInfo.className = "playing";
        audioElement.play();
      }

      function pauseTrack() {
        audioElement.pause();
        playButton.className = "visible";
        pauseButton.className = "hidden";
        trackInfo.className = "stopped";
      }

      function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        playTrack();
      }

      function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        playTrack();
      }

      pauseButton.className = "hidden";
      playButton.className = "visible";

      playButton.addEventListener("click", playTrack);
      pauseButton.addEventListener("click", pauseTrack);
      nextButton.addEventListener("click", nextTrack);
      prevButton.addEventListener("click", prevTrack);
      volumeControl.addEventListener("input", (event) => {
        audioElement.volume = event.target.value;
      });

      audioElement.addEventListener("ended", nextTrack);

      loadTrack(currentTrackIndex);

      trackInfo.addEventListener("mouseover", function () {
        this.style.animationPlayState = "paused";
      });

      trackInfo.addEventListener("mouseout", function () {
        this.style.animationPlayState = "running";
      });

      if (!isMobile()) {
        const backToTopButton = document.getElementById('backToTop');
        const pageTitle = document.getElementById('pageTitle');

        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
          window.scroll({
            top: 0,
            behavior: 'smooth'
          });
        });

        // Toggle button's visibility based on scroll position
        window.addEventListener('scroll', function() {
          if (window.scrollY > 200) { // Show button after 200px of scrolling
            backToTopButton.style.opacity = 1;
            pageTitle.style.opacity = 1;
          } else {
            backToTopButton.style.opacity = 0;
            pageTitle.style.opacity = 0;
          }
        });
      }
    }
  }
});
