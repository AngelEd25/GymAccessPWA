import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LabelIcon from '@mui/icons-material/Label';
import HistoryIcon from '@mui/icons-material/History';

import CustomAppBar from "../components/CustomAppBar";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(10)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp, 
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${0}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    style: {
      color: '#031c32'
    },

    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function AdminLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };


  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={true}
        sx={{
          background: "#071b2e",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between", // Distribuye el contenido entre izquierda y derecha
            alignItems: "center", // Alinea los elementos verticalmente
          }}
        >
          {/* Contenido del lado izquierdo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" noWrap component="div">
              Gym Access AD 
            </Typography>
          </Box>

          {/* Contenido del lado derecho */}

        </Toolbar>
      </AppBar>
      {/* <CustomAppBar/> */}
      {/* <CustomAppBar abrir={handleDrawerOpen} a={open}/> */}

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

        {/* ItemUsuarios */}
        <ListItem key={"spam"} disablePadding sx={{ display: 'block' }}>     
        <ListItemButton
          onClick={handleDrawerOpen}
                sx={[
                  {
                    minHeight: 48,
                    px: 4,
                  },
                  open
                    ? {justifyContent: 'initial',} : {justifyContent: 'center',},
                ]}
              >
                
                <ListItemIcon
                  onClick={handleDrawerOpen}
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {mr: 3,}: {mr: 'auto',},
                  ]}
                >
                   {/* <InboxIcon />  */}
                   <AccountCircleIcon/>
                </ListItemIcon>
                
                <ListItemText
                  primary={"Usuarios"}
                  sx={[
                    open
                      ? {opacity: 1,}: {opacity: 0,},
                  ]}
                />
        </ListItemButton>
        </ListItem>
        <Typography variant="body2" edge="start"
        sx={[
          {
              marginLeft: 4,
          },
          open && { display: 'none' }
        ]} >
          Usuarios
        </Typography>

        <ListItem key={"spam"} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
          onClick={handleDrawerOpen}
                sx={[
                  {
                    minHeight: 48,
                    px: 4,
                  },
                  open
                    ? {justifyContent: 'initial',} : {justifyContent: 'center',},
                ]}
              >
                
                <ListItemIcon
                  onClick={handleDrawerOpen}
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {mr: 3,}: {mr: 'auto',},
                  ]}
                >
                   <LabelIcon /> 
                   
                </ListItemIcon>
                
                <ListItemText
                  primary={"Subscripciones"}
                  sx={[
                    open
                      ? {opacity: 1,}: {opacity: 0,},
                  ]}
                />
          </ListItemButton>
        </ListItem>
        <Typography variant="body2" edge="start"
        sx={[
          {
              marginLeft: 2,
          },
          open && { display: 'none' }
        ]} >
          Subscripciones
        </Typography>

        <ListItem key={"spam"} disablePadding sx={{ display: 'block' }}>     
        <ListItemButton
          onClick={handleDrawerOpen}
                sx={[
                  {
                    minHeight: 48,
                    px: 4,
                  },
                  open
                    ? {justifyContent: 'initial',} : {justifyContent: 'center',},
                ]}
              >
                
                <ListItemIcon
                  onClick={handleDrawerOpen}
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {mr: 3,}: {mr: 'auto',},
                  ]}
                >
                   <HistoryIcon /> 
                   
                </ListItemIcon>
                
                <ListItemText
                  primary={"Historial"}
                  sx={[
                    open
                      ? {opacity: 1,}: {opacity: 0,},
                  ]}
                />
        </ListItemButton>
        </ListItem>
        <Typography variant="body2" edge="start"
        sx={[
          {
              marginLeft: 4,
          },
          open && { display: 'none' }
        ]} >
          Historial
        </Typography>

        </List>
        <Divider />
        <List>

        <ListItem key={"spam"} disablePadding sx={{ display: 'block' }}>     
        <ListItemButton
          onClick={handleDrawerOpen}
                sx={[
                  {
                    minHeight: 48,
                    px: 4,
                  },
                  open
                    ? {justifyContent: 'initial',} : {justifyContent: 'center',},
                ]}
              >
                
                <ListItemIcon
                  onClick={handleDrawerOpen}
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {mr: 3,}: {mr: 'auto',},
                  ]}
                >
                   {/* <InboxIcon />  */}
                   <SettingsIcon/>
                </ListItemIcon>
                
                <ListItemText
                  primary={"Opciones"}
                  sx={[
                    open
                      ? {opacity: 1,}: {opacity: 0,},
                  ]}
                />
        </ListItemButton>
        </ListItem>
        <Typography variant="body2" edge="start"
        sx={[
          {
              marginLeft: 4,
          },
          open && { display: 'none' }
        ]} >
          Opciones
        </Typography>





        <ListItem key={"spam"} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
          onClick={handleDrawerOpen}
                sx={[
                  {
                    minHeight: 48,
                    px: 4,
                  },
                  open
                    ? {justifyContent: 'initial',} : {justifyContent: 'center',},
                ]}
              >
                <ListItemIcon
                  onClick={handleDrawerOpen}
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {mr: 3,}: {mr: 'auto',},
                  ]}
                >
                <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={[
                      {
                        width: 30, height: 30,
                      },
                    ]}
                />
                </ListItemIcon>
                <ListItemText
                  primary={"Usuario"}
                  sx={[
                    open
                      ? {opacity: 1,}: {opacity: 0,},
                  ]}
                />
          </ListItemButton>
        </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />



      </Box>
    </Box>
  );
}
