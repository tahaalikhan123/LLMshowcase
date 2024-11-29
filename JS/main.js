document.addEventListener('DOMContentLoaded', function() {
    console.log("LLMshowcase script loaded.");

    // Smooth Scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dynamic Navbar Toggle for small screens
    const navToggle = document.querySelector('.navbar-toggle');
    const nav = document.querySelector('nav ul');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }

    // Function to update LLM ratings dynamically
    function updateRating(llmId, newRating) {
        const ratingElement = document.querySelector(`#${llmId} .rating`);
        if (ratingElement) {
            ratingElement.textContent = `Rating: ${"★".repeat(newRating)}${"☆".repeat(5 - newRating)}`;
        }
    }

    // Example usage of updateRating function
    // updateRating('llm1', 4);

    // Function to handle form submission
    const contactForm = document.querySelector('.contact-us form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
            // Reset form after submission
            this.reset();
        });
    }

    // Future dynamic features like sorting, filtering, and LLM ranking can be added here.

    // LLM Comparison Tool
    const compareBtn = document.getElementById('compare-btn');
    const comparisonResult = document.getElementById('comparison-result');

    if (compareBtn) {
        compareBtn.addEventListener('click', function() {
            const llm1 = document.getElementById('llm-select-1').value;
            const llm2 = document.getElementById('llm-select-2').value;

            if (llm1 && llm2) {
                // In a real application, you would fetch actual comparison data
                comparisonResult.innerHTML = `Comparing ${llm1.toUpperCase()} vs ${llm2.toUpperCase()}: Both are excellent language models with unique strengths. ${llm1.toUpperCase()} excels in X, while ${llm2.toUpperCase()} is better at Y.`;
            } else {
                comparisonResult.innerHTML = 'Please select two LLMs to compare.';
            }
        });
    }

    // FAQ Section
    const faqItems = document.querySelectorAll('.faq details');
    faqItems.forEach(item => {
        item.addEventListener('toggle', function() {
            if (this.open) {
                faqItems.forEach(otherItem => {
                    if (otherItem !== this) {
                        otherItem.open = false;
                    }
                });
            }
        });
    });

    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });

        // Close menu when clicking a link
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // Initialize Dark Mode
    function initializeDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        const body = document.body;
        
        if (!darkModeToggle) return;

        // Check for saved dark mode preference
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            body.classList.add('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }

        // Toggle dark mode
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon');
                icon.classList.toggle('fa-sun');
            }
            localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
        });
    }

    // Initialize dark mode functionality
    initializeDarkMode();

    // Filter functionality for LLM cards
    const filterButtons = document.querySelectorAll('.filter-btn');
    const llmItems = document.querySelectorAll('.llm-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter items
            llmItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    const searchInput = document.getElementById('llm-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            llmItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('.llm-description')?.textContent.toLowerCase() || '';
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Interactive Rating System
    function createInteractiveRating(llmItem) {
        const ratingContainer = document.createElement('div');
        ratingContainer.classList.add('interactive-rating');
        
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.innerHTML = '☆';
            star.classList.add('rating-star');
            star.dataset.rating = i;
            
            star.addEventListener('mouseover', (e) => {
                const rating = e.target.dataset.rating;
                highlightStars(ratingContainer, rating);
            });
            
            star.addEventListener('click', (e) => {
                const rating = e.target.dataset.rating;
                saveRating(llmItem.querySelector('h3').textContent, rating);
                updateRating(llmItem.id, rating);
            });
            
            ratingContainer.appendChild(star);
        }
        
        llmItem.appendChild(ratingContainer);
    }

    function highlightStars(container, rating) {
        const stars = container.querySelectorAll('.rating-star');
        stars.forEach((star, index) => {
            star.innerHTML = index < rating ? '★' : '☆';
        });
    }

    function saveRating(llmName, rating) {
        const ratings = JSON.parse(localStorage.getItem('llmRatings') || '{}');
        ratings[llmName] = rating;
        localStorage.setItem('llmRatings', JSON.stringify(ratings));
    }

    // Add interactive ratings to existing LLM items
    document.querySelectorAll('.llm-item').forEach(createInteractiveRating);

    // Compare History Feature
    let compareHistory = JSON.parse(localStorage.getItem('compareHistory') || '[]');
    
    function saveComparison(llm1, llm2) {
        const comparison = {
            date: new Date().toISOString(),
            llm1: llm1,
            llm2: llm2
        };
        
        compareHistory.unshift(comparison);
        if (compareHistory.length > 5) compareHistory.pop(); // Keep last 5 comparisons
        localStorage.setItem('compareHistory', JSON.stringify(compareHistory));
        updateCompareHistory();
    }

    function updateCompareHistory() {
        const historyContainer = document.getElementById('compare-history');
        if (!historyContainer) return;

        historyContainer.innerHTML = '<h3>Recent Comparisons</h3>';
        compareHistory.forEach(comp => {
            const item = document.createElement('div');
            item.classList.add('history-item');
            item.innerHTML = `${comp.llm1} vs ${comp.llm2} - ${new Date(comp.date).toLocaleDateString()}`;
            historyContainer.appendChild(item);
        });
    }

    // Add compare history container
    const historyContainer = document.createElement('div');
    historyContainer.id = 'compare-history';
    document.querySelector('.llm-comparison').appendChild(historyContainer);

    // Update compare button click handler
    if (compareBtn) {
        const oldHandler = compareBtn.onclick;
        compareBtn.onclick = function() {
            const llm1 = document.getElementById('llm-select-1').value;
            const llm2 = document.getElementById('llm-select-2').value;
            
            if (llm1 && llm2) {
                saveComparison(llm1, llm2);
            }
            oldHandler?.call(this);
        };
    }

    // Loading Animation
    function showLoading(element) {
        const loader = document.createElement('div');
        loader.classList.add('loader');
        element.appendChild(loader);
        return loader;
    }

    function hideLoading(loader) {
        loader.remove();
    }
});