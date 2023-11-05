// import axios from 'axios';
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
  Unstable_Grid2 as Grid
} from '@mui/material';


export const IntermediaryAddForm = ({ data, setData, apiUrl }) => {

  const [newintermediary, setnewintermediary] = useState('');

  const [values, setValues] = useState({
    name: '',
  });

  const handleChange = useCallback(
    (event) => {
      setnewintermediary(event.target.value)
      setValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value
      }));
    },
    [values]
  );

  const handleSubmit = useCallback(async () => {

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({ values }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 201) {
      const newValues= await response.json();

      // Update the client-side data state with the new intermediary
      setData([newValues, ...data]);
      setnewintermediary('')
    }
  }, [values, setData]);

console.log(values.name)
  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader title="Add Intermediary" />
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
                  value={newintermediary}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSubmit}>
            Save Intermediary
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
