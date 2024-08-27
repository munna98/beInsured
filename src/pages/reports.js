import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { MenuAgentLedger } from "src/sections/report/menu/menu-agent-ledger";
import { MenuDayBook } from "src/sections/report/menu/menu-day-book";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { MenuIntermediaryLedger } from "src/sections/report/menu/menu-intermediary-ledger";

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>Overview | beInsured</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    > 
      <Container maxWidth="xl">
        <Grid container spacing={3} >
          <Grid xs={6} sm={4} lg={3}>
            <MenuAgentLedger index={0}/>
          </Grid>
          <Grid xs={6} sm={4} lg={3}>
            <MenuIntermediaryLedger index={1}/>
          </Grid>
          <Grid xs={6} sm={4} lg={3}>
            <MenuDayBook index={2}/>
          </Grid>
          <Grid xs={6} sm={4} lg={3}>
            <MenuAgentLedger index={3}/>
          </Grid>
          <Grid xs={6} sm={4} lg={3}>
            <MenuAgentLedger index={4}/>
          </Grid>
          <Grid xs={6} sm={4} lg={3}>
            <MenuAgentLedger index={5}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
