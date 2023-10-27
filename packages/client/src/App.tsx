import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';

import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <Navbar/>
      
      <div className='navbar-config'></div>
      <Outlet/>
    </div>
  );
}

export default App;
