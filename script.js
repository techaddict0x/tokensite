// 🐐 DEGEN GOATCOIN - MAXIMUM CHAOS MODE ACTIVATED 🐐
// NO REFUNDS. ONLY MOON. 🚀

document.addEventListener('DOMContentLoaded', function() {
    initMountainParticles();
    initScrollAnimations();
    initNavbarScroll();
    initCountUpAnimations();
    playPageLoad();
    fetchTokenData();
    
    // Refresh token data every 30 seconds
    setInterval(fetchTokenData, 30000);
});

// Create chaotic degen particles
function initMountainParticles() {
    const particlesContainer = document.getElementById('goat-particles');
    
    function createParticle() {
        const particle = document.createElement('div');
        const particles = ['🐐', '🚀', '📈', '💎', '🔥', '⚡', '🌙', '💰'];
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 50;
        const endY = -50;
        const drift = (Math.random() - 0.5) * 200;
        
        particle.style.cssText = `
            position: absolute;
            left: ${startX}px;
            top: ${startY}px;
            font-size: ${15 + Math.random() * 12}px;
            opacity: ${0.6 + Math.random() * 0.4};
            pointer-events: none;
            z-index: -1;
            animation: degenFloat ${6 + Math.random() * 3}s linear forwards;
            filter: drop-shadow(0 0 10px rgba(255, 0, 255, 0.5));
        `;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 10000);
    }
    
    // Create particles more frequently for chaos
    setInterval(createParticle, 2000);
    
    // Add CSS animation
    if (!document.getElementById('degen-float-styles')) {
        const style = document.createElement('style');
        style.id = 'degen-float-styles';
        style.textContent = `
            @keyframes degenFloat {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg) scale(0.5);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                    transform: translateY(-50px) translateX(${Math.random() * 100 - 50}px) rotate(45deg) scale(1);
                }
                50% {
                    transform: translateY(-${window.innerHeight/2}px) translateX(${Math.random() * 200 - 100}px) rotate(180deg) scale(1.2);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-${window.innerHeight + 100}px) translateX(${Math.random() * 300 - 150}px) rotate(720deg) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Chaotic navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.boxShadow = '0 0 30px rgba(255, 0, 255, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
            navbar.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.2)';
        }
        
        // Hide/show navbar with glitch effect
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add random glitch effect
        if (Math.random() < 0.01) {
            navbar.style.transform += ' translateX(2px)';
            setTimeout(() => {
                navbar.style.transform = navbar.style.transform.replace(' translateX(2px)', '');
            }, 50);
        }
        
        lastScrollY = currentScrollY;
    });
}

// Fetch live token data
async function fetchTokenData() {
    try {
        const contractAddress = 'GNHW5JetZmW85vAU35KyoDcYoSd3sNWtx5RPMTDJpump';
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`);
        const data = await response.json();
        
        if (data && data.pairs && data.pairs.length > 0) {
            const pair = data.pairs[0];
            
            // Format market cap
            const marketCap = pair.marketCap ? formatNumber(pair.marketCap) : 'N/A';
            
            // Format price
            const price = pair.priceUsd ? `$${parseFloat(pair.priceUsd).toFixed(8)}` : 'N/A';
            
            // Update hero stats
            updateElementText('marketCap', marketCap);
            updateElementText('price', price);
            
            // Update tokenomics section
            updateElementText('tokenomicsMarketCap', marketCap);
            updateElementText('tokenomicsPrice', price);
            
        } else {
            console.log('No pair data found');
            setFallbackData();
        }
    } catch (error) {
        console.error('Error fetching token data:', error);
        setFallbackData();
    }
}

// Helper function to update element text
function updateElementText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

// Format large numbers
function formatNumber(num) {
    if (num >= 1e9) {
        return '$' + (num / 1e9).toFixed(1) + 'B';
    } else if (num >= 1e6) {
        return '$' + (num / 1e6).toFixed(1) + 'M';
    } else if (num >= 1e3) {
        return '$' + (num / 1e3).toFixed(1) + 'K';
    }
    return '$' + num.toFixed(0);
}

// Set fallback data if API fails
function setFallbackData() {
    updateElementText('marketCap', '$37K');
    updateElementText('price', '$0.0000000037');
    updateElementText('tokenomicsMarketCap', '$37K');
    updateElementText('tokenomicsPrice', '$0.0000000037');
}

// Copy contract address functionality
function copyContract() {
    const contractAddress = document.getElementById('contractAddress').textContent;
    const copyBtn = document.querySelector('.copy-btn');
    const copyText = copyBtn.querySelector('.copy-text');
    
    navigator.clipboard.writeText(contractAddress).then(() => {
        copyText.textContent = 'Copied!';
        copyBtn.style.background = '#228B22';
        
        // Create success particles
        createSuccessParticles(copyBtn);
        
        setTimeout(() => {
            copyText.textContent = 'Copy';
            copyBtn.style.background = 'var(--primary-brown)';
        }, 2000);
    }).catch(() => {
        // Fallback copy
        const textArea = document.createElement('textarea');
        textArea.value = contractAddress;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        copyText.textContent = 'Copied!';
        copyBtn.style.background = '#228B22';
        createSuccessParticles(copyBtn);
        
        setTimeout(() => {
            copyText.textContent = 'Copy';
            copyBtn.style.background = 'var(--primary-brown)';
        }, 2000);
    });
}

// Create DEGEN success particles for copy action
function createSuccessParticles(element) {
    const rect = element.getBoundingClientRect();
    const particles = ['🚀', '📈', '💎', '🔥', '⚡', '💰', '🌙'];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: ${20 + Math.random() * 10}px;
            pointer-events: none;
            z-index: 10000;
            animation: degenBurst 1.5s ease-out forwards;
            animation-delay: ${i * 0.05}s;
            filter: drop-shadow(0 0 10px rgba(255, 0, 255, 0.8));
        `;
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }
    
    // Add degen burst animation
    if (!document.getElementById('degen-burst-styles')) {
        const style = document.createElement('style');
        style.id = 'degen-burst-styles';
        style.textContent = `
            @keyframes degenBurst {
                0% {
                    transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    opacity: 1;
                }
                30% {
                    transform: translate(-50%, -50%) scale(1.5) rotate(${Math.random() * 360}deg);
                    opacity: 1;
                }
                70% {
                    transform: translate(-50%, -50%) scale(1) rotate(${Math.random() * 720}deg) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(-50%, -50%) scale(0) rotate(${Math.random() * 1080}deg) translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Scroll animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animations for different elements
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.animationDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.2}s`;
                }
                
                if (entry.target.classList.contains('bento-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1;
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, delay * 100);
                }
                
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.animationDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.3}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.feature-card, .bento-card, .timeline-item, .cta-section');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// Count-up animations for numbers
function initCountUpAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                
                if (text.includes('1B') && element.classList.contains('big-number')) {
                    animateCountUp(element, 0, 1, 'B', 2000);
                }
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    const countElements = document.querySelectorAll('.big-number');
    countElements.forEach(element => observer.observe(element));
}

// Animate count up effect
function animateCountUp(element, start, end, suffix, duration) {
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        
        if (suffix === 'B') {
            element.textContent = (current === 0 ? '0' : current) + suffix;
        } else {
            element.textContent = current + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Page load animation
function playPageLoad() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.badge, .hero-title, .hero-description, .stats-row, .hero-actions');
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + index * 150);
        });
        
        // Animate hero visual
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.opacity = '0';
            heroVisual.style.transform = 'scale(0.8)';
            heroVisual.style.transition = 'all 0.8s ease-out';
            
            setTimeout(() => {
                heroVisual.style.opacity = '1';
                heroVisual.style.transform = 'scale(1)';
            }, 500);
        }
    }, 100);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Interactive effects for hero visual elements
document.addEventListener('DOMContentLoaded', function() {
    const goatIcon = document.querySelector('.goat-icon');
    const mountainPeak = document.querySelector('.mountain-peak');
    const indicators = document.querySelectorAll('.indicator');
    
    if (goatIcon) {
        goatIcon.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.3) rotate(360deg)';
            this.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                this.style.animation = 'goat-dance 4s ease-in-out infinite';
                this.style.transform = '';
                this.style.transition = '';
            }, 500);
            
            createClickParticles(this);
        });
    }
    
    if (mountainPeak) {
        mountainPeak.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.2)';
            this.style.filter = 'drop-shadow(0 0 20px #FFD700)';
            
            setTimeout(() => {
                this.style.animation = 'float 3s ease-in-out infinite';
                this.style.transform = '';
                this.style.filter = '';
            }, 500);
        });
    }
    
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.5)';
            this.style.background = '#FFD700';
            
            setTimeout(() => {
                this.style.animation = 'pulse 2s infinite';
                this.style.transform = '';
                this.style.background = '';
            }, 300);
        });
    });
});

// Create chaotic click particles
function createClickParticles(element) {
    const rect = element.getBoundingClientRect();
    const particles = ['🚀', '💎', '🔥', '⚡', '📈', '💰', '🌙', '🐐'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: ${24 + Math.random() * 12}px;
            pointer-events: none;
            z-index: 1000;
            animation: degenExplosion 1.5s ease-out forwards;
            animation-delay: ${i * 0.05}s;
            filter: drop-shadow(0 0 15px rgba(0, 255, 255, 0.8));
        `;
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1800);
    }
    
    // Add degen explosion animation
    if (!document.getElementById('degen-explosion-styles')) {
        const style = document.createElement('style');
        style.id = 'degen-explosion-styles';
        style.textContent = `
            @keyframes degenExplosion {
                0% {
                    transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    opacity: 1;
                }
                25% {
                    transform: translate(-50%, -50%) scale(1.5) rotate(${Math.random() * 180}deg);
                    opacity: 1;
                }
                60% {
                    transform: translate(-50%, -50%) scale(1) rotate(${Math.random() * 360}deg) translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px);
                    opacity: 0.7;
                }
                100% {
                    transform: translate(-50%, -50%) scale(0) rotate(${Math.random() * 720}deg) translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Easter egg: GOAT sequence
let goatSequence = [];
const goatCode = ['KeyG', 'KeyO', 'KeyA', 'KeyT'];

document.addEventListener('keydown', function(e) {
    goatSequence.push(e.code);
    
    if (goatSequence.length > goatCode.length) {
        goatSequence.shift();
    }
    
    if (goatSequence.join('') === goatCode.join('')) {
        triggerGoatEasterEgg();
        goatSequence = [];
    }
});

// DEGEN easter egg
function triggerGoatEasterEgg() {
    // Create full-screen chaos celebration
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, rgba(255, 0, 255, 0.9), rgba(0, 255, 255, 0.9));
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: celebrationGlitch 0.5s ease-out;
    `;
    
    celebration.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="font-size: 8rem; margin-bottom: 2rem; animation: degenBounce 0.5s infinite; text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);">🐐🚀</div>
            <h1 style="font-family: 'JetBrains Mono', monospace; font-size: 4rem; margin-bottom: 1rem; background: linear-gradient(45deg, #00FFFF, #FF00FF, #39FF14); background-size: 300% 300%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: gradientShift 2s ease infinite; text-transform: uppercase; letter-spacing: 5px;">DEGEN MODE UNLOCKED!</h1>
            <p style="font-size: 2rem; margin-bottom: 2rem; opacity: 1; font-weight: 800; text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);">MAXIMUM CHAOS ACHIEVED! 🔥</p>
            <button onclick="this.parentElement.parentElement.remove()" style="background: linear-gradient(45deg, #39FF14, #FFFF00); color: #000; border: 3px solid #FF00FF; padding: 1.5rem 3rem; border-radius: 0; font-weight: 900; font-size: 1.2rem; cursor: pointer; text-transform: uppercase; letter-spacing: 2px; animation: buttonChaos 0.3s infinite; font-family: 'JetBrains Mono', monospace;">TO THE MOON 🌙</button>
        </div>
    `;
    
    document.body.appendChild(celebration);
    
    // Create insane celebration particles
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createDegenParticle();
        }, i * 50);
    }
    
    // Add celebration animations
    if (!document.getElementById('degen-celebration-styles')) {
        const style = document.createElement('style');
        style.id = 'degen-celebration-styles';
        style.textContent = `
            @keyframes celebrationGlitch {
                0% { opacity: 0; transform: scale(0.5) rotate(0deg); }
                50% { opacity: 1; transform: scale(1.1) rotate(2deg); }
                100% { opacity: 1; transform: scale(1) rotate(0deg); }
            }
            @keyframes degenBounce {
                0%, 100% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.3) rotate(10deg); }
            }
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            @keyframes buttonChaos {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Create degen celebration particles
function createDegenParticle() {
    const particle = document.createElement('div');
    const particles = ['🚀', '📈', '💎', '🔥', '⚡', '💰', '🌙', '🐐'];
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    
    particle.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        font-size: ${20 + Math.random() * 20}px;
        pointer-events: none;
        z-index: 9999;
        animation: degenCelebration 3s ease-out forwards;
        filter: drop-shadow(0 0 15px rgba(255, 0, 255, 0.8));
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 3000);
    
    // Add particle animation if not exists
    if (!document.getElementById('degen-celebration-particle-styles')) {
        const style = document.createElement('style');
        style.id = 'degen-celebration-particle-styles';
        style.textContent = `
            @keyframes degenCelebration {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                25% {
                    transform: scale(1.5) rotate(180deg);
                    opacity: 1;
                }
                75% {
                    transform: scale(1) rotate(540deg) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(0) rotate(720deg) translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Make functions global for HTML access
window.copyContract = copyContract;