import * as React from 'react';
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

export default function FullWidthGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Item>
            <div >
               <h2>Gestión de Suscripciones</h2>
               <p>Administra tus planes y pagos fácilmente desde cualquier dispositivo.</p>
            </div>
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <div>
               <h2>Acceso Controlado</h2>
               <p>Accede a las instalaciones del gimnasio con tu tarjeta o código QR.</p>
            </div>
          </Item>

        </Grid>

        <Grid item xs={12} md={4}>
          <Item>
          <div >
               <h2>Planes Personalizados</h2>
               <p>Consulta tus planes de entrenamiento diseñados por tu entrenador.</p>
            </div>
          </Item>
        </Grid>

      </Grid>
    </Box>
  );
}
