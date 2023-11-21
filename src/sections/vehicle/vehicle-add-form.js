import React, { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from '@mui/material';

export const VehicleAddForm = ({ data, setData, 
  apiUrl, vehicleToEdit, setVehicleToEdit, setDisplayForm }) => {

  const [values, setValues] = useState({
    name: '',
  });

  // Initialize form fields with the existing vehicle's data
  useEffect(() => {
    document.getElementById('editForm').scrollIntoView({ behavior: 'smooth' });

    if (vehicleToEdit) {
      setValues({
        name: vehicleToEdit.name,
      });
    }
  }, [vehicleToEdit]);

  const handleChange = useCallback(
    (event) => {
      setValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    if (vehicleToEdit) {
      // Handle editing by sending a PUT request
      const response = await fetch(`${apiUrl}/${vehicleToEdit._id}`, {
        method: 'PUT',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const updatedValues = await response.json();
        // Update the client-side data state with the edited vehicle
        const updatedData = data.map((vehicle) =>
          vehicle._id === updatedValues._id ? updatedValues : vehicle
        );
        setData(updatedData);
        setVehicleToEdit();
        setValues({ name: '' }); // Reset form fields
        setDisplayForm(false)
      }
    } else {
      console.log("gonna add");
      // Handle adding a new vehicle
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        const newValues = await response.json();
        // Update the client-side data state with the new vehicle
        setData([newValues, ...data]);
        setValues({ name: '' }); // Reset form fields
      }
    }
  }, [values, setData, data, apiUrl, vehicleToEdit, setValues]);
  
  return (
    <form autoComplete="off" noValidate  Card id="editForm" >
      <Card >
        <CardHeader title={vehicleToEdit ? 'Edit Vehicle' : 'Add Vehicle'} />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the Vehicle name"
                  label="Vehicle name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSubmit}>
            {vehicleToEdit ? 'Update Vehicle' : 'Save Vehicle'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
