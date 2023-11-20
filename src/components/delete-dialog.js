import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,

} from '@mui/material';


const DeleteDialog = ({ open, handleClose, deleteId, apiUrl, fetchData}) => {

    const handleDelete = async (itemId) => {

        try {
          const response = await fetch(`${apiUrl}/${itemId}`, {
            method: 'DELETE',
          });
    
          if (response.status === 204) {
            // Successful deletion (No Content status), no need to parse the response.
            // Update the client-side data and fetch updated data.
            fetchData();
          } else {
            console.error('Failed to delete intermediary. Status code:', response.status);
          }
        } catch (error) {
          console.error('Error deleting intermediary:', error);
        }
        handleClose();
      };

    return (

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
    )
}

export default DeleteDialog;