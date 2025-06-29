class GhostCanvas {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.width = 0;
    this.height = 0;
    this.time = 0;
    this.ghosts = [];
    this.animationId = null;

    // Configuration
    this.config = {
      ghostCount: 1, // Single entity
      maxRadius: 400,
      minRadius: 350,
      opacity: 0.6,
      speed: 0.2, // Slow, mysterious movement
      noiseScale: 0.005,
      distortionIntensity: 15,
    };

    this.init();
  }

  init() {
    this.createCanvas();
    this.createGhosts();
    this.handleResize();
    this.animate();

    // Handle window resize
    window.addEventListener("resize", () => this.handleResize());
  }

  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "fixed";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = "100vw";
    this.canvas.style.height = "100vh";
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.zIndex = "-1"; // Back to background
    this.canvas.style.opacity = "0.8";

    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
  }

  createGhosts() {
    this.ghosts = [];
    for (let i = 0; i < this.config.ghostCount; i++) {
      this.ghosts.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        baseX: Math.random() * this.width,
        baseY: Math.random() * this.height,
        radius:
          this.config.minRadius +
          Math.random() * (this.config.maxRadius - this.config.minRadius),
        phase: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * this.config.speed,
        speedY: (Math.random() - 0.5) * this.config.speed,
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
        intensity: 0.3 + Math.random() * 0.7,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.002 + Math.random() * 0.003,
        distortionPhase: Math.random() * Math.PI * 2,
        distortionSpeed: 0.001 + Math.random() * 0.002,
        tendrilRandomness: Math.random() * 0.5 + 0.5,
        coreFluctuation: Math.random() * 0.3 + 0.7,
        lastDirectionChange: 0,
        directionChangeInterval: 3000 + Math.random() * 4000,
      });
    }
  }

  handleResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Reposition ghosts if they're outside the new bounds
    this.ghosts.forEach((ghost) => {
      if (ghost.baseX > this.width) ghost.baseX = this.width * 0.8;
      if (ghost.baseY > this.height) ghost.baseY = this.height * 0.8;
    });
  }

  // Simple noise function for organic movement
  noise(x, y, time) {
    // Multi-octave noise for more complex, human-like movement
    const octave1 =
      Math.sin(x * 0.01 + time * 0.001) * Math.cos(y * 0.008 + time * 0.0008);
    const octave2 =
      Math.sin(x * 0.025 + time * 0.0015) *
      Math.cos(y * 0.02 + time * 0.0012) *
      0.5;
    const octave3 = Math.sin((x + y) * 0.005 + time * 0.0005) * 0.25;

    return octave1 + octave2 + octave3;
  }

  updateGhosts() {
    this.ghosts.forEach((ghost) => {
      // Organic movement using noise
      const noiseX = this.noise(
        ghost.noiseOffsetX + this.time * 0.002,
        ghost.noiseOffsetY,
        this.time
      );
      const noiseY = this.noise(
        ghost.noiseOffsetX,
        ghost.noiseOffsetY + this.time * 0.0015,
        this.time
      );

      // Random direction changes for more alive behavior
      if (
        this.time - ghost.lastDirectionChange >
        ghost.directionChangeInterval
      ) {
        ghost.speedX += (Math.random() - 0.5) * 0.4;
        ghost.speedY += (Math.random() - 0.5) * 0.4;
        ghost.lastDirectionChange = this.time;
        ghost.directionChangeInterval = 3000 + Math.random() * 4000;

        // Keep speed within bounds
        const maxSpeed = this.config.speed * 3;
        ghost.speedX = Math.max(-maxSpeed, Math.min(maxSpeed, ghost.speedX));
        ghost.speedY = Math.max(-maxSpeed, Math.min(maxSpeed, ghost.speedY));
      }

      // Smooth directional movement with noise influence
      ghost.baseX += ghost.speedX + noiseX * 3;
      ghost.baseY += ghost.speedY + noiseY * 3;

      // Keep within canvas bounds with soft boundaries
      const margin = ghost.radius;
      if (ghost.baseX < margin) {
        ghost.baseX = margin;
        ghost.speedX = Math.abs(ghost.speedX) * 0.5; // Bounce and slow down
      }
      if (ghost.baseX > this.width - margin) {
        ghost.baseX = this.width - margin;
        ghost.speedX = -Math.abs(ghost.speedX) * 0.5;
      }
      if (ghost.baseY < margin) {
        ghost.baseY = margin;
        ghost.speedY = Math.abs(ghost.speedY) * 0.5;
      }
      if (ghost.baseY > this.height - margin) {
        ghost.baseY = this.height - margin;
        ghost.speedY = -Math.abs(ghost.speedY) * 0.5;
      }

      // Update random phases
      ghost.phase += 0.02 + Math.sin(this.time * 0.001) * 0.01;
      ghost.pulsePhase += ghost.pulseSpeed;
      ghost.distortionPhase += ghost.distortionSpeed;

      // Add subtle oscillation with random variations
      const oscillationX =
        Math.sin(ghost.phase) * 20 + Math.sin(ghost.phase * 1.3) * 10;
      const oscillationY =
        Math.cos(ghost.phase * 0.7) * 15 + Math.cos(ghost.phase * 0.9) * 8;

      ghost.x = ghost.baseX + oscillationX;
      ghost.y = ghost.baseY + oscillationY;
    });
  }

  drawDistortion(ghost) {
    const centerX = ghost.x;
    const centerY = ghost.y;
    const maxRadius = ghost.radius;

    // First, draw the colored glow layer behind everything
    this.drawGlowLayer(ghost, centerX, centerY, maxRadius);

    // Then draw the dark singularity on top
    this.drawShadowLayer(ghost, centerX, centerY, maxRadius);
  }

  drawGlowLayer(ghost, centerX, centerY, maxRadius) {
    // Create a larger, softer glow behind the singularity
    const glowRadius = maxRadius * 2.2;
    const glowIntensity = this.config.opacity * ghost.intensity * 0.5;

    // Subtle green color that shifts over time
    const hueShift = Math.sin(ghost.distortionPhase * 0.5) * 30;
    const baseHue = 120 + hueShift; // Green range (120 is pure green)

    // Multiple glow layers for depth
    const glowLayers = 4;
    for (let layer = 0; layer < glowLayers; layer++) {
      const layerProgress = layer / glowLayers;
      const layerRadius = glowRadius * (0.3 + layerProgress * 0.7);
      const layerOpacity = glowIntensity * (1 - layerProgress * 0.6);

      const glowGradient = this.ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        layerRadius
      );

      // More saturated green glow
      const saturation = 70 - layer * 12;
      const lightness = 30 + layer * 8;

      glowGradient.addColorStop(
        0,
        `hsla(${baseHue}, ${saturation}%, ${lightness}%, ${layerOpacity})`
      );
      glowGradient.addColorStop(
        0.4,
        `hsla(${baseHue + 10}, ${saturation * 0.8}%, ${lightness * 0.8}%, ${
          layerOpacity * 0.7
        })`
      );
      glowGradient.addColorStop(
        0.8,
        `hsla(${baseHue + 20}, ${saturation * 0.5}%, ${lightness * 0.6}%, ${
          layerOpacity * 0.3
        })`
      );
      glowGradient.addColorStop(
        1,
        `hsla(${baseHue}, ${saturation}%, ${lightness}%, 0)`
      );

      this.ctx.fillStyle = glowGradient;
      this.ctx.beginPath();

      // Organic glow shape
      const points = 12;
      const pulseIntensity = Math.sin(ghost.pulsePhase + layer * 0.3) * 0.1;

      this.ctx.moveTo(
        centerX + Math.cos(0) * layerRadius * (1 + pulseIntensity),
        centerY + Math.sin(0) * layerRadius * (1 + pulseIntensity)
      );

      for (let p = 1; p <= points; p++) {
        const angle = (p / points) * Math.PI * 2;
        const distortion =
          Math.sin(angle * 2 + ghost.distortionPhase + layer * 0.2) * 0.15 +
          Math.cos(angle * 3 + ghost.pulsePhase) * 0.1;

        const radius = layerRadius * (1 + distortion + pulseIntensity);

        this.ctx.lineTo(
          centerX + Math.cos(angle) * radius,
          centerY + Math.sin(angle) * radius
        );
      }

      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  drawShadowLayer(ghost, centerX, centerY, maxRadius) {
    // Create multiple concentric rings for gravitational lensing effect
    const rings = 8;

    for (let ring = 0; ring < rings; ring++) {
      const ringProgress = ring / rings;
      const ringRadius = maxRadius * (0.2 + ringProgress * 0.8);
      const ringOpacity =
        this.config.opacity * (1 - ringProgress * 0.7) * ghost.intensity;

      // Create distortion gradient for each ring
      const gradient = this.ctx.createRadialGradient(
        centerX,
        centerY,
        ringRadius * 0.1,
        centerX,
        centerY,
        ringRadius
      );

      // Dark void colors with subtle variations
      const hue = Math.sin(ghost.distortionPhase + ring * 0.5) * 40; // More color variation
      const innerDarkness = ringOpacity * (0.9 - ring * 0.08);
      const outerDarkness = ringOpacity * (0.3 - ring * 0.03);

      gradient.addColorStop(0, `hsla(${240 + hue}, 20%, 5%, ${innerDarkness})`);
      gradient.addColorStop(
        0.3,
        `hsla(${220 + hue}, 30%, 8%, ${innerDarkness * 0.8})`
      );
      gradient.addColorStop(
        0.7,
        `hsla(${200 + hue}, 25%, 12%, ${outerDarkness})`
      );
      gradient.addColorStop(1, `hsla(${180 + hue}, 15%, 15%, 0)`);

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();

      // Create organic, pulsing shape with more random distortion
      const points = 16;
      const pulseIntensity = Math.sin(ghost.pulsePhase + ring * 0.2) * 0.15;
      const randomDistortion = Math.sin(ghost.distortionPhase * 1.3) * 0.1;

      this.ctx.moveTo(
        centerX +
          Math.cos(0) * ringRadius * (1 + pulseIntensity + randomDistortion),
        centerY +
          Math.sin(0) * ringRadius * (1 + pulseIntensity + randomDistortion)
      );

      for (let p = 1; p <= points; p++) {
        const angle = (p / points) * Math.PI * 2;

        // Create more chaotic gravitational distortion
        const distortion =
          Math.sin(angle * 3 + ghost.distortionPhase + ring * 0.3) * 0.2 +
          Math.cos(angle * 2 + ghost.pulsePhase + ring * 0.1) * 0.15 +
          Math.sin(angle * 5 + this.time * 0.006 + ring) * 0.08 +
          (Math.random() - 0.5) * 0.05; // Add pure randomness

        const radius =
          ringRadius * (1 + distortion + pulseIntensity + randomDistortion);

        this.ctx.lineTo(
          centerX + Math.cos(angle) * radius,
          centerY + Math.sin(angle) * radius
        );
      }

      this.ctx.closePath();
      this.ctx.fill();
    }

    // Add central void/singularity core with fluctuation
    const coreRadius =
      maxRadius *
      0.25 *
      ghost.coreFluctuation *
      (1 + Math.sin(ghost.pulsePhase) * 0.2);
    const coreGradient = this.ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      coreRadius
    );

    const coreIntensity = this.config.opacity * ghost.intensity * 0.9;
    coreGradient.addColorStop(0, `rgba(0, 0, 0, ${coreIntensity})`);
    coreGradient.addColorStop(0.6, `rgba(10, 5, 20, ${coreIntensity * 0.8})`);
    coreGradient.addColorStop(1, `rgba(20, 10, 30, ${coreIntensity * 0.3})`);

    this.ctx.fillStyle = coreGradient;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
    this.ctx.fill();

    // Add more random, spindly energy tendrils
    const tendrils = 8 + Math.floor(Math.random() * 4); // 8-12 tendrils
    for (let t = 0; t < tendrils; t++) {
      const tendrilAngle =
        (t / tendrils) * Math.PI * 2 +
        ghost.distortionPhase * 0.5 +
        Math.sin(this.time * 0.003 + t) * 0.3;
      const tendrilLength =
        maxRadius *
        (1.2 + Math.sin(ghost.pulsePhase + t) * 0.4 + Math.random() * 0.3);
      const tendrilWidth =
        4 + Math.sin(ghost.distortionPhase + t) * 6 + Math.random() * 4;

      // Make tendrils more spindly and random
      const segments = 3;
      let currentX = centerX + Math.cos(tendrilAngle) * coreRadius;
      let currentY = centerY + Math.sin(tendrilAngle) * coreRadius;

      for (let s = 0; s < segments; s++) {
        const segmentProgress = (s + 1) / segments;
        const segmentAngle =
          tendrilAngle + (Math.random() - 0.5) * 0.8 * ghost.tendrilRandomness;
        const segmentLength =
          (tendrilLength / segments) * (1 + Math.random() * 0.5);

        const endX = currentX + Math.cos(segmentAngle) * segmentLength;
        const endY = currentY + Math.sin(segmentAngle) * segmentLength;

        const tendrilGradient = this.ctx.createLinearGradient(
          currentX,
          currentY,
          endX,
          endY
        );
        const tendrilOpacity =
          this.config.opacity *
          ghost.intensity *
          0.3 *
          (1 - segmentProgress * 0.5);

        tendrilGradient.addColorStop(0, `rgba(20, 10, 40, ${tendrilOpacity})`);
        tendrilGradient.addColorStop(
          0.5,
          `rgba(10, 5, 25, ${tendrilOpacity * 0.6})`
        );
        tendrilGradient.addColorStop(1, `rgba(0, 0, 0, 0)`);

        this.ctx.strokeStyle = tendrilGradient;
        this.ctx.lineWidth = tendrilWidth * (1 - segmentProgress * 0.3);
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(currentX, currentY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();

        currentX = endX;
        currentY = endY;
      }
    }
  }

  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw each singularity with layered effects
    this.ghosts.forEach((ghost) => {
      // First draw the glow with normal blending
      this.ctx.globalCompositeOperation = "screen"; // Additive glow effect
      this.drawGlowLayer(ghost, ghost.x, ghost.y, ghost.radius);

      // Then draw the shadow with multiply blending
      this.ctx.globalCompositeOperation = "multiply";
      this.drawShadowLayer(ghost, ghost.x, ghost.y, ghost.radius);
    });

    // Reset blend mode
    this.ctx.globalCompositeOperation = "source-over";
  }

  animate() {
    this.time += 16; // Approximate 60fps timing
    this.updateGhosts();
    this.render();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Only initialize on homepage
  if (
    document.body.classList.contains("home") ||
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html"
  ) {
    new GhostCanvas();

    // Initialize scroll-based background color animation
    let isScrolling = false;
    let scrollTimeout;

    const handleScrollBackground = () => {
      const scrollY = window.scrollY;
      const maxScroll = 200; // Distance to fully transition to dark color

      // Calculate opacity for the overlay
      const progress = Math.min(scrollY / maxScroll, 1);

      if (!isScrolling) {
        isScrolling = true;
        // Create or update the background overlay
        let overlay = document.querySelector(".scroll-background-overlay");
        if (!overlay) {
          overlay = document.createElement("div");
          overlay.className = "scroll-background-overlay";
          overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #181818;
            opacity: 0;
            pointer-events: none;
            z-index: -1;
            transition: opacity 0.3s ease-out;
          `;
          document.body.appendChild(overlay);
        }
      }

      // Update overlay opacity
      const overlay = document.querySelector(".scroll-background-overlay");
      if (overlay) {
        overlay.style.opacity = progress;
      }

      // Clear the timeout and set a new one
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScrollBackground, {
      passive: true,
    });
  }
});

// Export for potential external use
window.GhostCanvas = GhostCanvas;
