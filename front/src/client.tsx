import React from 'react';
import { render } from 'react-dom';
import App from '@layouts/App';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { Global, ThemeProvider } from '@emotion/react';
import { global } from '@styles/global';
import { themeLib } from '@styles/themeLib';

const rootElement = document.getElementById('app');

render(
  <BrowserRouter>
    <SWRConfig value={{ revalidateOnFocus: false, revalidateOnReconnect: false }}>
      <Global styles={global} />
      <ThemeProvider theme={themeLib}>
        <App />
      </ThemeProvider>
    </SWRConfig>
  </BrowserRouter>,
  rootElement,
);
