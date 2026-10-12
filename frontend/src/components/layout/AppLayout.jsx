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
import Chip from '@mui/material/Chip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlineOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardOutlinedIcon /> },
  { label: 'New scan', path: '/scan', icon: <QrCodeScannerOutlinedIcon /> },
  { label: 'Scan history', path: '/history', icon: <HistoryOutlinedIcon /> },
  { label: 'Inspector console', path: '/inspector', icon: <FactCheckOutlinedIcon /> },
];

export default function AppLayout({ children, toasts, onRemoveToast }) {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLanding = location.pathname === '/';
  const isDashboard = location.pathname === '/dashboard';
  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentToast = toasts?.[0];

  const nav = (item) => (
    <ListItemButton
      key={item.path}
      component={Link}
      to={item.path}
      selected={location.pathname === item.path}
      onClick={() => setDrawerOpen(false)}
      sx={{
        borderRadius: 1.5,
        mb: 0.5,
        py: 1.1,
        color: isDashboard ? '#ffffff' : undefined,
        '&:hover': { bgcolor: isDashboard ? 'rgba(192,192,192,0.10)' : 'grey.200' },
        '&.Mui-selected': {
          bgcolor: isDashboard ? '#202020' : 'primary.main',
          color: isDashboard ? '#e8e8e8' : 'primary.contrastText',
          borderLeft: isDashboard ? '2px solid #c0c0c0' : undefined,
          '& .MuiListItemIcon-root': { color: isDashboard ? '#e8e8e8' : 'primary.contrastText' },
        },
        '&.Mui-selected:hover': { bgcolor: isDashboard ? '#252525' : 'grey.500', color: isDashboard ? '#e8e8e8' : 'primary.contrastText' },
      }}
    >
      <ListItemIcon sx={{ minWidth: 38, color: 'text.secondary' }}>{item.icon}</ListItemIcon>
      <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
    </ListItemButton>
  );

  return (
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: isDashboard ? '#000000' : 'background.default' }}>
      {!isLanding && <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, bgcolor: isDashboard ? '#000000' : 'rgba(255,255,255,0.76)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', color: isDashboard ? '#ffffff' : 'text.primary', border: 0, borderBottom: '1px solid', borderColor: isDashboard ? '#242424' : 'rgba(226,232,240,0.8)', boxShadow: 'none' }}>
        <Toolbar sx={{ gap: 2, minHeight: '68px !important', px: { xs: 2, md: 3 } }}>
          {isMobile && <IconButton color="inherit" onClick={() => setDrawerOpen(true)} edge="start"><MenuIcon /></IconButton>}
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.2, textDecoration: 'none', color: 'inherit', mr: { xs: 0, md: 3 } }}>
            <Typography variant="h6" sx={{ fontWeight: 900, width: 34, height: 34, borderRadius: 1.5, bgcolor: isDashboard ? '#e0e0e0' : 'primary.main', color: '#080808', display: 'grid', placeItems: 'center', fontSize: '1.05rem' }}>J</Typography>
            {!isMobile && <Typography variant="caption" sx={{ color: isDashboard ? '#ffffff' : 'text.primary', fontWeight: 800, letterSpacing: '0.12em' }}>JARVIS</Typography>}
          </Box>
          {!isMobile && <Box sx={{ maxWidth: 360, flex: 1, display: 'flex', alignItems: 'center', gap: 1, bgcolor: isDashboard ? '#000000' : 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)', border: '1px solid', borderColor: isDashboard ? 'rgba(255,255,255,0.16)' : 'rgba(226,232,240,0.9)', borderRadius: 2, px: 1.5, py: 0.7 }}><SearchIcon fontSize="small" sx={{ color: isDashboard ? '#ffffff' : undefined }} /><Typography variant="body2" sx={{ color: isDashboard ? '#ffffff' : 'text.secondary' }}>Search scans, products or reports</Typography></Box>}
          <Box sx={{ flex: 1 }} />
          <Tooltip title="System status"><Chip icon={<ShieldOutlinedIcon />} label="System online" size="small" variant="outlined" sx={{ display: { xs: 'none', sm: 'flex' }, color: isDashboard ? '#e8e8e8' : undefined, borderColor: isDashboard ? '#3d3d3d' : undefined, bgcolor: isDashboard ? '#121212' : 'rgba(22,163,74,0.06)', backdropFilter: 'blur(6px)' }} /></Tooltip>
          <Tooltip title="Notifications"><IconButton size="small" color="inherit"><NotificationsNoneOutlinedIcon /></IconButton></Tooltip>
          <Tooltip title="Help"><IconButton size="small" color="inherit"><HelpOutlineIcon fontSize="small" /></IconButton></Tooltip>
          {!isMobile && <Button size="small" onClick={() => navigate('/signin')} startIcon={<AccountCircleOutlinedIcon />} sx={{ ml: 0.5, px: 1.5, py: 0.65, color: 'text.primary' }}>Inspector</Button>}
        </Toolbar>
      </AppBar>}

      {!isLanding && !isMobile && <Drawer variant="permanent" sx={{ width: 248, flexShrink: 0, '& .MuiDrawer-paper': { width: 248, boxSizing: 'border-box', top: 68, height: 'calc(100% - 68px)', px: 1.5, py: 2, bgcolor: isDashboard ? '#000000' : 'rgba(255,255,255,0.68)', color: isDashboard ? '#ffffff' : undefined, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRight: isDashboard ? '1px solid #242424' : '1px solid rgba(226,232,240,0.8)' } }}>
        <Typography variant="overline" color="text.secondary" sx={{ px: 1.5, mb: 1 }}>Workspace</Typography>
        <List sx={{ p: 0 }}>{NAV_ITEMS.map(nav)}</List>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ mt: 'auto', mx: 0.5, p: 2, bgcolor: isDashboard ? '#000000' : 'rgba(22,143,138,0.1)', backdropFilter: 'blur(8px)', border: isDashboard ? '1px solid #3d3d3d' : '1px solid rgba(22,143,138,0.18)', borderRadius: 2 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: isDashboard ? '#c0c0c0' : 'secondary.dark' }}>LEGAL METROLOGY</Typography>
          <Typography variant="body2" sx={{ mt: 0.5, color: isDashboard ? '#ffffff' : 'text.primary' }}>Rules engine ready for your next label review.</Typography>
        </Box>
      </Drawer>}

      {!isLanding && <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)} sx={{ '& .MuiDrawer-paper': { width: 280, pt: '68px', px: 1.5 } }}>
        <Typography variant="overline" color="text.secondary" sx={{ px: 1.5, mb: 1 }}>Workspace</Typography>
        <List sx={{ p: 0 }}>{NAV_ITEMS.map(nav)}</List>
        <Divider sx={{ my: 2 }} />
        <Button component={Link} to="/scan" variant="contained" startIcon={<QrCodeScannerOutlinedIcon />} onClick={() => setDrawerOpen(false)} sx={{ mx: 1, mb: 1.5 }}>Start new scan</Button>
        <Button component={Link} to="/signin" startIcon={<AccountCircleOutlinedIcon />} onClick={() => setDrawerOpen(false)} sx={{ mx: 1, color: 'text.secondary' }}>Inspector login</Button>
      </Drawer>}

      <Box component="main" sx={{ flex: 1, minWidth: 0, pt: isLanding ? 0 : '68px', pb: (!isLanding && isMobile) ? '64px' : 0, position: 'relative', zIndex: 1 }}>
        {children}
      </Box>

      {/* Mobile Bottom Navigation */}
      {!isLanding && isMobile && (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: theme.zIndex.drawer + 2, borderTop: '1px solid', borderColor: isDashboard ? '#242424' : 'rgba(226,232,240,0.8)', bgcolor: isDashboard ? '#000000' : 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
          <BottomNavigation
            value={NAV_ITEMS.findIndex(item => location.pathname === item.path)}
            onChange={(e, newValue) => {
              if (newValue >= 0 && newValue < NAV_ITEMS.length) {
                navigate(NAV_ITEMS[newValue].path);
              }
            }}
            showLabels
            sx={{
              bgcolor: 'transparent',
              height: 60,
              '& .MuiBottomNavigationAction-root': {
                color: isDashboard ? '#888' : 'text.secondary',
                minWidth: 'auto',
                px: 0.5,
                '& .MuiBottomNavigationAction-label': {
                  fontSize: '0.62rem',
                  fontWeight: 600,
                  mt: 0.3,
                },
              },
              '& .Mui-selected': {
                color: isDashboard ? '#e8e8e8' : 'primary.main',
                '& .MuiBottomNavigationAction-label': {
                  fontWeight: 800,
                },
              },
            }}
          >
            {NAV_ITEMS.map(item => (
              <BottomNavigationAction key={item.path} label={item.label.split(' ')[0]} icon={item.icon} />
            ))}
          </BottomNavigation>
        </Box>
      )}

      {currentToast && <Snackbar open autoHideDuration={currentToast.duration > 0 ? currentToast.duration : null} onClose={() => onRemoveToast(currentToast.id)} anchorOrigin={{ vertical: 'bottom', horizontal: isMobile ? 'center' : 'right' }} sx={{ mb: isMobile ? '72px' : 0 }}>
        <Alert severity={currentToast.type === 'error' ? 'error' : currentToast.type === 'warning' ? 'warning' : currentToast.type === 'success' ? 'success' : 'info'} onClose={() => onRemoveToast(currentToast.id)} variant="filled" sx={{ width: '100%' }}>{currentToast.message}</Alert>
      </Snackbar>}
    </Box>
  );
}
