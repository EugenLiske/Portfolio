let currentProjectLanguage = "de";
let currentProjectIndex = 0;

let projectDurationRef = document.getElementById("projectDurationID");
let projectBulletpointOneRef = document.getElementById("projectBulletpointOneID");
let projectBulletpointTwoRef = document.getElementById("projectBulletpointTwoID");
let projectBulletpointThreeRef = document.getElementById("projectBulletpointThreeID");
let additionalProjectInformationRef = document.getElementById("additionalProjectInformationID");

let projectTechnologyOneRef = document.getElementById("projectTechnologyOneID");
let projectTechnologyTwoRef = document.getElementById("projectTechnologyTwoID");
let projectTechnologyThreeRef = document.getElementById("projectTechnologyThreeID");

let projectMockupRef = document.getElementById("projectMockupID");
let githubLinkRef = document.getElementById("githubLinkID");

const projectNavItemsRef = document.querySelectorAll(".project-nav-item");

const exchangeableProjectContent = {
    de: [
        {
            duration: `Dauer: 3 Wochen`,
            bulletpointOne: `El Pollo Loco ist ein 2D-Jump-and-Run-Spiel, in dem der Spieler Pepe durch eine Wüstenlandschaft steuert, Münzen sammelt, Gegnern ausweicht und sich mit Salsaflaschen gegen Hühner und den Endboss verteidigt.`,
            bulletpointTwo: `Zur Strukturierung des Projekts habe ich Trello genutzt, um Aufgaben, Fortschritt und offene Punkte übersichtlich zu organisieren. Der Code ist in mehrere Klassen und Controller aufgeteilt, zum Beispiel für Spielfigur, Gegner, Audio, Eingaben und Rendering.`,
            bulletpointThree: `In diesem Projekt habe ich besonders viel über objektorientierte JavaScript-Strukturen, Canvas-Rendering, Animationen, Kollisionen, Spielzustände und Eingabesteuerung gelernt. Eine wichtige Erfahrung war es, viele einzelne Spielmechaniken zu einem funktionierenden Gesamtspiel zusammenzuführen.`,
            additionalProjectInformation: `Was ich gelernt habe`,
            technologyOne: `./assets/icons/my_projects_section/html_project_icon.svg`,
            technologyTwo: `./assets/icons/my_projects_section/javascript_project_icon.svg`,
            technologyThree: `./assets/icons/my_projects_section/css_project_icon.svg`,
            projectMockup: `./assets/icons/my_projects_section/el_pollo_loco_preview.png`,
            githubLink: `https://github.com/EugenLiske/el_pollo_loco.git`
        },
        {
            duration: `Dauer: 5 Wochen`,
            bulletpointOne: `Join ist ein Gruppenprojekt im Stil eines Kanban-Boards. Aufgaben können erstellt, bearbeitet und per Drag & Drop zwischen verschiedenen Bearbeitungsphasen verschoben werden. Die Multi-Page-Application nutzt Firebase zur Speicherung von Benutzern, Kontakten und Tasks.`,
            bulletpointTwo: `Die Zusammenarbeit im Team wurde über Trello und regelmäßige Meetings organisiert. Aufgaben und Features wurden gemeinsam geplant und der Fortschritt kontinuierlich abgestimmt. Der Code wurde in verschiedene Bereiche wie Login, Task-Management, Formulare und Board-Logik aufgeteilt.`,
            bulletpointThree: `Ich war an verschiedenen Frontend- und Logikbereichen beteiligt, darunter Formularverarbeitung, Task-Erstellung, Login-Funktionalität sowie Drag-&-Drop- und Overlay-Systeme. Besonders viel gelernt habe ich dabei über Teamarbeit, saubere Code-Strukturen und die Organisation größerer JavaScript-Projekte.`,
            additionalProjectInformation: `Meine Rolle im Projekt`,
            technologyOne: `./assets/icons/my_projects_section/html_project_icon.svg`,
            technologyTwo: `./assets/icons/my_projects_section/javascript_project_icon.svg`,
            technologyThree: `./assets/icons/my_projects_section/css_project_icon.svg`,
            projectMockup: `./assets/icons/my_projects_section/join_preview.png`,
            githubLink: `https://github.com/EugenLiske/join.git`
        },
        {
            duration: `Dauer: 2 Wochen`,
            bulletpointOne: `Dieses Pokédex-Projekt nutzt die PokéAPI, um Pokémon-Daten dynamisch zu laden und darzustellen. Nutzer können Pokémon suchen, Detailansichten öffnen und zwischen verschiedenen Informationsbereichen wie Stats oder Evolutionsketten navigieren.`,
            bulletpointTwo: `Zur Organisation des Projekts habe ich Trello verwendet, um Aufgaben und Fortschritt strukturiert festzuhalten. Der Code wurde in verschiedene Bereiche wie API-Handling, Templates, Overlay-Logik, Suchfunktion und Karten-Rendering aufgeteilt.`,
            bulletpointThree: `In diesem Projekt habe ich besonders viel über API-Anbindungen, asynchrones JavaScript, dynamisches Rendering und die Verarbeitung großer Datenmengen gelernt. Außerdem konnte ich meine Kenntnisse in modularer Code-Struktur und responsivem Frontend-Design weiter vertiefen.`,
            additionalProjectInformation: `Was ich gelernt habe`,
            technologyOne: `./assets/icons/my_projects_section/html_project_icon.svg`,
            technologyTwo: `./assets/icons/my_projects_section/javascript_project_icon.svg`,
            technologyThree: `./assets/icons/my_projects_section/css_project_icon.svg`,
            projectMockup: `./assets/icons/my_projects_section/pokemon_preview.png`,
            githubLink: `https://github.com/EugenLiske/Pokedex.git`
        }
    ],

    en: [
        {
            duration: `Duration: 3 weeks`,
            bulletpointOne: `El Pollo Loco is a 2D jump-and-run game in which the player guides Pepe through a desert landscape, collects coins, avoids enemies, and uses salsa bottles to defend himself against chickens and the final boss.`,
            bulletpointTwo: `To structure the project, I used Trello to organize tasks, progress, and open issues clearly. The code is divided into several classes and controllers, for example for the character, enemies, audio, input handling, and rendering.`,
            bulletpointThree: `In this project, I learned a great deal about object-oriented JavaScript structures, canvas rendering, animations, collisions, game states, and input control. One important experience was combining many individual game mechanics into one functional complete game.`,
            additionalProjectInformation: `What I learned`,
            technologyOne: `./assets/icons/my_projects_section/html_project_icon.svg`,
            technologyTwo: `./assets/icons/my_projects_section/javascript_project_icon.svg`,
            technologyThree: `./assets/icons/my_projects_section/css_project_icon.svg`,
            projectMockup: `./assets/icons/my_projects_section/el_pollo_loco_preview.png`,
            githubLink: `https://github.com/EugenLiske/el_pollo_loco.git`
        },
        {
            duration: `Duration: 5 weeks`,
            bulletpointOne: `Join is a group project in the style of a Kanban board. Tasks can be created, edited, and moved between different workflow stages using drag and drop. The multi-page application uses Firebase to store users, contacts, and tasks.`,
            bulletpointTwo: `Team collaboration was organized through Trello and regular meetings. Tasks and features were planned together, and progress was continuously coordinated. The code was divided into different areas such as login, task management, forms, and board logic.`,
            bulletpointThree: `I contributed to several frontend and logic areas, including form handling, task creation, login functionality, as well as drag-and-drop and overlay systems. I learned a lot about teamwork, clean code structures, and organizing larger JavaScript projects.`,
            additionalProjectInformation: `My role in the project`,
            technologyOne: `./assets/icons/my_projects_section/html_project_icon.svg`,
            technologyTwo: `./assets/icons/my_projects_section/javascript_project_icon.svg`,
            technologyThree: `./assets/icons/my_projects_section/css_project_icon.svg`,
            projectMockup: `./assets/icons/my_projects_section/join_preview.png`,
            githubLink: `https://github.com/EugenLiske/join.git`
        },
        {
            duration: `Duration: 2 weeks`,
            bulletpointOne: `This Pokédex project uses the PokéAPI to dynamically load and display Pokémon data. Users can search for Pokémon, open detail views, and switch between different information areas such as stats or evolution chains.`,
            bulletpointTwo: `To organize the project, I used Trello to structure tasks and track progress. The code was divided into different areas such as API handling, templates, overlay logic, search functionality, and card rendering.`,
            bulletpointThree: `In this project, I learned a great deal about API integration, asynchronous JavaScript, dynamic rendering, and handling large amounts of data. I was also able to further deepen my knowledge of modular code structure and responsive frontend design.`,
            additionalProjectInformation: `What I learned`,
            technologyOne: `./assets/icons/my_projects_section/html_project_icon.svg`,
            technologyTwo: `./assets/icons/my_projects_section/javascript_project_icon.svg`,
            technologyThree: `./assets/icons/my_projects_section/css_project_icon.svg`,
            projectMockup: `./assets/icons/my_projects_section/pokemon_preview.png`,
            githubLink: `https://github.com/EugenLiske/Pokedex.git`
        }
    ]
};

function setProjectLanguage(language) {
    currentProjectLanguage = language;
    displayProjectContent(currentProjectIndex);
}

function displayProjectContent(i) {
    currentProjectIndex = i;

    projectNavItemsRef.forEach((item) => {
        item.classList.remove("active-project");
    });

    projectNavItemsRef[i].classList.add("active-project");

    const selectedProject = exchangeableProjectContent[currentProjectLanguage][i];

    projectDurationRef.textContent = selectedProject.duration;
    projectBulletpointOneRef.textContent = selectedProject.bulletpointOne;
    projectBulletpointTwoRef.textContent = selectedProject.bulletpointTwo;
    projectBulletpointThreeRef.textContent = selectedProject.bulletpointThree;
    additionalProjectInformationRef.textContent = selectedProject.additionalProjectInformation;

    projectTechnologyOneRef.src = selectedProject.technologyOne;
    projectTechnologyTwoRef.src = selectedProject.technologyTwo;
    projectTechnologyThreeRef.src = selectedProject.technologyThree;

    projectMockupRef.src = selectedProject.projectMockup;
    githubLinkRef.href = selectedProject.githubLink;
}