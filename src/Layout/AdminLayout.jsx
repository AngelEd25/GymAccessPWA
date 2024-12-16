import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const PermanentDrawerLeft = (props) => {
  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/admin/login");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#132936', padding: 1 }}>
        <Toolbar sx={{
          display: { xs: 'flex', sm: 'flex' },
          alignItems: 'center',
          gap: { xs: 2, sm: 10, md: 16, lg: 30 }
        }}>
        <Box sx={{  display: { xs: 'flex', md: 'flex' } }}>
            <Card sx={{display: 'flex', borderRadius: 0, boxShadow: 0}}>
                
                <Item key="card">
                    <CardMedia
                        component="img"
                        sx={{ width: 65, height: 65}}
                        src="https://res.cloudinary.com/dcdb72215/image/upload/v1734182955/image2_azsdut.png"
                        alt="Gyma-icon"
                    />                 
                </Item>
            </Card>
            
        </Box>          
        <Box sx={{  display: { xs: 'flex', md: 'flex' } }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'block', sm: 'block' } }}
          >
            GymAccess
          </Typography>
        </Box>
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
              <Button color="inherit" onClick={() => navigate('/gyma/home')}>Home</Button>
              <Button color="inherit" onClick={() => navigate('/gyma/about')}>¿Quiénes Somos?</Button>
                {isReadyForInstall && (
                <IconButton size="large" aria-label="show new subscription mails" color="inherit" onClick={downloadApp}>
                  <button > Install App </button>
                </IconButton>
              )}              
            </Box>

          {isAuthenticated && (
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>

              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={anchorEl ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorEl ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>G</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleLogout}>
                  <Logout fontSize="small" /> Logout
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Button color="inherit" onClick={() => navigate('/admin/usuarios')}>Ir a Admin</Button>

                </MenuItem>
              </Menu>
            </Box>
            )}

          
        </Toolbar>
      </AppBar>

      <Outlet />
      {props.children}
    </Box>
  );
};

export default PermanentDrawerLeft;
