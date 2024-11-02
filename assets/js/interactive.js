document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    function wrapChars(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const text = element.textContent;
            const chars = text.split('').map(char => char === ' ' ? char : `<span aria-hidden="true">${char}</span>`).join('');
            element.innerHTML = chars;
        });
    }

    wrapChars('#chrisIntro .text-layer');
    wrapChars('#pointOne .text-layer');
    wrapChars('#pointTwo .text-layer');
    wrapChars('#pointThree .text-layer');
    wrapChars('#pointFour .text-layer');
    wrapChars('#pointFive .text-layer');

    const sections = gsap.utils.toArray('.section');

    function animateSection(section) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom center",
                scroller: "#container", // Specify the scrolling container
                toggleActions: "play none none reverse",
            }
        });

        switch (section.id) {
            case 'meetChris':
                tl.to(".lockup", { autoAlpha: 1, duration: 0.3 })
                    .to(".mark", { autoAlpha: 1, rotate: 360, duration: 1 }, 0.3)
                    .to(".curtain-title", { height: "auto", ease: 'power1.inOut' }, 0.3)
                    .to("#chrisImage", { rotate: -5, autoAlpha: 1, right: 0 }, 0.3)
                    .to("#helloBubble", { autoAlpha: 1 }, 0.3)
                    .to('#helloBubble', { rotation: 10, yoyo: true, repeat: 3, ease: 'power1.inOut' }, "<")
                    .to('.text-layer', { autoAlpha: 1, ease: 'power1.inOut' }, 0.5);
                break;
            case 'chrisIntro':
                const chars = section.querySelectorAll('span');
                tl.fromTo(chars, { opacity: 0, x: -5 }, { opacity: 1, x: 0, stagger: 0.0175, ease: "none" });
                break;
            case 'factoids':
                const factoids = section.querySelectorAll('.first, .second, .third, .fourth, .fifth');

                // Iterate over each factoid and create a nested timeline
                factoids.forEach(factoid => {
                    const extendo = factoid.querySelector('.extendo'); // Select the extendo element within the factoid

                    // Nested timeline for each factoid
                    let factoidTl = gsap.timeline({
                        defaults: { ease: "none" }
                    });
                    factoidTl.to(factoid, { autoAlpha: 1 }) // Fade in the factoid
                        .fromTo(extendo,
                            { fontVariationSettings: `"slnt" 0, "wdth" 2, "wght" 140` },
                            { fontVariationSettings: `"slnt" -10, "wdth" 8, "wght" 600`, color: 'white', ease: 'power1.inOut' },
                            ">"); // Start the extendo animation after the factoid fades in

                    // Add the nested timeline to the main timeline
                    tl.add(factoidTl, `+=1`); // Adjust the delay as needed
                });
                break;
            case 'fiveThings':
                const fiveThings = section.querySelectorAll('.text-layer');
                tl.to(fiveThings, { autoAlpha: 1, stagger: 1, ease: "none" });
                break;
            case 'pointOne':
                const pointOne = section.querySelectorAll('.number');
                const pointOneChars = section.querySelectorAll('span');
                tl.to(pointOne, { autoAlpha: 1, stagger: 1, ease: "none" });
                tl.fromTo(pointOneChars, { opacity: 0, x: 0 }, { opacity: 1, x: 0, stagger: 0.0175, ease: "none" }, 0);
                break;
            case 'pointTwo':
                const pointTwo = section.querySelectorAll('.number');
                const pointTwoChars = section.querySelectorAll('span');
                tl.to(pointTwo, { autoAlpha: 1, stagger: 1, ease: "none" });
                tl.fromTo(pointTwoChars, { opacity: 0, x: 0 }, { opacity: 1, x: 0, stagger: 0.0175, ease: "none" }, 0);
                break;
            case 'pointThree':
                const pointThree = section.querySelectorAll('.number,.text-layer');
                const pointThreeChars = section.querySelectorAll('span');
                tl.to(pointThree, { autoAlpha: 1, stagger: 1, ease: "none" });
                tl.fromTo(pointThreeChars, { opacity: 0, x: 0 }, { opacity: 1, x: 0, stagger: 0.0175, ease: "none" }, 0);
                break;
            case 'pointFour':
                const pointFour = section.querySelectorAll('.number,.text-layer');
                const pointFourChars = section.querySelectorAll('span');
                tl.to(pointFour, { autoAlpha: 1, stagger: 1, ease: "none" });
                tl.fromTo(pointFourChars, { opacity: 0, x: 0 }, { opacity: 1, x: 0, stagger: 0.0175, ease: "none" }, 0);
                break;
            case 'pointFive':
                const pointFive = section.querySelectorAll('.number,.text-layer');
                const pointFiveChars = section.querySelectorAll('span');
                tl.to(pointFive, { autoAlpha: 1, stagger: 1, ease: "none" });
                tl.fromTo(pointFiveChars, { opacity: 0, x: 0 }, { opacity: 1, x: 0, stagger: 0.0175, ease: "none" }, 0);
                break;
            case 'factoids2':
                const factoids2 = section.querySelectorAll('.first, .second, .third, .fourth, .fifth, .sixth');
                tl.to(factoids2, { autoAlpha: 1, stagger: 1, ease: "none" });
                break;
            case 'whyMe':
                const whyMe = section.querySelectorAll('div');
                tl.to(whyMe, { autoAlpha: 1, stagger: 1, ease: "none" });
                break;
        }
    }

    // Initialize animations for each section
    sections.forEach(section => {
        animateSection(section);
    });
});
