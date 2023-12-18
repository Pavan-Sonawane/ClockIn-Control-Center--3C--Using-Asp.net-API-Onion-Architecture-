// actions.js
import * as actionTypes from './actionTypes';
import api from '../services/api';

// export const fetchAttendance = () => async (dispatch) => {
//   try {
//     const response = await api.get('Users');
//     dispatch({ type: actionTypes.FETCH_ATTENDANCE, payload: response.data });
//   } catch (error) {
//     console.error('Error fetching attendance:', error);
//   }
// };


export const fetchAttendance = () => async (dispatch) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Include the token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    
    const response = await api.get('Users', config);

    dispatch({
      type: actionTypes.FETCH_ATTENDANCE,
      payload: response.data,
    });
  } catch (error) {
    
    console.error('Error fetching attendance data:', error);
  }
};
// export const addAttendance = (attendanceRecord) => async (dispatch) => {
//   try {
//     const response = await api.post('Users', attendanceRecord);
//     dispatch({ type: actionTypes.ADD_ATTENDANCE, payload: response.data });
//   } catch (error) {
//     console.error('Error adding attendance record:', error);
//   }
// };
export const addAttendance = (attendanceRecord) => async (dispatch) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Include the token in the request headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the API request with the token
    const response = await api.post('Users', attendanceRecord, config);
    
    // Dispatch the action with the response data
    dispatch({ type: actionTypes.ADD_ATTENDANCE, payload: response.data });
  } catch (error) {
    // Handle error, e.g., dispatch an action to update state with error information
    console.error('Error adding attendance record:', error);

    // If the error is due to unauthorized access (401), you might want to dispatch an action to handle logout or show a notification to the user.
    if (error.response && error.response.status === 401) {
      // Dispatch an action or handle the logout scenario
      // Example: dispatch(logoutAction());
    }
  }
};
// export const updateAttendance = (attendanceId, attendanceRecord) => async (dispatch) => {
//   try {
//     const response = await api.put(`Users/${attendanceId}`, attendanceRecord);
//     dispatch({ type: actionTypes.UPDATE_ATTENDANCE, payload: response.data });
//   } catch (error) {
//     console.error('Error updating attendance record:', error);
//   }
// };
export const updateAttendance = (attendanceId, attendanceRecord) => async (dispatch) => {
  try {
    
    const token = localStorage.getItem('token');

    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

   
    const response = await api.put(`Users/${attendanceId}`, attendanceRecord, config);

    dispatch({ type: actionTypes.UPDATE_ATTENDANCE, payload: response.data });
  } catch (error) {
    console.error('Error updating attendance record:', error);
  }
};
export const deleteAttendance = (attendanceId) => async (dispatch) => {
  try {
    await api.delete(`Users/${attendanceId}`);
    dispatch({ type: actionTypes.DELETE_ATTENDANCE, payload: attendanceId });
  } catch (error) {
    console.error('Error deleting attendance record:', error);
  }
};

export const searchAttendance = (searchQuery) => async (dispatch) => {
  try {
    const response = await api.get(`/Attendance/search?query=${searchQuery}`);
    dispatch({ type: actionTypes.FETCH_ATTENDANCE, payload: response.data });
  } catch (error) {
    console.error('Error searching attendance:', error);
  }
};
