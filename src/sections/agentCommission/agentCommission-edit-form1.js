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
  Unstable_Grid2 as Grid

} from "@mui/material";

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

  console.log(agentCommissionToEdit);

  const commissionTypes = [
    { _id: 1, name: "Flat" },
    { _id: 2, name: "Percentage" },
  ];

  // const [values, setValues] = useState({
  //   agent: "",
  //   vehicle: "",
  //   company: "",
  //   intermediary: "",
  //   type: "",
  //   policytype: "",
  //   agentplan: "",
  //   commission: "",
  //   tds: "",
  // });
  const [values, setValues] = useState({})

  // const [values, setValues] = useState({
  //   agent: agentCommissionToEdit.agent,
  //   vehicle: agentCommissionToEdit.vehicle,
  //   company: agentCommissionToEdit.company,
  //   intermediary: agentCommissionToEdit.intermediary,
  //   type: agentCommissionToEdit.type,
  //   policytype: agentCommissionToEdit.policytype,
  //   agentplan: agentCommissionToEdit.agentplan,
  //   commission: agentCommissionToEdit.commission,
  //   tds: agentCommissionToEdit.tds,
  // });

  console.log(agentCommissionToEdit);

  useEffect(() => {
  const {
    agent, vehicle,company,intermediary, type,policyType, agentPlan , commission, tds
  } = agentCommissionToEdit;
  setValues({
    agent, vehicle,company,intermediary, type,policyType, agentPlan , commission, tds
      });
  }, [agentCommissionToEdit]);

  // Initialize form fields with the existing agentCommission's data
  useEffect(() => {
    document.getElementById("editForm").scrollIntoView({ behavior: "smooth" });

  }, [agentCommissionToEdit]);

  const handleChange = useCallback((event) => {
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
        setData(updatedData);
        setAgentCommissionToEdit();
        setValues({
          agent: "",
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

                >
                  {agentData.map((option) => (
                    <option
                      key={option._id}
                      value={option.agent}
                    >
                      {values.agent}
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
                  label="Vehicle"
                  name="vehicles"
                  onChange={handleChange}
                  select
                  SelectProps={{ native: true }}

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
            Update Agent Commission
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
