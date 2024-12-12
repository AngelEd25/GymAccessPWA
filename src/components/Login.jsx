import React, { useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import { UserService } from '../services/Usuario.service';


function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [updatedName, setUpdatedName] = React.useState("");
  const [updatedStatus, setUpdatedStatus] = React.useState("");
  const [updatedLastName, setUpdatedLastName] = React.useState("");
  const [updatedLote, setUpdatedLote] = React.useState("");
  const [updatedEmail, setUpdatedEmail] = React.useState("");
  const [updatedPasword, setUpdatedPasword] = React.useState("");
  const [updatedAddress, setUpdatedAddress] = React.useState("");
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {sm: '320px', md: '320px'},
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: .15
  };

  // Estados para las alertas
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState(""); // success, warning, error  
  const closeAlertModal = () => {
    // setOpenModalEdit(false); // Abre el modal
    setOpenAlertModal(false); // Cierra el modal Alert
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const closeModalCreate = () => {
    setOpenModalCreate(false); // Cierra el modal
    setUpdatedEmail(null);
    setUpdatedPasword(null);
    setSelectedUser(null); // Limpia el card seleccionado
  };

  const handleConfirmCreate = async () => {

    console.log(updatedEmail);
    console.log(updatedPasword);

    if (!updatedEmail  || !updatedPasword) {
      setAlertMessage("Por favor, complete todos los campos requeridos.");
      setAlertSeverity("warning");
      setOpenAlertModal(true);
      return;
    }
    try{
        const responseUpdateUser = await UserService.loginUser({
            email: updatedEmail,
            password: updatedPasword
          });

          if(responseUpdateUser){
              // Actualiza la lista de usuarios (usersData)
              setAlertMessage("Usuario creado exitosamente.");
              setAlertSeverity("success");
              setOpenAlertModal(true);

            // Redirigir al login tras un breve tiempo
            setTimeout(() => {
              setOpenAlertModal(false);
              navigate("/admin-2/usuarios");
            }, 5000); // 2 segundos para mostrar el modal antes de redirigir
          }
        else{
          // Llamada al backend para actualizar el usuario
          setAlertMessage("Algo salio mal al crear usuario.");
          setAlertSeverity("success");
          setOpenAlertModal(true);

        }

    }catch (error) {
      console.error("Error al crear usuario:", error);
      alert("Error al crear Usuario.");
      setAlertMessage("Error al crear usuario");
      setAlertSeverity("warning");
      setOpenAlertModal(true);
    }
};

  return (
    <div className="login-container">
      <div className="logo">Gym Access</div>
      <div className="login-form">
        <h2>¡BIENVENIDO! </h2>
        <h2>Ingresa tus datos porfavor</h2>
        <form id="card-form-login">
        <Box sx={{ width: {sm: 450, md: 500, lg: 800}, maxWidth: "100%" }}>                 
                        <TextField
                          fullWidth
                          id="email"
                          margin="dense"
                          label="Email"
                          value={updatedEmail}
                          onChange={(e) => setUpdatedEmail(e.target.value)}
                          variant="outlined"
                          size="small"
                        />
                       {/* <TextField
                          fullWidth
                          id="pasword"
                          margin="dense"
                          label="Contraseña"
                          value={updatedPasword}
                          onChange={(e) => setUpdatedPasword(e.target.value)}
                          variant="outlined"
                          size="small"
                        /> */}

                        <FormControl sx={{ width: '100%' }} variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                          <FilledInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={updatedPasword}
                            onChange={(e) => setUpdatedPasword(e.target.value)}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label={
                                    showPassword ? 'hide the password' : 'display the password'
                                  }
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  onMouseUp={handleMouseUpPassword}
                                  edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                              }
                              label="Password"
                          />
                        </FormControl>
                    </Box>
                    <Modal open={openAlertModal} onClose={closeAlertModal} aria-labelledby="alert-modal-title" aria-describedby="alert-modal-description">
                      <Box sx={{ ...style, textAlign: "center", p: 4 }}>
                        <Alert severity={alertSeverity} onClose={closeAlertModal}>
                          {alertMessage}
                        </Alert>
                      </Box>
                    </Modal>

          <Link type="button" to="/admin/register">Registrate</Link>
          <Button variant="contained" size="small" onClick={() => handleConfirmCreate()}>
            Ingresar
          </Button>
        </form>
      </div>
    </div>

  );
}

export default Register;
