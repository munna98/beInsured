import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Card, Container, Stack, SvgIcon, Typography, CardHeader, Avatar, IconButton } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { IntermidiariesTable } from 'src/sections/Intermidiary/intermediaries-table';
import { IntermediariesSearch } from 'src/sections/Intermidiary/intermediaries-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { IntermidiaryAddForm } from 'src/sections/Intermidiary/Intermidiary-add-form';

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    name: 'BIG',
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    name: 'JSK',
  }
];

const useIntermidiaries = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useIntermidiariesIds = (intermediaries) => {
  return useMemo(
    () => {
      return intermediaries.map((Intermidiary) => Intermidiary.id);
    },
    [intermediaries]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [addIntermidiary, setAddIntermidiary] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const intermediaries = useIntermidiaries(page, rowsPerPage);
  const IntermidiariesIds = useIntermidiariesIds(intermediaries);
  const IntermidiariesSelection = useSelection(IntermidiariesIds);

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
                  onClick={()=>setAddIntermidiary((prev)=>!prev)}
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
            {addIntermidiary&& <IntermidiaryAddForm />}
            <IntermediariesSearch />
            <IntermidiariesTable
              count={data.length}
              items={intermediaries}
              onDeselectAll={IntermidiariesSelection.handleDeselectAll}
              onDeselectOne={IntermidiariesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={IntermidiariesSelection.handleSelectAll}
              onSelectOne={IntermidiariesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={IntermidiariesSelection.selected}
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
