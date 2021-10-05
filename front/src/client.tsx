import React from 'react';
import { render } from 'react-dom';
import App from '@layouts/App';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('app');

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement,
);
