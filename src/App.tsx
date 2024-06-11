import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
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
        
        
      ],
    },
  ]);
  return (
    <div className="App">
      <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>

      </Provider>
      

    </div>

  );
}

export default App;
