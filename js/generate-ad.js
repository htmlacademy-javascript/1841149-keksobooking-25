import { ADS } from './data.js';
const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('.popup');
const photoTemplate = templateFragment.querySelector('.popup__photo');
const fragment = document.createDocumentFragment();
const TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

function createAd({offer, author}) {
  const element = template.cloneNode(true);
  element.querySelector('.popup__title').textContent = offer.title;
  element.querySelector('.popup__text--address').textContent = offer.adress;
  if(offer.price) {
    element.querySelector('.popup__text--price').innerHTML = `${offer.price} ₽/ночь`;
  } else {
    element.querySelector('.popup__text--price').innerHTML = '';
  }
  element.querySelector('.popup__type').textContent = TYPE[offer.type];
  if(offer.rooms && offer.guests) {
    element.querySelector('.popup__text--capacity').innerHTML = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    element.querySelector('.popup__text--capacity').innerHTML = '';
  }
  if(offer.checkin && offer.checkout) {
    element.querySelector('.popup__text--time').innerHTML = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    element.querySelector('.popup__text--time').innerHTML = '';
  }
  if(offer.features) {
    element.querySelectorAll('.popup__feature').forEach((featureListItem) => {
      const isNecessary = offer.features.some(
        (feature) => featureListItem.classList.contains(`popup__feature--${feature}`)
      );
      if(!isNecessary){
        featureListItem.remove();
      }
    });
  } else {
    element.querySelector('.popup__features').innerHTML = '';
  }
  element.querySelector('.popup__description').textContent = offer.description;
  if(offer.photos) {
    element.querySelector('.popup__photos').innerHTML = '';
    offer.photos.forEach( (photo) => {
      const item = photoTemplate.cloneNode(true);
      item.src = photo;
      element.querySelector('.popup__photos').append(item);
    });
  } else {
    element.querySelector('.popup__photos').innerHTML = '';
  }
  if(author.avatar) {
    element.querySelector('.popup__avatar').src = author.avatar;
  } else {
    element.querySelector('.popup__avatar').remove();
  }
  return element;
}

ADS.forEach((ad) => fragment.append(createAd(ad)));

document.querySelector('#map-canvas').append(fragment);
