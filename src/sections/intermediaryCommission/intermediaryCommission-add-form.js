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
} from "@mui/material";

export const IntermediaryCommissionAddForm = ({ data, setData, apiUrl }) => {
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
    intermediary:intermediaryData[0]._id,
    company: [],
    vehicle: [],
    type: commissionTypes[0].name,
    policyType: policyTypeData[0]._id,
    ourPlan: ourplanData[0]._id,
    commission: "",
    tds: "",
  });

  useEffect(() => {
    document.getElementById("editForm").scrollIntoView({ behavior: "smooth" });
  }, []);

  const fetchIntermediaryCommission = async () => {
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
      case "company":
        return companyData.map((company) => company._id);
      case "vehicle":
        return vehicleData.map((vehicle) => vehicle._id);
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
        {additionalOptionsCount > 0 && <Chip label={`+${additionalOptionsCount}`} />}
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
    console.log("clicked on submit");
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({ values }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      const newValues = await response.json();
      // Update the client-side data state with the new interemediaryCommission
      // setData([...newValues, ...data]);
      fetchIntermediaryCommission();
      setValues({
        intermediary:intermediaryData[0]._id,
        company: [],
        vehicle: [],
        type: commissionTypes[0].name,
        policyType: policyTypeData[0]._id,
        ourPlan: ourplanData[0]._id,
        commission: "",
        tds: "",
      }); // Reset form fields
    }
  }, [values, setData, data, apiUrl, setValues]);

  return (
    <form autoComplete="off" noValidate Card id="editForm">
      <Card> 
        <CardHeader title="Add Intermediary Commission" />
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
                  value={values.intermediary}
                >
                  {intermediaryData.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
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
                  label="Our plan"
                  name="ourPlan"
                  onChange={handleChange}
                  select
                  SelectProps={{ native: true }}
                  value={values.ourPlan}
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
            Save Intermediary Commission
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
