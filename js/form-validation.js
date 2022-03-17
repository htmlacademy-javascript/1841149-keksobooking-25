import { typePrice } from './form.js';
const form = document.querySelector('.ad-form');
const price = document.querySelector('#price');
const rooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const accommodationType = document.querySelector('#type');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

const validatePrice = () => price.value >= typePrice[accommodationType.value];

const validateRoomsAndGuests = () => guests.value <= rooms.value;

const showPriceValidationError = () => `Минимальная цена должна быть больше ${typePrice[accommodationType.value]}`;

pristine.addValidator(price, validatePrice, showPriceValidationError);

pristine.addValidator(
  rooms,
  validateRoomsAndGuests,
  'Количество комнат должно быть меньше или равно количеству гостей'
);

pristine.addValidator(
  guests,
  validateRoomsAndGuests,
  'Количество гостей должно быть меньше или равно количеству комнат'
);

form.addEventListener('submit', (evt) => {
  if(pristine.validate()) {
    return true;
  }
  evt.preventDefault();
});
