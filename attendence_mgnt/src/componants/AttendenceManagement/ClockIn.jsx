import React, { useState } from 'react';
import { useAuth } from '../Login/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper, Container } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ClockIn() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [clockInStatus, setClockInStatus] = useState('');
  const userID = localStorage.getItem('userID');

  const handleClockIn = async () => {
    try {
      if (!userID) {
        setClockInStatus('User ID is missing. Please log in.');
        return;
      }

      const clockInResponse = await axios.post(`https://localhost:7081/api/Attendance/clockin/${userID}`, {});

      const { status, message } = clockInResponse.data;

      console.log('Clock-in response:', clockInResponse);

      setClockInStatus(`${status}: ${message}`);

      // Show success notification when clocked in
      toast.success('You have successfully clocked in!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    } catch (error) {
      console.error('Clock-in error:', error);

      if (error.response) {
        console.log('Error response:', error.response.data);
      }

      setClockInStatus('Error during clock-in');

      // Show error notification when clock-in fails
      toast.error('Error during clock-in. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
        {userID ? (
          <>
          <Typography variant="h5" gutterBottom>
          You want to clock in?
          </Typography>
            <Button variant="contained" color="primary" onClick={handleClockIn} fullWidth>
              Yes
            </Button>
          </>
        ) : (
          <Typography color="error" paragraph>
            Please log in to clock out.
          </Typography>
        )}
      </Paper>
      <ToastContainer />
    </Container>
  );
}

export default ClockIn;
