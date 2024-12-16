import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { styled, alpha, createTheme, ThemeProvider} from '@mui/material/styles';

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Modal,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  Label as LabelIcon,
  History as HistoryIcon,
  Logout,
  CallToAction as CallToActionIcon,
} from "@mui/icons-material";
import { GlobalService } from '../services/Global.service';

const drawerWidth = 240;

const style = {
  position: 'absolute',
  top: '10%',
  left: '87%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};


export default function AdminLayoutResponsive(props) {
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [openModalMovil, setOpenAlertModalMovil] = useState(false);
  const [isReadyForInstall, setIsReadyForInstall] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const [loading, setLoading] = useState(true); // Para mostrar un mensaje mientras carga

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const handleClose = () => {
    setOpenAlertModal(false); // Cierra el modal Alert
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsAuthenticated(true);
  //   } else {
  //     navigate("admin/login");
  //   }
  // }, [navigate]);

  const handleCloseModalMovil = () => {
    setOpenAlertModal(false); // Cierra el modal Alert
  };
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      window.deferredPrompt = event;
      setIsReadyForInstall(true);
    });
  }, []);

  const downloadApp = async () => {
    const promptEvent = window.deferredPrompt;
    if (promptEvent) {
      promptEvent.prompt();
      const result = await promptEvent.userChoice;
      console.log("User choice:", result);
      window.deferredPrompt = null;
      setIsReadyForInstall(false);
    }
  };

  // Botón de descarga en Layout
  const setupOnlineSync = () => {
    window.addEventListener("online", () => {
      console.log("Conexión restaurada. Intentando sincronizar...");
      GlobalService.usePendingRequest();
    });
  };
  
  // Llama a esta función al inicio de tu app
  setupOnlineSync();

  // useEffect(() => {
  //   const fetchServices = async () => {
  //     // try {
  //       const users = await GlobalService.usePendingRequest(); // Llamada al servicio
  //       console.log(users);

  //       // setAlertMessage("Usuario creado exitosamente.");
  //       // setAlertSeverity("success");
  //       // setOpenAlertModal(true);     // Abrir modal de Request
  //       // setAlertMessage("Usuario creado exitosamente.");
  //       // setAlertSeverity("success");
  //       // setOpenAlertModalMovil(true);     // Abrir modal de Request
  //     // } catch (error) {
  //     //   console.error("Error al obtener usuarios:", error);
  //     // } finally {
  //     //   setLoading(false); // Deshabilitar estado de carga
  //     // }
  //   };
  //   fetchServices(); // Llamar a la función
  // }, []);

  const drawer = (
    <div>
      <Toolbar />
      <Toolbar />

      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/admin/usuarios")}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItemButton>
        </ListItem>
         <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/admin/subscripciones")}>
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary="Subscripciones" />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/admin/registros")}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Accesos" />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/admin/tarjetas")}>
            <ListItemIcon>
              <CallToActionIcon />
            </ListItemIcon>
            <ListItemText primary="Tarjetas" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          {isReadyForInstall && (
                <IconButton size="large" aria-label="show new subscription mails" color="inherit" onClick={downloadApp}>
                  <button > Install App </button>
                </IconButton>
          )}       
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor:'#132936',
            width: { sm: `calc(100% )` },
            ml: { sm: `${drawerWidth}px` },
            padding: 1}}
         >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "block" , md: "block", lg: "none"} }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              GymAccess
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleMenuOpen}
            >
              <Avatar sx={{ width: 32, height: 32 }}>G</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
            >
              <MenuItem onClick={() => navigate('/gyma/home')}>
                Ir a Home
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { xs: drawerWidth, sm: drawerWidth, md: "0" },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: { xs: mobileOpen ? drawerWidth : "0", sm: mobileOpen ? drawerWidth : "0", md: mobileOpen ? drawerWidth : "0", lg: "0" } },
          }}
        >
          {drawer}
        </Drawer>
      </Box>


      <Box
        component="nav"
        sx={{
         display: { xs: "none", sm: "none", md: "none", lg: "block"},
         width: { xs: "0", sm: "0", md: "0", lg: drawerWidth },
         flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
         <Drawer
         sx={{
               display: { xs: 'none', sm: 'none', md: 'none', lg:'block'},
               width: { xs: 0, sm: 0, md: 0, lg:190},
               flexShrink: 0,
               '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
            },
         }}
         variant="permanent"
         anchor="left"
         open
         >
         <Toolbar sx={{
               height: { xs: 0, md: 80, lg:80}
         }}/>
         <Divider />
         <List>
            <ListItem key={"Usuarios"} disablePadding>
               <ListItemButton onClick={() => navigate('/admin/usuarios')}>
               <ListItemIcon>
                  <AccountCircleIcon />
               </ListItemIcon>
               <ListItemText primary={"Usuarios"} />
               </ListItemButton>
            </ListItem>
            </List>
            <Divider />
            <List>
            
            <ListItem key={"Subscripciones"} disablePadding>
               <ListItemButton onClick={() => navigate('/admin/subscripciones')}>
               <ListItemIcon>
                  <LabelIcon /> 
               </ListItemIcon>
               <ListItemText primary={"Subscripciones"} />
               </ListItemButton>
            </ListItem>
            </List>
            <Divider />
            <List>
            
            <ListItem key={"Accesos"} disablePadding>
               <ListItemButton onClick={() => navigate('/admin/registros')}>
               <ListItemIcon>
                  <HistoryIcon /> 
               </ListItemIcon>
               <ListItemText primary={"Accesos"} />
               </ListItemButton>
            </ListItem>
            </List>
            <Divider />
            <List>
            
            <ListItem key={"Registros"} disablePadding>
               <ListItemButton onClick={() => navigate('/admin/tarjetas')}>
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
               <ListItemButton onClick={() => navigate('/admin/login')}>
                  <ListItemIcon>
                     <Logout fontSize="small" />
                  </ListItemIcon>
               <ListItemText primary={"Cerrar Sesion"} />
               </ListItemButton>
            </ListItem>
         </List>
         <Divider />
         </Drawer>         
      </Box>     
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Buscando Peticiones Pendientes
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Este proceso puede tardar unos minutos. Por favor, espere...
          </Typography>
        </Box>
      </Modal> */}
      <Modal
        open={openModalMovil}
        onClose={handleCloseModalMovil}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography  variant="h6" component="h2">
            Buscando Peticiones Pendientes
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Este proceso puede tardar unos minutos. Por favor, espere...
          </Typography>
        </Box>
      </Modal> 

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >

        <Toolbar />
        <Outlet />
        {props.children}
      </Box>
    </Box>
  );
}
