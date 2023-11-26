import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const CommissionDialog = ({ open, onClose, onSave }) => {
  const [agent, setAgent] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [commission, setCommission] = useState('');
  const [company, setCompany] = useState('');
  const [intermediary, setIntermediary] = useState('');
  const [type, setType] = useState('');
  const [tds, setTDS] = useState('');

  const handleSave = () => {
    // Validate and process the data
    if (
      agent &&
      vehicle &&
      commission &&
      company &&
      intermediary &&
      type &&
      tds
    ) {
      // Call the onSave function with the selected data
      onSave({
        agent,
        vehicle,
        commission,
        company,
        intermediary,
        type,
        tds,
      });

      // Reset the state
      setAgent('');
      setVehicle('');
      setCommission('');
      setCompany('');
      setIntermediary('');
      setType('');
      setTDS('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Commission</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: 2 }}>
          Please enter the details for the commission.
        </DialogContentText>
        <Grid container spacing={2}>
          {/* Left section */}
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="agent-select">Agent</InputLabel>
              <Select
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
                label="Agent"
                inputProps={{
                  name: 'agent',
                  id: 'agent-select',
                }}
              >
                {/* Add agent options */}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="vehicle-select">Vehicle</InputLabel>
              <Select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                label="Vehicle"
                inputProps={{
                  name: 'vehicle',
                  id: 'vehicle-select',
                }}
              >
                {/* Add vehicle options */}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="company-select">Company</InputLabel>
              <Select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                label="Company"
                inputProps={{
                  name: 'company',
                  id: 'company-select',
                }}
              >
                {/* Add company options */}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="intermediary-select">Intermediary</InputLabel>
              <Select
                value={intermediary}
                onChange={(e) => setIntermediary(e.target.value)}
                label="Intermediary"
                inputProps={{
                  name: 'intermediary',
                  id: 'intermediary-select',
                }}
              >
                {/* Add intermediary options */}
              </Select>
            </FormControl>
          </Grid>

          {/* Right section */}
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="type-select">Type</InputLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                label="Type"
                inputProps={{
                  name: 'type',
                  id: 'type-select',
                }}
              >
                <MenuItem value="flat">Flat</MenuItem>
                <MenuItem value="percentage">Percentage</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="TDS"
              type="number"
              value={tds}
              onChange={(e) => setTDS(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Commission"
              type="number"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommissionDialog;
