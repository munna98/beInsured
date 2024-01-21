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

export const IntermediaryCommissionEditForm = ({
  data,
  setData,
  apiUrl,
  intermediaryCommissionToEdit,
  setIntermediaryCommissionToEdit,
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
  const [values, setValues] = useState({
    intermediary: intermediaryCommissionToEdit.intermediary,
    company: intermediaryCommissionToEdit.company,
    vehicle: intermediaryCommissionToEdit.vehicle,
    type: intermediaryCommissionToEdit.type,
    policytype: intermediaryCommissionToEdit.policytype,
    ourplan: intermediaryCommissionToEdit.ourplan,
    commission: intermediaryCommissionToEdit.commission,
    tds: intermediaryCommissionToEdit.tds,
  });


  // Initialize form fields with the existing intermediaryCommission's data
  useEffect(() => {
    document.getElementById("editForm").scrollIntoView({ behavior: "smooth" });

  }, [intermediaryCommissionToEdit]);

  const handleChange = useCallback((event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }, []);


  const handleSubmit = useCallback(async () => {

      // Handle editing by sending a PUT request
      const response = await fetch(`${apiUrl}/${intermediaryCommissionToEdit._id}`, {
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
        setIntermediaryCommissionToEdit();
        setValues({
          intermediary: "",
          company: "",
          vehicle: "",
          type: "",
          policytype: "",
          ourplan: "",
          commission: "",
          tds: "",
        }); // Reset form fields
        setDisplayForm(false);
      }
  }, [values, setData, data, apiUrl, intermediaryCommissionToEdit, setValues]);

  return (
    <form autoComplete="off" noValidate Card id="editForm">
      <Card>
        <CardHeader
          title="Edit Intermediary Commission"
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
                  label="Intermediary name"
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
                  label="Our plan"
                  name="ourplan"
                  onChange={handleChange}
                  select
                  SelectProps={{ native: true }}
                >
                  {ourplanData.map((option) => (
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
            Update Intermediary Commission
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
