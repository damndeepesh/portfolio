#!/usr/bin/env node

/**
 * Build script for the portfolio website
 * This script handles the build process for Cloudflare Pages
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting build process...');

try {
    // Check if blogs directory exists
    const blogsDir = 'blogs';
    if (!fs.existsSync(blogsDir)) {
        console.log('📝 No blogs directory found, creating empty blog list...');
        
        // Create empty blog list
        const emptyBlogList = `/**
 * Auto-generated blog list
 * Generated on: ${new Date().toISOString()}
 * Total blogs: 0
 */

window.BLOG_LIST = [];

console.log('📚 Loaded 0 blog posts from auto-generated list');
`;
        
        fs.writeFileSync('blog-list.js', emptyBlogList);
        console.log('✅ Empty blog-list.js created');
    } else {
        // Generate blog list using the existing function
        const { generateBlogList } = require('./generate-blog-list.js');
        generateBlogList();
    }
    
    console.log('✅ Build completed successfully!');
    console.log('📁 Static files ready for deployment');
    
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}
