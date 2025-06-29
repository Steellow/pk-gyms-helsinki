class Router {
    constructor() {
        this.routes = {};
        this.currentPath = '/';
        
        // Detect base path for GitHub Pages
        this.basePath = this.getBasePath();
        
        // Listen for browser back/forward
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname);
        });
    }
    
    getBasePath() {
        // For local development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Router: Local development detected, no base path');
            return '';
        }
        
        // For GitHub Pages: extract repo name from pathname
        const pathSegments = window.location.pathname.split('/').filter(segment => segment);
        console.log('Router: Path segments:', pathSegments, 'Hostname:', window.location.hostname);
        
        // Check if this is GitHub Pages (either github.io or custom domain with repo path)
        if (pathSegments.length > 0) {
            // For github.io domains or custom domains serving from a repo subdirectory
            if (window.location.hostname.includes('github.io') || 
                (pathSegments.length > 0 && pathSegments[0] === 'pk-gyms-helsinki')) {
                const basePath = '/' + pathSegments[0];
                console.log('Router: Base path detected:', basePath);
                return basePath;
            }
        }
        
        // For custom domains at root or other hosting
        console.log('Router: No base path detected, using root');
        return '';
    }
    
    getRelativePath(fullPath) {
        // Remove base path from full path to get relative path
        if (this.basePath && fullPath.startsWith(this.basePath)) {
            return fullPath.substring(this.basePath.length) || '/';
        }
        return fullPath;
    }
    
    getFullPath(relativePath) {
        // Add base path to relative path to get full path
        return this.basePath + relativePath;
    }
    
    addRoute(path, handler) {
        this.routes[path] = handler;
    }
    
    navigate(path) {
        console.log('Router: Navigate called with path:', path);
        const relativePath = this.getRelativePath(path);
        console.log('Router: Relative path:', relativePath, 'Current path:', this.currentPath);
        if (relativePath !== this.currentPath) {
            this.currentPath = relativePath;
            const fullPath = this.getFullPath(relativePath);
            console.log('Router: Full path for URL:', fullPath);
            window.history.pushState({}, '', fullPath);
            this.handleRoute(relativePath);
        }
    }
    
    handleRoute(fullPath) {
        const relativePath = this.getRelativePath(fullPath);
        this.currentPath = relativePath;
        const handler = this.routes[relativePath] || this.routes['/'];
        if (handler) {
            handler();
        }
        
        // Update navigation active state
        if (window.updateActiveNavigation) {
            window.updateActiveNavigation(relativePath);
        }
    }
    
    init() {
        // Handle GitHub Pages redirect first
        if (window._githubPagesRedirect) {
            const redirectPath = window._githubPagesRedirect;
            delete window._githubPagesRedirect;
            this.navigate(redirectPath);
            return;
        }
        
        // Handle initial page load
        const fullPath = window.location.pathname;
        this.handleRoute(fullPath);
    }
}

export const router = new Router();