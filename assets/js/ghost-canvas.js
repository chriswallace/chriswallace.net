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
      ghostCount: 2,
      maxRadius: 100,
      minRadius: 60,
      opacity: 0.02,
      speed: 0.5,
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
    this.canvas.style.zIndex = "-1";
    this.canvas.style.opacity = "0.6";

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

      // Smooth directional movement with noise influence
      ghost.baseX += ghost.speedX + noiseX * 2;
      ghost.baseY += ghost.speedY + noiseY * 2;

      // Wrap around screen edges with buffer
      const buffer = ghost.radius * 2;
      if (ghost.baseX < -buffer) ghost.baseX = this.width + buffer;
      if (ghost.baseX > this.width + buffer) ghost.baseX = -buffer;
      if (ghost.baseY < -buffer) ghost.baseY = this.height + buffer;
      if (ghost.baseY > this.height + buffer) ghost.baseY = -buffer;

      // Add subtle oscillation
      ghost.phase += 0.02;
      ghost.x = ghost.baseX + Math.sin(ghost.phase) * 30;
      ghost.y = ghost.baseY + Math.cos(ghost.phase * 0.7) * 20;

      // Occasionally change direction slightly
      if (Math.random() < 0.005) {
        ghost.speedX += (Math.random() - 0.5) * 0.2;
        ghost.speedY += (Math.random() - 0.5) * 0.2;

        // Keep speed within bounds
        ghost.speedX = Math.max(
          -this.config.speed * 2,
          Math.min(this.config.speed * 2, ghost.speedX)
        );
        ghost.speedY = Math.max(
          -this.config.speed * 2,
          Math.min(this.config.speed * 2, ghost.speedY)
        );
      }
    });
  }

  drawDistortion(ghost) {
    const gradient = this.ctx.createRadialGradient(
      ghost.x,
      ghost.y,
      0,
      ghost.x,
      ghost.y,
      ghost.radius
    );

    // Create subtle bump effect with varying opacity
    const centerOpacity = this.config.opacity * ghost.intensity;
    const edgeOpacity = centerOpacity * 0.1;

    gradient.addColorStop(0, `rgba(255, 255, 255, ${centerOpacity})`);
    gradient.addColorStop(0.3, `rgba(255, 255, 255, ${centerOpacity * 0.7})`);
    gradient.addColorStop(0.7, `rgba(255, 255, 255, ${centerOpacity * 0.3})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(ghost.x, ghost.y, ghost.radius, 0, Math.PI * 2);
    this.ctx.fill();

    // Add inner shadow for depth
    const shadowGradient = this.ctx.createRadialGradient(
      ghost.x,
      ghost.y,
      0,
      ghost.x,
      ghost.y,
      ghost.radius * 0.6
    );

    shadowGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    shadowGradient.addColorStop(1, `rgba(0, 0, 0, ${centerOpacity * 0.5})`);

    this.ctx.fillStyle = shadowGradient;
    this.ctx.beginPath();
    this.ctx.arc(ghost.x, ghost.y, ghost.radius * 0.6, 0, Math.PI * 2);
    this.ctx.fill();
  }

  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Set blend mode for subtle effect
    this.ctx.globalCompositeOperation = "overlay";

    // Draw each ghost distortion
    this.ghosts.forEach((ghost) => {
      this.drawDistortion(ghost);
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
  }
});

// Export for potential external use
window.GhostCanvas = GhostCanvas;
