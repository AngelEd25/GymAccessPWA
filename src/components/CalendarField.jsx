import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './../assets/calendarField.css';

import { TextField, Box } from "@mui/material";

const CalendarField = ({ label, selectedDate, onChange }) => {


   console.log(selectedDate);
  return (
    <Box sx={{ my: 2 }}>
      <label>{label}</label>
      <DatePicker
        select={selectedDate}
        onChange={(date) => onChange(date)}
        customInput={
          <TextField
            variant="outlined"
            fullWidth
             value={selectedDate ? selectedDate : ""}
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
