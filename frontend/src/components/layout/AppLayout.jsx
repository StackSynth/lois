import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MenuIcon from '@mui/icons-material/Menu';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlineOutlined';

const NAV_ITEMS = [
  { label: 'Work', path: '/dashboard' },
  { label: 'About', path: '/' },
  { label: 'Playground', path: '/scan' },
  { label: 'Resource', path: '/history' },
];

export default function AppLayout({ children, toasts, onRemoveToast }) {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentToast = toasts?.[0];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, bgcolor: 'transparent', border: 0, boxShadow: 'none', pt: 1.5 }}>
        <Toolbar sx={{ gap: 1.5, maxWidth: 900, width: 'calc(100% - 32px)', mx: 'auto', minHeight: '48px !important', px: '10px !important', borderRadius: 99, bgcolor: '#111', color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.16)' }}>
          {isMobile && (
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)} edge="start" size="small">
              <MenuIcon />
            </IconButton>
          )}

          {/* Brand */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex', alignItems: 'center', gap: 1,
              textDecoration: 'none', color: 'inherit', mr: { xs: 0, md: 2 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                width: 28, height: 28, borderRadius: '50%', bgcolor: '#fff', color: '#111',
                display: 'grid', placeItems: 'center', fontSize: '0.95rem',
              }}
            >
              J
            </Typography>
            {!isMobile && (
              <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700, letterSpacing: '0.08em' }}>
                JARVIS
              </Typography>
            )}
          </Box>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.25, flex: 1 }}>
              {NAV_ITEMS.map(item => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  size="small"
                  sx={{
                    color: '#d4d4d4', bgcolor: 'transparent', borderRadius: 99,
                    px: 1.25, minWidth: 0, fontSize: '0.68rem',
                    '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flex: isMobile ? 1 : 0 }} />

          {/* Right actions */}
          <Tooltip title="Help"><IconButton size="small" sx={{ color: '#d4d4d4' }}><HelpOutlineIcon fontSize="small" /></IconButton></Tooltip>
          {!isMobile && (
            <Button
              size="small"
              onClick={() => navigate('/scan')}
              sx={{ ml: 0.5, px: 1.5, py: 0.65, borderRadius: 99, bgcolor: '#fff', color: '#111', fontSize: '0.68rem', '&:hover': { bgcolor: '#e5e5e5' } }}
            >
              hello@jarvis.ai
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      sx={{ '& .MuiDrawer-paper': { width: 260, pt: '64px', bgcolor: '#111', color: '#fff' } }}
      >
        <List sx={{ px: 1, pt: 1 }}>
          {NAV_ITEMS.map(item => (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={() => setDrawerOpen(false)}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
        <Divider sx={{ my: 1 }} />
        <List sx={{ px: 1 }}>
          <ListItemButton component={Link} to="/scan" onClick={() => setDrawerOpen(false)} sx={{ borderRadius: 2, bgcolor: '#fff', color: '#111', '&:hover': { bgcolor: '#e5e5e5' } }}>
            <ListItemText primary="Scan Now" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flex: 1, pt: '64px' }}>
        {children}
      </Box>

      {/* Snackbar Toast */}
      {currentToast && (
        <Snackbar
          open={true}
          autoHideDuration={currentToast.duration > 0 ? currentToast.duration : null}
          onClose={() => onRemoveToast(currentToast.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            severity={currentToast.type === 'error' ? 'error' : currentToast.type === 'warning' ? 'warning' : currentToast.type === 'success' ? 'success' : 'info'}
            onClose={() => onRemoveToast(currentToast.id)}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {currentToast.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}
