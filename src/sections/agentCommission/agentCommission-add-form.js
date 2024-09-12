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
  MenuItem,
  InputLabel,
  Chip,
  FormControl,
  Unstable_Grid2 as Grid,
  Snackbar,
  Alert
} from "@mui/material";
import agentCommissionModel from "models/agentCommissions";


export const AgentCommissionAddForm = ({
  data,
  setData,
  apiUrl,
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

  const [values, setValues] = useState({
    agent: [],
    vehicle: [],
    company: [],
    intermediary: [],
    type: commissionTypes[0].name,
    policyType: policyTypeData[0]._id,
    agentPlan: agentplanData[0]._id,
    commission: "",
    tds: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // or 'error'

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
 
  useEffect(() => {
    document.getElementById("editForm").scrollIntoView({ behavior: "smooth" });
  }, []);

  const fetchAgentCommission = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    setData(data)
  }

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      // Handle "Select All" option
      if (value.includes("selectAll")) {
        const allOptionIds = getAllOptionIds(name);

        // If "Select All" is already selected, deselect all options
        if (values[name].length === allOptionIds.length) {
          setValues((prevValues) => ({
            ...prevValues,
            [name]: [],
          }));
        } else {
          // Otherwise, select all options
          setValues((prevValues) => ({
            ...prevValues,
            [name]: allOptionIds,
          }));
        }
      } else {
        // Handle other options
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      }
    },
    [setValues, values]
  );

  const getAllOptionIds = (fieldName) => {
    switch (fieldName) {
      case "agent":
        return agentData.map((agent) => agent._id);
      case "company":
        return companyData.map((company) => company._id);
      case "vehicle":
        return vehicleData.map((vehicle) => vehicle._id);
      case "intermediary":
        return intermediaryData.map((intermediary) => intermediary._id);
      // Add cases for other fields if needed
      default:
        return [];
    }
  };

  const renderValue = (selected, options) => {
    const displayChips = selected.slice(0, 5); // Display the first 5 selected options
    const additionalOptionsCount = selected.length - displayChips.length;

    return (
      <div>
        {displayChips.map((value) => (
          <Chip key={value} label={getOptionLabel(value, options)} style={{ marginRight: 4 }} />
        ))}
        {additionalOptionsCount > 0 && (
          <Chip label={`+${additionalOptionsCount}`}  />
        )}
      </div>
    );
  };


  const getOptionLabel = (value, options) => {
    if (Array.isArray(value)) {
      return value
        .map((val) => {
          const option = options.find((opt) => opt._id === val);
          return option ? option.name : "";
        })
        .join(", ");
    } else {
      const option = options.find((opt) => opt._id === value);
      return option ? option.name || option.firstName : "";
    }
  };

  const handleSubmit = useCallback(async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ values }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        // Reset the form and show success message
        fetchAgentCommission();
        setValues({
          agent: [],
          vehicle: [],
          company: [],
          intermediary: [],
          type: commissionTypes[0].name,
          policyType: policyTypeData[0]._id,
          agentPlan: agentplanData[0]._id,
          commission: "",
          tds: "",
        });
        setSnackbarSeverity("success");
        setSnackbarMessage("Agent commission added successfully.");
        setSnackbarOpen(true);
      } else if (response.status === 409) {
        // Notify the user about the existing combination
        const result = await response.json();
        setSnackbarSeverity("error");
        setSnackbarMessage(result.message);
        setSnackbarOpen(true);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error adding agent commission. Please try again.");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error adding agent commission. Please try again.");
      setSnackbarOpen(true);
    }
  }, [values, apiUrl, fetchAgentCommission, setValues]);
  

  return (
    <form autoComplete="off" noValidate Card id="editForm">
      <Card>
        <CardHeader
          title="Add Agent Commission"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Agent</InputLabel>
                  <Select
                    fullWidth
                    label="Agent"
                    name="agent"
                    multiple
                    value={values.agent}
                    onChange={handleChange}
                    renderValue={(selected) => renderValue(selected, agentData)}
                  >
                    <MenuItem value="selectAll">Select All</MenuItem>
                    {agentData.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.firstName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Vehicle</InputLabel>
                  <Select
                    fullWidth
                    label="Vehicle"
                    name="vehicle"
                    multiple
                    value={values.vehicle}
                    onChange={handleChange}
                    renderValue={(selected) => renderValue(selected, vehicleData)}
                  >
                    <MenuItem value="selectAll">Select All</MenuItem>
                    {vehicleData.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> 
              <Grid xs={12} md={6}>
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
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Intermediary</InputLabel>
                  <Select
                    fullWidth
                    label="Intermediary"
                    name="intermediary"
                    multiple
                    value={values.intermediary}
                    onChange={handleChange}
                    renderValue={(selected) => renderValue(selected, intermediaryData)}
                  >
                    <MenuItem value="selectAll">Select All</MenuItem>
                    {intermediaryData.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Type"
                  name="type"
                  onChange={handleChange}
                  value={values.type}
                  select
                  SelectProps={{ native: true }}
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
                  value={values.policyType}
                  select
                  SelectProps={{ native: true }}
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
                  value={values.agentPlan}
                  select
                  SelectProps={{ native: true }}
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
            Save Agent Commission
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
