#!/usr/bin/env node

/**
 * Build script for the portfolio website
 * This script handles the build process for Cloudflare Pages
 */

const { generateBlogList } = require('./generate-blog-list.js');

console.log('🚀 Starting build process...');

try {
    // Generate blog list
    generateBlogList();
    
    console.log('✅ Build completed successfully!');
    console.log('📁 Static files ready for deployment');
    
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}
