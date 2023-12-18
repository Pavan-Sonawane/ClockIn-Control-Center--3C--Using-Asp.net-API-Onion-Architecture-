// AddUserComponent.jsx
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addAttendance } from '../../actions/userAction';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const AddUserComponent = ({ addAttendance }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: '', // Updated property name to match the schema
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = () => {
    addAttendance(user);
    // You can also reset the form or perform any other actions after adding the user
    setUser({
      username: '',
      email: '',
      password: '',
      role: '', // Updated property name to match the schema
    });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      
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
      <Button variant="contained" onClick={handleAddUser} sx={{ marginTop: 2 }}>
        Add User
      </Button>
    </Box>
  );
};

export default connect(null, { addAttendance })(AddUserComponent);
