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
  Snackbar,
  Alert
} from '@mui/material';

 
export const RmAddForm = ({ data, setData,
  apiUrl, rmToEdit, setRmToEdit, setDisplayForm }) => {

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: 'example@gmail.com',
    phone: '',
    location: '', 
  });


  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // or 'error'

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  // Initialize form fields with the existing rm's data
  useEffect(() => {
    document.getElementById('editForm').scrollIntoView({ behavior: 'smooth' });

    if (rmToEdit) {
      setValues({
        firstName: rmToEdit.firstName,
        lastName: rmToEdit.lastName,
        email: rmToEdit.email,
        phone: rmToEdit.phone,
        location: rmToEdit.location,
      });
    }
  }, [rmToEdit]);
  

  useEffect(() => {
    console.log(snackbarOpen);
  }, [snackbarOpen,rmToEdit]);
  
  const handleChange = useCallback(
    (event) => {
      setValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    if (rmToEdit) {

      // Handle editing by sending a PUT request
      const response = await fetch(`${apiUrl}/${rmToEdit._id}`, {
        method: 'PUT',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const updatedValues = await response.json();
        // Update the client-side data state with the edited rm
        const updatedData = data.map((rm) =>
          rm._id === updatedValues._id ? updatedValues : rm
        );
        setData(updatedData);
        setRmToEdit();
        setValues({
          firstName: '',
          lastName: '',
          email: 'example@gmail.com',
          phone: '',
          location: '',
        }); // Reset form fields
        setSnackbarSeverity('success');
        setSnackbarMessage('Rm updated successfully.');
        setSnackbarOpen(true);
      }
      // setDisplayForm(false);
    } else {
      // Handle adding a new rm
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        const newValues = await response.json();
        // Update the client-side data state with the new rm
        setData([newValues, ...data]);
        setValues({
          firstName: '',
          lastName: '',
          email: 'example@gmail.com',
          phone: '',
          location: '',
        }); // Reset form fields
        setSnackbarSeverity('success');
        setSnackbarMessage('Rm added successfully.');
        setSnackbarOpen(true);
      } else {
        // Handle error case
        setSnackbarSeverity('error');
        setSnackbarMessage('Error adding rm. Please try again.');
        setSnackbarOpen(true);
      }
    }
  }, [values, setData, data, apiUrl, rmToEdit, setValues]);


  return (
    <form autoComplete="off" noValidate Card id="editForm" >
      <Card>
        <CardHeader title={rmToEdit ? 'Edit Rm' : 'Add Rm'} />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='email'
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  onChange={handleChange}
                  value={values.location}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSubmit}>
            {rmToEdit ? 'Update Rm' : 'Save Rm'}
          </Button>
        </CardActions> 
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form> 
    
  );
};
