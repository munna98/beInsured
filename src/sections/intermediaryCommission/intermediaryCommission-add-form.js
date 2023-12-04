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


export const IntermediaryCommissionAddForm = ({ data, setData,
  apiUrl, intermediaryCommissionToEdit, setIntermediaryCommissionToEdit, setDisplayForm }) => {

  const [values, setValues] = useState({
    agent: '',
    vehicle: '',
    commission: '',
    company: '',
    intermediary: '',
    type: '',
    tds: '',
  });

  // Initialize form fields with the existing intermediaryCommission's data
  useEffect(() => {
    document.getElementById('editForm').scrollIntoView({ behavior: 'smooth' });

    if (intermediaryCommissionToEdit) {
      setValues({
        agent: intermediaryCommissionToEdit.agent,
        vehicle: intermediaryCommissionToEdit.vehicle,
        commission: intermediaryCommissionToEdit.commission,
        company: intermediaryCommissionToEdit.company,
        intermediary: intermediaryCommissionToEdit.intermediary,
        type: intermediaryCommissionToEdit.type,
        tds: intermediaryCommissionToEdit.tds,
      });
    }
  }, [intermediaryCommissionToEdit]);

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
    if (intermediaryCommissionToEdit) {
      // Handle editing by sending a PUT request
      const response = await fetch(`${apiUrl}/${intermediaryCommissionToEdit._id}`, {
        method: 'PUT',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const updatedValues = await response.json();
        // Update the client-side data state with the edited intermediaryCommission
        const updatedData = data.map((intermediaryCommission) =>
          intermediaryCommission._id === updatedValues._id ? updatedValues : intermediaryCommission
        );
        setData(updatedData);
        setIntermediaryCommissionToEdit();
        setValues({
          agent: '',
          vehicle: '',
          commission: '',
          company: '',
          intermediary: '',
          type: '',
          tds: '',
        }); // Reset form fields
        setDisplayForm(false)
      }
    } else {
      // Handle adding a new intermediaryCommission
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        const newValues = await response.json();
        // Update the client-side data state with the new intermediaryCommission
        setData([newValues, ...data]);
        setValues({
          agent: '',
          vehicle: '',
          commission: '',
          company: '',
          intermediary: '',
          type: '',
          tds: '',
        }); // Reset form fields
      }
      // else {
      //   const errorData = await response.json();
      //   setError(errorData.message); // Set error message state
      //   setErrorDialogOpen(true)
      // }
    }
  }, [values, setData, data, apiUrl, intermediaryCommissionToEdit, setValues]);


  return (
    <form autoComplete="off" noValidate Card id="editForm" >
      <Card>
        <CardHeader title={intermediaryCommissionToEdit ? 'Edit Agent Commission' : 'Add Agent Commission'} />
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
                  label="Agent"
                  name="agent"
                  onChange={handleChange}
                  required
                  value={values.agent}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Vehicle"
                  name="vehicle"
                  onChange={handleChange}
                  value={values.vehicle}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='number'
                  label="Commission"
                  name="commission"
                  onChange={handleChange}
                  required
                  value={values.commission}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  onChange={handleChange}
                  value={values.company}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Intermediary"
                  name="intermediary"
                  onChange={handleChange}
                  value={values.intermediary}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Type"
                  name="type"
                  onChange={handleChange}
                  value={values.type}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='number'
                  label="Tds"
                  name="tds"
                  onChange={handleChange}
                  value={values.tds}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSubmit}>
            {intermediaryCommissionToEdit ? 'Update Agent Commission' : 'Save Agent Commission'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
