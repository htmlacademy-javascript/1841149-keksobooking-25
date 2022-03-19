import { activateForms, deactivateForms } from './form.js';
import { createOffer } from './offer.js';
import { OFFERS } from './data.js';

const adress = document.querySelector('#address');
deactivateForms();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForms();
  })
  .setView({
    lat: 35.6938,
    lng: 139.7034,
  }, 10)

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinMarker = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const adPin = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const marker = L.marker(
  {
    lat: 35.6938,
    lng: 139.7034,
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
  .bindPopup(createOffer(point))
}

marker.addTo(map)

marker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  adress.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
});

OFFERS.forEach((point) => {createMarker(point)});
