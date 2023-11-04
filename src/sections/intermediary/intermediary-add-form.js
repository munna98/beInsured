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

export const IntermediaryAddForm = ({ data, setData }) => {

  const [newinteremediary, setnewinteremediary] = useState('');

  const [values, setValues] = useState({
    id: new Date(),
    name: '',
  });

  const handleChange = useCallback(
    (event) => {
      setnewinteremediary(event.target.value)
      setValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value
      }));
    },
    [values]
  );

  const handleSubmit = useCallback(
    (event) => {async () => {
      try {
        const response = await axios.get(apiUrl,{
          method: 'POST',
          body: JSON.stringify(values)
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };


      // setData((prev) => [values, ...prev]);
      // setnewinteremediary('')
    },
    [values, setData]
  );

  console.log(data);

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
                  value={newinteremediary}
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
