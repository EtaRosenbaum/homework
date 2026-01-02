import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route, Link, createBrowserRouter, RouterProvider } from "react-router-dom";
import BuyHome from './BuyHome.jsx'
import SellHome from './SellHome.jsx'
import Home from './Home.jsx'
import PageNotFound from './PageNotFound.jsx'

const router = createBrowserRouter([

  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'buy',
        element: <BuyHome />
      },
      {
        path: 'sell',
        element: <SellHome />,

      },
      {
        path: '*',
        element: <PageNotFound />
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
