import React from "react";
import "../assets/AppBarNew.css";
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function CustomAppBar({abrir, a}) {
  const theme = useTheme();
  
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
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    ],
  }));

  return (
    <div className="custom-appbar"
      open={a}
    >
      {/* Contenido del lado izquierdo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={abrir}
          sx={[
            {
              marginInlineStart: 0,
              marginRight: 1, // Espacio entre el icono y el texto
            },
            open && { display: "block" },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          My Access
        </Typography>
      </div>

      {/* Contenido del lado derecho */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Button
          color="inherit"
          component={Link}
          to="/home"
          style={{ textTransform: "none" }}
        >
          Home
        </Button>
        <Avatar alt="User" src="/static/images/avatar/1.jpg" />
      </div>
    </div>
  );
}
