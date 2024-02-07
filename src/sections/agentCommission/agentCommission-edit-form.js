import React, { useCallback, useState, useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "src/contexts/data-context";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Select,
  Unstable_Grid2 as Grid,
  Snackbar,
  Alert
} from "@mui/material";
import agentCommissionModel from "models/agentCommissions";


export const AgentCommissionEditForm = ({
  data,
  setData,
  apiUrl,
  agentCommissionToEdit,
  setAgentCommissionToEdit,
  setDisplayForm,
}) => {
  const {
    intermediaryData,
    agentData,
    companyData,
    vehicleData,
    ourplanData,
    agentplanData,
    policyTypeData,
    paymentModeData,
  } = useContext(DataContext);


  const commissionTypes = [
    { _id: 1, name: "Flat" }, 
    { _id: 2, name: "Percentage" }, 
  ];

const [values, setValues] = useState({ ...agentCommissionToEdit });

const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // or 'error'

const handleSnackbarClose = () => {
  setSnackbarOpen(false);
};

const fetchAgentCommission = async () => {
  const response = await fetch(apiUrl)
  const data = await response.json()
  setData(data)
}

console.log(values, "initial valuess");
  useEffect(() => {
    document.getElementById("editForm").scrollIntoView({ behavior: "smooth" });
    setValues({agent: agentCommissionToEdit.agent,
      vehicle: agentCommissionToEdit.vehicle,
      company: agentCommissionToEdit.company,
      intermediary: agentCommissionToEdit.intermediary,
      type: agentCommissionToEdit.type,
      policyType: agentCommissionToEdit.policyType,
      agentPlan: agentCommissionToEdit.agentPlan,
      commission: agentCommissionToEdit.commission,
      tds: agentCommissionToEdit.tds,
})
  }, [agentCommissionToEdit]);
  

  const handleChange = useCallback((event) => {
    console.log("changed a value");
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {

    // Handle editing by sending a PUT request
    const response = await fetch(`${apiUrl}/${agentCommissionToEdit._id}`, {
      method: "PUT",
      body: JSON.stringify({ values }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const updatedValues = await response.json();
      // Update the client-side data state with the edited agentCommission
      const updatedData = data.map((agentCommission) =>
        agentCommission._id === updatedValues._id ? updatedValues : agentCommission
      );
      // setData(updatedData);
      fetchAgentCommission();
      // setAgentCommissionToEdit();
      // setValues({
      // agent: agentCommissionToEdit.agent,
      // vehicle: agentCommissionToEdit.vehicle,
      // company: agentCommissionToEdit.company,
      // intermediary: agentCommissionToEdit.intermediary,
      // type: agentCommissionToEdit.type,
      // policyType: agentCommissionToEdit.policyType,
      // agentPlan: agentCommissionToEdit.agentPlan,
      // commission: agentCommissionToEdit.commission,
      // tds: agentCommissionToEdit.tds,
      // }); // Reset form fields
      // setDisplayForm(false);
      setSnackbarSeverity('success');
      setSnackbarMessage('Agent commission updated successfully.');
      setSnackbarOpen(true);
    }else {
      // Handle error case
      setSnackbarSeverity('error');
      setSnackbarMessage('Error updating agent commission.  Please try again.');
      setSnackbarOpen(true);
    }
}, [values, setData, data, apiUrl, agentCommissionToEdit, setValues]);


return (
  <form autoComplete="off" noValidate Card id="editForm">
    <Card>
      <CardHeader
        title="Edit Agent Commission"
      />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ m: -1.5 }}>
          <Grid container spacing={3}>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Agent name"
                name="agent"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.agent}
              >
                {agentData.map((option) => (
                  <option
                    key={option._id}
                    value={option._id}
                  >
                    {option.firstName}
                  </option>
                ))}
              </TextField>
            </Grid>
            {/* <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Agent name"
                name="agent"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}

              >
                {agentData.map((option) => (
                  <option
                    key={option._id}
                    value={option._id}
                  >
                    {values.agent}
                  </option>
                ))}
              </TextField>
            </Grid> */}
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Vehicle"
                name="vehicles"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.vehicle}
              >
                {vehicleData.map((option) => (
                  <option
                    key={option._id}
                    value={option._id}
                  >
                    {option.name}
                  </option>
                ))}
              </TextField>
            </Grid>


            {/* <Grid xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Company</InputLabel>
                <Select
                  fullWidth
                  label="Company"
                  name="company"
                  multiple
                  value={values.company}
                  onChange={handleChange}
                  renderValue={(selected) => renderValue(selected, companyData)}
                >
                  <MenuItem value="selectAll">Select All</MenuItem>
                  {companyData.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}

            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Company"
                name="company"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.company}
              >
                {companyData.map((option) => (
                  <option
                    key={option._id}
                    value={option._id}
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
                select
                SelectProps={{ native: true }}
                value={values.intermediary}
              >
                {intermediaryData.map((option) => (
                  <option
                    key={option._id}
                    value={option._id}
                  >
                    {option.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Type"
                name="type"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.type}
              >
                {commissionTypes.map((option) => (
                  <option key={option._id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Policy type"
                name="policyType"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.policyType}
              >
                {policyTypeData.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Agent plan"
                name="agentPlan"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.agentPlan}
              >
                {agentplanData.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Commission"
                name="commission"
                onChange={handleChange}
                required
                value={values.commission}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
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
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleSubmit}>
          Update Agent Commission
        </Button>
      </CardActions>
    </Card>
    <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    
  </form>
);
};
