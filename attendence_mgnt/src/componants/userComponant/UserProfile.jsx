import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material'; 

const LeaveRequestTable = ({ leaveRequests }) => (
  <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
    <Table>
      <TableHead>
        <TableRow style={{ background: '#3f51b5', color: '#fff' }}>
          <TableCell>Type</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Start Date</TableCell>
          <TableCell>End Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {leaveRequests.map((leave) => (
          <TableRow key={leave.leaveID}>
            <TableCell>{leave.leaveType}</TableCell>
            <TableCell>{leave.description}</TableCell>
            <TableCell>{leave.status}</TableCell>
            <TableCell>{new Date(leave.startDate).toLocaleString()}</TableCell>
            <TableCell>{new Date(leave.endDate).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const AttendanceTable = ({ attendanceDetails }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow style={{ background: '#4caf50', color: '#fff' }}>
          <TableCell>Clock In</TableCell>
          <TableCell>Clock Out</TableCell>
          <TableCell>Actual Hours</TableCell>
          <TableCell>Productive Hours</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {attendanceDetails.map((attendance) => (
          <TableRow key={attendance.attendanceID}>
            <TableCell>{new Date(attendance.clockInDateTime).toLocaleString()}</TableCell>
            <TableCell>
              {attendance.clockOutDateTime ? new Date(attendance.clockOutDateTime).toLocaleString() : 'N/A'}
            </TableCell>
            <TableCell>{attendance.actualHours}</TableCell>
            <TableCell>{attendance.productiveHours}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
   
    const userID = localStorage.getItem('userID');

    // Check if the user ID is available
    if (userID) {
    
      fetch(`https://localhost:7081/api/Users/${userID}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error('Error fetching user data:', error));
    } else {
      console.error('User ID not found in localStorage');
    }
  }, []); 
  return (
    <div>
      {userData ? (
        <div>
          <Typography variant="h4" gutterBottom>
            {userData.user.username}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Email: {userData.user.email}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Leave Requests
          </Typography>
          <LeaveRequestTable leaveRequests={userData.leaveRequests} />

          <Typography variant="h6" gutterBottom>
            Attendance Details
          </Typography>
          <AttendanceTable attendanceDetails={userData.attendanceDetails} />
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default UserProfile;
