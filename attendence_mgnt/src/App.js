import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Routes,Navigate , Route } from 'react-router-dom';
import UserComponant from './componants/userComponant/UserComponant';
import LeaveRequestComponant from './componants/LeaveRequest/LeaveRequestComponant';
import LeaveApprovalComponent from './componants/adminComponant/LeaveManagement/LeaveApprovalComponant';
import AttendenceListComponant from './componants/AttendenceManagement/AttendenceListComponant';
import Login from './componants/Login/Login';
import { AuthProvider } from './componants/Login/AuthContext';
import { useAuth } from './componants/Login/AuthContext';
import EmployeeDashBoard from './componants/DashBoard/EmployeeDashBoard';
import HRDashBoard from './componants/DashBoard/HRDashBoard';
import LeaveRequestForUserID from './componants/LeaveRequest/LeaveRequestForUserID';
function PrivateRoute({ element, path }) {
  const { state } = useAuth();
  if (!state.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return element;
}

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router> 
          <div className="App">
            <Routes>
            <Route path="/" element={<Login />} />
                <Route path="user" element={<PrivateRoute element={<UserComponant />} />} />
                <Route path="leaverequest" element={<PrivateRoute element={<LeaveRequestComponant />} />} />
                <Route path="leaveapproval" element={<PrivateRoute element={<LeaveApprovalComponent />} />} />
                <Route path="attendence" element={<PrivateRoute element={<AttendenceListComponant />} />} />
                <Route path="hrdashboard" element={<PrivateRoute element={<HRDashBoard/>} />} />
                <Route path="employeedashboard" element={<PrivateRoute element={<EmployeeDashBoard />} />} />
                <Route path="LeaveRequestForUserID" element={<PrivateRoute element={<LeaveRequestForUserID />} />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
}
export default App;