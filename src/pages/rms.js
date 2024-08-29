import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Card, Container, Stack, SvgIcon, Typography, CardHeader, Avatar, IconButton } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { RmsTable } from 'src/sections/rm/rms-table';
import { RmsSearch } from 'src/sections/rm/rms-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { RmAddForm } from 'src/sections/rm/rm-add-form';
import useSearch from 'src/hooks/use-search';
import TableLoader from 'src/components/table-loader';
import { RmsCardList } from 'src/sections/rm/rm-card-list';


const Page = () => {

  const [data, setData] = useState([]);
  const apiUrl = '/api/rms';
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
  const useRms = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(searchResults, page, rowsPerPage);
      },
      [page, rowsPerPage, searchTerm, searchResults, data]
    );
  };

  const useRmIds = (rms) => {
    return useMemo(
      () => {
        return rms.map((rm) => rm.id);
      },
      [rms]
    );
  };

  const [page, setPage] = useState(0);
  const [displayForm, setDisplayForm] = useState(false);
  const [rmToEdit, setRmToEdit] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rms = useRms(page, rowsPerPage);
  const rmsIds = useRmIds(rms);
  const rmsSelection = useSelection(rmsIds);

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
      setRmToEdit();
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Rms | beInsured
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
                  Rms
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
            {displayForm &&
              <RmAddForm
                data={data}
                setData={setData}
                apiUrl={apiUrl}
                rmToEdit={rmToEdit}
                setRmToEdit={setRmToEdit}
                setDisplayForm={setDisplayForm}
              />}
            <RmsSearch
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
            {loading ?
              (<TableLoader />)
              : (<RmsTable
                count={searchResults.length}
                items={rms}
                onDeselectAll={rmsSelection.handleDeselectAll}
                onDeselectOne={rmsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={rmsSelection.handleSelectAll}
                onSelectOne={rmsSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={rmsSelection.selected}
                searchResults={searchResults}
                data={data}
                setData={setData}
                apiUrl={apiUrl}
                rmToEdit={rmToEdit}
                setRmToEdit={setRmToEdit}
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
