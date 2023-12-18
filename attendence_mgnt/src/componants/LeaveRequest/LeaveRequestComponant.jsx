// LeaveRequestComponent.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaves, addLeave, updateLeave } from '../../actions/LeaveRequestAction';

const LeaveRequestComponent = () => {
  const dispatch = useDispatch();
  const leaves = useSelector((state) => state.leave.leaves);

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  const [selectedLeave, setSelectedLeave] = useState(null);

  const [addLeaveData, setAddLeaveData] = useState({
    userID: '',
    leaveType: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Pending',
  });

  const [updateLeaveData, setUpdateLeaveData] = useState({
    leaveID: 0,
    userID: '',
    leaveType: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Pending',
  });

  const handleInputChange = (e, formDataSetter) => {
    const { name, value } = e.target;
    formDataSetter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddLeave = () => {
    // Additional validation can be added here if needed
    dispatch(addLeave(addLeaveData));
    // Reset the form after dispatching the action
    setAddLeaveData({
      userID: '',
      leaveType: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'Pending',
    });
  };

  const handleUpdateLeave = () => {
    dispatch(updateLeave(selectedLeave.leaveID, updateLeaveData));

    // Reset the form and clear the selected leave after updating
    setUpdateLeaveData({
      leaveID: 0,
      userID: '',
      leaveType: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'Pending',
    });
    setSelectedLeave(null);
  };

  const handleUpdateClick = (leave) => {
    setSelectedLeave(leave);
    setUpdateLeaveData({
      leaveID: leave.leaveID,
      userID: leave.userID,
      leaveType: leave.leaveType,
      description: leave.description,
      startDate: leave.startDate,
      endDate: leave.endDate,
      status: leave.status,
    });
  };

  const handleCancelUpdate = () => {
    setSelectedLeave(null);
    setUpdateLeaveData({
      leaveID: 0,
      userID: '',
      leaveType: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'Pending',
    });
  };

  return (
    <div>
      <h2>Leave Requests</h2>
      <ul>
        {leaves.map((leave) => (
          <li key={leave.leaveID}>
            <strong>Leave Type:</strong> {leave.leaveType}
            <br />
            <strong>Description:</strong> {leave.description}
            <br />
            <strong>Start Date:</strong> {new Date(leave.startDate).toLocaleString()}
            <br />
            <strong>End Date:</strong> {new Date(leave.endDate).toLocaleString()}
            <br />
            <strong>Status:</strong> {leave.status}
            <br />
            <button type="button" onClick={() => handleUpdateClick(leave)}>
              Update
            </button>
            <hr />
          </li>
        ))}
      </ul>

      <div>
       
          <div>
            <h2>Update Leave Request</h2>
            <form>
              <div>
                <label htmlFor="userID">UserID:</label>
                <input
                  type="number"
                  id="userID"
                  name="userID"
                  value={updateLeaveData.userID}
                  onChange={(e) => handleInputChange(e, setUpdateLeaveData)}
                />
              </div>
              <div>
                <label htmlFor="leaveType">Leave Type:</label>
                <input
                  type="text"
                  id="leaveType"
                  name="leaveType"
                  value={updateLeaveData.leaveType}
                  onChange={(e) => handleInputChange(e, setUpdateLeaveData)}
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={updateLeaveData.description}
                  onChange={(e) => handleInputChange(e, setUpdateLeaveData)}
                />
              </div>
              <div>
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  value={updateLeaveData.startDate}
                  onChange={(e) => handleInputChange(e, setUpdateLeaveData)}
                />
              </div>
              <div>
                <label htmlFor="endDate">End Date:</label>
                <input
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  value={updateLeaveData.endDate}
                  onChange={(e) => handleInputChange(e, setUpdateLeaveData)}
                />
              </div>
              {/* Other update leave fields */}
              <button type="button" onClick={handleUpdateLeave}>
                Update Leave
              </button>
              <button type="button" onClick={handleCancelUpdate}>
                Cancel Update
              </button>
            </form>
          </div>
       
          <div>
            <h2>Add Leave Request</h2>
            <form>
              <div>
                <label htmlFor="userID">UserID:</label>
                <input
                  type="number"
                  id="userID"
                  name="userID"
                  value={addLeaveData.userID}
                  onChange={(e) => handleInputChange(e, setAddLeaveData)}
                />
              </div>
              <div>
                <label htmlFor="leaveType">Leave Type:</label>
                <input
                  type="text"
                  id="leaveType"
                  name="leaveType"
                  value={addLeaveData.leaveType}
                  onChange={(e) => handleInputChange(e, setAddLeaveData)}
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={addLeaveData.description}
                  onChange={(e) => handleInputChange(e, setAddLeaveData)}
                />
              </div>
              <div>
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  value={addLeaveData.startDate}
                  onChange={(e) => handleInputChange(e, setAddLeaveData)}
                />
              </div>
              <div>
                <label htmlFor="endDate">End Date:</label>
                <input
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  value={addLeaveData.endDate}
                  onChange={(e) => handleInputChange(e, setAddLeaveData)}
                />
              </div>
              {/* Other add leave fields */}
              <button type="button" onClick={handleAddLeave}>
                Add Leave
              </button>
            </form>
          </div>
      
      </div>
    </div>
  );
};

export default LeaveRequestComponent;
