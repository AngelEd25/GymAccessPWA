import React, { useState }from 'react'
import './../assets/About.css';
import { Link, Outlet, useNavigate  } from "react-router-dom";
import AuthModal from './../components/AuthModal';
import FullWidthGrid from './FullWidthGrid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DataTable from './RegistrosDataTable';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Button from '@mui/material/Button';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import LabelIcon from '@mui/icons-material/Label';
import HistoryIcon from '@mui/icons-material/History';
import CallToActionIcon from '@mui/icons-material/CallToAction';

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

const ItemCards = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
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

export default function RegistrosLayout() {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

   return (
    <div className="about-container">
      <Box sx={{ flexGrow: 1, paddingBottom:3}}>
        <Grid container spacing={1}>
        <Grid item xs={12} sm={12} sx={{ display: { xs: 'block', sm: 'none', md: 'none'} }}> 
            <Item>
            </Item>
          </Grid>
        <Grid item xs={12} sm={6} sx={{ display: { xs: 'block', sm: 'block', md: 'none'} }}> 
            <Item>
                <Button variant="text" size="small" onClick={() => handleNavigation('/admin-2/usuarios')}>
                  <AccountCircleIcon />
                  <Typography
                    variant="body2"
                    noWrap
                    component="div"
                  >
                    Usuarios
                  </Typography>
                </Button>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: { xs: 'block', sm: 'block', md: 'none'} }}>
            <Item>
                <Button variant="text" size="small" onClick={() => handleNavigation('/admin-2/subscripciones')}>
                  <LabelIcon />
                  <Typography
                    variant="body2"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'flex', sm: 'block' } }}
                  >
                    Subscripciones
                  </Typography>
                </Button>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: { xs: 'block', sm: 'block', md: 'none'} }}>
            <Item>
            <Button variant="text" size="small" onClick={() => handleNavigation('/admin-2/registros')}>
                <HistoryIcon />
                <Typography
                  variant="body2"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'flex', sm: 'block' } }}
                >
                  Accesos
                </Typography>
              </Button>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: { xs: 'block', sm: 'block', md: 'none'} }}>
            <Item>
            <Button variant="text" size="small" onClick={() => handleNavigation('/admin-2/tarjetas')}>
              <CallToActionIcon />
              <Typography
                  variant="body2"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'flex', sm: 'block' } }}
                >
                  Tarjetas
                </Typography>
              </Button>
            </Item>
          </Grid>     
          <Grid item xs={12} >
            <Item elevation={0} sx={{ display: { xs: 'block', sm: 'none', md: 'none'} }}> 
              Incline el dispositivo para visualizar las tablas
            </Item>
            <Item elevation={0}> 
              <DataTable/>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <FirstItem>
              <p> 2024 GymAccess - Gestión Inteligente de Gimnasios</p>
            </FirstItem>
          </Grid>
        </Grid>      
      </Box>
    </div>      
  );
}
