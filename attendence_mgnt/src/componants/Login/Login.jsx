

import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink, teal } from '@mui/material/colors';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Layout/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: pink[500],
    },
  },
});

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost:7081/api/Login/LoginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { message } = data;

        if (message) {
          const token = message;

          const decodedToken = jwtDecode(token);

          localStorage.setItem('jwttoken', token);
          localStorage.setItem('username', username);
          localStorage.setItem('userID', decodedToken.userID);

          login({ user: { username, userID: decodedToken.userID }, token });

          try {
            const verifyResponse = await axios.get(`https://localhost:7081/api/Login/VerifyAndProcessToken?token=${token}`);
            const { message: payload } = verifyResponse.data;

            if (payload === 'HR') {
              navigate('/hrdashboard');
            } else if (payload === 'Employee') {
              navigate('/employeedashboard');
            } else {
              console.error('Unknown user role:', payload);
            }
          } catch (verifyError) {
            console.error('Error verifying token:', verifyError);
          }

          // Show success notification when logged in
          toast.success('You have successfully logged in!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          console.error('Incorrect username or password');
        }
      } else {
        // Handle other server errors (e.g., 500 Internal Server Error)
        console.error('Server returned an error:', response.status);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Login error:', error);

      // Show error notification when login fails
      toast.error('Error during login. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" alignItems="center" height="100vh" style={{ background: teal[500] }}>
        <Grid item>
          <Card>
            <CardContent>
              <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item>
                  <Typography variant="h5" component="div">
                  ClockIn Control Center (3C)
                  </Typography>
                  <Typography variant="h5" component="div">
                    Login
                  </Typography>
                </Grid>
              </Grid>
              <form>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  style={{ marginTop: '16px' }}
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
      <Footer/>
    </ThemeProvider>
  );
}

export default Login;
