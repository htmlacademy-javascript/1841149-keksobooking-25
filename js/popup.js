import { onPopupEscKeydown } from './util.js';

const closePopup = (elementClassName) => {
  document.querySelector(`.${elementClassName}`).remove();
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const openPopup = (elementClassName) => {
  const messageTemplate = document.querySelector(`#${elementClassName}`).content;
  const message = messageTemplate.cloneNode(true);
  document.body.append(message);
  document.querySelector(`.${elementClassName}`).addEventListener('click', () => closePopup(elementClassName));
  document.addEventListener('keydown', () => onPopupEscKeydown(event, `${elementClassName}`));
};

export { openPopup, closePopup };
