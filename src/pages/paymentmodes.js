import { useCallback, useMemo, useState, useEffect} from 'react'
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Card, Container, Stack, SvgIcon, Typography, CardHeader, Avatar, IconButton } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { PaymentmodesTable } from 'src/sections/paymentmode/paymentmodes-table';
import { PaymentmodesSearch } from 'src/sections/paymentmode/paymentmodes-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { PaymentmodeAddForm } from 'src/sections/paymentmode/paymentmode-add-form';
import useSearch from 'src/hooks/use-search';
import TableLoader from 'src/components/table-loader';

const Page = () => {

  const [data, setData] = useState([]);
  const apiUrl = '/api/paymentmodes';
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

  const usePaymentmodes = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(searchResults, page, rowsPerPage);
      },
      [page, rowsPerPage, searchTerm, searchResults, data]
    );
  };

  const usePaymentmodeIds = (paymentmodes) => {
    return useMemo(
      () => {
        return paymentmodes.map((paymentmode) => paymentmode.id);
      },
      [paymentmodes]
    );
  };

  const [page, setPage] = useState(0);
  const [displayForm, setDisplayForm] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paymentmodeToEdit, setPaymentmodeToEdit] = useState();
  const paymentmodes = usePaymentmodes(page, rowsPerPage);
  const paymentmodesIds = usePaymentmodeIds(paymentmodes);
  const paymentmodesSelection = useSelection(paymentmodesIds);

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
      setPaymentmodeToEdit();
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Payment modes | beInsured
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
                  Payment modes
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
              <PaymentmodeAddForm
                data={data}
                setData={setData}
                apiUrl={apiUrl}
                paymentmodeToEdit={paymentmodeToEdit}
                setPaymentmodeToEdit={setPaymentmodeToEdit}
                setDisplayForm={setDisplayForm}
              />}
            <PaymentmodesSearch
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
            {loading ?
              (<TableLoader/>)
              :(<PaymentmodesTable
                count={searchResults.length}
                items={paymentmodes}
                onDeselectAll={paymentmodesSelection.handleDeselectAll}
                onDeselectOne={paymentmodesSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={paymentmodesSelection.handleSelectAll}
                onSelectOne={paymentmodesSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={paymentmodesSelection.selected}
                searchResults={searchResults}
                data={data}
                setData={setData}
                apiUrl={apiUrl}
                paymentmodeToEdit={paymentmodeToEdit}
                setPaymentmodeToEdit={setPaymentmodeToEdit}
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
