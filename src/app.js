import { router } from './router.js';
import { renderVapaavuorotPage } from './pages/vapaavuorot.js';
import { renderGymsPage } from './pages/gyms.js';
import { renderContactPage } from './pages/contact.js';

// Global navigation function
window.navigateTo = function(path) {
    router.navigate(path);
};

// Set up routes
router.addRoute('/', renderVapaavuorotPage);
router.addRoute('/gyms', renderGymsPage);
router.addRoute('/contact', renderContactPage);

// Initialize router when page loads
document.addEventListener('DOMContentLoaded', () => {
    router.init();
});