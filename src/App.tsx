import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <Provider store={store}>
      <div>
      <ProductsPage></ProductsPage>
    </div>

    </Provider>
  );
}

export default App;
