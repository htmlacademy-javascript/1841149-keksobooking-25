const AD_FORM = document.querySelector('.ad-form');
const FILTERS_FORM = document.querySelector('.map__filters');

const addClass = (element, clas) => {element.classList.add(clas);};

const removeClass = (element, clas) => {element.classList.remove(clas);};

const disableFiltersForm = (value) => {FILTERS_FORM.querySelectorAll('select, .map__features').forEach((element) => {element.disabled = value;});};

const disableAdForm = (value) => {AD_FORM.querySelectorAll('fieldset').forEach((element) => {element.disabled = value;});};

const deactivateAdForm = () => {
  addClass(AD_FORM, 'ad-form--disabled');
  disableAdForm(true);
};

const activateAdForm = () => {
  removeClass(AD_FORM, 'ad-form--disabled');
  disableAdForm(false);
};

const deactivateFiltersForm = () => {
  addClass(FILTERS_FORM, 'map__filters--disabled');
  disableFiltersForm(true);
};

const activateFiltersForm = () => {
  removeClass(FILTERS_FORM, 'map__filters--disabled');
  disableFiltersForm(false);
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
