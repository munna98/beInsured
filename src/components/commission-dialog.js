import React, { useState } from 'react';
import {
  Button, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl, 
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const CommissionDialog = ({ open, onClose, onSave }) => {
  const [agent, setAgent] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [commission, setCommission] = useState('');

  const handleSave = () => {
    // Validate and process the data
    if (agent && vehicle && commission) {
      // Call the onSave function with the selected data
      onSave({
        agent,
        vehicle,
        commission,
      });

      // Reset the state
      setAgent('');
      setVehicle('');
      setCommission('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Commission</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the details for the commission.
        </DialogContentText>
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
            <MenuItem value="agent1">Agent 1</MenuItem>
            <MenuItem value="agent2">Agent 2</MenuItem>
            {/* Add more agents as needed */}
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
            <MenuItem value="vehicle1">Vehicle 1</MenuItem>
            <MenuItem value="vehicle2">Vehicle 2</MenuItem>
            {/* Add more vehicles as needed */}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Commission"
          type="number"
          value={commission}
          onChange={(e) => setCommission(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
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
