module.exports = function average(array) {
  "use strict";
  let sum = 0
  for (let i = 0; i < array.length; i++) {
    sum += array[i]
  }
  return sum / array.length
}
