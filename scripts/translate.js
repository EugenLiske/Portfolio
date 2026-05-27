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
    const germanButton = document.getElementById("translate-german-button");
    const englishButton = document.getElementById("translate-english-button");

    germanButton.classList.remove("active-language");
    englishButton.classList.remove("active-language");

    if (language === "de") {
        germanButton.classList.add("active-language");
    }

    if (language === "en") {
        englishButton.classList.add("active-language");
    }
}