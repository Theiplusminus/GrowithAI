document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling for Nav Links ---
    const navLinks = document.querySelectorAll('#navbar a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.getElementById('main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 10; // Adjust offset slightly

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                 // Close mobile menu if open
                 const navbar = document.getElementById('navbar');
                 if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                 }
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            // Toggle icon class
            const icon = menuToggle.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Change to 'X' icon
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // Change back to 'bars' icon
            }
        });
    }


    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: Unobserve after animation to save resources
                    // observer.unobserve(entry.target);
                } else {
                    // Optional: Remove class if you want animation to replay when scrolling up
                     // entry.target.classList.remove('is-visible');
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach((element, index) => {
             // Apply staggered delay for industry tags specifically if needed
            if (element.classList.contains('industry-tag')) {
                element.style.setProperty('--animation-order', index + 1);
            }
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        // Make elements visible immediately
        animatedElements.forEach(element => {
            element.classList.add('is-visible');
        });
    }


    // --- Update Footer Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Basic Form Submission Handling (Example) ---
    // You'll need a backend or service like Formspree/Netlify Forms to actually handle the data
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // You would typically gather form data here
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            // ... get other fields

            console.log('Form Submitted (data not sent anywhere yet):');
            console.log('Name:', name);
            console.log('Email:', email);
            // Add logic here to send data to a backend or email service

            // Provide user feedback (simple example)
            alert(`Thank you, ${name}! Your request has been received (this is a demo).`);
            contactForm.reset(); // Clear the form
        });
    }


}); // End DOMContentLoaded