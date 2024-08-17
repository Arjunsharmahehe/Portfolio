document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    function reveal() {
        const pages = document.querySelectorAll(".page");
        const windowHeight = window.innerHeight;

        pages.forEach(page => {
            const elementTop = page.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                animatePageContent(page);
            } else {
                resetPageContent(page);
            }
        });

        animateTimeline();
    }

    function animatePageContent(page) {
        let delay = 0;
        const contentWrapper = page.querySelector('.content-wrapper');

        contentWrapper.querySelectorAll('h1, h2, h3, p').forEach((element) => {
            setTimeout(() => {
                element.classList.add("active");
            }, delay);
            delay += 200;
        });

        if (page.id === 'about') {
            const skills = contentWrapper.querySelectorAll('.skill');
            skills.forEach((skill, index) => {
                setTimeout(() => {
                    skill.classList.add("active");
                }, delay + index * 100);
            });
        }
    }

    function resetPageContent(page) {
        const contentWrapper = page.querySelector('.content-wrapper');
        contentWrapper.querySelectorAll('h1, h2, h3, p, .skill').forEach(element => {
            element.classList.remove("active");
        });
    }

    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const windowHeight = window.innerHeight;

        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemBottom = item.getBoundingClientRect().bottom;

            if (itemTop < windowHeight * 0.8 && itemBottom > windowHeight * 0.2) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", reveal);
    reveal(); // Call once to set initial state
});