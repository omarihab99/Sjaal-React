import { lazy } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
const ProductDetails = lazy(() => import("./pages/ProductDetailsPage"))

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      children: [
        {
          path: 'products/:id',
          element: <ProductDetails></ProductDetails>
        }
      ]
    }
  ])

  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>

  );
}

export default App;
