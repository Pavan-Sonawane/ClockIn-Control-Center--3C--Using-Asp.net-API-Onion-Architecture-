
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLeave } from '../../actions/LeaveRequestAction';
import {
  Button,
  Card,
  CardContent,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddLeaveRequestComponent = () => {
  const dispatch = useDispatch();

  const [leaveData, setLeaveData] = useState({
    leaveID: 0,
    userID: '',
    leaveType: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Pending',
  });

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    setLeaveData((prevData) => ({
      ...prevData,
      userID: userID || '',
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      leaveData.leaveType.trim() !== '' &&
      leaveData.description.trim() !== '' &&
      leaveData.startDate.trim() !== '' &&
      leaveData.endDate.trim() !== ''
    );
  };

  const handleAddLeave = () => {
    if (isFormValid()) {
      dispatch(addLeave(leaveData));
      setLeaveData({
        leaveID: 0,
        userID: '',
        leaveType: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'Pending',
      });

      // Display a success notification
      toast.success('Leave applied successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      // Display an error message or use react-toastify for errors
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ToastContainer />
      <Card style={{ width: '400px', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', textAlign: 'center' }}>
            Add Leave Request
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel htmlFor="leaveType">Leave Type:</InputLabel>
                <Select
                  id="leaveType"
                  name="leaveType"
                  value={leaveData.leaveType}
                  onChange={handleInputChange}
                  fullWidth
                  required
                >
                  <MenuItem value="Casual Leave">Casual Leave (CL)</MenuItem>
                  <MenuItem value="Sick Leave">Sick Leave (SL)</MenuItem>
                  <MenuItem value="Full Day">Full Day</MenuItem>
                  <MenuItem value="Half Day">Half Day</MenuItem>
                  <MenuItem value="Early Leave">Early Leave</MenuItem>
                  <MenuItem value="Official Leave">Official Leave</MenuItem>
                  {/* Add other leave types */}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="description">Description:</InputLabel>
                <TextField
                  id="description"
                  name="description"
                  value={leaveData.description}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="startDate">Start Date:</InputLabel>
                <TextField
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  value={leaveData.startDate}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="endDate">End Date:</InputLabel>
                <TextField
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  value={leaveData.endDate}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddLeave}
              style={{ marginTop: '20px' }}
              startIcon={<DateRangeIcon />}
            >
              Add Leave
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddLeaveRequestComponent;
