function getRandomNumber(min, max) {
  min = Math.abs(min);
  max = Math.abs(max);
  if (min === max) {
    return min;
  } else if (min > max) {
    return 'Incorrect range. Your minimun number is greater than maximum';
  }
  return (Math.random() * (max - min + 1) + min);
}

function getRoundedRandomNumber(min, max) {
  return isNaN(getRandomNumber(min, max)) ? 'Incorrect range' : Math.floor(getRandomNumber(min, max));
}

function getRandomNumberWithFloat(min,max,floatNumber = 1) {
  return isNaN(getRandomNumber(min, max)) ? 'Incorrect range' : +(getRandomNumber(min, max).toFixed(floatNumber));
}

getRoundedRandomNumber(1, 10);
getRandomNumberWithFloat(1, 10, 2);