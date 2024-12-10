import React, { useState }from 'react'
import './../assets/Home.css';
import AuthModal from './../components/AuthModal';
import FullWidthGrid from './FullWidthGrid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));
const Home = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isRegisterOpen, setIsRegisterOpen] = useState(false);


  return (
    <div >
      <div className="home-container">
         <section className="">
            <FullWidthGrid/>
         </section>

         {/* <section className="home-cta">
         <AuthModal isOpen={isModalOpen} register={isRegisterOpen} onClose={() => setIsModalOpen(false)}/>
         </section> */}
      </div>      
    </div>
  )
}

export default Home
