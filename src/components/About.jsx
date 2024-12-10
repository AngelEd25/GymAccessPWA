import React, { useState }from 'react'
import './../assets/About.css';
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
  backgroundColor: '#ececec',
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
      <div className="about-container">
        
         <section className="">
          <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={12} paddingBottom={3}>
                <FirstItem elevation={0}>
                    <div >
                      <h3>
                      </h3>
                    </div>
                </FirstItem>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                  <FirstItem elevation={0}>
                    <div >
                      <h3>
                      </h3>
                    </div>
                  </FirstItem>
                </Grid>
              <Grid item xs={12} md={8}>
                <FirstItem elevation={0}>
                  <div >
                    <h3> En GymAccess, somos desarrolladores independientes en asociacion a SportGym comprometidos en vision de la transformación digital de gimnasios y centros fitness. Nuestro propósito es proporcionar soluciones tecnológicas innovadoras que optimicen la gestión de membresías, accesos y servicios, permitiendo a nuestros clientes enfocarse en lo que más importa: mejorar la experiencia de sus usuarios.
                      Desde nuestra creación, hemos trabajado para desarrollar herramientas accesibles y eficientes que se adapten a las necesidades de gimnasios pequeños, medianos y grandes. Con una combinación de hardware avanzado y un sistema web intuitivo, ofrecemos una experiencia integrada que facilita el control y seguimiento de usuarios en tiempo real.
                    </h3>
                  </div>
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

              <Grid item xs={12} md={12}>
                <Item>
                <div >
                    <h2>Nuestros valores</h2>
                    <h3>
                      Innovación: Creemos en la mejora continua de nuestras herramientas para superar las expectativas de nuestros clientes.
                    </h3>
                    <h3>
                      Simplicidad: Diseñamos soluciones que son fáciles de usar y personalizar.
                    </h3>
                    <h3>
                      Compromiso: Trabajamos para garantizar la calidad, confiabilidad y seguridad en todos nuestros productos y servicios.
                    </h3>
                  </div>
                </Item>
              </Grid>

              <Grid item xs={12} md={12}>
                <Item>
                <div >

                    <h2>
                      En GymAccess, entendemos que cada gimnasio es único. Por eso, ofrecemos opciones escalables que se adaptan a las necesidades de cada cliente, asegurando que siempre cuenten con el soporte adecuado para hacer crecer su negocio.
                      ¡Transformemos juntos la experiencia en los gimnasios!
                    </h2>
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
   );
}
