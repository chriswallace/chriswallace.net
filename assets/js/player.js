window.addEventListener("DOMContentLoaded", (event) => {
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

  const tracks = [
    {
      src: "/assets/audio/Cody_Martin_Building_Legacies_instrumental_3_15.mp3",
      title: "Building Legacies",
      artist: "Cody Martin",
    },
    {
      src: "/assets/audio/Corolina_Combo_Mind_Adventures_instrumental_2_33.mp3",
      title: "Combo Mind Adventures",
      artist: "Corolina",
    },
    {
      src: "/assets/audio/Daniele_Musto_Spin_Around_With_You_background_vocals_3_17.mp3",
      title: "Spin Around With You",
      artist: "Danielle Musto",
    },
    {
      src: "/assets/audio/Dr_Delight_Neptune_Rising_instrumental_3_38.mp3",
      title: "Neptune Rising",
      artist: "Dr. Delight",
    },
    {
      src: "/assets/audio/Falls_Darkly_instrumental_5_01.mp3",
      title: "Darkly",
      artist: "Falls",
    },
    {
      src: "/assets/audio/Nu_Alkemi_t_Lost_With_You_lead_vocal_4_20.mp3",
      title: "Nu Alkemi$t",
      artist: "Lost With You",
    },
    {
      src: "/assets/audio/PALA_Infinite_Drive_instrumental_3_01.mp3",
      title: "Infinite Drive",
      artist: "PALA",
    },
    {
      src: "/assets/audio/Tide_Electric_The_Chapel_Of_Love_instrumental_3_48.mp3",
      title: "The Chapel Of Love",
      artist: "Tide Electric",
    },
  ];

  let currentTrackIndex = 0;

  const trackInfo = document.getElementById("trackInfo");

  trackInfo.className = "stopped";

  function loadTrack(index) {
    console.log(`Loading track at index ${index}: ${tracks[index].src}`);
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
});
