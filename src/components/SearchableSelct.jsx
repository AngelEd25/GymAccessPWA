import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

const SearchableSelect = ({ options, label, onSelect }) => {
  const [value, setValue] = useState(null); // Estado para el valor seleccionado
  const handleChange = (event, newValue) => {
    setValue(newValue); // Actualiza el valor seleccionado
    onSelect(newValue); // Llama a la función pasada como prop para devolver el valor seleccionado
  };

  return (
    <Box sx={{ my: 2 }}>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.name + " " + option.lastName} // Define cómo se muestra cada opción
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
        value={value}
        onChange={handleChange}
        isOptionEqualToValue={(option, value) => option.id === value?.id} // Asegura que se seleccionen opciones únicas
      />
    </Box>
  );
};

export default SearchableSelect;
