import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearAlert } from '../../features/alert/alertSlice';
import { Alert, Snackbar } from '@mui/material';

const AlertComponent = () => {
  const dispatch = useDispatch();
  const { message, type, open } = useSelector(state => state.alert);

  const handleClose = () => {
    dispatch(clearAlert());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={type || 'info'} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent; 