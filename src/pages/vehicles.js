import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Card, Container, Stack, SvgIcon, Typography, CardHeader, Avatar, IconButton } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { VehiclesTable } from 'src/sections/vehicle/vehicles-table';
import { VehiclesSearch } from 'src/sections/vehicle/vehicles-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { VehicleAddForm } from 'src/sections/vehicle/vehicle-add-form';

const now = new Date();

const data = [
  {
   "id": 1,
   "vehicle": "4 WH GOODS 12000 TO 16200 GVW"
  },
  {
   "id": 2,
   "vehicle": "4 WH GOODS 12000-20000 GVWTP"
  },
  {
   "id": 3,
   "vehicle": "4 WH GOODS 20000-40000 GVW TP"
  },
  {
   "id": 4,
   "vehicle": "4 WH GOODS 3500 TO 7500 GVW PK"
  },
  {
   "id": 5,
   "vehicle": "4 WH GOODS 3500 TO 7500 GVW  T"
  },
  {
   "id": 6,
   "vehicle": "4 WH GOODS UP TO 3500 GVW  PK"
  },
  {
   "id": 7,
   "vehicle": "4 WH GOODS 7500 TO 12000 GVWTP"
  },
  {
   "id": 8,
   "vehicle": "4 WH GOODS UP TO 3500 GVW  TP"
  },
  {
   "id": 9,
   "vehicle": "MISC"
  },
  {
   "id": 10,
   "vehicle": "4 WH GOODS UP TO 2450 GVW  PK"
  },
  {
   "id": 11,
   "vehicle": "4 WH GOODS UP TO 2450 GVW  TP"
  },
  {
   "id": 12,
   "vehicle": "3 WH GOODS (TP\/PK)"
  },
  {
   "id": 13,
   "vehicle": "3 WH PASSENGER (TP\/PK"
  },
  {
   "id": 14,
   "vehicle": "PRIVATE CAR TP >1500 CC"
  },
  {
   "id": 15,
   "vehicle": "SCOOTER TP"
  },
  {
   "id": 16,
   "vehicle": "2 WH BIKE  <150 CC"
  },
  {
   "id": 17,
   "vehicle": "2 WH BIKE >150 CC"
  },
  {
   "id": 18,
   "vehicle": "PRIVATE CAR <1 000 CC"
  },
  {
   "id": 19,
   "vehicle": "PRIVATE CAR TP 1000 - 1500 CC"
  },
  {
   "id": 20,
   "vehicle": "4 WH GOODS 7501-40000 GVW PK"
  },
  {
   "id": 21,
   "vehicle": "4 WH GOODS (7501 TO 40000) GVW"
  },
  {
   "id": 22,
   "vehicle": "TAXI <1000CC 3+1 (TP)"
  },
  {
   "id": 23,
   "vehicle": "TAXI <1000CC 4+1 (TP)"
  },
  {
   "id": 24,
   "vehicle": "TAXI <1000CC 5+1 (TP)"
  },
  {
   "id": 25,
   "vehicle": "TAXI <1000CC 6+1 (TP)"
  },
  {
   "id": 26,
   "vehicle": "TAXI 1001-1500 CC 4+1 (TP)"
  },
  {
   "id": 27,
   "vehicle": "TAXI 1001-1500 CC 5+1 (TP)"
  },
  {
   "id": 28,
   "vehicle": "TAXI 1001-1500 CC 6+1 (TP)"
  },
  {
   "id": 29,
   "vehicle": "TAXI >1500 CC 4+1 (TP)"
  },
  {
   "id": 30,
   "vehicle": "TAXI >1500 CC 4+1 (TP)"
  },
  {
   "id": 31,
   "vehicle": "TAXI >1500 CC 5+1 (TP)"
  },
  {
   "id": 32,
   "vehicle": "TAXI >1500 CC 6+1 (TP)"
  },
  {
   "id": 33,
   "vehicle": "TAXI PKG UPTO 6+1"
  },
  {
   "id": 34,
   "vehicle": "SCHOOL BUS TP\/PKG"
  },
  {
   "id": 35,
   "vehicle": "SCHOOL BUS TP\/PKG"
  },
  {
   "id": 36,
   "vehicle": "BIKE PK <150 CC"
  },
  {
   "id": 37,
   "vehicle": "BIKE PK >150 CC"
  },
  {
   "id": 38,
   "vehicle": "PRIVATE TP > 1500 CC PETROL"
  },
  {
   "id": 39,
   "vehicle": "PRIVATE TP > 1500 CC DIESEL"
  },
  {
   "id": 40,
   "vehicle": "SCOOTER PK"
  },
  {
   "id": 41,
   "vehicle": "AUTORIKSHA"
  }
 ]

const useVehicles = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useVehicleIds = (vehicles) => {
  return useMemo(
    () => {
      return vehicles.map((vehicle) => vehicle.id);
    },
    [vehicles]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [addVehicle, setAddVehicle] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const vehicles = useVehicles(page, rowsPerPage);
  const vehiclesIds = useVehicleIds(vehicles);
  const vehiclesSelection = useSelection(vehiclesIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Vehicles | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Vehicles
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  onClick={()=>setAddVehicle((prev)=>!prev)}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            {addVehicle&& <VehicleAddForm />}
            <VehiclesSearch />
            <VehiclesTable
              count={data.length}
              items={vehicles}
              onDeselectAll={vehiclesSelection.handleDeselectAll}
              onDeselectOne={vehiclesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={vehiclesSelection.handleSelectAll}
              onSelectOne={vehiclesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={vehiclesSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
