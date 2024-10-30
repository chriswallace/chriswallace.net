let hasInteracted = false;

function togglePlay() {
    const video = document.getElementById('backgroundVideo');
    const playButton = document.getElementById('playButton');
    const playIcon = document.getElementById('playIcon');
    const buttonText = document.getElementById('buttonText');

    if (buttonText.innerText === 'Play Showreel') {
        video.muted = false; // Unmute the video
        
        if(!hasInteracted) {
            video.load();
            hasInteracted = true;
        }
        
        video.play();
        playIcon.innerHTML = '<path d="M0 1C0 0.447716 0.447715 0 1 0H5C5.55228 0 6 0.447715 6 1V23C6 23.5523 5.55228 24 5 24H1C0.447715 24 0 23.5523 0 23V1Z" class="fill-current"/><path d="M10 1C10 0.447716 10.4477 0 11 0H15C15.5523 0 16 0.447715 16 1V23C16 23.5523 15.5523 24 15 24H11C10.4477 24 10 23.5523 10 23V1Z" class="fill-current"/>'; // Change to pause icon path
        buttonText.innerText = 'Pause';
    } else {
        video.pause();
        playIcon.innerHTML = '<path d="M15.4353 10.8295L1.80706 0.23623C1.06251 -0.342509 0 0.208084 0 1.17265V22.8274C0 23.7919 1.06251 24.3425 1.80706 23.7638L15.4353 13.1705C16.1882 12.5853 16.1882 11.4147 15.4353 10.8295Z" class="fill-current" />'; // Change back to play icon path
        buttonText.innerText = 'Play Showreel';
    }
}