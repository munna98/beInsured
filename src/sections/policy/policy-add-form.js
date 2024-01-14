import React, { useCallback, useState, useEffect } from 'react';
import { useContext } from "react";
import { DataContext } from 'src/contexts/data-context';
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
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Checkbox from '@mui/material/Checkbox';


export const PolicyAddForm = ({ data, setData,
  apiUrl, policyToEdit, setPolicyToEdit, setDisplayForm }) => {
  const { intermediaryData, agentData, companyData,vehicleData
    , ourplanData, agentplanData, policyTypeData, paymentModeData } = useContext(DataContext);
  const [issueDate, setIssueDate] = useState(new Date());
  const initialValues = {
    date: '',
    customerName: '',
    policyType: '',
    customerName: '',
    vehicleNumber: '',
    premium: '',
    thirdParty: '',
    ownDamage: '',
    net: '',
    company: '',
    intermediary: '',
    vehicleType: '',
    commission: '',
    policyName: '',
    ourPlan: '',
    policyPlan: '',
    policyNumber: '',
    paymentMode: '',
    capReached: '',
    amomuntRecieved: '',
    amountToBePaid: '',
  }
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback(
    (event) => {
      setValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value
      }));
    },
    []
  );
  
  const handleDateChange = useCallback(
  (date) => {
    setIssueDate(date);
    setValues((prev) => ({
      ...prev,
      date: date
    }));
  },
  []
  );
  
  useEffect(() => {
    document.getElementById('editForm').scrollIntoView({ behavior: 'smooth' });

    if (policyToEdit) {
      const { date,
        customerName,
        policyType,
        vehicleNumber,
        premium,
        thirdParty,
        ownDamage,
        net,
        company,
        intermediary,
        vehicleType,
        commission,
        agentName,
        ourPlan,
        agentPlan,
        policyNumber,
        paymentMode,
        capReached,
        amomuntRecieved,
        amountToBePaid, } = policyToEdit;
      setValues({
        date,
        customerName,
        policyType,
        vehicleNumber,
        premium,
        thirdParty,
        ownDamage,
        net,
        company,
        intermediary,
        vehicleType,
        commission,
        agentName,
        ourPlan,
        agentPlan,
        policyNumber,
        paymentMode,
        capReached,
        amomuntRecieved,
        amountToBePaid,
      });
    }
  }, [policyToEdit]);


  const handleSubmit = useCallback(async () => {
    if (policyToEdit) {
      // Handle editing by sending a PUT request
      const response = await fetch(`${apiUrl}/${policyToEdit._id}`, {
        method: 'PUT',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const updatedValues = await response.json();
        // Update the client-side data state with the edited policy
        const updatedData = data.map((policy) =>
          policy._id === updatedValues._id ? updatedValues : policy
        );
        setData(updatedData);
        setPolicyToEdit();
        setValues(initialValues); // Reset form fields
        setDisplayForm(false)
      }
    } else {
      // Handle adding a new policy
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({ values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        const newValues = await response.json();
        // Update the client-side data state with the new policy
        setData([newValues, ...data]);
        setValues(initialValues); // Reset form fields
      }
      // else {
      //   const errorData = await response.json();
      //   setError(errorData.message); // Set error message state
      //   setErrorDialogOpen(true)
      // }
    }
  }, [values, setData, data, apiUrl, policyToEdit, setValues]);

  
  return (
    <form autoComplete="off" noValidate Card id="editForm" >
      <Card>
        <CardHeader
          subheader="Fill the form to add a new policy"
          title="Add Policy"
        />
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
                
                <DatePicker
                  fullWidth
                  type='date'
                  label="Policy issue date"
                  name="date"
                  renderInput={(params) => <TextField {...params} />}
                  value={issueDate}
                  onChange={handleDateChange}
                />
              </Grid>
{/* 
              <Grid
                xs={12}
                md={6}
              >
                <DatePicker
                  fullWidth
                  label="Policy issue date"
                  name="date"
                  renderInput={(params) => <TextField {...params} />}
                  value={issueDate}
                  onChange={handleDateChange}
                />
              </Grid> */}

              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Customer name"
                  name="customerName"
                  onChange={handleChange}
                  required
                  value={values.customerName}
                />
              </Grid>

              {/*               
              <Grid
                xs={12}
                md={6}
              >
                <FormGroup>
                  color="text.secondary"
                  <Typography color="text.secondary" variant="subtitle2" style={{ padding: 10 }}>
                    Policy type
                  </Typography>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="TP" />
                  <FormControlLabel control={<Checkbox />} label="PK" />
                  <FormControlLabel control={<Checkbox />} label="OD" />
                </FormGroup>
              </Grid>  */}

              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Policy type"
                  name="policyType"
                  onChange={handleChange}
                  // value={values.policyType}
                  select
                  SelectProps={{ native: true }}

                >
                  {policyTypeData.map((option) => (
                    <option
                      key={option._id}
                      value={option.name}
                    >
                      {option.name}
                    </option>
                  ))}

                </TextField>
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Vehicle number"
                  name="vehicleNumber"
                  onChange={handleChange}
                  type="text"
                  value={values.vehicleNumber}
                  required
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='number'
                  label="Premium"
                  name="premium"
                  onChange={handleChange}
                  value={values.premium}
                >

                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='number'
                  label="TP amount"
                  name="thirdParty"
                  onChange={handleChange}
                  value={values.thirdParty}
                >

                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='number'
                  label="OD amount"
                  name="ownDamage"
                  onChange={handleChange}
                  value={values.ownDamage}
                >
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='number'
                  label="Net"
                  name="net"
                  onChange={handleChange}
                  value={values.thirdParty - - values.ownDamage}
                  // disabled
                >
                </TextField>
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
                  // value={values.company}
                  select
                  SelectProps={{ native: true }}

                >
                  {companyData.map((option) => (
                    <option
                      key={option.value}
                      value={option.name}
                    >
                      {option.name}
                    </option>
                  ))}
                </TextField>
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
                  // value={values.intermediary}
                  select
                  SelectProps={{ native: true }}

                >
                  {intermediaryData.map((option) => (
                    <option
                      key={option._id}
                      value={option.name}
                    >
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Vehicle type"
                  name="vehicleType"
                  onChange={handleChange}
                  // value={values.vehicleType}
                  select
                  SelectProps={{ native: true }}

                >
                  {vehicleData.map((option) => (
                    <option
                      key={option._id}
                      value={option.name}
                    >
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Agent name"
                  name="agentName"
                  onChange={handleChange}
                  // value={values.agentName}
                  select
                  SelectProps={{ native: true }}

                >
                  {agentData.map((option) => (
                    <option
                      key={option._id}
                      value={option.firstName}
                    >
                      {option.firstName}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Agent plan"
                  name="agentPlan"
                  onChange={handleChange}
                  // value={values.agentPlan}
                  select
                  SelectProps={{ native: true }}

                >
                  {agentplanData.map((option) => (
                    <option
                      key={option._id}
                      value={option.name}
                    >
                      {option.name}
                    </option>
                  ))}
                </TextField>
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
                  value={values.commission}
                >
                </TextField>
              </Grid>
              
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Our Plan"
                  name="ourPlan"
                  onChange={handleChange}
                  // value={values.ourPlan}
                  select
                  SelectProps={{ native: true }}

                >
                  {ourplanData.map((option) => (
                    <option
                      key={option._id}
                      value={option.name}
                    >
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Policy number"
                  name="policyNumber"
                  onChange={handleChange}
                  value={values.policyNumber}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Payment mode"
                  name="paymentMode"
                  onChange={handleChange}
                  // value={values.paymentMode}
                  select
                  SelectProps={{ native: true }}

                >
                  {paymentModeData.map((option) => (
                    <option
                      key={option._id}
                      value={option.name}
                    >
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='number'
                  label="CAP reached"
                  name="capReached"
                  onChange={handleChange}
                  value={values.capReached}
                >

                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='number'
                  label="Amomunt recieved"
                  name="amomuntRecieved"
                  onChange={handleChange}
                  value={values.amomuntRecieved}
                >

                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type='number'
                  label="Amount to be paid"
                  name="amountToBePaid"
                  onChange={handleChange}
                  value={values.amountToBePaid}
                  disabled
                >
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSubmit}>
            {policyToEdit ? 'Update Policy' : 'Save Policy'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
