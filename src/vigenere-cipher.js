const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */


class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Message and key are required');
    }

    const result = this.process(message, key, 'encrypt');
    return this.isDirect ? result.join('') : result.reverse().join('');
  }

  decrypt(message, key) {
    if (!message || !key) {
      throw new Error('Message and key are required');
    }

    const result = this.process(message, key, 'decrypt');
    return this.isDirect ? result.join('') : result.reverse().join('');
  }

  process(message, key, operation) {
    const messageUpper = message.toUpperCase();
    const keyUpper = key.toUpperCase();
    const result = [];
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = messageUpper[i];

      if (this.isAlphabetic(char)) {
        const shift = operation === 'encrypt' ? keyUpper[keyIndex % key.length].charCodeAt(0) - 'A'.charCodeAt(0) : 26 - (keyUpper[keyIndex % key.length].charCodeAt(0) - 'A'.charCodeAt(0));
        const encryptedChar = String.fromCharCode((char.charCodeAt(0) - 'A'.charCodeAt(0) + shift) % 26 + 'A'.charCodeAt(0));
        result.push(encryptedChar);
        keyIndex++;
      } else {
        result.push(char);
      }
    }

    return result;
  }

  isAlphabetic(char) {
    return /^[A-Za-z]$/.test(char);
  }
}


module.exports = {
  VigenereCipheringMachine
};
