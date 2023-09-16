window.addEventListener('DOMContentLoaded', (event) => {
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');;
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    const volumeControl = document.getElementById('volumeControl');
  
    let audioElement = document.getElementById("audioElement");
    
    // Add event listeners for buttons
    document.getElementById("playButton").addEventListener("click", function() {
      audioElement.play();
    });
    
    document.getElementById("pauseButton").addEventListener("click", function() {
      audioElement.pause();
    });
  
    const tracks = [
      { src: '/assets/audio/2022.mp3', title: 'GENESIS #2022', artist: 'omgkirby' },
      { src: '/assets/audio/477.mp3', title: 'Channel Tres #477', artist: 'omgkirby' },
      { src: '/assets/audio/990.mp3', title: 'GENESIS #990', artist: 'omgkirby' },
      { src: '/assets/audio/481.mp3', title: 'Channel Tres #481', artist: 'omgkirby' }
    ];
  
    let currentTrackIndex = 0;
  
    const trackInfo = document.getElementById('trackInfo');
  
    trackInfo.className = 'stopped';
  
    function loadTrack(index) {
      console.log(`Loading track at index ${index}: ${tracks[index].src}`);
      audioElement.src = tracks[index].src;
      trackInfo.innerHTML = tracks[index].title + " by " + tracks[index].artist;
    }
  
    function playTrack() {
      pauseButton.className = 'visible';
      playButton.className = 'hidden';
      trackInfo.className = 'playing';
      audioElement.play();
    }
  
    function pauseTrack() {
      audioElement.pause();
      playButton.className = 'visible';
      pauseButton.className = 'hidden';
      trackInfo.className = 'stopped';
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
  
    pauseButton.className = 'hidden';
    playButton.className = 'visible';
  
    playButton.addEventListener('click', playTrack);
    pauseButton.addEventListener('click', pauseTrack);
    nextButton.addEventListener('click', nextTrack);
    prevButton.addEventListener('click', prevTrack);
    volumeControl.addEventListener('input', (event) => {
      audioElement.volume = event.target.value;
    });
  
    audioElement.addEventListener('ended', nextTrack);
  
    loadTrack(currentTrackIndex);
  
    trackInfo.addEventListener('mouseover', function() {
      this.style.animationPlayState = 'paused';
    });
  
    trackInfo.addEventListener('mouseout', function() {
      this.style.animationPlayState = 'running';
    });
  
  });