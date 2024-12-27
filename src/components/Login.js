import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Alert, Card, CardContent } from '@mui/material';

const Login = () => {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [idKey, setIdKey] = useState('username');
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if(emailRegex.test(id)){
        setIdKey("email");
      } else {
        setIdKey("username");
      }
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        [idKey]:id,
        password,
      });

      if(response.status === 200){
        // If login is successful, store the token in localStorage
        localStorage.setItem('token', response.data.token);
        // Redirect user to dashboard after successful login
        navigate('/dashboard');
      } else {
        // Handle errors (e.g., wrong credentials)
        setError('Invalid email or password');
      }

      
    } catch (err) {
      // Handle errors (e.g., wrong credentials)
      setError('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          label="Email/Username"
          variant="outlined"
          value={id}
          onChange={(e) => setID(e.target.value)}
          fullWidth
          required
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
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" type="submit" sx={{ marginTop: 2 }} fullWidth>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
