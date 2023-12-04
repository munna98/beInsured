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

export const AgentplanAddForm = ({ data, setData,
  apiUrl, agentplanToEdit, setAgentplanToEdit, setDisplayForm }) => {

  const [values, setValues] = useState({
    name: '', 
  });

  const [error, setError] = useState('');
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const handleErrorDialogClose = () => {
    setErrorDialogOpen(false)
  }

  // Initialize form fields with the existing agentplan's data
  useEffect(() => {
    document.getElementById('editForm').scrollIntoView({ behavior: 'smooth' });

    if (agentplanToEdit) {
      setValues({
        name: agentplanToEdit.name,
      });
    }
  }, [agentplanToEdit]);

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
    if (agentplanToEdit) {
      // Handle editing by sending a PUT request
      const response = await fetch(`${apiUrl}/${agentplanToEdit._id}`, {
        method: 'PUT',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const updatedValues = await response.json();
        // Update the client-side data state with the edited agentplan
        const updatedData = data.map((agentplan) =>
          agentplan._id === updatedValues._id ? updatedValues : agentplan
        );
        setData(updatedData);
        setAgentplanToEdit();
        setValues({ name: '' }); // Reset form fields
        setDisplayForm(false)
      }
    } else {
      // Handle adding a new agentplan
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        const newValues = await response.json();
        // Update the client-side data state with the new agentplan
        setData([newValues, ...data]);
        setValues({ name: '' }); // Reset form fields
      } else {
        const errorData = await response.json();
        setError(errorData.message); // Set error message state
        setErrorDialogOpen(true)
      } 
    }
  }, [values, setData, data, apiUrl, agentplanToEdit, setValues]);

  return (
    <form autoComplete="off" noValidate Card id="editForm" >
      <Card >
        <CardHeader title={agentplanToEdit ? 'Edit Agentplan' : 'Add Agentplan'} />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the Agentplan name"
                  label="Agentplan name"
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
            {agentplanToEdit ? 'Update Agentplan' : 'Save Agentplan'}
          </Button>
        </CardActions>
      </Card>
      <ErrorDialog open={errorDialogOpen} onClose={handleErrorDialogClose} errorMessage={error} />
    </form>
  );
};
