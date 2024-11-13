import Cap from 'cap';
import ParallaxBackground from 'ParallaxBackground';
import Vivus from 'vivus';
import AOS from 'aos';
import Atropos from 'atropos';
import Swiper from 'swiper';
import velocity from 'velocity-animate';
import Button from 'ButtonMenu';
import { cubicBezier, executeAtResolution, setEventHandler } from 'utils';

/* INIT */
// AOS
AOS.init();
// CAP
const cap = new Cap('#cap', {
  indent: 150,
  fixMenu: '#cap-fix'
});
document.addEventListener('scroll', () => {
	cap.handler();
})

// PARALAX BC HEADER
const headerParallax = new ParallaxBackground('.header');
const footerParallax = new ParallaxBackground('.footer-bc');

// Dashboard
if(window.innerWidth >= 768) {
  // Dashboard Animation
  const dashboardHeader = new Vivus('dashboard-header', { 
    type: 'delayed', 
    duration: 600, 
  });

  dashboardHeader.el.classList.add('start')

  // Animation Play and Init atropos
  dashboardHeader.play(7, function() {
    dashboardHeader.el.classList.remove('start');
    dashboardHeader.el.classList.add('finish');

    // Init Atropos
    const myAtropos = Atropos({
      el: '.header-atropos',
      activeOffset: 75,
      rotateXMax: 5,
      highlight: false,
      shadowOffset: 200,
      duration: 200
    });
  })
}

// Animation Hover 
const arrSocialIcons = document.querySelectorAll('.icon-social')

setEventHandler(arrSocialIcons, [
  {
    event: 'mousemove',
    handler: (el) => {
      el.classList.add('animate');
      console.log('onMouse')
    }
  },
  {
    event: 'click',
    handler: (el) => {
      el.classList.add('animate');
      console.log('onMouse')
    }
  },
  {
    event: 'animationend',
    handler: (el) => {
      el.classList.remove('animate');
      console.log('animationEnd')
    }
  }
])

// Init Swiper Price
const sliderPrice = new Swiper('.slider-price', {
  slidesPerView: 'auto',
  centeredSlides: true,
  initialSlide: 1,
  spaceBetween: 20,
  slideToClickedSlide: true,
  speed: 600,

  breakpoints: {
    1024: {
      spaceBetween: 0,
      slidesPerView: 3,

    }
  }
})

// Swiper Menu Button
executeAtResolution(1024, () => {
  const swiperMenuButtons = document.querySelectorAll('.button-menu');
  

  const swiperMenu = new Swiper('.swiper-menu', {
    slidesPerView: 'auto',
    initialSlide: 1,
    resistanceRatio: 0,
    slideToClickedSlide: true,
  });
  window.sw = swiperMenu;
  const btn = new Button(swiperMenuButtons[0], {
    targetEl: swiperMenu,
  });
  const btn1 = new Button(swiperMenuButtons[1], {
    targetEl: swiperMenu,
  });
  window.btn = btn;
  window.menu = swiperMenu;
})

// определение padding для swiper-menu__wrapper
const swiperMenuPaddingTop = document.querySelectorAll('.cap')[1].offsetHeight;

const swiperMenuWrapper = document.querySelector('.swiper-menu__container');
const header = document.querySelector('.header');

swiperMenuWrapper.style.setProperty('--height-cap', `${swiperMenuPaddingTop}px`);
header.style.setProperty('--height-cap', `${swiperMenuPaddingTop}px`);