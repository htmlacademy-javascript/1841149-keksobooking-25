import {OFFERS} from './data.js';
import {createOffer} from './offer.js';
import './util.js';
const FRAGMENT = document.createDocumentFragment();

OFFERS.forEach((offer) => FRAGMENT.append(createOffer(offer)));

document.querySelector('#map-canvas').append(FRAGMENT);
