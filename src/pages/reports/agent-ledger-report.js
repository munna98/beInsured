import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Card,
  Container,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";
import { subMonths } from "date-fns";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AgentLedgerTable } from "src/sections/report/agentledger/agent-ledger-table";
import AgentLedgerSummary from "src/sections/report/agentledger/agent-ledger-summary";
import { ReportCriteriaForm } from "src/sections/report/agentledger/report-criteria-form";
import nProgress from "nprogress";

const Page = () => {
  const today = new Date();
  const defaultFromDate = subMonths(today, 1);

  const [policyData, setPolicyData] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [agentplanData, setAgentplanData] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [extended, setExtended] = useState(false);
  const [values, setValues] = useState({
    agent: "",
    reportType: "",
    fromDate: defaultFromDate,
    toDate: today,
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    nProgress.start();
    setInitialLoading(true);
    try {
      const [agentsResponse, agentPlansResponse, policiesResponse] = await Promise.all([
        fetch("/api/agents"),
        fetch("/api/agentplans"),
        fetch("/api/policies"),
      ]);

      const [agents, agentPlans, policies] = await Promise.all([
        agentsResponse.json(),
        agentPlansResponse.json(),
        policiesResponse.json(),
      ]);

      setAgentData(agents);
      setAgentplanData(agentPlans);
      setPolicyData(policies);

      setValues((prev) => ({
        ...prev,
        agent: agents[0]?._id || "",
        reportType: agentPlans[0]?._id || "",
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data. Please try again later.");
    } finally {
      setInitialLoading(false);
      nProgress.done();
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

  const handleExtendedChange = (event) => {
    setExtended(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const filteredPolicies = policyData.filter((policy) => {
        const policyDate = new Date(policy.date);
        return (
          policy.agentPlan._id === values.reportType &&
          policy.agentName._id === values.agent &&
          policyDate >= values.fromDate &&
          policyDate <= values.toDate
        );
      });

      setFilteredPolicies(filteredPolicies);
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <Head>
        <title>Agent Ledger | beInsured</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 3 }}>
            Agent Ledger
          </Typography>
          <Card sx={{ p: 3, mb: 3 }}>
            <Stack>
              <ReportCriteriaForm
                agentData={agentData}
                agentplanData={agentplanData}
                values={values}
                onChange={handleChange}
                onFromDateChange={handleFromDateChange}
                onToDateChange={handleToDateChange}
                onSubmit={handleSubmit}
                onExtendedChange={handleExtendedChange}
                extended={extended}
                loading={initialLoading}
              />
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
              <AgentLedgerTable items={filteredPolicies} />
            ) : (
              <Typography variant="subtitle1" sx={{ p: 3, textAlign: "center" }}>
                No data available for the selected criteria
              </Typography>
            )}
          </Card>

          <AgentLedgerSummary policies={filteredPolicies} />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
