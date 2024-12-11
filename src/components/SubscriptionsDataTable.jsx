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
  const [openAlertModal, setOpenAlertModal] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [subscriptionData, setSubscriptionsData] = useState([]); // Estado para los usuarios
  const [cardsData, setCardsData] = useState([]); // Estado para los usuarios
  const [notifications, setNotifications] = useState([]); // Estado para las Notificaciones

  const [loading, setLoading] = useState(true); // Para mostrar un mensaje mientras carga
  const [selectedSubscription, setSelectedSubscription] = useState(null); // Estado para el usuario seleccionado

  const handleOpenEdit = (sub) => {
    setSelectedSubscription(sub); // Almacena el usuario seleccionado
    setOpenModalEdit(true); // Abre el modal
  };

  const closeAlertModal = () => {
    // setOpenModalEdit(false); // Abre el modal
    setOpenAlertModal(false); // Cierra el modal Alert
  };
  
  const closeModalEdit = () => {
    setOpenModalEdit(false); // Cierra el modal
    setSelectedSubscription(null); // Limpia el card seleccionado
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

  // Estados para las alertas
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState(""); // success, warning, error

  React.useEffect(() => {
    if (selectedSubscription) {
      setUpdatedTipo(selectedSubscription.type); // Inicializa el valor con el tipo actual
      setUpdatedPrecio(selectedSubscription.price); // Inicializa el valor con el precio actual
      setUpdatedFechaInicio(selectedSubscription.startDate); // Inicializa el valor con la fecha de contrato actual
      setUpdatedVencimiento(selectedSubscription.endDate); // Inicializa el valor con la fecha de vencimiento actual
    }
  }, [selectedSubscription]);

  // Función para manejar la confirmación del formulario
  const handleConfirm = async () => {
      if (!updatedTipo || !updatedPrecio || !updatedFechaInicio || !updatedVencimiento) {
        setAlertMessage("Por favor, complete todos los campos requeridos.");
        setAlertSeverity("warning");
        setOpenAlertModal(true);
        return;
      }
      try{
          // Llamada al backend para actualizar la tarjeta
          // const responseFindCard = await CardService.getCardById(selectedSubscription.card._id);
          // console.log(responseFindCard);
           console.log(updatedTipo);
           console.log(updatedPrecio);
           console.log(updatedFechaInicio);
           console.log(updatedVencimiento);


          
            
            // Llamada al backend para actualizar el usuario
            // const responseUpdateSubscription = await SubscriptionService.putSubscription(selectedSubscription._id, {
            //   name: updatedName,
            //   lastName: updatedLastName,
            //   email: updatedEmail,
            //   card: selectedSubscription.card._id
            // });
            // // Llamada al backend para actualizar la tarjeta
            // const responseUpdateCard = await CardService.putCard(selectedSubscription.card._id, {
            //   lote: updatedLote,
            // });
            //   // Actualiza la lista de usuarios (subsData)
            //   const sub = await SubscriptionService.getSubscriptions(); // Llamada al servicio
            //   setSubscriptionsData(sub); // Guardar datos en el estado
            //   const cards = await CardService.getCards(); // Llamada al servicio
            //   setCardsData(cards); // Guardar datos en el estado
            //   setAlertMessage("Usuario actualizado exitosamente.");
            //   setAlertSeverity("success");
            //   setOpenAlertModal(true);
            //   closeModalEdit(); // Cierra el modal              
          

      }catch (error) {
        console.error("Error al actualizar usuario:", error);
        alert("Error al actualizar Usuario.");
      }
  };

  const [tipo, setTipo] = React.useState('');

  const changePrecio = (event) => {
    console.log(event);
    switch (event) {
      case 'Semanal':
      setUpdatedPrecio(79);
      break;
      case 'Mensual':
      setUpdatedPrecio(289);
      break;
      case 'Semestral':
      setUpdatedPrecio(1559);  
      break;
      case 'Anual':
      setUpdatedPrecio(2799);  
      break;
      default:
        break;
    }
    console.log(updatedPrecio);
  };

  // Obtener usuarios al cargar el componente
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const subs = await SubscriptionService.getSubscriptions(); // Llamada al servicio
        setSubscriptionsData(subs); // Guardar datos en el estado
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
        display: { xs: 'none', sm: 'none', md: 'block', lg:'block'}
      }}>
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align="left">
              <Typography fontSize={27} sx={{padding: 1, paddingLeft: 2}}>
                <AccountCircleIcon/> Subscripciones
              </Typography>
            </TableCell>
            <TableCell align="left">
            <Button variant="contained" size="small" onClick={() => addSubscripcion()}>
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
                        title="Editar Subscripcion"
                        subheader={"para: " + selectedSubscription.user.name + " " + selectedSubscription.user.lastName}
                      />
                      <CardContent>
                        <Box sx={{ minWidth: 200 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={updatedTipo}
                              label="Tipo"
                              onChange={(e) => {setUpdatedTipo(e.target.value), changePrecio(e.target.value)}}
                            >
                              <MenuItem value={'Semanal'}>Semanal</MenuItem>
                              <MenuItem value={'Mensual'}>Mensual</MenuItem>
                              <MenuItem value={'Semestral'}>Semestral</MenuItem>
                              <MenuItem value={'Anual'}>Anual</MenuItem>
                            </Select>  
                          </FormControl>
                        </Box>                        
                      <Box sx={{ width: 500, maxWidth: "100%" }}>

                        <TextField
                          fullWidth
                          disabled
                          id="lastName"
                          margin="dense"
                          label="Precio"
                          value={updatedPrecio}
                          onChange={(e) => setUpdatedPrecio(e.target.value)}
                          variant="filled"
                          size="small"
                        />
                        {/* <div className="card flex justify-content-center">
                            <Calendar value={updatedFechaInicio} onChange={(e) => setUpdatedFechaInicio(e.target.value)} />
                        </div>
                        <Calendar value={updatedFechaInicio} onChange={(e) => setUpdatedFechaInicio(e.target.value)} /> */}
                        {/* <TextField
                            fullWidth
                            required
                            id="standard-required"
                            margin="dense"
                            label="Inicio"
                            value={updatedFechaInicio}
                            placeholder={formatCreatedAt(selectedSubscription.startDate)}
                            variant="filled"
                            size="small"
                            onChange={(e) => setUpdatedFechaInicio(e.target.value)} 
                        />  */}
                        <CalendarField
                          label="Fecha de Inicio"
                          selectedDate={selectedSubscription.startDate}
                          
                          onChange={(date) => setUpdatedFechaInicio(date)} 
                        />
                        <CalendarField
                          label="Fecha de Fin"
                          selectedDate={selectedSubscription.startDate}
                          onChange={(date) => setUpdatedVencimiento(date)} 

                        />                  
                        {/* <TextField
                          fullWidth
                          id="email"
                          margin="dense"
                          label="Vencimiento"
                          value={selectedSubscription ? formatCreatedAt(selectedSubscription.endDate) : "N/A"}
                          placeholder={selectedSubscription ? formatCreatedAt(selectedSubscription.endDate) : "N/A"}
                          onChange={(e) => setUpdatedVencimiento(e.target.value)}
                          variant="filled"
                          size="small"
                        /> */}
                    </Box>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <strong>Status:</strong> {selectedSubscription.status === "activo"?  "Activo" :"Inactivo" }
                        </Typography>               
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={handleConfirm}>Confirmar</Button>
                        <Button size="small" onClick={closeModalEdit}>Cancelar</Button>
                      </CardActions>
                    </Card>


                  </>
                )}
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
