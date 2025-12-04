document.addEventListener('DOMContentLoaded', () => {
    const htmlElement = document.documentElement;
    const body = document.body;

    // --- 1. GESTIONE CAMBIO TEMA (Event Delegation) ---
    
    function updateIcons(theme) {
        const themeToggles = document.querySelectorAll('.theme-toggle-btn');
        themeToggles.forEach(toggle => {
            const icon = toggle.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        });
    }

    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateIcons(savedTheme);
    }

    // Event delegation for theme toggles
    document.addEventListener('click', (e) => {
        if (e.target.closest('.theme-toggle-btn')) {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcons(newTheme);
        }
    });

    // --- 2. GESTIONE MENU HAMBURGER (Event Delegation) ---

    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    // Toggle menu
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isActive = menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active', isActive);
            body.classList.toggle('no-scroll', isActive);
            
            // Update ARIA attributes
            menuToggle.setAttribute('aria-expanded', isActive);
            menuToggle.setAttribute('aria-label', isActive ? 'Chiudi menu' : 'Apri menu');
            mobileNav.setAttribute('aria-hidden', !isActive);
        });
    }

    // Close menu when clicking nav links (event delegation)
    if (mobileNav) {
        mobileNav.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && mobileNav.classList.contains('active')) {
                menuToggle?.classList.remove('active');
                mobileNav.classList.remove('active');
                mobileNav.setAttribute('aria-hidden', 'true');
                body.classList.remove('no-scroll');
                menuToggle?.setAttribute('aria-expanded', 'false');
                menuToggle?.setAttribute('aria-label', 'Apri menu');
            }
        });
    }

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav?.classList.contains('active')) {
            menuToggle?.classList.remove('active');
            mobileNav?.classList.remove('active');
            mobileNav?.setAttribute('aria-hidden', 'true');
            body.classList.remove('no-scroll');
            menuToggle?.setAttribute('aria-expanded', 'false');
            menuToggle?.setAttribute('aria-label', 'Apri menu');
        }
    });

    // --- 3. GESTIONE ANIMAZIONI ALLO SCORRIMENTO ---

    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, delay);
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // --- 4. GESTIONE MODAL CITAZIONI (Event Delegation + Accessibility) ---

    const modal = document.getElementById('quotes-modal');
    const openBtn = document.getElementById('open-quotes-btn');
    const closeBtn = document.getElementById('close-quotes-btn');

    function openModal() {
        if (modal) {
            modal.style.display = 'block';
            modal.setAttribute('aria-hidden', 'false');
            body.classList.add('no-scroll');
            // Focus trap: focus on close button
            closeBtn?.focus();
            // Prevent body scroll
            document.documentElement.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            body.classList.remove('no-scroll');
            document.documentElement.style.overflow = '';
            // Return focus to open button
            openBtn?.focus();
        }
    }

    if (openBtn) {
        openBtn.addEventListener('click', openModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal on outside click (event delegation)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.style.display === 'block') {
            closeModal();
        }
    });

    // --- 5. READ PROGRESS SCROLLBAR ---

    const progressBar = document.createElement('div');
    progressBar.className = 'read-progress';
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-label', 'Progresso lettura');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    progressBar.setAttribute('aria-valuenow', '0');
    body.appendChild(progressBar);

    function updateProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollableHeight = documentHeight - windowHeight;
        const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
        
        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        progressBar.setAttribute('aria-valuenow', Math.round(progress));
    }

    // Throttle scroll events for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateProgress();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial progress update
    updateProgress();
});