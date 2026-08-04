document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    // Trigger once on load
    revealOnScroll();

    // Trigger on scroll
    window.addEventListener('scroll', revealOnScroll);

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for navbar
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Modal Logic for UMKM Batik
    const modal = document.getElementById('batikModal');
    const closeBtn = document.querySelector('.close-modal');
    const batikItems = document.querySelectorAll('.batik-item');

    // Modal elements
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalFact = document.getElementById('modalFact');
    const modalContact = document.getElementById('modalContact');
    const modalAddress = document.getElementById('modalAddress');
    const modalWaBtn = document.getElementById('modalWaBtn');
    const modalShopeeBtn = document.getElementById('modalShopeeBtn');
    const modalTokopediaBtn = document.getElementById('modalTokopediaBtn');
    const modalIgBtn = document.getElementById('modalIgBtn');

    batikItems.forEach(item => {
        item.addEventListener('click', () => {
            // Get data
            const title = item.getAttribute('data-title');
            const fact = item.getAttribute('data-fact');
            const contact = item.getAttribute('data-contact');
            const address = item.getAttribute('data-address');
            const shopee = item.getAttribute('data-shopee');
            const tokopedia = item.getAttribute('data-tokopedia');
            const ig = item.getAttribute('data-ig');
            const imgBg = item.querySelector('.batik-img').style.cssText;

            // Set modal content
            modalTitle.textContent = title;
            modalFact.textContent = fact;
            modalContact.textContent = contact;
            modalAddress.textContent = address;
            modalImg.style.cssText = imgBg;

            // Set WhatsApp link
            const waNumber = contact ? contact.replace(/\D/g, '') : '';
            let formattedNumber = waNumber;
            if (waNumber.startsWith('0')) {
                formattedNumber = '62' + waNumber.substring(1);
            }
            const message = encodeURIComponent(`Halo, saya tertarik dengan ${title} yang ada di website Desa Wisata Batik Kliwonan.`);
            modalWaBtn.href = `https://wa.me/${formattedNumber}?text=${message}`;

            // Set Online Shop links
            if (modalShopeeBtn) {
                if (shopee) {
                    modalShopeeBtn.href = shopee;
                    modalShopeeBtn.style.display = 'inline-flex';
                } else {
                    modalShopeeBtn.style.display = 'none';
                }
            }

            if (modalTokopediaBtn) {
                if (tokopedia) {
                    modalTokopediaBtn.href = tokopedia;
                    modalTokopediaBtn.style.display = 'inline-flex';
                } else {
                    modalTokopediaBtn.style.display = 'none';
                }
            }

            if (modalIgBtn) {
                if (ig) {
                    modalIgBtn.href = ig;
                    modalIgBtn.style.display = 'inline-flex';
                } else {
                    modalIgBtn.style.display = 'none';
                }
            }

            // Show modal
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        });
    });

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // match CSS transition duration
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 5. Toggle More Batik Items
    const toggleBatikBtn = document.getElementById('toggleBatikBtn');
    const hiddenBatikItems = document.querySelectorAll('.hidden-batik');
    let isBatikExpanded = false;

    if (toggleBatikBtn) {
        toggleBatikBtn.addEventListener('click', () => {
            isBatikExpanded = !isBatikExpanded;

            hiddenBatikItems.forEach(item => {
                if (isBatikExpanded) {
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                }
            });

            if (isBatikExpanded) {
                toggleBatikBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Sembunyikan Batik';
            } else {
                toggleBatikBtn.innerHTML = '<i class="fas fa-th-large"></i> Batik Lainnya';
            }
        });
    }

});
