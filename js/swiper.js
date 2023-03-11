document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".gallery__swiper", {
    slidesPerView: 1,
    speed: 700,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: ".gallery .gallery-pagination",
      type: "fraction"
    },
    navigation: {
      nextEl: ".gallery-button-next",
      prevEl: ".gallery-button-prev",
      disabledClass: "gallery-button-disabled"
    },

    breakpoints: {
      441: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30
      },

      960: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 38
      },

      1024: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34
      },

      1280: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    }, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
  });
});

var mySwiper2 = new Swiper('.hero__swiper', {
  loop: true,
  speed: 900,
  effect: 'fade',
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
  },
});

var mySwiper3 = new Swiper('.events__swiper', {
  // Optional parameters
  slidesPerView: 1,
  speed: 700,
  pagination: {
    el: ".events .events-pagination",
    clickable: true,
  },
  breakpoints: {
    650: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30
    },

    960: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34
    },

    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 27
    },

    1280: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50
    }
  },

  // Navigation arrows
  navigation: {
    nextEl: '.ev-swiper-button-next',
    prevEl: '.ev-swiper-button-prev',
    disabledClass: "ev-button-disabled",
  },
});

var mySwiper4 = new Swiper('.projects__swiper', {
  // Optional parameters
  slidesPerView: 1,
  speed: 700,

  breakpoints: {
    600: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34
    },

    1024: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 50
    },

    1280: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50
    }
  },

  // Navigation arrows
  navigation: {
    nextEl: '.pr-swiper-button-next',
    prevEl: '.pr-swiper-button-prev',
    disabledClass: "pr-button-disabled",
  },
});
