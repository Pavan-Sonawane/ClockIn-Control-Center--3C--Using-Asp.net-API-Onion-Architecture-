import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import EventIcon from '@mui/icons-material/Event';

const EventForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = 'https://localhost:7081/api/Event';
      const response = await axios.post(apiUrl, formData);
      
      console.log('Event created successfully:', response.data);

      setFormData({
        eventName: '',
        userID: 0, 
        eventDescription: '',
        eventType: '',
        mentor: '',
        eventDatTime: '',
        status: ''
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="eventName">Event Name</InputLabel>
        <Select
          value={formData.eventName}
          onChange={handleChange}
          inputProps={{
            name: 'eventName',
            id: 'eventName',
          }}
        >
          <MenuItem value="">Select Event Type</MenuItem>
          <MenuItem value="Gaming Tournaments">Gaming Tournaments</MenuItem>
          <MenuItem value="Mentorship Programs">Mentorship Programs</MenuItem>
          <MenuItem value="Code Reviews and Coding Dojos">Code Reviews and Coding Dojos</MenuItem>
          <MenuItem value="Team-building Activities">Team-building Activities</MenuItem>
          <MenuItem value="Town Hall Meetings">Town Hall Meetings</MenuItem>
          <MenuItem value="Health and Wellness Programs">Health and Wellness Programs</MenuItem>
          <MenuItem value="Employee Appreciation Day">Employee Appreciation Day</MenuItem>
          <MenuItem value="Innovation Days">Innovation Days</MenuItem>
          <MenuItem value="Tech Talks and Workshops">Tech Talks and Workshops</MenuItem>
          <MenuItem value="Hackathons">Hackathons</MenuItem>
          <MenuItem value="Annual Company Retreat">Annual Company Retreat</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
      <InputLabel shrink htmlFor="eventDescription">
          Event Description
        </InputLabel>
        <TextField
          type="text"
          name="eventDescription"
          value={formData.eventDescription}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="eventType">Event Type</InputLabel>
        <Select
          value={formData.eventType}
          onChange={handleChange}
          inputProps={{
            name: 'eventType',
            id: 'eventType',
          }}
        >
          <MenuItem value="">Select Event Type</MenuItem>
          <MenuItem value="technical">Technical</MenuItem>
          <MenuItem value="non-technical">Non-Technical</MenuItem>
          <MenuItem value="casual">Casual</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
  <InputLabel shrink={true} htmlFor="mentor">
    Mentor
  </InputLabel>
  <TextField
    type="text"
    name="mentor"
    value={formData.mentor}
    onChange={handleChange}
  />
</FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel shrink htmlFor="eventDatTime">
          Event Date and Time
        </InputLabel>
        <TextField
          type="datetime-local"
          name="eventDatTime"
          value={formData.eventDatTime}
          onChange={handleChange}
        />
      </FormControl>


      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="status">Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="">Select Status</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Canceled">Canceled</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<EventIcon />}
        style={{ marginTop: '20px' }}
      >
        Create Event
      </Button>
    </form>
  );
};

export default EventForm;
