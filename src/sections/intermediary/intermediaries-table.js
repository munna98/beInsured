import EllipsisHorizontalIcon from '@heroicons/react/24/solid/EllipsisHorizontalIcon';
import { SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useEffect } from 'react';

export const IntermediariesTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    searchResults = []
  } = props;

  console.log(items.length, 'i length')

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {

                // items.length == 0 ?
                //   <Typography align="center"
                //   sx={{ mb: 12 }}
                //   variant="h6">
                //     No items found 
                //   </Typography>:


                // <img
                //   src="/assets/errors/search-not-found.png"
                //   alt="search-not-found"
                //   style={{
                //     display: 'flex',
                //     alignItems:'center',
                //     justifyContent:'center',
                //     width: 200
                //   }}></img> :

                items.map((Intermediary) => {
                  const isSelected = selected.includes(Intermediary.id);
                  // const createdAt = format(Intermediary.createdAt, 'dd/MM/yyyy');

                  return (
                    <TableRow
                      hover
                      key={Intermediary.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(Intermediary.id);
                            } else {
                              onDeselectOne?.(Intermediary.id);
                            }
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Stack
                          alignItems="center"
                          direction="coloumn"
                          spacing={2}
                        >
                          <Typography variant="subtitle2">
                            {Intermediary.name}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell >
                       <SvgIcon  fontSize="small" >
                          <EllipsisHorizontalIcon />
                        </SvgIcon>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

IntermediariesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  searchResults: PropTypes.array,
};