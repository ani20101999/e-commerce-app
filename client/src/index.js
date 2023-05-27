import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contextApi.js/authContext';
import { SearchProvider } from './contextApi.js/searchContext';
import { CartProvider } from './contextApi.js/cart';
import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);


