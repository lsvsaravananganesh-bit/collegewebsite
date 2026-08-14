let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function renderSlide(index) {
  if (!slides.length) return;
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

function changeSlide(direction) {
  renderSlide(currentSlide + direction);
  restartSlider();
}

function goToSlide(index) {
  renderSlide(index);
  restartSlider();
}

let slideInterval = setInterval(() => renderSlide(currentSlide + 1), 6000);
function restartSlider() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => renderSlide(currentSlide + 1), 6000);
}

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

document.querySelectorAll('.has-dropdown > a').forEach(link => {
  link.addEventListener('click', event => {
    if (window.innerWidth <= 650) {
      event.preventDefault();
      link.parentElement.classList.toggle('open');
    }
  });
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 650 && !link.parentElement.classList.contains('has-dropdown')) {
      navLinks.classList.remove('open');
    }
  });
});
