let isBurgerMenuOpen = false;
let isBurgerMenuAnimating = false;

const burgerMenuFrames = [
    "/assets/mobile/burger_menu_default.svg",
    "/assets/mobile/burger_menu_closing_1.svg",
    "/assets/mobile/burger_menu_closing_2.svg",
    "/assets/mobile/burger_menu_open.svg"
];

/**
 * Opens or closes the mobile burger menu.
 */
function openBurgerMenu() {
    if (isBurgerMenuAnimating) {
        return;
    }

    const burgerMenuElements = getBurgerMenuElements();

    startBurgerMenuAnimation(burgerMenuElements.burgerMenuIcon);
    toggleMobileMenuOverlay(burgerMenuElements.mobileMenuOverlay);
}

/**
 * Returns the burger menu DOM elements.
 * @returns {Object} The burger menu icon and overlay.
 */
function getBurgerMenuElements() {
    return {
        mobileMenuOverlay: document.querySelector(".mobile-menu-overlay"),
        burgerMenuIcon: document.querySelector(".burger-menu-icon")
    };
}

/**
 * Starts the burger icon frame animation.
 * @param {HTMLImageElement} burgerMenuIcon - The burger menu icon image.
 */
function startBurgerMenuAnimation(burgerMenuIcon) {
    isBurgerMenuAnimating = true;

    const frames = getBurgerMenuAnimationFrames();

    frames.forEach((frame, index) => {
        showBurgerMenuFrame(burgerMenuIcon, frame, index, frames.length);
    });
}

/**
 * Returns the correct frame order depending on the current menu state.
 * @returns {string[]} The animation frame paths.
 */
function getBurgerMenuAnimationFrames() {
    if (isBurgerMenuOpen) {
        return [...burgerMenuFrames].reverse();
    }

    return burgerMenuFrames;
}

/**
 * Shows one burger menu animation frame after a short delay.
 * @param {HTMLImageElement} burgerMenuIcon - The burger menu icon image.
 * @param {string} frame - The frame image path.
 * @param {number} index - The current frame index.
 * @param {number} frameAmount - The total amount of frames.
 */
function showBurgerMenuFrame(burgerMenuIcon, frame, index, frameAmount) {
    setTimeout(() => {
        burgerMenuIcon.src = frame;

        if (index === frameAmount - 1) {
            finishBurgerMenuAnimation();
        }
    }, index * 40);
}

/**
 * Finishes the burger menu animation and updates the open state.
 */
function finishBurgerMenuAnimation() {
    isBurgerMenuOpen = !isBurgerMenuOpen;
    isBurgerMenuAnimating = false;
}

/**
 * Opens or closes the mobile menu overlay.
 * @param {HTMLElement} mobileMenuOverlay - The mobile menu overlay.
 */
function toggleMobileMenuOverlay(mobileMenuOverlay) {
    mobileMenuOverlay.classList.toggle("open");
}