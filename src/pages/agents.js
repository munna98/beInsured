import { useCallback, useMemo, useState,useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Card, Container, Stack, SvgIcon, Typography, CardHeader, Avatar, IconButton } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AgentsTable } from 'src/sections/agent/agents-table';
import { AgentsSearch } from 'src/sections/agent/agents-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { AgentAddForm } from 'src/sections/agent/agent-add-form';
import useSearch from 'src/hooks/use-search';
import TableLoader from 'src/components/table-loader';

const Page = () => {

  const [data, setData] = useState([]);
  const apiUrl = '/api/agents';
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

const useAgents = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useAgentIds = (agents) => {
  return useMemo(
    () => {
      return agents.map((agent) => agent.id);
    },
    [agents]
  );
};

  const [page, setPage] = useState(0);
  const [displayForm, setDisplayForm] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const agents = useAgents(page, rowsPerPage);
  const agentsIds = useAgentIds(agents);
  const agentsSelection = useSelection(agentsIds);

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
      setAgentToEdit();
    },
    []
  );


  return (
    <>
    <Head>
      <title>
        Agents | beInsured
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
                Agents
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
            <AgentAddForm
              data={data}
              setData={setData}
              apiUrl={apiUrl}
              agentToEdit={agentToEdit}
              setAgentToEdit={setAgentToEdit}
              setDisplayForm={setDisplayForm}
            />}
          <AgentsSearch
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
          />
          {loading ?
            (<TableLoader/>)
            :(<AgentsTable
              count={searchResults.length}
              items={agents}
              onDeselectAll={agentsSelection.handleDeselectAll}
              onDeselectOne={agentsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={agentsSelection.handleSelectAll}
              onSelectOne={agentsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={agentsSelection.selected}
              searchResults={searchResults}
              data={data}
              setData={setData}
              apiUrl={apiUrl}
              agentToEdit={agentToEdit}
              setAgentToEdit={setAgentToEdit}
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
