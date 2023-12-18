import * as actionTypes from './actionTypes';
import api from '../services/api';

// export const fetchLeaves = () => async (dispatch) => {
//   try {
//     const response = await api.get('LeaveRequest'); 
//     dispatch({ type: actionTypes.FETCH_LEAVES, payload: response.data });
//   } catch (error) {
//     console.error('Error fetching leaves:', error);
//   }
// };

// export const addLeave = (leave) => async (dispatch) => {
//     try {
//       const response = await api.post('LeaveRequest', leave); // Adjust the API endpoint accordingly
//       dispatch({ type: actionTypes.ADD_LEAVE, payload: response.data });
//     } catch (error) {
//       console.error('Error adding leave:', error);
//     }
//   };

// export const updateLeave = (leaveId, updatedLeaveData) => async (dispatch) => {
//   try {
//     const response = await api.put(`LeaveRequest/${leaveId}`, updatedLeaveData); // Adjust the API endpoint accordingly
//     dispatch({ type: actionTypes.UPDATE_LEAVE, payload: { leaveId, updatedLeaveData: response.data } });
//   } catch (error) {
//     console.error('Error updating leave:', error);
//   }
// };

// export const deleteLeave = (leaveId) => async (dispatch) => {
//   try {
//     await api.delete(`LeaveRequest/${leaveId}`); // Adjust the API endpoint accordingly
//     dispatch({ type: actionTypes.DELETE_LEAVE, payload: leaveId });
//   } catch (error) {
//     console.error('Error deleting leave:', error);
//   }
// };


export const fetchLeaves = () => async (dispatch) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Include the token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the API request with the token using the base URL from the api module
    const response = await api.get('LeaveRequest', config);

    dispatch({ type: actionTypes.FETCH_LEAVES, payload: response.data });
  } catch (error) {
    console.error('Error fetching leaves:', error);
  }
};

export const addLeave = (leave) => async (dispatch) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Include the token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the API request with the token using the base URL from the api module
    const response = await api.post('LeaveRequest', leave, config);

    dispatch({ type: actionTypes.ADD_LEAVE, payload: response.data });
  } catch (error) {
    console.error('Error adding leave:', error);
  }
};

export const updateLeave = (leaveId, updatedLeaveData) => async (dispatch) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Include the token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the API request with the token using the base URL from the api module
    const response = await api.put(`LeaveRequest/${leaveId}`, updatedLeaveData, config);

    dispatch({ type: actionTypes.UPDATE_LEAVE, payload: { leaveId, updatedLeaveData: response.data } });
  } catch (error) {
    console.error('Error updating leave:', error);
  }
};

export const deleteLeave = (leaveId) => async (dispatch) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Include the token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the API request with the token using the base URL from the api module
    await api.delete(`LeaveRequest/${leaveId}`, config);

    dispatch({ type: actionTypes.DELETE_LEAVE, payload: leaveId });
  } catch (error) {
    console.error('Error deleting leave:', error);
  }
};