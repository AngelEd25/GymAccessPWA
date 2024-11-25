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
         <header className="home-header">
            <h1>Bienvenido a Gym Access</h1>
            <p>Tu acceso inteligente al fitness.</p>
         </header>

         {/* <section className="home-features">
            <div className="feature-card">
               <h2>Gestión de Suscripciones</h2>
               <p>Administra tus planes y pagos fácilmente desde cualquier dispositivo.</p>
            </div>

            <div className="feature-card">
               <h2>Acceso Controlado</h2>
               <p>Accede a las instalaciones del gimnasio con tu tarjeta o código QR.</p>
            </div>

            <div className="feature-card">
               <h2>Planes Personalizados</h2>
               <p>Consulta tus planes de entrenamiento diseñados por tu entrenador.</p>
            </div>
         </section> */}

         <section className="">
            <FullWidthGrid/>
         </section>

         <section className="home-cta">
         {/* <button onClick={() => setIsModalOpen(true)}>Contactanos</button> */}
         <AuthModal isOpen={isModalOpen} register={isRegisterOpen} onClose={() => setIsModalOpen(false)}/>
         </section>

         <footer className="home-footer">
         <p>&copy; 2024 GymAccess - Gestión Inteligente de Gimnasios</p>
         </footer>
      </div>      
    </div>
  )
}

export default Home
