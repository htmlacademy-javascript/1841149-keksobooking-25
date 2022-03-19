import { activateForms, deactivateForms } from './form.js';
import { createOffer } from './offer.js';
import { OFFERS } from './data.js';
const mainPinSize = [52, 52];
const mainPinAnchorPosition = [26, 52];
const adPinSize = [40, 40];
const adPinAnchorPosition = [20, 40];
const basicLat = 35.6938;
const basicLng = 139.7034;
const basicMapScaling = 10;
const decimalPlace = 5;

const adress = document.querySelector('#address');
deactivateForms();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForms();
  })
  .setView({
    lat: basicLat,
    lng: basicLng,
  }, basicMapScaling );

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinMarker = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: mainPinSize,
  iconAnchor: mainPinAnchorPosition,
});

const adPin = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: adPinSize,
  iconAnchor: adPinAnchorPosition,
});

const marker = L.marker(
  {
    lat: basicLat,
    lng: basicLng,
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
  adress.value = `${coordinates.lat.toFixed(decimalPlace)}, ${coordinates.lng.toFixed(decimalPlace)}`;
});

OFFERS.forEach((point) => {
  createMarker(point);
});
