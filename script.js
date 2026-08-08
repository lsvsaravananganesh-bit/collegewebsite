// Hero Image Slider Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

// Function to handle manual slide change
function changeSlide(direction) {
  // Remove active class from current slide
  slides[currentSlide].classList.remove('active');
  
  // Calculate next slide index
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  
  // Add active class to new slide
  slides[currentSlide].classList.add('active');
}

// Auto-advance slides every 5 seconds
let slideInterval = setInterval(() => {
  changeSlide(1);
}, 5000);

// Pause auto-sliding when a user clicks the controls
const buttons = document.querySelectorAll('.slider-btn');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    clearInterval(slideInterval); // Stop automatic sliding
    // Restart automatic sliding after 8 seconds of inactivity
    slideInterval = setInterval(() => {
      changeSlide(1);
    }, 8000);
  });
});
