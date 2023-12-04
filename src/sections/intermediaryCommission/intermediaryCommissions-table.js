import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import { SvgIcon, Tooltip, } from '@mui/material';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useState } from 'react';
import DeleteDialog from 'src/components/delete-dialog';

export const IntermediaryCommissionsTable = (props) => {
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
    setData,
    apiUrl = '',
    intermediaryCommissionToEdit = {},
    setIntermediaryCommissionToEdit,
    setDisplayForm,
  } = props;


  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);


  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setdeleteId] = useState();

  const handleClickDeleteOpen = (Id) => {
    setDeleteDialogOpen(true);
    setdeleteId(Id);
  };

  const handleClose = () => {
    setDeleteDialogOpen(false);
  };

  const fetchIntermediaryCommission = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    setData(data)
  }

  const handleEdit = (intermediaryCommissionId) => {
    setDisplayForm(prev => true)
    const intermediaryCommission = items.find(intermediaryCommission => intermediaryCommission._id === intermediaryCommissionId);
    setIntermediaryCommissionToEdit(intermediaryCommission);
  }


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
                  Agent
                </TableCell>
                <TableCell>
                  Vehicle
                </TableCell>
                <TableCell>
                  Commission
                </TableCell>
                <TableCell>
                  Company
                </TableCell>
                <TableCell>
                  Intermediary
                </TableCell>
                <TableCell>
                  Type
                </TableCell>
                <TableCell>
                  Tds
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((intermediaryCommission) => {
                const isSelected = selected.includes(intermediaryCommission.id);
                const createdAt =new Date(intermediaryCommission.createdAt);
                return (
                  <TableRow
                    hover
                    key={intermediaryCommission.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(intermediaryCommission.id);
                          } else {
                            onDeselectOne?.(intermediaryCommission.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {intermediaryCommission.agent}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {intermediaryCommission.vehicle}
                    </TableCell>
                    <TableCell>
                      {intermediaryCommission.commission}
                    </TableCell>
                    <TableCell>
                      {intermediaryCommission.company}
                    </TableCell>                    
                    <TableCell>
                      {intermediaryCommission.intermediary}
                    </TableCell>                    
                    <TableCell>
                      {intermediaryCommission.type}
                    </TableCell>                    
                    <TableCell>
                      {intermediaryCommission.tds}
                    </TableCell>                    
                    {/* <TableCell>
                      {format(createdAt, 'dd-MM-yyyy')}
                    </TableCell> */}
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <IconButton>
                          <Tooltip title="Edit">
                            <SvgIcon fontSize="small"
                              cursor="pointer"
                              color="neutral"
                              aria-label="edit"
                              onClick={() => handleEdit(intermediaryCommission._id)} // You should define the handleDelete function
                            > 
                              <PencilIcon />
                            </SvgIcon>
                          </Tooltip>
                        </IconButton>
                        <IconButton>
                          <Tooltip title="Delete">
                            <SvgIcon fontSize="small"
                              cursor="pointer"
                              color="neutral"
                              aria-label="delete"
                              onClick={() => handleClickDeleteOpen(intermediaryCommission._id)}
                            >
                              <TrashIcon />
                            </SvgIcon>
                          </Tooltip>
                        </IconButton>
                      </Stack>
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

      <DeleteDialog
        open={deleteDialogOpen}
        handleClose={handleClose}
        deleteId={deleteId}
        apiUrl={apiUrl}
        fetchData={fetchIntermediaryCommission}
      />
    </Card>
  );
};

IntermediaryCommissionsTable.propTypes = {
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
