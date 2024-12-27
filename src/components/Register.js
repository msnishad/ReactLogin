import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, MenuItem, Select, InputLabel, FormControl, Alert } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');  // Default role is 'user'
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Regular expression for validating email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate the email format
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return;
    } else {
      setEmailError('');
    }

    // Check if fields are not empty
    if (!username || !email || !password || !role) {
      setError('All fields are required.');
      return;
    }

    try {
      // Send registration data to the API
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        username,
        email,  // Dynamically send email key as 'user_email'
        password,
        role,
      });
      setSuccessMessage(response.data)

      // If registration is successful, show success message and redirect
      setSuccessMessage('Registration successful! You can now log in.');
      setTimeout(() => {
        navigate('/dashboard');  // Redirect to login page after 10 seconds
      }, 10000);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          error={!!emailError} // Apply error styling if email is invalid
          helperText={emailError} // Show error message
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        <FormControl fullWidth required>
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
          >
            <MenuItem value="STAFF">Staff</MenuItem>
            <MenuItem value="MEMBER">Member</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
          </Select>
        </FormControl>
        {error && <Alert severity="error">{error}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <Button variant="contained" type="submit" sx={{ marginTop: 2 }} fullWidth>
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
