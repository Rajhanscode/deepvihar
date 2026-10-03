// Mobile menu toggle logic
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (window.innerWidth <= 768) {
        navLinks.classList.toggle('active');
    }
}

// Scroll Reveal Animation Logic
document.addEventListener("DOMContentLoaded", function () {
    const reveals = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});

// Dark/Light Mode Theme Toggle with Local Storage
document.addEventListener("DOMContentLoaded", function () {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggleBtn) {
        // Check local storage for saved theme
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }

        // Toggle theme on button click
        themeToggleBtn.addEventListener('click', function () {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
});

// Chat Widget Embed (Maintained for old doubt feature)
fetch('chat.html')
    .then(response => response.text())
    .then(data => {
        const container = document.getElementById('chat-widget-container');
        if (container) {
            container.innerHTML = data;

            // Re-evaluate scripts found inside the fetched HTML
            const scripts = container.getElementsByTagName("script");
            for (let i = 0; i < scripts.length; i++) {
                const newScript = document.createElement("script");
                newScript.text = scripts[i].text;
                document.body.appendChild(newScript);
            }
        }
    })
    .catch(error => console.error('Error loading chat widget:', error));

// ==========================================
// App Install Banner Logic (Updated Rule)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const appBanner = document.getElementById('app-install-banner');
    const closeBannerBtn = document.getElementById('close-app-banner');

    if (closeBannerBtn && appBanner) {
        closeBannerBtn.addEventListener('click', function () {
            // कट करने पर बैनर छिपा दें। (चूँकि LocalStorage हटा दिया गया है, 
            // इसलिए रिफ्रेश करने या वापस मेन पेज पर आने पर यह फिर से दिखेगा)
            appBanner.style.display = 'none';
        });
    }
});