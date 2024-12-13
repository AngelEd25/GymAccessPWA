import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate  } from "react-router-dom";
import { styled, alpha, createTheme, ThemeProvider} from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';

import LabelIcon from '@mui/icons-material/Label';
import HistoryIcon from '@mui/icons-material/History';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import CallToActionIcon from '@mui/icons-material/CallToAction';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));



export default function AdminLayoutMovil(props) {

  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsAuthenticated(true);
  //   } else {
  //     navigate("/admin/login");
  //   }
  // }, [navigate]);


  
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  const handleLogout = () => {
    handleClose()
    localStorage.removeItem("token"); // Elimina el token registrado
    navigate("/admin/login");
  }

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawerWidth = 215;


  const handleNavigation = (path) => {
    navigate(path);
  };

  const [notifications, setNotifications] = React.useState({
    general: [], // Cambios en usuarios, tarjetas, etc.
    subscriptions: [], // Cambios en suscripciones
  });

  // Agregar una notificación
  const addNotification = (type, message) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: [
        ...prev[type],
        {
          id: crypto.randomUUID(), // Generar un ID único
          type,
          message,
          timestamp: new Date(),
        },
      ],
    }));
  };

  // Limpiar notificaciones vistas
  const clearNotifications = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: [],
    }));
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor:'#132936', padding: 1}}>
        <Toolbar sx={{
            display: { xs: 'flex', sm: 'flex' } ,
            alignItems: 'center',
            gap: { sm: 10, md: 25, lg: 40}
        }}>

        <Box sx={{  display: { xs: 'flex', md: 'flex' } }}>
            <Card sx={{display: 'flex', borderRadius: 0, boxShadow: 0}}>
                
                <Item key="card" elevation="0">
                    <CardMedia
                        component="img"
                        sx={{ width: 65, height: 65}}
                        image="https://cdn.gencraft.com/prod/user/e289b914-4708-4e31-91f4-34a7af492ae8/edfc8973-029c-4066-90d2-a5c964177435/image/image1_0.jpg?Expires=1734028413&Signature=UDEGvComOlLpB-djzMu17YK1A02QgsBI4M0~DYFOkWbV~U3pcZ4H1VAI2H7dyreTZrMUepu-YYzG0JEpfMmlmUaZ-zxOcRYeLVPYAzl0TDShpnoZzACIPLISwe-wf4LYaan79qka8nJwTJitRoD1NjapSH3VwAOZRbwmd-pccAkKaUpc-1nNm8Gk8HtPHHgBl9DFyWXbO8tOt6qKwJ~NT6Hiw9DwF~ShOsuDUUwL1l3MLeo0CB-5kiYiUT7mTcF9iZpgonzRJNv-4wZUpduF3FshNtqdvVB4xFGHWV-jRnIHaK10OvJoCcYMeJS1uTSKGwha1lEYwuIawVSOtIWYNg__&Key-Pair-Id=K3RDDB1TZ8BHT8"
                        alt="Gyma-icon"
                    />                 
                </Item>
            </Card>
        </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'flex', sm: 'block' } }}
          >
            GymAccess
          </Typography>

          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <IconButton size="large" aria-label="show new subscription mails" color="inherit" onClick={() => clearNotifications("subscriptions")}>
            {isReadyForInstall && (
            <button onClick={downloadApp}> Install App </button>
            )}
            </IconButton>
            <Button color="inherit" onClick={() => navigate('/gyma/home')}>Home</Button>

            <IconButton size="large" aria-label="show new notifications" color="inherit" onClick={() => clearNotifications("general")}>
              <Badge badgeContent={notifications.general.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>G</Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Divider />
                <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>      
      <Drawer
        sx={{
            display: { xs: 'none', sm: 'none', md: 'block', lg:'block'},
            width: { xs: 0, md: 190, lg:190},
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',

          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{
            height: { xs: 0, md: 80, lg:80}
        }}/>
        <Divider />
        <List>
          <ListItem key={"Usuarios"} disablePadding>
            <ListItemButton onClick={() => handleNavigation('/admin-2/usuarios')}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"Usuarios"} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={"Subscripciones"} disablePadding>
            <ListItemButton onClick={() => handleNavigation('/admin-2/subscripciones')}>
              <ListItemIcon>
                <LabelIcon /> 
              </ListItemIcon>
              <ListItemText primary={"Subscripciones"} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={"Accesos"} disablePadding>
            <ListItemButton onClick={() => handleNavigation('/admin-2/registros')}>
              <ListItemIcon>
                <HistoryIcon /> 
              </ListItemIcon>
              <ListItemText primary={"Accesos"} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={"Registros"} disablePadding>
            <ListItemButton onClick={() => handleNavigation('/admin-2/tarjetas')}>
              <ListItemIcon>
                <CallToActionIcon /> 
              </ListItemIcon>
              <ListItemText primary={"Tarjetas"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key={"Cerrar Sesion"} disablePadding>
              <ListItemButton onClick={() => handleNavigation('/admin/login')}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
              <ListItemText primary={"Cerrar Sesion"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p:3 }}
      >
        <Outlet />
        {props.children}
      </Box>



    </Box>

  );
}
