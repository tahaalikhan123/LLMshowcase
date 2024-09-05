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
        videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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
    // Add more tools as needed following the same structure
];

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
    tools.forEach((tool, index) => {
        container.innerHTML += `
            <div class="tool-card">
                <div class="ranking">${index + 1}</div>
                <h2>${tool.name}</h2>
                <p>${tool.description}</p>
                <a href="#tool-${index}">Learn More</a>
            </div>
        `;
    });
}

// Function to generate tool details
function generateToolDetails() {
    const detailsContainer = document.getElementById("tool-details-container");
    tools.forEach((tool, index) => {
        detailsContainer.innerHTML += `
            <section id="tool-${index}" class="tool-details">
                <h2>${tool.name}</h2>
                <table>
                    <tr>
                        <th>Helpfulness</th>
                        <th>Honesty</th>
                        <th>Harmlessness</th>
                        <th>Link</th>
                        <th>Rating</th>
                    </tr>
                    <tr>
                        <td>${tool.helpfulness}/10</td>
                        <td>${tool.honesty}/10</td>
                        <td>${tool.harmlessness}/10</td>
                        <td><a href="${tool.link}" target="_blank">Visit</a></td>
                        <td class="stars">${generateStars(tool.rating)}</td>
                    </tr>
                </table>
                <div class="video-container">
                    <img src="${tool.videoThumbnail}" alt="${tool.name} Video Thumbnail" onclick="window.open('${tool.videoLink}', '_blank')">
                </div>
            </section>
        `;
    });
}

// Initialize the page content
generateToolCards();
generateToolDetails();

// Function to scroll to the top when the home button is clicked
document.getElementById("homeButton").addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Optionally hide the home button when near the top of the page
window.addEventListener("scroll", function() {
    const homeButton = document.getElementById("homeButton");
    if (window.scrollY > 300) {
        homeButton.classList.remove("hidden");
    } else {
        homeButton.classList.add("hidden");
    }
});