import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';

import Home from '@/pages/index';
import theme from '@/styles/theme';

describe('Home', () => {
  test('<h1> 내부에 "웹 어드민 렛츠고."가 있는가?', () => {
    render(
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>,
    );
    const h1Text = screen.getByRole('heading').innerHTML;
    expect(h1Text).toBe('웹 어드민 렛츠고.');
  });
});
