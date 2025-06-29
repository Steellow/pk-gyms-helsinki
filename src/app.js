import { router } from './router.js';
import { renderOpenShiftsPage } from './pages/open-shifts.js';
import { renderGymsPage } from './pages/all-gyms.js';
import { renderContactPage } from './pages/contact.js';

// Global navigation function
window.navigateTo = function(path) {
    router.navigate(path);
};

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