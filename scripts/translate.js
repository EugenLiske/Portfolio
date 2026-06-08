/**
 * Translates the page and updates all language-related sections.
 * @param {string} language - The selected language key.
 */
function translatePage(language) {
    saveSelectedLanguage(language);
    translateTextElements(language);
    updateLanguageModules(language);
    updateActiveLanguageButton(language);
    updateDocumentLanguage(language);
}

/**
 * Saves the selected language in local storage.
 * @param {string} language - The selected language key.
 */
function saveSelectedLanguage(language) {
    localStorage.setItem("selectedLanguage", language);
}

/**
 * Translates all elements with a data-i18n attribute.
 * @param {string} language - The selected language key.
 */
function translateTextElements(language) {
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((element) => {
        translateSingleElement(element, language);
    });
}

/**
 * Translates one data-i18n element.
 * @param {HTMLElement} element - The element to translate.
 * @param {string} language - The selected language key.
 */
function translateSingleElement(element, language) {
    const translationKey = element.dataset.i18n;

    element.innerHTML = translations[language][translationKey];
}

/**
 * Updates optional language-dependent page modules.
 * @param {string} language - The selected language key.
 */
function updateLanguageModules(language) {
    updateTypewriterLanguage(language);
    updateProjectLanguage(language);
    updateFormLanguage(language);
}

/**
 * Updates the typewriter language when the function exists.
 * @param {string} language - The selected language key.
 */
function updateTypewriterLanguage(language) {
    if (typeof setTypewriterLanguage === "function") {
        setTypewriterLanguage(language);
    }
}

/**
 * Updates the project section language when the function exists.
 * @param {string} language - The selected language key.
 */
function updateProjectLanguage(language) {
    if (typeof setProjectLanguage === "function") {
        setProjectLanguage(language);
    }
}

/**
 * Updates the contact form language when the function exists.
 * @param {string} language - The selected language key.
 */
function updateFormLanguage(language) {
    if (typeof setFormLanguage === "function") {
        setFormLanguage(language);
    }
}

/**
 * Loads the saved language after the DOM is ready.
 */
document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = getSavedLanguage();

    translatePage(savedLanguage);
});

/**
 * Returns the saved language or German as fallback.
 * @returns {string} The saved language key.
 */
function getSavedLanguage() {
    return localStorage.getItem("selectedLanguage") || "de";
}

/**
 * Translates the page to German.
 */
function translateToGerman() {
    translatePage("de");
}

/**
 * Translates the page to English.
 */
function translateToEnglish() {
    translatePage("en");
}

/**
 * Updates the active visual state of all language buttons.
 * @param {string} language - The selected language key.
 */
function updateActiveLanguageButton(language) {
    const languageButtons = document.querySelectorAll("[data-language]");

    languageButtons.forEach((button) => {
        updateSingleLanguageButton(button, language);
    });
}

/**
 * Updates one language button active state.
 * @param {HTMLElement} button - The language button.
 * @param {string} language - The selected language key.
 */
function updateSingleLanguageButton(button, language) {
    const isActiveLanguage = button.dataset.language === language;

    button.classList.toggle("active-language", isActiveLanguage);
}

/**
 * Updates the html lang attribute.
 * @param {string} language - The selected language key.
 */
function updateDocumentLanguage(language) {
    document.documentElement.lang = language;
}