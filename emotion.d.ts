import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      main: {
        purple100: string;
        purple40: string;
        purpledim100: string;
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
