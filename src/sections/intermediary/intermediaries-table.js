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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useState } from 'react';

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
    searchResults = [],
    setData,
    apiUrl=''
  } = props;



  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

//Dialog setting up

  const [open, setOpen] = useState(false);
  const [deleteId, setdeleteId] = useState();

  const handleClickOpen = (Id) => {
    setOpen(true);
    setdeleteId(Id);
  };

  const handleClose = () => {
    setOpen(false);
  };




  const fetchIntermediary = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    setData(data)
  }

  const handleDelete = async (intermediaryId) => {
    handleClose();
    try {
      const response = await fetch(`${apiUrl}/${intermediaryId}`, {
        method: 'DELETE',
      });
  
      if (response.status === 204) {
        // Successful deletion (No Content status), no need to parse the response.
        // Update the client-side data and fetch updated data.
        fetchIntermediary();
      } else {
        console.error('Failed to delete intermediary. Status code:', response.status);
      }
    } catch (error) {
      console.error('Error deleting intermediary:', error);
    }
  };

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
              {items.map((Intermediary) => {
                const isSelected = selected.includes(Intermediary.id);

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
                        alignItems="left"
                        direction="column"
                        spacing={2}
                      >
                        <Typography variant="subtitle2">
                          {Intermediary.name}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <IconButton>
                          <Tooltip title="Edit">
                            <SvgIcon fontSize="small"
                              cursor="pointer"
                              color="neutral"
                              aria-label="edit"
                              onClick={() => handleEdit(Intermediary.id, 'edit')} // You should define the handleDelete function
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
                              // onClick={() => handleDelete(Intermediary.id)} // You should define the handleDelete function
                            
                              onClick={()=>handleClickOpen(Intermediary.id)}
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

      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Item"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained"
          onClick={() => handleDelete(deleteId)} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
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
