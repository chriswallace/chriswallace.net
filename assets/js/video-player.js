class VideoPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.hasInteracted = false;
    this.hideControlsTimeout = null;
    this.isSeeking = false;
    this.wasPlaying = false;
    this.observer = null;
    this.fadeoutTimeout = null;

    // Store device capability flags
    this.isTouchDevice = false;
  }

  connectedCallback() {
    // Better touch detection than "ontouchstart" in window
    this.isTouchDevice = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;

    this.render(this.isTouchDevice);

    // First initialize all elements
    this.video = this.shadowRoot.querySelector("video");
    this.videoContainer = this;

    // Only initialize custom controls for non-touch devices
    if (!this.isTouchDevice) {
      this.playButton = this.shadowRoot.querySelector("#playButton");
      this.muteButton = this.shadowRoot.querySelector("#muteButton");
      this.fullscreenButton =
        this.shadowRoot.querySelector("#fullscreenButton");
      this.videoOverlay = this.shadowRoot.querySelector(".video-overlay");
      this.controls = this.shadowRoot.querySelector(".controls");
      this.progressBar = this.shadowRoot.querySelector(".progress-bar");
      this.progressBarFill =
        this.shadowRoot.querySelector(".progress-bar-fill");
    }

    // Add event listeners only after confirming video exists
    if (this.video) {
      // ---- FIX: compute these here (render() scope doesn't apply) ----
      const isMutedAttr = this.hasAttribute("muted");
      const shouldAutoplay =
        (this.isTouchDevice && isMutedAttr) || this.hasAttribute("autoplay");

      if (!this.isTouchDevice) {
        // Start muted for autoplay compatibility on desktop too (keeps it predictable)
        this.updateMuteButtonIcon(true);

        this.playButton?.addEventListener("click", () => this.togglePlay());
        this.videoOverlay?.addEventListener("click", () => this.togglePlay());
        this.muteButton?.addEventListener("click", () => this.toggleMute());
        this.fullscreenButton?.addEventListener("click", () =>
          this.toggleFullscreen()
        );

        // Progress bar event listeners
        this.progressBar?.addEventListener("mousedown", (e) =>
          this.startSeeking(e)
        );
        this.progressBar?.addEventListener("mousemove", (e) => this.seeking(e));
        this.progressBar?.addEventListener("mouseup", () => this.endSeeking());
        this.progressBar?.addEventListener("mouseleave", () =>
          this.endSeeking()
        );

        this.addEventListener("mousemove", () => this.showControls());
        this.addEventListener("mouseleave", () => this.hideControls());
      }

      // Video play/pause event listeners to update button icon
      this.video.addEventListener("play", () => {
        this.classList.remove("paused");
        this.updatePlayButtonIcon(false);
        this.showControls(true);
      });

      this.video.addEventListener("pause", () => {
        this.classList.add("paused");
        this.updatePlayButtonIcon(true);
      });

      // Progress bar event listeners
      this.video.addEventListener("timeupdate", () => this.updateProgressBar());

      // Keep visibility change handler for all devices
      document.addEventListener("visibilitychange", () =>
        this.handleVisibilityChange()
      );

      // ---- FIX: respect attribute intent, but keep autoplay safe ----
      // If autoplay is requested, force muted to satisfy mobile autoplay rules.
      this.video.muted = isMutedAttr || shouldAutoplay;

      // Mobile-specific playback behavior
      if (this.isTouchDevice) {
        this.video.disablePictureInPicture = true;

        // Ensure playsinline is set for iOS
        this.video.setAttribute("playsinline", "");
        this.video.setAttribute("webkit-playsinline", "");

        // ---- FIX: only attempt autoplay when allowed ----
        if (shouldAutoplay) {
          this.video.play().catch((err) => {
            console.log("Mobile autoplay failed:", err);
          });
        }
      } else {
        // Desktop: Only autoplay if the attribute is present
        if (this.hasAttribute("autoplay")) {
          this.video.play().catch((err) => {
            console.log("Autoplay failed:", err);
            this.classList.add("paused");
          });
          this.updatePlayButtonIcon(false);
        } else {
          this.classList.add("paused");
          this.updatePlayButtonIcon(true);
        }
      }

      // Set loop based on attribute
      this.video.loop = this.hasAttribute("loop");
    } else {
      console.error("Required video element not found");
      return;
    }

    this.setupIntersectionObserver();

    this.volumeBars = this.shadowRoot.querySelector("#volumeBars");
    this.volumeBars?.addEventListener("click", (e) =>
      this.handleVolumeBarClick(e)
    );
    this.updateVolumeBars(this.video.volume);

    if (this.video.paused) {
      this.showControls();
    }

    document.addEventListener("fullscreenchange", () =>
      this.handleFullscreenChange()
    );

    this.setupAccessibilityFeatures();

    this.video.addEventListener("loadedmetadata", () => {
      this.setupCaptions();
    });
  }

  render(isTouchDevice = false) {
    // Support both new mp4/webm attributes and legacy video-url
    const videoMp4 = this.getAttribute("video-mp4");
    const videoWebm = this.getAttribute("video-webm");
    const videoUrl = this.getAttribute("video-url"); // Legacy support
    const posterUrl = this.getAttribute("video-poster");
    const title = this.getAttribute("video-title");
    const description = this.getAttribute("video-description");
    const isMuted = this.hasAttribute("muted");
    const playsInline = this.hasAttribute("playsinline");

    // On mobile, autoplay by default if muted attribute is present
    const autoPlay =
      (isTouchDevice && isMuted) || this.hasAttribute("autoplay");
    const loop = this.hasAttribute("loop");

    // Build source elements - prefer webm first (better compression), then mp4 (better compatibility)
    let sourceElements = "";
    if (videoWebm) {
      sourceElements += `<source src="${videoWebm}" type="video/webm">`;
    }
    if (videoMp4) {
      sourceElements += `<source src="${videoMp4}" type="video/mp4">`;
    }
    // Fallback to legacy video-url if new attributes aren't provided
    if (!videoMp4 && !videoWebm && videoUrl) {
      sourceElements += `<source src="${videoUrl}" type="video/mp4">`;
    }

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
          pointer-events: ${isTouchDevice ? "auto" : "none"};
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
        .video-info p {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        :host(.paused) .video-info { opacity: 1; }

        ${
          !isTouchDevice
            ? `
          .video {
            pointer-events: none;
            z-index: 10;
            width: 100%;
            height: auto;
          }

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
            transition: opacity 0.3s ease;
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

          .play-button { position: static; display: flex; cursor: pointer; }

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

          .progress-bar:hover .seek-handle { opacity: 1; }

          .play-button svg { width: 24px; height: 24px; fill: white; stroke: transparent; }

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

          button:hover { transform: scale(1.05); }
          button:active { transform: scale(0.95); }

          .icon { width: 24px; height: 24px; stroke: var(--theme-color); stroke-width: 1.5px; }

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

          .button-group { display: flex; align-items: center; gap: 0; }

          /* Hide controls by default */
          .controls { opacity: 0; }
          .video-overlay { opacity: 0; }

          :host([data-has-interacted]:hover) .controls { opacity: 1; }
          :host([data-has-interacted]:hover) .video-overlay { opacity: 0.4; }

          :host(.paused[data-has-interacted]) .controls { opacity: 1; }
          :host(.paused[data-has-interacted]) .video-overlay { opacity: 1; }

          /* Initial state styles */
          :host(.paused:not([data-has-interacted])) .controls { opacity: 1; }
          :host(.paused:not([data-has-interacted])) .video-overlay { opacity: 1; }

          .buttons-container {
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

          .volume-bar:after {
            content: '';
            position: absolute;
            background: white;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 100%;
          }

          .volume-bar.active { opacity: 1; }

          .volume-bar:nth-child(1):after { height: 3px; }
          .volume-bar:nth-child(2):after { height: 7px; }
          .volume-bar:nth-child(3):after { height: 11px; }
          .volume-bar:nth-child(4):after { height: 15px; }
          .volume-bar:nth-child(5):after { height: 19px; }

          .time-display {
            color: white;
            font-size: 14px;
            padding: 2px 12px 0;
            opacity: 0.9;
            font-variant-numeric: tabular-nums;
            display: flex;
            align-items: center;
          }

          .right-controls { display: flex; align-items: center; }

          button:focus-visible,
          .progress-bar:focus-visible {
            outline: 2px solid var(--theme-color);
            outline-offset: 2px;
          }

          @media (forced-colors: active) {
            .icon { forced-color-adjust: auto; }
            .progress-bar-fill { background: CanvasText; }
          }
        `
            : ""
        }
      </style>

      ${!isTouchDevice ? `<div class="video-overlay"></div>` : ""}

      <video 
        id="video" 
        class="video" 
        width="100%"
        preload="metadata"
        ${isMuted ? "muted" : ""} 
        playsinline
        webkit-playsinline
        ${isTouchDevice ? "controls" : ""}
        ${posterUrl ? `poster="${posterUrl}"` : ""}
        ${autoPlay ? "autoplay" : ""}
        ${loop ? "loop" : ""}
        ${isTouchDevice ? "disablePictureInPicture" : ""}
      >
        ${sourceElements}
        Your browser does not support HTML5 video.
      </video>

      ${
        !isTouchDevice
          ? `
        <div class="controls">
          <div class="controls-bottom">
            ${
              title || description
                ? `
              <div class="video-info">
                ${title ? `<h2>${title}</h2>` : ""}
                ${description ? `<p>${description}</p>` : ""}
              </div>
            `
                : ""
            }

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
      `
          : ""
      }
    `;
  }

  togglePlay() {
    if (this.video.paused) {
      if (!this.hasAttribute("autoplay")) {
        this.video.muted = false;
        this.updateMuteButtonIcon(false);
      }

      this.video.play();
      this.classList.remove("paused");
      this.updatePlayButtonIcon(false);

      this.hasInteracted = true;
      this.setAttribute("data-has-interacted", "");
      this.style.setProperty("--controls-opacity", "1");

      const controls = this.shadowRoot.querySelector(".controls");
      if (controls) {
        controls.style.opacity = "1";
        controls.style.bottom = "0";
      }

      this.showControls(true);
    } else {
      this.video.pause();
      this.classList.add("paused");
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

    const playButton = this.shadowRoot.querySelector(
      "#playButton .play-button-inner"
    );
    if (playButton) {
      playButton.innerHTML = isPaused ? playIcon : pauseIcon;
    }
  }

  toggleMute() {
    this.video.muted = !this.video.muted;
    this.updateMuteButtonIcon(this.video.muted);
    this.updateVolumeBars(this.video.muted ? 0 : this.video.volume);
    this.hasInteracted = true;
    this.setAttribute("data-has-interacted", "");
    this.style.setProperty("--controls-opacity", "1");
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

    if (this.muteButton)
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
      this.videoContainer
        .requestFullscreen()
        .catch((err) => console.log("Fullscreen failed:", err));
    } else {
      document
        .exitFullscreen()
        .catch((err) => console.log("Exit fullscreen failed:", err));
    }

    if (this.fullscreenButton) {
      this.fullscreenButton.innerHTML = document.fullscreenElement
        ? minimizeIcon
        : maximizeIcon;
    }
  }

  hideControlsIfPlaying() {
    if (!this.video.paused && !this.video.muted && this.controls) {
      this.controls.classList.add("opacity-0");
    }
  }

  showControls(forceShow = false) {
    clearTimeout(this.hideControlsTimeout);

    if (this.controls) this.controls.style.opacity = "1";
    if (this.videoOverlay) this.videoOverlay.style.opacity = "0.4";

    if (!this.video.paused || forceShow) {
      this.hideControlsTimeout = setTimeout(() => {
        this.hideControls();
      }, 2000);
    }
  }

  hideControls() {
    clearTimeout(this.fadeoutTimeout);

    if (!this.video.paused && !this.isSeeking) {
      if (this.controls) this.controls.style.opacity = "0";
      if (this.videoOverlay) this.videoOverlay.style.opacity = "0";
    }
  }

  handleVisibilityChange() {
    if (document.hidden) this.video.pause();
  }

  updateProgressBar() {
    if (this.video.duration && this.progressBarFill) {
      const progress = (this.video.currentTime / this.video.duration) * 100;
      this.progressBarFill.style.width = `${progress}%`;

      const seekHandle = this.shadowRoot.querySelector(".seek-handle");
      if (seekHandle) seekHandle.style.left = `${progress}%`;

      const timeDisplay = this.shadowRoot.querySelector(".time-display");
      if (timeDisplay) {
        timeDisplay.textContent = `${this.formatTime(
          this.video.currentTime
        )} / ${this.formatTime(this.video.duration)}`;
      }
    }
  }

  startSeeking(e) {
    this.isSeeking = true;
    this.seeking(e);
    clearTimeout(this.hideControlsTimeout);
  }

  seeking(e) {
    if (!this.isSeeking || !this.progressBar) return;

    const clientX = e.type.startsWith("touch")
      ? e.touches[0].clientX
      : e.clientX;
    const rect = this.progressBar.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    const clamped = Math.max(0, Math.min(1, position));
    const seekTime = clamped * this.video.duration;

    if (this.progressBarFill)
      this.progressBarFill.style.width = `${clamped * 100}%`;

    const seekHandle = this.shadowRoot.querySelector(".seek-handle");
    if (seekHandle) seekHandle.style.left = `${clamped * 100}%`;

    this.video.currentTime = seekTime;
  }

  endSeeking() {
    this.isSeeking = false;
    this.showControls();
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            this.wasPlaying = !this.video.paused;
            if (!this.video.paused) this.video.pause();
          } else if (this.wasPlaying) {
            // ---- FIX: Only attempt auto-resume when muted (iOS-friendly) ----
            if (this.video.muted) {
              this.video.play().catch(() => {
                console.log("Auto-resume failed");
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    this.observer.observe(this);
  }

  disconnectedCallback() {
    if (this.observer) this.observer.disconnect();
  }

  handleVolumeBarClick(e) {
    if (e.target.classList.contains("volume-bar")) {
      const volume = parseFloat(e.target.dataset.volume);
      this.video.volume = volume;
      this.video.muted = false;
      this.updateMuteButtonIcon(false);
      this.updateVolumeBars(volume);
    }
  }

  updateVolumeBars(currentVolume) {
    const bars = this.shadowRoot.querySelectorAll(".volume-bar");
    bars.forEach((bar) => {
      const barVolume = parseFloat(bar.dataset.volume);
      if (barVolume <= currentVolume) bar.classList.add("active");
      else bar.classList.remove("active");
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

    if (this.fullscreenButton) {
      this.fullscreenButton.innerHTML = document.fullscreenElement
        ? minimizeIcon
        : maximizeIcon;
    }
    if (document.fullscreenElement) this.showControls(true);
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  setupAccessibilityFeatures() {
    const tabOrder = [
      this.playButton,
      this.muteButton,
      this.volumeBars,
      this.progressBar,
      this.fullscreenButton,
    ];

    tabOrder.forEach((element, index) => {
      if (element) element.setAttribute("tabindex", index + 1);
    });

    this.video.setAttribute(
      "aria-label",
      this.getAttribute("video-title") || "Video player"
    );

    this.progressBar?.setAttribute("role", "slider");
    this.progressBar?.setAttribute("aria-label", "Progress");
    this.progressBar?.setAttribute("aria-valuemin", "0");
    this.progressBar?.setAttribute("aria-valuemax", "100");
    this.progressBar?.setAttribute("aria-valuenow", "0");

    this.setupKeyboardControls();
  }

  setupCaptions() {
    const tracks = this.video.textTracks;
    if (tracks.length > 0) {
      const captionButton = document.createElement("button");
      captionButton.innerHTML = `
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5z"/>
          <path d="M7 8h3m-3 4h7m-7 4h3"/>
          <path d="M14 8h3m-3 4h3m-3 4h3"/>
        </svg>
        <span class="sr-only">Toggle Captions</span>
      `;
      captionButton.setAttribute("aria-label", "Toggle closed captions");

      const rightControls = this.shadowRoot.querySelector(".right-controls");
      rightControls?.insertBefore(captionButton, this.fullscreenButton);

      let captionsOn = false;
      captionButton.addEventListener("click", () => {
        captionsOn = !captionsOn;
        Array.from(tracks).forEach((track) => {
          if (track.kind === "captions" || track.kind === "subtitles") {
            track.mode = captionsOn ? "showing" : "hidden";
          }
        });
        captionButton.setAttribute("aria-pressed", captionsOn);
      });
    }
  }

  setupKeyboardControls() {
    this.addEventListener("keydown", (e) => {
      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          this.togglePlay();
          break;
        case "m":
          e.preventDefault();
          this.toggleMute();
          break;
        case "f":
          e.preventDefault();
          this.toggleFullscreen();
          break;
        case "ArrowLeft":
          e.preventDefault();
          this.video.currentTime = Math.max(0, this.video.currentTime - 5);
          break;
        case "ArrowRight":
          e.preventDefault();
          this.video.currentTime = Math.min(
            this.video.duration,
            this.video.currentTime + 5
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          this.video.volume = Math.min(1, this.video.volume + 0.1);
          this.updateVolumeBars(this.video.volume);
          break;
        case "ArrowDown":
          e.preventDefault();
          this.video.volume = Math.max(0, this.video.volume - 0.1);
          this.updateVolumeBars(this.video.volume);
          break;
      }
    });
  }
}

customElements.define("video-player", VideoPlayer);
