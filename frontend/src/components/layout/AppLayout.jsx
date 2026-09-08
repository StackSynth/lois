import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useColorMode } from '../../main';
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
import Chip from '@mui/material/Chip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlineOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HomeIcon from '@mui/icons-material/Home';

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Scan Product', path: '/scan', icon: <QrCodeScannerIcon /> },
  { label: 'Scan History', path: '/history', icon: <HistoryIcon /> },
  { label: 'Inspector', path: '/inspector', icon: <AdminPanelSettingsIcon /> },
];

export default function AppLayout({ children, toasts, onRemoveToast }) {
  const theme = useTheme();
  const { toggleColorMode, mode } = useColorMode();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentToast = toasts?.[0];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ gap: 1 }}>
          {isMobile && (
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)} edge="start">
              <MenuIcon />
            </IconButton>
          )}

          {/* Brand */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex', alignItems: 'center', gap: 1,
              textDecoration: 'none', color: 'inherit', mr: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                letterSpacing: '0.08em',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '1.3rem',
              }}
            >
              JARVIS
            </Typography>
            {!isMobile && (
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Compliance Checker
              </Typography>
            )}
          </Box>

          {!isMobile && (
            <Chip
              label="SIH 2026"
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.65rem', height: 22, mr: 2 }}
            />
          )}

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
              {NAV_ITEMS.map(item => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  size="small"
                  startIcon={item.icon}
                  sx={{
                    color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                    bgcolor: location.pathname === item.path ? 'action.selected' : 'transparent',
                    borderRadius: 2,
                    px: 1.5,
                    fontSize: '0.82rem',
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flex: isMobile ? 1 : 0 }} />

          {/* Right actions */}
          <Tooltip title="Notifications">
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <NotificationsNoneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Help">
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <HelpOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
            <IconButton size="small" onClick={toggleColorMode} sx={{ color: 'text.secondary' }}>
              {mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
            </IconButton>
          </Tooltip>
          {!isMobile && (
            <Button
              variant="contained"
              size="small"
              startIcon={<QrCodeScannerIcon />}
              onClick={() => navigate('/scan')}
              sx={{ ml: 1 }}
            >
              Scan Now
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 260, pt: '64px' } }}
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
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
        <Divider sx={{ my: 1 }} />
        <List sx={{ px: 1 }}>
          <ListItemButton
            component={Link}
            to="/scan"
            onClick={() => setDrawerOpen(false)}
            sx={{ borderRadius: 2, bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}><QrCodeScannerIcon /></ListItemIcon>
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
