import * as actionTypes from './actionTypes';
import api from '../services/api';

export const fetchAttendance = () => async (dispatch) => {
  try {
    const response = await api.get('Attendance');
    dispatch({ type: actionTypes.FETCH_ATTENDANCE, payload: response.data });
  } catch (error) {
    console.error('Error fetching attendance:', error);
  }
};

export const addAttendance = (attendanceRecord) => async (dispatch) => {
  try {
    const response = await api.post('Users', attendanceRecord);
    dispatch({ type: actionTypes.ADD_ATTENDANCE, payload: response.data });
  } catch (error) {
    console.error('Error adding attendance record:', error);
  }
};
