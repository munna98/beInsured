import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

const ErrorDialog = ({ open, handleClose, errorMessage }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {errorMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {/* <Button onClick={handleClose} autoFocus>
                    Okay
                </Button> */}
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorDialog;
