let message;

const isEscapeKey = (evt) => evt.key === 'Escape';

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

function closePopup() {
  document.querySelector('.popup').remove();
  document.removeEventListener('keydown', onPopupEscKeydown);
}

const onPopupClick = (elementClassName) => {
  document.body.append(message);
  document.querySelector(`.${elementClassName}`).addEventListener('click', closePopup);
  document.addEventListener('keydown', onPopupEscKeydown);
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
