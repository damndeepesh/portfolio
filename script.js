// Language system removed - English only

// Navigation System
class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
    }

    bindEvents() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Hamburger menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navMenu && this.navMenu.classList.contains('active')) {
                if (!this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                    this.closeMobileMenu();
                }
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Handle scroll events
        window.addEventListener('scroll', () => this.handleScroll());
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    handleScroll() {
        const scrolled = window.scrollY > 50;
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (scrolled) {
            if (isDark) {
                this.navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            } else {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
            this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            if (isDark) {
                this.navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            this.navbar.style.boxShadow = 'none';
        }
    }
}

// Animation System
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.addScrollAnimations();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, options);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.skill-category, .project-card, .blog-card, .contact-item, .cert-item, .experience-item, .education-item'
        );

        animatedElements.forEach(el => observer.observe(el));
    }

    addScrollAnimations() {
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
}

// Typing Animation for Hero Section
class TypingAnimation {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        if (this.element) {
            this.type();
        }
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500; // Pause before next text
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Theme System
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadTheme();
    }

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.updateTheme();
        this.saveTheme();
    }

    updateTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
        
        // Add smooth transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Update navbar background immediately
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const scrolled = window.scrollY > 50;
            if (this.currentTheme === 'dark') {
                navbar.style.background = scrolled ? 'rgba(0, 0, 0, 0.98)' : 'rgba(0, 0, 0, 0.95)';
            } else {
                navbar.style.background = scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)';
            }
        }
    }

    updateThemeIcon() {
        const themeIcon = document.getElementById('theme-icon');
        if (themeIcon) {
            if (this.currentTheme === 'dark') {
                themeIcon.className = 'fas fa-moon';
            } else {
                themeIcon.className = 'fas fa-sun';
            }
        }
    }

    saveTheme() {
        localStorage.setItem('preferred-theme', this.currentTheme);
    }

    loadTheme() {
        const saved = localStorage.getItem('preferred-theme');
        if (saved && (saved === 'light' || saved === 'dark')) {
            this.currentTheme = saved;
        } else {
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.currentTheme = 'dark';
            }
        }
        this.updateTheme();
    }
}

// Utility Functions
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Performance Optimization
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalResources();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        // Preload critical fonts
        const fontUrls = [
            'https://fonts.googleapis.com/css2?family=Sacramento&display=swap',
            'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap'
        ];

        fontUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = url;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }
}

// Contact Form Handler (if needed in future)
class ContactManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        // Handle form submission
        console.log('Contact form submitted');
    }
}

// Blog Manager
class BlogManager {
    constructor() {
        this.blogGrid = document.getElementById('blog-grid');
        this.init();
    }

    init() {
        this.loadHomepageBlogs();
        this.setupBlogInteractions();
    }

    loadHomepageBlogs() {
        if (!this.blogGrid) return;

        try {
            // Use the auto-generated blog list
            if (window.BLOG_LIST && Array.isArray(window.BLOG_LIST) && window.BLOG_LIST.length > 0) {
                this.renderBlogs(window.BLOG_LIST.slice(0, 3)); // Show latest 3 blogs
                this.showBlogSection();
                console.log(`✅ Loaded ${window.BLOG_LIST.length} blogs on homepage!`);
            } else {
                console.log('📝 No blogs found - hiding blog section');
                this.hideBlogSection();
            }
        } catch (error) {
            console.error('Error loading blogs:', error);
            this.hideBlogSection();
        }
    }

    renderBlogs(blogs) {
        if (!this.blogGrid) return;

        const blogsHtml = blogs.map(blog => this.createBlogCard(blog)).join('');
        this.blogGrid.innerHTML = blogsHtml;
        
        // Re-setup interactions after rendering
        setTimeout(() => this.setupBlogInteractions(), 100);
    }

    createBlogCard(blog) {
        // Extract tags from the blog content or use defaults
        const tags = this.extractTags(blog);
        
        return `
            <article class="blog-card">
                <div class="blog-header">
                    <h3><a href="blog-reader.html?blog=${blog.id}">${blog.title}</a></h3>
                    <div class="blog-meta">
                        <span class="blog-date">${blog.date}</span>
                        <span class="blog-read-time">${blog.readTime}</span>
                    </div>
                </div>
                <div class="blog-content">
                    <p>${blog.excerpt}</p>
                </div>
                <div class="blog-tags">
                    ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </article>
        `;
    }

    extractTags(blog) {
        // Extract tags from title/content or use defaults based on content
        const title = blog.title.toLowerCase();
        const excerpt = blog.excerpt.toLowerCase();
        
        const tagMap = {
            'rag': ['RAG', 'AI', 'Search'],
            'llm': ['LLM', 'Deployment', 'MLOps'],
            'mlops': ['MLOps', 'CI/CD', 'Monitoring'],
            'machine learning': ['ML', 'AI', 'Data'],
            'deployment': ['Deployment', 'DevOps', 'Production'],
            'ai': ['AI', 'Technology', 'Innovation'],
            'python': ['Python', 'Programming', 'Development'],
            'data': ['Data', 'Analytics', 'Science'],
            'test': ['Testing', 'Development', 'Debug']
        };

        // Find matching tags
        let tags = [];
        for (const [keyword, keywordTags] of Object.entries(tagMap)) {
            if (title.includes(keyword) || excerpt.includes(keyword)) {
                tags.push(...keywordTags);
                break;
            }
        }

        // Default tags if none found
        if (tags.length === 0) {
            tags = ['AI', 'Technology', 'Blog'];
        }

        // Return unique tags, max 3
        return [...new Set(tags)].slice(0, 3);
    }

    showError() {
        if (!this.blogGrid) return;
        
        this.blogGrid.innerHTML = `
            <div class="blog-error">
                <p>Unable to load blog posts. Please try again later.</p>
                <a href="blog-reader.html" class="btn btn-primary">View All Posts</a>
            </div>
        `;
    }

    showBlogSection() {
        // Show the blog section
        const blogSection = document.getElementById('blog');
        if (blogSection) {
            blogSection.style.display = 'block';
        }
        
        // Show the blog navbar link
        const blogNavLink = document.querySelector('a[href="#blog"]');
        if (blogNavLink) {
            blogNavLink.parentElement.style.display = 'block';
        }
    }

    hideBlogSection() {
        // Hide the blog section
        const blogSection = document.getElementById('blog');
        if (blogSection) {
            blogSection.style.display = 'none';
        }
        
        // Hide the blog navbar link
        const blogNavLink = document.querySelector('a[href="#blog"]');
        if (blogNavLink) {
            blogNavLink.parentElement.style.display = 'none';
        }
        
        console.log('🚫 Blog section and navbar link hidden - no blogs available');
    }

    setupBlogInteractions() {
        // Add hover effects and reading time calculation
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach(card => {
            // Hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });

            // Reading time calculation (if needed)
            const content = card.querySelector('.blog-content p');
            if (content) {
                const wordCount = content.textContent.split(' ').length;
                const readingTime = Math.ceil(wordCount / 200); // Average reading speed
                const readTimeElement = card.querySelector('.blog-read-time');
                if (readTimeElement && !readTimeElement.textContent.includes('min')) {
                    readTimeElement.textContent = `${readingTime} min read`;
                }
            }
        });
    }
}

// Utility function to update copyright year
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Update copyright year
    updateCopyrightYear();
    
    // Initialize all managers
    const navigationManager = new NavigationManager();
    const animationManager = new AnimationManager();
    const themeManager = new ThemeManager();
    const performanceManager = new PerformanceManager();
    const contactManager = new ContactManager();
    const blogManager = new BlogManager();

    // Initialize typing animation for hero subtitle (optional)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const subtitleTexts = [
            'AI/ML Engineer | Generative AI Specialist | Full-Stack Innovator',
            'Building scalable, production-ready AI systems',
            'Transforming ideas into intelligent solutions'
        ];
        // Uncomment to enable typing animation
        // new TypingAnimation(heroSubtitle, subtitleTexts, 80);
    }

    // Add smooth reveal animation on page load
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Add custom cursor effect (optional)
    const addCustomCursor = () => {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-tag');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    };

    // Uncomment to enable custom cursor
    // addCustomCursor();

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add scroll progress indicator
    const addScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', Utils.throttle(() => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }, 10));
    };

    addScrollProgress();

    // Console message for developers
    console.log(`
    🚀 Deepesh Gupta's Portfolio Website
    ====================================
    
    Built with:
    • Vanilla JavaScript (ES6+)
    • Modern CSS (Grid, Flexbox, Custom Properties)
    • Responsive Design
    • Multi-language Support (EN/HI)
    • Performance Optimizations
    • Accessibility Features
    
    GitHub: https://github.com/damndeepesh
    LinkedIn: https://linkedin.com/in/damndeepesh
    
    Interested in the code? Check out the source!
    `);
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LanguageManager,
        NavigationManager,
        AnimationManager,
        ThemeManager,
        Utils
    };
}
