document.addEventListener("DOMContentLoaded", fadeInElements);

function fadeInElements() {
  let observerIndex = 0;

  const observeElements = (elementsToObserve) => {
    elementsToObserve.forEach((el) => observer.observe(el));
  };

  function scrollStop(callback, refresh = 66) {
    if (!callback || typeof callback !== "function") return;
    let isScrolling;
    window.addEventListener(
      "scroll",
      function (event) {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(callback, refresh);
      },
      false
    );
  }

  const elements = document.querySelectorAll(
    ".fade-in-element:not(.visible),.art-collection .media-wrapper:not(.visible),.art-collection h3:not(.visible),.art-collection h4:not(.visible)"
  );

  scrollStop(function () {
    observerIndex = 0; // Reset index when scrolling stops
  });

  const fadeIn = (el, delay) => {
    setTimeout(() => {
      el.classList.add("visible");

      // Remove the fade-in-element class after animation is done
      el.addEventListener("transitionend", () => {
        el.classList.remove("fade-in-element");
      });
    }, delay);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = observerIndex * 50;
        fadeIn(entry.target, delay);
        observer.unobserve(entry.target);
        observerIndex++;
      }
    });
  });

  observeElements(elements); // Observe initial elements
}