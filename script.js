document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for buttery smooth virtual scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Tell GSAP ScrollTrigger to sync with Lenis' scroll position instead of native scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's request animation frame to GSAP's ticker
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Disable GSAP's native lag smoothing to prevent conflicts with Lenis
    gsap.ticker.lagSmoothing(0);

    // Navbar Scroll Background Effect
    const navMenu = document.querySelector('.Nav_mainNav__pyKU_');
    let lastScrollY = window.scrollY;

    if (navMenu) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 50) {
                navMenu.classList.add('scrolled');

                // Determine scroll direction
                if (currentScrollY > lastScrollY) {
                    // Scrolling down
                    navMenu.classList.add('scrolled-down');
                } else {
                    // Scrolling up
                    navMenu.classList.remove('scrolled-down');
                }
            } else {
                navMenu.classList.remove('scrolled');
                navMenu.classList.remove('scrolled-down');
            }

            lastScrollY = currentScrollY;
        });
    }

    // Video Controls
    const heroMuteButton = document.getElementById('heroMuteButton');
    const heroMuteIcon = document.getElementById('heroMuteIcon');
    const heroVideoEl = document.getElementById('heroVideoEl');

    if (heroVideoEl && heroMuteButton) {
        const muteSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" class="VideoButton_svg___hJhE" style="width: 1.2rem; height: 1.2rem;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>`;
        const unmuteSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" class="VideoButton_svg___hJhE" style="width: 1.2rem; height: 1.2rem;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>`;

        heroMuteButton.addEventListener('click', () => {
            if (heroVideoEl.muted) {
                heroVideoEl.muted = false;
                heroMuteIcon.innerHTML = unmuteSVG;
                heroMuteButton.setAttribute('aria-label', 'Mute');
            } else {
                heroVideoEl.muted = true;
                heroMuteIcon.innerHTML = muteSVG;
                heroMuteButton.setAttribute('aria-label', 'Unmute');
            }
        });
    }

    // Make sure the title container is visible, as it might have a default opacity of 0 in the CSS.
    gsap.set('.HomepageHeroBespoke_title__C_bJm', { opacity: 1 });

    // Set initial states for split words in case they are defined with opacity 1 by default
    gsap.set('.split-word', { opacity: 0, y: 40 });

    // Entrance animation for the split words
    gsap.to('.split-word', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        delay: 0.2
    });

    // Animate video zooming slightly similar to Zoox
    gsap.fromTo('.HomepageHeroBespoke_video__lYhfm',
        { scale: 1.0 },
        {
            scale: 1.05,
            scrollTrigger: {
                trigger: '.HomepageHeroBespoke',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        }
    );



    // Mobile Menu Toggle
    const hamburger = document.querySelector('.Hamburger_root__vVMOe');
    const navWrapper = document.querySelector('.Nav_wrapper__q7293');
    let menuOpen = false;

    if (hamburger && navWrapper) {
        hamburger.addEventListener('click', () => {
            menuOpen = !menuOpen;
            hamburger.setAttribute('aria-expanded', menuOpen);
            // Toggle classes for hamburger animation
            hamburger.classList.toggle('Hamburger_isOpen__xyz'); // Using a general class if exact Zoox class is unknown

            // Toggle menu visibility
            if (menuOpen) {
                gsap.to('.Nav_routes__woI6v', { display: 'flex', opacity: 1, duration: 0.3 });
            } else {
                gsap.to('.Nav_routes__woI6v', {
                    opacity: 0, duration: 0.3, onComplete: () => {
                        gsap.set('.Nav_routes__woI6v', { display: 'none' });
                    }
                });
            }
        });
    }

    // --- Section 2 Animations (.HomepageContentBespoke) ---

    // --- Section 2 Animations (.HomepageContentBespoke) ---

    gsap.set([
        '.HomepageContentBespoke_textContent__kspYU',
        '.HomepageContentBespoke_imageWrapper__R6zmp',
        '.TextContent_eyebrow__hvADT',
        '.split-line',
        '.HomepageContentBespoke_freedomEyebrow__nVT4E',
        '.HomepageContentBespoke_words__f48IG',
        '.HomepageContentBespoke_freedomsVideo__gP_HL'
    ], { opacity: 1, visibility: "visible" });

    // Reset properties
    gsap.set(".HomepageContentBespoke_textContainer__1TpyM", { clearProps: "all" });
    gsap.set(".HomepageContentBespoke_transformContainer__iPl8h", { clearProps: "all" });

    // Timeline 1: Entry Animation (Before Pinning, moving from bottom of screen to top)
    let animateInTl = gsap.timeline({
        scrollTrigger: {
            id: "Homepage-Content-Animate-In",
            trigger: ".HomepageContentBespoke_mainContainer__cuN8J",
            start: "top bottom",
            end: "top top",
            scrub: true
        }
    });

    animateInTl.addLabel("start", 0)
        .set(".HomepageContentBespoke_horizontalTextContainer__Jr0f0", { zIndex: 1 })
        .set(".HomepageContentBespoke_clipContainer__PaUmt", {
            "--clip-top": "2rem",
            "--clip-right": "75%",
            "--clip-bottom": "2rem",
            "--clip-left": "-25%",
            "--clip-border-radius": "3.6rem"
        })
        .set(".HomepageContentBespoke_transformContainer__iPl8h", { xPercent: -25 })
        .set(".HomepageContentBespoke_textContainer__1TpyM", { xPercent: -25, x: 40 })
        .to(".HomepageContentBespoke_clipContainer__PaUmt", {
            "--clip-top": "2rem",
            "--clip-right": "50%",
            "--clip-bottom": "2rem",
            "--clip-left": "2rem",
            "--clip-border-radius": "3.6rem",
            duration: 1,
            ease: "none"
        }, 0)
        .to(".HomepageContentBespoke_transformContainer__iPl8h", { xPercent: 0, duration: 1, ease: "none" }, 0)
        .to(".HomepageContentBespoke_horizontalTextContainer__Jr0f0", { xPercent: 25, x: 0, duration: 1, ease: "none" }, 0)
        .to(".HomepageContentBespoke_textContainer__1TpyM", { xPercent: 0, duration: 1, ease: "none" }, 0);

    // Timeline 2: Scroll Pinning & Expansion (While Pinned at the top of the screen)
    let scrollPinningTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
            id: "Homepage-Content-Scroll-Pinning",
            trigger: ".HomepageContentBespoke_mainContainer__cuN8J",
            start: "top top",
            end: "+=250%",
            scrub: true,
            pin: true
        }
    });

    scrollPinningTl.addLabel("pinned-start", 0)
        .to(".HomepageContentBespoke_horizontalTextContainer__Jr0f0", { xPercent: 75, x: -40, duration: 2.5, ease: "power2.inOut" }, "pinned-start")
        .to(".HomepageContentBespoke_clipContainer__PaUmt", { "--clip-border-radius": "3.6rem", duration: 0.5 }, "pinned-start")
        .to(".HomepageContentBespoke_clipContainer__PaUmt", {
            "--clip-top": "2rem",
            "--clip-right": "2rem",
            "--clip-bottom": "2rem",
            "--clip-left": "2rem",
            duration: 2.5,
            ease: "power2.inOut"
        }, "pinned-start")
        .addLabel("end");




    // 2. Vertical Reel ("Workspace", "Chill Space"...) & Video Scrubbing
    let words = gsap.utils.toArray('.HomepageContentBespoke_heading__N1SMd');
    let sec2Video = document.querySelector('.HomepageContentBespoke_freedomsVideo__gP_HL video');

    // --- Section 4: Crossfade Animation ---
    const crossfadeText = document.querySelectorAll('#section4-crossfade .crossfade-text');
    const crossfadeImgs = document.querySelectorAll('#section4-crossfade .crossfade-img');

    if (crossfadeText.length > 0 && crossfadeImgs.length > 0) {
        let currentIndex = 0;

        // Cycle every 2 seconds
        setInterval(() => {
            // Remove active classes from old elements
            crossfadeText[currentIndex].classList.remove('active');
            crossfadeImgs[currentIndex].classList.remove('active');

            // Increment and wrap around index
            currentIndex = (currentIndex + 1) % crossfadeText.length;

            // Add active classes to new elements
            crossfadeText[currentIndex].classList.add('active');
            crossfadeImgs[currentIndex].classList.add('active');
        }, 2000); // 2000ms = 2 seconds
    }
});
