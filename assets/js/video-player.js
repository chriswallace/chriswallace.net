class VideoPlayer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.hasInteracted = false;
        this.hideControlsTimeout = null;
    }

    connectedCallback() {
        this.render();
                
        // First initialize all elements
        this.video = this.shadowRoot.querySelector('video');
        this.videoContainer = this;
        this.playButton = this.shadowRoot.querySelector('#playButton');
        this.muteButton = this.shadowRoot.querySelector('#muteButton');
        this.fullscreenButton = this.shadowRoot.querySelector('#fullscreenButton');
        this.videoOverlay = this.shadowRoot.querySelector('.video-overlay');
        this.controls = this.shadowRoot.querySelector('.controls');

        // Add event listeners only after confirming video exists
        if (this.video) {
            this.playButton?.addEventListener('click', () => this.togglePlay());
            this.videoOverlay?.addEventListener('click', () => this.togglePlay());
            this.muteButton?.addEventListener('click', () => this.toggleMute());
            this.fullscreenButton?.addEventListener('click', () => this.toggleFullscreen());
            document.addEventListener('visibilitychange', () => this.handleVisibilityChange());

            // Video-specific event listeners
            this.video.addEventListener('play', () => {
                this.classList.remove('paused');
            });

            this.video.addEventListener('pause', () => {
                this.classList.add('paused');
            });

            // Initial state
            this.video.muted = true;
            this.video.play().catch(() => {
                this.classList.add('paused');
            });
        } else {
            console.error('Required video element not found');
        }
    }

    render() {
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
                    overflow: hidden; /* Ensure no gaps at edges */
                }
                .video-overlay {
                    position: absolute;
                    top: -1px; /* Extend slightly beyond bounds */
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
                    flex-direction: row;
                    align-items: end;
                    justify-content: space-between;
                    pointer-events: auto;
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
                    width: 80px;
                    height: 80px;
                    background-color: rgba(255, 255, 255, 0.85);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .play-button-inner:hover {
                    background-color: rgba(255, 255, 255, 1);
                }
                .play-button svg {
                    width: 40px;
                    height: 40px;
                    transform: translateX(2px);
                    fill: black;
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
            </style>
            <div class="video-overlay"></div>
            <video id="video" class="video" width="100%" ${isMuted ? 'muted' : ''} ${playsInline ? 'playsinline' : ''} autoplay loop>
                <source src="${videoUrl}" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
            <div class="controls">
                <div class="button-group">
                    <button id="muteButton">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-off icon">
                            <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
                            <path d="M16 9a5 5 0 0 1 0 6"/>
                            <path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>
                        </svg>
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
            <div id="playButton" class="play-button">
                <div class="play-button-inner">
                    <svg class="icon" id="playIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v18l15-9L5 3z" />
                    </svg>
                </div>
                <span class="sr-only">Play</span>
            </div>
        `;
    }

    togglePlay() {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }

    toggleMute() {
        const muteIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-off icon">
                <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
                <path d="M16 9a5 5 0 0 1 0 6"/>
                <path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>
            </svg>
            <span class="sr-only">Mute</span>
        `;
        const unmuteIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-2 icon">
                <path d="M16 9a5 5 0 0 1 .95 2.293"/>
                <path d="M19.364 5.636a9 9 0 0 1 1.889 9.96"/>
                <path d="m2 2 20 20"/>
                <path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"/>
                <path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686"/>
            </svg>
            <span class="sr-only">Unmute</span>
        `;

        this.video.muted = !this.video.muted;
        this.muteButton.innerHTML = this.video.muted ? unmuteIcon : muteIcon;
        this.hasInteracted = true;
        this.hideControlsIfPlaying();
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
        this.controls.classList.remove('opacity-0');
        clearTimeout(this.hideControlsTimeout);
        this.hideControlsTimeout = setTimeout(() => {
            this.hideControlsIfPlaying();
        }, 3000);
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.video.pause();
        }
    }
}

customElements.define('video-player', VideoPlayer);