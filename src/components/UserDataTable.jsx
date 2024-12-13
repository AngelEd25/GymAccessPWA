import React, { useState, useEffect, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserService } from '../services/Usuario.service';
import { CardService } from '../services/Cards.service';

import MenuOptions from './MenuOptions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CallToActionIcon from '@mui/icons-material/CallToAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';




import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


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

export default function UserDataTable() {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const [openAlertModal, setOpenAlertModal] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [users, setUsersData] = useState([]); // Estado para los usuarios
  const [cardsData, setCardsData] = useState([]); // Estado para los usuarios
  const [notifications, setNotifications] = useState([]); // Estado para las Notificaciones
  const [loading, setLoading] = useState(true); // Para mostrar un mensaje mientras carga
  const [selectedUser, setSelectedUser] = useState(null); // Estado para el usuario seleccionado
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user); // Almacena el usuario seleccionado
    setOpenModalEdit(true); // Abre el modal
  };

  const closeAlertModal = () => {
    // setOpenModalEdit(false); // Abre el modal
    setOpenAlertModal(false); // Cierra el modal Alert
  };

  const closeModalEdit = () => {
    setOpenModalEdit(false); // Cierra el modal
    setUpdatedName(null);
    setUpdatedStatus(null);
    setUpdatedLastName(null);
    setUpdatedLote(null);
    setUpdatedEmail(null);
    setUpdatedPasword(null);
    setUpdatedAddress(null);
    setSelectedUser(null); // Limpia el card seleccionado
  };

  const handleOpenCreate = (user) => {
    setSelectedUser(user); // Almacena el usuario seleccionado
    setOpenModalCreate(true); // Abre el modal
  };

  const closeModalCreate = () => {
    setOpenModalCreate(false); // Cierra el modal
    setUpdatedName(null);
    setUpdatedStatus(null);
    setUpdatedLastName(null);
    setUpdatedLote(null);
    setUpdatedEmail(null);
    setUpdatedPasword(null);
    setUpdatedAddress(null);
    setSelectedUser(null); // Limpia el card seleccionado
  };


  const handleSwitchStatus = async (users) => {
    const id = users._id;
    const status = users.status;
    UserService.switchStatusUser(id, status);
    const newUserData = await UserService.getUsers(); // Llamada al servicio
    setUsersData(newUserData); // Guardar datos en el estado
    setSelectedUser(null); // Limpia el usuario seleccionado
  };

  const handleDeleteUser = async (users) => {
    console.log(users._id); // Almacena el usuario seleccionado
    UserService.deleteUser(users._id);
    const newUserData = await UserService.getUsers(); // Llamada al servicio
    setUsersData(newUserData);
    setSelectedUser(null); // Limpia el usuario seleccionado
  };

  const refreshTable =  async () =>{
    const user = await UserService.getUsers(); // Llamada al servicio
    setUsersData(user); // Guardar datos en el estado
  }

  // Estado para el valor actualizado del lote
  const [updatedName, setUpdatedName] = React.useState("");
  const [updatedStatus, setUpdatedStatus] = React.useState("");
  const [updatedLastName, setUpdatedLastName] = React.useState("");
  const [updatedLote, setUpdatedLote] = React.useState("");
  const [updatedEmail, setUpdatedEmail] = React.useState("");
  const [updatedPasword, setUpdatedPasword] = React.useState("");
  const [updatedAddress, setUpdatedAddress] = React.useState("");



  // Estados para las alertas
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState(""); // success, warning, error

  React.useEffect(() => {
    if (selectedUser) {
    
      selectedUser.card ?  setUpdatedLote(selectedUser.card.lote) : setUpdatedLote('N/A')
      //  setUpdatedLote(selectedUser.card.lote);  Inicializa el valor con el lote actual  
      setUpdatedName(selectedUser.name); // Inicializa el valor con el nombre actual
      setUpdatedLastName(selectedUser.lastName); // Inicializa el valor con el apellido actual
      setUpdatedEmail(selectedUser.email); // Inicializa el valor con el email actual
      setUpdatedStatus(selectedUser.status); // Inicializa el valor con el estado actual
    }
  }, [selectedUser]);

  // Función para manejar la confirmación del formulario
  const handleConfirmEdit = async () => {
      if (!updatedName || !updatedEmail || !updatedLastName || !updatedLote) {
        setAlertMessage("Por favor, complete todos los campos requeridos.");
        setAlertSeverity("warning");
        setOpenAlertModal(true);
        return;
      }
      try{
          // Llamada al backend para actualizar la tarjeta
          // const responseFindCard = await CardService.getCardById(selectedUser.card._id);
          // console.log(responseFindCard);
          if(!selectedUser.card){
            // actualiiza
            const responseFindCard = await CardService.postCard({
                lote: updatedLote,
                userId: selectedUser._id
            });
            // setAlertMessage("Se asigno una nueva tarjeta.");
            // setAlertSeverity("success");
            // setOpenAlertModal(false);
          }
          else{
            // Llamada al backend para actualizar el usuario
            const responseUpdateUser = await UserService.putUser(selectedUser._id, {
              name: updatedName,
              lastName: updatedLastName,
              email: updatedEmail,
              card: selectedUser.card._id
            });
            // Llamada al backend para actualizar la tarjeta
            const responseUpdateCard = await CardService.putCard(selectedUser.card._id, {
              lote: updatedLote,
            });
              // Actualiza la lista de usuarios (usersData)
              const user = await UserService.getUsers(); // Llamada al servicio
              setUsersData(user); // Guardar datos en el estado
              const cards = await CardService.getCards(); // Llamada al servicio
              setCardsData(cards); // Guardar datos en el estado
              setAlertMessage("Usuario actualizado exitosamente.");
              setAlertSeverity("success");
              setOpenAlertModal(true);
              closeModalEdit(); // Cierra el modal              
          }

      }catch (error) {
        console.error("Error al actualizar usuario:", error);
        alert("Error al actualizar Usuario.");
      }
  };


  // Función para manejar la confirmación del formulario
  const handleConfirmCreate = async () => {

    if (!updatedName || !updatedEmail || !updatedLastName || !updatedAddress || !updatedPasword) {
      setAlertMessage("Por favor, complete todos los campos requeridos.");
      setAlertSeverity("warning");
      setOpenAlertModal(true);
      return;
    }
    try{
       
        const responseUpdateUser = await UserService.postUser({
            name: updatedName,
            lastName: updatedLastName,
            email: updatedEmail,
            card: updatedLote,
            password: updatedPasword,
            address: updatedAddress
          });

          console.log(responseUpdateUser.user._id);
          if(responseUpdateUser){
            // Llamada al backend para actualizar la tarjeta
              const responseUpdateCard = await CardService.postCard({
                lote: updatedLote,
                userId: responseUpdateUser.user._id
              });
              // Actualiza la lista de usuarios (usersData)
              const user = await UserService.getUsers(); // Llamada al servicio
              setUsersData(user); // Guardar datos en el estado
              const cards = await CardService.getCards(); // Llamada al servicio
              setCardsData(cards); // Guardar datos en el estado
              setAlertMessage("Usuario creado exitosamente.");
              setAlertSeverity("success");
              setOpenAlertModal(true);
              closeModalCreate(); // Cierra el modal               
          }
        else{
          // Llamada al backend para actualizar el usuario
          setAlertMessage("Algo salio mal al crear usuario.");
          setAlertSeverity("success");
          setOpenAlertModal(true);
          closeModalCreate(); // Cierra el modal 
           
        }

    }catch (error) {
      console.error("Error al crear usuario:", error);
      alert("Error al crear Usuario.");
    }
};
  // Obtener usuarios al cargar el componente
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const users = await UserService.getUsers(); // Llamada al servicio
        setUsersData(users); // Guardar datos en el estado
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setLoading(false); // Deshabilitar estado de carga
      }
    };
    fetchServices(); // Llamar a la función
  }, []);

  // Si está cargando, muestra un mensaje
  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  // Si no hay usuarios, muestra un mensaje
  if (users.length === 0) {
    return <div>No hay usuarios registrados.</div>;
  }

  return (
    <TableContainer
      sx={{ md: 600, lg: 1024, xl: 1524,
        display: { xs: 'block', sm: 'block', md: 'block', lg:'block'}
      }}>
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align="left">
              <Typography fontSize={27} sx={{padding: 1, paddingLeft: 2}}>
                <AccountCircleIcon/> Usuarios
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Button variant="contained" size="small" onClick={() => handleOpenCreate()}>
                <AddIcon />
              </Button>
            </TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left">Refrescar</TableCell>
            <TableCell align="left">
              <Button variant="contained" size="small" onClick={() => refreshTable()}>
                <AutorenewIcon />
                </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Tarjeta</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Rol</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Editar</TableCell>
            <TableCell align="left">Suspender</TableCell>
            <TableCell align="left">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user._id} // Usar el ID único del usuario
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name} {user.lastName} {/* Nombre y apellido */}
              </TableCell>
              <TableCell align="left">
              {user.card ? user.card.lote : "N/A"} {/* Mostrar el lote de la tarjeta */}
              </TableCell>
              <TableCell align="left">
                {user.email}
              </TableCell>
              <TableCell align="left">
                {user.role == "user" ? "Usuario" : "Admin"}
              </TableCell>
              <TableCell align="left">
                {user.status == "activo" ? "Activo" : "Inactivo"} {/* Suponer un estado predeterminado */}
              </TableCell>
              <TableCell align="left">
                <Button variant="contained" size="small" onClick={() => {handleOpenEdit(user)}}>
                  <EditIcon />
                </Button>
              </TableCell>
              <TableCell align="left">
                  <Button variant="contained" size="small" onClick={() => handleSwitchStatus(user)}>
                    {user.status === "activo" ? (
                      <ToggleOnIcon style={{ color: "green" }} /> // Ícono para usuarios activos
                    ) : (
                      <ToggleOffIcon style={{ color: "red" }} /> // Ícono para usuarios inactivos
                    )}
                  </Button>
              </TableCell>
              <TableCell align="left">
                <Button variant="contained" size="small" onClick={() => handleDeleteUser(user)}>
                  <DeleteIcon />  
                </Button>
              </TableCell>
            </TableRow>

          ))}
          <Modal
            open={openModalEdit}
            onClose={closeModalEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {selectedUser && (
                  <>
                    <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        action={
                          <IconButton aria-label="settings" onClick={closeModalEdit}>
                            <ClearIcon />
                          </IconButton>
                        }
                        title="Editar Usuario"
                        subheader={selectedUser.name + " " + selectedUser.lastName + " " + selectedUser.role}
                      />
                      <CardContent>
                      <Box sx={{ width: 500, maxWidth: "100%" }}>
                        <TextField
                          fullWidth
                          required
                          id="name"
                          margin="dense"
                          label="Nombre"
                          value={updatedName}
                          onChange={(e) => setUpdatedName(e.target.value)}
                          variant="filled"
                          size="small"
                        />
                        <TextField
                          fullWidth
                          id="lastName"
                          margin="dense"
                          label="Apellido"
                          value={updatedLastName}
                          onChange={(e) => setUpdatedLastName(e.target.value)}
                          variant="filled"
                          size="small"
                        />
                        <TextField
                            fullWidth
                            required
                            id="standard-required"
                            margin="dense"
                            label="Tarjeta"
                            value={updatedLote}
                            placeholder={selectedUser.card ? selectedUser.card.lote : "N/A"}
                            variant="filled"
                            size="small"
                            onChange={(e) => setUpdatedLote(e.target.value)} 
                        />                          
                        <TextField
                          fullWidth
                          id="email"
                          margin="dense"
                          label="Email"
                          value={updatedEmail}
                          onChange={(e) => setUpdatedEmail(e.target.value)}
                          variant="filled"
                          size="small"
                        />
                    </Box>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <strong>Status:</strong> {selectedUser.status === "activo"?  "Activo" :"Inactivo" }
                        </Typography>               
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={handleConfirmEdit}>Confirmar</Button>
                        <Button size="small" onClick={closeModalEdit}>Cancelar</Button>
                      </CardActions>
                    </Card>
                  </>
                )}
            </Box>
          </Modal>


          <Modal
            open={openModalCreate}
            onClose={closeModalCreate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                    <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        action={
                          <IconButton aria-label="settings" onClick={closeModalCreate}>
                            <ClearIcon />
                          </IconButton>
                        }
                        title="Agregar Usuario"
                        
                      />
                      <CardContent>
                      <Box sx={{ width: 500, maxWidth: "100%" }}>
                        <TextField
                          fullWidth
                          required
                          id="name"
                          margin="dense"
                          label="Nombre"
                          value={updatedName}
                          onChange={(e) => setUpdatedName(e.target.value)}
                          variant="filled"
                          size="small"
                        />
                        <TextField
                          fullWidth
                          required
                          id="lastName"
                          margin="dense"
                          label="Apellido"
                          value={updatedLastName}
                          onChange={(e) => setUpdatedLastName(e.target.value)}
                          variant="filled"
                          size="small"
                        />
                        <TextField
                          fullWidth
                          required
                          id="standard-required"
                          margin="dense"
                          label="Tarjeta"
                          value={updatedLote}
                          placeholder={"Agrega una tarjeta"}
                          variant="filled"
                          size="small"
                          onChange={(e) => setUpdatedLote(e.target.value)} 
                        />                          
                        <TextField
                          fullWidth
                          id="email"
                          margin="dense"
                          label="Email"
                          value={updatedEmail}
                          onChange={(e) => setUpdatedEmail(e.target.value)}
                          variant="filled"
                          size="small"
                        />
                       {/* <TextField
                          fullWidth
                          id="pasword"
                          margin="dense"
                          label="Contraseña"
                          value={updatedPasword}
                          onChange={(e) => setUpdatedPasword(e.target.value)}
                          variant="filled"
                          size="small"
                        /> */}

                        <FormControl sx={{ width: '100%' }} variant="filled">
                          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                          <FilledInput
                            id="filled-adornment-password"
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

                        <TextField
                          fullWidth
                          id="address"
                          margin="dense"
                          label="Direccion"
                          value={updatedAddress}
                          onChange={(e) => setUpdatedAddress(e.target.value)}
                          variant="filled"
                          size="small"
                        />
                    </Box>
             
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={handleConfirmCreate}>Confirmar</Button>
                        <Button size="small" onClick={closeModalEdit}>Cancelar</Button>
                      </CardActions>
                    </Card>



            </Box>
          </Modal>

          <Modal open={openAlertModal} onClose={closeAlertModal} aria-labelledby="alert-modal-title" aria-describedby="alert-modal-description">
            <Box sx={{ ...style, textAlign: "center", p: 4 }}>
              <Alert severity={alertSeverity} onClose={closeAlertModal}>
                {alertMessage}
              </Alert>
            </Box>
          </Modal>

        </TableBody>
      </Table>
    </TableContainer>
  );
}
