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

export const RmsTable = (props) => {
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
    rmToEdit = {},
    setRmToEdit,
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

  const fetchRm = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    setData(data)
  }

  const handleEdit = (rmId) => {
    setDisplayForm(prev => true)
    const rm = items.find(rm => rm._id === rmId);
    setRmToEdit(rm);
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
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Created At
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((rm) => {
                const isSelected = selected.includes(rm.id);
                const createdAt =new Date(rm.createdAt);
                return (
                  <TableRow
                    hover
                    key={rm.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(rm.id);
                          } else {
                            onDeselectOne?.(rm.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {rm.firstName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {rm.email}
                    </TableCell>
                    <TableCell>
                      {rm.phone}
                    </TableCell>
                    <TableCell>
                      {rm.location}
                    </TableCell>                    
                    <TableCell>
                      {format(createdAt, 'dd-MM-yyyy')}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <IconButton>
                          <Tooltip title="Edit">
                            <SvgIcon fontSize="small"
                              cursor="pointer"
                              color="neutral"
                              aria-label="edit"
                              onClick={() => handleEdit(rm._id)} // You should define the handleDelete function
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
                              onClick={() => handleClickDeleteOpen(rm._id)}
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
        fetchData={fetchRm}
      />
    </Card>
  );
};

RmsTable.propTypes = {
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
