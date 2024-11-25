import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LabelIcon from '@mui/icons-material/Label';
import HistoryIcon from '@mui/icons-material/History';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

export default function PermanentDrawerLeft(props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar

        position="fixed"
        sx={{ 
          width: `calc(100% - ${drawerWidth}px)`, 
          ml: `${drawerWidth}px`,
          backgroundColor:'#011751'
        }}
      >
        <Toolbar>
          <Typography  
            variant="h6" noWrap component="div">
            GymAccess
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
            <ListItem key={"Usuarios"} disablePadding>
              <ListItemButton>
                {/* <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon> */}
                <ListItemText primary={"Usuarios"}/>
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem key={"Subscripciones"} disablePadding>
              <ListItemButton>
                {/* <ListItemIcon>
                  <LabelIcon /> 
                </ListItemIcon> */}
                <ListItemText  primary={"Subscripciones"}/>
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem key={"Registros"} disablePadding>
              <ListItemButton>
                {/* <ListItemIcon>
                  <HistoryIcon /> 
                </ListItemIcon> */}
                <ListItemText  primary={"Registros"}/>
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem key={"Cerrar Sesion"} disablePadding>
              <ListItemButton >
              
                {/* <ListItemIcon>
                  <Avatar /> 
                </ListItemIcon> */}
                <Link type="button" to="/home">Cerrar sesion</Link>
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Outlet/>
        {props.children}
      </Box>
    </Box>
  );
}