import './form.js';
import './slider.js';
import { setUserFromSubmit } from './form-validation.js';
import { renderMarkers, toggleForms, loadMap, toggleFiltersForm } from './map.js';
import { showSuccessPopup, showErrorPopup } from './popup.js';
import { getData, showError } from './api.js';
import { setMapFilters, filterOffers } from './filters.js';
import { debounce } from './debounce.js';

toggleForms(true);

getData((offers) => {
  loadMap();
  setMapFilters(debounce(
    () => renderMarkers(filterOffers(offers)),
  ));
  renderMarkers(offers);
  toggleFiltersForm();
}, () => showError('Не удалось получить данные. Попробуйте ещё раз'));

setUserFromSubmit(showSuccessPopup, showErrorPopup);
