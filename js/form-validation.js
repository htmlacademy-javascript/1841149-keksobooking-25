import { sendData } from './api.js';
import { typePrice } from './form.js';
import { showError } from './util.js';

const form = document.querySelector('.ad-form');
const price = document.querySelector('#price');
const rooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const accommodationType = document.querySelector('#type');
const submitButton = document.querySelector('.ad-form__submit');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
}, false);

const validatePrice = () => price.value >= typePrice[accommodationType.value];

const validateRoomsAndGuests = () => Number(rooms.value) === 100 && Number(guests.value) === 0 || Number(guests.value) <= Number(rooms.value) && Number(rooms.value) !== 100 && Number(guests.value) !== 0;

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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFromSubmit = (onSuccessm, onFail) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate()
    if(isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onFail();
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
}

export { setUserFromSubmit };
