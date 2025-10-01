/**
 * Blog list for portfolio website
 * This file provides blog functionality for the website
 */

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
    // Initialize empty blog list for browser
    window.BLOG_LIST = [];
    
    // Log that blog list is loaded
    console.log('📚 Blog list loaded (empty)');
} else {
    // Node.js environment - just export an empty object
    module.exports = {
        BLOG_LIST: []
    };
}
