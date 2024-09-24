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
  Alert,
  Snackbar,
  Unstable_Grid2 as Grid,
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
  //   intermediary: intermediaryCommissionToEdit.intermediary,
  //   company: intermediaryCommissionToEdit.company,
  //   vehicle: intermediaryCommissionToEdit.vehicle,
  //   type: intermediaryCommissionToEdit.type,
  //   policytype: intermediaryCommissionToEdit.policytype,
  //   ourplan: intermediaryCommissionToEdit.ourplan,
  //   commission: intermediaryCommissionToEdit.commission,
  //   tds: intermediaryCommissionToEdit.tds,
  // });

  const [values, setValues] = useState({ ...intermediaryCommissionToEdit });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // or 'error'

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const fetchIntermediaryCommission = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setData(data);
  };

  // Initialize form fields with the existing intermediaryCommission's data
  useEffect(() => {
    document.getElementById("editForm").scrollIntoView({ behavior: "smooth" });

    setValues({
      intermediary: intermediaryCommissionToEdit.intermediary._id || "",
      company: intermediaryCommissionToEdit.company._id || "",
      vehicle: intermediaryCommissionToEdit.vehicle._id || "",
      policyType: intermediaryCommissionToEdit.policyType._id || "",
      ourPlan: intermediaryCommissionToEdit.ourPlan._id || "",
      tds: intermediaryCommissionToEdit.tds || "",
      odCommissionType: intermediaryCommissionToEdit.odCommissionType || "",
      odCommission: intermediaryCommissionToEdit.odCommission || "",
      tpCommissionType: intermediaryCommissionToEdit.tpCommissionType || "",
      tpCommission: intermediaryCommissionToEdit.tpCommission || "",
    });
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
      fetchIntermediaryCommission();
      setSnackbarSeverity("success");
      setSnackbarMessage("Intermediary commission updated successfully.");
      setSnackbarOpen(true);
    } else {
      // Handle error case
      setSnackbarSeverity("error");
      setSnackbarMessage("Error updating intermediary commission.  Please try again.");
      setSnackbarOpen(true);
    }
  }, [values, setData, data, apiUrl, intermediaryCommissionToEdit, setValues]);

  const selectedPolicy = (() => {
    const policyName = agentCommissionToEdit.policyType.name.toLowerCase();
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
          </>
        );
      case "tp":
        return (
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
        );
    }
  };

  return (
    <form autoComplete="off" noValidate Card id="editForm">
      <Card>
        <CardHeader title="Edit Intermediary Commission" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
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
                  label="Vehicle"
                  name="vehicles"
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
                  name="policyType"
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
                  name="ourPlan"
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
            Update Intermediary Commission
          </Button>
        </CardActions>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};
