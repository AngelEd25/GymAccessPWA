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
import { RegistroService } from '../services/Registros.service';
import AddIcon from '@mui/icons-material/Add';


import MenuOptions from './MenuOptions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
import HistoryIcon from '@mui/icons-material/History';
import CallToActionIcon from '@mui/icons-material/CallToAction';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AutorenewIcon from '@mui/icons-material/Autorenew';


import { format, subHours } from 'date-fns';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddRegistro() {

  const [open, setOpen] = useState(false);
  const [registers, setUsers] = useState([]); // Estado para los usuarios
  const [cardsData, setCardsData] = useState([]); // Estado para las tarjetas
  const [registrosData, setRegistrosData] = useState([]); // Estado para los registros
  const [loading, setLoading] = useState(true); // Para mostrar un mensaje mientras carga
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [selectedUser, setSelectedUser] = useState(null); // Estado para el usuario seleccionado
  const refreshTable =  async () =>{
    const access = await RegistroService.getRegistros(); // Llamada al servicio
    setRegistrosData(access); // Guardar datos en el estado
  }
  const handleOpen = (register) => {
    setSelectedUser(register); // Almacena el usuario seleccionado
    setOpen(true); // Abre el modal
  };
  const handleClose = () => {
    setOpen(false); // Cierra el modal
    setSelectedUser(null); // Limpia el usuario seleccionado
  };

  const handleDeleteAccess = async (register) => {
   const idUsuario = register.user._id;
   const cardUID = register.card.lote;
   console.log(idUsuario);
   console.log(cardUID);

    const respRegisterAccess = await RegistroService.postRegistro({
      userId: idUsuario,
      lote: cardUID
    });   
  };

  // Función para formatear la fecha y restar 6 horas
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt); // Convierte la cadena ISO a un objeto Date
    return format(date, "dd/MM/yyyy HH:mm"); // Formatea la fecha
  };

  // Obtener usuarios al cargar el componente
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const registro = await RegistroService.getRegistros(); // Llamada al servicio
        setRegistrosData(registro); // Guardar datos en el estado

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
    return <div>Cargando registros...</div>;
  }

  // Si no hay usuarios, muestra un mensaje
  if (registrosData.length === 0) {
    return <div>No hay registro de ingresos.</div>;
  }

  return (
    <TableContainer  sx={{ md: 600, lg: 1024, xl: 1524,
      display: { xs: 'block', sm: 'block', md: 'block', lg:'block'}
    }} >
      <Table sx={{ minWidth: 110 }} size="small" aria-label="a dense table">
        <TableHead>
        <TableRow>
            <TableCell align="left">
              <Typography fontSize={27} sx={{padding: 1, paddingLeft: 2}}>
                <HistoryIcon/> Accesos
              </Typography>
            </TableCell>
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
            <TableCell align="left">Id Registro</TableCell>
            <TableCell align="left">Nombre Usuario</TableCell>
            <TableCell align="left">UID Tarjeta</TableCell>
            <TableCell align="left">Estado</TableCell>
            <TableCell align="left">Fecha</TableCell>
            <TableCell align="left">Eliminar</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {registrosData.map((register) => (
              
            <TableRow
              key={register._id} // Usar el ID único del usuario
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">
                {register._id}
              </TableCell>
               <TableCell component="th" scope="row">
                {register.user ? register.user.name + " " + register.user.lastName : "N/A"} {/* Mostrar el lote de la tarjeta */}               {/* Nombre y apellido */}
               </TableCell>
               <TableCell align="left">
                {register.card ? register.card.lote: "N/A"} {/* Mostrar el lote de la tarjeta */}
                </TableCell>
                <TableCell align="left">
                {register.status || "Activo"} {/* Suponer un estado predeterminado */}
              </TableCell>
              <TableCell align="left">
                {register.createdAt ? formatCreatedAt(register.createdAt) : "N/A"}
              </TableCell>
              <TableCell align="left">
                <Button variant="contained" size="small" onClick={() => handleDeleteAccess(register)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>

          ))}

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {selectedUser && (
                  <>
                    <Card sx={{ maxWidth: 345 }}>
                    <CardHeader

                        action={
                          <IconButton aria-label="settings" onClick={handleClose}>
                            <ClearIcon />
                          </IconButton>
                        }
                        title="Editar Tarjeta"
                        subheader={selectedUser.register.name + " " + selectedUser.register.lastName }
                      />
                      <CardContent>
                        <TextField
                          required
                          id="standard-required"
                          label="Lote"
                          defaultValue={selectedUser.lote}
                          variant="standard"
                        />
                        
                      </CardContent>
                      <CardActions>
                        <Button size="small">Confirmar</Button>
                        <Button size="small">Cancelar</Button>
                      </CardActions>
                    </Card>

                  </>
                )}
            </Box>

          </Modal>



        </TableBody>
      </Table>
    </TableContainer>
  );
}
