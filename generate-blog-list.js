/**
 * GitHub Action script to automatically generate blog list
 * This runs on GitHub and creates a blog-list.js file with all discovered blogs
 */

const fs = require('fs');
const path = require('path');

function findAllMarkdownFiles(dir) {
    const files = [];
    
    function scanDirectory(currentDir) {
        try {
            const items = fs.readdirSync(currentDir);
            
            for (const item of items) {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    scanDirectory(fullPath);
                } else if (item.endsWith('.md')) {
                    // Convert to web path (forward slashes)
                    const webPath = fullPath.replace(/\\/g, '/');
                    files.push(webPath);
                }
            }
        } catch (error) {
            console.warn(`Could not scan directory ${currentDir}:`, error.message);
        }
    }
    
    scanDirectory(dir);
    return files;
}

function extractMetadata(content, filePath) {
    const metadata = {};
    
    // Extract title (first # heading)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
        metadata.title = titleMatch[1].trim();
    } else {
        // Fallback to filename
        const fileName = path.basename(filePath, '.md');
        metadata.title = fileName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    
    // Extract published date
    const dateMatch = content.match(/\*\*Published:\*\*\s*(.+)/);
    if (dateMatch) {
        metadata.date = dateMatch[1].trim();
    } else {
        // Extract from path (blogs/YYYY/MM/)
        const pathMatch = filePath.match(/blogs[\/\\](\d{4})[\/\\](\d{2})[\/\\]/);
        if (pathMatch) {
            const year = pathMatch[1];
            const month = pathMatch[2];
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                             'July', 'August', 'September', 'October', 'November', 'December'];
            metadata.date = `${monthNames[parseInt(month) - 1]} ${year}`;
        } else {
            metadata.date = 'Unknown Date';
        }
    }
    
    // Extract reading time
    const timeMatch = content.match(/\*\*Reading Time:\*\*\s*(.+)/);
    if (timeMatch) {
        metadata.readTime = timeMatch[1].trim();
    } else {
        // Estimate reading time (200 words per minute)
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.max(1, Math.round(wordCount / 200));
        metadata.readTime = `${readTime} min read`;
    }
    
    // Generate excerpt
    metadata.excerpt = generateExcerpt(content);
    
    return metadata;
}

function generateExcerpt(content) {
    // Try to get first paragraph after introduction
    const introMatch = content.match(/##\s+Introduction\s*\n\n(.+?)(?:\n\n|\n##)/s);
    let excerpt;
    
    if (introMatch) {
        excerpt = introMatch[1].trim();
    } else {
        // Fallback to first substantial paragraph
        const paragraphs = content.split('\n\n');
        for (const para of paragraphs) {
            if (!para.startsWith('#') && 
                !para.startsWith('**') && 
                !para.startsWith('---') && 
                para.trim().length > 50) {
                excerpt = para.trim();
                break;
            }
        }
    }
    
    if (!excerpt) {
        excerpt = "No excerpt available...";
    }
    
    // Clean up markdown formatting
    excerpt = excerpt
        .replace(/\*\*(.+?)\*\*/g, '$1')  // Remove bold
        .replace(/\*(.+?)\*/g, '$1')      // Remove italic
        .replace(/\[(.+?)\]\(.+?\)/g, '$1')  // Remove links
        .replace(/`(.+?)`/g, '$1')        // Remove code
        .replace(/\n/g, ' ');             // Remove newlines
    
    // Truncate to reasonable length
    if (excerpt.length > 200) {
        excerpt = excerpt.substring(0, 200).replace(/\s+\S*$/, '') + '...';
    }
    
    return excerpt;
}

function generateBlogList() {
    console.log('🔍 Scanning for blog posts...');
    
    const blogsDir = 'blogs';
    if (!fs.existsSync(blogsDir)) {
        console.log('❌ Blogs directory not found!');
        return;
    }
    
    // Find all markdown files
    const markdownFiles = findAllMarkdownFiles(blogsDir);
    console.log(`📄 Found ${markdownFiles.length} markdown files`);
    
    const blogs = [];
    
    for (const filePath of markdownFiles) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Skip empty files
            if (content.trim().length < 10) {
                console.log(`⚠️  Skipping empty file: ${filePath}`);
                continue;
            }
            
            const metadata = extractMetadata(content, filePath);
            const id = path.basename(filePath, '.md');
            
            const blog = {
                id: id,
                title: metadata.title,
                date: metadata.date,
                readTime: metadata.readTime,
                excerpt: metadata.excerpt,
                path: filePath.replace(/\\/g, '/') // Ensure forward slashes for web
            };
            
            blogs.push(blog);
            console.log(`✅ Added: ${blog.title}`);
            
        } catch (error) {
            console.error(`❌ Error processing ${filePath}:`, error.message);
        }
    }
    
    // Sort by date (newest first)
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Generate JavaScript file
    const jsContent = `/**
 * Auto-generated blog list
 * Generated on: ${new Date().toISOString()}
 * Total blogs: ${blogs.length}
 */

window.BLOG_LIST = ${JSON.stringify(blogs, null, 4)};

console.log('📚 Loaded ${blogs.length} blog posts from auto-generated list');
`;
    
    // Write to blog-list.js
    fs.writeFileSync('blog-list.js', jsContent);
    
    console.log(`🎉 Generated blog-list.js with ${blogs.length} posts!`);
    console.log('📝 Blog posts included:');
    blogs.forEach((blog, index) => {
        console.log(`  ${index + 1}. ${blog.title} (${blog.date})`);
    });
}

// Run if called directly
if (require.main === module) {
    generateBlogList();
}

module.exports = { generateBlogList };
