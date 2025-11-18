// Projects List Page Rendering Logic
// Handles rendering of all projects on projects.html

// Wait for both DOM and projects data to be ready
function initializeProjectsPage() {
    // Get projects from window or global scope
    const projectsData = window.projects || (typeof projects !== 'undefined' ? projects : null);
    
    // Check if projects data is available
    if (!projectsData || !Array.isArray(projectsData)) {
        console.error('Projects data not loaded. Make sure projects.js is included before this script.');
        const container = document.getElementById('projects-container');
        if (container) {
            container.innerHTML = `
                <div class="no-projects">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Failed to load projects. Please refresh the page.</p>
                </div>
            `;
        }
        return;
    }

    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) {
        console.error('Projects container not found.');
        return;
    }

    // Render all projects
    console.log('Calling renderProjects with', projectsData.length, 'projects');
    renderProjects(projectsData);

    // Initialize scroll reveal animations
    initializeScrollReveal();
    
    // Update results count
    updateResultsCount(projectsData.length);
    
    console.log('Page initialization complete!');
}

function updateResultsCount(count) {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = `${count} project${count !== 1 ? 's' : ''} available`;
    }
}

// Initialize when both DOM and projects data are ready
let waitAttempts = 0;
const maxWaitAttempts = 50; // 5 seconds max wait time

function waitForProjects() {
    // Check if projects is available (either from window or global scope)
    const projectsData = window.projects || (typeof projects !== 'undefined' ? projects : null);
    
    if (projectsData && Array.isArray(projectsData)) {
        // Projects are loaded, initialize
        console.log(`Found ${projectsData.length} projects, initializing page...`);
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeProjectsPage);
        } else {
            initializeProjectsPage();
        }
    } else if (waitAttempts < maxWaitAttempts) {
        // Wait a bit and try again (in case script is still loading)
        waitAttempts++;
        setTimeout(waitForProjects, 100);
    } else {
        // Timeout - show error
        console.error('Timeout waiting for projects data to load.');
        const container = document.getElementById('projects-container');
        if (container) {
            container.innerHTML = `
                <div class="no-projects">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Failed to load projects. Please check that js/projects.js is loaded correctly.</p>
                </div>
            `;
        }
    }
}

// Start waiting for projects
console.log('projects-list.js loaded, waiting for projects data...');
waitForProjects();

// Make renderProjects globally available
window.renderProjects = function(projectsData) {
    const container = document.getElementById('projects-container');
    
    if (!container) {
        console.error('projects-container element not found!');
        return;
    }

    console.log(`Rendering ${projectsData.length} projects...`);

    // Clear existing content
    container.innerHTML = '';

    if (projectsData.length === 0) {
        container.innerHTML = `
            <div class="no-projects">
                <i class="fas fa-folder-open"></i>
                <p>No projects available at the moment.</p>
            </div>
        `;
        return;
    }

    // Create project cards
    projectsData.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        container.appendChild(projectCard);
    });
    
    console.log('Projects rendered successfully!');
};

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Get first image or placeholder
    const imageUrl = project.images && project.images.length > 0 
        ? project.images[0] 
        : 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800';

    card.innerHTML = `
        <div class="project-card-image">
            <img src="${imageUrl}" alt="${project.title}" loading="lazy">
            <div class="project-card-overlay">
                <a href="project.html?slug=${project.slug}" class="project-view-btn">
                    <i class="fas fa-eye"></i> View Project
                </a>
            </div>
        </div>
        <div class="project-card-content">
            <h3 class="project-card-title">${project.title}</h3>
            <p class="project-card-description">${project.shortDescription}</p>
            <div class="project-card-tech">
                ${project.techStack.slice(0, 3).map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
                ${project.techStack.length > 3 ? `<span class="tech-tag-more">+${project.techStack.length - 3}</span>` : ''}
            </div>
            <div class="project-card-footer">
                <a href="project.html?slug=${project.slug}" class="project-card-link">
                    Learn More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `;

    // Add hover effect
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    return card;
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

// Search functionality - initialize after DOM is ready
function initializeSearch() {
    const searchInput = document.getElementById('project-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterProjects(searchTerm);
        });
    }
}

// Initialize search when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSearch);
} else {
    initializeSearch();
}

function filterProjects(searchTerm) {
    // Get projects from window or global scope
    const projectsData = window.projects || (typeof projects !== 'undefined' ? projects : null);
    
    if (!projectsData || !Array.isArray(projectsData)) {
        return;
    }
    
    const filteredProjects = projectsData.filter(project => {
        return project.title.toLowerCase().includes(searchTerm) ||
               project.shortDescription.toLowerCase().includes(searchTerm) ||
               project.techStack.some(tech => tech.toLowerCase().includes(searchTerm));
    });

    renderProjects(filteredProjects);
    
    // Update results count
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        if (searchTerm) {
            resultsCount.textContent = `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} found`;
        } else {
            resultsCount.textContent = `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} available`;
        }
    }
}

