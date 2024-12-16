import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

export default function About() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 15,
        px: 3,
        backgroundColor: '#f5f5f5',
      }}>
      <Grid container spacing={4}>
        {/* Header Section */}
        <Grid item xs={12}>
          <Typography variant="h3" align="center" gutterBottom>
            Sobre Nosotros
          </Typography>
          <Typography variant="body1" align="center">
            En GymAccess, transformamos gimnasios con tecnología inteligente para ofrecer una experiencia única.
          </Typography>
        </Grid>

        {/* Detailed About Section */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h4" gutterBottom>
              ¿Quiénes somos?
            </Typography>
            <Typography variant="body1" align="justify">
              En GymAccess, somos un equipo dedicado a revolucionar la gestión de gimnasios mediante herramientas tecnológicas modernas.
              Nuestro objetivo es facilitar el control de membresías, accesos y servicios, adaptándonos a las necesidades únicas de cada gimnasio.
              Ofrecemos soluciones escalables para pequeños y grandes centros fitness, combinando hardware avanzado con software intuitivo.
            </Typography>
          </StyledPaper>
        </Grid>

        {/* Mission, Vision, Values */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <FitnessCenterIcon sx={{ fontSize: 50, color: '#3f51b5' }} />
            <Typography variant="h5" gutterBottom>
              Nuestra Misión
            </Typography>
            <Typography variant="body1">
              Empoderar gimnasios con tecnología avanzada que optimiza operaciones y mejora la experiencia de los usuarios.
            </Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledPaper>
            <ImportantDevicesIcon sx={{ fontSize: 50, color: '#3f51b5' }} />
            <Typography variant="h5" gutterBottom>
              Nuestra Visión
            </Typography>
            <Typography variant="body1">
              Ser líderes en soluciones IoT para el sector fitness, conectando gimnasios en todo el mundo.
            </Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledPaper>
            <EmojiObjectsIcon sx={{ fontSize: 50, color: '#3f51b5' }} />
            <Typography variant="h5" gutterBottom>
              Nuestros Valores
            </Typography>
            <Typography variant="body1">
              Innovación, simplicidad y compromiso para garantizar calidad y fiabilidad en nuestros servicios.
            </Typography>
          </StyledPaper>
        </Grid>



        {/* Footer Section */}
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <Typography variant="body2" color="textSecondary">
              &copy; {new Date().getFullYear()} GymAccess - Transformando la gestión de gimnasios
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
