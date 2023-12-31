import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './routes/Home';
import Employeetype from './routes/EmployeeType';
import Error from './routes/Error';
import Employee from './routes/Employee';
import EmployeeTypeForm from './routes/EmployeeTypeForm';
import EmployeeForm from './routes/EmployeeForm';
import EmployeeTypeUpdate from './routes/EmployeeTypeUpdate';
import EmployeeUpdate from './routes/EmployeeUpdate';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // default route
    errorElement: <Error/>, // error route
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/employeetype',
        element: <Employeetype/>
      },
      {
        path: '/employeetype/:id',
        element: <Employeetype />
      },
      {
        path: '/employeetypeform',
        element: <EmployeeTypeForm />
      },      
      {
        path: '/employeetypeupdate/:id',
        element: <EmployeeTypeUpdate />
      },      
      {
        path: '/employee',
        element: <Employee />
      },
      {
        path: '/employee/:id',
        element: <Employee />
      },
      {
        path: '/employeeform/',
        element: <EmployeeForm />
      },
      {
        path: '/employeeupdate/:id',
        element: <EmployeeUpdate />
      }
    ]
  }
]);

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
