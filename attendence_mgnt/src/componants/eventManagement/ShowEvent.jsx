import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Typography } from '@mui/material';

const ShowEvent = () => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const userID = localStorage.getItem('userID');

    if (userID) {
      const apiUrl = `https://localhost:7081/api/Event/ByUser/${userID}`;

      axios.get(apiUrl)
        .then(response => {
          setEventData(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching event details:', error);
        });
    }
  }, []);

  if (eventData.length === 0) {
    return <div><h1>There is No Event For You....</h1></div>;
  }

  return (
    <TableContainer component={Paper}>
      <h1>My Events</h1>
      <Table>
        
        <TableHead style={{ backgroundColor: '#3498db', color: 'white' }}>
          <TableRow>
            <TableCell>Event Name</TableCell>
            <TableCell>Event Description</TableCell>
            <TableCell>Event Type</TableCell>
            <TableCell>Mentor</TableCell>
            <TableCell>Event Date and Time</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventData.map(event => (
            <TableRow key={event.eventID}>
              <TableCell>{event.eventName}</TableCell>
              <TableCell>{event.eventDescription}</TableCell>
              <TableCell>{event.eventType}</TableCell>
              <TableCell>{event.mentor}</TableCell>
              <TableCell>{event.eventDatTime}</TableCell>
              <TableCell>{event.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShowEvent;
