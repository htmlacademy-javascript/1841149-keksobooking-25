import { markerGroup } from './map.js';

const livingTypeInput = document.querySelector('#housing-type');
const priceInput = document.querySelector('#housing-price');
const roomsInput = document.querySelector('#housing-rooms');
const guestsInput = document.querySelector('#housing-guests');
const featureInputs = document.querySelectorAll('.map__checkbox');

const setLivingType = (cb) => {
  livingTypeInput.addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

const setPrice = (cb) => {
  priceInput.addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

const setRooms = (cb) => {
  roomsInput.addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

const setGuests = (cb) => {
  guestsInput.addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

const setFeatures = (cb) => {
  featureInputs.forEach((el) => el.addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  }));
};

const filterByLivingType = ({offer}) => {
  if (livingTypeInput.value === 'any') {
    return offer;
  }
  if (offer.type === livingTypeInput.value) {
    return offer;
  }
};

const filterByPrice = ({offer}) => {
  if (priceInput.value === 'any') {
    return offer;
  } else if (priceInput.value === 'middle') {
    return offer.price >= 10000 && offer.price <= 50000;
  } else if (priceInput.value === 'low') {
    return offer.price <= 10000;
  } else if (priceInput.value === 'high') {
    return offer.price >= 50000;
  }
};

const filterByRooms = ({offer}) => {
  if (roomsInput.value === 'any') {
    return offer;
  } else if (roomsInput.value === '1') {
    return offer.rooms === 1;
  } else if (roomsInput.value === '2') {
    return offer.rooms === 2;
  } else if (roomsInput.value === '3') {
    return offer.rooms === 3;
  }
};

const filterByGuests = ({offer}) => {
  if (guestsInput.value === 'any') {
    return offer;
  } else if (guestsInput.value === '1') {
    return offer.guests === 1;
  } else if (guestsInput.value === '2') {
    return offer.guests === 2;
  } else if (guestsInput.value === '0') {
    return offer.guests === 0;
  }
};

const isEqualArrays = (a, b) => a.length === b.length && a.every((val, index) => val === b[index]);

const filterByFeatures = ({offer}) => {
  let elementFeatures = [];
  const checkedFilters = document.querySelector('.map__features').querySelectorAll('input:checked');
  if (checkedFilters.length === 0) {
    return offer;
  }
  if (offer.features !== undefined) {
    elementFeatures = offer.features;
    const filtersFeatures = [];
    checkedFilters.forEach((el) => filtersFeatures.push(el.value));
    return isEqualArrays(elementFeatures.sort(), filtersFeatures.sort());
  }
};

const filterOffers = (offers) => offers.filter((offer) => filterByLivingType(offer))
  .filter((offer) => filterByPrice(offer))
  .filter((offer) => filterByRooms(offer))
  .filter((offer) => filterByGuests(offer))
  .filter((offer) => filterByFeatures(offer));

export { setLivingType, setPrice, setRooms, setGuests, setFeatures, filterOffers };
