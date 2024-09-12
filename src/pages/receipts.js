import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ReceiptAddForm } from "src/sections/receipt/receipt-add-form";
import { RecentReceipts } from "src/sections/receipt/recent-receipts";

const apiUrl = '/api/receipts'; // Replace with your actual API endpoint

const Page = () => {
  // State to manage the list of receipts
  const [data, setData] = useState([]);
  const [receiptToEdit, setReceiptToEdit] = useState(null);

  // Fetch existing receipts when the component mounts
  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await fetch(apiUrl);
        const receipts = await response.json();
        setData(receipts);
      } catch (error) {
        console.error("Error fetching receipts:", error);
      }
    };
    
    fetchReceipts();
  }, []);

  return (
    <>
      <Head>
        <title>Receipt | beInsured</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          px: 1, // Adjust left and right padding
        }}
      >
        <Container maxWidth="lg" sx={{ px: 0 }}> {/* Remove container padding */}
          <Stack spacing={3}>
            <Typography variant="h4">Receipt</Typography>
            <Grid container spacing={3}>
              {/* Form Section - 2/3 width */}
              <Grid item xs={12} md={8}>
                <ReceiptAddForm
                  data={data}
                  setData={setData}
                  apiUrl={apiUrl}
                  receiptToEdit={receiptToEdit}
                  setReceiptToEdit={setReceiptToEdit}
                />
              </Grid>

              {/* Recently Added Receipts Section - 1/3 width */}
              <Grid item xs={12} md={4}>
                <RecentReceipts receipts={data} />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
