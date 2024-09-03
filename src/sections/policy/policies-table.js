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

export const PoliciesTable = (props) => {
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
    policyToEdit = {},
    setPolicyToEdit,
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




  const fetchPolicy = async () => {
    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error('Error fetching policy:', error);
    }
  }

  const handleEdit = (policyId) => {
    setDisplayForm(prev => true)
    const policy = items.find(policy => policy._id === policyId);
    setPolicyToEdit(policy);
  }

  return ( 
    <Card style={{ overflowX: 'auto' }}>
      <Scrollbar>
        <Box sx={{ minWidth: 3400 }}>
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
                  Issue Date
                </TableCell>
                <TableCell>
                  Customer Name
                </TableCell>
                <TableCell>
                  Policy Type
                </TableCell>
                <TableCell>
                  Vehicle No
                </TableCell>
                <TableCell>
                  Premium
                </TableCell>
                <TableCell>
                  Third Party
                </TableCell>
                <TableCell>
                  OD Amount
                </TableCell>
                <TableCell>
                  Net Amount
                </TableCell>
                <TableCell>
                  Company
                </TableCell>
                <TableCell>
                  Intermediary
                </TableCell>
                <TableCell>
                  Vehicle Type
                </TableCell>
                <TableCell>
                  Commission
                </TableCell>
                <TableCell>
                  Agent Name
                </TableCell>
                <TableCell>
                  Our Plan
                </TableCell>
                <TableCell>
                  Agent Plan
                </TableCell>
                <TableCell>
                  Policy No
                </TableCell>
                {/* <TableCell>
                  Payment Mode
                </TableCell> */}
                <TableCell>
                  Payment By
                </TableCell>
                <TableCell>
                  Cap Reached
                </TableCell>
                <TableCell>
                  Amount Recieved
                </TableCell>
                <TableCell>
                  Actions
                </TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((policy) => {
                const isSelected = selected.includes(policy.id);
                const date = new Date(policy.date)
                console.log('polisee',policy);

                return (
                  <TableRow
                    hover
                    key={policy.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(policy.id);
                          } else {
                            onDeselectOne?.(policy.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {format(date, 'dd-MM-yyyy')}
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {policy.customerName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {policy.policyType.name}
                    </TableCell>
                    <TableCell>
                      {policy.vehicleNumber}
                    </TableCell>
                    <TableCell>
                      {policy.premium}
                    </TableCell>
                    <TableCell>
                      {policy.thirdParty}
                    </TableCell>
                    <TableCell>
                      {policy.ownDamage}
                    </TableCell>
                    <TableCell>
                      {policy.net || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {policy.company.name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {policy.intermediary.name}
                    </TableCell>
                    <TableCell>
                      {policy.vehicleType.name}
                    </TableCell>
                    <TableCell>
                      {policy.commission}
                    </TableCell>
                    <TableCell>
                      {policy.agentName.firstName || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {policy.ourPlan.name}
                    </TableCell>
                    <TableCell>
                      {policy.agentPlan.name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {policy.policyNumber}
                    </TableCell>
                    <TableCell>
                      {policy.paymentBy.name}
                    </TableCell>
                    <TableCell>
                      {policy.capReached}
                    </TableCell>
                    <TableCell>
                      {policy.amountRecieved }
                    </TableCell>
                      {/* <TableCell>
                        {policy.amountToBePaid }
                      </TableCell> */}
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <IconButton>
                          <Tooltip title="Edit">
                            <SvgIcon fontSize="small"
                              cursor="pointer"
                              color="neutral"
                              aria-label="edit"
                              onClick={() => handleEdit(policy._id)}
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
                              onClick={() => handleClickDeleteOpen(policy._id)}
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
        fetchData={fetchPolicy}
      />
    </Card>
  );
};

PoliciesTable.propTypes = {
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

