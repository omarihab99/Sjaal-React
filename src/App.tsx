import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { lazy, Suspense } from 'react';
import HomePage from './pages/HomePage';
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'));
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/collections",
      element: <CollectionsPage />,
    }
  ])
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </Suspense>
    </>
  );
}

export default App;
