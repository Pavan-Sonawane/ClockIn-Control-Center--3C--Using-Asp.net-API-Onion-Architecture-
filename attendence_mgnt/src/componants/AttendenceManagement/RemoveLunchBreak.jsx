
import React, { useState } from 'react';
import { useAuth } from '../Login/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper, Container } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RemoveLunchBreak() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [clockInStatus, setClockInStatus] = useState('');
  const userID = localStorage.getItem('userID');

  const handleEndBreak = async () => {
    try {
      if (!userID) {
        setClockInStatus('User ID is missing. Please log in.');
        return;
      }

      const endBreakResponse = await axios.post(`https://localhost:7081/api/Attendance/endbreak/${userID}`, {});

      const { status, message } = endBreakResponse.data;

      console.log('End break response:', endBreakResponse);

      setClockInStatus(`${status}: ${message}`);

      
      toast.success('You have successfully ended your break!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('End break error:', error);

      if (error.response) {
        console.log('Error response:', error.response.data);
      }

      setClockInStatus('Error during ending the break');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
        {userID ? (
          <>
          <Typography variant="h5" gutterBottom>
          You want to End Break?
          </Typography>
            <Button variant="contained" color="primary" onClick={handleEndBreak} fullWidth>
              Yes....!
            </Button>
          </>
        ) : (
          <Typography color="error" paragraph>
            Please log in to end the break.
          </Typography>
        )}
      </Paper>
      <ToastContainer />
    </Container>
  );
}

export default RemoveLunchBreak;
