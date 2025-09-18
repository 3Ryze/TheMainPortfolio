// Custom cursor with trail effect
const cursor = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');
const cursorInner = document.querySelector('.cursor-inner');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let speed = 0.15;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update inner cursor immediately
    cursorInner.style.left = mouseX + 'px';
    cursorInner.style.top = mouseY + 'px';
    
    // Create trail effect
    const trail = document.createElement('div');
    trail.className = 'cursor-trail-particle';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    cursorTrail.appendChild(trail);
    
    setTimeout(() => {
        cursorTrail.removeChild(trail);
    }, 1000);
});

// Smooth cursor animation
function animateCursor() {
    let distX = mouseX - cursorX;
    let distY = mouseY - cursorY;
    
    cursorX += distX * speed;
    cursorY += distY * speed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Portfolio data
const portfolioItems = [
    {
        id: 1,
        category: 'plugins',
        title: 'Fracture SMP',
        description: 'A Content Creator SMP featuring the Fracture Core with insane abilities, stunning UI, impressive particle effects, and engaging gameplay mechanics.',
        image: 'assets/portfolio/fracture-logo.png',
        technologies: ['Spigot API', 'Custom UI', 'Particle Systems', 'Core Abilities']
    },
    {
        id: 2,
        category: 'plugins',
        title: 'Alcohol SMP',
        description: 'A Sarcastic Content Creator SMP with advanced combat abilities and unique features for an entertaining gameplay experience.',
        image: 'assets/portfolio/alcohol-logo.png',
        technologies: ['Combat System', 'Custom Abilities', 'Paper API', 'Java']
    }
];

// Initialize portfolio grid
const portfolioGrid = document.querySelector('.portfolio-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Create portfolio item element
const createPortfolioItem = (item) => {
    const element = document.createElement('div');
    element.className = 'portfolio-item animate';
    element.setAttribute('data-tilt', '');
    element.setAttribute('data-tilt-max', '10');
    element.setAttribute('data-tilt-speed', '400');
    element.setAttribute('data-tilt-glare', 'true');
    element.setAttribute('data-tilt-max-glare', '0.5');
    element.innerHTML = `
        <div class="portfolio-content">
            <div class="portfolio-logo">
                <img src="${item.image}" alt="${item.title} Logo" class="parallax" data-speed="0.1">
            </div>
            <div class="portfolio-overlay">
                <h3 class="gradient-text">${item.title}</h3>
                <p class="glass-text">${item.description}</p>
                <div class="technologies">
                    ${item.technologies.map(tech => 
                        `<span class="tech-tag glass-morphism" 
                               data-text="${tech}">${tech}</span>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
    return element;
};

// Filter portfolio items with advanced transitions
const filterPortfolio = (category) => {
    const items = document.querySelectorAll('.portfolio-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active filter button with magnetic effect
    filterButtons.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
            // Add magnetic pull effect
            const addMagneticEffect = (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.1)`;
            };
            btn.addEventListener('mousemove', addMagneticEffect);
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'none';
            });
        } else {
            btn.classList.remove('active');
        }
    });

    // Animate items out
    items.forEach(item => {
        const itemCategory = item.dataset.category;
        if (category === 'all' || itemCategory === category) {
            // Fade in and slide up
            item.style.animation = 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        } else {
            // Fade out and slide down
            item.style.animation = 'fadeOutDown 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);
        }
    });

    // Re-initialize portfolio enhancements after filter
    setTimeout(() => {
        enhancePortfolioItems();
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            maxTilt: 10,
            perspective: 1000,
            scale: 1.05,
            speed: 400,
            glare: true,
            "max-glare": 0.5,
            gyroscope: true
        });
    }, 600);
};

// Initialize portfolio with smooth loading animation
function initializePortfolio() {
    const grid = document.querySelector('.portfolio-grid');
    grid.style.opacity = '0';
    
    // Create and append portfolio items
    portfolioItems.forEach(item => {
        const element = createPortfolioItem(item);
        grid.appendChild(element);
    });
    
    // Fade in the grid
    setTimeout(() => {
        grid.style.opacity = '1';
        grid.style.transition = 'opacity 0.8s ease-in-out';
        
        // Add interactive effects after items are loaded
        enhancePortfolioItems();
    }, 100);
}

// Enhanced portfolio interactions with advanced effects
function enhancePortfolioItems() {
    const portfolioElements = document.querySelectorAll('.portfolio-item');
    
    portfolioElements.forEach(item => {
        // Advanced hover effect with magnetic pull
        item.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            // Magnetic pull effect
            const distance = Math.sqrt(x * x + y * y);
            const magnetStrength = Math.min(distance * 2, 1);
            
            const content = item.querySelector('.portfolio-content');
            content.style.transform = `
                perspective(1000px)
                rotateY(${x * 10}deg)
                rotateX(${y * -10}deg)
                translateZ(30px)
                scale3d(${1 + magnetStrength * 0.05}, ${1 + magnetStrength * 0.05}, 1)
            `;
            
            // Parallax for inner elements
            const image = item.querySelector('.portfolio-logo img');
            if (image) {
                image.style.transform = `
                    translate(${x * 20}px, ${y * 20}px)
                    scale(${1 + magnetStrength * 0.1})
                `;
            }
        });

        // Smooth reset animation
        item.addEventListener('mouseleave', () => {
            const content = item.querySelector('.portfolio-content');
            const image = item.querySelector('.portfolio-logo img');
            
            content.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            content.style.transform = 'none';
            
            if (image) {
                image.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                image.style.transform = 'none';
            }
            
            setTimeout(() => {
                content.style.transition = '';
                if (image) image.style.transition = '';
            }, 500);
        });

        // Enhanced tech tag interactions
        const techTags = item.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.addEventListener('mouseover', () => {
                // Create glowing effect
                tag.style.transform = 'translateY(-5px) scale(1.1)';
                tag.style.boxShadow = '0 0 15px var(--accent-color)';
                tag.style.filter = 'brightness(1.2)';
                
                // Add floating particles
                const particles = 5;
                for (let i = 0; i < particles; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'tech-particle';
                    const angle = (i / particles) * Math.PI * 2;
                    const distance = 30;
                    particle.style.left = `${Math.cos(angle) * distance}px`;
                    particle.style.top = `${Math.sin(angle) * distance}px`;
                    tag.appendChild(particle);
                    
                    setTimeout(() => tag.removeChild(particle), 1000);
                }
            });
            
            tag.addEventListener('mouseout', () => {
                tag.style.transform = 'none';
                tag.style.boxShadow = 'none';
                tag.style.filter = 'none';
            });
        });
    });
}const createTestimonialSlide = (testimonial) => {
    const slide = document.createElement('div');
    slide.className = 'testimonial-slide animate';
    slide.innerHTML = `
        <div class="testimonial-content">
            <div class="stars">
                ${'★'.repeat(testimonial.rating)}
            </div>
            <p>"${testimonial.text}"</p>
            <div class="testimonial-author">
                <h4>${testimonial.name}</h4>
                <span>${testimonial.role}</span>
            </div>
        </div>
    `;
    return slide;
};

// Add testimonials to carousel
testimonials.forEach(testimonial => {
    testimonialCarousel.appendChild(createTestimonialSlide(testimonial));
});

// Enhanced scroll-based animations with parallax
const animateOnScroll = () => {
    // Elements to animate
    const elements = document.querySelectorAll('section, .service-card, .pricing-card, .portfolio-item, .testimonial-slide');
    const parallaxElements = document.querySelectorAll('.parallax');
    
    // Smooth scroll animation with IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Add custom animation based on element type
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.animation = 'floatUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                } else if (entry.target.classList.contains('portfolio-item')) {
                    entry.target.style.animation = 'scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });
    
    elements.forEach(element => observer.observe(element));
    
    // Parallax effect on scroll
    let scrolled = window.pageYOffset;
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        const xPos = element.dataset.direction === 'horizontal' ? (scrolled * speed) : 0;
        element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    });
    
    // Animate gradient background
    document.documentElement.style.setProperty('--scroll', window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight));
};

// Particle system background
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});

// Initialize everything with enhanced loading animation
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', () => {
    // Add loading animation
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('loader-hidden');
        loader.addEventListener('transitionend', () => {
            document.body.removeChild(loader);
        });
    }

    // Initialize portfolio with fade-in sequence
    setTimeout(() => {
        animateOnScroll();
        initializePortfolio();
        document.body.classList.add('loaded');
        
        // Initialize vanilla-tilt
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            maxTilt: 10,
            perspective: 1000,
            scale: 1.05,
            speed: 400,
            glare: true,
            "max-glare": 0.5,
            gyroscope: true
        });
    }, 500);
});