import { typePrice } from './form.js';
const form = document.querySelector('.ad-form');
const price = document.querySelector('#price');

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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправялть');
  } else {
    console.log('Форма невалидна');
  }
});

// Разобраться с валидацией цены (форма валидируется правильно, не правильно показывается сообщение о неправильном минимальном значении)
pristine.addValidator(
  price,
  validatePrice,
  `Минимальная цена должна быть больше ${typePrice[document.querySelector('#type').value]}`
);
