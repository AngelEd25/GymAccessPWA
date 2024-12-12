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
import { SubscriptionService } from '../services/Subscripciones.service';
import { PrimeReactProvider } from 'primereact/api';

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
import { Calendar } from 'primereact/calendar';
import { format, subHours } from 'date-fns';
import CalendarField from "./CalendarField";
import SearchableSelect from "./SearchableSelct";
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

export default function SubscriptionsDataTable() {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const [openAlertModal, setOpenAlertModal] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [subscriptionData, setSubscriptionsData] = useState([]); // Estado para los usuarios
  const [userData, setUserData] = useState([]); // Estado para los usuarios
  const [cardsData, setCardsData] = useState([]); // Estado para los usuarios
  const [notifications, setNotifications] = useState([]); // Estado para las Notificaciones

  const [loading, setLoading] = useState(true); // Para mostrar un mensaje mientras carga
  const [selectedSubscription, setSelectedSubscription] = useState(null); // Estado para el usuario seleccionado

  const handleOpenEdit = (sub) => {
    setSelectedSubscription(sub); // Almacena el usuario seleccionado
    setOpenModalEdit(true); // Abre el modal
  };
  const closeModalEdit = () => {
    setOpenModalEdit(false); // Cierra el modal
    setUpdatedTipo(null);
    setUpdatedPrecio(null);
    setUpdatedFechaInicio(null);
    setUpdatedVencimiento(null);
    setUpdatedCard(null);
    setUpdatedUser(null);
    setSelectedSubscription(null); // Limpia el card seleccionado
  };
  const handleOpenCreate = () => {
    setOpenModalCreate(true); // Abre el modal
  };

  const closeModalCreate = () => {
    setUpdatedTipo(null);
    setUpdatedPrecio(null);
    setUpdatedFechaInicio(null);
    setUpdatedVencimiento(null);
    setUpdatedCard(null);
    setUpdatedUser(null);
    setOpenModalCreate(false); // Limpia el card seleccionado
  };
  
  const closeAlertModal = () => {
    // setOpenModalEdit(false); // Abre el modal
    setOpenAlertModal(false); // Cierra el modal Alert
  };
  
 

  const handleSwitchStatus = async (subs) => {
    const id = subs._id;
    const status = subs.status;
    SubscriptionService.switchStatusSubscription(id, status);
    const newSubscriptionData = await SubscriptionService.getSubscriptions(); // Llamada al servicio
    setSubscriptionsData(newSubscriptionData); // Guardar datos en el estado
    setSelectedSubscription(null); // Limpia el usuario seleccionado
  };

  const handleDeleteSubscription = async (subs) => {
    console.log(subs._id); // Almacena el usuario seleccionado
    SubscriptionService.deleteSubscription(subs._id);
    const newSubscriptionData = await SubscriptionService.getSubscriptions(); // Llamada al servicio
    setSubscriptionsData(newSubscriptionData);
    setSelectedSubscription(null); // Limpia el usuario seleccionado
  };

  // Recargar la tabla de subscripciones
  const refreshTable =  async () =>{
    const sub = await SubscriptionService.getSubscriptions(); // Llamada al servicio
    setSubscriptionsData(sub); // Guardar datos en el estado
  }

  // Función para formatear la fecha y restar 6 horas
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt); // Convierte la cadena ISO a un objeto Date
    return format(date, "dd/MM/yyyy HH:mm"); // Formatea la fecha
  };

  // Estado para el valor actualizado del lote
  const [updatedTipo, setUpdatedTipo] = React.useState("");
  const [updatedPrecio, setUpdatedPrecio] = React.useState("");
  const [updatedFechaInicio, setUpdatedFechaInicio] = React.useState("");
  const [updatedVencimiento, setUpdatedVencimiento] = React.useState("");
  const [updatedCard, setUpdatedCard] = React.useState("");
  const [updatedUser, setUpdatedUser] = React.useState("");


  const changePrecio = (tipo) => {
    // Lógica para actualizar el precio según el tipo seleccionado
    if (tipo === "Semanal") setUpdatedPrecio(100);
    if (tipo === "Mensual") setUpdatedPrecio(400);
    if (tipo === "Semestral") setUpdatedPrecio(2200);
    if (tipo === "Anual") setUpdatedPrecio(4000);
  };

  const changeVencimiento = (tipo) => {
    if (!updatedFechaInicio) {
      console.error("Debe seleccionar una fecha de inicio antes de calcular la fecha de vencimiento.");
      return;
    }
    const newDate = new Date(updatedFechaInicio); // Crear una nueva instancia para no mutar el estado original

    if (tipo === "Semanal") {
      newDate.setDate(newDate.getDate() + 7); // Sumar 7 días
    } else if (tipo === "Mensual") {
      newDate.setMonth(newDate.getMonth() + 1); // Sumar 1 mes
    } else if (tipo === "Semestral") {
      newDate.setMonth(newDate.getMonth() + 6); // Sumar 6 meses
    } else if (tipo === "Anual") {
      newDate.setFullYear(newDate.getFullYear() + 1); // Sumar 1 año
    }
  
    setUpdatedVencimiento(newDate); // Actualizar la fecha de vencimiento
  };

  // Estados para las alertas
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState(""); // success, warning, error

  React.useEffect(() => {
    if (selectedSubscription) {
      setUpdatedTipo(selectedSubscription.type); // Inicializa el valor con el tipo actual
      setUpdatedPrecio(selectedSubscription.price); // Inicializa el valor con el precio actual
      setUpdatedFechaInicio(selectedSubscription.startDate); // Inicializa el valor con la fecha de contrato actual
      setUpdatedVencimiento(selectedSubscription.endDate); // Inicializa el valor con la fecha de vencimiento actual
      setUpdatedCard(selectedSubscription.card._id); // Inicializa el valor de tarjeta actual
      setUpdatedUser(selectedSubscription.user._id); // Inicializa el valor del usuario actual
    }
  }, [selectedSubscription]);

  // Función para manejar la confirmación del formulario
  const handleConfirmEdit = async () => {
      if (!updatedTipo || !updatedPrecio || !updatedFechaInicio || !updatedVencimiento || !updatedCard || !updatedUser) {
        setAlertMessage("Por favor, complete todos los campos requeridos.");
        setAlertSeverity("warning");
        setOpenAlertModal(true);
        return;
      }
      try{
          // Llamada al backend para actualizar la tarjeta
          const responseFindCard = await CardService.getCardById(selectedSubscription.card._id);
          console.log(responseFindCard);
            // Llamada al backend para actualizar la subscripcion
            const responseUpdateSubscription = await SubscriptionService.putSubscription(selectedSubscription._id, {
              type: updatedTipo,
              price: updatedPrecio,
              startDate: updatedFechaInicio,
              endDate: updatedVencimiento,
              card: updatedCard,
              userId: updatedUser
            });
              // Actualiza la lista de subscripciones (subsData)
              const sub = await SubscriptionService.getSubscriptions(); // Llamada al servicio
              setSubscriptionsData(sub); // Guardar datos en el estado
              setAlertMessage("Subscripcion actualizada exitosamente.");
              setAlertSeverity("success");
              setOpenAlertModal(true);
              closeModalEdit(); // Cierra el modal              
      }catch (error) {
        console.error("Error al actualizar usuario:", error);
        setAlertMessage("Algo salio mal al actualizar Subscripcion.");
        setAlertSeverity("warning");
        setOpenAlertModal(true);
      }
  };

  
  const handleConfirmCreate = async () => {

    // console.log(updatedTipo);
    // console.log(updatedPrecio);
    // console.log(updatedFechaInicio);
    // console.log(updatedVencimiento);
    console.log("Tarjeta: " + updatedCard);
    // console.log("Usuario: " + updatedUser);
    try{
        if (!updatedTipo || !updatedPrecio || !updatedFechaInicio || !updatedVencimiento || !updatedCard || !updatedUser) {
          setAlertMessage("Por favor, complete todos los campos requeridos.");
          setAlertSeverity("warning");
          setOpenAlertModal(true);
          return;
        }      
          // Llamada al backend para actualizar la subscripcion
          const responseUpdateSubscription = await SubscriptionService.postSubscription({
            type: updatedTipo,
            price: updatedPrecio,
            startDate: updatedFechaInicio,
            endDate: updatedVencimiento,
            card: updatedCard,
            userId: updatedUser
          });
            // Actualiza la lista de subscripciones (subsData)
            const sub = await SubscriptionService.getSubscriptions(); // Llamada al servicio
            setSubscriptionsData(sub); // Guardar datos en el estado
            setAlertMessage("Subscripcion actualizada exitosamente.");
            setAlertSeverity("success");
            setOpenAlertModal(true);
            closeModalEdit(); // Cierra el modal              
    }catch (error) {
      console.error("Error al actualizar usuario:", error);
      setAlertMessage("Algo salio mal al Crear Subscripcion");
      setAlertSeverity("warning");
      setOpenAlertModal(true);
    }
};
  // STATES PARA SELECT DE USERS
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelect = (value) => {

    setUpdatedCard(value.card._id)
    setUpdatedUser(value._id)
    setSelectedOption(value);
  };

  // Obtener usuarios al cargar el componente
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const subs = await SubscriptionService.getSubscriptions(); // Llamada al servicio
        setSubscriptionsData(subs); // Guardar datos en el estado
        const user = await UserService.getUsers(); // Llamada al servicio
        setUserData(user); // Guardar datos en el estado
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
    return <div>Cargando Subscripciones...</div>;
  }

  // Si no hay usuarios, muestra un mensaje
  if (subscriptionData.length === 0) {
    return <div>No hay subscripciones registrados.</div>;
  }

  return (
    
    <TableContainer
      sx={{ md: 600, lg: 1024, xl: 1524,
        display: { xs: 'none', sm: 'block', md: 'block', lg:'block'}
      }}>
            <Table sx={{ minWidth: 110 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align="left">
              <Typography fontSize={27} sx={{padding: 1, paddingLeft: 2}}>
                <AccountCircleIcon/> Subscripciones
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
            <TableCell align="left">Usuario</TableCell>
            <TableCell align="left">Tarjeta</TableCell>
            <TableCell align="left">Tipo</TableCell>
            <TableCell align="left">Precio</TableCell>
            <TableCell align="left">Inicio</TableCell>
            <TableCell align="left">Vencimiento</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Editar</TableCell>
            <TableCell align="left">Suspender</TableCell>
            <TableCell align="left">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptionData.map((sub) => (
            <TableRow
              key={sub._id} // Usar el ID único del usuario
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {sub.user.name} {sub.user.lastName} {/* Nombre y apellido */}
              </TableCell>
              <TableCell align="left">
                {sub.card ? sub.card.lote : "N/A"} {/* Mostrar el lote de la tarjeta */}
              </TableCell>
              <TableCell align="left">
                {sub.type}
              </TableCell>
              <TableCell align="left">
                {sub.price}
              </TableCell>
              <TableCell align="left">
                {sub.startDate ? formatCreatedAt(sub.startDate) : "N/A"}
              </TableCell>
              <TableCell align="left">
                {sub.endDate ? formatCreatedAt(sub.endDate) : "N/A"}
              </TableCell>
              <TableCell align="left">
                {sub.status == "activo" ? "Activo" : "Inactivo"} {/* Suponer un estado predeterminado */}
              </TableCell>
              <TableCell align="left">
                <Button variant="contained" size="small" onClick={() => {handleOpenEdit(sub)}}>
                  <EditIcon />
                </Button>
              </TableCell>
              <TableCell align="left">
                  <Button variant="contained" size="small" onClick={() => handleSwitchStatus(sub)}>
                    {sub.status === "activo" ? (
                      <ToggleOnIcon style={{ color: "green" }} /> // Ícono para usuarios activos
                    ) : (
                      <ToggleOffIcon style={{ color: "red" }} /> // Ícono para usuarios inactivos
                    )}
                  </Button>
              </TableCell>
              <TableCell align="left">
                <Button variant="contained" size="small" onClick={() => handleDeleteSubscription(sub)}>
                  <DeleteIcon />  
                </Button>
              </TableCell>
            </TableRow>

          ))}

          {/* MODAL UPDATE */}
          <Modal
            open={openModalEdit}
            onClose={closeModalEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {selectedSubscription && (
                  <>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardHeader
                        action={
                          <IconButton aria-label="settings" onClick={closeModalEdit}>
                            <ClearIcon />
                          </IconButton>
                        }
                        title="Editar Subscripción"
                        subheader={
                          "Para: " +
                          selectedSubscription.user.name +
                          " " +
                          selectedSubscription.user.lastName
                        }
                      />

                      <CardContent>
                        <Box sx={{ width: 500, maxWidth: "100%" }}>
                          <TextField
                            fullWidth
                            disabled
                            id="user"
                            margin="dense"
                            label="Usuario"
                            value={updatedUser}
                            onChange={(e) => setUpdatedUser(e.target.value)}
                            variant="filled"
                            size="small"
                          />
                          <TextField
                            fullWidth
                            disabled
                            id="vencimiento"
                            margin="dense"
                            label="Fecha de Vencimiento"
                            value={updatedVencimiento}
                            onChange={(date) => setUpdatedVencimiento(date)}  //Actualizar fecha de vencimiento
                            variant="filled"
                            size="small"
                          />
                          <CalendarField
                            label="Fecha de Inicio"
                            selectedDate={updatedFechaInicio}
                            onChange={(date) => setUpdatedFechaInicio(date)} // Actualizar fecha de inicio
                          />

                        </Box>
                        <Box sx={{ minWidth: 200 }}>
                          <FormControl fullWidth>
                            <InputLabel id="tipo-label">Tipo Subscripcion</InputLabel>
                            <Select
                              labelId="tipo-label"
                              id="tipo"
                              value={updatedTipo}
                              label="Tipo"
                              onChange={(e) => {
                                setUpdatedTipo(e.target.value);
                                changePrecio(e.target.value);
                                changeVencimiento(e.target.value);
                              }}
                            >
                              <MenuItem value={"Semanal"}>Semanal</MenuItem>
                              <MenuItem value={"Mensual"}>Mensual</MenuItem>
                              <MenuItem value={"Semestral"}>Semestral</MenuItem>
                              <MenuItem value={"Anual"}>Anual</MenuItem>
                            </Select>
                          </FormControl>

                        </Box>                        
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <strong>Status:</strong>{" "}
                          {selectedSubscription.status === "activo" ? "Activo" : "Inactivo"}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => handleConfirmEdit()}>
                          Confirmar
                        </Button>
                        <Button size="small" onClick={closeModalEdit}>
                          Cancelar
                        </Button>
                      </CardActions>
                    </Card>
                  </>
                )}
            </Box>
          </Modal>

          {/* MODAL CREATE */}
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
                        title="Agregar Subscripción"
                      />

                      <CardContent>
                        <Box sx={{ width: 500, maxWidth: "100%" }}>
                          <div>
                            <SearchableSelect
                              options={userData}
                              label="Buscar Usuario"
                              onSelect={handleSelect}
                            />
                            {selectedOption && (
                              <>
                                <TextField
                                fullWidth
                                disabled
                                id="user"
                                margin="dense"
                                label="Usuario"
                                value={selectedOption.name + " " + selectedOption.lastName }
                                variant="filled"
                                size="small"
                                />
                                <TextField
                                fullWidth
                                disabled
                                id="card"
                                margin="dense"
                                label="Tarjeta"
                                value={selectedOption.card.lote}
                                
                                variant="filled"
                                size="small"
                                />                       
                              </>

                            )}
                          </div>
                          <TextField
                            fullWidth
                            disabled
                            id="precio"
                            margin="dense"
                            label="Precio"
                            value={updatedPrecio}
                            onChange={(e) => setUpdatedPrecio(e.target.value)}
                            variant="filled"
                            size="small"
                          />
                          <TextField
                            fullWidth
                            disabled
                            id="vencimiento"
                            margin="dense"
                            label="Fecha de Vencimiento"
                            value={updatedVencimiento}
                            onChange={(date) => setUpdatedVencimiento(date)}  //Actualizar fecha de vencimiento
                            variant="filled"
                            size="small"
                          />
                          <CalendarField
                            label="Fecha de Inicio"
                            selectedDate={updatedFechaInicio}
                            onChange={(date) => setUpdatedFechaInicio(date)} // Actualizar fecha de inicio
                          />

                        </Box>
                        <Box sx={{ minWidth: 200 }}>
                          <FormControl fullWidth>
                            <InputLabel id="tipo-label">Tipo Subscripcion</InputLabel>
                            <Select
                              labelId="tipo-label"
                              id="tipo"
                              value={updatedTipo}
                              label="Tipo"
                              onChange={(e) => {
                                setUpdatedTipo(e.target.value);
                                changePrecio(e.target.value);
                                changeVencimiento(e.target.value);
                              }}
                            >
                              <MenuItem value={"Semanal"}>Semanal</MenuItem>
                              <MenuItem value={"Mensual"}>Mensual</MenuItem>
                              <MenuItem value={"Semestral"}>Semestral</MenuItem>
                              <MenuItem value={"Anual"}>Anual</MenuItem>
                            </Select>
                          </FormControl>

                        </Box>                        
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => handleConfirmCreate()}>
                          Confirmar
                        </Button>
                        <Button size="small" onClick={closeModalCreate}>
                          Cancelar
                        </Button>
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
