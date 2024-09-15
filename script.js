document.addEventListener('DOMContentLoaded', function () {

    // QUOTE OF THE DAY FUNCTIONALITY (for the Home page)
    function fetchQuote() {
        const quoteContainer = document.getElementById('quote');
        if (quoteContainer) {
            quoteContainer.textContent = `"Innovation distinguishes between a leader and a follower." – Steve Jobs`;
        }
    }

    // TOOLS PAGE FUNCTIONALITY
    const tools = [
        {
            name: "OpenAI GPT-4",
            link: "https://openai.com/gpt-4",
            review: "A powerful language model by OpenAI.",
            thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
            videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            category: "Text and Language Models",
            rating: 4.8
        },
        // Add more tools here
    ];

    function generateToolCards(filteredTools = tools) {
        const toolsContainer = document.getElementById('tools-container');
        if (toolsContainer) {
            toolsContainer.innerHTML = filteredTools.map((tool, index) => `
                <div class="tool-card">
                    <div class="tool-front">
                        <h3>${tool.name}</h3>
                        <img src="${tool.thumbnail}" alt="${tool.name}">
                    </div>
                    <div class="tool-back">
                        <a href="${tool.link}" target="_blank">Visit Tool</a>
                        <p>${tool.review}</p>
                        <button onclick="window.open('${tool.videoLink}', '_blank')">Watch Video</button>
                    </div>
                </div>
            `).join('');
        }
    }

    // Search, Filter, Sort (Tools Page)
    const categoryFilter = document.getElementById('categoryFilter');
    const sortOptions = document.getElementById('sortOptions');

    if (categoryFilter && sortOptions) {
        categoryFilter.addEventListener('change', filterAndSortTools);
        sortOptions.addEventListener('change', filterAndSortTools);

        function filterAndSortTools() {
            const category = categoryFilter.value;
            const sortOption = sortOptions.value;

            let filteredTools = tools;
            if (category !== 'all') {
                filteredTools = filteredTools.filter(tool => tool.category === category);
            }

            if (sortOption === 'rating') {
                filteredTools.sort((a, b) => b.rating - a.rating);
            } else {
                filteredTools.sort((a, b) => tools.indexOf(a) - tools.indexOf(b));
            }

            generateToolCards(filteredTools);
        }
    }

    // USER REGISTRATION FUNCTIONALITY
    const registrationForm = document.querySelector('.registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('User registered successfully!');
        });
    }

    // LOGIN FUNCTIONALITY
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Logged in successfully!');
        });
    }

    // CONTACT FORM FUNCTIONALITY
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Message sent successfully!');
        });
    }

    // INITIALIZE TOOL CARDS
    if (document.getElementById('tools-container')) {
        generateToolCards();
    }

    // FETCH QUOTE OF THE DAY
    fetchQuote();
});