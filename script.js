

    // Function to animate the DNA strands and base pairs
    function animateDNA() {
        // Select all DNA strands
        const dnaStrands = document.querySelectorAll('#dna-strand-1, #dna-strand-2, #dna-strand-3, #dna-strand-4');
        dnaStrands.forEach((strand, index) => {
            // Get the total length of the SVG path for the drawing animation
            const length = strand.getTotalLength();
            // Set stroke-dasharray and stroke-dashoffset to hide the path initially
            strand.style.strokeDasharray = length;
            strand.style.strokeDashoffset = length;
            // Apply the 'drawDNA' animation with a staggered delay
            strand.style.animation = `drawDNA 6s ease-in-out infinite ${index * 0.8}s`;
        });

        // Select all DNA base pair lines
        const basePairs = document.querySelectorAll('#base-pairs line');
        basePairs.forEach((line, index) => {
            // Apply the 'pulseDNA' animation to each base pair with a staggered delay
            line.style.animation = `pulseDNA 3s ease-in-out infinite ${index * 0.2}s`;
        });
    }

    // Call the animateDNA function when the entire page (including all resources) has loaded
    window.addEventListener('load', () => {
        animateDNA();
    });
        // Particle System
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 10 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // DNA Strand Creation
        function createDNAStrand() {
            const strand = document.getElementById('dnaStrand');
            for (let i = 0; i < 30; i++) {
                const base = document.createElement('div');
                base.className = 'dna-base';
                base.style.top = (i * 10) + 'px';
                base.style.transform = `translateX(-50%) rotateY(${i * 24}deg)`;
                base.style.background = i % 2 === 0 ? 
                    'linear-gradient(90deg, #00ff88, #0088ff)' : 
                    'linear-gradient(90deg, #ff0080, #ff8800)';
                strand.appendChild(base);
            }
        }

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        // Scroll Animation
        function handleScrollAnimation() {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        // Interactive Cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) rotateX(5deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0deg)';
            });
        });

        // CTA Button Animation
        document.querySelector('.cta-button').addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });

        // Initialize
        window.addEventListener('load', function() {
            createParticles();
            createDNAStrand();
            handleScrollAnimation();
        });

        window.addEventListener('scroll', handleScrollAnimation);

        // Dynamic Background Color Change
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            document.body.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 5%) 0%, hsl(${hue + 60}, 70%, 10%) 50%, hsl(${hue + 120}, 70%, 15%) 100%)`;
        }, 100);

          document.querySelector('.search-box button').addEventListener('click', function () {
    const value = document.getElementById('siteSearch').value;
    alert("You searched: " + value);
    // Future: implement actual search filtering here
  });
    // Core Areas 3D Carousel Class
        class RotatableCarousel {
            constructor() {
                this.track = document.getElementById('carouselTrack');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.indicatorsContainer = document.getElementById('indicators');
                this.autoRotateToggle = document.getElementById('autoRotateToggle');
                
                this.cards = Array.from(this.track.children);
                this.totalCards = this.cards.length;
                this.currentIndex = 0;
                this.radius = 400;
                this.angleStep = 360 / this.totalCards;
                
                this.autoRotateInterval = null;
                this.isAutoRotating = false;
                this.autoRotateSpeed = 1000; // 1 seconds
                
                this.init();
            }
            
            init() {
                this.setupCards();
                this.createIndicators();
                this.bindEvents();
                this.updateView();
                
                // Initial position
                this.updateCardPositions();
                
                // Handle window resize
                window.addEventListener('resize', () => {
                    this.updateRadius();
                    this.updateCardPositions();
                });
            }
            
            setupCards() {
                this.cards.forEach((card, index) => {
                    card.style.transformOrigin = 'center center';
                    card.dataset.index = index;
                    
                    // Add click event to each card
                    card.addEventListener('click', () => {
                        if (index !== this.currentIndex) {
                            this.goToCard(index);
                        }
                    });
                });
            }
            
            updateRadius() {
                const containerWidth = this.track.parentElement.offsetWidth;
                this.radius = Math.min(400, containerWidth / 3);
            }
            
            createIndicators() {
                this.indicatorsContainer.innerHTML = '';
                
                this.cards.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.className = `indicator-dot ${index === 0 ? 'active' : ''}`;
                    dot.addEventListener('click', () => this.goToCard(index));
                    this.indicatorsContainer.appendChild(dot);
                });
            }
            
            bindEvents() {
                this.prevBtn.addEventListener('click', () => this.previousCard());
                this.nextBtn.addEventListener('click', () => this.nextCard());
                
                this.autoRotateToggle.addEventListener('click', () => this.toggleAutoRotate());
                
                // Touch/swipe support
                let startX = 0;
                let startY = 0;
                let endX = 0;
                let endY = 0;
                
                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                });
                
                this.track.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    endY = e.changedTouches[0].clientY;
                    
                    const diffX = startX - endX;
                    const diffY = startY - endY;
                    
                    // Only respond to horizontal swipes
                    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                        if (diffX > 0) {
                            this.nextCard();
                        } else {
                            this.previousCard();
                        }
                    }
                });
                
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') {
                        this.previousCard();
                    } else if (e.key === 'ArrowRight') {
                        this.nextCard();
                    }
                });
            }
            
            updateCardPositions() {
                this.cards.forEach((card, index) => {
                    const angle = (index - this.currentIndex) * this.angleStep;
                    const radian = (angle * Math.PI) / 180;
                    
                    const x = Math.sin(radian) * this.radius;
                    const z = Math.cos(radian) * this.radius;
                    
                    // Calculate opacity and scale based on position
                    const distanceFromCenter = Math.abs(angle % 360);
                    const normalizedDistance = Math.min(distanceFromCenter, 360 - distanceFromCenter) / 180;
                    const opacity = Math.max(0.3, 1 - normalizedDistance * 0.7);
                    const scale = Math.max(0.7, 1 - normalizedDistance * 0.3);
                    
                    card.style.transform = `
                        translateX(${x}px) 
                        translateZ(${z}px) 
                        rotateY(${-angle}deg)
                        scale(${scale})
                    `;
                    card.style.opacity = opacity;
                    card.style.zIndex = Math.round(100 + z);
                    
                    // Add special styling for the front card
                    if (index === this.currentIndex) {
                        card.style.filter = 'brightness(1.2)';
                    } else {
                        card.style.filter = 'brightness(0.8)';
                    }
                });
            }
            
            nextCard() {
                this.currentIndex = (this.currentIndex + 1) % this.totalCards;
                this.updateView();
            }
            
            previousCard() {
                this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
                this.updateView();
            }
            
            goToCard(index) {
                this.currentIndex = index;
                this.updateView();
            }
            
            updateView() {
                this.updateCardPositions();
                this.updateIndicators();
            }
            
            updateIndicators() {
                const dots = this.indicatorsContainer.querySelectorAll('.indicator-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentIndex);
                });
            }
            
            toggleAutoRotate() {
                if (this.isAutoRotating) {
                    this.stopAutoRotate();
                } else {
                    this.startAutoRotate();
                }
            }
            
            startAutoRotate() {
                this.isAutoRotating = true;
                this.autoRotateToggle.classList.add('active');
                this.autoRotateToggle.innerHTML = '<i class="fas fa-pause"></i> Auto Rotate';
                
                this.autoRotateInterval = setInterval(() => {
                    this.nextCard();
                }, this.autoRotateSpeed);
            }
            
            stopAutoRotate() {
                this.isAutoRotating = false;
                this.autoRotateToggle.classList.remove('active');
                this.autoRotateToggle.innerHTML = '<i class="fas fa-play"></i> Auto Rotate';
                
                if (this.autoRotateInterval) {
                    clearInterval(this.autoRotateInterval);
                    this.autoRotateInterval = null;
                }
            }
        }
        
        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            new RotatableCarousel();
        });