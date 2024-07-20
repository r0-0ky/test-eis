import React from 'react';
import ReactDOM from 'react-dom/client';
import '../app/styles/index.scss';
import { BrowserRouter } from './providers/RouterProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter />
  </React.StrictMode>
);
