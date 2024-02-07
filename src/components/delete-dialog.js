// import React from 'react';
// import {Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogContentText,
//     DialogTitle,

// } from '@mui/material';


// const DeleteDialog = ({ open, handleClose, deleteId, apiUrl, fetchData}) => {

//      const handleDelete = async (itemId) => {

//         try {
//           const response = await fetch(`${apiUrl}/${itemId}`, {
//             method: 'DELETE',
//           });
    
//           if (response.status === 204) {
//             // Successful deletion (No Content status), no need to parse the response.
//             // Update the client-side data and fetch updated data.
//             fetchData();
//           } else {
//             console.error('Failed to delete item. Status code:', response.status);
//           }
//         } catch (error) {
//           console.error('Error deleting item:', error);
//         }
//         handleClose();
//       };

//     return (

//         <Dialog
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="alert-dialog-title"
//             aria-describedby="alert-dialog-description"
//         >
//             <DialogTitle id="alert-dialog-title">
//                 {"Delete Item"}
//             </DialogTitle>
//             <DialogContent>
//                 <DialogContentText id="alert-dialog-description">
//                     Are you sure you want to delete this item?
//                 </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={handleClose}>Cancel</Button>
//                 <Button variant="contained"
//                     onClick={() => handleDelete(deleteId)} autoFocus>
//                     Okay
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     )
// }

// export default DeleteDialog;

// ******************//


// import React from 'react';
// import { useState } from 'react';
// import {
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogContentText,
//     DialogTitle,

// } from '@mui/material';


// const DeleteDialog = ({ open, handleClose, deleteId, apiUrl, fetchData}) => {

//   const [errorMessage, setErrorMessage] = useState('');

//   const handleDelete = async (itemId) => {
//       try {
//           const response = await fetch(`${apiUrl}/${itemId}`, {
//               method: 'DELETE',
//           });

//           if (response.ok) {
//               // Successful deletion (status code 200-299), no need to parse the response.
//               // Update the client-side data and fetch updated data.
//               fetchData();
//               handleClose();
//           } else {
//               // Handle deletion failure and set error message
//               const errorData = await response.json();
//               setErrorMessage(errorData.message);
//           }
//       } catch (error) {
//           console.error('Error deleting item:', error);
//           setErrorMessage('Failed to delete item. Please try again later.');
//       }
//   };

//     return (

//         <Dialog
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="alert-dialog-title"
//             aria-describedby="alert-dialog-description"
//         >
//             <DialogTitle id="alert-dialog-title">
//                 {"Delete Item"}
//             </DialogTitle>
//             <DialogContent>
//                 <DialogContentText id="alert-dialog-description">
//                     Are you sure you want to delete this item?
//                 </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={handleClose}>Cancel</Button>
//                 <Button variant="contained"
//                     onClick={() => handleDelete(deleteId)} autoFocus>
//                     Okay
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     )
// }

// export default DeleteDialog;




// import React, { useState } from 'react';
// import {
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogContentText,
//     DialogTitle,
// } from '@mui/material';
// import ErrorDialog from './error-dialog';


// const DeleteDialog = ({ open, handleClose, deleteId, apiUrl, fetchData }) => {
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleDelete = async (itemId) => {
//         try {
//             console.log('Attempting to delete item...');
//             const response = await fetch(`${apiUrl}/${itemId}`, {
//                 method: 'DELETE',
//             });

//             if (response.ok) {
//                 console.log('Item deleted successfully.');
//                 fetchData();
//                 handleClose();
//             } else {
//                 console.error('Failed to delete item. Status code:', response.status);
//                 const errorData = await response.json();
//                 setErrorMessage(errorData.message);
//             }
//         } catch (error) {
//             console.error('Error deleting item:', error);
//             setErrorMessage('Failed to delete item. Please try again later.');
//         }
//     };

//     return (
//         <>
//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <DialogTitle id="alert-dialog-title">{"Delete Item"}</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                         Are you sure you want to delete this item?
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button
//                         variant="contained"
//                         onClick={() => {
//                             console.log('Deleting item...');
//                             handleDelete(deleteId);
//                         }}
//                         autoFocus
//                     >
//                         Okay
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Display the ErrorDialog when there's an error */}
//             <ErrorDialog
//                 open={!!errorMessage} // Show the ErrorDialog only if there's an error message
//                 handleClose={() => {
//                     setErrorMessage('');
//                     handleClose();
//                 }} // Reset the error message when closing
//                 errorMessage={errorMessage}
//             />
//         </>
//     );
// };

// export default DeleteDialog;


import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';

const DeleteDialog = ({ open, handleClose, deleteId, apiUrl, fetchData }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDelete = async (itemId) => {
    try {
        const response = await fetch(`${apiUrl}/${itemId}`, {
          method: 'DELETE',
        });
  
        if (response.status === 204) {
          // Successful deletion (No Content status), update the client-side data.
          fetchData();
          setSnackbarSeverity('warning');
          setSnackbarMessage('Item successfully deleted.');
        } else {
          // Check if the response contains a JSON body with an error message
          const responseBody = await response.json();
  
          if (responseBody && responseBody.error) {
            setSnackbarSeverity('error');
            setSnackbarMessage(responseBody.error);
          } else {
            console.error('Failed to delete item. Status code:', response.status);
            setSnackbarSeverity('error');
            setSnackbarMessage('Failed to delete item. Please try again.');
          }
        }
  
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error deleting item:', error);
        setSnackbarSeverity('error');
        setSnackbarMessage('Error deleting item. Please try again.');
        setSnackbarOpen(true);
      } finally {
        handleClose();
      }
    };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Item"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => handleDelete(deleteId)}
            autoFocus
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DeleteDialog;
