import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Card, Container, Stack, SvgIcon, Typography, CardHeader, Avatar, IconButton } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { IntermediaryCommissionsTable } from 'src/sections/intermediaryCommission/intermediaryCommissions-table';
import { IntermediaryCommissionsSearch } from 'src/sections/intermediaryCommission/intermediaryCommissions-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { IntermediaryCommissionAddForm } from 'src/sections/intermediaryCommission/intermediaryCommission-add-form';
import useSearch from 'src/hooks/use-search';
import { useContext } from "react";
import { DataContext } from 'src/contexts/data-context';
import TableLoader from 'src/components/table-loader';

const Page = () => {

  const [data, setData] = useState([]);
  const apiUrl = '/api/intermediaryCommissions';
  const [loading, setLoading] = useState(true);
  const { isFetching, refreshData } = useContext(DataContext);

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
    refreshData();
  }, []);


  // ***** End setting api *****

  const { searchTerm, searchResults, handleSearchChange } = useSearch(data);

  const useIntermediaryCommissions = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(searchResults, page, rowsPerPage);
      },
      [page, rowsPerPage, searchTerm, searchResults, data]
    );
  };

  const useIntermediaryCommissionIds = (intermediaryCommissions) => {
    return useMemo(
      () => {
        return intermediaryCommissions.map((intermediaryCommission) => intermediaryCommission.id);
      },
      [intermediaryCommissions]
    );
  };

  const [page, setPage] = useState(0);
  const [displayForm, setDisplayForm] = useState(false);
  const [intermediaryCommissionToEdit, setIntermediaryCommissionToEdit] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const intermediaryCommissions = useIntermediaryCommissions(page, rowsPerPage);
  const intermediaryCommissionsIds = useIntermediaryCommissionIds(intermediaryCommissions);
  const intermediaryCommissionsSelection = useSelection(intermediaryCommissionsIds);

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
      setIntermediaryCommissionToEdit();
    },
    []
  );

  return (
    <>
      <Head>
        <title>
        Intermediary Commissions | beInsured
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
                  Intermediary Commissions
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
            {displayForm  && 
            (isFetching? (<p1>Please wait...</p1>):
              (<IntermediaryCommissionAddForm
                data={data}
                setData={setData}
                apiUrl={apiUrl}
                intermediaryCommissionToEdit={intermediaryCommissionToEdit}
                setIntermediaryCommissionToEdit={setIntermediaryCommissionToEdit}
                setDisplayForm={setDisplayForm}
                />))}
            <IntermediaryCommissionsSearch
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
            {loading ?
              (<TableLoader />)
              : (<IntermediaryCommissionsTable
                count={searchResults.length}
                items={intermediaryCommissions}
                onDeselectAll={intermediaryCommissionsSelection.handleDeselectAll}
                onDeselectOne={intermediaryCommissionsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={intermediaryCommissionsSelection.handleSelectAll}
                onSelectOne={intermediaryCommissionsSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={intermediaryCommissionsSelection.selected}
                searchResults={searchResults}
                data={data}
                setData={setData}
                apiUrl={apiUrl}
                intermediaryCommissionToEdit={intermediaryCommissionToEdit}
                setIntermediaryCommissionToEdit={setIntermediaryCommissionToEdit}
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
