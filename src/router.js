class Router {
    constructor() {
        this.routes = {};
        this.currentPath = '/';
        
        // Listen for browser back/forward
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname);
        });
    }
    
    addRoute(path, handler) {
        this.routes[path] = handler;
    }
    
    navigate(path) {
        if (path !== this.currentPath) {
            this.currentPath = path;
            window.history.pushState({}, '', path);
            this.handleRoute(path);
        }
    }
    
    handleRoute(path) {
        this.currentPath = path;
        const handler = this.routes[path] || this.routes['/'];
        if (handler) {
            handler();
        }
        
        // Update navigation active state
        if (window.updateActiveNavigation) {
            window.updateActiveNavigation(path);
        }
    }
    
    init() {
        // Handle initial page load
        const path = window.location.pathname;
        this.handleRoute(path);
    }
}

export const router = new Router();