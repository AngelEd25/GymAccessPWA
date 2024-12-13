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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
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

export default function CardsDataTable() {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);

  // Estados para las alertas
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState(""); // success, warning, error

  const [openAlert, setOpenAlert] = useState(false);
  const [cardsData, setCardsData] = useState([]); // Estado para las tarjetas
  const [usersData, setUsersData] = useState([]); // Estado para las tarjetas

  const [loading, setLoading] = useState(true); // Para mostrar un mensaje mientras carga
  const [selectedCard, setSelectedCard] = useState(null); // Estado para el usuario seleccionado

  const handleOpenEdit = (card) => {
    setSelectedCard(card); // Almacena la tarjeta seleccionada
    setOpenModalEdit(true); // Abre el modal
  };

  const closeModalEdit = () => {
    setOpenModalEdit(false); // Cierra el modal
    setSelectedCard(null); // Limpia la tarjeta seleccionada
  };

  const handleOpenCreate = () => {
    setOpenModalCreate(true)
  };

  const closeModalCreate = () => {
    setOpenModalCreate(false)
    setSelectedCard(null); // Limpia la tarjeta seleccionada
    setUpdatedLote(null);
    setUpdatedCard(null)
    setUpdatedUser(null);
    setSelectedOption(null)

  };

  const closeAlertModal = () => {
    // setOpenModalEdit(false); // Abre el modal
    setOpenAlertModal(false); // Cierra el modal Alert
  };


  const handleSwitchStatus = async (cards) => {
    const id = cards._id;
    const status = cards.status;
    CardService.switchStatusCard(id, status);
    const newCardsData = await CardService.getCards(); // Llamada al servicio
    setCardsData(newCardsData); // Guardar datos en el estado
    setSelectedCard(null); // Limpia la tarjeta seleccionado
  };

  const handleDeleteCard = (cards) => {
    console.log(cards._id); // Almacena el usuario seleccionado
    CardService.deleteCard(cards._id);
    setCardsData(cardsData.filter((card) => card._id!== cards._id)); // Actualiza la lista de usuarios sin el eliminado
    setSelectedCard(null); // Limpia el usuario seleccionado
  };
  
  const refreshTable =  async () =>{
    const cards = await CardService.getCards(); // Llamada al servicio
    setCardsData(cards); // Guardar datos en el estado
  }

  // Estado para el valor actualizado del lote
  const [updatedLote, setUpdatedLote] = React.useState("");
  const [updatedUser, setUpdatedUser] = React.useState("");
  const [updatedCard, setUpdatedCard] = React.useState("");
  const [updatedNewdCard, setUpdatedNewCard] = React.useState("");



  React.useEffect(() => {
    if (selectedCard) {
      setUpdatedLote(selectedCard.lote); // Inicializa el valor con el lote actual
    }
  }, [selectedCard]);

  // Función para manejar la confirmación del formulario
  const handleConfirmEdit = async () => {
    if (!updatedLote) {
      alert("Por favor ingresa un UID válido.");
      return;
    }
    try {
      // Llamada al backend para actualizar la tarjeta
      const response = await CardService.putCard(selectedCard._id, {
        lote: updatedLote,
      });
      if (response) {
        // Actualiza la lista de tarjetas (cardsData)
        setCardsData((prev) =>
          prev.map((card) =>
            card._id === selectedCard._id ? { ...card, lote: updatedLote } : card
          )
        );
        const cards = await CardService.getCards(); // Llamada al servicio
        setAlertMessage("Tarjeta actualizada exitosamente.");
        setAlertSeverity("success");
        setOpenAlertModal(true);
        closeModalEdit(); // Cierra el modal
      }
    } catch (error) {
      console.error("Error al actualizar la tarjeta:", error);
      setAlertMessage("Algo salio mal al actualizar tarjeta.");
      setAlertSeverity("warning");
      setOpenAlertModal(true);
    }
  };

  // Función para manejar la confirmación del formulario
  const handleConfirmCreate = async () => {
    console.log(updatedNewdCard);
    console.log(updatedUser);
      if (!updatedNewdCard || !updatedUser) {
        setAlertMessage("Ingresa seleciona un usuario y asigna una tarjeta antes de enviar solicitud.");
        setAlertSeverity("warning");
        setOpenAlertModal(true);
        closeModalEdit(); // Cierra el modal
        return;
      }

    try {
      // Llamada al backend para actualizar la tarjeta
      const response = await CardService.postCard({
        lote: updatedNewdCard,
        userId: updatedUser
      });
      console.log(response)
      if (response) {
        const cards = await CardService.getCards(); // Llamada al servicio
        setCardsData(cards); // Guardar datos en el estado
        setAlertMessage("Tarjeta creada exitosamente.");
        setAlertSeverity("success");
        setOpenAlertModal(true);
        closeModalEdit(); // Cierra el modal

      }


      
    } catch (error) {
      console.error("Error al crear la tarjeta:", error);
      setAlertMessage("Algo salio mal al crear tarjeta.");
      setAlertSeverity("warning");
      setOpenAlertModal(true);
    }
  };

  // STATES PARA SELECT DE USERS
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelect = (value) => {

    setUpdatedUser(value._id)
    if(value.card == undefined){
      setUpdatedCard("Aún no cuenta con tarjeta");      
    }
    else{
      setUpdatedCard(value.card.lote);      
    }
    setSelectedOption(value);

  };

  // Obtener usuarios al cargar el componente
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const cards = await CardService.getCards(); // Llamada al servicio
        setCardsData(cards); // Guardar datos en el estado
        const users = await UserService.getUsers(); // Llamada al servicio
        setUsersData(users); // Guardar datos en el estado
      } catch (error) {
        console.error("Error al obtener tarjetas:", error);
      } finally {
        setLoading(false); // Deshabilitar estado de carga
      }
    };
    fetchServices(); // Llamar a la función
  }, []);

  // Si está cargando, muestra un mensaje
  if (loading) {
    return <div>Cargando tarjetas registradas...</div>;
  }

  // Si no hay tarjetas, muestra un mensaje
  if (cardsData.length === 0) {
    return <div>No hay tarjetas registradas.</div>;
  }

  return (
    <TableContainer sx={{ md: 600, lg: 1254, xl: 1524,
      display: { xs: 'block', sm: 'block', md: 'block', lg:'block'}
    }} >
      <Table sx={{ minWidth: 110 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography fontSize={27} sx={{padding: 1, paddingLeft: 2}}>
                <CallToActionIcon/> Tarjetas
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Button variant="contained" size="small" onClick={() => handleOpenCreate()}>
                <AddIcon />
              </Button>              
            </TableCell>
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
            {/* <TableCell align="left"></TableCell> */}
            <TableCell align="left">Nombre Usuario</TableCell>
            <TableCell align="left">UID</TableCell>
            <TableCell align="left">Estado</TableCell>
            <TableCell align="left">Editar</TableCell>
            <TableCell align="left">Estatus</TableCell>
            <TableCell align="left">Eliminar</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {cardsData.map((cards) => (
            <TableRow
              key={cards._id} // Usar el ID único del usuario
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
               <TableCell component="th" scope="row">
               {cards.user ? cards.user.name  + " " + cards.user.lastName : "Sin usuario"} {/* Nombre y apellido */}
               </TableCell>
               <TableCell align="left">
                {cards.lote ? cards.lote : "N/A"} {/* Mostrar el lote de la tarjeta */}
                </TableCell>
              <TableCell align="left">
                {cards.status == "activo" ? "Activo" : "Inactivo"} {/* Suponer un estado predeterminado */}
              </TableCell>
              <TableCell align="left">
                <Button variant="contained" size="small" onClick={() => handleOpenEdit(cards)}>
                  <EditIcon />
                </Button>
              </TableCell>
              <TableCell align="left">
                  <Button variant="contained" size="small" onClick={() => handleSwitchStatus(cards)}>
                    {cards.status === "activo" ? (
                      <ToggleOnIcon style={{ color: "green" }} /> // Ícono para tarjetas activos
                    ) : (
                      <ToggleOffIcon style={{ color: "red" }} /> // Ícono para tarjetas inactivos
                    )}
                  </Button>
              </TableCell>
              <TableCell align="left">
                <Button variant="contained" size="small" onClick={() => handleDeleteCard(cards)}>
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
              {selectedCard && (
                  <>
                  
                    <Card sx={{ width: {sm: '350', md: '450'} }}>
                      <CardHeader

                          action={
                            <IconButton aria-label="settings" onClick={closeModalEdit}>
                              <ClearIcon />
                            </IconButton>
                          }
                          title="Editar Tarjeta"
                          subheader={selectedCard.user ? selectedCard.user.name  + " " + selectedCard.user.lastName : "No asociado a Usuario"}
                      />
                      <CardContent>
                        <Typography>
                          UID Card {selectedCard.lote}
                        </Typography>

                        <Box sx={{ width: 500, maxWidth: '100%' }}>
                          <TextField
                            fullWidth
                            required
                            id="standard-required"
                            margin="dense"
                            label="New UID Card"
                            value={updatedLote}
                            placeholder={selectedCard.lote}
                            variant="filled"
                            size="small"
                            onChange={(e) => setUpdatedLote(e.target.value)} 
                          />            
                        </Box>                        
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
                        title="Agregar Tarjeta"
                      />

                      <CardContent>
                        <Box sx={{ width: 500, maxWidth: "100%" }}>
                          <div>
                            <SearchableSelect
                              options={usersData}
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
                                  id="card"
                                  margin="dense"
                                  label="Nueva Tarjeta"
                                  
                                  placeholder="UID Nueva Tarjeta"
                                  onChange={(e) => setUpdatedNewCard(e.target.value)}
                                  variant="filled"
                                  size="small"
                                />
                                <TextField
                                  fullWidth
                                  disabled
                                  id="card"
                                  margin="dense"
                                  label="Tarjetas"
                                  value={updatedCard}
                                  onChange={(e) => setUpdatedCard(e.target.value)}
                                  variant="filled"
                                  size="small"
                                />                                                     
                              </>

                            )}
                          </div>


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
