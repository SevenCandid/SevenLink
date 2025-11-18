let lastScrollY = 0;

// Navigation scroll behavior - show initially, hide when scrolling down
window.addEventListener('scroll', function() {
    const nav = document.getElementById('topNav');
    const currentScrollY = window.scrollY;
    
    // Hide navbar when scrolling down past 100px, show when scrolling up
    if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
    } else {
        nav.classList.remove('hidden');
    }
    
    lastScrollY = currentScrollY;
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animated Logo Typing Effect - FIXED VERSION
const logoTextDesktop = "SEVEN LINK | TECH & DOCUMENT SERVICES";
const logoTextMobile = "SEVEN LINK | TECH SERVICES";
const logoElement = document.getElementById("animatedLogo");

// Animation control variables
let isTyping = false;
let currentTimeouts = [];

function getLogoText() {
    return window.innerWidth < 400 ? logoTextMobile : logoTextDesktop;
}

function clearAllTimeouts() {
    currentTimeouts.forEach(timeout => clearTimeout(timeout));
    currentTimeouts = [];
    isTyping = false;
}

function typeLogo(text, element, speed = 150, pause = 1500) {
    // Stop any existing animation
    clearAllTimeouts();
    element.textContent = "";
    
    if (isTyping) return; // Prevent multiple instances
    isTyping = true;
    
    let i = 0;
    
    function type() {
        if (!isTyping) return; // Check if animation was stopped
        
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            const timeout = setTimeout(type, speed);
            currentTimeouts.push(timeout);
        } else {
            const pauseTimeout = setTimeout(() => {
                if (!isTyping) return; // Check if animation was stopped
                element.textContent = "";
                i = 0;
                type();
            }, pause);
            currentTimeouts.push(pauseTimeout);
        }
    }
    
    type();
}

// Responsive logo typing
if (logoElement) {
    typeLogo(getLogoText(), logoElement);
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            typeLogo(getLogoText(), logoElement);
        }, 200);
    });
}

// Live countdown timer
function updateCountdown() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    
    const timeLeft = midnight - now;
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

setInterval(updateCountdown, 1000);

// Enhanced calculator
function calculatePrice() {
    const serviceType = document.getElementById('serviceType').value;
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    const urgency = document.getElementById('urgency').value;
    
    if (!serviceType || !quantity) {
        document.getElementById('calculator-result').innerHTML = 'Select service and enter quantity';
        const orderBtn = document.getElementById('order-btn');
        if (orderBtn) orderBtn.style.display = 'none';
        return;
    }
    
    let basePrice = 0;
    let unit = '';
    
    switch(serviceType) {
        case 'word': 
            basePrice = quantity * 2; 
            unit = 'pages'; 
            break;
        case 'excel': 
            basePrice = quantity * 5; 
            unit = 'pages'; 
            break;
        case 'powerpoint': 
            basePrice = quantity * 4; 
            unit = 'slides'; 
            break;
        case 'python': 
            basePrice = Math.max(50, quantity * 50); 
            unit = 'hours'; 
            break;
        case 'web': 
            basePrice = Math.max(50, quantity * 100); 
            unit = 'hours'; 
            break;
    }
    
    let multiplier = 1;
    let deliveryTime = '24-48 hours';
    
    switch(urgency) {
        case 'rush': 
            multiplier = 1.2; 
            deliveryTime = '6-12 hours'; 
            break;
        case 'emergency': 
            multiplier = 1.5; 
            deliveryTime = '3-6 hours'; 
            break;
    }
    
    const totalPrice = basePrice * multiplier;
    
    document.getElementById('calculator-result').innerHTML = 
        `<strong>₵${totalPrice.toFixed(2)}</strong><br>
         <small>Base: ₵${basePrice.toFixed(2)} ${multiplier > 1 ? `+ ${((multiplier-1)*100).toFixed(0)}% rush fee` : ''}</small>`;
    
    const deliveryElement = document.getElementById('delivery-time');
    if (deliveryElement) {
        deliveryElement.innerHTML = 
            `<small><i class="fas fa-clock"></i> Estimated delivery: ${deliveryTime}</small>`;
    }
    
    const orderBtn = document.getElementById('order-btn');
    if (orderBtn) orderBtn.style.display = 'block';
}

// Form progress tracking
function updateProgress() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let completed = 0;
    
    inputs.forEach(input => {
        if (input.value.trim()) completed++;
    });
    
    const progress = (completed / inputs.length) * 100;
    const progressElement = document.getElementById('formProgress');
    if (progressElement) {
        progressElement.style.width = progress + '%';
    }
    
    const progressText = document.querySelector('.progress-text');
    if (progressText) {
        if (progress === 100) {
            progressText.textContent = 'Form completed! Ready to submit.';
            progressText.style.color = 'var(--tech)';
        } else {
            progressText.textContent = `Form ${Math.round(progress)}% complete`;
            progressText.style.color = 'var(--dark)';
        }
    }
}

// Add to calculator functionality
function addToCalculator(serviceType) {
    const serviceSelect = document.getElementById('serviceType');
    if (serviceSelect) {
        serviceSelect.value = serviceType;
        document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
        calculatePrice();
    }
}

// Proceed to order
function proceedToOrder() {
    const serviceType = document.getElementById('serviceType').value;
    const quantity = document.getElementById('quantity').value;
    const urgency = document.getElementById('urgency').value;
    
    const unitText = serviceType === 'powerpoint' ? 'slides' : 
                    (serviceType === 'python' || serviceType === 'web') ? 'hours' : 'pages';
    
    const message = `I want to order: ${serviceType} - ${quantity} ${unitText} - ${urgency} delivery`;
    window.open(`https://wa.me/233549437374?text=${encodeURIComponent(message)}`, '_blank');
}

// Contact Form Handler

    
    
   

// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        question.classList.toggle('active');
        answer.classList.toggle('show');
        
        // Close other open FAQs
        document.querySelectorAll('.faq-question').forEach(q => {
            if (q !== question && q.classList.contains('active')) {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('show');
            }
        });
    });
});

// Smooth scroll for mobile address bar issue
window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// Service availability status simulation (for demo purposes)
function updateServiceAvailability() {
    const statusDots = document.querySelectorAll('.status-dot');
    const statusTexts = document.querySelectorAll('.status-text');
    
    // Simulate dynamic availability status
    const statuses = [
        { class: 'available', text: 'Available Now' },
        { class: 'busy', text: 'High Demand' },
        { class: 'urgent', text: 'Rush Orders' }
    ];
    
    statusDots.forEach((dot, index) => {
        // Keep most services available, occasionally show busy/urgent
        const randomStatus = Math.random() > 0.8 ? 
            statuses[Math.floor(Math.random() * statuses.length)] : 
            statuses[0];
        
        dot.className = `status-dot ${randomStatus.class}`;
        if (statusTexts[index]) {
            statusTexts[index].textContent = randomStatus.text;
        }
    });
}

// Update service availability every 30 seconds (for demo)
setInterval(updateServiceAvailability, 30000);

// Enhanced service card interactions
document.querySelectorAll('.enhanced-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add hover effects or animations if needed
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Counter animation for social proof numbers
function animateCounters() {
    const counters = document.querySelectorAll('.proof-number[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
                
                // Add suffix based on target value
                if (target === 500) {
                    counter.textContent = current + '+';
                } else if (target === 24) {
                    counter.textContent = current + 'hr';
                } else if (target === 98) {
                    counter.textContent = current + '%';
                } else {
                    counter.textContent = current;
                }
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    updateServiceAvailability();
    animateCounters(); // Start counter animation
    
    // Initialize form progress if form exists
    if (document.getElementById('contactForm')) {
        updateProgress();
    }
});

// Newsletter Form Handler
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('newsletter-name').value;
            const email = document.getElementById('newsletter-email').value;
            const institution = document.getElementById('newsletter-institution').value;
            
            // Create WhatsApp message for newsletter subscription
            const message = `*Newsletter Subscription*\n\n` +
                           `*Name:* ${name}\n` +
                           `*Email:* ${email}\n` +
                           `*Institution:* ${institution}\n\n` +
                           `Please add me to the Seven newsletter for exclusive discounts and updates!`;
            
            const whatsappURL = `https://wa.me/233549437374?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
            
            // Show success message and reset form
            alert('Thank you for subscribing! We\'ll add you to our newsletter list.');
            newsletterForm.reset();
        });
    }