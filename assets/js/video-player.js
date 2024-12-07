class VideoPlayer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.hasInteracted = false;
        this.hideControlsTimeout = null;
        this.isSeeking = false;
    }

    connectedCallback() {
        // Check for touch device before rendering
        const isTouchDevice = 'ontouchstart' in window;
        this.render(isTouchDevice);
                
        // First initialize all elements
        this.video = this.shadowRoot.querySelector('video');
        this.videoContainer = this;

        // Only initialize custom controls for non-touch devices
        if (!isTouchDevice) {
            this.playButton = this.shadowRoot.querySelector('#playButton');
            this.muteButton = this.shadowRoot.querySelector('#muteButton');
            this.fullscreenButton = this.shadowRoot.querySelector('#fullscreenButton');
            this.videoOverlay = this.shadowRoot.querySelector('.video-overlay');
            this.controls = this.shadowRoot.querySelector('.controls');
            this.progressBar = this.shadowRoot.querySelector('.progress-bar');
            this.progressBarFill = this.shadowRoot.querySelector('.progress-bar-fill');
        }

        // Add event listeners only after confirming video exists
        if (this.video) {
            if (!isTouchDevice) {
                this.updateMuteButtonIcon(true);

                this.playButton?.addEventListener('click', () => this.togglePlay());
                this.videoOverlay?.addEventListener('click', () => this.togglePlay());
                this.muteButton?.addEventListener('click', () => this.toggleMute());
                this.fullscreenButton?.addEventListener('click', () => this.toggleFullscreen());
                
                // Progress bar event listeners
                this.video.addEventListener('timeupdate', () => this.updateProgressBar());
                this.progressBar?.addEventListener('mousedown', (e) => this.startSeeking(e));
                this.progressBar?.addEventListener('mousemove', (e) => this.seeking(e));
                this.progressBar?.addEventListener('mouseup', () => this.endSeeking());
                this.progressBar?.addEventListener('mouseleave', () => this.endSeeking());
                
                this.addEventListener('mousemove', () => this.showControls());
                this.addEventListener('mouseleave', () => this.hideControls());
            }

            // Keep visibility change handler for all devices
            document.addEventListener('visibilitychange', () => this.handleVisibilityChange());

            // Initial state
            this.video.muted = true;
            this.video.play().catch(() => {
                if (!isTouchDevice) {
                    this.classList.add('paused');
                }
            });
        } else {
            console.error('Required video element not found');
        }
    }

    render(isTouchDevice = false) {
        const videoUrl = this.getAttribute('video-url');
        const isMuted = this.hasAttribute('muted');
        const playsInline = this.hasAttribute('playsinline');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    position: relative;
                    justify-content: center;
                    align-items: center;
                    background-color: black;
                    overflow: hidden;
                    /* Add CSS custom property with fallback color */
                    --theme-color: var(--video-theme-color, currentColor);
                }
                .video {
                    pointer-events: ${isTouchDevice ? 'auto' : 'none'};
                    z-index: 10;
                    max-height: 100%;
                    max-width: 100%;
                }
                ${!isTouchDevice ? `
                    .video-overlay {
                        position: absolute;
                        top: -1px;
                        right: -1px;
                        bottom: -1px;
                        left: -1px;
                        z-index: 20;
                        opacity: 0;
                        background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6));
                        cursor: pointer;
                        transition: opacity 200ms linear;
                    }
                    .video-overlay:hover{
                        opacity: 0.4;
                    }
                    :host(.paused) .video-overlay{
                        opacity: 1;
                    }
                    .video {
                        pointer-events: none;
                        z-index: 10;
                        max-height: 100%;
                        max-width: 100%;
                    }
                    .controls {
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        z-index: 40;
                        display: flex;
                        flex-direction: column;
                        pointer-events: auto;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    .controls-bottom {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 16px 12px;
                    }
                    .progress-bar {
                        width: 100%;
                        height: 4px;
                        background: rgba(255, 255, 255, 0.2);
                        position: relative;
                        cursor: pointer;
                        margin-bottom: 8px;
                    }
                    .progress-bar:hover {
                        height: 8px;
                        margin-top: -2px;
                    }
                    .progress-bar-fill {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        background: var(--theme-color);
                        width: 0%;
                        transition: width 0.1s linear;
                    }
                    .seek-handle {
                        position: absolute;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        width: 12px;
                        height: 12px;
                        background: var(--theme-color);
                        border-radius: 50%;
                        opacity: 0;
                        transition: opacity 0.2s;
                        pointer-events: none;
                    }
                    .progress-bar:hover .seek-handle {
                        opacity: 1;
                    }
                    .play-button {
                        position: absolute;
                        inset: 0;
                        z-index: 30;
                        display: none;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    }
                        
                    :host(.paused) .play-button {
                        display: flex;
                    }

                    .play-button-inner {
                        width: 72px;
                        height: 72px;
                        background-color: var(--theme-color);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        opacity: 0.85;
                    }
                    .play-button-inner:hover {
                        opacity: 1;
                    }
                    .play-button svg {
                        width: 24px;
                        height: 24px;
                        transform: translateX(2px);
                        fill: white;
                        stroke: transparent;
                    }
                    button {
                        background-color: transparent;
                        border: none;
                        color: white;
                        padding-top: 16px;
                        padding-bottom: 12px;
                        padding-left: 16px;
                        padding-right: 16px;
                        cursor: pointer;
                        border-radius: 4px;
                        transition: background-color 0.3s, transform 0.3s;
                    }
                    button:hover {
                        transform: scale(1.05);
                    }
                    button:active {
                        transform: scale(0.95);
                    }
                    .icon {
                        width: 24px;
                        height: 24px;
                        stroke: var(--theme-color);
                        stroke-width: 1.5px;
                    }
                    .sr-only {
                        position: absolute;
                        width: 1px;
                        height: 1px;
                        padding: 0;
                        margin: -1px;
                        overflow: hidden;
                        clip: rect(0, 0, 0, 0);
                        white-space: nowrap;
                        border: 0;
                    }
                    .button-group {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                    }   

                    /* Show controls by default on touch devices */
                    @media (hover: none) {
                        .controls {
                            opacity: 1;
                        }
                    }

                    /* Show controls on hover for non-touch devices */
                    :host(:hover) .controls {
                        opacity: 1;
                    }
                ` : ''}
            </style>
            ${!isTouchDevice ? `<div class="video-overlay"></div>` : ''}
            <video 
                id="video" 
                class="video" 
                width="100%" 
                ${isMuted ? 'muted' : ''} 
                ${playsInline ? 'playsinline' : ''} 
                ${isTouchDevice ? 'controls' : ''}
                autoplay 
                loop
            >
                <source src="${videoUrl}" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
            ${!isTouchDevice ? `
                <div class="controls">
                    <div class="progress-bar">
                        <div class="progress-bar-fill"></div>
                        <div class="seek-handle"></div>
                    </div>
                    <div class="controls-bottom">
                        <div class="button-group">
                            <button id="muteButton">
                                <span class="sr-only">Mute</span>
                            </button>
                        </div>
                        <button id="fullscreenButton">
                            <svg class="icon" id="fullscreenIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
                            </svg>
                            <span class="sr-only">Fullscreen</span>
                        </button>
                    </div>
                </div>
                <div id="playButton" class="play-button">
                    <div class="play-button-inner">
<svg width="14" height="16" viewBox="0 0 14 16" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M0.5 14.3507V1.64929C0.5 0.871991 1.34797 0.391878 2.0145 0.791793L12.599 7.14251C13.2464 7.53091 13.2464 8.46909 12.599 8.85749L2.0145 15.2082C1.34797 15.6081 0.5 15.128 0.5 14.3507Z" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                    </div>
                    <span class="sr-only">Play</span>
                </div>
            ` : ''}
        `;
    }

    togglePlay() {
        if (this.video.paused) {
            this.video.play();
            this.classList.remove('paused');
            // Start the hide controls timer when playing
            this.showControls();
        } else {
            this.video.pause();
            this.classList.add('paused');
            // Clear the timer and show controls when paused
            clearTimeout(this.hideControlsTimeout);
            this.showControls();
        }
    }

    toggleMute() {
        this.video.muted = !this.video.muted;
        this.updateMuteButtonIcon(this.video.muted);
        this.hasInteracted = true;
        this.hideControlsIfPlaying();
    }

    updateMuteButtonIcon(isMuted) {
        const unmuteIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-x icon">
                <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
                <path d="m18 12 4-4"/>
                <path d="m22 12-4-4"/>
            </svg>
            <span class="sr-only">Unmute</span>
        `;
        const muteIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-2 icon">
                <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
                <path d="M16 9a5 5 0 0 1 0 6"/>
                <path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>
            </svg>
            <span class="sr-only">Mute</span>
        `;
        
        this.muteButton.innerHTML = isMuted ? unmuteIcon : muteIcon;
    }

    toggleFullscreen() {
        const maximizeIcon = `
            <svg class="icon" id="fullscreenIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
            </svg>
        `;
        const minimizeIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minimize icon">
                <path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/>
            </svg>
        `;

        if (!document.fullscreenElement) {
            this.videoContainer.requestFullscreen().then(() => {
                this.fullscreenButton.innerHTML = minimizeIcon;
                this.showControls();
            }).catch(err => console.log("Fullscreen failed:", err));
        } else {
            document.exitFullscreen().then(() => {
                this.fullscreenButton.innerHTML = maximizeIcon;
            }).catch(err => console.log("Exit fullscreen failed:", err));
        }
    }

    hideControlsIfPlaying() {
        if (!this.video.paused && !this.video.muted) {
            this.controls.classList.add('opacity-0');
        }
    }

    showControls() {
        clearTimeout(this.hideControlsTimeout);
        this.controls.style.opacity = '1';
        
        // Set timeout to hide controls after 2 seconds of no mouse movement
        if (!this.video.paused) {  // Only auto-hide if video is playing
            this.hideControlsTimeout = setTimeout(() => {
                this.hideControls();
            }, 2000);
        }
    }

    hideControls() {
        if (!this.video.paused && !this.isSeeking) {  // Don't hide if video is paused or user is seeking
            this.controls.style.opacity = '0';
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.video.pause();
        }
    }

    updateProgressBar() {
        if (this.video.duration) {
            const progress = (this.video.currentTime / this.video.duration) * 100;
            this.progressBarFill.style.width = `${progress}%`;
            
            // Update seek handle position
            const seekHandle = this.shadowRoot.querySelector('.seek-handle');
            if (seekHandle) {
                seekHandle.style.left = `${progress}%`;
            }
        }
    }

    startSeeking(e) {
        this.isSeeking = true;
        this.seeking(e);
        // Clear hide timeout while seeking
        clearTimeout(this.hideControlsTimeout);
    }

    seeking(e) {
        if (!this.isSeeking) return;
        
        let clientX;
        if (e.type.startsWith('touch')) {
            clientX = e.touches[0].clientX;
        } else {
            clientX = e.clientX;
        }

        const rect = this.progressBar.getBoundingClientRect();
        const position = (clientX - rect.left) / rect.width;
        const seekTime = Math.max(0, Math.min(1, position)) * this.video.duration;
        
        // Update progress bar immediately for smooth visual feedback
        this.progressBarFill.style.width = `${position * 100}%`;
        
        // Update seek handle position
        const seekHandle = this.shadowRoot.querySelector('.seek-handle');
        if (seekHandle) {
            seekHandle.style.left = `${position * 100}%`;
        }

        // Only update video time on actual seek
        this.video.currentTime = seekTime;
    }

    endSeeking() {
        this.isSeeking = false;
        // Restart the hide timeout after seeking ends
        this.showControls();
    }
}

customElements.define('video-player', VideoPlayer);