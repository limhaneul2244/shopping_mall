import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './Cart/Cart';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { productOptionsSlice } from './modules/productOptions';

const store = configureStore({
  reducer: {
    option: productOptionsSlice.reducer,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/ProductDetails/:id' element={<ProductDetails />} />
        <Route path='/Cart' element={<Cart />}>
          <Route path=':id' element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
