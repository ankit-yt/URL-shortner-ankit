import React from 'react';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { Outlet } from '@tanstack/react-router';
import Navbar from './components/Navbar';


const LinkShortener = () => {
 

 
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default LinkShortener;
