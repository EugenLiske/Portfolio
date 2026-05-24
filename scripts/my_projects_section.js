let projectDurationRef = document.getElementById('projectDurationID');

let projectBulletpointOneRef = document.getElementById('projectBulletpointOneID');
let projectBulletpointTwoRef = document.getElementById('projectBulletpointTwoID');
let projectBulletpointThreeRef = document.getElementById('projectBulletpointThreeID');

let additionalProjectInformationRef = document.getElementById('additionalProjectInformationID');

let projectTechnologyOneRef = document.getElementById('projectTechnologyOneID');
let projectTechnologyTwoRef = document.getElementById('projectTechnologyTwoID');
let projectTechnologyThreeRef = document.getElementById('projectTechnologyThreeID');

let projectMockupRef = document.getElementById('projectMockupID');
let githubLinkRef = document.getElementById('githubLinkID');

const projectNavItemsRef = document.querySelectorAll('.project-nav-item');

let exchangeableProjectContent = [
    {
        duration: `Dauer: 3 Wochen`,

        bulletpointOne: `El Pollo Loco ist ein 2D-Jump-and-Run-Spiel, in dem der Spieler Pepe durch eine Wüstenlandschaft steuert,
        Münzen sammelt, Gegnern ausweicht und sich mit Salsaflaschen gegen Hühner und den Endboss verteidigt.`,

        bulletpointTwo: `Zur Strukturierung des Projekts habe ich Trello genutzt, um Aufgaben, Fortschritt und offene Punkte
        übersichtlich zu organisieren. Der Code ist in mehrere Klassen und Controller aufgeteilt, zum Beispiel für Spielfigur, Gegner,
        Audio, Eingaben und Rendering.`,

        bulletpointThree: `In diesem Projekt habe ich besonders viel über objektorientierte JavaScript-Strukturen,
        Canvas-Rendering, Animationen, Kollisionen, Spielzustände und Eingabesteuerung gelernt. Eine wichtige Erfahrung war es,
        viele einzelne Spielmechaniken zu einem funktionierenden Gesamtspiel zusammenzuführen.`,

        additionalProjectInformation: `Was ich gelernt habe`,

        technologyOne: `./assets/icons/my_projects_section/html_project_icon.svg`,
        technologyTwo: `./assets/icons/my_projects_section/javascript_project_icon.svg`,
        technologyThree: `./assets/icons/my_projects_section/css_project_icon.svg`,

        projectMockup: `./assets/icons/my_projects_section/el_pollo_loco_preview.png`,

        githubLink: `https://github.com/EugenLiske/el_pollo_loco.git`
    },

    {
        duration: `Dauer: 5 Wochen`,

        bulletpointOne: `Join ist ein Gruppenprojekt im Stil eines Kanban-Boards. Aufgaben können erstellt,
        bearbeitet und per Drag & Drop zwischen verschiedenen Bearbeitungsphasen verschoben werden.
        Die Multi-Page-Application nutzt Firebase zur Speicherung von Benutzern, Kontakten und Tasks.`,

        bulletpointTwo: `Die Zusammenarbeit im Team wurde über Trello und regelmäßige Meetings organisiert.
        Aufgaben und Features wurden gemeinsam geplant und der Fortschritt kontinuierlich abgestimmt.
        Der Code wurde in verschiedene Bereiche wie Login, Task-Management, Formulare und Board-Logik aufgeteilt.`,

        bulletpointThree: `Ich war an verschiedenen Frontend- und Logikbereichen beteiligt, darunter Formularverarbeitung,
        Task-Erstellung, Login-Funktionalität sowie Drag-&-Drop- und Overlay-Systeme. Besonders viel gelernt habe ich dabei über
        Teamarbeit, saubere Code-Strukturen und die Organisation größerer JavaScript-Projekte.`,

        additionalProjectInformation: `Meine Rolle im Projekt`,

        technologyOne: `./assets/icons/my_projects_section/html_project_icon.svg`,
        technologyTwo: `./assets/icons/my_projects_section/javascript_project_icon.svg`,
        technologyThree: `./assets/icons/my_projects_section/css_project_icon.svg`,

        projectMockup: `./assets/icons/my_projects_section/join_preview.png`,

        githubLink: `https://github.com/EugenLiske/join.git`
    },

    {
    duration: `Dauer: 2 Wochen`,

    bulletpointOne: `Dieses Pokédex-Projekt nutzt die PokéAPI, um Pokémon-Daten dynamisch zu laden und darzustellen.
    Nutzer können Pokémon suchen, Detailansichten öffnen und zwischen verschiedenen Informationsbereichen wie Stats oder
    Evolutionsketten navigieren.`,

    bulletpointTwo: `Zur Organisation des Projekts habe ich Trello verwendet, um Aufgaben und Fortschritt strukturiert
    festzuhalten. Der Code wurde in verschiedene Bereiche wie API-Handling, Templates, Overlay-Logik, Suchfunktion und Karten-Rendering aufgeteilt.`,

    bulletpointThree: `In diesem Projekt habe ich besonders viel über API-Anbindungen, asynchrones JavaScript,
    dynamisches Rendering und die Verarbeitung großer Datenmengen gelernt. Außerdem konnte ich meine Kenntnisse in modularer
    Code-Struktur und responsivem Frontend-Design weiter vertiefen.`,

    additionalProjectInformation: `Was ich gelernt habe`,

    technologyOne: `./assets/icons/my_projects_section/html_project_icon.svg`,
    technologyTwo: `./assets/icons/my_projects_section/javascript_project_icon.svg`,
    technologyThree: `./assets/icons/my_projects_section/css_project_icon.svg`,

    projectMockup: `./assets/icons/my_projects_section/pokemon_preview.png`,

    githubLink: `https://github.com/EugenLiske/Pokedex.git`
}
];

function displayProjectContent(i) {
    projectNavItemsRef.forEach((item) => {
        item.classList.remove('active-project');
    });

    projectNavItemsRef[i].classList.add('active-project');

    const selectedProject = exchangeableProjectContent[i];

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