import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      main: {
        orange50: string;
        blue50: string;
        purple100: string;
        purple40: string;
        purpledim100: string;
        purpledim20: string;
      };
      sub: {
        red: string;
        green: string;
        yellow: string;
      };
      grayscale: {
        black100: string;
        black80: string;
        black60: string;
        black40: string;
        realwhite: string;
        white100: string;
        gray10: string;
        gray20: string;
        gray30: string;
        gray40: string;
        gray60: string;
        gray80: string;
        gray100: string;
      };
    };
  }
}
