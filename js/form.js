import { slider } from './slider.js';
const AD_FORM = document.querySelector('.ad-form');
const FILTERS_FORM = document.querySelector('.map__filters');
const price = document.querySelector('#price');
const type = document.querySelector('#type');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const rooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const avatar = document.querySelector('#avatar');
const preview = document.querySelector('.ad-form-header__preview');
const photos = document.querySelector('#images');
const photosContainer = document.querySelector('.ad-form__photo-container');
const typePrice = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};
guests.value = rooms.value;

const toggleClass = (element, className, value) => {
  element.classList.toggle(className, value);
};

const toggleFormElements = (formElements, value) => {
  formElements.forEach((element) => {element.disabled = value;});
};

const toggleAdForm = (value) => {
  toggleClass(AD_FORM, 'ad-form--disabled', value);
  toggleFormElements(AD_FORM.querySelectorAll('fieldset'), value);
};

const toggleFiltersForm = (value) => {
  toggleClass(FILTERS_FORM, 'map__filters--disabled', value);
  toggleFormElements(FILTERS_FORM.querySelectorAll('select, .map__features'), value);
};

const deactivateForms = () => {
  toggleAdForm(true);
  toggleFiltersForm(true);
};

const activateForms = () => {
  toggleAdForm(false);
  toggleFiltersForm(false);
};

const handleFileSelect = (evt) => {
  const file = evt.target.files;
  const f = file[0];
  const reader = new FileReader();
  reader.onload = (function() {
    return function(e) {
      preview.innerHTML = `<img width='40' height='44' src='${e.target.result}'/>`;
    };
  })(f);
  reader.readAsDataURL(f);
};
//Разобратсься как выводить превью нескольких изображений
function handleMultiFileSelect(evt) {
  const files = evt.target.files;
  for (var i = 0, f; f = files[i]; i++) {
    const reader = new FileReader();
    reader.onload = (function () {
      return function (e) {
        const div = document.createElement('div');
        div.classList.add('ad-form__photo');
        div.innerHTML = `<img width='60' height='60' src='${e.target.result}'/>`;
        photosContainer.insertBefore(div, null);
      };
    })(f);
    reader.readAsDataURL(f);
  }
}
//Код двух функций взят из https://xn--d1acnqm.xn--j1amh/%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B8/%D0%B2%D1%8B%D0%B2%D0%BE%D0%B4-%D0%BF%D1%80%D0%B5%D0%B2%D1%8C%D1%8E-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9-%D0%BF%D0%B5%D1%80%D0%B5%D0%B4-%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%BE%D0%B9-%D1%81-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-javascript-%D0%B8-html5-filereader

price.addEventListener('change', () => {
  slider.noUiSlider.set(this.value);
});

type.addEventListener('change', () => {
  price.placeholder = typePrice[type.value];
  price.min = typePrice[type.value];
  slider.noUiSlider.set(typePrice[type.value]);
});

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

rooms.addEventListener('change', () => {
  if (rooms.value === '100') {
    guests.value = '0';
    return;
  }
  guests.value = rooms.value;
});

guests.addEventListener('change', () => {
  if (guests.value === '0') {
    rooms.value = '100';
    return;
  }
  rooms.value = guests.value;
});

avatar.addEventListener('change', handleFileSelect, false);
photos.addEventListener('change', handleMultiFileSelect, false);

export { deactivateForms, activateForms, price, typePrice };
