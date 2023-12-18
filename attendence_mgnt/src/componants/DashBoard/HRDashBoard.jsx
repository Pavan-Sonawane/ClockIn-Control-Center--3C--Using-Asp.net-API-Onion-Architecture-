import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import LogoutComponent from '../Login/LogoutComponent';
import LeaveApprovalComponent from '../adminComponant/LeaveManagement/LeaveApprovalComponant';
import UserComponant from '../userComponant/UserComponant';
import HREventList from '../eventManagement/HREventList';
import Footer from '../Layout/Footer';
import {
  Assignment,
  PersonAdd,
  Logout,
} from '@mui/icons-material';
function HRDashBoard() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || '');
  }, []);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'LogoutComponent':
        return <LogoutComponent />;
      case 'LeaveApprovalComponent':
        return <LeaveApprovalComponent />;
      case 'UserComponant':
        return <UserComponant />;
        case 'HREventList':
          return <HREventList/>;
      default:
        return null;
    }
  };
  return (
    <div>
    <AppBar position="static" style={{ background: '#3498db' }}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">Welcome Admin {username} </Typography>
        <div>
          <Button color="inherit" onClick={() => setSelectedComponent('LeaveApprovalComponent')}>
            <Assignment /> Leave Approval
          </Button>
          <Button color="inherit" onClick={() => setSelectedComponent('HREventList')}>
            <Assignment />Event Management
          </Button>
          <Button color="inherit" onClick={() => setSelectedComponent('UserComponant')}>
            <PersonAdd /> Manage Users
          </Button>
          <Button color="inherit" onClick={() => setSelectedComponent('LogoutComponent')}>
            <Logout /> Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
    {renderComponent()}
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f0f0f0" // Set your desired background color
    >
      <Typography variant="h2" color="primary" gutterBottom>
        Welcome to
      </Typography>
      <Typography variant="h1" color="primary" gutterBottom>
        ClockIn Control Center (3C)
      </Typography>
    </Box>
    <Footer/>
  </div>
  );
}
export default HRDashBoard;
