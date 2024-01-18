import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Card, Container, Stack, SvgIcon, Typography, CardHeader, Avatar, IconButton } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AgentCommissionsTable } from 'src/sections/agentCommission/agentCommissions-table';
import { AgentCommissionsSearch } from 'src/sections/agentCommission/agentCommissions-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { AgentCommissionAddForm } from 'src/sections/agentCommission/agentCommission-add-form';
import useSearch from 'src/hooks/use-search';
import { useContext } from "react";
import { DataContext } from 'src/contexts/data-context';
import TableLoader from 'src/components/table-loader';

const Page = () => {

  const [data, setData] = useState([]);
  const apiUrl = '/api/agentCommissions';
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

  const useAgentCommissions = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(searchResults, page, rowsPerPage);
      },
      [page, rowsPerPage, searchTerm, searchResults, data]
    );
  };

  const useAgentCommissionIds = (agentCommissions) => {
    return useMemo(
      () => {
        return agentCommissions.map((agentCommission) => agentCommission.id);
      },
      [agentCommissions]
    );
  };

  const [page, setPage] = useState(0);
  const [displayForm, setDisplayForm] = useState(false);
  const [agentCommissionToEdit, setAgentCommissionToEdit] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const agentCommissions = useAgentCommissions(page, rowsPerPage);
  const agentCommissionsIds = useAgentCommissionIds(agentCommissions);
  const agentCommissionsSelection = useSelection(agentCommissionsIds);

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
      setAgentCommissionToEdit();
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Agent Commissions | beInsured
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
                  Agent Commissions
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
              (<AgentCommissionAddForm
                data={data}
                setData={setData}
                apiUrl={apiUrl}
                agentCommissionToEdit={agentCommissionToEdit}
                setAgentCommissionToEdit={setAgentCommissionToEdit}
                setDisplayForm={setDisplayForm}
              />))}
            <AgentCommissionsSearch
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
            {loading ?
              (<TableLoader />)
              : (<AgentCommissionsTable
                count={searchResults.length}
                items={agentCommissions}
                onDeselectAll={agentCommissionsSelection.handleDeselectAll}
                onDeselectOne={agentCommissionsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={agentCommissionsSelection.handleSelectAll}
                onSelectOne={agentCommissionsSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={agentCommissionsSelection.selected}
                searchResults={searchResults}
                data={data}
                setData={setData}
                apiUrl={apiUrl}
                agentCommissionToEdit={agentCommissionToEdit}
                setAgentCommissionToEdit={setAgentCommissionToEdit}
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
