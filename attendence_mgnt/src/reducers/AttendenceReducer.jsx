import * as actionTypes from '../actions/actionTypes';

const initialState = {
  attendanceList: [],
};

const AttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ATTENDANCE:
      return { ...state, attendanceList: action.payload };
    case actionTypes.ADD_ATTENDANCE:
      return { ...state, attendanceList: [...state.attendanceList, action.payload] };
      default:
      return state;
  }
};

export default AttendanceReducer;
