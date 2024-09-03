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
  Unstable_Grid2 as Grid,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers"; 
import Checkbox from "@mui/material/Checkbox";
import { number } from "prop-types";
import useAgentCommission from "src/hooks/use-agent-commission";

export const PolicyAddForm = ({
  data,
  setData,
  apiUrl,
  policyToEdit,
  setPolicyToEdit,
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
    paymentByData
  } = useContext(DataContext);


  const [issueDate, setIssueDate] = useState(new Date());

  const initialValues = {
    date: new Date(),
    customerName: "",
    policyType: policyTypeData[0]._id,
    vehicleNumber: "",
    premium: "",
    thirdParty: "",
    ownDamage: "",
    net: "",
    company: companyData[0]._id,
    intermediary: intermediaryData[0]._id,
    vehicleType: vehicleData[0]._id,
    agentName: agentData[0]._id,
    agentPlan: agentplanData[0]._id,
    commission: "",
    ourPlan: ourplanData[0]._id,
    policyNumber: "",
    paymentMode: "",
    paymentBy:paymentByData[0]._id,
    capReached: "",
    amountRecieved: "",
    amountToBePaid: "", 
  };
  

  const [values, setValues] = useState(initialValues);
  const { findAgentCommission } = useAgentCommission();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // or 'error'
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // const handleChange = useCallback(
  //   (event) => {
  //     const { name, value } = event.target;

  //     // Handle the "Net" calculation when either thirdParty or ownDamage changes
  //     if (name === "thirdParty" || name === "ownDamage") {
  //       setValues((prev) => {
  //         const updatedValues = {
  //           ...prev,
  //           [name]: value,
  //         };

  //         const netValue = updatedValues.thirdParty - -updatedValues.ownDamage;
  //         return {
  //           ...updatedValues,
  //           net: isNaN(netValue) ? null : netValue,
  //         };
  //       // });
  //     }

      
  //     setValues((prev) => ({
  //       ...prev,
  //       [name]: value,
  //       amountToBePaid: 
  //         (name === "paymentBy" && value === paymentBy[1]._id)  //Assuming amount paid value is Agent Paid
  //         ? -(prev.commission) 
  //         : prev.premium - prev.commission - prev.amountRecieved,
  //     }));


  //     // Dynamically update the commission value
  //     if (
  //       name === "agentName" ||
  //       name === "vehicleType" ||
  //       name === "company" ||
  //       name === "intermediary" ||
  //       name === "policyType" ||
  //       name === "agentPlan" ||
  //       name === "thirdParty" ||
  //       name === "paymentBy" ||
  //       name === "ownDamage" ||
  //       name === "paymentBy"
  //     ) {
  //       setValues((prev) => {
  //         const commission = findAgentCommission({
  //           agent: prev.agentName,
  //           vehicle: prev.vehicleType,
  //           company: prev.company,
  //           intermediary: prev.intermediary,
  //           policyType: prev.policyType,
  //           agentPlan: prev.agentPlan,
  //           net: prev.net,
  //         });
  //         return {
  //           ...prev,
  //           commission: commission,
  //           capReached: prev.paymentBy === paymentByData[0]._id? prev.premium - commission: 0,
  //         };
  //       });
  //       console.log("one of the input values changed...");
  //     }
  //   },
  //   [setValues, findAgentCommission]
  // );


const handleChange = useCallback(
  (event) => {
    const { name, value } = event.target;

    setValues((prev) => {
      let updatedValues = {
        ...prev,
        [name]: value,
      };

      // Handle the "Net" calculation when either thirdParty or ownDamage changes
      if (name === "thirdParty" || name === "ownDamage") {
        const netValue = updatedValues.thirdParty - -updatedValues.ownDamage;
        updatedValues = {
          ...updatedValues,
          net: isNaN(netValue) ? null : netValue,
        };
      }

      // Dynamically update the commission value
      if (
        name === "agentName" ||
        name === "vehicleType" ||
        name === "company" ||
        name === "intermediary" ||
        name === "policyType" ||
        name === "agentPlan" ||
        name === "thirdParty" ||
        name === "paymentBy" ||
        name === "premium" ||
        name === "ownDamage"
      ) {
        const commission = findAgentCommission({
          agent: updatedValues.agentName,
          vehicle: updatedValues.vehicleType,
          company: updatedValues.company,
          intermediary: updatedValues.intermediary,
          policyType: updatedValues.policyType,
          agentPlan: updatedValues.agentPlan,
          net: updatedValues.net,
        });

        updatedValues = {
          ...updatedValues,
          commission: commission,
          capReached: updatedValues.paymentBy === paymentByData[0]._id ? updatedValues.premium - commission : 0,
        };
      }

      // Update amountToBePaid and handle amountRecieved when paymentBy is relevant
      if (name === "paymentBy" || name === "premium" || name === "commission" || name === "amountRecieved") {
        updatedValues = {
          ...updatedValues,
          // Set amountRecieved to 0 if paymentBy is "Agent Paid"
          amountRecieved: value === paymentByData[1]._id ? 0 : updatedValues.amountRecieved,
          // Calculate amountToBePaid
          amountToBePaid:
            value === paymentByData[1]._id // Assuming amount paid value is "Agent Paid"
              ? -updatedValues.commission
              : updatedValues.premium - updatedValues.commission - updatedValues.amountRecieved,
        };
      }

      return updatedValues;
    });

    console.log("one of the input values changed...");
  },
  [setValues, findAgentCommission]
);

  

  console.log('values',values);
  

  const handleDateChange = useCallback((date) => {
    const selectedDate = date || new Date(); // If date is not provided, use today's date

    setIssueDate(selectedDate);
    setValues((prev) => ({
      ...prev,
      date: selectedDate,
    }));
  }, []);

  useEffect(() => {
    // **********

    document.getElementById("editForm").scrollIntoView({ behavior: "smooth" });

    if (policyToEdit) {
      const {
        date,
        customerName,
        policyType,
        vehicleNumber,
        premium,
        thirdParty,
        ownDamage,
        net,
        company,
        intermediary,
        vehicleType,
        agentName,
        agentPlan,
        commission,
        ourPlan,
        policyNumber,
        paymentMode,
        paymentBy,
        capReached,
        amountRecieved,
        amountToBePaid,
      } = policyToEdit;
      setValues({
        date,
        customerName,
        policyType:policyType._id,
        vehicleNumber,
        premium,
        thirdParty,
        ownDamage,
        net,
        company:company._id,
        intermediary:intermediary._id,
        vehicleType:vehicleType._id,
        agentName: agentName._id,
        agentPlan: agentPlan._id,
        commission,
        ourPlan: ourPlan._id, 
        policyNumber,
        paymentMode,
        paymentBy: paymentBy._id,
        capReached,
        amountRecieved,
        amountToBePaid,
      });
    }
  }, [policyToEdit]);

  const fetchPolicy = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching policy:", error);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (policyToEdit) {
      // Handle editing by sending a PUT request
      const response = await fetch(`${apiUrl}/${policyToEdit._id}`, {
        method: "PUT",
        body: JSON.stringify({ values }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const updatedValues = await response.json();
        // Update the client-side data state with the edited policy
        // const updatedData = data.map((policy) =>
        //   policy._id === updatedValues._id ? updatedValues : policy
        // );
        // setData(updatedData);
        fetchPolicy()
        setPolicyToEdit();
        setValues(initialValues); // Reset form fields
        // setDisplayForm(false);
        setSnackbarSeverity("success");
        setSnackbarMessage("Policy updated successfully.");
        setSnackbarOpen(true);
      }
    } else {
      // Handle adding a new policy
      const response = await fetch(apiUrl, {
        method: "POST", 
        body: JSON.stringify({ values }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        // const newValues = await response.json();
        // Update the client-side data state with the new policy
        // setData([newValues, ...data]);
        fetchPolicy();
        setValues(initialValues); // Reset form fields
        setSnackbarSeverity("success");
        setSnackbarMessage("Policy added successfully.");
        setSnackbarOpen(true);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error adding policy. Please try again.");
        setSnackbarOpen(true);
      }
    }
  }, [values, initialValues, setData, data, apiUrl, policyToEdit, setValues]);
  return (
    <form autoComplete="off" noValidate Card id="editForm">
      <Card>
        <CardHeader subheader="Fill the form to add a new policy" title="Add Policy" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <DatePicker
                  fullWidth
                  // type='date'
                  label="Policy issue date"
                  name="date"
                  renderInput={(params) => <TextField {...params} />}
                  value={values.date || new Date()}
                  onChange={handleDateChange}
                />
              </Grid>
              {/* 
              <Grid
                xs={12}
                md={6}
              >
                <DatePicker
                  fullWidth
                  label="Policy issue date"
                  name="date"
                  renderInput={(params) => <TextField {...params} />}
                  value={issueDate}
                  onChange={handleDateChange}
                />
              </Grid> */}

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Customer name"
                  name="customerName"
                  onChange={handleChange}
                  required
                  value={values.customerName}
                />
              </Grid>

              {/*               
              <Grid
                xs={12}
                md={6}
              >
                <FormGroup>
                  color="text.secondary"
                  <Typography color="text.secondary" variant="subtitle2" style={{ padding: 10 }}>
                    Policy type
                  </Typography>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="TP" />
                  <FormControlLabel control={<Checkbox />} label="PK" />
                  <FormControlLabel control={<Checkbox />} label="OD" />
                </FormGroup>
              </Grid>  */}
              
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
                  label="Vehicle number"
                  name="vehicleNumber"
                  onChange={handleChange}
                  type="text"
                  value={values.vehicleNumber}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Premium"
                  name="premium"
                  onChange={handleChange}
                  value={values.premium}
                ></TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="TP amount"
                  name="thirdParty"
                  onChange={handleChange}
                  value={values.thirdParty}
                ></TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="OD amount"
                  name="ownDamage"
                  onChange={handleChange}
                  value={values.ownDamage}
                ></TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Net"
                  name="net"
                  onChange={handleChange}
                  value={values.thirdParty - -values.ownDamage}
                  // disabled
                ></TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company" 
                  name="company"
                  onChange={handleChange}
                  value={values.company}
                  select
                  SelectProps={{ native: true }}
                >
                  {companyData.map((option) => (
                    <option key={option.value} value={option._id}>
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
                  value={values.intermediary}
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
                  label="Vehicle type"
                  name="vehicleType"
                  onChange={handleChange}
                  value={values.vehicleType}
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
                  label="Agent name"
                  name="agentName"
                  onChange={handleChange}
                  value={values.agentName}
                  select
                  SelectProps={{ native: true }}
                >
                  {agentData.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.firstName}
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
                  value={values.commission}
                ></TextField>
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Our Plan"
                  name="ourPlan"
                  onChange={handleChange}
                  value={values.ourPlan}
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
                  label="Policy number"
                  name="policyNumber"
                  onChange={handleChange}
                  value={values.policyNumber}
                />
              </Grid>
              {/* <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Payment mode"
                  name="paymentMode"
                  onChange={handleChange}
                  value={values.paymentMode}
                  select
                  SelectProps={{ native: true }}
                >
                  {paymentModeData.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid> */}
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Payment By"
                  name="paymentBy"
                  onChange={handleChange}
                  value={values.paymentBy}
                  select
                  SelectProps={{ native: true }}
                >
                  {paymentByData.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>


              {values.paymentBy === paymentByData[0]._id &&(
                <>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Cap reached"
                      name="capReached"
                      onChange={handleChange}
                      type="number"
                      value={(values.paymentBy == paymentByData[0]._id)? values.capReached: 0}
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Amount received"
                      name="amountRecieved"
                      onChange={handleChange}
                      type="number"
                      value={(values.paymentBy == paymentByData[0]._id)?  values.amountRecieved: 0}
                    />
                  </Grid>
                </>
              )}
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Amount to be paid"
                  name="amountToBePaid"
                  onChange={handleChange}
                  value={(values.paymentBy == paymentByData[1]._id)? -(values.commission):
                     values.premium - values.commission - values.amountRecieved}
                ></TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleSubmit}>
            {policyToEdit ? "Update Policy" : "Save Policy"}
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
