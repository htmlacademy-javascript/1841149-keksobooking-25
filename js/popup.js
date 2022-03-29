let message;

const isEscapeKey = (evt) => evt.key === 'Escape';

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onPopupAndDocument();
  }
};

function onPopupAndDocument() {
  document.querySelector('.popup').remove();
  document.removeEventListener('keydown', onDocumentEscKeydown);
}

const showPopup = () => {
  document.body.append(message);
  document.querySelector('.popup').addEventListener('click', onPopupAndDocument);
  document.addEventListener('keydown', onDocumentEscKeydown);
};

const successPopup = () => {
  message = document.querySelector('#success').content.cloneNode(true);
  showPopup();
};

const errorPopup = () => {
  message = document.querySelector('#error').content.cloneNode(true);
  showPopup();
};

export { successPopup, errorPopup };
