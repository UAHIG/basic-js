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
    this.checkArguments(message, key);

    const encryptedMessage = this.processMessage(message, key, 'encrypt');
    return this.isDirect ? encryptedMessage : encryptedMessage.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    this.checkArguments(encryptedMessage, key);

    const decryptedMessage = this.processMessage(encryptedMessage, key, 'decrypt');
    return this.isDirect ? decryptedMessage : decryptedMessage.split('').reverse().join('');
  }

  processMessage(message, key, operation) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i].toUpperCase();

      if (alphabet.includes(char)) {
        const keyChar = key[keyIndex % key.length].toUpperCase();
        const keyShift = operation === 'encrypt' ? alphabet.indexOf(keyChar) : alphabet.length - alphabet.indexOf(keyChar);
        const shiftedChar = this.shiftCharacter(char, keyShift, alphabet);
        result += shiftedChar;
        keyIndex++;
      } else {
        result += char;
      }
    }

    return result;
  }

  shiftCharacter(char, shift, alphabet) {
    const charIndex = alphabet.indexOf(char);
    const shiftedIndex = (charIndex + shift) % alphabet.length;
    return alphabet[shiftedIndex];
  }

  checkArguments(message, key) {
    if (!message || !key) {
      throw new Error('Both message and key are required.');
    }
  }
}

module.exports = VigenereCipheringMachine;

