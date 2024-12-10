import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './../assets/calendarField.css';

import { TextField, Box } from "@mui/material";

const CalendarField = ({ label, selectedDate, onDateChange }) => {
  return (
    <Box sx={{ my: 2 }}>
      <label>{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => onDateChange(date)}
        customInput={
          <TextField
            variant="outlined"
            fullWidth
            value={selectedDate ? selectedDate.toLocaleDateString() : ""}
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
