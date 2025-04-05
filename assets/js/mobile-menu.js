document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    hamburgerBtn.addEventListener('click', function() {
        if (isAnimating) return;
        isAnimating = true;
        
        this.classList.toggle('active');
        if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
            mobileMenu.style.display = 'flex';
            setTimeout(() => mobileMenu.classList.add('show'), 10);
        } else {
            mobileMenu.classList.remove('show');
            setTimeout(() => {
                mobileMenu.style.display = 'none';
                isAnimating = false;
            }, 300);
        }
        
        if (mobileMenu.style.display === 'flex') {
            setTimeout(() => isAnimating = false, 300);
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('show');
            hamburgerBtn.classList.remove('active');
            const icon = hamburgerBtn.querySelector('i');
            icon.classList.remove('bi-x');
            icon.classList.add('bi-list');
            
            // Close all dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                dropdownMenu.style.display = 'none';
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.transform = 'translateY(10px)';
            });
        }
    });

    // Handle dropdowns in mobile view
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('a');
        
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdown.classList.contains('active')) {
                    dropdownMenu.style.display = 'block';
                    setTimeout(() => {
                        dropdownMenu.style.opacity = '1';
                        dropdownMenu.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        dropdownMenu.style.display = 'none';
                    }, 300);
                }
            }
        });
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            mobileMenu.classList.remove('show');
            hamburgerBtn.classList.remove('active');
            const icon = hamburgerBtn.querySelector('i');
            icon.classList.remove('bi-x');
            icon.classList.add('bi-list');
            
            // Reset dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                dropdownMenu.style.display = '';
                dropdownMenu.style.opacity = '';
                dropdownMenu.style.transform = '';
            });
        }
    });
});