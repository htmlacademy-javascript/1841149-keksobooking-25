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

const validatePrice = (value) => {
  const minPrice = typePrice[document.querySelector('#type').value];
  if (value >= minPrice) {
    return true;
  }
  return false;
};

const validateRoomsAndGuests = () => {
  const roomsCount = document.querySelector('#room_number').value;
  const guestsCount = document.querySelector('#capacity').value;
  if (guestsCount <= roomsCount) {
    return true;
  }
  return false;
};

// Разобраться с валидацией цены (форма валидируется правильно, не правильно показывается сообщение о неправильном минимальном значении)
pristine.addValidator(
  price,
  validatePrice,
  `Минимальная цена должна быть больше ${typePrice[document.querySelector('#type').value]}`
);

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
