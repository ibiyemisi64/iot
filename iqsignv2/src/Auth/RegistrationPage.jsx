/***
 * RegistrationPage.jsx
 *
 * Purpose: Allows user to register for a new iqsign account.
 *
 *
 * Copyright 2024 Brown University -- Shufan He
 *
 * All Rights Reserved
 *
 * Permission to use, copy, modify, and distribute this software and its
 * documentation for any purpose other than its incorporation into a
 * commercial product is hereby granted without fee, provided that the
 * above copyright notice appear in all copies and that both that
 * copyright notice and this permission notice appear in supporting
 * documentation, and that the name of Brown University not be used in
 * advertising or publicity pertaining to distribution of the software
 * without specific, written prior permission.
 *
 * BROWN UNIVERSITY DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS
 * SOFTWARE, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR ANY PARTICULAR PURPOSE. IN NO EVENT SHALL BROWN UNIVERSITY
 * BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES OR ANY
 * DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
 * WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS
 * ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
 * OF THIS SOFTWARE.
 ***/
import React, { useState } from 'react';
import {Container, TextField, Button, Typography, Box, Link, CircularProgress} from '@mui/material';
import { hasher } from './utils/utils';
import { useNavigate } from 'react-router-dom';
//import { useEffect } from 'react';
import axios from 'axios';
import iqsignlogo from '../assets/icon/iqsignlogo.png';

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signName, setSignName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const serverUrl = 'https://sherpa.cs.brown.edu:3336';
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    setLoading(true);
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords must match.');
      return;
    }

    try {
      // Retrieve session and padding
      const url = new URL(`${serverUrl}/rest/login`);
      const preRegisterResponse = await axios.get(url.toString());

      const preRegisterData = preRegisterResponse.data;
      const { session, code: padding } = preRegisterData;

      if (!session || !padding) {
        setError('Failed to initialize registration. Missing session or padding.');
        return;
      }

      // Hash passwords and credentials
      const lowerUsername = username.toLowerCase();
      const lowerEmail = email.toLowerCase();

      // two levels hashing for registration
      const hashedPwd = hasher(password);
      const altPassword = hasher(hashedPwd + lowerUsername);
      const finalPassword = hasher(hashedPwd + lowerEmail);

      // request body
      const body = {
        session,
        email: lowerEmail,
        username: lowerUsername,
        password: finalPassword,
        altpassword: altPassword,
        signname: signName,
      };

      // POST to register endpoint
      const registerResponse = await axios.post(`${serverUrl}/rest/register`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const registerData = registerResponse.data;

      if (registerResponse.status === 200) {
        setLoading(false);
        alert('Registration successful! Redirecting to login.');
        navigate('/login');
      } else {
        setError(registerData.message || 'Registration failed.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography  variant="h6" component="div" sx={{ flexGrow: 0 }}>
            <Link to="/home" style={{textDecoration: 'none', color: 'inherit'}}>
                <img data-testid='topbar' src={iqsignlogo} alt="Logo" style={{height: '40px'}}/>
            </Link>
          </Typography>

          <Box
              component="form"
              onSubmit={handleRegister}
              sx={{ mt: 3 }}
              aria-label="Registration Form"
          >
            <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <TextField
                fullWidth
                label="Re-enter Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            <TextField
                fullWidth
                label="Sign Name"
                variant="outlined"
                margin="normal"
                value={signName}
                onChange={(e) => setSignName(e.target.value)}
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, backgroundColor: 'black', color: 'white' }}
                type="submit"
            >
              {loading? <CircularProgress /> : 'Register'}
            </Button>
            {error && (
                <Typography
                    color="error"
                    variant="body2"
                    sx={{ mt: 2 }}
                    role="alert"
                >
                  {error}
                </Typography>
            )}
            <Box sx={{ mt: 2 }}>
              <Typography>
              <Link
                  href="/login"
                  underline="hover"
                  sx={{ color: 'black' }}
              >
                Already have an account? Log in.
              </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
  );
};

export default RegistrationPage;

