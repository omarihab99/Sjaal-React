import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import store from './redux/store';
import { lazy, Suspense } from 'react';
import HomePage from './pages/HomePage';

import NotFound from './pages/NotFound';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/Header';
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
      errorElement: <NotFound/>,
  
      },
    {
      path: "/collections",
      element: <CollectionsPage />,
    }
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
