import { useCallback, useMemo, useState, useEffect} from 'react'
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Card, Container, Stack, SvgIcon, Typography, CardHeader, Avatar, IconButton } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OurplansTable } from 'src/sections/ourplan/ourplans-table';
import { OurplansSearch } from 'src/sections/ourplan/ourplans-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { OurplanAddForm } from 'src/sections/ourplan/ourplan-add-form';
import useSearch from 'src/hooks/use-search';
import TableLoader from 'src/components/table-loader';

const Page = () => {

  const [data, setData] = useState([]);
  const apiUrl = '/api/ourplans';
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

  const useOurplans = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(searchResults, page, rowsPerPage);
      },
      [page, rowsPerPage, searchTerm, searchResults, data]
    );
  };

  const useOurplanIds = (ourplans) => {
    return useMemo(
      () => {
        return ourplans.map((ourplan) => ourplan.id);
      },
      [ourplans]
    );
  };

  const [page, setPage] = useState(0);
  const [displayForm, setDisplayForm] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [ourplanToEdit, setOurplanToEdit] = useState();
  const ourplans = useOurplans(page, rowsPerPage);
  const ourplansIds = useOurplanIds(ourplans);
  const ourplansSelection = useSelection(ourplansIds);

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
      setOurplanToEdit();
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Ourplans | beInsured
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
                  Ourplans
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
              <OurplanAddForm
                data={data}
                setData={setData}
                apiUrl={apiUrl}
                ourplanToEdit={ourplanToEdit}
                setOurplanToEdit={setOurplanToEdit}
                setDisplayForm={setDisplayForm}
              />}
            <OurplansSearch
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
            {loading ?
              (<TableLoader/>)
              :(<OurplansTable
                count={searchResults.length}
                items={ourplans}
                onDeselectAll={ourplansSelection.handleDeselectAll}
                onDeselectOne={ourplansSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={ourplansSelection.handleSelectAll}
                onSelectOne={ourplansSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={ourplansSelection.selected}
                searchResults={searchResults}
                data={data}
                setData={setData}
                apiUrl={apiUrl}
                ourplanToEdit={ourplanToEdit}
                setOurplanToEdit={setOurplanToEdit}
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
