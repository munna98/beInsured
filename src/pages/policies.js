import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { PoliciesTable } from 'src/sections/policy/policies-table';
import { PoliciesSearch } from 'src/sections/policy/policies-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { PolicyAddForm } from 'src/sections/policy/policy-add-form';
import { exportToExcel } from 'src/utils/export-to-excel';
import useSearch from 'src/hooks/use-search';
import { useContext } from "react";
import { DataContext } from 'src/contexts/data-context';
import TableLoader from 'src/components/table-loader';

 
const now = new Date(); 
const Page = () => {

  const [data, setData] = useState([]);
  const apiUrl = '/api/policies';
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

  const usePolicies = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(searchResults, page, rowsPerPage);
      },
      [page, rowsPerPage, searchTerm, searchResults, data]
    );
  };

  const usePolicyIds = (policies) => {
    return useMemo(
      () => {
        return policies.map((policy) => policy.id);
      },
      [policies]
    );
  };

  const handleExport = useCallback(() => {
    // Pass the data array to the function to generate the Excel file
    exportToExcel(data, "policy_list.xlsx");
  }, [data]);


  const [page, setPage] = useState(0);
  const [displayForm, setDisplayForm] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [policyToEdit, setPolicyToEdit] = useState();
  const policies = usePolicies(page, rowsPerPage);
  const policiesIds = usePolicyIds(policies);
  const policiesSelection = useSelection(policiesIds);

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
      setPolicyToEdit();
    },
    []
  );


  return (
    <>
      <Head>
        <title>
          Policies | beInsured
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
                  Policies
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
                          <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button onClick={handleExport}
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
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
              (<PolicyAddForm
                data={data}
                setData={setData}
                apiUrl={apiUrl}
                policyToEdit={policyToEdit}
                setPolicyToEdit={setPolicyToEdit}
                setDisplayForm={setDisplayForm}
              />))}
            <PoliciesSearch
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
            {loading ?
              (<TableLoader/>)
              :(<PoliciesTable
                count={searchResults.length}
                items={policies}
                onDeselectAll={policiesSelection.handleDeselectAll}
                onDeselectOne={policiesSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={policiesSelection.handleSelectAll}
                onSelectOne={policiesSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={policiesSelection.selected}
                searchResults={searchResults}
                data={data}
                setData={setData}
                apiUrl={apiUrl}
                policyToEdit={policyToEdit}
                setPolicyToEdit={setPolicyToEdit}
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
