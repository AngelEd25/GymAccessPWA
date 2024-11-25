import React from 'react'

// import { Layout, Home, About, Gallery } from "./components";
import { Routing } from './router/Routing';

import { Routes, Route } from "react-router-dom";

function App() {
  // Botón de descarga en Layout
  return (
    
    <div  className='layout'>
      {/* <Header/> */}
        <Routing/>
        
      {/* <Routing/> */}
    </div>
   
  );
}

export default App;