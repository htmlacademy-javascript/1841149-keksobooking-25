import { activateForms, deactivateForms } from './form.js';
import { createOffer } from './offer.js';
import { OFFERS } from './data.js';
const MAIN_PIN_HEIGHT = 52;
const MAIN_PIN_WIDTH = 52;
const MAIN_PIN_ANCHOR_HEIGHT_POSITION = 26;
const MAIN_PIN_ANCHOR_WIDTH_POSITION = 52;
const AD_PIN_HEIGHT = 40;
const AD_PIN_WIDTH = 40;
const AD_PIN_ANCHOR_HEIGHT_POSITION = 20;
const AD_PIN_ANCHOR_WIDTH_POSITION = 40;
const BASIC_LAT = 35.6938;
const BASIC_LNG = 139.7034;
const BASIC_MAP_SCALING = 10;
const DECIMAL_PLACE = 5;

const adress = document.querySelector('#address');
deactivateForms();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForms();
  })
  .setView({
    lat: BASIC_LAT,
    lng: BASIC_LNG,
  }, BASIC_MAP_SCALING);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinMarker = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [MAIN_PIN_HEIGHT, MAIN_PIN_WIDTH],
  iconAnchor: [MAIN_PIN_ANCHOR_HEIGHT_POSITION, MAIN_PIN_ANCHOR_WIDTH_POSITION],
});

const adPin = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [AD_PIN_HEIGHT, AD_PIN_WIDTH],
  iconAnchor: [AD_PIN_ANCHOR_HEIGHT_POSITION, AD_PIN_ANCHOR_WIDTH_POSITION],
});

const marker = L.marker(
  {
    lat: BASIC_LAT,
    lng: BASIC_LNG,
  },
  {
    draggable: true,
    icon: mainPinMarker,
  },
);

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {location} = point;
  const adMarker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: adPin,
    },
  );
  adMarker
    .addTo(markerGroup)
    .bindPopup(createOffer(point));
};

marker.addTo(map);

marker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  adress.value = `${coordinates.lat.toFixed(DECIMAL_PLACE)}, ${coordinates.lng.toFixed(DECIMAL_PLACE)}`;
});

OFFERS.forEach((point) => {
  createMarker(point);
});
