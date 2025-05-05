class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["overline", "title", "media-src", "media-type"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const overline = this.getAttribute("overline") || "";
    const title = this.getAttribute("title") || "";
    const mediaSrc = this.getAttribute("media-src") || "";
    const mediaType = this.getAttribute("media-type") || "image";
    const href = this.getAttribute("href") || "";

    const content = `
      <div class="overlay">
        <span class="overline">${overline}</span>
        <h3 class="title">${title}</h3>
      </div>
      <div class="media-container">
        ${
          mediaType === "video"
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
          container-type: inline-size;
        }

        .overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          background: linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 60%);
          padding: clamp(0.75rem, 0.5rem + 2vw, 2rem);
          z-index: 2;
        }

        .overline {
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.7rem;
        }

        .title {
          color: white;
          font-size: clamp(1.2rem, 1rem + 2vw, 4rem);
          font-weight: 400;
          margin-top: 0.35rem;
          margin-bottom: 0;
          max-width: 95%;
          line-height: 1.25;
          font-family: "New Title", serif;
          text-transform: uppercase;
          letter-spacing: 0.03em;
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
      </style>
      ${href ? `<a href="${href}">${content}</a>` : content}
    `;
  }
}

customElements.define("media-card", Card);
