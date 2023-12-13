const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  const obj1 = {};
  const obj2 = {};

  for (const letter of s1) {
    obj1[letter] = (obj1[letter] || 0) + 1;
  }
  let commonCount = 0;
  for (const letter of s2) {
    if (obj1[letter] > 0) {
      obj1[letter]--;
      commonCount++;
    } else {
      obj2[letter] = (obj2[letter] || 0) + 1;
    }
  }

  return commonCount;
}

module.exports = {
  getCommonCharacterCount
};
