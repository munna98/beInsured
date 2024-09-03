// import * as XLSX from "xlsx";

// export const exportToExcel = (data, filename) => {
//   const ws = XLSX.utils.json_to_sheet(data);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//   XLSX.writeFile(wb, filename);
// };


import * as XLSX from "xlsx";

export const exportToExcel = (summary, tableData, filename) => {
  // Prepare summary data for Excel
  const summarySheetData = [
    { label: "Total Gross Premium", value: `Rs ${summary.totalGrossPremium}` },
    { label: "Total Net Premium", value: `Rs ${summary.totalNetPremium}` },
    { label: "Total Commission", value: `Rs ${summary.totalCommission}` },
    { label: "Total Payable", value: `Rs ${summary.totalPayable}` },
    { label: "Total Paid", value: `Rs ${summary.totalPaid}` },
    { label: "Balance", value: `Rs ${summary.balance}` },
  ];

  // Convert summary and table data to sheets
  const summarySheet = XLSX.utils.json_to_sheet(summarySheetData);
  const tableSheet = XLSX.utils.json_to_sheet(tableData);

  // Create a new workbook and append sheets
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, summarySheet, "Summary");
  XLSX.utils.book_append_sheet(wb, tableSheet, "Agent Ledger");

  // Write to Excel file
  XLSX.writeFile(wb, filename);
};
