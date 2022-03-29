const ERROR_SHOW_TIME = 5000;
const submitButton = document.querySelector('.ad-form__submit');

const showError = (error) => {
  const errorContainer = document.createElement('div');
  errorContainer.classList.add('error-container');
  errorContainer.textContent = error;

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, ERROR_SHOW_TIME);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

export { showError, blockSubmitButton, unblockSubmitButton };
