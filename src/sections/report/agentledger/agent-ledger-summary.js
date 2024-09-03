import React, { useEffect, useState } from 'react';
import { Card, Grid, Paper, Typography, Button } from '@mui/material';
import { exportAgentLedgerToExcel } from 'src/utils/export-to-excel-agent-ledger';

const AgentLedgerSummary = ({ policies }) => {
  const [summary, setSummary] = useState({
    totalGrossPremium: 0,
    totalNetPremium: 0,
    totalCommission: 0,
    totalPayable: 0,
    totalPaid: 0,
    balance: 0,
  });

  useEffect(() => {
    const totalGrossPremium = policies.reduce((sum, policy) => sum + policy.premium, 0);
    const totalNetPremium = policies.reduce((sum, policy) => sum + policy.net, 0);
    const totalCommission = policies.reduce((sum, policy) => sum + policy.commission, 0);
    const totalPayable = totalGrossPremium - totalCommission;
    const totalPaid = policies.reduce((sum, policy) => sum + policy.amountRecieved, 0);
    const balance = policies.reduce((sum, policy) => sum + policy.amountToBePaid, 0);

    setSummary({
      totalGrossPremium,
      totalNetPremium,
      totalCommission,
      totalPayable,
      totalPaid,
      balance,
    });
  }, [policies]);

  const summaryData = [
    { label: "Total Gross Premium:", value: `₹ ${summary.totalGrossPremium}` },
    { label: "Total Net Premium:", value: `₹ ${summary.totalNetPremium}` },
    { label: "Total Commission:", value: `₹ ${summary.totalCommission}` },
    { label: "Total Payable:", value: `₹ ${summary.totalPayable}` },
    { label: "Total Paid:", value: `₹ ${summary.totalPaid}` },
    { label: "Balance:", value: `₹ ${summary.balance}` },
  ];

  const handleExport = () => {
    exportAgentLedgerToExcel(summary, policies, "Agent_Ledger_Report.xlsx");
  };

  const isExportDisabled = policies.length === 0 || summary.totalGrossPremium === 0;

  return (
    <Card sx={{ mt: 3, p: 3, boxShadow: 3 }}>
      <Grid container spacing={2}>
        {summaryData.map((item, index) => (
          <Grid item xs={6} lg={4} key={index}>
            <Paper sx={{ p: 2, backgroundColor: "neutral.100", borderRadius: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {item.label}
              </Typography>
              <Typography variant="subtitle2">{item.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleExport}
        disabled={isExportDisabled}
      >
        Export to Excel
      </Button>
    </Card>
  );
};

export default AgentLedgerSummary;
