const AD_FORM = document.querySelector('.ad-form');
const FILTERS_FORM = document.querySelector('.map__filters');

const toggleClass = (element, className, value) => {
  element.classList.toggle(className, value);
};

const toggleFormElements = (formElements, value) => {
  formElements.forEach((element) => {element.disabled = value;});
};

const deactivateAdForm = () => {
  toggleClass(AD_FORM, 'ad-form--disabled', false);
  toggleFormElements(AD_FORM.querySelectorAll('fieldset'), true);
};

const activateAdForm = () => {
  toggleClass(AD_FORM, 'ad-form--disabled', true);
  toggleFormElements(AD_FORM.querySelectorAll('fieldset'), false);
};

const deactivateFiltersForm = () => {
  toggleClass(FILTERS_FORM, 'map__filters--disabled', true);
  toggleFormElements(FILTERS_FORM.querySelectorAll('select, .map__features'), true);
};

const activateFiltersForm = () => {
  toggleClass(FILTERS_FORM, 'map__filters--disabled', false);
  toggleFormElements(FILTERS_FORM.querySelectorAll('select, .map__features'), false);
};

const deactivateForms = () => {
  deactivateAdForm();
  deactivateFiltersForm();
};

const activateForms = () => {
  activateAdForm();
  activateFiltersForm();
};

export {deactivateForms, activateForms};
