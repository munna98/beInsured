import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import { SvgIcon, Tooltip, } from '@mui/material';
import PropTypes from 'prop-types';

import { useContext } from "react";
import { DataContext } from 'src/contexts/data-context';
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

export const AgentCommissionsTable = (props) => {
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
    agentCommissionToEdit = {},
    setAgentCommissionToEdit,
    setDisplayForm,
  } = props;

  const { intermediaryData, agentData, companyData,vehicleData
    , ourplanData, agentplanData, policyTypeData, paymentModeData } = useContext(DataContext);

  
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

  const fetchAgentCommission = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    setData(data)
  }

  const handleEdit = (agentCommissionId) => {
    setDisplayForm(prev => true)
    const agentCommission = items.find(agentCommission => agentCommission._id === agentCommissionId);
    setAgentCommissionToEdit(agentCommission);
    console.log(agentCommission,"agent commission to edit");
  }

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 1100 }}>
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
                  Company
                </TableCell>
                <TableCell>
                  Intermediary
                </TableCell>
                <TableCell>
                  Type
                </TableCell>
                <TableCell>
                  Policy type
                </TableCell>
                <TableCell>
                  Agent plan
                </TableCell>
                <TableCell>
                  Commission
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
              {items.map((agentCommission) => {
                const isSelected = selected.includes(agentCommission.id);
                const createdAt =new Date(agentCommission.createdAt);
                console.log(agentCommission);
                // const agent = agentData.find(agent=> agent._id === agentCommission.agent);
                // const vehicle = vehicleData.find(vehicle=> vehicle._id === agentCommission.vehicle);
                // const company = companyData.find(company=> company._id === agentCommission.company);
                // const intermediary = intermediaryData.find(intermediary=> intermediary._id === agentCommission.intermediary);
                // const policyType = policyTypeData.find(policyType=> policyType._id === agentCommission.policyType);
                // const agentPlan = agentplanData.find(agentPlan=> agentPlan._id === agentCommission.agentPlan);      
                
                return (
                  <TableRow
                    hover
                    key={agentCommission.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(agentCommission.id);
                          } else {
                            onDeselectOne?.(agentCommission.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell> 
                      <Typography variant="subtitle2">
                        {agentCommission.agent.firstName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {agentCommission.vehicle.name}
                    </TableCell>
                    <TableCell>
                      {agentCommission.company.name}
                    </TableCell>                    
                    <TableCell>
                      {agentCommission.intermediary.name}
                    </TableCell>                    
                    <TableCell>
                      {agentCommission.type}
                    </TableCell>    
                    <TableCell>
                      {agentCommission.policyType.name}
                    </TableCell>    
                    <TableCell>
                      {agentCommission.agentPlan.name}
                    </TableCell>    
                    <TableCell>
                      {agentCommission.commission}
                    </TableCell>                
                    <TableCell>
                      {agentCommission.tds}
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
                              onClick={() => handleEdit(agentCommission._id)} // You should define the handleDelete function
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
                              onClick={() => handleClickDeleteOpen(agentCommission._id)}
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
        fetchData={fetchAgentCommission}
      />
    </Card>
  ); 
};

AgentCommissionsTable.propTypes = {
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
