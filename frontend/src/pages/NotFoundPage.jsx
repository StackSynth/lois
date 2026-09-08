import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export default function NotFoundPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
      <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2, opacity: 0.4 }} />
      <Typography variant="h3" fontWeight={700} gutterBottom>404</Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>Page Not Found</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
        JARVIS couldn't locate the page you're looking for. It may have been moved or doesn't exist.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button variant="contained" startIcon={<HomeIcon />} component={Link} to="/">Go Home</Button>
        <Button variant="outlined" startIcon={<QrCodeScannerIcon />} component={Link} to="/scan">Scan a Product</Button>
      </Box>
    </Container>
  );
}
