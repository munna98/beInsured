import { useEffect, useState, useCallback } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
  Snackbar,
  Alert
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export const ReceiptAddForm = ({ data, setData, apiUrl, receiptToEdit, setReceiptToEdit }) => {
  const [agentData, setAgentData] = useState([]);

  const fetchReceipts = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching Receipts:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setInitialLoading(true);
      try {
        const agentsResponse = await fetch("/api/agents");
        const agents = await agentsResponse.json();
        setAgentData(agents);
        if (receiptToEdit) {
          setValues(receiptToEdit); // Populate form with existing receipt data for editing
        } else {
          setValues((prev) => ({ ...prev, agent: agents[0]?._id || "" }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchReceipts()
  }, [])
  
  

  const [values, setValues] = useState({ agent: '', date: new Date(), amount: "" });
  const [initialLoading, setInitialLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'


  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleDateChange = (date) => {
    setValues((prev) => ({ ...prev, date: date || new Date() }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    if (receiptToEdit) {
      // Handle editing by sending a PUT request
      const response = await fetch(`${apiUrl}/${receiptToEdit._id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        fetchReceipts()
        setData(updatedData);
        setReceiptToEdit(null);
        setValues({ agent: agentData[0]._id, date: new Date(), amount: '' }); // Reset form
        setSnackbarSeverity('success');
        setSnackbarMessage('Receipt updated successfully.');
      } else {
        setSnackbarSeverity('error');
        setSnackbarMessage('Error updating receipt. Please try again.');
      }
    } else {
      // Handle adding a new receipt
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        fetchReceipts()
        setValues({ agent: agentData[0]._id, date: new Date(), amount: '' }); // Reset form
        setSnackbarSeverity('success');
        setSnackbarMessage('Receipt added successfully.');
      } else {
        setSnackbarSeverity('error');
        setSnackbarMessage('Error adding receipt. Please try again.');
      }
    }
    setSnackbarOpen(true);
  }, [values, data, apiUrl, receiptToEdit, setData]);

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader={receiptToEdit ? "Edit Receipt" : "Add a new receipt"} />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <TextField
              fullWidth
              label="Agent"
              name="agent"
              onChange={handleChange}
              value={values.agent}
              select
              SelectProps={{ native: true }}
            >
              {agentData.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.firstName}
                </option>
              ))}
            </TextField>
            <DatePicker
              label="Receipt date"
              value={values.date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              onChange={handleChange}
              type="number"
              value={values.amount}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            {receiptToEdit ? "Update Receipt" : "Add Receipt"}
          </Button>
        </CardActions>
      </Card>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};
