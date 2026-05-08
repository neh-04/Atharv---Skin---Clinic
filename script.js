const initApp = () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        function toggleMenu() {
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }

        mobileMenuBtn.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // 3. WhatsApp Booking Form Handling
    const bookingForm = document.getElementById('whatsappBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('userName').value.trim();
            const phone = document.getElementById('userPhone').value.trim();
            const concern = document.getElementById('userConcern').value;
            const time = document.getElementById('userTime').value;

            if (!name || !phone || !concern || !time) {
                alert('Please fill all the required fields.');
                return;
            }

            const doctorWhatsAppNumber = '918539003914';
            const message = `Hello, I want to book an appointment with Dr. Anuja Bharti.\nName: ${name}\nPhone: ${phone}\nConcern: ${concern}\nPreferred Time: ${time}`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${doctorWhatsAppNumber}?text=${encodedMessage}`;
            window.open(whatsappURL, '_blank');
            bookingForm.reset();
        });
    }

    // --- Language Switching Logic ---
    window.setLanguage = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('preferredLang', lang);

        // Update all elements with data-en and data-hi
        document.querySelectorAll('[data-hi]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) el.textContent = text;
        });

        // Update placeholders
        document.querySelectorAll('[data-placeholder-hi]').forEach(el => {
            const placeholder = el.getAttribute(`data-placeholder-${lang}`);
            if (placeholder) el.placeholder = placeholder;
        });

        // Update active class on buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase().includes(lang === 'hi' ? 'हिंदी' : 'en')) {
                btn.classList.add('active');
            }
        });

        // Refresh reviews with current language
        if (reviewsGrid) refreshReviews();
    };

    // Load preferred language
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    if (savedLang === 'hi') {
        setTimeout(() => setLanguage('hi'), 100);
    }

    // --- Real Patient Reviews Dataset ---
    const reviews = [
        { 
            name: "Apurva Singh", 
            rating: 5, 
            text: {
                en: "Dr. Anuja is very efficient professionally. What distinguishes her apart is her kindness and sympathetic attitude towards patient. I feel privileged being under her care.",
                hi: "डॉ. अनुजा पेशेवर रूप से बहुत कुशल हैं। जो चीज़ उन्हें अलग बनाती है, वह है मरीजों के प्रति उनकी दयालुता और सहानुभूतिपूर्ण रवैया। मैं उनकी देखरेख में रहकर सौभाग्यशाली महसूस करती हूँ।"
            }
        },
        { 
            name: "Shiraz Sajid Hashmi", 
            rating: 5, 
            text: {
                en: "I can tell from her professional approach that she knows what she is doing. I can confidently recommend her as one of the best dermatologists I have encountered.",
                hi: "उनके पेशेवर दृष्टिकोण से मैं कह सकता हूँ সর্বশেষ मुझे मिले सबसे अच्छे त्वचा विशेषज्ञों में से एक के रूप में आत्मविश्वास के साथ सुझा सकता हूँ।"
            }
        },
        { 
            name: "Sapna Rajpal", 
            rating: 5, 
            text: {
                en: "Great experience. Such a well behaved, friendly, informative and experienced doctor. I would always recommend everyone to visit her.",
                hi: "शानदार अनुभव। इतनी अच्छी व्यवहार वाली, मिलनसार, जानकारीपूर्ण और अनुभवी डॉक्टर। मैं हमेशा सभी को उनके पास जाने की सलाह दूँगी।"
            }
        },
        { 
            name: "Saurabh Kumar", 
            rating: 5, 
            text: {
                en: "She is a great dermatologist in Muzaffarpur. And her treatment is very good. I am happy with her treatment.",
                hi: "वे मुजफ्फरपुर में एक बेहतरीन त्वचा विशेषज्ञ हैं। और उनका इलाज बहुत अच्छा है। मैं उनके इलाज से खुश हूँ।"
            }
        },
        { 
            name: "Abhishek Kumar", 
            rating: 5, 
            text: {
                en: "ATHARV CLINIC is best with Doctor Anuja Bharti is really good and one thing which differentiate her from other is her simplicity and sincerely listening to problem with vast experience and overall cost including appointment and medicine.",
                hi: "अथर्व क्लिनिक सबसे अच्छा है और डॉ. अनुजा भारती वास्तव में बहुत अच्छी हैं। एक चीज़ जो उन्हें दूसरों से अलग करती है, वह है उनकी सादगी और विशाल अनुभव के साथ समस्याओं को ईमानदारी से सुनना।"
            }
        },
        { 
            name: "Ranjeet Kumar", 
            rating: 5, 
            text: {
                en: "Very good treatment. Best Dermatologist of the Town!! Staff behaviour is good and maintained hygiene in clinic.",
                hi: "बहुत अच्छा इलाज। शहर की सबसे अच्छी त्वचा विशेषज्ञ!! स्टाफ का व्यवहार अच्छा है और क्लिनिक में साफ-सफाई का ध्यान रखा गया है।"
            }
        },
        { 
            name: "Divyanisha", 
            rating: 5, 
            text: {
                en: "Dr. Anuja holds great experience in the field of dermatology. She has compassionate approach. Her meticulous attention to detail and treatment shown remarkable results. I wholeheartedly recommend her to anyone seeking great dermatological care.",
                hi: "डॉ. अनुजा को त्वचा विज्ञान के क्षेत्र में बहुत अनुभव है। उनका दृष्टिकोण सहानुभूतिपूर्ण है। विवरणों पर उनके बारीक ध्यान और उपचार ने उल्लेखनीय परिणाम दिखाए हैं।"
            }
        },
        { 
            name: "Chandra Prakash", 
            rating: 5, 
            text: {
                en: "Dr. Anuja Bharti is a experienced doctor. She is well behaved and polite by nature. Process of treatment of any patient is done excellently and treatment is 100 percent successful.",
                hi: "डॉ. अनुजा भारती एक अनुभवी डॉक्टर हैं। वे स्वभाव से बहुत अच्छे व्यवहार वाली और विनम्र हैं। किसी भी मरीज के इलाज की प्रक्रिया उत्कृष्ट तरीके से की जाती है।"
            }
        },
        { 
            name: "Manglam", 
            rating: 5, 
            text: {
                en: "Dr. Anuja Bharti is well approachable and appropriately listen your problems. She gives perfect treatment with minimum affordable medication. Highly recommend dermatologist in Muzaffarpur.",
                hi: "डॉ. अनुजा भारती तक पहुँचना आसान है और वे आपकी समस्याओं को उचित तरीके से सुनती हैं। वे कम से कम सस्ती दवाओं के साथ सही इलाज देती हैं।"
            }
        },
        { 
            name: "Surbhi", 
            rating: 5, 
            text: {
                en: "Great treatment experience. Best dermatologist.",
                hi: "इलाज का शानदार अनुभव। सबसे अच्छी त्वचा विशेषज्ञ।"
            }
        }
    ];

    const reviewsGrid = document.getElementById('reviews-grid');
    const seeAllBtn = document.getElementById('seeAllReviewsBtn');
    const seeAllContainer = document.getElementById('seeAllContainer');

    // Consolidated Animation Observer
    const combinedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                combinedObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    function renderReviews(reviewsList) {
        const lang = document.documentElement.lang || 'en';
        reviewsList.forEach((review) => {
            const card = document.createElement('div');
            card.className = 'review-card fade-in';
            const stars = "⭐".repeat(review.rating);
            const reviewText = typeof review.text === 'string' ? review.text : (review.text[lang] || review.text['en']);
            card.innerHTML = `
                <div class="stars">${stars}</div>
                <p class="review-text">"${reviewText}"</p>
                <div class="reviewer-name">- ${review.name}</div>
            `;
            reviewsGrid.appendChild(card);
            combinedObserver.observe(card);
        });
    }

    function refreshReviews() {
        if (!reviewsGrid) return;
        reviewsGrid.innerHTML = '';
        renderReviews(reviews);
        
        if (seeAllContainer) {
            seeAllContainer.style.display = 'none';
        }
    }

    if (reviewsGrid) {
        refreshReviews();
    }

    // Observe other fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        combinedObserver.observe(el);
    });
};

// Execution logic: check readyState or listen to event
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
