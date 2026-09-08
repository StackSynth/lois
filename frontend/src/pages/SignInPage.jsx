import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';

export default function SignInPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: 'calc(100vh - 64px)', display: 'grid', placeItems: 'center', py: 8 }}>
      <Paper component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 440, p: { xs: 3, sm: 5 }, bgcolor: 'rgba(21,21,21,0.92)', borderColor: 'rgba(255,255,255,0.14)', boxShadow: '0 24px 80px rgba(0,0,0,0.35)' }}>
        <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ color: 'text.secondary', mb: 4, px: 0 }}>
          Back home
        </Button>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>Welcome back</Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>Sign in to continue to your compliance workspace.</Typography>
        {submitted && <Alert severity="info" sx={{ mb: 3 }}>Sign-in is ready for connection to your account service.</Alert>}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField required fullWidth label="Email address" type="email" autoComplete="email" />
          <TextField required fullWidth label="Password" type="password" autoComplete="current-password" />
          <Button type="submit" variant="contained" size="large" startIcon={<LoginIcon />} sx={{ mt: 1, bgcolor: '#fff', color: '#111', '&:hover': { bgcolor: '#e5e5e5' } }}>
            Sign in
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
          New to Jarvis? <Button onClick={() => navigate('/scan')} sx={{ color: '#fff', p: 0, minWidth: 0 }}>Try a scan</Button>
        </Typography>
      </Paper>
    </Container>
  );
}
