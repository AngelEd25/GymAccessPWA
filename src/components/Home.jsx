import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PaymentIcon from '@mui/icons-material/Payment';
import SecurityIcon from '@mui/icons-material/Security';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1A2027',
  color: '#fff',
  padding: theme.spacing(4),
  textAlign: 'center',
  transition: 'transform 0.3s ease, background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#3f51b5',
    transform: 'translateY(-5px)',
  },
  borderRadius: theme.shape.borderRadius,
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

export default function FullWidthGrid() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 15,
        px: 3,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          color: '#1A2027',
          fontWeight: 'bold',
          mb: 4,
        }}
      >
        Bienvenido a GymAccess
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Gestión de Suscripciones */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper>
            <PaymentIcon sx={{ fontSize: 50, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Gestión de Suscripciones
            </Typography>
            <Typography variant="body2">
              Administra tus planes y pagos fácilmente desde cualquier dispositivo.
            </Typography>
          </StyledPaper>
        </Grid>

        {/* Acceso Controlado */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper>
            <SecurityIcon sx={{ fontSize: 50, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Acceso Controlado
            </Typography>
            <Typography variant="body2">
              Accede a las instalaciones del gimnasio con tu tarjeta.
            </Typography>
          </StyledPaper>
        </Grid>

        {/* Planes Personalizados */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper>
            <FitnessCenterIcon sx={{ fontSize: 50, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Planes Personalizados
            </Typography>
            <Typography variant="body2">
              Consulta tus planes de entrenamiento diseñados por tu entrenador.
            </Typography>
          </StyledPaper>
        </Grid>
        {/* Footer */}
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: 2,
              backgroundColor: '#1A2027',
              color: '#fff',
              textAlign: 'center',
              borderRadius: 0,
            }}
          >
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} GymAccess - Gestión Inteligente de Gimnasios
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
