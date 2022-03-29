let message;

const isEscapeKey = (evt) => evt.key === 'Escape';

const onErrorPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup('error');
  }
};

const onSuccessPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup('success');
  }
};

function closePopup (elementClassName) {
  document.querySelector(`.${elementClassName}`).remove();
  if (elementClassName === 'error') {
    return document.removeEventListener('keydown', onErrorPopupEscKeydown);
  }
  document.removeEventListener('keydown', onSuccessPopupEscKeydown);
}

const onPopupClick = (elementClassName) => {
  document.body.append(message);
  document.querySelector(`.${elementClassName}`).addEventListener('click', () => closePopup(elementClassName));
  if (elementClassName === 'error') {
    return document.addEventListener('keydown', onErrorPopupEscKeydown);
  }
  document.addEventListener('keydown', onSuccessPopupEscKeydown);
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
