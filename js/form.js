const AD_FORM = document.querySelector('.ad-form');
const FILTERS_FORM = document.querySelector('.map__filters');

const addClass = (element, clas) => {element.classList.add(clas);};

const removeClass = (element, clas) => {element.classList.remove(clas);};

const disableFormElements = (formElements, value) => {formElements.forEach((element) => {element.disabled = value;});};

const deactivateAdForm = () => {
  addClass(AD_FORM, 'ad-form--disabled');
  disableFormElements(AD_FORM.querySelectorAll('fieldset'), true);
};

const activateAdForm = () => {
  removeClass(AD_FORM, 'ad-form--disabled');
  disableFormElements(AD_FORM.querySelectorAll('fieldset'), false);
};

const deactivateFiltersForm = () => {
  addClass(FILTERS_FORM, 'map__filters--disabled');
  disableFormElements(FILTERS_FORM.querySelectorAll('select, .map__features'), true);
};

const activateFiltersForm = () => {
  removeClass(FILTERS_FORM, 'map__filters--disabled');
  disableFormElements(FILTERS_FORM.querySelectorAll('select, .map__features'), false);
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
