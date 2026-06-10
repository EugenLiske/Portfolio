/**
 * Observes animated sections and shows them when they enter the viewport.
 */
function observeAnimatedSections() {
    const animatedSections = document.querySelectorAll(".section-slide-in");

    animatedSections.forEach((section) => {
        observeSingleSection(section);
    });
}

/**
 * Observes one section and adds the visible animation class.
 * @param {Element} section - The section that should be animated.
 */
function observeSingleSection(section) {
    const observer = new IntersectionObserver((entries) => {
        handleSectionIntersection(entries);
    }, {
        threshold: 0.15
    });

    observer.observe(section);
}

/**
 * Adds the visible class when the section is visible.
 * @param {IntersectionObserverEntry[]} entries - The observed entries.
 * @param {IntersectionObserver} observer - The observer instance.
 */
function handleSectionIntersection(entries) {
    const entry = entries[0];

    if (entry.isIntersecting) {
        entry.target.classList.add("visible-section");
    } else {
        entry.target.classList.remove("visible-section");
    }
}

observeAnimatedSections();