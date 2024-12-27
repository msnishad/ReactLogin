import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Button, Box, Container, ThemeProvider } from '@mui/material';
import Login from './components/Login';
import theme from './theme';
import Dashboard from './components/DashBoard';
import Register from './components/Register';

function App() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="sticky">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Button color="inherit" href="/">Login</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
              <Button color="inherit" href="/register">Register</Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Container sx={{ marginTop: 4 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
