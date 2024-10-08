import { useState, useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "src/contexts/data-context";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from "@mui/x-date-pickers";
import { subMonths } from "date-fns";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { IntermediaryLedgerTable } from "src/sections/report/intermediaryledger/intermediary-ledger-table";
import  IntermediaryLedgerSummary  from "src/sections/report/intermediaryledger/intermediary-ledger-summary";
import nProgress from "nprogress";
import { useNProgress } from "src/hooks/use-nprogress";


const Page = () => {
  const today = new Date();
  const defaultFromDate = subMonths(today, 1);



  const [policyData, setPolicyData] = useState([]);
  const [intermediaryData, setIntermediaryData] = useState([]);
  const [ourplanData, setOurPlanData] = useState([]);

  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [values, setValues] = useState({
    intermediary: "",
    reportType: "",
    fromDate: defaultFromDate,
    toDate: today,
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    nProgress.start(); // Start nProgress for initial loading
    setInitialLoading(true);
    try {
      const [intermediariesResponse, ourPlansResponse, policiesResponse] = await Promise.all([
        fetch("/api/intermediaries"),
        fetch("/api/ourplans"),
        fetch("/api/policies"),
      ]);

      const [intermediaries, ourPlans, policies] = await Promise.all([
        intermediariesResponse.json(),
        ourPlansResponse.json(),
        policiesResponse.json(),
      ]);

      setIntermediaryData(intermediaries);
      setOurPlanData(ourPlans);
      setPolicyData(policies);

      setValues((prev) => ({
        ...prev,
        intermediary: intermediaries[0]?._id || "",
        reportType: ourPlans[0]?._id || "",
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data. Please try again later.");
    } finally {
      setInitialLoading(false);
      nProgress.done(); // Stop nProgress when initial loading is done
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
      console.log("selected:", value);
  };

  const handleFromDateChange = (newValue) => {
    setValues((prev) => ({
      ...prev,
      fromDate: newValue,
    }));
  };

  const handleToDateChange = (newValue) => {
    setValues((prev) => ({
      ...prev,
      toDate: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("generating report"); 

    setTimeout(() => { // Simulate an API call delay
      const filteredPolicies = policyData.filter((policy) => {
        const policyDate = new Date(policy.date);
        return (
          policy.ourPlan._id === values.reportType &&
          policy.intermediary._id === values.intermediary &&
          policyDate >= values.fromDate &&
          policyDate <= values.toDate
        );
      });

      setFilteredPolicies(filteredPolicies);
      setLoading(false);
    }, 500); // Remove this timeout in production
  };

  return (
    <>
      <Head>
        <title>Intermediary Ledger | beInsured</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 3 }}>
            Intermediary Ledger
          </Typography>
          <Card sx={{ p: 3, mb: 3 }}>
            <Stack>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth>
                    <InputLabel id="report-type-label">Report Type</InputLabel>
                    <Select
                      labelId="report-type-label"
                      name="reportType"
                      value={values.reportType}
                      label="Report Type"
                      onChange={handleChange}
                    >
                       {ourplanData.map((type) => (
                        <MenuItem key={type._id} value={type._id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel id="intermediary-label">Intermediary</InputLabel>
                    <Select
                      labelId="intermediary-label"
                      name="intermediary"
                      value={values.intermediary}
                      label="Intermediary"
                      onChange={handleChange}
                    >
                      {intermediaryData.map((intermediary) => (
                        <MenuItem key={intermediary._id} value={intermediary._id}>
                          {intermediary.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2.5}>
                  <DatePicker
                    fullWidth
                    label="From Date"
                    name="fromdate"
                    renderInput={(params) => <TextField {...params} />}
                    value={values.fromDate}
                    onChange={handleFromDateChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2.5}>
                  <DatePicker
                    fullWidth
                    label="To Date"
                    name="todate"
                    renderInput={(params) => <TextField {...params} />}
                    value={values.toDate}
                    onChange={handleToDateChange}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    type="submit"
                    disabled={initialLoading}
                  >
                    Generate Report
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </Card>

          <Card>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : filteredPolicies.length > 0 ? (
              <IntermediaryLedgerTable items={filteredPolicies} />
            ) : (
              <Typography variant="subtitle1" sx={{ p: 3, textAlign: "center" }}>
                No data available for the selected criteria
              </Typography>
            )}
          </Card>

          <IntermediaryLedgerSummary policies={filteredPolicies} />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
