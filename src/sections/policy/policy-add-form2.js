import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Grid,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  },
  {
    value: 'los-angeles',
    label: 'Los Angeles'
  }
];

export const PolicyAddForm = () => {
  const [issueDate, setIssueDate] = useState(new Date());

  const initialValues = {
    date: '',
    customerName: '',
    policyType: '',
    vehicleNumber: '',
    premium: '',
    thirdParty: '',
    ownDamage: '',
    net: '',
    company: '',
    intermediary: '',
    vehicleType: '',
    commission: '',
    agentName: '',
    myPlan: '',
    agentPlan: '',
    policyNumber: '',
    paymentMode: '',
    capReached: '',
    amomuntRecieved: '',
    amountToBePaid: '',
  };

  const validationSchema = Yup.object().shape({
    date: Yup.date().required('Policy issue date is required'),
    customerName: Yup.string().required('Customer name is required'),
    vehicleNumber: Yup.string().required('Vehicle number is required'),
    policyType: Yup.string().required('Policy type is required'),
    // Add validation rules for other fields here
  });

  const handleSubmit = (values) => {
    // Handle form submission here
    console.log('Form submitted:', values);
  };

  return (

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form autoComplete="off">
          <Card>
            <CardHeader
              subheader="Fill the form to add a new policy"
              title="Add Policy"
            />
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ m: -1.5 }}>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6}>
                    <DatePicker
                      fullWidth
                      label="Policy issue date"
                      name="date"
                      value={issueDate}
                      onChange={(date) => {
                        setIssueDate(date);
                        setFieldValue('date', date);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <ErrorMessage name="date" component="div" />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Customer name"
                      name="customerName"
                      onChange={handleChange}
                      value={values.customerName}
                    />
                    <ErrorMessage name="customerName" component="div" />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Policy type"
                      name="policyType"
                      onChange={handleChange}
                      value={values.policyType}
                    />
                    <ErrorMessage name="policyType" component="div" />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Vehicle number"
                      name="vehicleNumber"
                      onChange={handleChange}
                      value={values.vehicleNumber}
                    />
                    <ErrorMessage name="vehicleNumber" component="div" />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Premium"
                      name="premium"
                      onChange={handleChange}
                      value={values.premium}
                    />
                    <ErrorMessage name="premium" component="div" />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="TP amount"
                      name="thirdParty"
                      onChange={handleChange}
                      value={values.thirdParty}
                    />
                    <ErrorMessage name="thirdParty" component="div" />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="OD amount"
                      name="ownDamage"
                      onChange={handleChange}
                      value={values.ownDamage}
                    />
                    <ErrorMessage name="ownDamage" component="div" />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Net"
                      name="net"
                      onChange={handleChange}
                      value={values.net}
                      disabled
                    />
                    <ErrorMessage name="net" component="div" />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Company"
                      name="company"
                      onChange={handleChange}
                      value={values.company}
                      select
                      SelectProps={{ native: true }}
                    >
                      {states.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                    <ErrorMessage name="company" component="div" />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Intermediary"
                      name="intermediary"
                      onChange={handleChange}
                      value={values.intermediary}
                      select
                      SelectProps={{ native: true }}
                    >
                      {states.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                    <ErrorMessage name="intermediary" component="div" />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Vehicle type"
                      name="vehicleType"
                      onChange={handleChange}
                      value={values.vehicleType}
                      select
                      SelectProps={{ native: true }}
                    >
                      {states.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                    <ErrorMessage name="vehicleType" component="div" />
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
                      label="Agent name"
                      name="agentName"
                      onChange={handleChange}
                      value={values.agentName}
                      select
                      SelectProps={{ native: true }}

                    >
                      {states.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
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
                      label="My plan"
                      name="myPlan"
                      onChange={handleChange}
                      value={values.myPlan}
                      select
                      SelectProps={{ native: true }}

                    >
                      {states.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
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
                      value={values.agentPlan}
                      select
                      SelectProps={{ native: true }}

                    >
                      {states.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
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
                      value={values.state}
                      select
                      SelectProps={{ native: true }}

                    >
                      {states.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
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
              <Button variant="contained" type="submit">
                Save Policy
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>

  );
};

