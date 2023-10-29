import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
    element: <App />,
    errorElement: <Error/>,
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
