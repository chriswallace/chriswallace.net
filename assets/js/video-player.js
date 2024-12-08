class VideoPlayer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.hasInteracted = false;
        this.hideControlsTimeout = null;
        this.isSeeking = false;
        this.wasPlaying = false;
        this.observer = null;
        this.fadeoutTimeout = null;
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
            
            // Only autoplay if the attribute is present
            if (this.hasAttribute('autoplay')) {
                this.video.play().catch(() => {
                    if (!isTouchDevice) {
                        this.classList.add('paused');
                    }
                });
            } else {
                this.classList.add('paused');
            }

            // Set loop based on attribute
            this.video.loop = this.hasAttribute('loop');
        } else {
            console.error('Required video element not found');
        }

        this.setupIntersectionObserver();

        this.volumeBars = this.shadowRoot.querySelector('#volumeBars');
        this.volumeBars?.addEventListener('click', (e) => this.handleVolumeBarClick(e));
        this.updateVolumeBars(this.video.volume);

        // Ensure controls are visible initially
        this.showControls();

        // Add this after other event listeners
        document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
    }

    render(isTouchDevice = false) {
        const videoUrl = this.getAttribute('video-url');
        const posterUrl = this.getAttribute('video-poster');
        const title = this.getAttribute('video-title');
        const description = this.getAttribute('video-description');
        const isMuted = this.hasAttribute('muted');
        const playsInline = this.hasAttribute('playsinline');
        const autoPlay = this.hasAttribute('autoplay');
        const loop = this.hasAttribute('loop');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    position: relative;
                    justify-content: center;
                    align-items: center;
                    background-color: black;
                    overflow: hidden;
                    --theme-color: var(--video-theme-color, currentColor);
                    text-align: left;
                    container-type: inline-size;
                }

                :host(:fullscreen) {
                    border-radius: 0 !important;
                }

                .video {
                    pointer-events: ${isTouchDevice ? 'auto' : 'none'};
                    z-index: 10;
                }
                .video-info {
                    position: static;
                    padding: 0 24px;
                    color: white;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
                    margin-bottom: 12px;
                }
                
                .video-info h2 {
                    margin: 0 0 4px;
                    font-size: 22px;
                    font-weight: 700;
                }
                
                .video-info p {
                    margin: 0;
                    font-size: 14px;
                    line-height: 18px;
                    opacity: 0.74;
                }

                .video-info h2,
                .video-info p{
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 1; /* number of lines to show */
                    line-clamp: 1; 
                    -webkit-box-orient: vertical;
                }
                
                :host(.paused) .video-info {
                    opacity: 1;
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
                        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 80%);
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
                        width: 100%;
                        height: auto;
                    }
                    .controls {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: 40;
                        display: flex;
                        flex-direction: column;
                        pointer-events: auto;
                        opacity: 1;
                        transition: opacity 0.3s ease;
                        background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
                        padding-bottom: 8px;
                    }
                    .play-info-container {
                        display: flex;
                        align-items: center;
                        gap: 16px;
                        opacity: 1;
                        pointer-events: none;
                        transition: opacity 0.3s ease;
                    }
                    .play-info-container:has(.video-info) {
                        justify-content: flex-start;
                        margin-left: 24px;
                    }
                    .play-info-container:not(:has(.video-info)) {
                        justify-content: center;
                    }
                    .left-controls {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    .play-button {
                        position: static;
                        display: flex;
                        cursor: pointer;
                    }
                    .play-button-inner {
                        display: flex;
                        padding: 0 14px 0 24px;
                        height: 100%;
                        align-items: center;
                        justify-content: center;
                        opacity: 0.85;
                    }
                    .progress-bar-container {
                        grid-row: 1;
                        height: 24px;
                        display: flex;
                        align-items: center;
                    }
                    .progress-bar {
                        width: 100%;
                        height: 4px;
                        background: rgba(255, 255, 255, 0.2);
                        position: relative;
                        cursor: pointer;
                        margin: 10px 0;
                    }
                    .progress-bar:hover {
                        height: 8px;
                        margin-top: 8px;
                        margin-bottom: 8px;
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
                    .play-button svg {
                        width: 24px;
                        height: 24px;
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
                        gap: 0;
                    }   

                    /* Hide controls by default */
                    .controls {
                        opacity: 0;
                    }

                    /* Only show controls on hover if user has interacted */
                    :host([data-has-interacted]:hover) .controls{
                        opacity: 1;
                    }

                    /* Only show controls when paused if user has interacted */
                    :host(.paused[data-has-interacted]) .controls {
                        opacity: 1;
                    }

                    /* Remove the general hover rule that was showing controls */
                    :host(:hover) .controls {
                        opacity: 1;
                    }

                    /* Show controls by default on touch devices */
                    @media (hover: none) {
                        .controls {
                            opacity: var(--controls-opacity, 0);
                        }
                    }

                    /* Show controls on hover for non-touch devices */
                    :host(:hover) .controls {
                        opacity: var(--controls-opacity,0);
                    }

                    /* Show controls when paused AND user has interacted */
                    :host(.paused[data-has-interacted]) .controls {
                        opacity: 1;
                    }

                    .buttons-container{
                        display: flex;
                        justify-content: space-between;
                    }

                    .volume-bars {
                        display: flex;
                        align-items: flex-end;
                        justify-content: space-between;
                        gap: 0;
                        height: 18px;
                        padding: 0;
                        width: calc(4px * 5);
                        cursor: pointer;
                    }

                    .volume-bar {
                        width: 4px;
                        opacity: 0.3;
                        transition: opacity 0.2s, height 0.2s;
                        cursor: pointer;
                        position: relative;
                        height: 20px;
                    }

                    .volume-bar:after{
                        content: '';
                        position: absolute;
                        background: white;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 2px;
                        height: 100%;
                    }

                    .volume-bar.active {
                        opacity: 1;
                    }

                    .volume-bar:nth-child(1):after { height: 3px; }
                    .volume-bar:nth-child(2):after { height: 7px; }
                    .volume-bar:nth-child(3):after { height: 11px; }
                    .volume-bar:nth-child(4):after { height: 15px; }
                    .volume-bar:nth-child(5):after { height: 19px; }

                    /* Initial state styles */
                    :host(.paused:not([data-has-interacted])) .controls {
                        opacity: 1;
                    }

                    /* Center play button in initial state */
                    :host(.paused:not([data-has-interacted])) .controls-top {
                        display: grid;
                        place-items: center;
                        height: 100%;
                    }

                    :host(.paused:not([data-has-interacted])) .play-info-container {
                        margin: 0;
                        justify-self: center;
                        align-self: center;
                    }

                    /* Restore bottom controls after interaction */
                    :host([data-has-interacted]) .controls-bottom {
                        position: relative;
                        visibility: visible;
                    }

                    /* Small screen adjustments */
                    @container (max-width: 640px) {
                        .controls {
                            grid-template-rows: 1fr auto auto;
                        }
                        
                        .controls-bottom {
                            padding: 0 8px 8px;
                            gap: 4px;
                        }
                    }

                    /* Center play button in initial state */
                    :host(.paused:not([data-has-interacted])) .controls-top {
                        display: grid;
                        place-items: center;
                        height: 100%;
                    }

                    :host(.paused:not([data-has-interacted])) .play-info-container {
                        margin: 0;
                        justify-self: center;
                        align-self: center;
                    }

                    /* Remove any potential offsets in initial state */
                    :host(.paused:not([data-has-interacted])) .controls-top,
                    :host(.paused:not([data-has-interacted])) .play-info-container:not(:has(.video-info)) {
                        padding: 0;
                    }

                    .play-info-container {
                        opacity: 1;
                        transition: opacity 0.3s ease;
                    }

                    :host(:hover) .play-info-container {
                        opacity: 1;
                    }

                    .time-display {
                        color: white;
                        font-size: 14px;
                        padding: 2px 12px 0;
                        opacity: 0.9;
                        font-variant-numeric: tabular-nums;
                        display: flex;
                        align-items: center;
                    }

                    .right-controls {
                        display: flex;
                        align-items: center;
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
                ${posterUrl ? `poster="${posterUrl}"` : ''}
                ${autoPlay ? 'autoplay' : ''}
                ${loop ? 'loop' : ''}
            >
                <source src="${videoUrl}" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
            ${!isTouchDevice ? `
                <div class="controls">
                    <div class="controls-bottom">
                        ${(title || description) ? `
                            <div class="video-info">
                                ${title ? `<h2>${title}</h2>` : ''}
                                ${description ? `<p>${description}</p>` : ''}
                            </div>
                        ` : ''}
                        <div class="progress-bar-container">
                            <div class="progress-bar">
                                <div class="progress-bar-fill"></div>
                                <div class="seek-handle"></div>
                            </div>
                        </div>
                        <div class="buttons-container">
                            <div class="left-controls">
                                <div class="button-group">
                                    <div id="playButton" class="play-button">
                                        <div class="play-button-inner">
                                            <svg width="14" height="16" viewBox="0 0 14 16" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.5 14.3507V1.64929C0.5 0.871991 1.34797 0.391878 2.0145 0.791793L12.599 7.14251C13.2464 7.53091 13.2464 8.46909 12.599 8.85749L2.0145 15.2082C1.34797 15.6081 0.5 15.128 0.5 14.3507Z" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                        <span class="sr-only">Play</span>
                                    </div>
                                    <button id="muteButton">
                                        <span class="sr-only">Mute</span>
                                    </button>
                                    <div id="volumeBars" class="volume-bars">
                                        <div class="volume-bar" data-volume="0.2"></div>
                                        <div class="volume-bar" data-volume="0.4"></div>
                                        <div class="volume-bar" data-volume="0.6"></div>
                                        <div class="volume-bar" data-volume="0.8"></div>
                                        <div class="volume-bar" data-volume="1.0"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="right-controls">
                                <div class="time-display">0:00 / 0:00</div>
                                <button id="fullscreenButton">
                                    <svg class="icon" id="fullscreenIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
                                    </svg>
                                    <span class="sr-only">Fullscreen</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ` : ''}
        `;
    }

    togglePlay() {
        if (this.video.paused) {
            if (!this.hasAttribute('autoplay')) {
                this.video.muted = false;
                this.updateMuteButtonIcon(false);
            }
            
            this.video.play();
            this.classList.remove('paused');
            this.updatePlayButtonIcon(false);
            // Mark as interacted and show controls with animation
            this.hasInteracted = true;
            this.setAttribute('data-has-interacted', '');
            this.style.setProperty('--controls-opacity', '1');
            
            // Ensure controls are visible initially
            const controls = this.shadowRoot.querySelector('.controls');
            controls.style.opacity = '1';
            controls.style.bottom = '0';
            
            // Start the hide timer
            this.showControls(true);
        } else {
            this.video.pause();
            this.classList.add('paused');
            this.updatePlayButtonIcon(true);
            clearTimeout(this.hideControlsTimeout);
            this.showControls(true);
        }
    }

    updatePlayButtonIcon(isPaused) {
        const playIcon = `
            <svg width="14" height="16" viewBox="0 0 14 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 14.3507V1.64929C0.5 0.871991 1.34797 0.391878 2.0145 0.791793L12.599 7.14251C13.2464 7.53091 13.2464 8.46909 12.599 8.85749L2.0145 15.2082C1.34797 15.6081 0.5 15.128 0.5 14.3507Z"/>
            </svg>
        `;
        const pauseIcon = `
            <svg width="14" height="16" viewBox="0 0 14 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="0.5" width="3" height="15" rx="1"/>
                <rect x="9" y="0.5" width="3" height="15" rx="1"/>
            </svg>
        `;
        
        const playButton = this.shadowRoot.querySelector('#playButton .play-button-inner');
        if (playButton) {
            playButton.innerHTML = isPaused ? playIcon : pauseIcon;
        }
    }

    toggleMute() {
        this.video.muted = !this.video.muted;
        this.updateMuteButtonIcon(this.video.muted);
        this.updateVolumeBars(this.video.muted ? 0 : this.video.volume);
        this.hasInteracted = true;
        this.setAttribute('data-has-interacted', '');
        this.style.setProperty('--controls-opacity', '1');
        this.hideControlsIfPlaying();
        this.showControls(true);
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
            this.videoContainer.requestFullscreen().catch(err => console.log("Fullscreen failed:", err));
        } else {
            document.exitFullscreen().catch(err => console.log("Exit fullscreen failed:", err));
        }
    }

    hideControlsIfPlaying() {
        if (!this.video.paused && !this.video.muted) {
            this.controls.classList.add('opacity-0');
        }
    }

    showControls(forceShow = false) {
        clearTimeout(this.hideControlsTimeout);
        this.controls.style.opacity = '1';

        if (!this.video.paused || forceShow) {
            this.hideControlsTimeout = setTimeout(() => {
                this.hideControls();
            }, 2000);
        }
    }

    hideControls() {
        // Clear any existing fadeout timeout
        clearTimeout(this.fadeoutTimeout);
        
        if (!this.video.paused && !this.isSeeking) {
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

            // Update time display
            const timeDisplay = this.shadowRoot.querySelector('.time-display');
            if (timeDisplay) {
                timeDisplay.textContent = `${this.formatTime(this.video.currentTime)} / ${this.formatTime(this.video.duration)}`;
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

    setupIntersectionObserver() {
        this.observer =new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    // Store current playing state and pause if playing
                    this.wasPlaying = !this.video.paused;
                    if (!this.video.paused) {
                        this.video.pause();
                    }
                } else if (this.wasPlaying) {
                    // Resume if it was playing before
                    this.video.play().catch(() => {
                        console.log('Auto-resume failed');
                    });
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of the video is visible
        });

        this.observer.observe(this);
    }

    disconnectedCallback() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    handleVolumeBarClick(e) {
        if (e.target.classList.contains('volume-bar')) {
            const volume = parseFloat(e.target.dataset.volume);
            this.video.volume = volume;
            this.video.muted = false;
            this.updateMuteButtonIcon(false);
            this.updateVolumeBars(volume);
        }
    }

    updateVolumeBars(currentVolume) {
        const bars = this.shadowRoot.querySelectorAll('.volume-bar');
        bars.forEach(bar => {
            const barVolume = parseFloat(bar.dataset.volume);
            if (barVolume <= currentVolume) {
                bar.classList.add('active');
            } else {
                bar.classList.remove('active');
            }
        });
    }

    handleFullscreenChange() {
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
        
        this.fullscreenButton.innerHTML = document.fullscreenElement ? minimizeIcon : maximizeIcon;
        if (document.fullscreenElement) {
            this.showControls(true);
        }
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

customElements.define('video-player', VideoPlayer);
