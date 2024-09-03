import PropTypes from "prop-types";
import { format } from "date-fns";
import {
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
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { useState } from "react";

export const AgentLedgerTable = (props) => {
  const { 
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 10,
    selected = [],
    setData,
    apiUrl = "",
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 1600 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Vehicle Number</TableCell>
                <TableCell>Agent</TableCell>
                <TableCell>Premium</TableCell>
                <TableCell>Net Premium</TableCell>
                <TableCell>Recieved Amount</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell>Commission</TableCell>
                <TableCell>Payable</TableCell>
                <TableCell>Paid By</TableCell>
                <TableCell>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((policy) => {
                return (
                  <TableRow hover key={policy._id}>
                    <TableCell>{format(new Date(policy.date), "dd-MM-yyyy")}</TableCell>
                    <TableCell>{policy.policyType.name}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{policy.customerName}</Typography>
                    </TableCell>
                    <TableCell>{policy.vehicleNumber}</TableCell>
                    <TableCell>{policy.agentName.firstName}</TableCell>
                    <TableCell>{policy.premium}</TableCell>
                    <TableCell>{policy.net}</TableCell>
                    <TableCell>{policy.amountRecieved}</TableCell>
                    <TableCell>{policy.agentPlan.name}</TableCell>
                    <TableCell>{policy.commission}</TableCell>
                    <TableCell>{policy.premium-policy.commission}</TableCell>
                    <TableCell>{policy.paymentBy.name}</TableCell>
                    {/* <TableCell>{policy.premium-policy.commission-policy.amountRecieved}</TableCell> */}
                    <TableCell>{policy.amountToBePaid}</TableCell>
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

AgentLedgerTable.propTypes = {
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
