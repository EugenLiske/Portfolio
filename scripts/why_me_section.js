const animatedItems = [
    {
        icon: "./assets/icons/why_me_section/located_in_icon.svg",
        fullText: "I am located in Munich..."
    },

    {
        icon: "./assets/icons/why_me_section/work_remote_icon.svg",
        fullText: "I am open to work remote..."
    },

    {
        icon: "./assets/icons/why_me_section/relocate_icon.svg",
        fullText: "I am open to relocate..."
    }
];

const icon = document.querySelector(".animated-info-icon");

const prefix = document.querySelector(".animated-info-prefix");

const dynamicText = document.querySelector(".animated-info-dynamic");

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

function updateStyledText(currentText) {

    if (currentText.startsWith("I am")) {

        const prefixPart = currentText.slice(0, 4);

        const dynamicPart = currentText.slice(4);

        prefix.textContent = prefixPart;

        dynamicText.textContent = dynamicPart;

    } else {

        prefix.textContent = currentText;

        dynamicText.textContent = "";
    }
}

async function typeText(fullText) {

    for (let i = 0; i <= fullText.length; i++) {

        const currentText = fullText.slice(0, i);

        updateStyledText(currentText);

        await wait(70);
    }
}

async function deleteText(fullText) {

    for (let i = fullText.length; i >= 0; i--) {

        const currentText = fullText.slice(0, i);

        updateStyledText(currentText);

        await wait(40);
    }
}

async function startTypewriterLoop() {

    let index = 0;

    while (true) {

        const item = animatedItems[index];

        icon.src = item.icon;

        prefix.textContent = "";

        dynamicText.textContent = "";

        icon.classList.add("visible");

        await wait(500);

        await typeText(item.fullText);

        await wait(1200);

        await deleteText(item.fullText);

        icon.classList.remove("visible");

        await wait(600);

        index = (index + 1) % animatedItems.length;
    }
}

startTypewriterLoop();