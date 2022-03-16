import { typePrice } from './form.js';
const form = document.querySelector('.ad-form');
const price = document.querySelector('#price');
const rooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

const validatePrice = () => {
  const minPrice = typePrice[document.querySelector('#type').value];
  const priceInput = price.value;
  return priceInput >= minPrice;
};

const validateRoomsAndGuests = () => {
  const roomsCount = document.querySelector('#room_number').value;
  const guestsCount = document.querySelector('#capacity').value;
  return guestsCount <= roomsCount;
};

const showPriceValidationError = () => `Минимальная цена должна быть больше ${typePrice[document.querySelector('#type').value]}`;

// Разобраться с валидацией цены (форма валидируется правильно, не правильно показывается сообщение о неправильном минимальном значении) document.querySelector('#type').value
pristine.addValidator(
  price,
  validatePrice,
  showPriceValidationError
);

// 1. При изменении типа жилья меняется и минимальная цена валидации

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
