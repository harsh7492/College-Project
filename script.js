document.addEventListener('DOMContentLoaded', function () {
    // Lightbox functionality for gallery
    const imagesContainer = document.querySelector('.image-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    const prevArrow = document.querySelector('.lightbox-nav .nav-arrow.prev');
    const nextArrow = document.querySelector('.lightbox-nav .nav-arrow.next');

    let currentImageIndex = 0;
    const images = Array.from(document.querySelectorAll('.image-grid img'));

    if (imagesContainer && lightbox && lightboxImg && closeBtn) {
        // Open lightbox
        function openLightbox(index) {
            currentImageIndex = index;
            lightbox.classList.add('lightbox-active');
            updateLightboxImage();
            lightbox.focus(); // Accessibility: Focus on the lightbox
        }

        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('lightbox-active');
            lightboxImg.src = ''; // Clear the image source
            lightboxImg.alt = ''; // Clear the alt text
        }

        // Update lightbox image
        function updateLightboxImage() {
            const currentImage = images[currentImageIndex];
            lightboxImg.src = currentImage.src;
            lightboxImg.alt = currentImage.alt;
        }

        // Navigate between images
        function navigate(direction) {
            currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
            updateLightboxImage();
        }

        // Event delegation for opening lightbox
        imagesContainer.addEventListener('click', function (event) {
            const clickedImage = event.target.closest('img');
            if (clickedImage) {
                const index = images.indexOf(clickedImage);
                if (index !== -1) {
                    openLightbox(index);
                }
            }
        });

        // Close lightbox when the close button is clicked
        closeBtn.addEventListener('click', closeLightbox);

        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation for lightbox
        document.addEventListener('keydown', function (event) {
            if (lightbox.classList.contains('lightbox-active')) {
                if (event.key === 'Escape') {
                    closeLightbox();
                } else if (event.key === 'ArrowLeft') {
                    navigate(-1);
                } else if (event.key === 'ArrowRight') {
                    navigate(1);
                }
            }
        });

        // Navigate to the previous image
        if (prevArrow) {
            prevArrow.addEventListener('click', function (event) {
                event.stopPropagation(); // Prevent lightbox from closing
                navigate(-1);
            });
        }

        // Navigate to the next image
        if (nextArrow) {
            nextArrow.addEventListener('click', function (event) {
                event.stopPropagation(); // Prevent lightbox from closing
                navigate(1);
            });
        }
    }

    // Contact form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic form validation
            if (!name || !email || !message) {
                alert('Please fill out all fields.');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Here you would typically send the form data to a server
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            // Reset the form
            contactForm.reset();
            alert('Thank you for your message! We will contact you soon.');
        });
    }

    // FAQ toggling
    const questions = document.querySelectorAll('.question');
    if (questions) {
        questions.forEach(question => {
            const header = question.querySelector('.question-header');
            const answer = question.querySelector('.answer');

            if (header && answer) {
                header.addEventListener('click', function () {
                    question.classList.toggle('active');

                    // Smoothly expand/collapse the answer
                    if (question.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        answer.style.maxHeight = '0';
                    }
                });
            }
        });
    }

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});