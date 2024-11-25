import React from 'react';
import { Link, Outlet } from "react-router-dom";

import { Routes, Route, BrowserRouter } from 'react-router-dom';

import  Home  from './../components/Home';
import About from "./../components/About";
import Login from "./../components/Login";
import Layout from "./../components/Layout";
import Users from '../components/Usuarios';

import UserDashboard from '../components/UserDashboard';
import AdminHome from '../components/HomeRes';
import AdminLayout from '../Layout/AdminLayout';
import Register from '../components/Register';

export const Routing = () => {

   return (
      <BrowserRouter>
         {/* <AuthProvider> */}
            <Routes>
               <Route path='/admin' element={<Layout />}>
               <Route path='login' element={<Login />} />
               <Route path='register' element={<Register />} />           
               </Route>
               <Route path='/' element={<Layout />}>
                  <Route path='home' element={<Home />} />
                  <Route path='acerca' element={<About />} />
                  
                  <Route path='usuarios' element={<Users />} />
                  <Route path='usersDashboard' element={<UserDashboard />} />
               </Route>
               <Route path='/other' element={<AdminLayout />}>
                  <Route index element={<AdminHome />} />
    
               </Route>
               <Route path='/admin' element={<AdminLayout />}>
                  <Route path='home' element={<About />} />
                  <Route path='usuarios' element={<About />} />
                  <Route path='subscripciones' element={<About />} />
                  <Route path='registros' element={<About />} />


               </Route>
            </Routes>
         {/* </AuthProvider> */}
      </BrowserRouter>

   )
}