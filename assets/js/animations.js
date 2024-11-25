document.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    document.querySelectorAll('.hidden-until-loaded').forEach(el => {
      el.classList.remove('hidden-until-loaded');
    });
    fadeInElements();
    startGSAPAnimations();
  });
});

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
    ".fade-in-element:not(.visible)"
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

  Splitting();
}

function startGSAPAnimations() {
  const sections = document.querySelectorAll('.text-container');

  sections.forEach((section) => {
    const heading = {
      section: section,
      get chars() {
        return this.section.querySelectorAll('.text-paragraph .word > .char, .whitespace');
      },
      isVisible: true
    };

    const timelineSettings = {
      staggerValue: 0.014,
      charsDuration: 0.5
    };

    const timeline = gsap.timeline({ paused: true })
      .addLabel('start')
      .to('.infinite-scroller', {
        duration: 0,
        onComplete: () => {
          const images = document.querySelectorAll('img');
          images.forEach((image, index) => {
            setTimeout(() => {
              image.classList.remove('notready');
              image.classList.add('ready');
            }, index * 50);
          });
        }
      })
      .from(heading.chars, {
        duration: timelineSettings.charsDuration,
        ease: 'Power3.easeInOut',
        y: '105%',
        stagger: timelineSettings.staggerValue
      })
      .addLabel('switchtime');

    timeline.play();
  });
}