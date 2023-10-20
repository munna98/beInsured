import { useCallback, useState } from 'react';

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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


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

  const [now, setNow] = useState(new Date());

  const [values, setValues] = useState({
    date: Date,
    customerName: '',
    vehicleNumber: '',
    premium: '',
    thirdParty: '',
    ownDamage: '',
    net: '',
    intermediary: '',
    vehicleType: '',
    commission: '',
    agentName: '',
    myPlan: '',
    agentPlan: '',
    policyNumber: '',
    paidBank: '',
    capReached: '',
    amomuntRecieved: '',
    amountToBePaid: '',
  });

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );
  const handleDateChange = (date) => {
    setNow(date);
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
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
                  label="Policy issue date"
                  name="date"
                  renderInput={(params) => <TextField {...params} />}
                  value={now}
                  onChange={handleDateChange}
                />
              </Grid>

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
              <Grid
                xs={12}
                md={6}
              >
                <FormGroup>
                <Typography variant="subtitle2" style={{  padding: 10}}>
                  Policy type
                </Typography>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="TP" />
                  <FormControlLabel control={<Checkbox />} label="PK" />
                </FormGroup>
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
                  value={values.phone}
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
                  value={values.state}
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
                  value={values.state}
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
                  value={values.state}
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
                  value={4000}
                  disabled
                >
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
                  label="Vehicle type"
                  name="vehicleType"
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
                  label="Commission"
                  name="commission"
                  onChange={handleChange}
                  value={values.state}
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
                  value={values.country}
                />
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
                  label="Agent plan"
                  name="agentPlan"
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
                  label="Policy number"
                  name="policyNumber"
                  onChange={handleChange}
                  value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Paid bank"
                  name="paidBank"
                  onChange={handleChange}
                  value={values.country}
                />
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
                  value={values.state}
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
                  value={values.state}
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
                  value={values.state}
                  disabled
                >

                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Save Policy
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
