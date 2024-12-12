import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './../assets/calendarField.css';

import { TextField, Box } from "@mui/material";

const CalendarField = ({ label, selectedDate, onChange }) => {

  return (
    <Box sx={{ my: 2 }}>
      <label>{label}</label>
      <DatePicker
        selected={selectedDate} // Fecha seleccionada
        onChange={(date) => onChange(date)} // Llamar a la función pasada como prop
        customInput={
          <TextField
            variant="outlined"
            fullWidth
            value={
              selectedDate
                ? selectedDate
                : ""
            } // Mostrar fecha formateada
          />
        }
        dateFormat="dd/MM/yyyy"
        showPopperArrow={false}
        className="custom-datepicker"
      />
    </Box>
  );
};


export default CalendarField;
