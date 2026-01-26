import "./styles.css";
import { loadHome } from "./home.js";
import { loadMenu } from "./menu.js";
import { loadContact } from "./contact.js";

// Tab modules mapping
const tabModules = {
    home: loadHome,
    menu: loadMenu,
    contact: loadContact
};

// Set active tab and load content
function setActiveTab(tabName) {
    // Update nav button active states
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Load the tab content
    const loadFunction = tabModules[tabName];
    if (loadFunction) {
        loadFunction();
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Set up nav button event listeners
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            setActiveTab(tabName);
        });
    });

    // Load home page by default
    setActiveTab('home');
});