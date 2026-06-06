let isBurgerMenuOpen = false;
let isBurgerMenuAnimating = false;

const burgerMenuFrames = [
    "./assets/mobile/burger_menu_default.svg",
    "./assets/mobile/burger_menu_closing_1.svg",
    "./assets/mobile/burger_menu_closing_2.svg",
    "./assets/mobile/burger_menu_open.svg"
];

function openBurgerMenu() {
    if (isBurgerMenuAnimating) {
        return;
    }

    const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
    const burgerMenuIcon = document.querySelector(".burger-menu-icon");

    isBurgerMenuAnimating = true;

    const frames = isBurgerMenuOpen
        ? [...burgerMenuFrames].reverse()
        : burgerMenuFrames;

    frames.forEach((frame, index) => {
        setTimeout(() => {
            burgerMenuIcon.src = frame;

            if (index === frames.length - 1) {
                isBurgerMenuOpen = !isBurgerMenuOpen;
                isBurgerMenuAnimating = false;
            }
        }, index * 40);
    });

    mobileMenuOverlay.classList.toggle("open");
}