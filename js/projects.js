// SevenLink Projects Data
// Central data store for all portfolio projects
//
// TO ADD A NEW PROJECT:
// 1. Copy an existing project object below
// 2. Update all fields with your project information
// 3. Set a unique id (use the next number in sequence)
// 4. Set a unique slug (lowercase, hyphens only, e.g., "my-new-project")
// 5. Optional: Set featured: true to highlight the project
// 6. Optional: Set comingSoon: true to show "Coming Soon" badge
// 7. Save the file - validation will run automatically and show warnings in console
//
// REQUIRED FIELDS:
// - id: number (unique)
// - slug: string (unique, lowercase, hyphens only)
// - title: string
// - shortDescription: string (1-2 lines)
// - longDescription: string (2-3 paragraphs)
// - features: array of strings (at least 5 items)
// - techStack: array of strings
// - images: array of image paths/URLs
// - links: object with "live" and "github" properties
//
// OPTIONAL FIELDS:
// - featured: boolean (default: false) - highlights the project
// - comingSoon: boolean (default: false) - shows "Coming Soon" badge and disables links

const projects = [
    {
        id: 1,
        slug: "universal-printing-website",
        title: "Universal Printing Press — Website",
        shortDescription: "A modern, responsive website for Universal Printing Press showcasing their printing services, portfolio, and customer testimonials with an intuitive booking system.",
        longDescription: "The Universal Printing Press website is a comprehensive digital platform designed to showcase the company's printing services and streamline customer interactions. Built with a focus on user experience, the website features a clean, modern design that reflects the professionalism of the printing business. The platform includes an intuitive service catalog covering Embroidery, DTF Printing, Large Format Printing, Stationery, and Photography services. The website features an interactive portfolio gallery with image lightbox, animated statistics counter, and a seamless order form system that allows clients to request quotes and upload design files. The responsive design ensures optimal viewing experience across all devices, from desktop computers to mobile phones, making it easy for customers to access services on the go. The site also includes live chat integration, contact form with PHPMailer email functionality, and a centralized color management system for easy branding customization.",
        features: [
            "Responsive design for all devices",
            "Hero image slider with 5 images and Ken Burns effect",
            "Interactive service catalog (Embroidery, DTF, Large Format, Stationery, Photography)",
            "Portfolio gallery with image lightbox and category filters",
            "Online order form with file upload functionality",
            "Animated statistics counter (projects, clients, experience, success rate)",
            "Contact form with PHPMailer email integration",
            "WhatsApp integration for direct customer communication",
            "Centralized color management system",
            "Smooth scrolling and glassmorphic design elements",
            "Newsletter subscription",
            "Social media integration (WhatsApp, Instagram, TikTok, Facebook)"
        ],
        techStack: [
            "HTML5",
            "CSS3",
            "JavaScript (ES6+)",
            "PHP",
            "PHPMailer",
            "Font Awesome",
            "Google Fonts",
            "WhatsApp API"
        ],
        images: [
            "img/Universal Printing Press website.png",
            "img/Universal Printing Press website_2.png",
            "img/Universal Printing Press website_3.png"
        ],
        links: {
            live: "https://www.universalprintingpress.com/",
            github: "https://github.com/SevenCandid/Universal-Printing-Press-Website"
        },
        featured: true,
        comingSoon: false
    },
    {
        id: 2,
        slug: "universal-printing-app",
        title: "Universal Printing Press — Management App",
        shortDescription: "A production-ready web application for Universal Printing Press management system with dashboard analytics, order management, task tracking, staff management, and real-time notifications.",
        longDescription: "The Universal Printing Press Management App is a comprehensive web-based management system built with Next.js 15 and TypeScript. This production-ready application provides a complete solution for managing all aspects of the printing business operations. The system features a modern dashboard with real-time analytics and statistics, allowing managers to monitor business performance at a glance. The order management module enables staff to create, track, and update orders with customer information and payment tracking. The task management system allows for task assignment, priority management, and progress monitoring to ensure efficient workflow. Staff management capabilities include employee management, role assignments, and performance tracking. The application also includes a comprehensive reports module for business analytics and performance metrics. Built with a modern UI featuring dark/light theme toggle, responsive design, and real-time toast notifications, the app provides an intuitive and efficient management experience.",
        features: [
            "Modern dashboard with real-time analytics and statistics",
            "Order management system with customer tracking",
            "Task assignment and progress monitoring",
            "Staff management with role assignments",
            "Reports and analytics module",
            "Dark/light theme toggle",
            "Real-time toast notifications",
            "Responsive design with mobile-first approach",
            "Supabase backend integration",
            "Performance indicators and metrics",
            "Quick action buttons for common tasks",
            "Export functionality for reports"
        ],
        techStack: [
            "Next.js 15",
            "React 19",
            "TypeScript",
            "TailwindCSS",
            "Supabase",
            "Heroicons",
            "react-hot-toast",
            "next-themes"
        ],
        images: [
            "img/Universal Printing Press app.png",
            "img/Universal Printing Press app_2.png",
            "img/Universal Printing Press app_3.png"
        ],
        links: {
            live: "http://universal-printing-press-management.vercel.app/",
            github: "https://github.com/SevenCandid/Universal-Printing-Press-Management-App"
        },
        featured: true,
        comingSoon: false
    },
    {
        id: 3,
        slug: "stone-stronger-artvenue",
        title: "Stone Stronger ArtVenue — Website",
        shortDescription: "A modern e-commerce website for Stone Stronger ArtVenue featuring custom printing services, product catalog, portfolio gallery, order tracking, and quote request system.",
        longDescription: "Stone Stronger ArtVenue is a comprehensive e-commerce website designed for a custom printing business. The platform showcases a wide range of custom printing products including t-shirts, mugs, jerseys, caps, picture frames, name tags, and water bottles. The website features a modern, responsive design with a hero slider, product catalog, portfolio gallery, and customer testimonials. The site includes an order tracking system that allows customers to track their orders using order ID and email, and a quote request form for custom orders. The website also features a dark/light theme toggle, smooth animations, and a fully responsive layout that works seamlessly across all devices. Built with modern web technologies, the site provides an intuitive user experience for customers to browse products, view portfolio work, and place orders.",
        features: [
            "Hero slider with multiple promotional banners",
            "Product catalog (T-Shirts, Mugs, Jerseys, Caps, Frames, Name Tags, Water Bottles)",
            "Portfolio gallery showcasing completed work",
            "Order tracking system with order ID lookup",
            "Quote request form with file upload",
            "Customer testimonials section",
            "Dark/light theme toggle",
            "Responsive design for all devices",
            "Contact form with validation",
            "Newsletter subscription",
            "Smooth scroll animations",
            "Admin login portal"
        ],
        techStack: [
            "HTML5",
            "CSS3",
            "JavaScript (ES6+)",
            "TailwindCSS",
            "Font Awesome",
            "Google Fonts",
            "Intersection Observer API"
        ],
        images: [
            "img/Stone Stronger Artvenue_1.png",
            "img/Stone Stronger Artvenue_2.png",
            "img/Stone Stronger Artvenue_3.png"
        ],
        links: {
            live: "https://stone-stronger-artvenue.vercel.app/",
            github: "https://github.com/SevenCandid/Stone-Stronger-Artvenue"
        },
        featured: true,
        comingSoon: false
    },
    {
        id: 4,
        slug: "smart-home-automation-dashboard",
        title: "Smart Home Automation Dashboard",
        shortDescription: "A modern, responsive web dashboard for controlling IoT devices with a Flask backend, featuring real-time temperature monitoring, light effects, fan speed control, and RESTful API integration.",
        longDescription: "The Smart Home Automation Dashboard is a production-ready web application built with Flask that provides an intuitive interface for managing smart home devices. The dashboard features a beautiful dark theme UI with glowing effects and smooth animations, making device control both functional and visually appealing. Users can control lights with multiple effect modes (vivid, natural, warm, cool, dim, bright), adjust fan speeds with visual feedback, and monitor temperature sensors with real-time automatic updates. The application includes a SQLite database for device state management and provides a comprehensive RESTful API ready for IoT integration. The responsive design ensures optimal experience across mobile, tablet, and desktop devices. The project is configured for easy deployment on Vercel with serverless function support, making it accessible and scalable for real-world smart home implementations.",
        features: [
            "Smart device control (lights, fans, temperature sensors)",
            "Modern dark theme UI with glowing effects and smooth animations",
            "Fully responsive design optimized for all devices",
            "Real-time temperature monitoring with automatic updates",
            "Multiple light effect modes (vivid, natural, warm, cool, dim, bright)",
            "Adjustable fan speed control with visual feedback",
            "RESTful API endpoints for IoT integration",
            "SQLite database for device state management",
            "Background thread for simulated temperature updates",
            "Vercel deployment ready with serverless function support",
            "CORS enabled for cross-origin IoT device communication",
            "Toast notifications for user feedback"
        ],
        techStack: [
            "Flask (Python)",
            "SQLite",
            "HTML5",
            "CSS3",
            "JavaScript (ES6+)",
            "Bootstrap 5",
            "Font Awesome",
            "Bootstrap Icons",
            "RESTful API",
            "Vercel Serverless Functions"
        ],
        images: [
            "img/smart home_1.png"
        ],
        links: {
            live: "https://smart-home-automation-dashboard-inky.vercel.app",
            github: "https://github.com/SevenCandid/Smart-Home-Automation-Dashboard"
        },
        featured: true,
        comingSoon: false
    },
    {
        id: 5,
        slug: "seven-ai-assistant",
        title: "Seven AI Assistant",
        shortDescription: "An intelligent AI-powered assistant application that helps users with tasks, answers questions, provides recommendations, and automates daily workflows using natural language processing.",
        longDescription: "Seven AI Assistant is an advanced artificial intelligence application designed to enhance productivity and simplify daily tasks through natural language interaction. The assistant leverages cutting-edge NLP and machine learning technologies to understand user queries, provide accurate responses, and execute various tasks such as scheduling, information retrieval, and workflow automation. The application features a conversational interface that feels natural and intuitive, supporting multiple languages and learning from user interactions to provide increasingly personalized assistance. With integration capabilities for calendars, email, and other productivity tools, Seven AI Assistant acts as a central hub for managing digital tasks and information. The platform also includes voice recognition for hands-free operation and can be accessed across multiple devices for seamless user experience.",
        features: [
            "Natural language processing and understanding",
            "Multi-language support",
            "Voice recognition and text-to-speech",
            "Task automation and scheduling",
            "Calendar and email integration",
            "Personalized recommendations based on usage",
            "Cross-platform accessibility"
        ],
        techStack: [
            "Python",
            "TensorFlow",
            "OpenAI API",
            "React",
            "Node.js",
            "WebSocket",
            "Speech Recognition API",
            "PostgreSQL"
        ],
        images: [
            "img/projects/seven-ai-assistant-1.png",
            "img/projects/seven-ai-assistant-2.png",
            "img/projects/seven-ai-assistant-3.png"
        ],
        links: {
            live: "#",
            github: "#"
        }
    }
];

// Project validation function
function validateProject(project, index) {
    const requiredFields = ['id', 'slug', 'title', 'shortDescription', 'longDescription', 'features', 'techStack', 'images', 'links'];
    const warnings = [];

    requiredFields.forEach(field => {
        if (!(field in project) || project[field] === null || project[field] === undefined) {
            warnings.push(`Project #${index + 1} (${project.title || 'Unknown'}): Missing required field "${field}"`);
        } else if (field === 'features' && (!Array.isArray(project[field]) || project[field].length === 0)) {
            warnings.push(`Project #${index + 1} (${project.title || 'Unknown'}): "features" must be a non-empty array`);
        } else if (field === 'techStack' && (!Array.isArray(project[field]) || project[field].length === 0)) {
            warnings.push(`Project #${index + 1} (${project.title || 'Unknown'}): "techStack" must be a non-empty array`);
        } else if (field === 'images' && (!Array.isArray(project[field]))) {
            warnings.push(`Project #${index + 1} (${project.title || 'Unknown'}): "images" must be an array`);
        } else if (field === 'links' && (typeof project[field] !== 'object' || !project[field].live || !project[field].github)) {
            warnings.push(`Project #${index + 1} (${project.title || 'Unknown'}): "links" must be an object with "live" and "github" properties`);
        }
    });

    // Check slug format
    if (project.slug && !/^[a-z0-9-]+$/.test(project.slug)) {
        warnings.push(`Project #${index + 1} (${project.title || 'Unknown'}): "slug" should only contain lowercase letters, numbers, and hyphens`);
    }

    // Check for duplicate slugs
    const duplicateSlug = projects.filter(p => p.slug === project.slug).length > 1;
    if (duplicateSlug) {
        warnings.push(`Project #${index + 1} (${project.title || 'Unknown'}): Duplicate slug "${project.slug}"`);
    }

    return warnings;
}

// Validate all projects on load
function validateAllProjects() {
    const allWarnings = [];
    projects.forEach((project, index) => {
        const warnings = validateProject(project, index);
        allWarnings.push(...warnings);
    });

    if (allWarnings.length > 0) {
        console.warn('Project Validation Warnings:');
        allWarnings.forEach(warning => console.warn('  -', warning));
    } else {
        console.log('✓ All projects validated successfully');
    }
}

// Helper function to get project by slug
function getProjectBySlug(slug) {
    return projects.find(project => project.slug === slug);
}

// Helper function to get all projects (sorted by newest first)
function getAllProjects() {
    // Sort by id descending (newest first)
    return [...projects].sort((a, b) => (b.id || 0) - (a.id || 0));
}

// Helper function to get featured projects
function getFeaturedProjects() {
    return getAllProjects().filter(project => project.featured === true);
}

// Make projects array and functions globally available
// This ensures they're accessible when loaded via <script> tag
window.projects = projects;
window.getProjectBySlug = getProjectBySlug;
window.getAllProjects = getAllProjects;
window.getFeaturedProjects = getFeaturedProjects;
window.validateAllProjects = validateAllProjects;

// Validate projects on load
validateAllProjects();

console.log(`projects.js loaded: ${projects.length} projects available`);

// Export for use in other scripts (Node.js/CommonJS)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projects, getProjectBySlug, getAllProjects };
}
