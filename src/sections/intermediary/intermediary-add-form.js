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

export const IntermediaryAddForm = ({ data, setData, apiUrl, editId, intermediaryToEdit }) => {
  const [newIntermediary, setNewIntermediary] = useState('');

  const [values, setValues] = useState({
    name: '',
  });

  // Initialize form fields with the existing intermediary's data
  useEffect(() => {
    if (editId) {
      setValues({
        name: intermediaryToEdit.name,
      });
    }
  }, [intermediaryToEdit]);

  const handleChange = useCallback(
    (event) => {
      setNewIntermediary(event.target.value);
      setValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    [values]
  );

  const handleSubmit = useCallback(async () => {
    if (intermediaryToEdit) {
      // Handle editing by sending a PUT request
      const response = await fetch(`${apiUrl}/${intermediaryToEdit.id}`, {
        method: 'PUT',
        body: JSON.stringify({ name: values.name /* Add other fields */ }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const updatedValues = await response.json();
        // Update the client-side data state with the edited intermediary
        const updatedData = data.map((intermediary) =>
          intermediary.id === updatedValues.id ? updatedValues : intermediary
        );
        setData(updatedData);
        setNewIntermediary('');
      }
    } else {
      // Handle adding a new intermediary
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        const newValues = await response.json();
        // Update the client-side data state with the new intermediary
        setData([newValues, ...data]);
        setNewIntermediary('');
      }
    }
  }, [values, setData, data, apiUrl, intermediaryToEdit]);

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader title={intermediaryToEdit ? 'Edit Intermediary' : 'Add Intermediary'} />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the Intermediary name"
                  label="Intermediary name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={newIntermediary}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSubmit}>
            {intermediaryToEdit ? 'Update Intermediary' : 'Save Intermediary'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
