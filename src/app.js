import { router } from './router.js';
import { renderOpenShiftsPage } from './pages/open-shifts.js';
import { renderGymsPage } from './pages/all-gyms.js';
import { renderContactPage } from './pages/contact.js';

// Global navigation function
window.navigateTo = function(path) {
    router.navigate(path);
    updateActiveNavigation(path);
};

// Mobile dropdown functions
window.toggleNavDropdown = function() {
    const button = document.querySelector('.dropdown-button');
    const menu = document.getElementById('nav-dropdown-menu');
    
    button.classList.toggle('open');
    menu.classList.toggle('open');
};

window.closeNavDropdown = function() {
    const button = document.querySelector('.dropdown-button');
    const menu = document.getElementById('nav-dropdown-menu');
    
    button.classList.remove('open');
    menu.classList.remove('open');
};

// Update active navigation state
window.updateActiveNavigation = function updateActiveNavigation(path) {
    // Update desktop tabs
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-path') === path) {
            link.classList.add('active');
        }
    });
    
    // Update mobile dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-path') === path) {
            item.classList.add('active');
            // Update dropdown button text
            const buttonText = document.querySelector('.dropdown-text');
            if (buttonText) {
                buttonText.textContent = item.textContent.replace('↗', '').trim();
            }
        }
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.nav-dropdown');
    const button = document.querySelector('.dropdown-button');
    const menu = document.getElementById('nav-dropdown-menu');
    
    if (dropdown && !dropdown.contains(event.target)) {
        button?.classList.remove('open');
        menu?.classList.remove('open');
    }
});

// Set up routes
router.addRoute('/', renderOpenShiftsPage);
router.addRoute('/gyms', renderGymsPage);
router.addRoute('/contact', renderContactPage);

// Initialize router when page loads
document.addEventListener('DOMContentLoaded', () => {
    try {
        router.init();
    } catch (error) {
        console.error('Failed to initialize router:', error);
        console.error('Check config/gyms.js for data validation errors');
    }
});

// Global error handler for unhandled errors
window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
    console.error('This might be caused by invalid gym data in config/gyms.js');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    console.error('This might be caused by invalid gym data in config/gyms.js');
});