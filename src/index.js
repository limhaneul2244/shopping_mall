import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Main from './Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from './ProductDetails/ProductDetails';
import Cart from './Cart&Payment/Cart';

// import rootReducer from './modules';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';


// const store = createStore(rootReducer)
// console.log(store.getState())


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/mall' element={<Main />} />
        <Route path='/ProductDetails/:id' element={<ProductDetails />} />
        <Route path='/Cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  // </Provider>
);
