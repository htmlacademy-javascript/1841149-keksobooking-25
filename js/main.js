import {OFFERS} from './data.js';
import {createOffer, FRAGMENT} from './offer.js';
import './util.js';

OFFERS.forEach((offer) => FRAGMENT.append(createOffer(offer)));

document.querySelector('#map-canvas').append(FRAGMENT);
