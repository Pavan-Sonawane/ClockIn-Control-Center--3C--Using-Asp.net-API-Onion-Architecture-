import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';

const HREventList = () => {
  const [eventData, setEventData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    eventId: 0,
    userID: 0,
    eventName: '',
    eventDescription: '',
    eventType: '',
    mentor: '',
    eventDatTime: '',
    status: '',
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const apiUrl = 'https://localhost:7081/api/Event';

    axios.get(apiUrl)
      .then(response => {
        setEventData(response.data);
      })
      .catch(error => {
        console.error('Error fetching event details:', error);
      });
  }, []);

  const handleDeleteClick = async (eventId) => {
    console.log('Deleting event with ID:', eventId);

    try {
      if (!eventId) {
        console.error('Error: eventId is undefined or null');
        return;
      }

      const apiUrl = `https://localhost:44387/api/Event/${eventId}`;
      await axios.delete(apiUrl);

      setEventData(prevEventData => prevEventData.filter(event => event.EventId !== eventId));

    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleUpdateClick = (event) => {
    setSelectedEvent(event);
    setFormData({
      eventId: event.eventId,
      userID: event.userID,
      eventName: event.eventName,
      eventDescription: event.eventDescription,
      eventType: event.eventType,
      mentor: event.mentor,
      eventDatTime: event.eventDatTime,
      status: event.status,
    });
    setOpenDialog(true);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = selectedEvent
        ? `https://localhost:44387/api/Event/${formData.eventId}`
        : 'https://localhost:44387/api/Event';

      if (selectedEvent) {
        await axios.put(apiUrl, formData);
      } else {
        await axios.post(apiUrl, formData);
      }

      setFormData({
        eventId: 0,
        userID: 0,
        eventName: '',
        eventDescription: '',
        eventType: '',
        mentor: '',
        eventDatTime: '',
        status: '',
      });
      setSelectedEvent(null);
      setOpenDialog(false);

      const updatedData = await axios.get('https://localhost:44387/api/Event');
      setEventData(updatedData.data);
      console.log(updatedData.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <h1>Event Details</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: '#3498db' }}>
            <TableRow style={{color:'white' }}>
              <TableCell >Event Name</TableCell>
              <TableCell>Event Description</TableCell>
              <TableCell>Event Type</TableCell>
              <TableCell>Mentor</TableCell>
              <TableCell>Event Date and Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventData.map(event => (
              <TableRow key={event.EventId}>
                <TableCell>{event.eventName}</TableCell>
                <TableCell>{event.eventDescription}</TableCell>
                <TableCell>{event.eventType}</TableCell>
                <TableCell>{event.mentor}</TableCell>
                <TableCell>{event.eventDatTime}</TableCell>
                <TableCell>{event.status}</TableCell>
                <TableCell>
                  <Button variant='contained' onClick={() => handleUpdateClick(event)} startIcon={<UpdateIcon />}>
                    Update
                  </Button>
                  <Button variant='contained' color="secondary" onClick={() => handleDeleteClick(event.eventId)} startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedEvent ? 'Update' : 'Create'} Event</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleFormChange}
              >
                <MenuItem value="">Select Status</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
                <MenuItem value="Postpone">Postpone</MenuItem>
              </Select>
            </FormControl>
            <DialogActions>
              <Button type="submit" variant='contained'>{selectedEvent ? 'Update' : 'Create'}</Button>
              <Button onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HREventList;
