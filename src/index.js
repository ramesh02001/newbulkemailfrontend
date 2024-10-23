import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Make sure the path is correct

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App/>  {/* Ensure Apps component does not have another Router inside it */}
  </BrowserRouter>
);