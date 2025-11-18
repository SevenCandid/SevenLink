// Individual Project Page Rendering Logic
// Handles rendering of project details on project.html

document.addEventListener('DOMContentLoaded', function() {
    // Get slug from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (!slug) {
        showError('No project specified. Please select a project from the portfolio.', true);
        return;
    }

    // Load projects from projects.js (check both window and global scope)
    const projectsData = window.projects || (typeof projects !== 'undefined' ? projects : null);
    const getProjectFn = window.getProjectBySlug || (typeof getProjectBySlug !== 'undefined' ? getProjectBySlug : null);
    
    if (!projectsData || !Array.isArray(projectsData)) {
        console.error('Projects data not loaded. Make sure projects.js is included before this script.');
        showError('Failed to load project data.');
        return;
    }

    // Find project by slug
    const project = getProjectFn ? getProjectFn(slug) : projectsData.find(p => p.slug === slug);

    if (!project) {
        showError(`The project with slug "${slug}" was not found. It may have been removed or the URL is incorrect.`, true);
        return;
    }

    // Update SEO and OpenGraph meta tags
    updateMetaTags(project);

    // Render project details
    renderProjectDetails(project);

    // Initialize scroll reveal animations
    initializeScrollReveal();

    // Initialize image gallery
    console.log('Initializing gallery with images:', project.images);
    initializeImageGallery(project.images);
});

// Helper function to update meta tags
function updateMetaTag(property, content, attribute = 'property') {
    let metaTag = document.querySelector(`meta[${attribute}="${property}"]`);
    
    if (!metaTag) {
        // Create new meta tag if it doesn't exist
        metaTag = document.createElement('meta');
        metaTag.setAttribute(attribute, property);
        document.head.appendChild(metaTag);
    }
    
    metaTag.setAttribute('content', content);
}

// Function to update OpenGraph and SEO meta tags
function updateMetaTags(project) {
    // Get the base URL (current page URL without query params)
    const baseUrl = window.location.origin + window.location.pathname;
    const currentUrl = `${baseUrl}?slug=${project.slug}`;
    
    // Get project image or use default
    const projectImage = project.images && project.images.length > 0 
        ? project.images[0] 
        : 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop';
    
    // Ensure image URL is absolute and properly formatted for social sharing
    let ogImage;
    if (projectImage.startsWith('http://') || projectImage.startsWith('https://')) {
        ogImage = projectImage;
    } else if (projectImage.startsWith('/')) {
        ogImage = `${window.location.origin}${projectImage}`;
    } else {
        ogImage = `${window.location.origin}/${projectImage}`;
    }
    
    // For social sharing, ensure image has proper dimensions (1200x630 is optimal for OpenGraph)
    // If using Unsplash, add dimensions to URL
    if (ogImage.includes('unsplash.com') && !ogImage.includes('w=')) {
        ogImage = ogImage.includes('?') 
            ? `${ogImage}&w=1200&h=630&fit=crop` 
            : `${ogImage}?w=1200&h=630&fit=crop`;
    }
    
    // Update page title
    document.title = `${project.title} | SevenLink Projects`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', project.shortDescription || project.longDescription.substring(0, 160));
    }
    
    // Update OpenGraph tags
    updateMetaTag('og:title', project.title);
    updateMetaTag('og:description', project.shortDescription || project.longDescription.substring(0, 200));
    updateMetaTag('og:image', ogImage);
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '630');
    updateMetaTag('og:image:type', 'image/jpeg');
    
    // Update Twitter Card tags
    updateMetaTag('twitter:title', project.title, 'name');
    updateMetaTag('twitter:description', project.shortDescription || project.longDescription.substring(0, 200), 'name');
    updateMetaTag('twitter:image', ogImage, 'name');
    updateMetaTag('twitter:site', '@SevenLink', 'name');
    
    // Update canonical URL
    const canonicalLink = document.getElementById('canonical-url');
    if (canonicalLink) {
        canonicalLink.setAttribute('href', currentUrl);
    }
    
    // Add structured data (JSON-LD) for better SEO
    addStructuredData(project, currentUrl, ogImage);
}

// Function to add structured data (JSON-LD) for SEO
function addStructuredData(project, url, imageUrl) {
    // Remove existing structured data if any
    const existingScript = document.getElementById('project-structured-data');
    if (existingScript) {
        existingScript.remove();
    }
    
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.shortDescription || project.longDescription.substring(0, 200),
        "image": imageUrl,
        "url": url,
        "author": {
            "@type": "Organization",
            "name": "SevenLink",
            "url": window.location.origin
        },
        "keywords": project.techStack.join(", "),
        "datePublished": new Date().toISOString()
    };
    
    const script = document.createElement('script');
    script.id = 'project-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

function renderProjectDetails(project) {
    // Page title is already updated in updateMetaTags

    // Render hero section
    renderHero(project);

    // Render overview section
    renderOverview(project);

    // Render features section
    renderFeatures(project);

    // Render tech stack section
    renderTechStack(project);

    // Render links section
    renderLinks(project);
}

function renderHero(project) {
    const heroSection = document.getElementById('project-hero');
    if (!heroSection) return;

    const heroImage = project.images && project.images.length > 0 
        ? project.images[0] 
        : 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200';

    heroSection.innerHTML = `
        <div class="project-hero-image">
            <img src="${heroImage}" alt="${project.title}">
            <div class="project-hero-overlay"></div>
        </div>
        <div class="project-hero-content">
            <div class="project-breadcrumb">
                <a href="index.html"><i class="fas fa-home"></i> Home</a>
                <span>/</span>
                <a href="projects.html">Projects</a>
                <span>/</span>
                <span>${project.title}</span>
            </div>
            <h1 class="project-hero-title">${project.title}</h1>
            <p class="project-hero-subtitle">${project.shortDescription}</p>
        </div>
    `;
}

function renderOverview(project) {
    const overviewSection = document.getElementById('project-overview');
    if (!overviewSection) return;

    overviewSection.innerHTML = `
        <div class="project-section-content">
            <h2 class="project-section-title">Project Overview</h2>
            <div class="project-description">
                <p>${project.longDescription}</p>
            </div>
        </div>
    `;
}

function renderFeatures(project) {
    const featuresSection = document.getElementById('project-features');
    if (!featuresSection) return;

    if (!project.features || project.features.length === 0) {
        featuresSection.style.display = 'none';
        return;
    }

    const featuresHTML = project.features.map((feature, index) => `
        <div class="feature-item reveal" style="animation-delay: ${index * 0.1}s">
            <div class="feature-icon">
                <i class="fas fa-check"></i>
            </div>
            <div class="feature-content">
                <h4>${feature}</h4>
            </div>
        </div>
    `).join('');

    featuresSection.innerHTML = `
        <div class="project-section-content">
            <h2 class="project-section-title">Key Features</h2>
            <div class="features-grid">
                ${featuresHTML}
            </div>
        </div>
    `;
}

function renderTechStack(project) {
    const techSection = document.getElementById('project-tech');
    if (!techSection) return;

    if (!project.techStack || project.techStack.length === 0) {
        techSection.style.display = 'none';
        return;
    }

    const techHTML = project.techStack.map((tech, index) => `
        <div class="tech-item reveal" style="animation-delay: ${index * 0.05}s">
            <span class="tech-name">${tech}</span>
        </div>
    `).join('');

    techSection.innerHTML = `
        <div class="project-section-content">
            <h2 class="project-section-title">Technology Stack</h2>
            <div class="tech-stack-grid">
                ${techHTML}
            </div>
        </div>
    `;
}

function renderLinks(project) {
    const linksSection = document.getElementById('project-links');
    if (!linksSection) return;

    const hasLinks = project.links && (project.links.live || project.links.github);

    if (!hasLinks) {
        linksSection.style.display = 'none';
        return;
    }

    let linksHTML = '';

    if (project.links.live) {
        linksHTML += `
            <a href="${project.links.live}" target="_blank" rel="noopener noreferrer" class="project-link-btn project-link-live">
                <i class="fas fa-external-link-alt"></i>
                <span>View Live Site</span>
            </a>
        `;
    }

    if (project.links.github) {
        linksHTML += `
            <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="project-link-btn project-link-github">
                <i class="fab fa-github"></i>
                <span>View on GitHub</span>
            </a>
        `;
    }

    linksSection.innerHTML = `
        <div class="project-section-content">
            <h2 class="project-section-title">Project Links</h2>
            <div class="project-links-container">
                ${linksHTML}
            </div>
        </div>
    `;
}

function initializeImageGallery(images) {
    console.log('initializeImageGallery called with:', images);
    
    if (!images || images.length === 0) {
        console.log('No images provided for gallery');
        const gallerySection = document.getElementById('project-gallery');
        if (gallerySection) {
            gallerySection.style.display = 'none';
        }
        return;
    }

    const gallerySection = document.getElementById('project-gallery');
    if (!gallerySection) {
        console.error('Gallery section not found in HTML');
        return;
    }

    console.log('Gallery section found, creating gallery HTML...');

    // Encode image paths to handle spaces and special characters
    const galleryHTML = images.map((image, index) => {
        // URL encode spaces for the src attribute
        const urlEncodedImage = encodeURI(image);
        console.log(`Processing image ${index + 1}: Original="${image}", Encoded="${urlEncodedImage}"`);
        return `
        <div class="gallery-item reveal" style="animation-delay: ${index * 0.1}s" data-image-src="${image}">
            <img src="${urlEncodedImage}" alt="Project screenshot ${index + 1}" loading="lazy" style="cursor: pointer;" onerror="console.error('Image failed to load:', '${image}'); this.style.display='none';">
        </div>
    `;
    }).join('');

    gallerySection.innerHTML = `
        <div class="project-section-content">
            <h2 class="project-section-title">Screenshots</h2>
            <div class="gallery-grid">
                ${galleryHTML}
            </div>
        </div>
    `;
    
    // Ensure gallery section is visible
    gallerySection.style.display = 'block';
    
    // Add click event listeners to gallery items
    setTimeout(() => {
        const galleryItems = gallerySection.querySelectorAll('.gallery-item');
        console.log(`Found ${galleryItems.length} gallery items to attach click handlers`);
        galleryItems.forEach((item, index) => {
            const imageSrc = item.getAttribute('data-image-src');
            console.log(`Gallery item ${index + 1} - imageSrc:`, imageSrc);
            if (imageSrc) {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Gallery item clicked, opening modal with:', imageSrc);
                    const modalFunction = window.openImageModal || openImageModal;
                    if (typeof modalFunction === 'function') {
                        modalFunction(imageSrc);
                    } else {
                        console.error('openImageModal function not found. Available:', typeof window.openImageModal, typeof openImageModal);
                    }
                });
                console.log(`Click handler attached to gallery item ${index + 1}`);
            }
        });
    }, 100);
    
    // Force reveal animation to trigger
    setTimeout(() => {
        const revealElements = gallerySection.querySelectorAll('.reveal');
        revealElements.forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
    
    console.log(`Gallery initialized with ${images.length} image(s)`);
    console.log('Gallery HTML:', gallerySection.innerHTML.substring(0, 200) + '...');
    
    // Check if images are actually loading
    setTimeout(() => {
        const images = gallerySection.querySelectorAll('img');
        images.forEach((img, index) => {
            if (!img.complete || img.naturalHeight === 0) {
                console.warn(`Image ${index + 1} may not have loaded:`, img.src);
            } else {
                console.log(`Image ${index + 1} loaded successfully:`, img.src);
            }
        });
    }, 1000);
}

function openImageModal(imageSrc) {
    console.log('openImageModal called with:', imageSrc);
    
    // Remove any existing modal first
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-overlay"></div>
        <div class="image-modal-content">
            <button class="image-modal-close" aria-label="Close modal">
                <i class="fas fa-times"></i>
            </button>
            <img src="${imageSrc}" alt="Project screenshot">
        </div>
    `;
    
    // Add click handlers
    const overlay = modal.querySelector('.image-modal-overlay');
    const closeBtn = modal.querySelector('.image-modal-close');
    const modalImg = modal.querySelector('.image-modal-content img');
    
    overlay.addEventListener('click', closeImageModal);
    closeBtn.addEventListener('click', closeImageModal);
    modalImg.addEventListener('click', closeImageModal);
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close on Escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    // Animate modal appearance
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    console.log('Modal created and added to DOM');
}

function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

function showError(message, isNotFound = false) {
    const mainContent = document.querySelector('main');
    if (mainContent) {
        const errorHTML = isNotFound ? `
            <div class="error-container" style="text-align: center; padding: 5rem 2rem; max-width: 600px; margin: 0 auto;">
                <div style="font-size: 5rem; color: var(--primary-color); margin-bottom: 2rem;">
                    <i class="fas fa-search"></i>
                </div>
                <h2 style="font-family: var(--font-heading); font-size: 2.5rem; color: var(--text-color); margin-bottom: 1rem;">Project Not Found</h2>
                <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.6;">
                    ${message || 'The project you\'re looking for doesn\'t exist or may have been moved.'}
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="projects.html" class="cta-button" style="display: inline-block; background: linear-gradient(135deg, var(--primary-color), var(--accent-color)); color: white; padding: 1rem 2rem; border-radius: 50px; text-decoration: none; font-weight: 600; transition: all 0.3s ease;">
                        <i class="fas fa-arrow-left"></i> Back to Projects
                    </a>
                    <a href="index.html" class="cta-button" style="display: inline-block; background: var(--bg-secondary); color: var(--text-color); padding: 1rem 2rem; border-radius: 50px; text-decoration: none; font-weight: 600; border: 2px solid var(--border-color); transition: all 0.3s ease;">
                        <i class="fas fa-home"></i> Go Home
                    </a>
                </div>
            </div>
        ` : `
            <div class="error-container" style="text-align: center; padding: 5rem 2rem; max-width: 600px; margin: 0 auto;">
                <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                <h2 style="font-family: var(--font-heading); color: var(--text-color); margin-bottom: 1rem;">Error</h2>
                <p style="color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.6;">${message}</p>
                <a href="projects.html" class="cta-button" style="display: inline-block; background: linear-gradient(135deg, var(--primary-color), var(--accent-color)); color: white; padding: 1rem 2rem; border-radius: 50px; text-decoration: none; font-weight: 600; transition: all 0.3s ease;">
                    Back to Projects
                </a>
            </div>
        `;
        mainContent.innerHTML = errorHTML;
    }
}

// Make functions globally available for onclick handlers
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;

