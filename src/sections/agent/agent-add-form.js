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
  Unstable_Grid2 as Grid
} from '@mui/material';


export const AgentAddForm = ({ data, setData,
  apiUrl, agentToEdit, setAgentToEdit, setDisplayForm }) => {

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: 'example@gmail.com',
    phone: '',
    state: '',
    location: ''
  });

  // Initialize form fields with the existing agent's data
  useEffect(() => {
    document.getElementById('editForm').scrollIntoView({ behavior: 'smooth' });

    if (agentToEdit) {
      setValues({
        firstName: agentToEdit.firstName,
        lastName: agentToEdit.lastName,
        email: agentToEdit.email,
        phone: agentToEdit.phone,
        state: agentToEdit.state,
        location: agentToEdit.location,
      });
    }
  }, [agentToEdit]);

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
    if (agentToEdit) {
      // Handle editing by sending a PUT request
      const response = await fetch(`${apiUrl}/${agentToEdit._id}`, {
        method: 'PUT',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const updatedValues = await response.json();
        // Update the client-side data state with the edited agent
        const updatedData = data.map((agent) =>
          agent._id === updatedValues._id ? updatedValues : agent
        );
        setData(updatedData);
        setAgentToEdit();
        setValues({
          firstName: '',
          lastName: '',
          email: 'example@gmail.com',
          phone: '',
          state: '',
          location: ''
        }); // Reset form fields
        setDisplayForm(false)
      }
    } else {
      // Handle adding a new agent
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        const newValues = await response.json();
        // Update the client-side data state with the new agent
        setData([newValues, ...data]);
        setValues({
          firstName: '',
          lastName: '',
          email: 'example@gmail.com',
          phone: '',
          state: '',
          location: ''
        }); // Reset form fields
      }
      // else {
      //   const errorData = await response.json();
      //   setError(errorData.message); // Set error message state
      //   setErrorDialogOpen(true)
      // }
    }
  }, [values, setData, data, apiUrl, agentToEdit, setValues]);


  return (
    <form autoComplete="off" noValidate Card id="editForm" >
      <Card>
        <CardHeader title={agentToEdit ? 'Edit Agent' : 'Add Agent'} />
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
                  type="number"
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
                  value={values.country}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Save Agent
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
