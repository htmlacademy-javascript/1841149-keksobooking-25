import { onPopupEscKeydown } from './util.js';
let message;

const closePopup = (elementClassName) => {
  document.querySelector(`.${elementClassName}`).remove();
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const onPopupClick = (elementClassName) => {
  document.body.append(message);
  document.querySelector(`.${elementClassName}`).addEventListener('click', () => closePopup(elementClassName));
  document.addEventListener('keydown', () => onPopupEscKeydown(event, `${elementClassName}`));
};

const successPopup = () => {
  message = document.querySelector('#success').content.cloneNode(true);
  onPopupClick('success');
};

const errorPopup = () => {
  message = document.querySelector('#error').content.cloneNode(true);
  onPopupClick('error');
};

export { successPopup, errorPopup, closePopup };
