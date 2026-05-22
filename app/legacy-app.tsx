'use client';

import { BrowserRouter } from 'react-router-dom';
import App from '../src/App';

export function LegacyApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
