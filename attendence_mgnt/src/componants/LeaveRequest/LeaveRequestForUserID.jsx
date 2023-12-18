import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

function LeaveRequestForUserID() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userID = localStorage.getItem('userID');

    if (!userID) {
      setError('User ID is missing. Please log in.');
      return;
    }

    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(`https://localhost:7081/api/LeaveRequest/${userID}`);
        setLeaveRequests(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        setError('Error during fetching leave requests');
      }
    };

    fetchLeaveRequests();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#ffd700'; // yellow
      case 'approved':
        return '#00cc00'; // green
      case 'rejected':
        return '#ff0000'; // red
      default:
        return '#ffffff'; // white
    }
  };

  return (
    <div>
      <h2>My Leaves</h2>
      {leaveRequests.length > 0 ? (
        <Paper elevation={3} style={{ margin: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={tableHeaderStyle}>Leave Type</TableCell>
                <TableCell style={tableHeaderStyle}>Description</TableCell>
                <TableCell style={tableHeaderStyle}>Start Date</TableCell>
                <TableCell style={tableHeaderStyle}>End Date</TableCell>
                <TableCell style={tableHeaderStyle}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveRequests.map((leaveRequest) => (
                <TableRow key={leaveRequest.leaveID}>
                  <TableCell style={tableCellStyle}>{leaveRequest.leaveType}</TableCell>
                  <TableCell style={tableCellStyle}>{leaveRequest.description}</TableCell>
                  <TableCell style={tableCellStyle}>{new Date(leaveRequest.startDate).toLocaleString()}</TableCell>
                  <TableCell style={tableCellStyle}>{new Date(leaveRequest.endDate).toLocaleString()}</TableCell>
                  <TableCell style={{ ...tableCellStyle, backgroundColor: getStatusColor(leaveRequest.status) }}>
                    {leaveRequest.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <p>No leave requests available.</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

// Styles
const tableHeaderStyle = {
  backgroundColor: '#3498db',
  color: 'white',
  fontWeight: 'bold',
};

const tableCellStyle = {
  textAlign: 'left',
  padding: '8px',
};

export default LeaveRequestForUserID;
