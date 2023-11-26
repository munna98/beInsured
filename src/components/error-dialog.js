import React from 'react';
import ExclamationCircleIcon from '@heroicons/react/24/solid/ExclamationCircleIcon';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  SvgIcon,
} from '@mui/material';

const ErrorDialog = ({ open, onClose, errorMessage }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle color="error" display={'flex'} alignItems={'center'}>
        <SvgIcon>
          <ExclamationCircleIcon />
        </SvgIcon>
        Error
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{errorMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='contained' color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ErrorDialog;
