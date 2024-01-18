import React, { useCallback, useState, useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "src/contexts/data-context";
import {
  // Box,
  // Button,
  // Card,
  // CardActions,
  // CardContent,
  // CardHeader,
  // Divider,
  // TextField,
  // Unstable_Grid2 as Grid

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
} from "@mui/material";

export const AgentCommissionAddForm = ({
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

  const [values, setValues] = useState({
    agents: [],
    vehicle: "",
    company: "",
    intermediary: "",
    type: "",
    policytype: "",
    agentplan: "",
    commission: "",
    tds: "",
  });

  // Initialize form fields with the existing agentCommission's data
  useEffect(() => {
    document.getElementById("editForm").scrollIntoView({ behavior: "smooth" });

    if (agentCommissionToEdit) {
      setValues({
        agents: agentCommissionToEdit.agent,
        vehicle: agentCommissionToEdit.vehicle,
        company: agentCommissionToEdit.company,
        intermediary: agentCommissionToEdit.intermediary,
        type: agentCommissionToEdit.type,
        policytype: agentCommissionToEdit.policytype,
        agentplan: agentCommissionToEdit.agentplan,
        commission: agentCommissionToEdit.commission,
        tds: agentCommissionToEdit.tds,
      });
    }
  }, [agentCommissionToEdit]);

  // const handleChange = useCallback((event) => {
  //   setValues((prev) => ({
  //     ...prev,
  //     [event.target.name]: event.target.value,
  //   }));
  // }, []);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
  
      // Handle "Select All" option
      if (value.includes('selectAll')) {
        const allAgentNames = agentData.map((agent) => agent.firstName);
        
        // If "Select All" is already selected, deselect all agents
        if (values.agents.length === allAgentNames.length) {
          setValues((prevValues) => ({
            ...prevValues,
            [name]: [],
          }));
        } else {
          // Otherwise, select all agents
          setValues((prevValues) => ({
            ...prevValues,
            [name]: allAgentNames,
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
    [setValues, values.agents, agentData]
  );

  const renderValue = (selected) => {
    const displayChips = selected.slice(0, 5); // Display the first 5 selected agents
    const additionalAgentsCount = selected.length - displayChips.length;

    return (
      <div>
        {displayChips.map((value) => (
          <Chip key={value} label={value} style={{ marginRight: 4 }}/>
        ))}
        {additionalAgentsCount > 0 && (
          <Chip label={`+${additionalAgentsCount}`} style={{ marginLeft: 4 }} />
        )}
      </div>
    );
  };
  
  const handleSubmit = useCallback(async () => {
    if (agentCommissionToEdit) {
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
        setData(updatedData);
        setAgentCommissionToEdit();
        setValues({
          agents: [],
          vehicle: "",
          company: "",
          intermediary: "",
          type: "",
          policytype: "",
          agentplan: "",
          commission: "",
          tds: "",
        }); // Reset form fields
        setDisplayForm(false);
      }
    } else {
      // Handle adding a new agentCommission
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ values }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        const newValues = await response.json();
        // Update the client-side data state with the new agentCommission
        setData([newValues, ...data]);
        setValues({
          agents: [],
          vehicle: "",
          company: "",
          intermediary: "",
          type: "",
          policytype: "",
          agentplan: "",
          commission: "",
          tds: "",
        }); // Reset form fields
      }
      // else {
      //   const errorData = await response.json();
      //   setError(errorData.message); // Set error message state
      //   setErrorDialogOpen(true)
      // }
    }
  }, [values, setData, data, apiUrl, agentCommissionToEdit, setValues]);

  return (
    <form autoComplete="off" noValidate Card id="editForm">
      <Card>
        <CardHeader
          title={agentCommissionToEdit ? "Edit Agent Commission" : "Add Agent Commission"}
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
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
                      {option.firstName}
                    </option>
                  ))}
                </TextField>
              </Grid> */}
              <Grid xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Agents</InputLabel>
                  <Select
                    fullWidth
                    label="Agents"
                    name="agents"
                    multiple
                    value={values.agents}
                    onChange={handleChange}
                    renderValue={renderValue}
                  >
                    <MenuItem value="selectAll">Select All</MenuItem>
                    {agentData.map((option) => (
                      <MenuItem key={option._id} value={option.firstName}>
                        {option.firstName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Vehicle"
                  name="vehicle"
                  onChange={handleChange}
                  select
                  SelectProps={{ native: true }}
                >
                  {vehicleData.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  onChange={handleChange}
                  select
                  SelectProps={{ native: true }}
                >
                  {companyData.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Intermediary"
                  name="intermediary"
                  onChange={handleChange}
                  select
                  SelectProps={{ native: true }}
                >
                  {intermediaryData.map((option) => (
                    <option key={option._id} value={option._id}>
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
                  name="policytype"
                  onChange={handleChange}
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
                  name="agentplan"
                  onChange={handleChange}
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
            {agentCommissionToEdit ? "Update Agent Commission" : "Save Agent Commission"}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
