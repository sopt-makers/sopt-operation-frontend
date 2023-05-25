import { IncomingMessage } from 'http';

type ITokenType = 'ACCESS' | 'REFRESH';

export const TOKEN_KEY: Record<ITokenType, string> = {
  ACCESS: 'ACCESS_TOKEN',
  REFRESH: 'refreshToken',
};

export const getToken = (type: ITokenType) =>
  getCookie(TOKEN_KEY[type], document.cookie);

export const setToken = (type: ITokenType, token: string, expiresIn?: number) =>
  setCookie(TOKEN_KEY[type], token, expiresIn);

export const setCookie = (name: string, value: string, expiresIn?: number) => {
  if (expiresIn) {
    const date = new Date();
    date.setTime(date.getTime() + expiresIn * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
  } else {
    document.cookie = `${name}=${value};path=/`;
  }
};

export const getCookie = (cookieName: string, cookie: string) => {
  const name = cookieName + '=';
  const decodedCookie = decodeURIComponent(cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const destroyToken = (type: ITokenType) => {
  setCookie(TOKEN_KEY[type], '', 0);
};

export const getAuthHeader = (req?: IncomingMessage): AuthHeader => {
  const token =
    req && req.headers.cookie
      ? getCookie(TOKEN_KEY.ACCESS, req.headers.cookie)
      : typeof window !== 'undefined'
      ? getCookie(TOKEN_KEY.ACCESS, document.cookie)
      : '';

  const header: AuthHeader = { Authorization: token };
  return header;
};

export const getBearerTokenAuthHeader = (req?: IncomingMessage): AuthHeader => {
  return { Authorization: `Bearer ${getAuthHeader(req).Authorization}` };
};
