import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { lazy, Suspense } from 'react';
import HomePage from './pages/HomePage';
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'));import "bootstrap/dist/css/bootstrap.css";
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./redux/store";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
      errorElement: <NotFound/>,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/collections",
          element: <CollectionsPage />,
        }
        
      ],
    },
  ]);

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
