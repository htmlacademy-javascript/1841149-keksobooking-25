import './util.js';
import './slider.js';
import { setUserFromSubmit } from './form-validation.js';
import { createMarker } from './map.js';
import { openPopup } from './popup.js';
import { getData } from './api.js';

getData((offers) => {
  offers.slice(0, 10).forEach((point) => createMarker(point));
}, () => openPopup('error'));

setUserFromSubmit(() => openPopup('success'))
