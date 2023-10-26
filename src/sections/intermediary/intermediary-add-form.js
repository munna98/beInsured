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
  const [nextId, setNextId] = useState(1);
  const [newinteremediary, setnewinteremediary] = useState('');

  const [values, setValues] = useState({
    id: nextId,
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
    (event) => {
      setData((prev) => [values, ...prev]);
      setNextId((prevNextId) => prevNextId + 1);
      setnewinteremediary('')
    },
    [values, nextId, setData]
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
