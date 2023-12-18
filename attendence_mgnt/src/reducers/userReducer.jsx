// attendanceReducer.js
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  attendanceList: [],
};

const attendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ATTENDANCE:
      return { ...state, attendanceList: action.payload };
    case actionTypes.ADD_ATTENDANCE:
      return { ...state, attendanceList: [...state.attendanceList, action.payload] };
    case actionTypes.UPDATE_ATTENDANCE:
      return {
        ...state,
        attendanceList: state.attendanceList.map((record) =>
        record.userID === action.payload.userID ? action.payload : record

        ),
      };
    case actionTypes.DELETE_ATTENDANCE:
      return {
        ...state,
        attendanceList: state.attendanceList.filter((record) => record.userID !== action.payload),
      };
    default:
      return state;
  }
};

export default attendanceReducer;
