import React, { useState, useEffect } from 'react';
import { Button,Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  AccessTime,
  ExitToApp,
  Assignment,
  Schedule,
  
  Menu,
} from '@mui/icons-material';

import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';

import ClockIn from '../AttendenceManagement/ClockIn';
import ClockOut from '../AttendenceManagement/ClockOut';
import GetAttendance from '../AttendenceManagement/GetAttendence';
import LeaveRequestForUserID from '../LeaveRequest/LeaveRequestForUserID';
import AddLeaveRequestComponent from '../LeaveRequest/AddLeaveRequestComponant';
import LogoutComponent from '../Login/LogoutComponent';
import ApplayLunchBreak from '../AttendenceManagement/ApplayLunchBreak';
import RemoveLunchBreak from '../AttendenceManagement/RemoveLunchBreak';
import ShowEvent from '../eventManagement/ShowEvent';
import Footer from '../Layout/Footer';
const EmployeeDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [username, setUsername] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isComponentRendering, setIsComponentRendering] = useState(false);

  const handleClockIn = () => {
    setSelectedComponent('ClockIn');
    setIsClockedIn(true);
    setIsComponentRendering(true);
  };

  const handleClockOut = () => {
    setSelectedComponent('ClockOut');
    setIsClockedIn(false);
    setIsComponentRendering(true);
  };
  const handleLogout = () => {
    setSelectedComponent('Logout');
    setIsComponentRendering(true);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || 'Employee');
  }, []);
  const renderClockButton = () => {
    if (isClockedIn) {
      return (
        <Button
          color="inherit"
          onClick={handleClockOut}
          sx={{ color: '#ffffff' }}
          startIcon={<AccessTime />}
        >
          Clock Out
        </Button>
      );
    } else {
      return (
        <Button
          color="inherit"
          onClick={handleClockIn}
          sx={{ color: '#ffffff' }}
          startIcon={<AccessTime />}
        >
          Clock In
        </Button>
      );
    }
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'ClockIn':
        return <ClockIn />;
      case 'ClockOut':
        return <ClockOut />;
      case 'Start Break':
        return <ApplayLunchBreak />;
      case 'End Break':
        return <RemoveLunchBreak />;
      case 'Events':
        return <ShowEvent />;
      case 'My Attendance':
        return <GetAttendance />;
      case 'My Leave':
        return <LeaveRequestForUserID />;
      case 'Request Leave':
        return <AddLeaveRequestComponent />;
      case 'Logout':
        return <LogoutComponent />;
      default:
        return null;
    }
  };

  const getIcon = (buttonName) => {
    switch (buttonName) {
      case 'ClockIn':
        return <AccessTime />;
      case 'ClockOut':
        return <AccessTimeFilledIcon style={{ color: 'green' }} />;
      case 'My Attendance':
        return <Schedule />;
      case 'My Leave':
      case 'Events':
        return <EventNoteOutlinedIcon style={{ color: 'purple' }} />;
      case 'Request Leave':
        return <Assignment />;
      case 'Start Break':
        return <AccessTimeFilledIcon style={{ color: 'blue' }} />;
      case 'End Break':
        return <AccessTimeFilledIcon style={{ color: 'red' }} />;
      case 'Logout':
        return <ExitToApp/>;
      default:
        return null;
    }
  };
  

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div>
      <AppBar position="static" sx={{ background: '#3498db' }}>
        <Toolbar>
          <Button color="inherit" onClick={handleDrawerOpen} sx={{ marginRight: 2 }}>
            <Menu />
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#ffffff', textAlign: 'left' }}>
            Welcome {username}
          </Typography>
          {renderClockButton()}
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{ color: '#ffffff' }}
            startIcon={<ExitToApp />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="Right" open={drawerOpen} onClose={handleDrawerClose}>
        <List>
          {['Start Break', 'End Break', 'My Attendance', 'Events', 'My Leave', 'Request Leave'].map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => { setSelectedComponent(text); handleDrawerClose(); setIsComponentRendering(true); }}
              sx={{
                '&:hover': {
                  backgroundColor: '#e0e0e0', // Background color on hover
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Box shadow on hover
                  borderRadius: '5px', // Border radius on hover
                },
              }}
            >
              <ListItemIcon>{getIcon(text)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {isComponentRendering ? renderComponent() : null}

      {isComponentRendering ? null :<div>
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
     }
    
    </div>
  );
};
export default EmployeeDashboard;