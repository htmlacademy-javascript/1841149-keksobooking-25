import { showError } from './util.js';
import './slider.js';
import { setUserFromSubmit } from './form-validation.js';
import { createMarker } from './map.js';
import { openPopup } from './popup.js';
import { getData } from './api.js';

getData((offers) => {
  offers.slice(0, 10).forEach((point) => createMarker(point));
}, () => showError('Не удалось получить данные. Попробуйте ещё раз'));

setUserFromSubmit(() => openPopup('success'), () => openPopup('error'));
