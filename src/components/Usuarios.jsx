import React, { useState }from 'react'
import './../assets/about.css';
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
    elevation: 0
  }),
}));

const FirstItem = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
    elevation: 0
  }),
}));

export default function About() {
   return (
    
    <div >
      <div className="about-container">
         <header className="about-header">
          <h1>Equipos</h1>
            {/* <p>Tu acceso inteligente al fitness.</p> */}
         </header>
         <section className="">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
              <Grid item xs={12} md={12}>
                <FirstItem elevation={0}>
                  <img src="https://picsum.photos/300/300" alt="imagen-prueba" />
                </FirstItem>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Item>
                  <div>
                    <h2>Nuestra misión</h2>
                    <h3>
                      Empoderar a los gimnasios con tecnología de vanguardia que mejore la eficiencia operativa, reduzca costos y eleve la satisfacción de sus clientes.
                    </h3>
                  </div>
                </Item>
              </Grid>
            </Grid>

            <Grid container spacing={0}>
              <Grid item xs={12} md={12}>
                <FirstItem elevation={0}>
                  <img src="https://picsum.photos/300/300" alt="imagen-prueba" />
                </FirstItem>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Item>
                  <div>
                    <h2>Nuestra misión</h2>
                    <h3>
                      Empoderar a los gimnasios con tecnología de vanguardia que mejore la eficiencia operativa, reduzca costos y eleve la satisfacción de sus clientes.
                    </h3>
                  </div>
                </Item>

              </Grid>

              <Grid item xs={12} md={12}>
                <Item>
                <div >
                    <h2>Nuestra visión</h2>
                    <h3>
                      Convertirnos en líderes en soluciones IoT para el sector fitness, impulsando la digitalización y conectividad en gimnasios de todo el mundo.
                    </h3>
                  </div>
                </Item>
              </Grid>

            </Grid>
          </Box>            
         </section>



         <footer className="about-footer">
         <p>&copy; 2024 GymAccess - Gestión Inteligente de Gimnasios</p>
         </footer>
      </div>      
    </div>

   );
}
