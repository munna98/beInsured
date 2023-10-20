import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Card, Container, Stack, SvgIcon, Typography, CardHeader, Avatar, IconButton } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompaniesTable } from 'src/sections/company/companies-table';
import { CompaniesSearch } from 'src/sections/company/companies-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { CompanyAddForm } from 'src/sections/company/company-add-form';

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    name: 'BIG',
  },
  {
    id: '5e887ac47eed253091be10cb',
    name: 'JSK',
  },
  
];

const useCompanies = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCompanyIds = (companies) => {
  return useMemo(
    () => {
      return companies.map((company) => company.id);
    },
    [companies]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [addCompany, setAddCompany] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const companies = useCompanies(page, rowsPerPage);
  const companiesIds = useCompanyIds(companies);
  const companiesSelection = useSelection(companiesIds);

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
          Companies | beInsured
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
                  Companies
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
                  onClick={()=>setAddCompany((prev)=>!prev)}
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
            {addCompany&& <CompanyAddForm />}
            <CompaniesSearch />
            <CompaniesTable
              count={data.length}
              items={companies}
              onDeselectAll={companiesSelection.handleDeselectAll}
              onDeselectOne={companiesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={companiesSelection.handleSelectAll}
              onSelectOne={companiesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={companiesSelection.selected}
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
