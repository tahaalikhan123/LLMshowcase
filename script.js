// Placeholder for API section
// Commented out for future integration
// function fetchDataFromAPI() {
//     // Fetch tool data from the backend API
//     // Use AJAX or Fetch API to retrieve data
// }

// Array to hold all the tool information
const tools = [
    {
        name: "OpenAI GPT-4",
        description: "Known for its capabilities in natural language understanding and generation.",
        category: "Text and Language Models",
        helpfulness: 9,
        honesty: 8,
        harmlessness: 9,
        link: "https://openai.com/gpt-4",
        rating: 4.5,
        videoThumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
        videoLink: "https://www.youtube.com/watch?v=uarNiSl_uh4"
    },
    {
        name: "Google Bard",
        description: "Google's conversational AI that provides information and answers queries.",
        category: "Text and Language Models",
        helpfulness: 8,
        honesty: 9,
        harmlessness: 8,
        link: "https://bard.google.com/",
        rating: 5,
        videoThumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
        videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    // Add more tools as needed
];

// Tool comparison array
let comparisonList = [];

// Function to generate star ratings
function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < Math.floor(rating); i++) {
        stars += `<i class="fas fa-star"></i>`;
    }
    if (rating % 1 !== 0) {
        stars += `<i class="fas fa-star-half-alt"></i>`;
    }
    return stars;
}

// Function to generate tool cards
function generateToolCards() {
    const container = document.getElementById("tools-container");
    container.innerHTML = ''; // Clear existing tools
    tools.forEach((tool, index) => {
        container.innerHTML += `
            <div class="tool-card">
                <div class="ranking">${index + 1}</div>
                <h2>${tool.name}</h2>
                <p>${tool.description}</p>
                <a href="#tool-${index}">Learn More</a>
                <button onclick="addToComparison(${index})">Compare</button>
                <button onclick="toggleFavorite(${index})">Favorite</button>
            </div>
        `;
    });
}

// Function to add tool to comparison list
function addToComparison(index) {
    if (!comparisonList.includes(tools[index])) {
        comparisonList.push(tools[index]);
    }
    openComparisonModal();
}

// Function to toggle favorite
function toggleFavorite(index) {
    const tool = tools[index];
    tool.isFavorite = !tool.isFavorite;
    alert(tool.isFavorite ? `${tool.name} added to favorites!` : `${tool.name} removed from favorites.`);
}

// Function to open comparison modal
function openComparisonModal() {
    const modal = document.getElementById("comparisonModal");
    const comparisonContent = document.getElementById("comparisonContent");
    comparisonContent.innerHTML = comparisonList.map(tool => `
        <div>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
        </div>
    `).join('');
    modal.style.display = "block";
}

// Close modal on clicking the close button
document.querySelector(".close").onclick = function() {
    document.getElementById("comparisonModal").style.display = "none";
};

// Close modal when clicking outside of the modal
window.onclick = function(event) {
    const modal = document.getElementById("comparisonModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Initial render of tool cards
generateToolCards();