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
});