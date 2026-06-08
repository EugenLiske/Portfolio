let currentTypewriterLanguage = "de";

const animatedItems = {
    de: [
        {
            icon: "./assets/icons/why_me_section/located_in_icon.svg",
            prefix: "Ich bin",
            dynamicText: " in München zuhause..."
        },

        {
            icon: "./assets/icons/why_me_section/work_remote_icon.svg",
            prefix: "Ich bin",
            dynamicText: " offen für Remote-Arbeit..."
        },

        {
            icon: "./assets/icons/why_me_section/relocate_icon.svg",
            prefix: "Ich bin",
            dynamicText: " flexibel für neue Standorte..."
        }
    ],

    en: [
        {
            icon: "./assets/icons/why_me_section/located_in_icon.svg",
            prefix: "I am",
            dynamicText: " based in Munich..."
        },

        {
            icon: "./assets/icons/why_me_section/work_remote_icon.svg",
            prefix: "I am",
            dynamicText: " open to remote work..."
        },

        {
            icon: "./assets/icons/why_me_section/relocate_icon.svg",
            prefix: "I am",
            dynamicText: " flexible about relocating..."
        }
    ]
};

const icon = document.querySelector(".animated-info-icon");
const prefix = document.querySelector(".animated-info-prefix");
const dynamicText = document.querySelector(".animated-info-dynamic");

/**
 * Sets the currently active typewriter language.
 * @param {string} language - The selected language key.
 */
function setTypewriterLanguage(language) {
    currentTypewriterLanguage = language;
}

/**
 * Waits for a specified amount of milliseconds.
 * @param {number} ms - Delay in milliseconds.
 * @returns {Promise<void>}
 */
function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

/**
 * Updates the styled prefix and dynamic text elements.
 * @param {string} currentPrefix - The visible prefix text.
 * @param {string} currentDynamicText - The visible dynamic text.
 */
function updateStyledText(currentPrefix, currentDynamicText) {
    prefix.textContent = currentPrefix;
    dynamicText.textContent = currentDynamicText;
}

/**
 * Updates the currently visible part of the animated text.
 * @param {Object} item - The current animated item.
 * @param {string} currentFullText - The currently visible full text.
 */
function updateAnimatedText(item, currentFullText) {
    const currentPrefix = currentFullText.slice(0, item.prefix.length);
    const currentDynamicText = currentFullText.slice(item.prefix.length);

    updateStyledText(currentPrefix, currentDynamicText);
}

/**
 * Types the current text character by character.
 * @param {Object} item - The current animated item.
 */
async function typeText(item) {
    const fullText = item.prefix + item.dynamicText;

    for (let i = 0; i <= fullText.length; i++) {
        const currentFullText = fullText.slice(0, i);

        updateAnimatedText(item, currentFullText);

        await wait(70);
    }
}

/**
 * Deletes the current text character by character.
 * @param {Object} item - The current animated item.
 */
async function deleteText(item) {
    const fullText = item.prefix + item.dynamicText;

    for (let i = fullText.length; i >= 0; i--) {
        const currentFullText = fullText.slice(0, i);

        updateAnimatedText(item, currentFullText);

        await wait(40);
    }
}

/**
 * Clears the visible animated text.
 */
function clearAnimatedText() {
    prefix.textContent = "";
    dynamicText.textContent = "";
}

/**
 * Shows the current animated icon.
 * @param {Object} item - The current animated item.
 */
function showAnimatedIcon(item) {
    icon.src = item.icon;
    icon.classList.add("visible");
}

/**
 * Hides the current animated icon.
 */
function hideAnimatedIcon() {
    icon.classList.remove("visible");
}

/**
 * Runs one complete typewriter animation cycle.
 * @param {Object} item - The current animated item.
 */
async function runTypewriterCycle(item) {
    showAnimatedIcon(item);
    clearAnimatedText();

    await wait(500);
    await typeText(item);
    await wait(1200);
    await deleteText(item);

    hideAnimatedIcon();
    await wait(600);
}

/**
 * Runs the continuous typewriter animation loop.
 * Cycles through all available items of the current language.
 */
async function startTypewriterLoop() {
    let index = 0;

    while (true) {
        const items = animatedItems[currentTypewriterLanguage];
        const item = items[index];

        await runTypewriterCycle(item);

        index = (index + 1) % items.length;
    }
}

startTypewriterLoop();