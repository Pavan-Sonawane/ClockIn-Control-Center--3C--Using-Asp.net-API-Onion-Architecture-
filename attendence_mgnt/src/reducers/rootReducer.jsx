import { combineReducers } from 'redux';
import attendanceReducer from './userReducer';
import leaveReducer from './LeaveReducer';

const rootReducer = combineReducers({
  attendance: attendanceReducer,
  leave: leaveReducer,
});
export default rootReducer;
