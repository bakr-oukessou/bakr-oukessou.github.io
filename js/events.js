// Project data structure
// Add a `links` entry ({ label, url }) for each public repo or live demo.
// Projects without links fall back to the GitHub profile.
const GITHUB_PROFILE = 'https://github.com/bakr-oukessou';

const projectData = {
    'iot-platform': {
        title: 'IoT Supervision Platform',
        meta: 'January 2025',
        description: 'Cloud-native platform for real-time monitoring, predictive analytics and fleet management of connected devices.',
        highlights: [
            'Machine-learning predictions in Python based on weather data.',
            'RabbitMQ, PostgreSQL, MongoDB and Redis behind a real-time React.js dashboard.',
            'Containerised and deployed with Docker and Kubernetes.'
        ],
        stack: ['Python', 'React', 'RabbitMQ', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes'],
        images: [],
        links: []
    },
    'peak-predict': {
        title: 'Peak Predict',
        meta: 'March – June 2024 · Final-year project',
        description: 'Cryptocurrency market monitoring platform that forecasts price trends.',
        highlights: [
            'Price-trend forecasting with XGBoost (Python).',
            'React front end backed by a Spring Boot API.'
        ],
        stack: ['Python', 'XGBoost', 'React', 'Spring Boot'],
        images: [
            'images/peak-predict.webp'
        ],
        links: []
    },
    'matranord': {
        title: 'Matranord',
        meta: 'June – September 2024 · STE Matranord, Tangier',
        description: 'Mobile app for freight forwarders to track transport and transit trucks in real time.',
        highlights: [
            'Task assignment for drivers.',
            'Driver and fleet management.',
            'Interactive map showing delivery progress.'
        ],
        stack: ['Mobile', 'Real-time tracking', 'Maps'],
        images: [
            'images/matranord.webp'
        ],
        links: []
    },
    'zitona': {
        title: 'Zitona',
        meta: '',
        description: 'Mobile app for olive growers to manage their plots: tree counts, irrigation, harvest and expenses in one place.',
        highlights: [],
        stack: ['Mobile'],
        images: [
            'images/zitona.webp'
        ],
        links: []
    }
};

let currentSlide = 0;
let currentProject = null;
let lastFocused = null;

function fillList(list, items, className) {
    list.innerHTML = '';
    items.forEach(text => {
        const li = document.createElement('li');
        if (className) li.className = className;
        li.textContent = text;
        list.appendChild(li);
    });
    list.hidden = items.length === 0;
}

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    currentProject = projectId;
    currentSlide = 0;
    lastFocused = document.activeElement;
    const modal = document.getElementById('projectModal');

    // Update modal content
    document.getElementById('modalProjectTitle').textContent = project.title;
    const meta = document.getElementById('modalProjectMeta');
    meta.textContent = project.meta;
    meta.hidden = !project.meta;
    document.getElementById('modalProjectDescription').textContent = project.description;
    fillList(document.getElementById('modalProjectHighlights'), project.highlights);
    fillList(document.getElementById('modalProjectStack'), project.stack, 'project-tag');

    const links = document.getElementById('modalProjectLinks');
    links.innerHTML = '';
    const projectLinks = project.links.length
        ? project.links
        : [{ label: 'More on GitHub', url: GITHUB_PROFILE }];
    projectLinks.forEach(({ label, url }) => {
        const a = document.createElement('a');
        a.className = 'project-link';
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = label;
        links.appendChild(a);
    });

    // Create carousel slides
    const track = document.querySelector('.carousel-track');
    track.innerHTML = '';
    project.images.forEach(src => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${project.title} screenshot`;
        slide.appendChild(img);
        track.appendChild(slide);
    });
    document.querySelector('.project-carousel').style.display = project.images.length ? '' : 'none';
    document.querySelectorAll('.carousel-btn').forEach(btn => {
        btn.style.display = project.images.length > 1 ? '' : 'none';
    });

    updateSlidePosition();
    modal.style.display = 'block';
    document.querySelector('.close-modal').focus();
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    if (lastFocused) lastFocused.focus();
}

function moveSlide(direction) {
    const project = projectData[currentProject];
    const totalSlides = project.images.length;
    if (totalSlides < 2) return;

    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSlidePosition();
}

function updateSlidePosition() {
    const track = document.querySelector('.carousel-track');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Contact form: submit through FormSubmit without leaving the page.
// Without JavaScript the form still posts to FormSubmit and redirects back.
function setupContactForm() {
    const form = document.getElementById('contact');
    const status = form.querySelector('.form__status');
    const button = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        button.disabled = true;
        status.textContent = 'Sending…';

        try {
            const response = await fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(form)
            });
            const result = await response.json();
            if (!response.ok || String(result.success) !== 'true') {
                throw new Error(result.message || 'Request failed');
            }
            form.reset();
            status.textContent = 'Thanks! Your message has been sent.';
        } catch (err) {
            status.textContent = 'Sorry, the message could not be sent. Please email me at bakr.oukessou@gmail.com.';
        } finally {
            button.disabled = false;
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-project]').forEach(btn => {
        btn.addEventListener('click', () => openProjectModal(btn.dataset.project));
    });

    // Close modal when clicking the close button
    document.querySelector('.close-modal').addEventListener('click', closeProjectModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.className === 'modal') {
            closeProjectModal();
        }
    });

    // Previous and Next buttons
    document.querySelector('.prev-btn').addEventListener('click', () => moveSlide(-1));
    document.querySelector('.next-btn').addEventListener('click', () => moveSlide(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('projectModal').style.display === 'block') {
            if (e.key === 'ArrowLeft') moveSlide(-1);
            if (e.key === 'ArrowRight') moveSlide(1);
            if (e.key === 'Escape') closeProjectModal();
        }
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const carousel = document.querySelector('.carousel-container');

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
            if (swipeDistance > 0) {
                moveSlide(-1); // Swipe right
            } else {
                moveSlide(1); // Swipe left
            }
        }
    }

    setupContactForm();
});
