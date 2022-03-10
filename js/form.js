const AD_FORM = document.querySelector('.ad-form');
const FILTERS_FORM = document.querySelector('.map__filters');

function toggleClass(element, clas){
  element.classList.toggle(clas);
}

const deactivateAdForm = () => {
  toggleClass(AD_FORM, 'ad-form--disabled');
  AD_FORM.querySelectorAll('fieldset').forEach((element) => {element.disabled = true;});
};

const activateAdForm = () => {
  toggleClass(AD_FORM, 'ad-form--disabled');
  AD_FORM.querySelectorAll('fieldset').forEach((element) => {element.disabled = false;});
};

const deactivateFiltersForm = () => {
  toggleClass(FILTERS_FORM, 'map__filters--disabled');
  FILTERS_FORM.querySelectorAll('select').forEach((element) => {element.disabled = true;});
  FILTERS_FORM.querySelectorAll('.map__checkbox').forEach((element) => {element.disabled = true;});
};

const activateFiltersForm = () => {
  toggleClass(FILTERS_FORM, 'map__filters--disabled');
  FILTERS_FORM.querySelectorAll('select').forEach((element) => {element.disabled = false;});
  FILTERS_FORM.querySelectorAll('.map__checkbox').forEach((element) => {element.disabled = false;});
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
