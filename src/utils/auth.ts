import { IncomingMessage } from 'http';

type ITokenType = 'ACCESS' | 'REFRESH';

export const TOKEN_KEY: Record<ITokenType, string> = {
  ACCESS: 'ACCESS_TOKEN', // sessionStorage
  REFRESH: 'REFRESH_TOKEN', // Set-Cookie
};

export const getToken = (type: ITokenType): string => {
  switch (type) {
    case 'ACCESS':
      return getSessionStorageItem(TOKEN_KEY[type]);
    default:
      return '';
  }
};

export const setToken = (type: ITokenType, token: string) => {
  switch (type) {
    case 'ACCESS':
      return setSessionStorageItem(TOKEN_KEY[type], token);
  }
};

export const destroyToken = (type: ITokenType) => {
  switch (type) {
    case 'ACCESS':
      return removeSessionStorageItem(TOKEN_KEY[type]);
  }
};

const removeSessionStorageItem = (key: string) =>
  typeof window !== 'undefined' && sessionStorage.removeItem(key);

const setSessionStorageItem = (key: string, value: string) =>
  typeof window !== 'undefined' && sessionStorage.setItem(key, value);

const getSessionStorageItem = (key: string): string =>
  typeof window !== 'undefined' ? sessionStorage.getItem(key) || '' : '';

// const setCookie = (name: string, value: string, expiresIn?: number) => {
//   if (expiresIn) {
//     const date = new Date();
//     date.setTime(date.getTime() + expiresIn * 60 * 60 * 1000);
//     const expires = 'expires=' + date.toUTCString();
//     document.cookie = `${name}=${value};${expires};path=/`;
//   } else {
//     document.cookie = `${name}=${value};path=/`;
//   }
// };

// const getCookie = (cookieName: string, cookie: string) => {
//   const name = cookieName + '=';
//   const decodedCookie = decodeURIComponent(cookie);
//   const ca = decodedCookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return '';
// };

export const getAuthHeader = (): AuthHeader => {
  const token = getToken('ACCESS');
  const header: AuthHeader = { Authorization: token };
  return header;
};
