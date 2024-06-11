import { PersistGate } from 'redux-persist/integration/react';
import { Suspense, lazy } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store, persistor } from './redux/store';

const ProductDetails = lazy(() => import("./pages/ProductDetailsPage"));

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
