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
import ErrorDialog from 'src/components/error-dialog';

export const OurplanAddForm = ({ data, setData,
  apiUrl, ourplanToEdit, setOurplanToEdit, setDisplayForm }) => {

  const [values, setValues] = useState({
    name: '',
  });

  const [error, setError] = useState('');
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const handleErrorDialogClose = () => {
    setErrorDialogOpen(false)
  }

  // Initialize form fields with the existing ourplan's data
  useEffect(() => {
    document.getElementById('editForm').scrollIntoView({ behavior: 'smooth' });

    if (ourplanToEdit) {
      setValues({
        name: ourplanToEdit.name,
      });
    }
  }, [ourplanToEdit]);

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
    if (ourplanToEdit) {
      // Handle editing by sending a PUT request
      const response = await fetch(`${apiUrl}/${ourplanToEdit._id}`, {
        method: 'PUT',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const updatedValues = await response.json();
        // Update the client-side data state with the edited ourplan
        const updatedData = data.map((ourplan) =>
          ourplan._id === updatedValues._id ? updatedValues : ourplan
        );
        setData(updatedData);
        setOurplanToEdit();
        setValues({ name: '' }); // Reset form fields
        setDisplayForm(false)
      }
    } else {
      // Handle adding a new ourplan
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        const newValues = await response.json();
        // Update the client-side data state with the new ourplan
        setData([newValues, ...data]);
        setValues({ name: '' }); // Reset form fields
      } else {
        const errorData = await response.json();
        setError(errorData.message); // Set error message state
        setErrorDialogOpen(true)
      }
    }
  }, [values, setData, data, apiUrl, ourplanToEdit, setValues]);

  return (
    <form autoComplete="off" noValidate Card id="editForm" >
      <Card >
        <CardHeader title={ourplanToEdit ? 'Edit Ourplan' : 'Add Ourplan'} />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the Ourplan name"
                  label="Ourplan name"
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
            {ourplanToEdit ? 'Update Ourplan' : 'Save Ourplan'}
          </Button>
        </CardActions>
      </Card>
      <ErrorDialog open={errorDialogOpen} onClose={handleErrorDialogClose} errorMessage={error} />
    </form>
  );
};
