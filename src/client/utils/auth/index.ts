import CryptoJS from "crypto-js";

import type { PublicUserData } from "./types";

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
  static get isAuthenticated() {
    return this.accessToken !== `` && this.refreshToken !== `` && this.user !== undefined;
  }
  static get user() {
    const data = window.localStorage.getItem(`user`);
    if (data !== null) {
      try {
        return JSON.parse(
          CryptoJS.AES.decrypt(data, process.env.NEXT_PUBLIC_KEY).toString(CryptoJS.enc.Utf8),
        );
      } catch (error) {
        return undefined;
      }
    }
  }
  static set user(value: PublicUserData | undefined) {
    window.localStorage.setItem(
      `user`,
      CryptoJS.AES.encrypt(JSON.stringify(value), process.env.NEXT_PUBLIC_KEY).toString(),
    );
  }
}
