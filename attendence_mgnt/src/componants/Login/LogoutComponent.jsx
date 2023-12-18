import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Paper, Container } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogoutComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user-related data, e.g., from localStorage
    localStorage.removeItem('userID');
  
    // Show a logout success notification
    toast.success('You have successfully logged out!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  
    
    setTimeout(() => {
     
      navigate('/');
    }, 1000); 
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h5" gutterBottom>
        You want to Logout...?
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLogout} fullWidth>
          Logout
        </Button>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default LogoutComponent;
