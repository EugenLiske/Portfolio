let projectDurationRef = document.getElementById('projectDurationID');

let projectBulletpointOneRef = document.getElementById('projectBulletpointOneID');
let projectBulletpointTwoRef = document.getElementById('projectBulletpointTwoID');
let projectBulletpointThreeRef = document.getElementById('projectBulletpointThreeID');

let projectTechnologyOneRef = document.getElementById('projectTechnologyOneID');
let projectTechnologyTwoRef = document.getElementById('projectTechnologyTwoID');
let projectTechnologyThreeRef = document.getElementById('projectTechnologyThreeID');

let projectMockupRef = document.getElementById('projectMockupID');
let githubLinkRef = document.getElementById('githubLinkID');

const projectNavItemsRef = document.querySelectorAll('.project-nav-item');

let exchangeableProjectContent = [
    {
        duration: "Duration: 3 weeks",
        bulletpointOne: "This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.",
        bulletpointTwo: "How do you keep your code clean and maintainable? Have you broken the project down into reusable modules or components? Focus on documentation,naming files, variables, classes and testing.",
        bulletpointThree: "How many people were in the team and what was your role? Describe your tasks in 1-2 sentences, for example: login form, dashboard or chat functionality. What technologies did you use? It is nice to mention good teamwork and cooperation.",
        technologyOne: "./assets/icons/my_projects_section/html_project_icon.svg",
        technologyTwo: "./assets/icons/my_projects_section/javascript_project_icon.svg",
        technologyThree: "./assets/icons/my_projects_section/css_project_icon.svg",
        projectMockup: "./assets/icons/my_projects_section/el_pollo_loco_preview.png",
        githubLink: "https://github.com/EugenLiske/el_pollo_loco.git"
    },

    {
        duration: "Duration: 5 weeks",
        bulletpointOne: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, voluptate atque itaque culpa doloremque ratione velit consectetur quam aspernatur deleniti, vitae incidunt molestiae illum veritatis corporis nemo rerum cupiditate eum.",
        bulletpointTwo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, voluptate atque itaque culpa doloremque ratione velit consectetur quam aspernatur deleniti, vitae incidunt molestiae illum veritatis corporis nemo rerum cupiditate eum.",
        bulletpointThree: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, voluptate atque itaque culpa doloremque ratione velit consectetur quam aspernatur deleniti, vitae incidunt molestiae illum veritatis corporis nemo rerum cupiditate eum.",
        technologyOne: "./assets/icons/my_projects_section/typescript_project_icon.svg",
        technologyTwo: "./assets/icons/my_projects_section/angular_project_icon.svg",
        technologyThree: "./assets/icons/my_projects_section/javascript_project_icon.svg",
        projectMockup: "./assets/icons/my_projects_section/join_preview.png",
        githubLink: "https://github.com/EugenLiske/join.git"
    },

    {
        duration: "Duration: 10 weeks",
        bulletpointOne: "blabla dududu bing bong dum dum tata Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, voluptate atque itaque culpa doloremque ratione velit consectetur quam aspernatur deleniti, vitae incidunt molestiae illum veritatis corporis nemo rerum cupiditate eum.",
        bulletpointTwo: "blabla dududu bing bong dum dum tata Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, voluptate atque itaque culpa doloremque ratione velit consectetur quam aspernatur deleniti, vitae incidunt molestiae illum veritatis corporis nemo rerum cupiditate eum.",
        bulletpointThree: "blabla dududu bing bong dum dum tata Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, voluptate atque itaque culpa doloremque ratione velit consectetur quam aspernatur deleniti, vitae incidunt molestiae illum veritatis corporis nemo rerum cupiditate eum.",
        technologyOne: "./assets/icons/my_projects_section/supabase_project_icon.svg",
        technologyTwo: "./assets/icons/my_projects_section/firebase_project_icon.svg",
        technologyThree: "./assets/icons/my_projects_section/html_project_icon.svg",
        projectMockup: "./assets/icons/my_projects_section/pokemon_preview.png",
        githubLink: "https://github.com/EugenLiske/Pokedex.git"
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

    projectTechnologyOneRef.src = selectedProject.technologyOne;
    projectTechnologyTwoRef.src = selectedProject.technologyTwo;
    projectTechnologyThreeRef.src = selectedProject.technologyThree;

    projectMockupRef.src = selectedProject.projectMockup;
    githubLinkRef.href = selectedProject.githubLink;
}