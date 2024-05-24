import CryptoJS from "crypto-js";

type User = {
  id: number;
  name: string;
};

export abstract class Auth {
  static get accessToken() {
    return window.localStorage.getItem(`accessToken`) || ``;
  }
  static set accessToken(value: string) {
    window.localStorage.setItem(`accessToken`, value);
  }
  static get refreshToken() {
    return window.localStorage.getItem(`refreshToken`) || ``;
  }
  static set refreshToken(value: string) {
    window.localStorage.setItem(`refreshToken`, value);
  }
  static get user() {
    const data = window.localStorage.getItem(`user`);
    if (data !== null) {
      return JSON.parse(CryptoJS.AES.decrypt(data, `CHAVEPUBLICA`).toString(CryptoJS.enc.Utf8));
    }
  }
  static set user(value: User | undefined) {
    window.localStorage.setItem(
      `user`,
      CryptoJS.AES.encrypt(JSON.stringify(value), `CHAVEPUBLICA`).toString(),
    );
  }
}
