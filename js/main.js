import './form.js';
import './slider.js';
import { setUserFromSubmit } from './form-validation.js';
import { renderMarkers } from './map.js';
import { successPopup, errorPopup } from './popup.js';
import { getData, showError } from './api.js';
import { setLivingType, setPrice, setRooms, setGuests, setFeatures, filterOffers } from './filters.js';
import { debounce } from './debounce.js';

getData((offers) => {
  renderMarkers(offers);
  setLivingType(debounce(
    () => renderMarkers(filterOffers(offers)),
    1000
  ));
  setPrice(debounce(
    () => renderMarkers(filterOffers(offers))
  ));
  setRooms(debounce(
    () => renderMarkers(filterOffers(offers))
  ));
  setGuests(debounce(
    () => renderMarkers(filterOffers(offers))
  ));
  setFeatures(debounce(
    () => renderMarkers(filterOffers(offers))
  ));
}, () => showError('Не удалось получить данные. Попробуйте ещё раз'));

setUserFromSubmit(successPopup, errorPopup);
