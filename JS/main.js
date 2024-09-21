// Placeholder for future JavaScript functionality
console.log("LLMshowcase script loaded.");

// Smooth Scrolling on navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic Navbar Toggle for small screens
const nav = document.querySelector('nav ul');
const toggleNav = () => nav.classList.toggle('show');

// Update LLM ratings dynamically
function updateRating(llmId, newRating) {
    const ratingElement = document.querySelector(`#${llmId} .rating`);
    ratingElement.textContent = `Rating: ${"★".repeat(newRating)}${"☆".repeat(5 - newRating)}`;
}

// Future dynamic features like sorting, filtering, and LLM ranking can be added here.