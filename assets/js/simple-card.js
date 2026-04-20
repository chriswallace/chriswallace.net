// Simple Card Component for text content
class SimpleCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .card-content {
          display: flex;
          width: 100%;
          height: 100%;
          position: relative;
          aspect-ratio: 1.3;
          border-radius: 12px;
          padding: clamp(0.75rem, 1rem + 2vw, 1.5rem);
          background: var(--color-card-bg, rgba(255,255,255,0.5));
          box-sizing: border-box;
          color: var(--color-dark, #21231f);
          font-size: inherit;
          font-weight: 450;
          line-height: inherit;
          padding-right: 3rem;
          margin: 0;
          transition: background 0.2s ease;
        }

        ::slotted(*) {
          margin: 0;
        }
      </style>
      <div class="card-content">
        <slot></slot>
      </div>
    `;
  }
}

// Define the component, waiting for customElements if needed
if (window.customElements) {
  customElements.define("simple-card", SimpleCard);
} else {
  window.addEventListener("WebComponentsReady", function () {
    customElements.define("simple-card", SimpleCard);
  });
}
