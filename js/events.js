// Project data structure
const projectData = {
    'peak-predict': {
        title: 'Peak Predict',
        description: 'Financial Market Prediction Platform using machine learning algorithms and real-time market data analysis. This platform provides users with advanced predictive analytics for various financial markets.',
        images: [
            '/images/image.png',
            '/images/Screenshot 2023-07-09 194653.png',
            '/images/Screenshot 2023-05-15 011526.png'
        ],
        sourceCode: 'https://github.com/example/peak-predict'
    },
    'matranord': {
        title: 'Matranord',
        description: 'Truck tracking mobile application with real-time GPS monitoring and route optimization.',
        images: [
            '/images/image.jpg',
            '/images/Screenshot 2023-07-09 194653.png',
            '/images/Screenshot 2023-05-15 011526.png'
        ],
        sourceCode: 'https://github.com/example/matranord'
    }
    // Add more projects as needed
};

let currentSlide = 0;
let currentProject = null;

function openProjectModal(projectId) {
    currentProject = projectId;
    currentSlide = 0;
    const modal = document.getElementById('projectModal');
    const project = projectData[projectId];
    
    // Update modal content
    document.getElementById('modalProjectTitle').textContent = project.title;
    document.getElementById('modalProjectDescription').textContent = project.description;
    document.getElementById('sourceCode').href = project.sourceCode;
    
    // Create carousel slides
    const track = document.querySelector('.carousel-track');
    track.innerHTML = '';
    project.images.forEach(src => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `<img src="${src}" alt="${project.title} screenshot">`;
        track.appendChild(slide);
    });
    
    updateSlidePosition();
    modal.style.display = 'block';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
}

function moveSlide(direction) {
    const project = projectData[currentProject];
    const totalSlides = project.images.length;
    
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSlidePosition();
}

function updateSlidePosition() {
    const track = document.querySelector('.carousel-track');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
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
});
