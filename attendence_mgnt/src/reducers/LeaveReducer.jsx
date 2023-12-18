// LeaveReducer.js
import * as actionTypes from '../actions/actionTypes'; // Add this line to import actionTypes

const initialState = {
  leaves: [],
};

const leaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LEAVES:
      return {
        ...state,
        leaves: action.payload,
      };

    case actionTypes.ADD_LEAVE: 
      return { ...state, leaves: [...state.leaves, action.payload] };

      case actionTypes.UPDATE_LEAVE:
        return {
          ...state,
          leaves: state.leaves.map((leave) =>
            leave.leaveID === action.payload.leaveId
              ? { ...leave, ...action.payload.updatedLeaveData }
              : leave
          ),
        };

    case actionTypes.DELETE_LEAVE: 
      return {
        ...state,
        leaves: state.leaves.filter((leave) => leave.id !== action.payload),
      };

    default:
      return state;
  }
};

export default leaveReducer;
