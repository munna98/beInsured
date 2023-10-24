import { useCallback, useState, useContext } from 'react';
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
import { DataContext } from 'src/contexts/data-context';

let nextId = 1;


export const IntermediaryAddForm = ({ data, setData }) => {

  const { intermediaryData, setIntermediaryData } = useContext(DataContext)


  const [values, setValues] = useState({
    id: nextId,
    name: '',
  });
  nextId++

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    [values]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setData((prev) => [values, ...prev])
      console.log("submit works");
    },
    [values, setData]
  );
  console.log(data);
    console.log(values);
    setIntermediaryData(data)
  return (
    <form
      autoComplete="off"
      noValidate

    >
      <Card>
        <CardHeader
          subheader="Fill the input to add a new intermediary"
          title="Add Intermediary"
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
                <TextField
                  fullWidth
                  helperText="Please specify the Intermediary name"
                  label="Intermediary name"
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
            Save Intermediary
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
