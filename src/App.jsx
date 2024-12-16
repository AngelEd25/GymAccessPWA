import React from 'react'

// import { Layout, Home, About, Gallery } from "./components";
import { Routing } from './router/Routing';





function App() {

  return (
    
    <div  className='layout'>
      {/* <Header/> */}
        <Routing/>
        
      {/* <Routing/> */}
    </div>
   
  );
}

export default App;