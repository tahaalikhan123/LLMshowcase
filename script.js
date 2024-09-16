document.addEventListener('DOMContentLoaded', function () {

    // Sidebar Toggle for Mobile and Desktop
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevents click event from bubbling up
            sidebar.classList.toggle('active');
        });

        document.body.addEventListener('click', function (e) {
            if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }

    // PAGE TRANSITION
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', function (e) {
            const target = this.getAttribute('href');
            if (target !== '#' && target !== '') {
                e.preventDefault();
                document.body.style.opacity = 0;
                setTimeout(() => {
                    window.location.href = target;
                }, 500);
            }
        });
    });

    // QUOTE OF THE DAY FUNCTIONALITY
    function fetchQuote() {
        const quoteContainer = document.getElementById('quote');
        if (quoteContainer) {
            quoteContainer.textContent = `"Innovation distinguishes between a leader and a follower." – Steve Jobs`;
        }
    }

    // Intersection Observer for animated quote
    const quote = document.querySelector('.quote-container p');
    if (quote) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    quote.classList.add('animate');
                }
            });
        }, { threshold: 0.1 }); // Adjust threshold if needed
        observer.observe(quote);
    }

    // TESTIMONIAL SLIDER
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${(i - index) * 100}%)`;
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function () {
            currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener('click', function () {
            currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
            showSlide(currentSlide);
        });
    }

    if (slides.length > 0) {
        showSlide(currentSlide);
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
        // Add more tools here...
    ];

    function generateToolCards(filteredTools = tools) {
        const toolsContainer = document.getElementById('tools-container');
        if (toolsContainer) {
            toolsContainer.innerHTML = filteredTools.map((tool) => `
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

    // Initialize Tool Cards
    if (document.getElementById('tools-container')) {
        generateToolCards();
    }

    // Fetch Quote of the Day
    fetchQuote();
});