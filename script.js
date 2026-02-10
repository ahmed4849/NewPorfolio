// Navigation & Mobile Menu
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.list-none li a');
const menuIcon = document.querySelector('#menu-toggle');

// Toggle Mobile Menu
if (menuToggle && mobileMenu) {
    menuToggle.onclick = () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        if (isOpen) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            menuToggle.src = './assets/images/Design/menu.svg';
        } else {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            menuToggle.src = './assets/images/Design/close.svg';
        }
    };
}

function closeMenu() {
    if (mobileMenu && menuToggle) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        menuToggle.src = './assets/images/Design/menu.svg';
    }
}

// Scroll Effect for Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('bg-primary', 'bg-opacity-90', 'backdrop-blur-md');
        navbar.classList.remove('py-5', 'bg-transparent');
        navbar.classList.add('py-3');
    } else {
        navbar.classList.remove('bg-primary', 'bg-opacity-90', 'backdrop-blur-md', 'py-3');
        navbar.classList.add('py-5', 'bg-transparent');
    }
});

// Typing Animation
const typingText = document.getElementById('typing-text');
const roles = ["Angular/ReactJS & .NET Core Expert", "Senior Full-Stack Software Engineer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentRole = roles[roleIndex % roles.length];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex++;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', typeEffect);


// Intersection Observer for Fade-In Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

const fadeSections = document.querySelectorAll('.fade-in-section');
fadeSections.forEach(section => {
    observer.observe(section);
});


// Simple Tilt Effect
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -20; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// 3D Earth Animation
function initEarth() {
    const container = document.getElementById('earth-container');
    if (!container) return; // Exit if container doesn't exist

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create Earth Sphere
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00cea8, // Cyan/Teal color
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Create Inner Sphere (Core) to add depth
    const coreGeometry = new THREE.SphereGeometry(1.8, 16, 16);
    const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.9
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // Add Stars/Atmosphere (Particles) around Earth
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
    const starsVertices = [];
    for (let i = 0; i < 500; i++) {
        const x = (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 10;
        starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // Positioning
    camera.position.z = 5;

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        earth.rotation.y += 0.005;
        earth.rotation.x += 0.001;

        starField.rotation.y -= 0.002;

        renderer.render(scene, camera);
    }

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

// Command Deck Tab Switching Logic
function switchDeckTab(category) {
    // Update Tabs
    const tabs = document.querySelectorAll('.deck-tab');
    tabs.forEach(tab => {
        if (tab.getAttribute('onclick').includes(`'${category}'`)) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Update Panels
    const panels = document.querySelectorAll('.deck-panel');
    panels.forEach(panel => {
        if (panel.id === `deck-panel-${category}`) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initEarth();
});
