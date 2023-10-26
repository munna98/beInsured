import { useCallback, useMemo, useState, useContext } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Card, Container, Stack, SvgIcon, Typography, CardHeader, Avatar, IconButton } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { IntermediariesTable } from 'src/sections/intermediary/intermediaries-table';
import { IntermediariesSearch } from 'src/sections/intermediary/intermediaries-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { IntermediaryAddForm } from 'src/sections/intermediary/intermediary-add-form';
import { DataContext } from 'src/contexts/data-context';
import { items } from 'src/layouts/dashboard/config';
import useSearch from 'src/hooks/use-search';

const Page = () => {
  const { intermediaryData, setIntermediaryData } = useContext(DataContext)
  const data = intermediaryData;
  const setData =setIntermediaryData;

  const { searchTerm, searchResults, handleSearchChange } = useSearch(data);
 

  const useIntermediaries = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(searchResults, page, rowsPerPage);
      },
      [page, rowsPerPage,searchTerm]
    );
  };

  const useIntermediaryIds = (intermediaries) => {
    return useMemo(
      () => {
        return intermediaries.map((intermediary) => intermediary.id);
      },
      [intermediaries]
    );
  };


  const now = new Date();
  const [page, setPage] = useState(0);
  const [addIntermediary, setAddIntermediary] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const intermediaries = useIntermediaries(page, rowsPerPage);
  const intermediariesIds = useIntermediaryIds(intermediaries);
  const intermediariesSelection = useSelection(intermediariesIds);

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
          Intermediaries | beInsured
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
                  Intermediaries
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
                  onClick={() => setAddIntermediary((prev) => !prev)}
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
            {addIntermediary && 
            <IntermediaryAddForm
              data={data}
              setData={setData}
            />}
            <IntermediariesSearch 
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
             />
            <IntermediariesTable
              count={searchResults.length}
              items={intermediaries}
              onDeselectAll={intermediariesSelection.handleDeselectAll}
              onDeselectOne={intermediariesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={intermediariesSelection.handleSelectAll}
              onSelectOne={intermediariesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={intermediariesSelection.selected}
              searchResults={searchResults}
              data={data}
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
