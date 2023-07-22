import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Colleges from './pages/Colleges/Colleges.jsx';
import Home from './pages/Home/Home.jsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import College from './pages/Colleges/College.jsx';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'colleges',
        element: <Colleges></Colleges>
      },
      {
        path: 'college/:id',
        element: <College></College>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </QueryClientProvider>,
)
