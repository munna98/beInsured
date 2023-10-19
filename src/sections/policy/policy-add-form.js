import { useCallback, useState } from 'react';
import { subDays, subHours } from 'date-fns';
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

const now = new Date();
// const states = [
//   {
//     value: 'alabama',
//     label: 'Alabama'
//   },
//   {
//     value: 'new-york',
//     label: 'New York'
//   },
//   {
//     value: 'san-francisco',
//     label: 'San Francisco'
//   },
//   {
//     value: 'los-angeles',
//     label: 'Los Angeles'
//   }
// ];

export const PolicyAddForm = () => {
  const [values, setValues] = useState({
    date: '',
    customerName: '',
    lastName: '',
    vehicleNumber: '',
    state: '',
    country: ''
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
              {/* <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Policy issue date"
                  label="Date"
                  name="date"
                  type="date"
                  onChange={handleChange}
                  required
                  value={date}
                />
              </Grid> */}
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Policy issue date"
                  label="Date"
                  name="date"
                  type="date"
                  onChange={handleChange}
                  required
                  value={subDays(subHours(now, 1), 9).getTime()}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  // helperText="Please specify the first name"
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
                  label="Vehicle Number"
                  name="vehicleNumber"
                  onChange={handleChange}
                  type="text"
                  value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
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
                  label="State"
                  name="state"
                  onChange={handleChange}
                //   select
                //   SelectProps={{ native: true }}
                  value={values.state}
                >
                  {/* {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))} */}
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
