let hasInteracted = false;

function togglePlay() {
    const video = document.getElementById('backgroundVideo');
    const playButton = document.getElementById('playButton');
    const playIcon = document.getElementById('playIcon');
    const buttonText = document.getElementById('buttonText');
    const controls = document.querySelector('.portfolio__controls');

    if (!video || !playButton || !playIcon || !buttonText || !controls) return;

    if (video.paused) {
        // Handle play
        const playPromise = video.play(); 
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                playIcon.innerHTML = '<path d="M0 1C0 0.447716 0.447715 0 1 0H5C5.55228 0 6 0.447715 6 1V23C6 23.5523 5.55228 24 5 24H1C0.447715 24 0 23.5523 0 23V1Z" class="fill-current"/><path d="M10 1C10 0.447716 10.4477 0 11 0H15C15.5523 0 16 0.447715 16 1V23C16 23.5523 15.5523 24 15 24H11C10.4477 24 10 23.5523 10 23V1Z" class="fill-current"/>';
                buttonText.innerText = 'Pause';
                hideControlsIfPlaying();
            }).catch(error => {
                console.log("Video play failed:", error);
                buttonText.innerText = 'Play';
            });
        }
    } else {
        // Handle pause
        video.pause();
        playIcon.innerHTML = '<path d="M15.4353 10.8295L1.80706 0.23623C1.06251 -0.342509 0 0.208084 0 1.17265V22.8274C0 23.7919 1.06251 24.3425 1.80706 23.7638L15.4353 13.1705C16.1882 12.5853 16.1882 11.4147 15.4353 10.8295Z" class="fill-current" />';
        buttonText.innerText = 'Play';
    }
}

let hideControlsTimeout;

function hideControlsIfPlaying() {
    const video = document.getElementById('backgroundVideo');
    const controls = document.querySelector('.portfolio__controls');
    
    if (!video || !controls) return;
    
    if (!video.paused && !video.muted) {
        controls.classList.add('opacity-0');
    }
}

function showControls() {
    const controls = document.querySelector('.portfolio__controls');
    if (!controls) return;
    
    controls.classList.remove('opacity-0');
    
    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => {
        hideControlsIfPlaying();
    }, 3000);
}

document.getElementById('backgroundVideo')?.addEventListener('click', showControls);

function toggleMute() {
    const video = document.getElementById('backgroundVideo');
    const muteIcon = document.getElementById('muteIcon');
    const muteText = document.getElementById('muteText');
    const controls = document.querySelector('.portfolio__controls');

    if (!video || !muteIcon || !muteText || !controls) return;

    video.muted = !video.muted;
    hasInteracted = true;

    if (video.muted) {
        // Volume muted icon (volume-off)
        muteIcon.innerHTML = '<path d="M16 9a5 5 0 0 1 .95 2.293"/><path d="M19.364 5.636a9 9 0 0 1 1.889 9.96"/><path d="m2 2 20 20"/><path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"/><path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686"/>';
        muteText.innerText = 'Unmute';
        controls.classList.remove('opacity-0');
    } else {
        // Volume enabled icon (volume-2)
        muteIcon.innerHTML = '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>';
        muteText.innerText = 'Mute';
        hideControlsIfPlaying();
    }
}

document.addEventListener('visibilitychange', () => {
    const video = document.getElementById('backgroundVideo');
    if (!video) return;
    
    if (document.hidden) {
        video.pause();
    } else if (!hasInteracted) {
        video.play().catch(err => console.log("Auto-play failed on visibility change:", err));
    }
});