import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import CartPage from './pages/CartPage';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <div >
      <Provider store={store}>
      <CartPage/>
        </Provider>
    </div>
  );
}

export default App;
