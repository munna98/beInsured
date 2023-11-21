import { useCallback, useMemo, useState, useEffect } from 'react';
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
import useSearch from 'src/hooks/use-search';
import TableLoader from 'src/components/table-loader';

const Page = () => {

  const [data, setData] = useState([]);
  const apiUrl = '/api/vehicles';
  const [loading, setLoading] = useState(true);

  // ***** Setting api *****
  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await fetch(apiUrl)
        const data = await response.json()
        setData(data)

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 
  // ***** End setting api *****

  const { searchTerm, searchResults, handleSearchChange } = useSearch(data);

  const useVehicles = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(searchResults, page, rowsPerPage);
      },
      [page, rowsPerPage, searchTerm, searchResults, data]
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

  const [page, setPage] = useState(0);
  const [displayForm, setDisplayForm] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState();
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

  const handleAdd = useCallback(
    () => {
      setDisplayForm((prev) => !prev)
      setVehicleToEdit();
    },
    []
  );


  return (
    <>
    <Head>
      <title>
        Vehicles | beInsured
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
                onClick={() => handleAdd()}
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
          {displayForm   &&
            <VehicleAddForm
              data={data}
              setData={setData}
              apiUrl={apiUrl}
              vehicleToEdit={vehicleToEdit}
              setVehicleToEdit={setVehicleToEdit}
              setDisplayForm={setDisplayForm}
            />}
          <VehiclesSearch
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
          />
          {loading ?
            (<TableLoader/>)
            :(<VehiclesTable
              count={searchResults.length}
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
              searchResults={searchResults}
              data={data}
              setData={setData}
              apiUrl={apiUrl}
              vehicleToEdit={vehicleToEdit}
              setVehicleToEdit={setVehicleToEdit}
              setDisplayForm={setDisplayForm}
            />)}
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
