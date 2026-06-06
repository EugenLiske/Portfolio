function translatePage(language) {
    localStorage.setItem("selectedLanguage", language);

    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((element) => {
        const translationKey = element.dataset.i18n;

        element.innerHTML = translations[language][translationKey]; 
    });

    if (typeof setTypewriterLanguage === "function") {
        setTypewriterLanguage(language);
    }

    if (typeof setProjectLanguage === "function") {
        setProjectLanguage(language);
    }

    if (typeof setFormLanguage === "function") {
        setFormLanguage(language);
    }

    updateActiveLanguageButton(language);
    document.documentElement.lang = language;
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "de";

    translatePage(savedLanguage);
});

function translateToGerman() {
    translatePage("de");
}

function translateToEnglish() {
    translatePage("en");
}

function updateActiveLanguageButton(language) {
    const languageButtons = document.querySelectorAll("[data-language]");

    languageButtons.forEach((button) => {
        button.classList.remove("active-language");

        if (button.dataset.language === language) {
            button.classList.add("active-language");
        }
    });
}