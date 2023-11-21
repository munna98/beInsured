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

export const CompanyAddForm = ({ data, setData, 
  apiUrl, companyToEdit, setCompanyToEdit, setDisplayForm }) => {

  const [values, setValues] = useState({
    name: '',
  });

  // Initialize form fields with the existing company's data
  useEffect(() => {
    document.getElementById('editForm').scrollIntoView({ behavior: 'smooth' });

    if (companyToEdit) {
      setValues({
        name: companyToEdit.name,
      });
    }
  }, [companyToEdit]);

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
    if (companyToEdit) {
      // Handle editing by sending a PUT request
      const response = await fetch(`${apiUrl}/${companyToEdit._id}`, {
        method: 'PUT',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const updatedValues = await response.json();
        // Update the client-side data state with the edited company
        const updatedData = data.map((company) =>
          company._id === updatedValues._id ? updatedValues : company
        );
        setData(updatedData);
        setCompanyToEdit();
        setValues({ name: '' }); // Reset form fields
        setDisplayForm(false)
      }
    } else {
      console.log("gonna add");
      // Handle adding a new company
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        const newValues = await response.json();
        // Update the client-side data state with the new company
        setData([newValues, ...data]);
        setValues({ name: '' }); // Reset form fields
      }
    }
  }, [values, setData, data, apiUrl, companyToEdit, setValues]);
  
  return (
    <form autoComplete="off" noValidate  Card id="editForm" >
      <Card >
        <CardHeader title={companyToEdit ? 'Edit Company' : 'Add Company'} />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the Company name"
                  label="Company name"
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
            {companyToEdit ? 'Update Company' : 'Save Company'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
