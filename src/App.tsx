import { PersistGate } from 'redux-persist/integration/react';
import { Suspense, lazy } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CartPage from './pages/CartPage';
import Checkout from './pages/CheckoutPage';
import { store, persistor } from './redux/store';
import ProductsPage from './pages/ProductsPage';
import Layout from './pages/Layout' // Make sure to import the Layout component

const CollectionsPage = lazy(() => import('./pages/CollectionsPage'));
const ProductDetails = lazy(() => import("./pages/ProductDetailsPage"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Use Layout as the root element
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/collections",
          element: <CollectionsPage />
        },
        {
          path: "/cart",
          element: <CartPage />
        },
        {
          path: "/checkout",
          element: <Checkout />
        },
        {
          path: 'products/:id',
          element: <ProductDetails />
        },
        {
          path: 'collections/:CollectionId',
          element: <ProductsPage />
        }
      ]
    }
  ]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router}></RouterProvider>
        </Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
