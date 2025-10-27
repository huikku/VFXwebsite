/**
 * Creative Portfolio Template - Main JavaScript
 * Author: John Huikku
 * Copyright © 2025 John Huikku
 * Support & Discussion: https://discord.gg/TWfa3A72
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Main JavaScript file for Portfolio Template
 * Combined functionality from multiple scripts
 */

// Initialize when DOM is ready and scripts are loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOMContentLoaded already fired (script is deferred)
    init();
}

function init() {
    try {
        // Initialize AOS (Animate on Scroll) if available
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false,
                disable: window.innerWidth < 768 // Disable on mobile devices for better performance
            });
        }

        // Initialize all site functionalities
        initMobileNav();
        initSmoothScroll();
        initLazyLoading();
        initPortfolioFilters();
        initVideoModal();
        initGlitchEffect();
        initContactForm();

        // Detect scroll for header transparency with throttling
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(function() {
                    handleScroll();
                    scrollTimeout = null;
                }, 100);
            }
        }, { passive: true });
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

/**
 * Initialize mobile navigation menu
 */
function initMobileNav() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('nav').offsetHeight;
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Force load if needed
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }
}

/**
 * Handle scroll event for header transparency
 */
function handleScroll() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        nav.style.backgroundColor = 'rgba(26, 26, 26, 0.8)';
    }
}

/**
 * Initialize portfolio filter functionality
 * COMPLETELY SEPARATE from video functionality
 */
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.portfolio-categories button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Apply 'all' filter by default
    setTimeout(() => filterPortfolio('all'), 100);
    
    // Add click event to filter buttons only
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-category');
            
            // Apply filter
            filterPortfolio(filterValue);
        });
    });
    
    /**
     * Filter portfolio items based on category
     * @param {string} category - The category to filter by
     */
    function filterPortfolio(category) {
        console.log("Filtering by:", category);
        
        if (portfolioItems.length === 0) {
            console.error("No portfolio items found to filter!");
            return;
        }
        
        // Filter items
        portfolioItems.forEach(item => {
            const dataCategory = item.getAttribute('data-category') || '';
            
            if (category === 'all' || dataCategory.toLowerCase().includes(category.toLowerCase())) {
                // Show item with animation
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                // Hide item with animation
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Re-layout the grid after filtering
        setTimeout(refreshPortfolioGrid, 350);
    }
    
    /**
     * Refresh the portfolio grid layout
     * This helps with any layout shifts after filtering
     */
    function refreshPortfolioGrid() {
        const grid = document.getElementById('portfolio-grid');
        if (grid) {
            // Force reflow
            grid.style.display = 'none';
            void grid.offsetHeight; // This line triggers reflow
            grid.style.display = 'grid';
        }
    }
}

/**
 * Initialize video modal functionality
 * Refactored to eliminate code duplication
 */
function initVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const closeVideo = document.getElementById('closeVideo');

    if (!videoModal || !videoPlayer || !closeVideo) {
        console.error("Video modal elements not found!");
        return;
    }

    /**
     * Close the video modal and cleanup
     */
    function closeModal() {
        videoModal.style.display = 'none';
        videoPlayer.innerHTML = ''; // Clear iframe to stop video
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    /**
     * Open video in modal or new tab
     * @param {string} videoId - YouTube video ID
     * @param {string} externalUrl - External URL to open in new tab
     */
    function openVideo(videoId, externalUrl) {
        if (videoId) {
            // Show loading state
            videoModal.style.display = 'flex';
            videoPlayer.innerHTML = '<div class="loading-spinner">Loading...</div>';
            document.body.style.overflow = 'hidden';

            // Create YouTube iframe with security attributes
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
            iframe.title = 'YouTube video player';
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation');
            iframe.style.border = 'none';

            // Replace loading with iframe
            setTimeout(() => {
                videoPlayer.innerHTML = '';
                videoPlayer.appendChild(iframe);
            }, 100);
        } else if (externalUrl) {
            // Open in new tab with security
            const newWindow = window.open(externalUrl, '_blank', 'noopener,noreferrer');
            if (!newWindow) {
                alert('Please allow popups for this site to view external links.');
            }
        }
    }

    /**
     * Handle portfolio item click
     * @param {Event} e - Click event
     * @param {HTMLElement} portfolioItem - The portfolio item element
     */
    function handlePortfolioClick(e, portfolioItem) {
        // Ignore clicks on filter buttons
        if (e.target.closest('.portfolio-categories')) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        const videoId = portfolioItem.getAttribute('data-video-id');
        const externalUrl = portfolioItem.getAttribute('data-external-url');

        openVideo(videoId, externalUrl);
    }

    // Close modal on button click
    closeVideo.addEventListener('click', closeModal);

    // Close modal when clicking outside
    videoModal.addEventListener('click', function(event) {
        if (event.target === videoModal) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.style.display === 'flex') {
            closeModal();
        }
    });

    // Add click handlers to all portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', function(e) {
            handlePortfolioClick(e, this);
        });
    });
}

/**
 * Initialize glitch effect for hero title
 * Optimized version with better performance and error handling
 */
function initGlitchEffect() {
    const glitchTitle = document.querySelector('.glitch-title');

    if (!glitchTitle) {
        console.warn('Glitch title element not found!');
        return;
    }

    // Reduced list of fonts for better performance
    const rubikFonts = [
        'Rubik Glitch',
        'Rubik Glitch Pop',
        'Rubik Broken Fax'
    ];

    // Define color palette
    const colors = ['#00FFFF', '#FFA500', '#FF4D4D', '#FFFFFF'];

    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Static effect for users who prefer reduced motion
        glitchTitle.style.fontFamily = "'Rubik Glitch', sans-serif";
        glitchTitle.style.color = '#FF4D4D';
        return;
    }

    // Store original text and styles
    const originalText = glitchTitle.textContent;
    const originalColor = '#FF4D4D';
    let glitchTimeout = null;
    let isGlitching = true;

    /**
     * Apply a random glitch effect
     */
    function performGlitch() {
        if (!isGlitching) return;

        try {
            // Apply a new random font (80% chance)
            if (Math.random() < 0.8) {
                const randomFont = rubikFonts[Math.floor(Math.random() * rubikFonts.length)];
                glitchTitle.style.fontFamily = `'${randomFont}', sans-serif`;
            }

            // Apply a slight position offset (50% chance)
            if (Math.random() < 0.5) {
                const randomX = (Math.random() * 4 - 2).toFixed(2); // -2 to 2px
                const randomY = (Math.random() * 2 - 1).toFixed(2); // -1 to 1px
                glitchTitle.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }

            // Change color (30% chance)
            if (Math.random() < 0.3) {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                glitchTitle.style.color = randomColor;
            }

            // Restore text if somehow changed
            if (glitchTitle.textContent !== originalText) {
                glitchTitle.textContent = originalText;
            }

            // Continue the glitch loop with a random delay
            const randomDelay = Math.floor(Math.random() * 350) + 100; // 100-450ms
            glitchTimeout = setTimeout(performGlitch, randomDelay);
        } catch (error) {
            console.error("Error in glitch effect:", error);
            recoverGlitch();
        }
    }

    /**
     * Recover from glitch error
     */
    function recoverGlitch() {
        try {
            glitchTitle.style.fontFamily = "'Rubik Glitch', sans-serif";
            glitchTitle.style.color = originalColor;
            glitchTitle.style.transform = 'translate(0, 0)';
            glitchTitle.textContent = originalText;
        } catch (e) {
            console.error("Failed to recover from glitch error:", e);
            isGlitching = false; // Stop trying
        }
    }

    // Start the glitch loop after a slight delay
    setTimeout(performGlitch, 1000);

    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
        isGlitching = false;
        if (glitchTimeout) {
            clearTimeout(glitchTimeout);
        }
    });
}

/**
 * Initialize contact form with error handling
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // The form will submit to Formspree naturally
        // Add a timeout to re-enable button in case of error
        setTimeout(function() {
            if (submitButton.disabled) {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        }, 5000);
    });

    // Handle form response (if redirected back)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.textContent = 'Thank you! Your message has been sent successfully.';
        successMessage.style.cssText = 'background: #4CAF50; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0; text-align: center;';
        contactForm.insertBefore(successMessage, contactForm.firstChild);

        // Remove success parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}