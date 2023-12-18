// UpdateUserComponent.jsx
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateAttendance } from '../../actions/userAction';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const UpdateUserComponent = ({ attendanceId, attendanceRecord, updateAttendance, onClose }) => {
  const [user, setUser] = useState({
    userID: attendanceId,
    username: '',
    email: '',
    password: '',
    role: '', // Updated property name to match the schema
  });

  useEffect(() => {
    if (attendanceRecord) {
      setUser({
        userID: attendanceRecord.userID || '',
        username: attendanceRecord.username || '',
        email: attendanceRecord.email || '',
        password: attendanceRecord.password || '',
        role: attendanceRecord.role || '', // Updated property name to match the schema
      });
    }
  }, [attendanceRecord]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdateUser = () => {
    updateAttendance(user.userID, user);
    // You can also handle other actions after updating the user
    onClose(); // Close the form after updating
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <h2>Update User</h2>
      <TextField
        label="Username"
        name="username"
        value={user.username}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={user.password}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select name="role" value={user.role} onChange={handleInputChange}>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Employee">Employee</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleUpdateUser} sx={{ marginTop: 2 }}>
        Update User
      </Button>
    </Box>
  );
};

export default connect(null, { updateAttendance })(UpdateUserComponent);
