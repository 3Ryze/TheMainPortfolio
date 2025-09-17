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
        title: 'Advanced Economy System',
        description: 'Custom economy plugin with player shops and banking',
        image: 'assets/portfolio/economy.jpg',
        technologies: ['Spigot API', 'MySQL', 'Java']
    },
    {
        id: 2,
        category: 'plugins',
        title: 'Custom Boss Battles',
        description: 'Epic boss fights with custom mechanics and rewards',
        image: 'assets/portfolio/bosses.jpg',
        technologies: ['Paper API', 'Java', 'Particle Effects']
    },
    {
        id: 3,
        category: 'mods',
        title: 'Enhanced Combat',
        description: 'New weapons and combat mechanics mod',
        image: 'assets/portfolio/combat.jpg',
        technologies: ['Forge', 'Java', 'Custom Models']
    },
    {
        id: 4,
        category: 'datapacks',
        title: 'RPG Progression',
        description: 'Advanced leveling and skill system',
        image: 'assets/portfolio/rpg.jpg',
        technologies: ['Datapack', 'JSON', 'MCFunction']
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
            <img src="${item.image}" alt="${item.title}">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="technologies">
                    ${item.technologies.map(tech => `<span>${tech}</span>`).join('')}
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

// Portfolio filter event listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterPortfolio(button.getAttribute('data-filter'));
    });
});

// Testimonials data
const testimonials = [
    {
        name: 'MCServer_Pro',
        role: 'Server Owner',
        text: 'Incredible work on our custom plugins! The quality and attention to detail exceeded our expectations.',
        rating: 5
    },
    {
        name: 'BuildMaster',
        role: 'SMP Admin',
        text: 'The custom mechanics added to our server brought a whole new level of excitement to our community.',
        rating: 5
    },
    {
        name: 'CraftNetwork',
        role: 'Network Manager',
        text: 'Professional, responsive, and delivers exactly what we needed. Will definitely work with again!',
        rating: 5
    }
];

// Initialize testimonials carousel
const testimonialCarousel = document.querySelector('.testimonials-carousel');

const createTestimonialSlide = (testimonial) => {
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

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', () => {
    animateOnScroll();
    filterPortfolio('all'); // Initialize portfolio grid
    document.body.classList.add('loaded');
});