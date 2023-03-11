// header search

function setSearch(params) {
  const openBtn = document.querySelector(`.${params.openBtnClass}`);
  const search = document.querySelector(`.${params.searchClass}`);
  const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

  search.addEventListener("animationend", function (evt) {
    if (this._isOpened) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
      this._isOpened = false;
    } else {
      this._isOpened = true;
    }
  });

  search.addEventListener('click', function (evt) {
    evt._isSearch = true;
  });

  openBtn.addEventListener("click", function (evt) {
    this.disabled = true;
    this.style.opacity = 0;

    if (
      !search.classList.contains(params.activeClass) &&
      !search.classList.contains(params.hiddenClass)
    ) {
      search.classList.add(params.activeClass);
    }
  });

  closeBtn.addEventListener('click', function () {
    openBtn.disabled = false;
    openBtn.style.opacity = '';
    search.classList.add(params.hiddenClass);
  });

  document.body.addEventListener('click', function (evt) {
    if (!evt._isSearch && search._isOpened) {
      openBtn.disabled = false;
      openBtn.style.opacity = '';
      search.classList.add(params.hiddenClass);
    }
  });
}

setSearch({
  openBtnClass: "js-open-search", // класс кнопки открытия
  closeBtnClass: "js-close", // класс кнопки закрытия
  searchClass: "js-form", // класс формы поиска
  activeClass: "is-opened", // класс открытого состояния
  hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
});

// scroll

const MOBILE_WIDTH = 580;
// const TABLET_WIDTH = 1280;

function getWindowWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth
  );
}

function scrollToContent(link, isMobile) {
  if (isMobile && getWindowWidth() > window.MOBILE_WIDTH) {
    return;
  }

  const href = link.getAttribute('href').substring(1);
  const scrollTarget = document.getElementById(href);
  const elementPosition = scrollTarget.getBoundingClientRect().top;

  window.scrollBy({
    top: elementPosition,
    behavior: 'smooth'
  });
}

document.querySelectorAll('.js-scroll-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    scrollToContent(this, false);
  });
});

window.MOBILE_WIDTH = MOBILE_WIDTH;

// accordion

$(function () {
  $("#accordion").accordion({
    heightStyle: "content",
    collapsible: true,
  });
});

// tabs

$('.tab a').on('click', function (e) {
  e.preventDefault();

  $('.tab a').removeClass('active');
  $(this).addClass('active');

  let href = $(this).attr('href');
  $('.tabs__card').removeClass('active').removeClass('in');
  $(href).addClass('active');

  setTimeout(function () {
    $(href).addClass('in');
  }, 100);
});

// header bottom menu

const params = {
  btnClassName: "js-header-dropdown-btn",
  dropClassName: "js-header-drop",
  activeClassName: "is-active",
  disabledClassName: "is-disabled"
}

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(params.disabledClassName, params.activeClassName);
    evt.target.removeEventListener("animationend", onDisable);
  }
}

function setMenuListener() {
  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(`.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`);

    if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName);
        } else {
          current.classList.add(params.disabledClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(`.${params.dropClassName}[data-target="${path}"]`);

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
        drop.addEventListener("animationend", onDisable);
      } else {
        drop.classList.add(params.disabledClassName);
      }
    }
  });
}

setMenuListener();

// map

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.75846806898367, 37.60108849999989],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 14,
    controls: ['geolocationControl', 'zoomControl']
  },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition: { top: "330px", right: "10px" },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "259px", right: "10px" }
    }
  );

  myMap.behaviors.disable('scrollZoom');

  // Создание геообъекта с типом точка (метка).

  var myPlacemark = new ymaps.Placemark([55.75846806898367, 37.60108849999989], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/location.svg',
    iconImageSize: [20, 20]
  })

  // Размещение геообъекта на карте.
  myMap.geoObjects.add(myPlacemark);
}

// choices

const element = document.querySelector('#selectCustom');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: '',
  position: 'bottom',

  classNames: {
    containerOuter: 'filter-choices gallery__choices',
    containerInner: 'filter-choices__inner',
    input: 'filter-choices__input',
    inputCloned: 'filter-choices__input--cloned',
    list: 'filter-choices__list',
    listItems: 'filter-choices__list--multiple',
    listSingle: 'filter-choices__list--single',
    listDropdown: 'filter-choices__list--dropdown',
    item: 'filter-choices__item',
    itemSelectable: 'filter-choices__item--selectable',
    itemDisabled: 'filter-choices__item--disabled',
    itemOption: 'filter-choices__item--choice',
    group: 'filter-choices__group',
    groupHeading: 'filter-choices__heading',
    button: 'filter-choices__button',
    activeState: 'is-active',
    focusState: 'is-focused',
    openState: 'is-open',
    disabledState: 'is-disabled',
    highlightedState: 'is-highlighted',
    selectedState: 'is-selected',
    flippedState: 'is-flipped',
    selectedState: 'is-highlighted',
  },
});

// tooltip

tippy('.tooltip-container', {
  theme: 'lilac',
  maxWidth: 264,
  animation: 'scale',
  trigger: 'click'
});

// debounce

function debounce(f, ms) {

  let isCooldown = false;

  return function () {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };

}

window.debounce = debounce;




