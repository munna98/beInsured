import React, { useCallback, useState, useEffect, useContext } from "react";
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
    agentplanData,
    policyTypeData,
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
    policyType: policyTypeData[0]._id,
    agentPlan: agentplanData[0]._id,
    tds: "",
    odCommissionType: commissionTypes[0].name,
    odCommission: "",
    tpCommissionType: commissionTypes[0].name,
    tpCommission: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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

      if (["agent", "vehicle", "company", "intermediary"].includes(name)) {
        if (value.includes("selectAll")) {
          const allOptionIds = getAllOptionIds(name);
          setValues((prevValues) => ({
            ...prevValues,
            [name]: prevValues[name].length === allOptionIds.length ? [] : allOptionIds,
          }));
        } else {
          setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
          }));
        }
      } else {
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      }
    },
    [setValues]
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
        fetchAgentCommission();
        setValues({
          agent: [],
          vehicle: [],
          company: [],
          intermediary: [],
          policyType: policyTypeData[0]._id,
          agentPlan: agentplanData[0]._id,
          tds: "",
          odCommissionType: commissionTypes[0].name,
          odCommission: "",
          tpCommissionType: commissionTypes[0].name,
          tpCommission: "",
        });
        setSnackbarSeverity("success");
        setSnackbarMessage("Agent commission added successfully.");
        setSnackbarOpen(true);
      } else if (response.status === 409) {
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
  }, [values, apiUrl, fetchAgentCommission, setValues, policyTypeData, commissionTypes]);

  const selectedPolicy = (() => {
    const selectedPolicyType = policyTypeData.find(pt => pt._id === values.policyType);
    if (!selectedPolicyType) return "other";
    
    const policyName = selectedPolicyType.name.toLowerCase();
    if (policyName === "pk") return "pk";
    if (policyName === "od") return "od";
    if (policyName === "tp") return "tp";
    return "other";
  })();

  const renderCommissionFields = () => {
    switch (selectedPolicy) {
      case "pk":
        return (
          <>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="OD Commission type"
                name="odCommissionType"
                onChange={handleChange}
                value={values.odCommissionType}
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
                type="number"
                label="OD Commission"
                name="odCommission"
                onChange={handleChange}
                required
                value={values.odCommission}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="TP Commission type"
                name="tpCommissionType"
                onChange={handleChange}
                value={values.tpCommissionType}
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
                type="number"
                label="TP Commission"
                name="tpCommission"
                onChange={handleChange}
                required
                value={values.tpCommission}
              />
            </Grid>
          </>
        );
      case "od":
        return(
          <>
          <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="OD Commission type"
                name="odCommissionType"
                onChange={handleChange}
                value={values.odCommissionType}
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
                type="number"
                label="OD Commission"
                name="odCommission"
                onChange={handleChange}
                required
                value={values.odCommission}
              />
            </Grid>
          </>
        )
      case "tp":
        return(
          <>
          <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="TP Commission type"
                name="tpCommissionType"
                onChange={handleChange}
                value={values.tpCommissionType}
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
                type="number"
                label="TP Commission"
                name="tpCommission"
                onChange={handleChange}
                required
                value={values.tpCommission}
              />
            </Grid>
          </>
        )
    }
  };

  return (
    <form autoComplete="off" noValidate Card id="editForm">
      <Card>
        <CardHeader title="Add Agent Commission" />
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
              {renderCommissionFields()}

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
