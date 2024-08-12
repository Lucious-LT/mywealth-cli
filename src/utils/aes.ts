import CryptoJS from 'crypto-js';

export class Aes {
  private _keySize: number = 256;
  private _ivSize: number = 128;
  private _iterationCount: number = 4096;


  generateKey(salt: string, passPhrase: string ) {
    return CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), {
      keySize: this._keySize / 32,
      iterations: this._iterationCount
    })
  }

  encryptWithIvSalt(salt: string, iv: string, passPhrase: string ,
                    plainText:  string) {
    let key = this.generateKey(salt, passPhrase);
    let encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv: CryptoJS.enc.Hex.parse(iv)
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

  decryptWithIvSalt(salt: string, iv: string, passPhrase: string , cipherText: string) {
    let key = this.generateKey(salt, passPhrase);
    let cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(cipherText)
    });
    let decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
      iv: CryptoJS.enc.Hex.parse(iv)
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  encrypt(passPhrase: string , plainText:  string) {
    let iv = CryptoJS.lib.WordArray.random(this._ivSize / 8).toString(CryptoJS.enc.Hex);
    let salt = CryptoJS.lib.WordArray.random(this._keySize / 8).toString(CryptoJS.enc.Hex);
    let ciphertext = this.encryptWithIvSalt(salt, iv, passPhrase, plainText);
    return salt + iv + ciphertext;
  }

  decrypt(passPhrase: string , cipherText: string) {
    let ivLength = this._ivSize / 4;
    let saltLength = this._keySize / 4;
    let salt = cipherText.substr(0, saltLength);
    let iv = cipherText.substr(saltLength, ivLength);
    let encrypted = cipherText.substring(ivLength + saltLength);
    return this.decryptWithIvSalt(salt, iv, passPhrase, encrypted);
  }
}