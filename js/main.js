// Custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Cursor effects
document.addEventListener('click', () => {
    cursor.style.transform = 'scale(0.8)';
    setTimeout(() => {
        cursor.style.transform = 'scale(1)';
    }, 100);
});

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
    element.innerHTML = `
        <div class="portfolio-content">
            <div class="portfolio-logo">
                <img src="${item.image}" alt="${item.title} Logo">
            </div>
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="technologies">
                    ${item.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    return element;
};

// Filter portfolio items
const filterPortfolio = (category) => {
    portfolioGrid.innerHTML = '';
    const filteredItems = category === 'all' 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === category);
    
    filteredItems.forEach(item => {
        portfolioGrid.appendChild(createPortfolioItem(item));
    });
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

// Enhanced portfolio interactions
function enhancePortfolioItems() {
    const portfolioElements = document.querySelectorAll('.portfolio-item');
    
    portfolioElements.forEach(item => {
        // Add parallax effect to portfolio items
        item.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            item.style.transform = `
                perspective(1000px)
                rotateY(${x * 10}deg)
                rotateX(${y * -10}deg)
                translateZ(20px)
            `;
        });

        // Reset transform on mouse leave
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(-15px)';
            setTimeout(() => {
                item.style.transform = 'none';
            }, 100);
        });

        // Add hover effect to tech tags
        const techTags = item.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.addEventListener('mouseover', () => {
                tag.style.transform = 'translateY(-5px) scale(1.1)';
            });
            tag.addEventListener('mouseout', () => {
                tag.style.transform = 'none';
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

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('section, .service-card, .pricing-card, .portfolio-item, .testimonial-slide');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
};

// Initialize everything
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', () => {
    animateOnScroll();
    initializePortfolio();
    document.body.classList.add('loaded');
});