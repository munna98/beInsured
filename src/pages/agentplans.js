import { useCallback, useMemo, useState, useEffect} from 'react'
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Card, Container, Stack, SvgIcon, Typography, CardHeader, Avatar, IconButton } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AgentplansTable } from 'src/sections/agentplan/agentplans-table';
import { AgentplansSearch } from 'src/sections/agentplan/agentplans-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { AgentplanAddForm } from 'src/sections/agentplan/agentplan-add-form';
import useSearch from 'src/hooks/use-search';
import TableLoader from 'src/components/table-loader';

const Page = () => {

  const [data, setData] = useState([]);
  const apiUrl = '/api/agentplans';
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

  const useAgentplans = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(searchResults, page, rowsPerPage);
      },
      [page, rowsPerPage, searchTerm, searchResults, data]
    );
  };

  const useAgentplanIds = (agentplans) => {
    return useMemo(
      () => {
        return agentplans.map((agentplan) => agentplan.id);
      },
      [agentplans]
    );
  };

  const [page, setPage] = useState(0);
  const [displayForm, setDisplayForm] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [agentplanToEdit, setAgentplanToEdit] = useState();
  const agentplans = useAgentplans(page, rowsPerPage);
  const agentplansIds = useAgentplanIds(agentplans);
  const agentplansSelection = useSelection(agentplansIds);

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
      setAgentplanToEdit();
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Agentplans | beInsured
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
                  Agentplans
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
              <AgentplanAddForm
                data={data}
                setData={setData}
                apiUrl={apiUrl}
                agentplanToEdit={agentplanToEdit}
                setAgentplanToEdit={setAgentplanToEdit}
                setDisplayForm={setDisplayForm}
              />}
            <AgentplansSearch
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
            {loading ?
              (<TableLoader/>)
              :(<AgentplansTable
                count={searchResults.length}
                items={agentplans}
                onDeselectAll={agentplansSelection.handleDeselectAll}
                onDeselectOne={agentplansSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={agentplansSelection.handleSelectAll}
                onSelectOne={agentplansSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={agentplansSelection.selected}
                searchResults={searchResults}
                data={data}
                setData={setData}
                apiUrl={apiUrl}
                agentplanToEdit={agentplanToEdit}
                setAgentplanToEdit={setAgentplanToEdit}
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
