import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Main from './Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import Cart from './Cart&Payment/Cart';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { productOptionsSlice } from './modules/productOptions';

const store = configureStore({
  reducer: {
    option : productOptionsSlice.reducer,
  },
})
console.log('store', store.getState())


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/mall' element={<Main />} />
        <Route path='/ProductDetails/:id' element={<ProductDetails />} />
        <Route path='/Cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
