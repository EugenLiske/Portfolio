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

function setTypewriterLanguage(language) {
    currentTypewriterLanguage = language;
}

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

function updateStyledText(currentPrefix, currentDynamicText) {
    prefix.textContent = currentPrefix;
    dynamicText.textContent = currentDynamicText;
}

async function typeText(item) {
    prefix.textContent = item.prefix;

    for (let i = 0; i <= item.dynamicText.length; i++) {
        const currentDynamicText = item.dynamicText.slice(0, i);

        updateStyledText(item.prefix, currentDynamicText);

        await wait(70);
    }
}

async function deleteText(item) {
    for (let i = item.dynamicText.length; i >= 0; i--) {
        const currentDynamicText = item.dynamicText.slice(0, i);

        updateStyledText(item.prefix, currentDynamicText);

        await wait(40);
    }
}

async function startTypewriterLoop() {
    let index = 0;

    while (true) {
        const items = animatedItems[currentTypewriterLanguage];
        const item = items[index];

        icon.src = item.icon;

        prefix.textContent = "";
        dynamicText.textContent = "";

        icon.classList.add("visible");

        await wait(500);

        await typeText(item);

        await wait(1200);

        await deleteText(item);

        icon.classList.remove("visible");

        await wait(600);

        index = (index + 1) % items.length;
    }
}

startTypewriterLoop();