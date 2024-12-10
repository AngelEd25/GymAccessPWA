import React from 'react';
import { Link, Outlet } from "react-router-dom";

import { Routes, Route, BrowserRouter } from 'react-router-dom';

import  Home  from './../components/Home';
import About from "./../components/About";
import Login from "./../components/Login";
import Layout from "./../components/Layout";
import Users from '../components/Usuarios';

import UserDashboard from '../components/UserDashboard';
import RegistrosLayout from '../components/RegistrosLayout';
import CardsLayout from '../components/CardsLayout';
import SubscripcionLayout from '../components/SubscripcionLayout';



import AdminHome from '../components/HomeRes';

import AdminLayout from '../Layout/AdminLayout';
import AdminLayoutMovil from '../Layout/AdminLayoutMovil';

import Register from '../components/Register';

export const Routing = () => {

   return (
      <BrowserRouter>
         {/* <AuthProvider> */}
            <Routes>
               <Route path='/admin' element={<AdminLayout />}>
               <Route path='login' element={<Login />} />
               <Route path='register' element={<Register />} />           
               </Route>
               <Route path='/gyma' element={<AdminLayout />}>
                  <Route path='home' element={<Home />} />
                  <Route path='about' element={<About />} />
               </Route>
¡
               <Route path='/admin-2' element={<AdminLayoutMovil />}>
                  <Route path='home' element={<UserDashboard />} />
                  <Route path='dashboard' element={<UserDashboard  />} />
                  <Route path='usuarios' element={<UserDashboard />} />
                  <Route path='subscripciones' element={<SubscripcionLayout />} />
                  <Route path='registros' element={<RegistrosLayout />} />
                  <Route path='tarjetas' element={<CardsLayout />} />

               </Route>
               {/* <Route path='/admin-movil' element={<AdminLayoutPrime />}>
                  <Route path='home' element={<About />} />
               </Route> */}
            </Routes>
         {/* </AuthProvider> */}
      </BrowserRouter>

   )
}