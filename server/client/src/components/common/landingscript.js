function LandingScript() {
  const tabs = document.querySelectorAll('[data-tab-target]');
  const tabContents = document.querySelectorAll('[data-tab-content]');
  const tabIndicator = document.getElementsByClassName('tab-indicator')[0];

  tabs.forEach((tab, i) => {
    // added `i` the index variable to track the selected tab
    tab.addEventListener('click', () => {
      const target = document.querySelector(tab.dataset.tabTarget);

      tabContents.forEach((tabContent) => {
        tabContent.classList.remove('active');
      });
      target.classList.add('active');

      tabs.forEach((tabX) => {
        tabX.classList.remove('active');
      });
      tab.classList.add('active');
      target.classList.add('active');

      // shift the indicator based on the selected tab
      tabIndicator.style.left = `calc(calc(100% / 3) * ${i})`;
    });
  });
}
// CAROUSEL/SLIDESHOW

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName('mySlides');

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  slides[slideIndex - 1].style.display = 'flex';
}

// ACCORDION DROPDOWN
const acc = document.getElementsByClassName('accordion');
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].onClick = function () {
    this.classList.toggle('active');
    this.nextElementSibling.classList.toggle('show');
  };
}

export default LandingScript;
