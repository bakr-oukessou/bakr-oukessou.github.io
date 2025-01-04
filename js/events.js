const projectData = {
    'peak-predict': {
        title: 'Peak Predict',
        description: 'Financial Market Prediction Platform with advanced analytics and real-time data visualization.',
        images: [
            '/images/image.png',
            '/images/Screenshot 2023-05-15 011526.png',
            '/images/Screenshot 2023-05-15 011526.png'
        ],
        liveDemo: 'https://peak-predict-demo.com',
        sourceCode: 'https://github.com/3pacc/E-TRADIFY'
    }
    // Add more projects here
};

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const project = projectData[projectId];
    
    // Set project details
    document.getElementById('modalProjectTitle').textContent = project.title;
    document.getElementById('modalProjectDescription').textContent = project.description;
    document.getElementById('liveDemo').href = project.liveDemo;
    document.getElementById('sourceCode').href = project.sourceCode;
    
    // Create carousel slides
    const track = document.querySelector('.carousel-track');
    track.innerHTML = '';
    project.images.forEach(image => {
        track.innerHTML += `
            <div class="carousel-slide">
                <img src="${image}" alt="${project.title}">
            </div>
        `;
    });
    
    modal.style.display = 'block';
}

// Close modal when clicking the close button or outside the modal
document.querySelector('.close-modal').onclick = () => {
    document.getElementById('projectModal').style.display = 'none';
};

window.onclick = (event) => {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Carousel Navigation
let currentSlide = 0;
document.querySelector('.next-btn').onclick = () => {
    const track = document.querySelector('.carousel-track');
    const slides = track.children;
    currentSlide = (currentSlide + 1) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
};

document.querySelector('.prev-btn').onclick = () => {
    const track = document.querySelector('.carousel-track');
    const slides = track.children;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
};