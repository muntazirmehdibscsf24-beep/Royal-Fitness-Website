/**
 * ROYAL FITNESS - INTERACTIVE LOGIC & INTERFACE CONTROLLER
 * Owner: Ahsan Jeho | Location: Mehran University Road
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. STICKY HEADER SCROLL EVENT
    // ==========================================
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load


    // ==========================================
    // 2. MOBILE RESPONSIVE NAVIGATION DRAWER
    // ==========================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Prevent body scrolling when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    };

    const closeMenu = () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking on any navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside of the navigation container
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            closeMenu();
        }
    });


    // ==========================================
    // 3. AUTO-UPDATE ACTIVE NAV LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    const updateActiveNav = () => {
        const scrollPosition = window.scrollY + 200; // Offset for header trigger

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);


    // ==========================================
    // 4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop tracking once revealed
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // ==========================================
    // 5. REGISTRATION FORM VALIDATION & MODAL SUCCESS
    // ==========================================
    const registerForm = document.getElementById('registrationForm');
    const nameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phoneNumber');
    const emailInput = document.getElementById('emailAddress');
    const submitBtn = registerForm.querySelector('.btn-submit');
    
    // Success Modal elements
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalUserName = document.getElementById('modalUserName');
    const modalUserPhone = document.getElementById('modalUserPhone');
    const modalRefId = document.getElementById('modalRefId');

    // Utility: Email validator
    const isValidEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    };

    // Utility: Phone validator (at least 10 digits for Pakistan format)
    const isValidPhone = (phone) => {
        const digits = phone.replace(/\D/g, '');
        return digits.length >= 10;
    };

    // Error helper
    const setError = (input, errorSpanId) => {
        input.closest('.form-group').classList.add('error');
    };

    const clearError = (input) => {
        input.closest('.form-group').classList.remove('error');
    };

    // Input blur event listeners for interactive validation
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim().length >= 3) clearError(nameInput);
    });

    phoneInput.addEventListener('input', () => {
        if (isValidPhone(phoneInput.value)) clearError(phoneInput);
    });

    emailInput.addEventListener('input', () => {
        if (isValidEmail(emailInput.value)) clearError(emailInput);
    });

    // Form Submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let hasErrors = false;

        // Name Validation
        if (nameInput.value.trim().length < 3) {
            setError(nameInput);
            hasErrors = true;
        } else {
            clearError(nameInput);
        }

        // Phone Validation
        if (!isValidPhone(phoneInput.value)) {
            setError(phoneInput);
            hasErrors = true;
        } else {
            clearError(phoneInput);
        }

        // Email Validation
        if (!isValidEmail(emailInput.value)) {
            setError(emailInput);
            hasErrors = true;
        } else {
            clearError(emailInput);
        }

        if (hasErrors) return;

        // Simulated Network Submission
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        setTimeout(() => {
            // Stop loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Generate Random Reference ID (e.g., RF-548102)
            const randomRef = 'RF-' + Math.floor(100000 + Math.random() * 900000);

            // Populate Success Modal Details
            modalUserName.textContent = nameInput.value.trim();
            modalUserPhone.textContent = phoneInput.value.trim();
            modalRefId.textContent = randomRef;

            // Show success modal
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock scrolling

            // Reset form
            registerForm.reset();
        }, 1500);
    });

    // Close Success Modal Handler
    const closeModal = () => {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeModalBtn.addEventListener('click', closeModal);

    // Close modal by clicking background overlay
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            closeModal();
        }
    });

});
