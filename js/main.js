import {ADS} from './data.js';
import {createAd, FRAGMENT} from './ad.js';
import './util.js';

ADS.forEach((ad) => FRAGMENT.append(createAd(ad)));

document.querySelector('#map-canvas').append(FRAGMENT);
