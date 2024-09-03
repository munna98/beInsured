import * as XLSX from "xlsx";
import { format } from "date-fns";

export const exportAgentLedgerToExcel = (summary, policies, filename) => {
  // Convert summary data to a format suitable for Excel
  const summaryData = [
    { A: "Summary", B: "" },
    { A: "Total Gross Premium:", B: `Rs ${summary.totalGrossPremium}` },
    { A: "Total Net Premium:", B: `Rs ${summary.totalNetPremium}` },
    { A: "Total Commission:", B: `Rs ${summary.totalCommission}` },
    { A: "Total Payable:", B: `Rs ${summary.totalPayable}` },
    { A: "Total Paid:", B: `Rs ${summary.totalPaid}` },
    { A: "Balance:", B: `Rs ${summary.balance}` },
  ];

  // Convert policies data to a format suitable for Excel and format the date
  const policiesData = policies.map((policy, index) => ({
    "S.No": index + 1,
    Date: format(new Date(policy.date), "dd-MM-yyyy"),
    Category: policy.policyType.name,
    Customer: policy.customerName,
    "Vehicle Number": policy.vehicleNumber,
    Agent: policy.agentName.firstName,
    Premium: policy.premium,
    "Net Premium": policy.net,
    "Received Amount": policy.amountRecieved,
    Plan: policy.agentPlan.name,
    Commission: policy.commission,
    Payable: policy.premium - policy.commission,
    "Paid By": policy.paymentMode.name,
    Balance: policy.amountToBePaid,
  }));

  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Add summary sheet
  const summarySheet = XLSX.utils.json_to_sheet(summaryData, { skipHeader: true });

  // Style summary cells
  const summaryStyles = { font: { bold: true } };
  summarySheet["!cols"] = [{ wch: 30 }, { wch: 20 }]; // Set column widths

  for (let i = 2; i <= 7; i++) {
    const cellA = `A${i}`;
    const cellB = `B${i}`;
    summarySheet[cellA].s = summaryStyles;
    summarySheet[cellB].s = { alignment: { horizontal: "right" } };
  }

  // Add policies sheet
  const policiesSheet = XLSX.utils.json_to_sheet(policiesData);

  // Set column widths for policies sheet
  policiesSheet["!cols"] = [
    { wch: 5 },  // S.No
    { wch: 12 }, // Date
    { wch: 12 }, // Category
    { wch: 20 }, // Customer
    { wch: 15 }, // Vehicle Number
    { wch: 15 }, // Agent
    { wch: 12 }, // Premium
    { wch: 12 }, // Net Premium
    { wch: 15 }, // Received Amount
    { wch: 10 }, // Plan
    { wch: 10 }, // Commission
    { wch: 10 }, // Payable
    { wch: 10 }, // Paid By
    { wch: 12 }, // Balance
  ];

  // Make column titles bold
  const policiesHeaders = Object.keys(policiesData[0]);
  policiesHeaders.forEach((header, index) => {
    const cell = XLSX.utils.encode_cell({ c: index, r: 0 });
    if (policiesSheet[cell]) policiesSheet[cell].s = { font: { bold: true } };
  });

  // Append sheets to workbook
  XLSX.utils.book_append_sheet(wb, summarySheet, "Summary");
  XLSX.utils.book_append_sheet(wb, policiesSheet, "Policies");

  // Write the workbook to a file
  XLSX.writeFile(wb, filename);
};
