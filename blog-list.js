/**
 * Blog list for portfolio website
 * This file provides blog functionality for the website
 */

// Create the blog list
const BLOG_LIST = [];

// Make BLOG_LIST available globally in both environments
if (typeof window !== 'undefined') {
    // Browser: Set up window.BLOG_LIST
    window.BLOG_LIST = BLOG_LIST;
} else {
    // Node.js: Create a global window object and set BLOG_LIST
    global.window = global.window || {};
    global.window.BLOG_LIST = BLOG_LIST;
}

// Log that blog list is loaded
console.log('📚 Blog list loaded (empty)');

// Export for Node.js modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BLOG_LIST: BLOG_LIST
    };
}
