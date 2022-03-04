import {getRoundedRandomNumber} from './get-random-numbers.js';

function getRandomArray(source) {
  const array = [];
  const max = getRoundedRandomNumber(1, source.length);
  while (array.length < max) {
    const element = source[getRoundedRandomNumber(0, source.length-1)];
    if(!array.includes(element)) {
      array.push(element);
    }
  }
  return array;
}

const getRandomArrayElement = (elements) => elements[getRoundedRandomNumber(0, elements.length - 1)];

export {getRandomArray, getRandomArrayElement};
