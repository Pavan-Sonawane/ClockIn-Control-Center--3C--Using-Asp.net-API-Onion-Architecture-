// import { Link as RouterLink, useLocation } from 'react-router-dom';
// import React from 'react';
// import { Outlet } from 'react-router-dom';

// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Container,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import HomeIcon from '@mui/icons-material/Home';
// import PeopleIcon from '@mui/icons-material/People';
// import EventNoteIcon from '@mui/icons-material/EventNote';

// const NavigationBar = () => {
//   const [drawerOpen, setDrawerOpen] = React.useState(false);
//   const location = useLocation();

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const isItemSelected = (path) => {
//     return location.pathname === path;
//   };

//   return (
//     <>
//       <AppBar position="fixed" color="secondary">
//         <Container sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
//           <Toolbar>
//           <Typography variant="h6">
//               <EventNoteIcon sx={{ marginRight: '8px' }} />
//               Attendance Management System
//             </Typography>
//           </Toolbar>
//         </Container>
//       </AppBar>

      

//       <Container sx={{ marginTop: '64px', padding: '20px' }}>
//         <Outlet />
//       </Container>
//     </>
//   );
// };

// export default NavigationBar;
