class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['overline', 'title', 'media-src', 'media-type'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const overline = this.getAttribute('overline') || '';
    const title = this.getAttribute('title') || '';
    const mediaSrc = this.getAttribute('media-src') || '';
    const mediaType = this.getAttribute('media-type') || 'image';
    const href = this.getAttribute('href') || '';

    const content = `
      <div class="overlay">
        <span class="overline">${overline}</span>
        <h3 class="title">${title}</h3>
      </div>
      <div class="media-container">
        ${mediaType === 'video' 
          ? `<video autoplay muted loop playsinline disablePictureInPicture preload="auto">
              <source src="${mediaSrc}" type="video/mp4">
            </video>`
          : `<img src="${mediaSrc}" alt="${title}">`
        }
      </div>
    `;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
          overflow: hidden;
        }

        .overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          background: linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 60%);
          padding: 2rem;
          z-index: 2;
        }

        .overline {
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: clamp(0.5rem, 0.6rem + 0.25vw, 0.875rem);
        }

        .title {
          color: white;
          font-size: 1.75rem;
          font-size: clamp(1.25rem, 1rem + 1.25vw, 1.75rem);
          font-weight: 600;
          margin-top: 0.75rem;
          margin-bottom: 0;
          max-width: 85%;
          line-height: 1.15;
        }

        .media-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        video, img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          transition: transform 0.3s ease;
          transform-origin: center;
        }

        a:hover video,
        a:hover img{
          transform: scale(1.05);
        }

        a .title  {
          text-decoration-thickness: 4px;
          text-underline-offset: 4px;
          text-decoration-style: solid;
          text-decoration-skip-ink: auto;
          text-decoration: underline solid rgba(255,255,255,0);
          transition: text-decoration-color 200ms;
        }

        @media (min-width: 768px) {
          .title {
            max-width: 75%;
          }
        }
      </style>
      ${href ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${content}</a>` : content}
    `;
  }
}

customElements.define('media-card', Card); 