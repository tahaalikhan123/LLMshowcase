// Wait for the DOM to be fully loaded before executing scripts
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

    // Dark Mode Toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.classList.add('dark-mode-toggle');
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }

    // Search and Filter Functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'llm-search';
    searchInput.placeholder = 'Search LLMs...';
    document.querySelector('.featured-llms').insertBefore(searchInput, document.querySelector('.llm-grid'));

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const llmItems = document.querySelectorAll('.llm-item');
        
        llmItems.forEach(item => {
            const llmName = item.querySelector('h3').textContent.toLowerCase();
            item.style.display = llmName.includes(searchTerm) ? 'block' : 'none';
        });
    });

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