import { adForm, resetMarker, renderMarkers } from './map.js';
import { mapFiltersForm } from './filters.js';
import { getData } from './api.js';
import { slider } from './slider.js';

const price = document.querySelector('#price');
const rooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const type = document.querySelector('#type');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const avatar = document.querySelector('#avatar');
const preview = document.querySelector('.ad-form-header__preview');
const avatarImg = preview.querySelector('img');
const photos = document.querySelector('#images');
const photosContainer = document.querySelector('.ad-form__photo-container');
const resetBtn = document.querySelector('.ad-form__reset');
const submitButton = document.querySelector('.ad-form__submit');
const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const TypePrice = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};
guests.value = rooms.value;

const createImage = (files) => {
  const reader = new FileReader();
  const div = document.createElement('div');
  const photo = document.createElement('img');
  div.classList.add('ad-form__photo');
  div.classList.add('photo');
  reader.addEventListener('load', () => {
    photo.src = reader.result;
    div.append(photo);
    photosContainer.append(div);
  });
  if (files) {
    return reader.readAsDataURL(files);
  }
  photo.src = DEFAULT_AVATAR;
};

const createAvatar = (file) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    avatarImg.src = reader.result;
  });
  if (file) {
    reader.readAsDataURL(file);
  }
  avatarImg.src = DEFAULT_AVATAR;
};

const handleFileSelect = (evt) => {
  const file = evt.target.files[0];
  createAvatar(file);
};

const handleMultiFileSelect = (evt) => {
  const files = evt.target.files;
  for(let i = 0; i <= files.length; i++) {
    createImage(files[i]);
  }
};

const resetForm = () => {
  adForm.reset();
  avatar.files.value = DEFAULT_AVATAR;
  avatarImg.src = DEFAULT_AVATAR;
  photos.files.value = '';
  const userPhotos = document.querySelectorAll('.photo');
  userPhotos.forEach((element) => element.remove());
  resetMarker();
  mapFiltersForm.reset();
  getData((offers) => renderMarkers(offers));
  slider.noUiSlider.reset();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

resetBtn.addEventListener('click', resetForm);

type.addEventListener('change', () => {
  price.placeholder = TypePrice[type.value];
  price.min = TypePrice[type.value];
});

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

avatar.addEventListener('change', handleFileSelect, false);
photos.addEventListener('change', handleMultiFileSelect, false);

export { price, TypePrice, resetForm, blockSubmitButton, unblockSubmitButton };
