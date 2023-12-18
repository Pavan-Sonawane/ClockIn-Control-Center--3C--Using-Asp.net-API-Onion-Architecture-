import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAttendance, deleteAttendance } from '../../actions/userAction';
import AddUserComponent from '../userComponant/AddUser';
import UpdateUserComponent from '.././userComponant/UpdateUserComponant';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventForm from '../eventManagement/EventForm';
const useStyles = () => ({
  addButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  tableHeaderCell: {
    backgroundColor: '#1976D2',
    color: '#FFF',
    fontWeight: 'bold',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: '#E3F2FD',
    },
  },
  actionButton: {
    margin: '0 4px',
  },
  tableHeader: {
    backgroundColor: '#1976D2',
    color: '#FFF',
    fontWeight: 'bold',
  },
});

const UserComponent = ({ attendanceList, fetchAttendance, deleteAttendance }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isUpdateUserModalOpen, setUpdateUserModalOpen] = useState(false);
  const classes = useStyles();
  const [isEventFormModalOpen, setEventFormModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    userID: 0,
    eventDescription: '',
    eventType: '',
    mentor: '',
    eventDatTime: '',
    status: ''
  });

  useEffect(() => {
    fetchAttendance();
    
  }, [fetchAttendance]);

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setUpdateUserModalOpen(true);
  };
  const handleAddUserClick = () => {
    setAddUserModalOpen(true);
  };
  const handleCloseEventFormModal = () => {
    setEventFormModalOpen(false);
  };
  const handleDeleteClick = (attendanceId) => {
    // Display a confirmation prompt
    const isConfirmed = window.confirm('Are you sure you want to delete this record?');
  
    // Check if the user confirmed the action
    if (isConfirmed) {
      // Delete the attendance record
      deleteAttendance(attendanceId);
    }
  };
  

  const handleCloseModals = () => {
    setAddUserModalOpen(false);
    setUpdateUserModalOpen(false);
  };
  const handleAddEventClick = (userID) => {
    console.log('Picked UP UserID:', userID);
    setFormData(prevFormData => ({
      ...prevFormData,
      userID: userID,
    }));
    setEventFormModalOpen(true);
  };
  
  return (
    <div>
      <Button
        className={classes.addButton}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddUserClick}
      >
        Add User
      </Button>

      <h2>User List</h2>

      <TableContainer component={Paper} style={{ marginBottom: '16px' }}>
        <Table>
          <TableHead>
            <TableRow style={classes.tableHeader}>
              {/* <TableCell className={classes.tableHeaderCell}>User ID</TableCell> */}
              <TableCell className={classes.tableHeaderCell}>Username</TableCell>
              <TableCell className={classes.tableHeaderCell}>Email</TableCell>
              <TableCell className={classes.tableHeaderCell}>Password</TableCell>
              <TableCell className={classes.tableHeaderCell}>Role</TableCell>
              <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceList.map((user) => (
              <TableRow key={user.userID} className={classes.tableRowHover}>
                {/* <TableCell>{user.userID}</TableCell> */}
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    className={classes.actionButton}
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => handleUpdateClick(user)}
                  >
                    Update
                  </Button>
                  <Button
                    className={classes.actionButton}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteClick(user.userID)}
                  >
                    Delete
                  </Button>
                  <Button
                    className={classes.actionButton}
                    variant="contained" color="success"
                    startIcon={<AddIcon/>}
                    onClick={() => handleAddEventClick(user.userID)}
                  >
                   Event
                  </Button>
                  
               
                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={isEventFormModalOpen} onClose={handleCloseEventFormModal}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          {/* Pass formData and setFormData as props to EventForm */}
          <EventForm formData={formData} setFormData={setFormData} onClose={handleCloseEventFormModal} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEventFormModal}>Cancel</Button>
        </DialogActions>
      </Dialog> 
      <Dialog open={isAddUserModalOpen} onClose={handleCloseModals}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <AddUserComponent />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModals}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {selectedUser && (
        <Dialog open={isUpdateUserModalOpen} onClose={handleCloseModals}>
          <DialogTitle>Update User</DialogTitle>
          <DialogContent>
            <UpdateUserComponent
              attendanceId={selectedUser.userID}
              attendanceRecord={selectedUser}
              onClose={handleCloseModals}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModals}>Cancel</Button>
          </DialogActions>
        </Dialog>
       
      )}
      
    </div>
  );
};

const mapStateToProps = (state) => ({
  attendanceList: state.attendance.attendanceList,
});

export default connect(mapStateToProps, { fetchAttendance, deleteAttendance })(UserComponent);
