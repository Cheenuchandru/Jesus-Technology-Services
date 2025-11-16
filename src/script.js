// Wrap all logic in DOMContentLoaded to ensure elements exist before script runs
document.addEventListener('DOMContentLoaded', () => {

    //======================================================
    // 1. TAILWIND MOBILE MENU TOGGLE & SCROLL EFFECT (CORRECTED)
    //======================================================
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.querySelector('header'); 

    // 1.1 Toggle navigation menu visibility
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            // Toggles the 'hidden' Tailwind class on the dropdown menu
            mobileMenu.classList.toggle('hidden');
        });
        
        // 1.2 Close nav menu when a link is clicked (mobile view)
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Hide the menu after a link is clicked
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 1.3 Header transformation on scroll (uses the HTML <header> element)
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) { 
            header.classList.add("scrolled"); 
        } else {
            header.classList.remove("scrolled");
        }
    });


    //======================================================
    // 2. HERO SLIDER (Logic checked and confirmed)
    // NOTE: This section is only relevant if you include a slider on your about page.
    // I'm keeping it here for completeness based on your provided script.
    //======================================================
    const sliderContainer = document.querySelector(".hero-slider-container");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.getElementById("dots");

    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0 && dotsContainer) {
        // Create dots for the main slider
        slides.forEach((_, idx) => {
            const dot = document.createElement("span");
            dot.addEventListener("click", () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });
        const dots = dotsContainer.querySelectorAll("span");

        function animateText(slide) {
            const h1 = slide.querySelector("h1");
            const p = slide.querySelector("p");
            
            if (!h1 || !p) return;
            
            // Clear previous animation states
            h1.textContent = h1.dataset.text || h1.textContent;
            p.style.opacity = '0';
            p.style.animation = 'none';

            // 1. Animate H1 (Letter by letter)
            const text = h1.dataset.text || h1.textContent;
            h1.textContent = ""; // Clear content for animation
            h1.dataset.text = text;
            text.split("").forEach((char, idx) => {
                const span = document.createElement("span");
                span.textContent = char;
                if (char === ' ') {
                    span.innerHTML = '&nbsp;';
                }
                // Add a class for the CSS animation keyframes
                span.classList.add('slide-char'); 
                span.style.animationDelay = `${idx * 0.05}s`;
                h1.appendChild(span);
            });
            
            // 2. Animate P (Fade In)
            void p.offsetWidth; // Trigger reflow for re-animation
            p.style.animation = 'fadeInText 1s ease 0.5s forwards'; 
        }

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove("active");
                dots[i].classList.remove("active");
            });
            
            slides[index].classList.add("active");
            dots[index].classList.add("active");
            
            animateText(slides[index]);
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        function prevSlideFunc() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        function goToSlide(index) {
            stopSlideShow();
            currentSlide = index;
            showSlide(currentSlide);
            startSlideShow(); // Restart timer after manual navigation
        }

        if (prevBtn) prevBtn.addEventListener("click", prevSlideFunc);
        if (nextBtn) nextBtn.addEventListener("click", nextSlide);

        function startSlideShow() {
            if (!slideInterval) { 
                slideInterval = setInterval(nextSlide, 5000);
            }
        }
        function stopSlideShow() {
            clearInterval(slideInterval);
            slideInterval = null;
        }

        // Initialize Slider
        showSlide(currentSlide);
        startSlideShow();

        // Pause on hover
        if (sliderContainer) {
            sliderContainer.addEventListener("mouseenter", stopSlideShow);
            sliderContainer.addEventListener("mouseleave", startSlideShow);
        }
    }


    //======================================================
    // 3. TESTIMONIAL SLIDER (Logic checked and confirmed)
    // NOTE: Added a check for elements existence
    //======================================================
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    const testimonialDotsContainer = document.getElementById("testimonialDots");

    if (testimonialCards.length > 0 && testimonialDotsContainer) {
        let currentTestimonial = 0;
        let testimonialInterval;

        // Create dots for testimonials
        testimonialCards.forEach((_, idx) => {
            const dot = document.createElement("span");
            dot.addEventListener("click", () => goToTestimonial(idx));
            testimonialDotsContainer.appendChild(dot);
        });
        const tDots = testimonialDotsContainer.querySelectorAll("span");

        function showTestimonial(index) {
            testimonialCards.forEach((card, i) => {
                card.classList.remove("active");
                tDots[i].classList.remove("active");
            });
            
            testimonialCards[index].classList.add("active");
            tDots[index].classList.add("active");
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }

        function goToTestimonial(index) {
            clearInterval(testimonialInterval); // Stop auto-play
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
            startTestimonialShow(); // Restart auto-play
        }

        function startTestimonialShow() {
            testimonialInterval = setInterval(nextTestimonial, 7000); 
        }

        // Initialize Testimonials
        showTestimonial(currentTestimonial);
        startTestimonialShow();
    }


    //======================================================
    // 4. FAQ ACCORDION (Logic checked and confirmed)
    //======================================================
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const item = question.closest(".faq-item");
            
            // Close all other open items
            document.querySelectorAll(".faq-item.active").forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove("active");
                }
            });
            
            // Toggle the clicked item
            item.classList.toggle("active");
        });
    });


    //======================================================
    // 5. SCROLL REVEAL ANIMATION (Logic checked and confirmed)
    //======================================================
    const revealElements = document.querySelectorAll(".fade-up");

    function isElementInView(el) {
        const rect = el.getBoundingClientRect();
        // Trigger point is when 15% of the element is below the top of the viewport (or 85% of viewport height)
        const triggerBottom = window.innerHeight * 0.85; 
        return (rect.top <= triggerBottom);
    }

    function handleScrollReveal() {
        revealElements.forEach(el => {
            if (isElementInView(el)) {
                el.classList.add("reveal");
            }
        });
    }

    // Attach to scroll and load events
    window.addEventListener("scroll", handleScrollReveal);
    handleScrollReveal(); // Run once on load to catch elements already in view


    //======================================================
    // 6. SMOOTH SCROLLING FOR INTERNAL ANCHORS (New for Long Page)
    //======================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Prevent default action only if the link is an internal anchor and not just '#'
            if (this.getAttribute('href').length > 1) { 
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Use smooth scrolling behavior
                    window.scrollTo({
                        top: targetElement.offsetTop - (header ? header.offsetHeight : 0),
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});