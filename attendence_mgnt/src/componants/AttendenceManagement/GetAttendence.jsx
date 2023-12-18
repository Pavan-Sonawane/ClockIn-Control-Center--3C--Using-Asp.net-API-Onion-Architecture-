import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const tableStyle = {
  margin: '20px',
  border: '2px solid #e0e0e0',
};

const tableHeaderStyle = {
  backgroundColor: '#3498db',
  color: 'white',
  fontWeight: 'bold',
};

const GetAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState(null);
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        if (!userID) {
          setError('User ID is missing. Please log in.');
          return;
        }

        const response = await axios.get(`https://localhost:7081/api/Attendance/report/${userID}`);

       
        const groupedAttendanceData = groupByClockInDate(response.data);

        setAttendanceData(groupedAttendanceData);

        setError(null);
      } catch (error) {
        console.error('GetAttendance error:', error);

        if (error.response) {
          console.log('Error response:', error.response.data);
        }

        setError('Error during fetching attendance');
      }
    };

    fetchAttendanceData();
  }, [userID]);

  // Helper function to group data by clock-in date
  const groupByClockInDate = (data) => {
    const groupedData = {};

    data.forEach((attendance) => {
      const clockInDate = new Date(attendance.clockInDateTime).toLocaleDateString();

      if (!groupedData[clockInDate]) {
        groupedData[clockInDate] = [];
      }

      groupedData[clockInDate].push(attendance);
    });

    return groupedData;
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Attendance
      </Typography>
      {userID ? (
        <>
          {attendanceData && Object.keys(attendanceData).length > 0 ? (
            <TableContainer component={Paper} style={tableStyle}>
              <Table>
                <TableHead>
                  <TableRow style={tableHeaderStyle}>
                    <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Clock In Date</TableCell>
                    <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Clock Out DateTime</TableCell>
                    <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Lunch Break Start</TableCell>
                    <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Lunch Break End</TableCell>
                    <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Actual Hours</TableCell>
                    <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Productive Hours</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(attendanceData).map((clockInDate) => (
                    <React.Fragment key={clockInDate}>
                      {Array.isArray(attendanceData[clockInDate]) &&
                        attendanceData[clockInDate].map((attendance, index) => (
                          <TableRow key={`${clockInDate}-${index}`}>
                            {index === 0 && (
                              <TableCell rowSpan={attendanceData[clockInDate].length}>
                                {clockInDate}
                              </TableCell>
                            )}
                            <TableCell>
                              {attendance.clockOutDateTime ? new Date(attendance.clockOutDateTime).toLocaleString() : ''}
                            </TableCell>
                            <TableCell>
                              {attendance.lunchBreakStart ? new Date(attendance.lunchBreakStart).toLocaleString() : ''}
                            </TableCell>
                            <TableCell>
                              {attendance.lunchBreakEnd ? new Date(attendance.lunchBreakEnd).toLocaleString() : ''}
                            </TableCell>
                            <TableCell>{attendance.actualHours}</TableCell>
                            <TableCell>{attendance.productiveHours}</TableCell>
                          </TableRow>
                        ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1">No attendance data available.</Typography>
          )}
        </>
      ) : (
        <Typography variant="body1">Please log in to fetch attendance.</Typography>
      )}
    </div>
  );
};

export default GetAttendance;
