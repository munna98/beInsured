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
    paymentMode: paymentModeData[0]._id,
    capReached: "",
    amountRecieved: "",
    amountToBePaid: "",
  };
  

  const [values, setValues] = useState(initialValues);
  const { findAgentCommission } = useAgentCommission();

  // console.log(values);



//   const handleChange = useCallback((event) => {

//     const { name, value } = event.target;

//     // Handle the "Net" calculation when either thirdParty or ownDamage changes
// if (name === "thirdParty" || name === "ownDamage") {
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
//       });
//     }

//   else {
//     // Handle other fields

//     // Dynamically update the commission value
//     if (name === "agentName" || name === "vehicleType" || name === "company" || name === "intermediary" || name === "policyType" || name === "agentPlan") {
//       const commission = findAgentCommission({ 
//         agent: values.agentName,
//         vehicle: values.vehicleType,
//         company: values.company,
//         intermediary: values.intermediary,
//         policyType: values.policyType,
//         agentPlan: values.agentPlan,});
//       setValues((prev) => ({
//         ...prev,
//         [name]: value,
//         // commission:commission, // Update the commission field
//       }));
//       console.log("one of the input value changed...");
//     } else {
//       setValues((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   }
// },
// [setValues, values]
// );


const handleChange = useCallback((event) => {
  const { name, value } = event.target;

  // Handle the "Net" calculation when either thirdParty or ownDamage changes
  if (name === "thirdParty" || name === "ownDamage") {
    setValues((prev) => {
      const updatedValues = {
        ...prev,
        [name]: value,
      };

      const netValue = updatedValues.thirdParty - -updatedValues.ownDamage;
      return {
        ...updatedValues,
        net: isNaN(netValue) ? null : netValue,
      };
    });
  }

  // Handle other fields
  setValues((prev) => ({
    ...prev,
    [name]: value,
    amountToBePaid: prev.premium - prev.commission - prev.amountRecieved
  }));

  // Dynamically update the commission value
  if (
    name === "agentName" ||
    name === "vehicleType" ||
    name === "company" ||
    name === "intermediary" ||
    name === "policyType" ||
    name === "agentPlan" ||
    name === "thirdParty" || 
    name === "ownDamage"
  ) {
    setValues((prev) => {
      const commission = findAgentCommission({
        agent: prev.agentName,
        vehicle: prev.vehicleType,
        company: prev.company,
        intermediary: prev.intermediary,
        policyType: prev.policyType,
        agentPlan: prev.agentPlan,
        net: prev.net,
      });
      return {
        ...prev,
        commission: commission,
        capReached: prev.premium - commission,
      };
    });
    console.log("one of the input values changed...");
  }
}, [setValues, findAgentCommission]);



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
        capReached,
        amountRecieved,
        amountToBePaid,
      } = policyToEdit;
      setValues({
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
        capReached,
        amountRecieved,
        amountToBePaid,
      });
    }
  }, [policyToEdit]);

  const fetchPolicy = async () => {
    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error('Error fetching policy:', error);
    }
  }

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
        const updatedData = data.map((policy) =>
          policy._id === updatedValues._id ? updatedValues : policy
        );
        setData(updatedData);
        setPolicyToEdit();
        setValues(initialValues); // Reset form fields
        setDisplayForm(false);
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
        const newValues = await response.json();
        // Update the client-side data state with the new policy
        // setData([newValues, ...data]);
        fetchPolicy()
        setValues(initialValues); // Reset form fields
      }
      // else {
      //   const errorData = await response.json();
      //   setError(errorData.message); // Set error message state
      //   setErrorDialogOpen(true)
      // }
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
              <Grid xs={12} md={6}>
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
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="CAP reached"
                  name="capReached"
                  onChange={handleChange}
                  value={values.premium-values.commission}
                ></TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Amount recieved"
                  name="amountRecieved"
                  onChange={handleChange}
                  value={values.amountRecieved}
                ></TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Amount to be paid"
                  name="amountToBePaid"
                  onChange={handleChange}
                  value={values.premium-values.commission-values.amountRecieved}
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
    </form>
  );
};
