const TEMPLATE_FRAGMENT = document.querySelector('#card').content;
const TEMPLATE = TEMPLATE_FRAGMENT.querySelector('.popup');
const PHOTO_TEMPLATE = TEMPLATE_FRAGMENT.querySelector('.popup__photo');
const FRAGMENT = document.createDocumentFragment();
const TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

function hideElement(element) {
  element.classList.add('hidden');
}

function addValue(element, value) {
  element.innerHTML = value;
}

function createAd({offer, author}) {
  const element = TEMPLATE.cloneNode(true);
  offer.title ?
    addValue(element.querySelector('.popup__title'), offer.title) :
    hideElement(element.querySelector('.popup__title'));
  offer.adress ?
    addValue(element.querySelector('.popup__text--address'), offer.adress) :
    hideElement(element.querySelector('.popup__text--address'));
  offer.price ?
    element.querySelector('.popup__text--price').innerHTML = `${offer.price} ₽/ночь` :
    hideElement(element.querySelector('.popup__text--price'));
  offer.type ?
    addValue(element.querySelector('.popup__type'), TYPE[offer.type]) :
    hideElement(element.querySelector('.popup__type'));
  offer.rooms && offer.guests ?
    element.querySelector('.popup__text--capacity').innerHTML = `${offer.rooms} комнаты для ${offer.guests} гостей` :
    hideElement(element.querySelector('.popup__text--capacity'));
  offer.checkin && offer.checkout ?
    element.querySelector('.popup__text--time').innerHTML = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` :
    hideElement(element.querySelector('.popup__text--time'));
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
    hideElement(element.querySelector('.popup__features'));
  }
  offer.description ?
    addValue(element.querySelector('.popup__description'), offer.description) :
    hideElement(element.querySelector('.popup__description'));
  if(offer.photos) {
    element.querySelector('.popup__photos').innerHTML = '';
    offer.photos.forEach( (photo) => {
      const item = PHOTO_TEMPLATE.cloneNode(true);
      item.src = photo;
      element.querySelector('.popup__photos').append(item);
    });
  } else {
    hideElement(element.querySelector('.popup__photos'));
  }
  author.avatar ?
    element.querySelector('.popup__avatar').src = author.avatar :
    hideElement(element.querySelector('.popup__avatar'));
  return element;
}

export {createAd, FRAGMENT};
